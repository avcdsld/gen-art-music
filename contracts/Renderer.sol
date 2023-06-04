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
    string public baseImageUrl;
    string public baseAnimationUrl;
    string public description;
    string public baseExternalUrl;
    string public soundBaseUrl;

    constructor(address cutUpGeneratorAddress) {
        cutUpGenerator = ICutUpGeneration(cutUpGeneratorAddress);
    }

    function setCutUpGeneration(address cutUpGeneratorAddress) external onlyOwner {
        cutUpGenerator = ICutUpGeneration(cutUpGeneratorAddress);
    }

    function setBaseImageUrl(string memory url) external onlyOwner {
        baseImageUrl = url;
    }

    function setBaseAnimationUrl(string memory url) external onlyOwner {
        baseAnimationUrl = url;
    }

    function setDescription(string memory desc) external onlyOwner {
        description = desc;
    }

    function setBaseExternalUrl(string memory url) external onlyOwner {
        baseExternalUrl = url;
    }

    function setSoundBaseUrl(string memory url) external onlyOwner {
        soundBaseUrl = url;
    }

    function tokenURI(uint256 tokenId, IAsyncToSync.MusicParam memory musicParam) external view returns (string memory) {
        ICutUpGeneration.Messages memory messages = cutUpGenerator.cutUp(blockhash(block.number - 1));
        string memory json = string.concat(
            '{',
            '"name":"Async to Sync #', Strings.toString(tokenId), '",',
            '"description":"', description, '",',
            '"image":"', baseImageUrl, Strings.toString(tokenId), '",',
            '"animation_url":"', getAnimationURL(tokenId, musicParam, messages), '",',
            '"external_url":"', baseExternalUrl, Strings.toString(tokenId), '",',
            '"attributes":', getAttributes(tokenId, musicParam, messages),
            '}'
        );
        return string.concat("data:application/json;utf8,", json);
    }

    function getAnimationURL(uint256 tokenId, IAsyncToSync.MusicParam memory musicParam, ICutUpGeneration.Messages memory messages) private view returns (string memory) {
        string memory params = string.concat(
            "{",
            '"A2S_TOKEN_ID":', Strings.toString(tokenId), ",",
            '"A2S_RARITY":', getRarity(musicParam.rarity), ",",
            '"A2S_RHYTHM":', getRhythm(musicParam.rhythm), ",",
            '"A2S_OSCILLATOR":', getOscillator(musicParam.oscillator), ",",
            '"A2S_ADSR":', getADSR(musicParam.adsr), ",",
            '"A2S_LYRIC":', getLyric(musicParam.lyric), ",",
            '"A2S_PARAM1":', getRandomParam(1), ",",
            '"A2S_PARAM2":', getRandomParam(2), ",",
            '"A2S_PARAM3":', getRandomParam(3), ",",
            '"A2S_CU1":"', messages.message1, '",',
            '"A2S_CU2":"', messages.message2, '",',
            '"A2S_CU3":"', messages.message3, '",',
            '"A2S_CU4":"', messages.message4, '",',
            '"A2S_CU5":"', messages.message5, '",',
            '"A2S_CU6":"', messages.message6, '",',
            '"A2S_CU7":"', messages.message7, '",',
            '"A2S_CU8":"', messages.message8, '",',
            '"A2S_CU9":"', messages.message9, '",',
            '"A2S_CU10":"', messages.message10, '",',
            '"A2S_CU11":"', messages.message11, '",',
            '"A2S_CU12":"', messages.message12, '",',
            '"A2S_SOUND_BASE_URL":"', soundBaseUrl, '"',
            "}"
        );
        // return string.concat(baseAnimationUrl, "?params=", Base64.encode(bytes(params)));
        string memory url = string.concat(baseAnimationUrl, "?params=", Base64.encode(bytes(params)));
        string memory data = string.concat('<html><meta http-equiv="Refresh" content="0;url=', url, '"></html>');
        return string.concat("data:text/html;charset=UTF-8;base64,", Base64.encode(bytes(data)));
    }

    function getAttributes(uint256 tokenId, IAsyncToSync.MusicParam memory musicParam, ICutUpGeneration.Messages memory messages) private view returns (string memory) {
        return string.concat(
            '[',
            '{"trait_type":"Rarity","value":"', getRarityName(musicParam.rarity), '"},',
            '{"trait_type":"Rhythm","value":"', getRhythmName(musicParam.rhythm), '"},',
            '{"trait_type":"Oscillator","value":"', getOscillatorName(musicParam.oscillator), '"},',
            '{"trait_type":"ADSR","value":"', getADSRName(musicParam.adsr), '"},',
            '{"trait_type":"Lyric","value":"', getLyricName(musicParam.lyric), '"},',
            '{"trait_type":"A2S_TOKEN_ID","value":', Strings.toString(tokenId), '},',
            '{"trait_type":"A2S_RARITY","value":', getRarity(musicParam.rarity), '},',
            '{"trait_type":"A2S_RHYTHM","value":', getRhythm(musicParam.rhythm), '},',
            '{"trait_type":"A2S_OSCILLATOR","value":', getOscillator(musicParam.oscillator), '},',
            '{"trait_type":"A2S_ADSR","value":', getADSR(musicParam.adsr), '},',
            '{"trait_type":"A2S_LYRIC","value":', getLyric(musicParam.lyric), '},',
            '{"trait_type":"A2S_PARAM1","value":', getRandomParam(1), '},',
            '{"trait_type":"A2S_PARAM2","value":', getRandomParam(2), '},',
            '{"trait_type":"A2S_PARAM3","value":', getRandomParam(3), '},',
            '{"trait_type":"A2S_CU1","value":"', messages.message1, '"},',
            '{"trait_type":"A2S_CU2","value":"', messages.message2, '"},',
            '{"trait_type":"A2S_CU3","value":"', messages.message3, '"},',
            '{"trait_type":"A2S_CU4","value":"', messages.message4, '"},',
            '{"trait_type":"A2S_CU5","value":"', messages.message5, '"},',
            '{"trait_type":"A2S_CU6","value":"', messages.message6, '"},',
            '{"trait_type":"A2S_CU7","value":"', messages.message7, '"},',
            '{"trait_type":"A2S_CU8","value":"', messages.message8, '"},',
            '{"trait_type":"A2S_CU9","value":"', messages.message9, '"},',
            '{"trait_type":"A2S_CU10","value":"', messages.message10, '"},',
            '{"trait_type":"A2S_CU11","value":"', messages.message11, '"},',
            '{"trait_type":"A2S_CU12","value":"', messages.message12, '"}',
            ']'
        );
    }

    function getRandomParam(uint8 seed) private view returns (string memory) {
        uint8 param = uint8(uint256(keccak256(abi.encode(seed, blockhash(block.number - 1)))) % 10);
        return Strings.toString(param);
    }

    function embedVariable(string memory name, string memory value) private pure returns (string memory) {
        return string.concat("var ", name, " = ", value, ";\n");
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

    function getRarityName(IAsyncToSync.Rarity val) private pure returns (string memory) {
        if (val == IAsyncToSync.Rarity.Common) return "Common";
        if (val == IAsyncToSync.Rarity.Rare) return "Rare";
        if (val == IAsyncToSync.Rarity.SuperRare) return "Super Rare";
        if (val == IAsyncToSync.Rarity.UltraRare) return "Ultra Rare";
        if (val == IAsyncToSync.Rarity.OneOfOne) return "1 of 1";
        return "";
    }

    function getRhythmName(IAsyncToSync.Rhythm val) private pure returns (string memory) {
        if (val == IAsyncToSync.Rhythm.Thick) return "Thick";
        if (val == IAsyncToSync.Rhythm.LoFi) return "Lo-Fi";
        if (val == IAsyncToSync.Rhythm.HiFi) return "Hi-Fi";
        if (val == IAsyncToSync.Rhythm.Glitch) return "Glitch";
        if (val == IAsyncToSync.Rhythm.Shuffle) return "(Shuffle)";
        return "";
    }

    function getLyricName(IAsyncToSync.Lyric val) private pure returns (string memory) {
        if (val == IAsyncToSync.Lyric.LittleGirl) return "Little girl";
        if (val == IAsyncToSync.Lyric.OldMan) return "Old man";
        if (val == IAsyncToSync.Lyric.FussyMan) return "Fussy man";
        if (val == IAsyncToSync.Lyric.LittleBoy) return "Little boy";
        if (val == IAsyncToSync.Lyric.Shuffle) return "(Shuffle)";
        return "";
    }

    function getOscillatorName(IAsyncToSync.Oscillator val) private pure returns (string memory) {
        if (val == IAsyncToSync.Oscillator.Lyra) return "Lyra";
        if (val == IAsyncToSync.Oscillator.Freak) return "Freak";
        if (val == IAsyncToSync.Oscillator.LFO) return "LFO";
        if (val == IAsyncToSync.Oscillator.Glitch) return "Glitch";
        if (val == IAsyncToSync.Oscillator.Shuffle) return "(Shuffle)";
        return "";
    }

    function getADSRName(IAsyncToSync.ADSR val) private pure returns (string memory) {
        if (val == IAsyncToSync.ADSR.Piano) return "Piano";
        if (val == IAsyncToSync.ADSR.Pad) return "Pad";
        if (val == IAsyncToSync.ADSR.Pluck) return "Pluck";
        if (val == IAsyncToSync.ADSR.Lead) return "Lead";
        if (val == IAsyncToSync.ADSR.Shuffle) return "(Shuffle)";
        return "";
    }
}
