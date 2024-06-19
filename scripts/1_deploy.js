const { ethers } = require("hardhat");

async function main() {
  console.log(`Preparing deployment... \n`)
    //fetch contract
    const Token = await ethers.getContractFactory("Token")

    //const accounts = await ethers.getSigners()

    //console.log(`Accounts fetched: \n ${accounts[0].address}\n${accounts[1].address}\n`)

    //Deploy contracts
    const mWETH = await Token.deploy("mWETH", "mWETH",1000000)
    await mWETH.deployed()
    console.log(`mWETH Deployed to: ${mWETH.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
