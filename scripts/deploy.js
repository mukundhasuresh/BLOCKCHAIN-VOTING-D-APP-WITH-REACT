const hre = require("hardhat");

async function main() {
  // Get the contract to deploy
  const VoteChain = await hre.ethers.getContractFactory("VoteChain");
  
  // Deploy with candidate names
  const voteChain = await VoteChain.deploy(["Alice", "Bob", "Charlie"]);
  
  await voteChain.waitForDeployment();
  console.log("VoteChain deployed to:", voteChain.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
