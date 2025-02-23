// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0;

contract MsgBoard {

    struct Message {
        string content;
        address sender;
        string nickname;
        uint256 time;
    }

    Message[] public Messages;
    uint16 messageCount;

    constructor() {
        messageCount = 0;
        Messages.push(Message(
            "Write what you want.",
            msg.sender,
            "Author",
            block.timestamp
        ));
    }

    event NewMsgSubmit(string text, string nickname, uint256 timestamp, address sender);

    function submit(string memory text, string memory nickname) public {
        require(bytes(text).length > 0 && bytes(nickname).length > 0, "Can not imput empty text or nickname");

        Message memory newMessage = Message(text, msg.sender, nickname, block.timestamp);
        Messages.push(newMessage);
        emit NewMsgSubmit(text, nickname, block.timestamp, msg.sender);
        return;
    } 

    function getMsgList(uint16 msgCount) view public returns (Message[] memory){
        require(msgCount > 0, "Count need above zero.");

        Message[] memory result;
        uint256 forTimes = Messages.length;
        if (forTimes < msgCount) {
            forTimes = msgCount;
        }
        for (uint256 i= 0; i < forTimes; i++) {
            result[i] = Messages[Messages.length - i];
        }

        return result;
    }