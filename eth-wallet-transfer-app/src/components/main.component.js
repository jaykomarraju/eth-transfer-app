import React, { useState } from "react";
import styled from "styled-components";
import Web3 from "web3";
require("dotenv").config();




// styles

const Wrap = styled.div`
  // background: green;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px;
`;

const Formi = styled.div`
  justify-content: center;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 700;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  padding: 13px;
  justify-content: center;
`;

const Label = styled.div`
  padding-left: 10px;
  margin: 10px;
`;

const Label2 = styled.div`
  padding-left: 6px;
`;

const BigInput = styled.input`
  height: 30px;
  background: transparent;
  border: 1.5px solid black;
  border-radius: 10px;
  width: 70%;
  margin-left: 10px;
`;

const SmallInput = styled.input`
  height: 30px;
  background: transparent;
  border: 1.5px solid black;
  border-radius: 10px;
  width: 20%;
  margin-left: 19px;
`;

const Button = styled.button`
  margin-top: 15px;
  padding: 12px 25px 12px 25px;
  border: 1.5px solid black;
  border-radius: 10px;
  background: transparent;
  font-weight: 700;
  font-size: 17.5px;
`;

// get .env params
const Account = process.env.REACT_APP_ACCOUNT;


const PrivateKey = process.env.REACT_APP_PRIVATE_KEY;
const RpcHttpUrl = process.env.REACT_APP_RPC_HTTP_URL;

//create web3 connection
const web3 = new Web3(new Web3.providers.HttpProvider(RpcHttpUrl));

////

// const messengerContract = new web3.eth.Contract([
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "_recipient",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "_message",
// 				"type": "string"
// 			}
// 		],
// 		"name": "sendMessage",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "readMessage",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	}
// ]).at(0x8a6c4408651B8dAABdeA981cE96d1C7Cf1e019A6);

function Main(props) {
  //set params
  const [receiverAddress, setReceiverAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [balanceAmount, setBalanceAmount] = useState("");
  const [message, setMessage] = useState("");
  // const [receivedMessage, setReceivedMessage] = useState("");

  // setReceivedMessage(messageC.readMessage());

  // get balance
  web3.eth.getBalance(Account, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log((result, "ether") + " ETH");
      setBalanceAmount(result, "ether");
    }
  });

  

  //transfer eth from one account to other
  async function transfer() {
    // console.log
    console.log(message);

    // messageC.sendMessage(receiverAddress, message);

    // get nonce
    const nonce = await web3.eth.getTransactionCount(Account, "latest");

    //convert Eth to Wei
    const value = web3.utils.toWei(transferAmount.toString(), "Ether");

    //prepare transaction field - to, value, gasPrice, gasLimit, nonce
    const transaction = {
      to: receiverAddress,
      value: value,
      gasLimit: 6721975, //changed after EIP-1559
      gasPrice: 20000000000, //changed after EIP-1559
      nonce: nonce,
    };

    // buyananswer trx
    const questionTrx = {
      // to: getUser(receiverAddress),
      to: receiverAddress,
      question: message,
      amount: value,
      from: Account,
    };

    // getUser(receiverAddress).addQuestion(questionTrx)

    //create signed transaction
    const signTransaction = await web3.eth.accounts.signTransaction(
      transaction,
      PrivateKey
    );

    // send message
    if (message !== null) {



    }

    //send signed Transaction
    web3.eth.sendSignedTransaction(
      signTransaction.rawTransaction,
      function (error, hash) {
        if (error) {
          console.log(
            "Dont be dumb. Everything works if you dont be dumb.",
            error
          );
        } else {
          console.log("TRX SUCCESS!! Hash:", hash);

          web3.eth.getBalance(Account, function (err, result) {
            if (err) {
              console.log(err);
            } else {
              console.log(web3.utils.fromWei(result, "ether") + " ETH");
              setBalanceAmount(web3.utils.fromWei(result, "ether"));
            }
          });

          window.alert("TRANSACTION SUBMITTED! HASH: " + hash);
        }
      }
    );
  }

  return (
    <Wrap>
      <br />
      <Title>🚀 Eth Dapp Transfer 🚀</Title>
      <br />
      <Formi>
        <Row>
          <Label>Balance :</Label>
          <Label>{balanceAmount} ETH</Label>
        </Row>
        {/* <Row>
          <Label>Received Message :</Label>
          <Label>{receivedMessage}</Label>
        </Row> */}
        <Row>
          <Label>Message :</Label>
          <BigInput
            type="text"
            placeholder="Enter Message..."
            onChange={(event) => setMessage(event.target.value)}
          />
        </Row>
        <Row>
          <Label>Send to :</Label>
          <BigInput
            type="text"
            placeholder="0x0000...."
            onChange={(event) => setReceiverAddress(event.target.value)}
          />
        </Row>
        <Row>
          <Label>Amount :</Label>
          <SmallInput
            type="text"
            placeholder="0.0"
            onChange={(event) => setTransferAmount(event.target.value)}
          />{" "}
          <Label2>ETH</Label2>
        </Row>
        {/* <Row>
          <Label>{forEach Question}</Label>
          <BigInput type="text" placeholder="Your answer..."/>
          <Button>ANS</Button>
        </Row> */}
        <Row>
          <Button type="submit" onClick={() => transfer()}>
            Send
          </Button>
        </Row>
      </Formi>
    </Wrap>
  );
}

export default Main;
