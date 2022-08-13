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
    const [transactions, setTransactions] = useState([]);
     
    

    const handleChange = (e,name) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                [name]: e.target.value
            }
        })
    }


    const getAllTransactions = async () => {

        try {
            if(ethereum){

                const Contract = getContract();

                const availableTransactions = await Contract.getAllTransactions();


                const structuredTransactions = availableTransactions.map((transaction) => ({
                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                    message: transaction.message,
                    keyword: transaction.keyword,
                    amount: parseInt(transaction.amount._hex) / (10 ** 18)
                }));


                setTransactions(structuredTransactions);
            }
            else{
                console.log("No etherem object.")
                console.log(ethereum);
            }
            
        } catch (error) {
            console.log(error);
            console.log(ethereum);
            throw new Error("No ethereum object");
        }
    }



    const CheckIfWalletIsConnected = async () => {

        try{

            if(!ethereum){
                return alert("Please install metamask !");
            }
            
            const accounts = await ethereum.request({method:"eth_accounts"});

            if(accounts.length) {
                setCurrentAccount(accounts[0]);
                
                getAllTransactions();
                
            }
            
            else{
                console.log("No accounts found.");
            }
        }
        catch(error) {

            console.log(error);
        }

    };

    const checkIfTransactionExists = async () => {

        try {

            if(!ethereum) return alert("Please install MetaMask.");

            const Contract = getContract();
            const currentTransactionCount = await Contract.getTransactionCount();
            
            window.localStorage.setItem("transactionCount", currentTransactionCount);

            
        } catch (error) {
            console.log(error);

            throw new Error("No Ethereum Object.");
        }
    } 

    const promptWallet = async () => {

        try{

            if(!ethereum) return alert("Please install MetaMask.");

            const permissions = await ethereum.request({
                method: 'wallet_requestPermissions',
                params: [{
                  eth_accounts: {},
                }]
              });

            window.location.reload();
            

        }
        catch(error){

            console.log(error);
            console.log(ethereum);

            throw new Error("No Ethereum Object.");
        }
    }


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
        checkIfTransactionExists();
    }, [transactionCount]);


    return (

        <TransactionContext.Provider 
        
        value={{
            connectWallet,
            currentAccount,
            formData,
            handleChange,
            isLoading,
            transactionCount,
            sendTransaction,
            transactions,
            promptWallet
        }}

        >
            {children}
        </TransactionContext.Provider>
    )
};