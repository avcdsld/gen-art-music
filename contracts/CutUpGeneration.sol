// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {ICutUpGeneration} from "./interfaces/ICutUpGeneration.sol";

interface ITerraNullius {
    struct Claim {
        address claimant;
        string message;
        uint blockNumber;
    }

    // Claim[] public claims;
    function claims(uint256) external view returns (address, string memory, uint256);
}

contract CutUpGeneration is ICutUpGeneration {
    ITerraNullius public terraNullius;
    uint256 public maxSupply = 40; // 4000; // TODO: change

    constructor(address terraNulliusAddress) {
        terraNullius = ITerraNullius(terraNulliusAddress);
    }

    function cutUp(bytes32 seed) external view returns (string memory) {
        uint256 n = uint256(seed);
        uint256 index1 = ((n << 240) >> 240) % maxSupply;
        uint256 index2 = ((n << 224) >> 240) % maxSupply;
        uint256 index3 = ((n << 208) >> 240) % maxSupply;
        uint256 index4 = ((n << 192) >> 240) % maxSupply;
        uint256 index5 = ((n << 176) >> 240) % maxSupply;
        uint256 index6 = ((n << 160) >> 240) % maxSupply;
        uint256 index7 = ((n << 144) >> 240) % maxSupply;
        uint256 index8 = ((n << 128) >> 240) % maxSupply;
        uint256 index9 = ((n << 112) >> 240) % maxSupply;
        uint256 index10 = ((n << 96) >> 240) % maxSupply;
        uint256 index11 = ((n << 80) >> 240) % maxSupply;
        uint256 index12 = ((n << 64) >> 240) % maxSupply;

        string memory result;
        string memory message;
        (, message, ) = terraNullius.claims(index1);
        result = message;
        (, message, ) = terraNullius.claims(index2);
        result = string.concat(result, " ", message);
        (, message, ) = terraNullius.claims(index3);
        result = string.concat(result, " ", message);
        (, message, ) = terraNullius.claims(index4);
        result = string.concat(result, " ", message);
        (, message, ) = terraNullius.claims(index5);
        result = string.concat(result, " ", message);
        (, message, ) = terraNullius.claims(index6);
        result = string.concat(result, " ", message);
        (, message, ) = terraNullius.claims(index7);
        result = string.concat(result, " ", message);
        (, message, ) = terraNullius.claims(index8);
        result = string.concat(result, " ", message);
        (, message, ) = terraNullius.claims(index9);
        result = string.concat(result, " ", message);
        (, message, ) = terraNullius.claims(index10);
        result = string.concat(result, " ", message);
        (, message, ) = terraNullius.claims(index11);
        result = string.concat(result, " ", message);
        (, message, ) = terraNullius.claims(index12);
        result = string.concat(result, " ", message);
        return result;
    }
}
