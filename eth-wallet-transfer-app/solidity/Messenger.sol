// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title BuyAnAnswer
 * @dev Implements a question and answer marketplace
 */


contract Messenger {

  mapping (address => string) message;

  function sendMessage(address _recipient, string memory _message) public{
    message[_recipient] = _message;
  }

  function readMessage() public view returns (string memory) {
    return message[msg.sender];
  }

}