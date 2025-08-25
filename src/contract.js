import { ethers } from "ethers";
import { contractAddress, contractABI } from "./contractConfig";

// Get contract instance
export const getContract = () => {
  if (!window.ethereum) {
    alert("MetaMask is not installed!");
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
};
