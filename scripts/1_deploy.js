const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    console.log(`Preparing deployment... \n`)
    //fetch contract
    const Token = await ethers.getContractFactory("LotteryContract")

    const accounts = await ethers.getSigners()
    console.log(`Accounts fetched: \n ${accounts[0].address}\n${accounts[1].address}\n`)

    //Deploy contracts
    //Need to add the price Fetcher and change the accounts to be able to use the metamask accounts.
    const lotteryContract = await Token.deploy("0x694AA1769357215DE4FAC081bf1f309aDC325306")
    await lotteryContract.deployed()
    console.log(`LotteryContract Deployed to: ${lotteryContract.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
