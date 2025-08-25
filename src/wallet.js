import { ethers } from "ethers";

// Connects to MetaMask wallet
export const connectWallet = async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      return {
        status: "Wallet connected",
        address: accounts[0],
      };
    } catch (err) {
      return {
        status: "Error connecting wallet: " + err.message,
        address: "",
      };
    }
  } else {
    return {
      status: "MetaMask is not installed. Please install it to use this DApp.",
      address: "",
    };
  }
};

// Gets the currently connected wallet (if any)
export const getCurrentWalletConnected = async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        return {
          status: "Wallet connected",
          address: accounts[0],
        };
      } else {
        return {
          status: "Connect your wallet using the button above.",
          address: "",
        };
      }
    } catch (err) {
      return {
        status: "Error fetching wallet: " + err.message,
        address: "",
      };
    }
  } else {
    return {
      status: "MetaMask is not installed. Please install it to use this DApp.",
      address: "",
    };
  }
};
