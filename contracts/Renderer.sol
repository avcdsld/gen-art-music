// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import {IAsyncToSync} from "./interfaces/IAsyncToSync.sol";
import {IRenderer} from "./interfaces/IRenderer.sol";

contract Renderer is IRenderer, Ownable {
    string public script;

    function setScript(string memory _script) external onlyOwner {
        script = _script;
    }

    function dataURI(uint256 tokenId, IAsyncToSync.MusicParam memory musicParam) external view returns (string memory) {
        string memory imageData = string.concat(
            "<html>",
            "<head>",
            '<meta name="viewport" width="device-width," initial-scale="1.0," maximum-scale="1.0," user-scalable="0" />',
            "<style>body { padding: 0; margin: 0; }</style>",
            '<script src="https://unpkg.com/@free-side/audioworklet-polyfill/dist/audioworklet-polyfill.js"></script>',
            '<script src="https://cdn.jsdelivr.net/npm/p5@1.5.0/lib/p5.js"></script>',
            '<script src="https://cdn.jsdelivr.net/npm/p5@1.5.0/lib/addons/p5.sound.min.js"></script>',
            "<script>",
            embedVariable("A2S_TOKEN_ID", Strings.toString(tokenId)),
            embedVariable("A2S_RARITY", getRarityNum(musicParam.rarity)),
            embedVariable("A2S_RHYTHM", getRhythmNum(musicParam.rhythm)),
            embedVariable("A2S_DRONE", getDroneNum(musicParam.drone)),
            embedVariable("A2S_MELODY", getMelodyNum(musicParam.melody)),
            embedVariable("A2S_SPEECH", getSpeechNum(musicParam.speech)),
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

    function getRarityNum(IAsyncToSync.Rarity val) private pure returns (string memory) {
        if (val == IAsyncToSync.Rarity.Common) return "common";
        if (val == IAsyncToSync.Rarity.Rare) return "rare";
        if (val == IAsyncToSync.Rarity.SuperRare) return "Super Rare";
        if (val == IAsyncToSync.Rarity.UltraRare) return "Ultra Rare";
        if (val == IAsyncToSync.Rarity.OneOfOne) return "1 of 1";
        return "";
    }

    function getRhythmNum(IAsyncToSync.Rhythm val) private pure returns (string memory) {
        if (val == IAsyncToSync.Rhythm.Thick) return "Thick";
        if (val == IAsyncToSync.Rhythm.LoFi) return "Lo-Fi";
        if (val == IAsyncToSync.Rhythm.HiFi) return "Hi-Fi";
        if (val == IAsyncToSync.Rhythm.Glitch) return "Glitch";
        if (val == IAsyncToSync.Rhythm.Shuffle) return "(Shuffle)";
        return "";
    }

    function getSpeechNum(IAsyncToSync.Speech val) private pure returns (string memory) {
        if (val == IAsyncToSync.Speech.LittleGirl) return "Little girl";
        if (val == IAsyncToSync.Speech.OldMan) return "Old man";
        if (val == IAsyncToSync.Speech.FussyMan) return "Fussy man";
        if (val == IAsyncToSync.Speech.LittleBoy) return "Little boy";
        if (val == IAsyncToSync.Speech.Shuffle) return "(Shuffle)";
        return "";
    }

    function getDroneNum(IAsyncToSync.Drone val) private pure returns (string memory) {
        if (val == IAsyncToSync.Drone.Lyra) return "Lyra";
        if (val == IAsyncToSync.Drone.Freak) return "Freak";
        if (val == IAsyncToSync.Drone.LFO) return "LFO";
        if (val == IAsyncToSync.Drone.Glitch) return "Glitch";
        if (val == IAsyncToSync.Drone.Shuffle) return "(Shuffle)";
        return "";
    }

    function getMelodyNum(IAsyncToSync.Melody val) private pure returns (string memory) {
        if (val == IAsyncToSync.Melody.Piano) return "Piano";
        if (val == IAsyncToSync.Melody.Pad) return "Pad";
        if (val == IAsyncToSync.Melody.Pluck) return "Pluck";
        if (val == IAsyncToSync.Melody.Lead) return "Lead";
        if (val == IAsyncToSync.Melody.Shuffle) return "(Shuffle)";
        return "";
    }
}
