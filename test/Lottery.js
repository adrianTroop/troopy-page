const { expect } = require("chai")
const { ethers } = require("hardhat")
const { result } = require("lodash")

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), "ether")
 }

describe("LotteryContract", ()=> {
    let accounts, user;
    let transaction, result;
    let amount = tokens(10);
    //let lotteryContract;
    beforeEach(async ()=> {
        // We fetch the token from the BC
        const LotteryContract = await ethers.getContractFactory("LotteryContract");
        lotteryContract = await LotteryContract.deploy();
        await lotteryContract.deployed();
        accounts = await ethers.getSigners();
        user = accounts[0]
        //makes a deposit
        transaction = await lotteryContract.connect(user).deposit({ value: amount })
        result = await transaction.wait()
    })
    console.log(accounts)
    describe("Deposit Tokens and check balance", () =>{
        
        it("Checks contract balance to equal participation", async () =>{
            const contractBalance = await lotteryContract.getContractBalance();
            expect(contractBalance).to.equal(amount);
        })
        it("Try to place a second bet", async () => {
            expect(lotteryContract.connect(user).deposit({ value: amount })).to.be.reverted;
        })
        it("Check that Depositer is on the list", async ()=>{

        })
        it("Emit deposit event", async ()=>{
            const event = result.events[0]
            const args = event.args
            expect(event.event).to.equal('Deposit')
            expect(args.user).to.equal(user.address)
            expect(args.amount).to.equal(amount)
        })
    })
})
