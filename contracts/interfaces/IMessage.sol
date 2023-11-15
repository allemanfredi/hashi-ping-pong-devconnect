// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

struct Message {
    address to;
    uint256 toChainId;
    bytes data;
}
