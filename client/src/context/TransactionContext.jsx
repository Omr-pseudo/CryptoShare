import React, {useState, useEffect} from "react";
import {ethers} from "ethers";
import {contractABI,contractAddress} from '../utils/constants';



export const TransactionContext = React.createContext();

const {ethereum}  = window;


const getContract = () => {

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const Contract = new ethers.Contract(contractAddress, contractABI, signer);

    return Contract;

}


export const TransactionProvider = ({children}) => {

    const [formData, setFormData] = useState(
        {
            addressTo:"",
            amount: "",
            keyword:"",
            message:""
        }
    );
    
    const [currentAccount, setCurrentAccount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
    
    

    const handleChange = (e,name) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                [name]: e.target.value
            }
        })
    }



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

    const sendTransaction = async () => {

        try {
            if(ethereum){

                const { addressTo, amount, keyword, message } = formData;

                const contract = getContract();
                const parsedAmount = ethers.utils.parseEther(amount);

                await ethereum.request({
                    method: "eth_sendTransaction",
                    params: [{
                        from: currentAccount,
                        to: addressTo,
                        gas: "0x5208",
                        value: parsedAmount._hex
                    }],
                });

                const transactionHash = await contract.transact(addressTo,parsedAmount,message,keyword);
                setIsLoading(true);
                console.log(`Loading ... ${transactionHash}`);

                await transactionHash.wait();
                console.log(`Success... ${transactionHash}`);
                setIsLoading(false);

                const transactionsCount = await contract.getTransactionCount();

                setTransactionCount(transactionsCount.toNumber());

                window.location.reload()


            }
            else{
                console.log("No etherem object.")
                console.log(ethereum);
            }
            
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }

    useEffect(()=>{

        CheckIfWalletIsConnected();
    }, []);


    return (

        <TransactionContext.Provider 
        
        value={{
            connectWallet,
            currentAccount,
            formData,
            handleChange,
            isLoading,
            transactionCount,
            sendTransaction
        }}

        >
            {children}
        </TransactionContext.Provider>
    )
};