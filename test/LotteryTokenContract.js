const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), "ether")
}

describe("LotteryTokenContract", () => {
    let deployer, lotteryToken, user1
    const feePercent = 3

    beforeEach(async ()=>{
        const LotteryToken = await ethers.getContractFactory("LotteryTokenContract")
        const Token = await ethers.getContractFactory("Token")

        token1 = await Token.deploy("Mock hi", "mhi",1000000)
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        feeAccount = accounts[1]
        user1 = accounts[2]
        user2 = accounts[3]
        user3 = accounts[4]

        //Deposit tokens in all the accounts
        let transaction = await token1.connect(deployer).transfer(user1.address,tokens(100))
        await transaction.wait()
        transaction = await token1.connect(deployer).transfer(user2.address,tokens(100))
        await transaction.wait()
        transaction = await token1.connect(deployer).transfer(user3.address,tokens(100))
        await transaction.wait()
        lotteryToken = await LotteryToken.deploy(feeAccount.address, feePercent)
    })

    describe("Deposit Tokens", () =>{
        let transaction, result
        let amount = tokens(20)
        describe("Success", () => {
            beforeEach(async ()=> {
                //Approve Tokens
                transaction = await token1.connect(user1).approve(lotteryToken.address, amount)
                result = await transaction.wait()
                
                //Deposit Token to the user from exchange so doesnt show an error
                transaction = await lotteryToken.connect(user1).depositToken(token1.address, amount)
                result = await transaction.wait()
            })
            it("Tracks the token deposit", async ()=>{
                expect(await token1.balanceOf(lotteryToken.address)).to.equal(amount)
                expect(await lotteryToken.tokens(token1.address, user1.address)).to.equal(amount)
                expect(await lotteryToken.balanceOf(token1.address, user1.address)).to.equal(amount)
            })
            it('Emit a deposit event', async () => {
                const event = result.events[1]
                expect(event.event).to.equal('Deposit')
                const args = event.args
                expect(args.token).to.equal(token1.address)
                expect(args.user).to.equal(user1.address)
                expect(args.amount).to.equal(amount)
                expect(args.balance).to.equal(amount)
            })
            it("Returns token balance", async ()=>{
                expect(await lotteryToken.balanceOf(token1.address, user1.address)).to.equal(amount)
            })
            it("Total lottery balance", async ()=>{
                const totalBalance = await lotteryToken.balanceTotal(token1.address)
                expect(totalBalance).to.equal(tokens(20));
            })
        })
        describe("Deployment", () =>{
            it('it tracks the fee Account', async ()=>{
                expect(await lotteryToken.feeAccount()).to.equal(feeAccount.address)
            })
            it('it tracks the fee percent', async ()=>{
                expect(await lotteryToken.feePercent()).to.equal(feePercent)
            })
        })
        describe("Failure", () => {
            //Trying to send tokens without approving
            it("Fails when no tokens are approve", async ()=>{
                await expect(lotteryToken.connect(user1).depositToken(token1.address,amount)).to.be.reverted
            })
        })
    })
})
