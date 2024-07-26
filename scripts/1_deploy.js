const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    console.log(`Preparing deployment... \n`)
    //fetch contract
    const LotteryContract = await ethers.getContractFactory("LotteryTokenContract")
    const Token = await ethers.getContractFactory("Token")

    const accounts = await ethers.getSigners()
    console.log(`Accounts fetched: \n ${accounts[0].address}\n${accounts[1].address}\n`)

    //Deploy contracts
    //Need to add the price Fetcher and change the accounts to be able to use the metamask accounts.
    const lotteryContract = await LotteryContract.deploy(accounts[1].address,3)
    await lotteryContract.deployed()
    console.log(`LotteryContract Deployed to: ${lotteryContract.address}`)

    const mhi = await Token.deploy("Mock hi", "mhi",10000000)
    await mhi.deployed()
    console.log(`Mock hi Deployed to: ${mhi.address}`)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
