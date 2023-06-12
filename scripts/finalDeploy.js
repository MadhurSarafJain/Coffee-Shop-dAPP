const hre = require("hardhat");


async function main() {
    const Coffee=await hre.ethers.getContractFactory("Coffee");
    const contract= await Coffee.deploy();//ye hamare smart contract ko deploy krdega ek instance banake and ab ham iss contract se interact kar sakte hai
    
    await contract.deployed();
    console.log("Address of contract:",contract.address);
}


    main().catch((error) => {
        console.error(error);
        process.exitCode = 1;
      });