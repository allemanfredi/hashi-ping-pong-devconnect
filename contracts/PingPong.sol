// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {IYaho} from "./interfaces/IYaho.sol";
import {IYaru} from "./interfaces/IYaru.sol";
import {Message} from "./interfaces/IMessage.sol";

contract PingPong {
    address public immutable yaho;
    address public immutable yaru;
    uint256 public immutable otherChainId;

    uint256 public count;
    address public otherPingPong;

    error InvalidSender(address invalidSender, address expectedSender);
    error NotYaru(address invalidYaru, address expectedYaru);
    error InvalidChainId(uint256 invalidChainId, uint256 expectedChainId);

    event Ping(uint256 indexed count);
    event Pong(uint256 indexed count);

    constructor(address yaho_, address yaru_, uint256 otherChainId_) {
        yaho = yaho_;
        yaru = yaru_;
        otherChainId = otherChainId_;
    }

    function ping(address[] calldata messageRelays, address[] calldata adapters) external {
        bytes memory data = abi.encodeWithSignature("pong(uint256,uint256)", block.chainid, count);
        Message memory message = Message(otherPingPong, otherChainId, data);
        Message[] memory messages = new Message[](1);
        messages[0] = message;
        IYaho(yaho).dispatchMessagesToAdapters(messages, messageRelays, adapters);
        emit Ping(count);
        ++count;
    }

    function pong(uint256 sourceChainId_, uint256 count_) external {
        if (msg.sender != yaru) revert NotYaru(msg.sender, yaru);
        address sourceSender = IYaru(yaru).sender();
        if (otherPingPong != sourceSender) revert InvalidSender(sourceSender, otherPingPong);
        if (otherChainId != sourceChainId_) revert InvalidChainId(sourceChainId_, otherChainId);
        emit Pong(count_);
    }

    function setOtherPingPong(address otherPingPong_) external {
        otherPingPong = otherPingPong_;
    }
}
