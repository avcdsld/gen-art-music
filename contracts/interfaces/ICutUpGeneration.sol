// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface ICutUpGeneration {
    function cutUp(bytes32 seed) external view returns (string memory);
}
