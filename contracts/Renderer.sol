// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import {IGenArtMusic} from "./interfaces/IGenArtMusic.sol";
import {IRenderer} from "./interfaces/IRenderer.sol";

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
            embedVariable("GAM_RARITY", getRarityNum(musicParam.rarity)),
            embedVariable("GAM_RHYTHM", getRhythmNum(musicParam.rhythm)),
            embedVariable("GAM_DRONE", getDroneNum(musicParam.drone)),
            embedVariable("GAM_MELODY", getMelodyNum(musicParam.melody)),
            embedVariable("GAM_SPEECH", getSpeechNum(musicParam.speech)),
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

    function getRarityNum(IGenArtMusic.Rarity val) private pure returns (string memory) {
        if (val == IGenArtMusic.Rarity.Common) return "common";
        if (val == IGenArtMusic.Rarity.Rare) return "rare";
        if (val == IGenArtMusic.Rarity.SuperRare) return "Super Rare";
        if (val == IGenArtMusic.Rarity.UltraRare) return "Ultra Rare";
        if (val == IGenArtMusic.Rarity.OneOfOne) return "1 of 1";
        return "";
    }

    function getRhythmNum(IGenArtMusic.Rhythm val) private pure returns (string memory) {
        if (val == IGenArtMusic.Rhythm.Thick) return "Thick";
        if (val == IGenArtMusic.Rhythm.LoFi) return "Lo-Fi";
        if (val == IGenArtMusic.Rhythm.HiFi) return "Hi-Fi";
        if (val == IGenArtMusic.Rhythm.Glitch) return "Glitch";
        if (val == IGenArtMusic.Rhythm.Shuffle) return "(Shuffle)";
        return "";
    }

    function getSpeechNum(IGenArtMusic.Speech val) private pure returns (string memory) {
        if (val == IGenArtMusic.Speech.LittleGirl) return "Little girl";
        if (val == IGenArtMusic.Speech.OldMan) return "Old man";
        if (val == IGenArtMusic.Speech.FussyMan) return "Fussy man";
        if (val == IGenArtMusic.Speech.LittleBoy) return "Little boy";
        if (val == IGenArtMusic.Speech.Shuffle) return "(Shuffle)";
        return "";
    }

    function getDroneNum(IGenArtMusic.Drone val) private pure returns (string memory) {
        if (val == IGenArtMusic.Drone.Lyra) return "Lyra";
        if (val == IGenArtMusic.Drone.Freak) return "Freak";
        if (val == IGenArtMusic.Drone.LFO) return "LFO";
        if (val == IGenArtMusic.Drone.Glitch) return "Glitch";
        if (val == IGenArtMusic.Drone.Shuffle) return "(Shuffle)";
        return "";
    }

    function getMelodyNum(IGenArtMusic.Melody val) private pure returns (string memory) {
        if (val == IGenArtMusic.Melody.Piano) return "Piano";
        if (val == IGenArtMusic.Melody.Pad) return "Pad";
        if (val == IGenArtMusic.Melody.Pluck) return "Pluck";
        if (val == IGenArtMusic.Melody.Lead) return "Lead";
        if (val == IGenArtMusic.Melody.Shuffle) return "(Shuffle)";
        return "";
    }
}
