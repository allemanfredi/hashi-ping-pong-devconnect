// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {Message} from "./IMessage.sol";

interface IYaru {
    function sender() external returns (address);
}
