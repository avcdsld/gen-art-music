// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {IGenArtMusic} from "./IGenArtMusic.sol";

interface IRenderer {
    function dataURI(uint256 tokenId, IGenArtMusic.MusicParam memory musicParam) external view returns (string memory);
}
