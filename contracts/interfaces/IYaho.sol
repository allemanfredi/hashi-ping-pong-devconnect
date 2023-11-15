// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {Message} from "./IMessage.sol";

interface IYaho {
    function dispatchMessagesToAdapters(
        Message[] memory messages,
        address[] memory messageRelays,
        address[] memory adapters
    ) external payable returns (bytes32[] memory messageIds, bytes32[] memory);
}
