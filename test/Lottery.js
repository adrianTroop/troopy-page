const { expect } = require("chai")
const { ethers } = require("hardhat")

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), "ether")
 }

describe("LotteryContract", () => {
    let accounts, user, priceFeed;
    let transaction, result;
    let amount = tokens(1);
    //let lotteryContract;
    beforeEach(async ()=> {

        //Mock up the price.
        const MockV3Aggregator = await ethers.getContractFactory("contracts/MockV3Aggregator.sol:MockV3Aggregator");
        priceFeed = await MockV3Aggregator.deploy(3000); // Initial ETH price in USD
        await priceFeed.deployed();
        // We fetch the token from the BC
        const LotteryContract = await ethers.getContractFactory("LotteryContract");
        //const priceFeedAddress = "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419";
        lotteryContract = await LotteryContract.deploy(priceFeed.address);
        await lotteryContract.deployed();
        

        accounts = await ethers.getSigners();
        user = accounts[0]
        user2 = accounts[1]
        user3 = accounts[2]
        user4 = accounts[3]
        user5 = accounts[4]
        //makes a deposit
        transaction = await lotteryContract.connect(user).deposit({ value: amount })
        result = await transaction.wait()
    })
    describe("Deposit Tokens and check balance", () =>{
        it("Checks contract balance to equal participation", async () =>{
            const contractBalance = await lotteryContract.getContractBalance();
            expect(contractBalance).to.equal(amount);
        })
        it("Try to place a second bet", async () => {
            expect(lotteryContract.connect(user).deposit({ value: amount })).to.be.reverted;
        })
        it("Check that Depositer is on the list", async ()=>{
            const depositers = await lotteryContract.getDepositersList();
            expect(depositers.length).to.equal(1);
            expect(depositers[0].userAddress).to.equal(user.address);
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
