import React, {useState, useEffect} from "react";
import {ethers} from "ethers";
import {contractABI,contractAddress} from '../utils/constants';



export const TransactionContext = React.createContext();

const {ethereum}  = window;


const Contract = () => {

    const provider = ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const Contract = new ethers.Contract(contractAddress, contractABI, signer);

    return Contract;

}


export const TransactionProvider = ({children}) => {

    const [currentAccount, setCurrentAccount] = useState("");

    const CheckIfWalletIsConnected = async () => {

        try{

            if(!ethereum){
                return alert("Please install metamask !");
            }
            
            const accounts = await ethereum.request({method:"eth_accounts"});

            if(accounts.length) {
                setCurrentAccount(accounts[0]);
            }

            else{
                console.log("No accounts found.");
            }
        }
        catch(error) {

            console.log(error);
        }

    };


    const connectWallet = async () => {

        try{

            if(!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({method:"eth_requestAccounts", });

            setCurrentAccount(accounts[0]);

            window.location.reload();
        }
        catch(error){

            console.log(error);

            throw new Error("No Ethereum Object.");
        }
    }

    useEffect(()=>{

        CheckIfWalletIsConnected();
    }, []);


    return (

        <TransactionContext.Provider 
        
        value={{
            connectWallet,
            currentAccount
        }}

        >
            {children}
        </TransactionContext.Provider>
    )
};