// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import {IGenArtMusic} from "./interfaces/IGenArtMusic.sol";
import {IRenderer} from "./interfaces/IRenderer.sol";
import {Base64} from "./Base64.sol";

contract Renderer is IRenderer, Ownable {
    string public script;

    function setScript(string memory _script) external onlyOwner {
        script = _script;
    }

    function dataURI(uint256 tokenId, IGenArtMusic.MusicParam memory musicParam) external view returns (string memory) {
        string memory imageData = string.concat(
            "<html>",
            "<head>",
            '<meta name="viewport" width="device-width," initial-scale="1.0," maximum-scale="1.0," user-scalable="0" />',
            "<style>body { padding: 0; margin: 0; }</style>",
            '<script src="https://unpkg.com/@free-side/audioworklet-polyfill/dist/audioworklet-polyfill.js"></script>',
            '<script src="https://cdn.jsdelivr.net/npm/p5@1.5.0/lib/p5.js"></script>',
            '<script src="https://cdn.jsdelivr.net/npm/p5@1.5.0/lib/addons/p5.sound.min.js"></script>',
            "<script>",
            embedVariable("GAM_TOKEN_ID", Strings.toString(tokenId)),
            embedVariable("GAM_RHYTHM", Strings.toString(musicParam.rhythm)),
            embedVariable("GAM_SPEECH", Strings.toString(musicParam.speech)),
            embedVariable("GAM_SYNTHESIZER", Strings.toString(musicParam.synthesizer)),
            embedVariable("GAM_MELODY", Strings.toString(musicParam.melody)),
            script,
            "</script>",
            "</head>",
            "<body>",
            "<main></main>",
            "</body>",
            "</html>"
        );
        return string.concat("data:text/html;charset=UTF-8;base64,", Base64.encode(bytes(imageData)));
    }

    function embedVariable(string memory name, string memory value) private pure returns (string memory) {
        return string.concat("const ", name, " = ", value, ";");
    }
}
