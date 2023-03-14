// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Base64.sol";
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

        string memory result = embedCutUp("A2S_CU1", index1);
        result = string.concat(result, embedCutUp("A2S_CU2", index2));
        result = string.concat(result, embedCutUp("A2S_CU3", index3));
        result = string.concat(result, embedCutUp("A2S_CU4", index4));
        result = string.concat(result, embedCutUp("A2S_CU5", index5));
        result = string.concat(result, embedCutUp("A2S_CU6", index6));
        result = string.concat(result, embedCutUp("A2S_CU7", index7));
        result = string.concat(result, embedCutUp("A2S_CU8", index8));
        result = string.concat(result, embedCutUp("A2S_CU9", index9));
        result = string.concat(result, embedCutUp("A2S_CU10", index10));
        result = string.concat(result, embedCutUp("A2S_CU11", index11));
        result = string.concat(result, embedCutUp("A2S_CU12", index12));
        return result;
    }

    function embedCutUp(string memory name, uint256 index) private view returns (string memory) {
        try terraNullius.claims(index) returns (address, string memory message, uint256) {
            return string.concat("const ", name, ' = "', Base64.encode(bytes(message)), '";\n');
        } catch {
            return string.concat("const ", name, ' = "";\n');
        }
    }
}
