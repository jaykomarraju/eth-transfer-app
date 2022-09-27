import React, { useState } from "react";
import Web3 from "web3";
require("dotenv").config();

// get .env params
const Account = process.env.REACT_APP_ACCOUNT;
const PrivateKey = process.env.REACT_APP_PRIVATE_KEY;
const RpcHttpUrl = process.env.REACT_APP_RPC_HTTP_URL;

//create web3 connection
const web3 = new Web3(new Web3.providers.HttpProvider(RpcHttpUrl));

function Main(props) {
  //set params
  const [receiverAddress, setReceiverAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

//transfer eth from one account to other
  async function transfer() {

    // get nonce
    const nonce = await web3.eth.getTransactionCount(Account, "latest");

    //convert Eth to Wei
    const value = web3.utils.toWei(transferAmount.toString(), 'Ether');


    //prepare transaction field - to, value, gasPrice, gasLimit, nonce
    const transaction = {
        'to': receiverAddress,
        'value': value,
        'gasLimit':6721975, //changed after EIP-1559
        'gasPrice': 20000000000, //changed after EIP-1559
        'nonce': nonce
    }

    //create signed transaction
    const signTransaction = await web3.eth.accounts.signTransaction(transaction, PrivateKey);

    

    //send signed Transaction
    web3.eth.sendSignedTransaction(signTransaction.rawTransaction, function(error, hash){
        if (error) {
            console.log("Dont be dumb. Everything works if you dont be dumb.", error);
        } else{
            console.log("TRX SUCCESS!! Hash:", hash);
            window.alert("TRANSACTION SUBMITTED! HASH: " + hash);
        }
    })

   


  }

  return (
    <div>
      <br />
      <div style={{color:"blue", fontSize:"1.5rem"}}>Welcome to EthDappTransfer!</div>
      <br />
      <div style={{fontSize:"1.2rem"}}>Send to :</div>
      <br />
      <div>
        <input
          type="text"
          placeholder="0x0000...."
          style = {{height:"1.5vw", width:"30vw"}}
          onChange={(event) => setReceiverAddress(event.target.value)}
        />
      </div><br/>
      <div style={{fontSize:"1.2rem"}}>Amount :</div><br/>
      <div>
        <input
        style = {{height:"1.5vw", width:"5vw"}}
          type="text"
          placeholder="0.0"
          onChange={(event) => setTransferAmount(event.target.value)}
        /> ETH
      </div><br/>
      <div>
        <button type="submit" onClick={() => transfer()}>
          Send
        </button>
      </div><br/>
    </div>
  );
}

export default Main;
