# CryptoShare -Web 3.0 Blockchain Application 
![Landing page](https://i.postimg.cc/vTsPvc6L/Crypto-Share-00.png)

## Introduction

This is a personal project for the purpose of self learning, CryptoShare is a blockchain based cryptocurrency transfer application that lets the users to connect their
MetaMask account, and transfer funds to their desired destination account, along with funds transfer it also lets the user to write a message and select any keyword that they wish, and then based
on that keyword it attaches a GIF to the transaction, :sunglasses::sunglasses:
 Cool right ?!
Now, you might be wondering, how is this blockchain based? because after the transaction it records that transaction inside a smart contract, with the addresses of the sender, receiver, amount of transaction
and also the message along with the keyword, later on the data is retreived from the smart contract and displayed on the application, along with a cool GIF :fire::fire::fire:!


[This was a learning based project and I followed this tutorial.](https://www.youtube.com/watch?v=Wn_Kb3MR_cU&feature=youtu.be)

# What's new?
## What did I contribute to the original project of the tutorial?
Apart from minor UI enhancements in the original project, I built a custom button named "Accounts", and wrote the logic behind it.
Accounts button runs a function that prompts the user to change their MetaMask account if they wish to.

    const  promptWallet = async () => { 
    try{
    if(!ethereum) return  alert("Please install MetaMask.");
    await  ethereum.request({
    method:  'wallet_requestPermissions',
    params: [{
    eth_accounts: {},
    }]
    });
    window.location.reload();
    }
    catch(error){
    console.log(error);
    console.log(ethereum);
    throw  new  Error("No Ethereum Object.");
	    }
    };


# Tools

## React and Tailwind
React JS and tailwind CSS libraries are used for creating the frontend of our application.

## Hardhat
Hardhat is used for backend project management for writing, testing and deploying smart contract on Rospten test network.

## Solidity
The smart contract is written in solidity.

## MetaMask
MetaMask is used to send the transaction to the destination address and also the data to smart contract after paying the Gas fees :(

## Ethers JS
Ethers Js library is used for generating the instance of our Contract that lives on the blockchain and interacting with it.

# Screenshots
![cs-01](https://i.postimg.cc/mrQB6Pgp/Crypto-Share-05.png)

![cs-03](https://i.postimg.cc/g043R2bQ/Crypto-Share-03.png)

![cs-03](https://i.postimg.cc/q7mjrLqN/Crypto-Share-04.png)
