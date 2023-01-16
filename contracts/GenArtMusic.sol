// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import {IGenArtMusic} from "./interfaces/IGenArtMusic.sol";
import {IRenderer} from "./interfaces/IRenderer.sol";

contract GenArtMusic is IGenArtMusic, ERC721, Ownable {
    uint256 public totalSupply;
    uint16 public tokenRemaining = 256;
    mapping(uint256 => uint16) public tokenIdToMusicIds;
    mapping(uint16 => uint16) public drawCache;
    IRenderer public renderer;
    string public baseImageUrl;
    string public baseAnimationUrl;
    string private _description;
    string private _baseExternalUrl;

    constructor(address rendererAddress) ERC721("GenArtMusic", "GAM") {
        renderer = IRenderer(rendererAddress);
    }

    function setRenderer(address rendererAddress) external onlyOwner {
        renderer = IRenderer(rendererAddress);
    }

    function setBaseImageUrl(string memory url) external onlyOwner {
        baseImageUrl = url;
    }

    function setBaseAnimationUrl(string memory url) external onlyOwner {
        baseAnimationUrl = url;
    }

    function setDescription(string memory desc) external onlyOwner {
        _description = desc;
    }

    function setBaseExternalUrl(string memory url) external onlyOwner {
        _baseExternalUrl = url;
    }

    function mint(address to) external {
        uint256 tokenId = ++totalSupply;
        tokenIdToMusicIds[tokenId] = drawMusicId();
        _safeMint(to, tokenId);
    }

    function drawMusicId() private returns (uint16 musicId) {
        uint16 i = uint16(uint(blockhash(block.number - 1)) % tokenRemaining);
        musicId = drawCache[i] == 0 ? i : drawCache[i];
        tokenRemaining--;
        drawCache[i] = drawCache[tokenRemaining] == 0 ? tokenRemaining : drawCache[tokenRemaining];
    }

    function musicParam(uint256 tokenId) public view returns (IGenArtMusic.MusicParam memory) {
        uint8 musicId = uint8(tokenIdToMusicIds[tokenId]);
        return IGenArtMusic.MusicParam((musicId << 6) >> 6, (musicId << 4) >> 6, (musicId << 2) >> 6, musicId >> 6);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "not exists");
        return string.concat("data:application/json;utf8,", getMetadata(tokenId));
    }

    function getMetadata(uint256 tokenId) private view returns (string memory) {
        IGenArtMusic.MusicParam memory param = musicParam(tokenId);
        return
            string.concat(
                '{"name":"GenArtMusic #',
                Strings.toString(tokenId),
                '","description":"',
                _description,
                '","image":"',
                baseImageUrl,
                Strings.toString(tokenId),
                '","animation_url":"',
                getImage(tokenId, param),
                '","external_url":"',
                _baseExternalUrl,
                Strings.toString(tokenId),
                '","attributes":[{"trait_type":"Rhythm","value":"',
                getRhythmName(param.rhythm),
                '"},{"trait_type":"Speech","value":"',
                getSpeechName(param.speech),
                '"},{"trait_type":"Synthesizer","value":"',
                getSynthesizerName(param.synthesizer),
                '"},{"trait_type":"Melody","value":"',
                getMelodyName(param.melody),
                '"}]}'
            );
    }

    function getImage(uint256 tokenId, MusicParam memory param) private view returns (string memory) {
        if (bytes(baseAnimationUrl).length > 0) {
            return string.concat(baseAnimationUrl, Strings.toString(tokenId));
        }
        return renderer.dataURI(tokenId, param);
    }

    function getRhythmName(uint8 val) private pure returns (string memory) {
        if (val == 0) return "Thick";
        if (val == 1) return "Lo-Fi";
        if (val == 2) return "Hi-Fi";
        if (val == 3) return "Glitch";
        return "";
    }

    function getSpeechName(uint8 val) private pure returns (string memory) {
        if (val == 0) return "Little girl";
        if (val == 1) return "Old man";
        if (val == 2) return "Fussy man";
        if (val == 3) return "Little boy";
        return "";
    }

    function getSynthesizerName(uint8 val) private pure returns (string memory) {
        if (val == 0) return "Lyra";
        if (val == 1) return "Freak";
        if (val == 2) return "LFO";
        if (val == 3) return "Glitch";
        return "";
    }

    function getMelodyName(uint8 val) private pure returns (string memory) {
        if (val == 0) return "Piano";
        if (val == 1) return "Pad";
        if (val == 2) return "Pluck";
        if (val == 3) return "Lead";
        return "";
    }
}
