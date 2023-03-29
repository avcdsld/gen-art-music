// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import {IAsyncToSync} from "./interfaces/IAsyncToSync.sol";
import {IRenderer} from "./interfaces/IRenderer.sol";
import {ICutUpGeneration} from "./interfaces/ICutUpGeneration.sol";

contract Renderer is IRenderer, Ownable {
    ICutUpGeneration public cutUpGenerator;
    mapping(uint8 => string) public scripts;
    uint8 public scriptsLength;
    string public externalScript;

    constructor(address cutUpGeneratorAddress) {
        cutUpGenerator = ICutUpGeneration(cutUpGeneratorAddress);
        externalScript = string.concat(
            '<script src="https://unpkg.com/@free-side/audioworklet-polyfill/dist/audioworklet-polyfill.js"></script>',
            '<script src="https://cdn.jsdelivr.net/npm/p5@1.5.0/lib/p5.js"></script>',
            '<script src="https://cdn.jsdelivr.net/npm/p5@1.5.0/lib/addons/p5.sound.min.js"></script>'
        );
    }

    function setCutUpGeneration(address cutUpGeneratorAddress) external onlyOwner {
        cutUpGenerator = ICutUpGeneration(cutUpGeneratorAddress);
    }

    function setScriptsLength(uint8 length) external onlyOwner {
        scriptsLength = length;
    }

    function setScript(uint8 index, string memory script) external onlyOwner {
        scripts[index] = script;
    }

    function setExternalScript(string memory script) external onlyOwner {
        externalScript = script;
    }

    function dataURI(uint256 tokenId, IAsyncToSync.MusicParam memory musicParam) external view returns (string memory) {
        string memory imageData = string.concat(
            "<html>",
            "<head>",
            '<meta name="viewport" width="device-width," initial-scale="1.0," maximum-scale="1.0," user-scalable="0" />',
            "<style>body { padding: 0; margin: 0; }</style>",
            externalScript,
            "\n<script>\n",
            embedVariable("A2S_TOKEN_ID", Strings.toString(tokenId)),
            embedVariable("A2S_RARITY", getRarity(musicParam.rarity)),
            embedVariable("A2S_RHYTHM", getRhythm(musicParam.rhythm)),
            embedVariable("A2S_OSCILLATOR", getOscillator(musicParam.oscillator)),
            embedVariable("A2S_ADSR", getADSR(musicParam.adsr)),
            embedVariable("A2S_LYRIC", getLyric(musicParam.lyric)),
            embedVariable("A2S_PARAM1", getRandomParam(1)),
            embedVariable("A2S_PARAM2", getRandomParam(2)),
            embedVariable("A2S_PARAM3", getRandomParam(3)),
            embedCutUp(),
            embedScripts(),
            "\n</script>\n",
            "</head>",
            "<body>",
            "<main></main>",
            "</body>",
            "</html>"
        );
        return string.concat("data:text/html;charset=UTF-8;base64,", Base64.encode(bytes(imageData)));
    }

    function getRandomParam(uint8 seed) private view returns (string memory) {
        uint8 param = uint8(uint256(keccak256(abi.encode(seed, blockhash(block.number - 1)))) % 10);
        return Strings.toString(param);
    }

    function embedCutUp() private view returns (string memory) {
        bytes32 seed = blockhash(block.number - 1);
        return cutUpGenerator.cutUp(seed);
    }

    function embedVariable(string memory name, string memory value) private pure returns (string memory) {
        return string.concat("const ", name, " = ", value, ";\n");
    }

    function embedScripts() private view returns (string memory) {
        string memory res = "";
        for (uint8 i = 0; i < scriptsLength; i++) {
            res = string.concat(res, scripts[i]);
        }
        return res;
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

    function getLyric(IAsyncToSync.Lyric val) private pure returns (string memory) {
        if (val == IAsyncToSync.Lyric.LittleGirl) return '"LITTLE_GIRL"';
        if (val == IAsyncToSync.Lyric.OldMan) return '"OLD_MAN"';
        if (val == IAsyncToSync.Lyric.FussyMan) return '"FUSSY_MAN"';
        if (val == IAsyncToSync.Lyric.LittleBoy) return '"LITTLE_BOY"';
        if (val == IAsyncToSync.Lyric.Shuffle) return '"SHUFFLE"';
        return '""';
    }

    function getOscillator(IAsyncToSync.Oscillator val) private pure returns (string memory) {
        if (val == IAsyncToSync.Oscillator.Lyra) return '"LYRA"';
        if (val == IAsyncToSync.Oscillator.Freak) return '"FREAK"';
        if (val == IAsyncToSync.Oscillator.LFO) return '"LFO"';
        if (val == IAsyncToSync.Oscillator.Glitch) return '"GLITCH"';
        if (val == IAsyncToSync.Oscillator.Shuffle) return '"SHUFFLE"';
        return '""';
    }

    function getADSR(IAsyncToSync.ADSR val) private pure returns (string memory) {
        if (val == IAsyncToSync.ADSR.Piano) return '"PIANO"';
        if (val == IAsyncToSync.ADSR.Pad) return '"PAD"';
        if (val == IAsyncToSync.ADSR.Pluck) return '"PLUCK"';
        if (val == IAsyncToSync.ADSR.Lead) return '"LEAD"';
        if (val == IAsyncToSync.ADSR.Shuffle) return '"SHUFFLE"';
        return '""';
    }
}
