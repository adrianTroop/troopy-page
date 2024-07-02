const { expect } = require("chai")
const { ethers } = require("hardhat")

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), "ether")
 }

describe("LotteryContract", ()=> {
    let accounts, user;
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
        lotteryContract.connect(user).deposit({ value: amount })
    })
    console.log(accounts)
    describe("Deposit Tokens and check balance", () =>{
        
        it("Checks contract balance to equal participation", async () =>{
            const contractBalance = await lotteryContract.getContractBalance();
            console.log("Contract balance:", ethers.utils.formatEther(contractBalance));
            expect(contractBalance).to.equal(amount);
        })
        it("Try to place a second bet", async () => {
            expect(lotteryContract.connect(user).deposit({ value: amount })).to.be.reverted;
        })
        it("Emit deposit event", async ()=>{
            
        })
    })
})
