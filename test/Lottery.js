const { expect } = require("chai")
const { ethers } = require("hardhat")
const { eq } = require("lodash")

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), "ether")
 }

describe("LotteryContract", ()=> {
    let user , etherPot;
    beforeEach(async ()=> {
        // We fetch the token from the BC
        const LotteryContract = await ethers.getContractFactory("LotteryContract")

        accounts = await ethers.getSigners()
        lotteryPot = accounts[0]
        user = accounts[1]
        lotteryPotBalance = accounts[0]
        
    })

    describe("Deposit Tokens", () =>{
        let transaction
        let amount = ethers.utils.parseEther("10.0");
        beforeEach(async ()=> {
            //send ETH.
            this.lotteryPotBalanceInitial = await ethers.provider.getBalance(lotteryPot.address)
            transaction = await user.sendTransaction({
                to: lotteryPot.address,
                value: amount
            })
        })
        it("Checks Betting pool", async () =>{
            console.log("Amount",amount)
        })
        it("Tracks Betting pool", async () =>{
            console.log("TX Amount", transaction.amount)
        })
    })
})
