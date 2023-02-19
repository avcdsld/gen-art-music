// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import {IAsyncToSync} from "./interfaces/IAsyncToSync.sol";
import {IRenderer} from "./interfaces/IRenderer.sol";
import {ICutUpGenerator} from "./interfaces/ICutUpGenerator.sol";

interface ITerraNullius {
    struct Claim {
        address claimant;
        string message;
        uint blockNumber;
    }

    function claims(uint256 index) external returns (Claim memory);
}

contract Renderer is IRenderer, Ownable {
    ICutUpGenerator public cutUpGenerator;
    string public script;

    constructor(address cutUpGeneratorAddress) {
        cutUpGenerator = ICutUpGenerator(cutUpGeneratorAddress);
    }

    function setCutUpGenerator(address cutUpGeneratorAddress) external onlyOwner {
        cutUpGenerator = ICutUpGenerator(cutUpGeneratorAddress);
    }

    function setScript(string memory _script) external onlyOwner {
        script = _script;
    }

    function dataURI(uint256 tokenId, IAsyncToSync.MusicParam memory musicParam) external view returns (string memory) {
        string memory imageData = string.concat(
            "<html>",
            "<head>",
            '<meta name="viewport" width="device-width," initial-scale="1.0," maximum-scale="1.0," user-scalable="0" />',
            "\n<!--\n",
            embedCutUp(),
            "\n-->\n",
            "<style>body { padding: 0; margin: 0; }</style>",
            '<script src="https://unpkg.com/@free-side/audioworklet-polyfill/dist/audioworklet-polyfill.js"></script>',
            '<script src="https://cdn.jsdelivr.net/npm/p5@1.5.0/lib/p5.js"></script>',
            '<script src="https://cdn.jsdelivr.net/npm/p5@1.5.0/lib/addons/p5.sound.min.js"></script>',
            "\n<script>\n",
            embedVariable("A2S_TOKEN_ID", Strings.toString(tokenId)),
            embedVariable("A2S_RARITY", getRarity(musicParam.rarity)),
            embedVariable("A2S_RHYTHM", getRhythm(musicParam.rhythm)),
            embedVariable("A2S_DRONE", getDrone(musicParam.drone)),
            embedVariable("A2S_MELODY", getMelody(musicParam.melody)),
            embedVariable("A2S_SPEECH", getSpeech(musicParam.speech)),
            script,
            "\n</script>\n",
            "</head>",
            "<body>",
            "<main></main>",
            "</body>",
            "</html>"
        );
        return string.concat("data:text/html;charset=UTF-8;base64,", Base64.encode(bytes(imageData)));
    }

    function embedCutUp() private view returns (string memory) {
        bytes32 seed = blockhash(block.number - 1);
        string memory cutUp = cutUpGenerator.cutUp(seed);
        return Base64.encode(bytes(cutUp));
    }

    function embedVariable(string memory name, string memory value) private pure returns (string memory) {
        return string.concat("const ", name, " = ", value, ";\n");
    }

    function getRarity(IAsyncToSync.Rarity val) private pure returns (string memory) {
        if (val == IAsyncToSync.Rarity.Common) return '"COMMON"';
        if (val == IAsyncToSync.Rarity.Rare) return '"RARE"';
        if (val == IAsyncToSync.Rarity.SuperRare) return '"SUPER_RARE"';
        if (val == IAsyncToSync.Rarity.UltraRare) return '"ULTRA_RARE"';
        if (val == IAsyncToSync.Rarity.OneOfOne) return '"ONE_OF_ONE"';
        return '""';
    }

    function getRhythm(IAsyncToSync.Rhythm val) private pure returns (string memory) {
        if (val == IAsyncToSync.Rhythm.Thick) return '"THICK"';
        if (val == IAsyncToSync.Rhythm.LoFi) return '"LO_FI"';
        if (val == IAsyncToSync.Rhythm.HiFi) return '"HI_FI"';
        if (val == IAsyncToSync.Rhythm.Glitch) return '"GLITCH"';
        if (val == IAsyncToSync.Rhythm.Shuffle) return '"SHUFFLE"';
        return '""';
    }

    function getSpeech(IAsyncToSync.Speech val) private pure returns (string memory) {
        if (val == IAsyncToSync.Speech.LittleGirl) return '"LITTLE_GIRL"';
        if (val == IAsyncToSync.Speech.OldMan) return '"OLD_MAN"';
        if (val == IAsyncToSync.Speech.FussyMan) return '"FUSSY_MAN"';
        if (val == IAsyncToSync.Speech.LittleBoy) return '"LITTLE_BOY"';
        if (val == IAsyncToSync.Speech.Shuffle) return '"SHUFFLE"';
        return '""';
    }

    function getDrone(IAsyncToSync.Drone val) private pure returns (string memory) {
        if (val == IAsyncToSync.Drone.Lyra) return '"LYRA"';
        if (val == IAsyncToSync.Drone.Freak) return '"FREAK"';
        if (val == IAsyncToSync.Drone.LFO) return '"LFO"';
        if (val == IAsyncToSync.Drone.Glitch) return '"GLITCH"';
        if (val == IAsyncToSync.Drone.Shuffle) return '"SHUFFLE"';
        return '""';
    }

    function getMelody(IAsyncToSync.Melody val) private pure returns (string memory) {
        if (val == IAsyncToSync.Melody.Piano) return '"PIANO"';
        if (val == IAsyncToSync.Melody.Pad) return '"PAD"';
        if (val == IAsyncToSync.Melody.Pluck) return '"PLUCK"';
        if (val == IAsyncToSync.Melody.Lead) return '"LEAD"';
        if (val == IAsyncToSync.Melody.Shuffle) return '"SHUFFLE"';
        return '""';
    }
}
