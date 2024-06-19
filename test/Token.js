const { expect } = require("chai")
const { ethers } = require("hardhat")

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), "ether")
 }

describe("Token", ()=> {
    let Token;
    beforeEach(async ()=> {
        // We fetch the token from the BC
        const Token = await ethers.getContractFactory("Token")
        token = await Token.deploy("mWETH", "mWETH",1000000)
    })

    describe("Deployment", () =>{
        const name = "mWETH"
        const symbol = "mWETH"
        const decimals = "18"
        const totalSupply = tokens("1000000")
    
        it('Has Correct name', async ()=>{
            expect(await token.name()).to.equal(name)
        })
        it('Has Correct Symbol', async ()=>{
            expect(await token.symbol()).to.equal(symbol)
        })
        it('Has Correct Decimal', async ()=>{
            expect(await token.decimals()).to.equal(decimals)
        })
        it('Has Correct total supply', async ()=>{
            expect(await token.totalSupply()).to.equal(totalSupply)
        })
    })
})
