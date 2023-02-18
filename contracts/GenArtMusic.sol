// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import {IGenArtMusic} from "./interfaces/IGenArtMusic.sol";
import {IRenderer} from "./interfaces/IRenderer.sol";

contract GenArtMusic is IGenArtMusic, ERC721, ERC2981, Ownable {
    uint256 public totalSupply;
    uint16 public tokenRemaining = 128;
    mapping(uint256 => uint16) public tokenIdToMusicIds;
    mapping(uint16 => uint16) public drawCache;
    IRenderer public renderer;
    string public baseImageUrl;
    string public baseAnimationUrl;
    string private _description;
    string private _baseExternalUrl;

    constructor(address rendererAddress) ERC721("GenArtMusic", "GAM") {
        renderer = IRenderer(rendererAddress);
        totalSupply = 4;
        _mint(_msgSender(), 1);
        _mint(_msgSender(), 2);
        _mint(_msgSender(), 3);
        _mint(_msgSender(), 4);
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

    function setRoyalty(address royaltyReceiver, uint96 royaltyFeeNumerator) external onlyOwner {
        _setDefaultRoyalty(royaltyReceiver, royaltyFeeNumerator);
    }

    function mint(address to) external {
        require(totalSupply <= (4 + 128), "all minted");
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
        if (tokenId == 1) {
            return IGenArtMusic.MusicParam(IGenArtMusic.Rarity.OneOfOne, IGenArtMusic.Rhythm.Glitch, IGenArtMusic.Speech.LittleBoy, IGenArtMusic.Drone.Glitch, IGenArtMusic.Melody.Lead);
        } else if (tokenId == 2) {
            return IGenArtMusic.MusicParam(IGenArtMusic.Rarity.OneOfOne, IGenArtMusic.Rhythm.HiFi, IGenArtMusic.Speech.FussyMan, IGenArtMusic.Drone.LFO, IGenArtMusic.Melody.Pluck);
        } else if (tokenId == 3) {
            return IGenArtMusic.MusicParam(IGenArtMusic.Rarity.OneOfOne, IGenArtMusic.Rhythm.LoFi, IGenArtMusic.Speech.OldMan, IGenArtMusic.Drone.Freak, IGenArtMusic.Melody.Pad);
        } else if (tokenId == 4) {
            return IGenArtMusic.MusicParam(IGenArtMusic.Rarity.OneOfOne, IGenArtMusic.Rhythm.LoFi, IGenArtMusic.Speech.OldMan, IGenArtMusic.Drone.Freak, IGenArtMusic.Melody.Pad);
        }

        uint16 randomSeed = 111; // TODO:
        uint8 number = uint8((tokenIdToMusicIds[tokenId] + randomSeed) % 128);
        if (number < 10) {
            return IGenArtMusic.MusicParam(IGenArtMusic.Rarity.UltraRare, IGenArtMusic.Rhythm.Shuffle, IGenArtMusic.Speech.Shuffle, IGenArtMusic.Drone.Shuffle, IGenArtMusic.Melody.Shuffle);
        } else if (number < 30) {
            IGenArtMusic.Rhythm rhythm = number % 4 == 0 ? IGenArtMusic.Rhythm.Thick : number % 4 == 1 ? IGenArtMusic.Rhythm.LoFi : number % 4 == 2 ? IGenArtMusic.Rhythm.HiFi : IGenArtMusic.Rhythm.Glitch;
            return IGenArtMusic.MusicParam(IGenArtMusic.Rarity.SuperRare, rhythm, IGenArtMusic.Speech.Shuffle, IGenArtMusic.Drone.Shuffle, IGenArtMusic.Melody.Shuffle);
        } else if (number < 54) {
            IGenArtMusic.Rhythm rhythm = number % 4 == 0 ? IGenArtMusic.Rhythm.Thick : number % 4 == 1 ? IGenArtMusic.Rhythm.LoFi : number % 4 == 2 ? IGenArtMusic.Rhythm.HiFi : IGenArtMusic.Rhythm.Glitch;
            IGenArtMusic.Melody melody = number % 4 == 0 ? IGenArtMusic.Melody.Piano : number % 4 == 1 ? IGenArtMusic.Melody.Pad : number % 4 == 2 ? IGenArtMusic.Melody.Pluck : IGenArtMusic.Melody.Lead;
            return IGenArtMusic.MusicParam(IGenArtMusic.Rarity.Rare, rhythm, IGenArtMusic.Speech.Shuffle, IGenArtMusic.Drone.Shuffle, melody);
        } else {
            return IGenArtMusic.MusicParam(IGenArtMusic.Rarity.Common, IGenArtMusic.Rhythm.Glitch, IGenArtMusic.Speech.Shuffle, IGenArtMusic.Drone.Glitch, IGenArtMusic.Melody.Lead);
        }
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
                '","attributes":[{"trait_type":"Rarity","value":"',
                getRarity(param.rarity),
                '"},{"trait_type":"Rhythm","value":"',
                getRhythmName(param.rhythm),
                '"},{"trait_type":"Drone","value":"',
                getDroneName(param.drone),
                '"},{"trait_type":"Melody","value":"',
                getMelodyName(param.melody),
                '"},{"trait_type":"Speech","value":"',
                getSpeechName(param.speech),
                '"}]}'
            );
    }

    function getImage(uint256 tokenId, MusicParam memory param) private view returns (string memory) {
        if (bytes(baseAnimationUrl).length > 0) {
            return string.concat(baseAnimationUrl, Strings.toString(tokenId));
        }
        return renderer.dataURI(tokenId, param);
    }

    function getRarity(IGenArtMusic.Rarity val) private pure returns (string memory) {
        if (val == IGenArtMusic.Rarity.Common) return "Common";
        if (val == IGenArtMusic.Rarity.Rare) return "Rare";
        if (val == IGenArtMusic.Rarity.SuperRare) return "Super Rare";
        if (val == IGenArtMusic.Rarity.UltraRare) return "Ultra Rare";
        if (val == IGenArtMusic.Rarity.OneOfOne) return "1 of 1";
        return "";
    }

    function getRhythmName(IGenArtMusic.Rhythm val) private pure returns (string memory) {
        if (val == IGenArtMusic.Rhythm.Thick) return "Thick";
        if (val == IGenArtMusic.Rhythm.LoFi) return "Lo-Fi";
        if (val == IGenArtMusic.Rhythm.HiFi) return "Hi-Fi";
        if (val == IGenArtMusic.Rhythm.Glitch) return "Glitch";
        if (val == IGenArtMusic.Rhythm.Shuffle) return "(Shuffle)";
        return "";
    }

    function getSpeechName(IGenArtMusic.Speech val) private pure returns (string memory) {
        if (val == IGenArtMusic.Speech.LittleGirl) return "Little girl";
        if (val == IGenArtMusic.Speech.OldMan) return "Old man";
        if (val == IGenArtMusic.Speech.FussyMan) return "Fussy man";
        if (val == IGenArtMusic.Speech.LittleBoy) return "Little boy";
        if (val == IGenArtMusic.Speech.Shuffle) return "(Shuffle)";
        return "";
    }

    function getDroneName(IGenArtMusic.Drone val) private pure returns (string memory) {
        if (val == IGenArtMusic.Drone.Lyra) return "Lyra";
        if (val == IGenArtMusic.Drone.Freak) return "Freak";
        if (val == IGenArtMusic.Drone.LFO) return "LFO";
        if (val == IGenArtMusic.Drone.Glitch) return "Glitch";
        if (val == IGenArtMusic.Drone.Shuffle) return "(Shuffle)";
        return "";
    }

    function getMelodyName(IGenArtMusic.Melody val) private pure returns (string memory) {
        if (val == IGenArtMusic.Melody.Piano) return "Piano";
        if (val == IGenArtMusic.Melody.Pad) return "Pad";
        if (val == IGenArtMusic.Melody.Pluck) return "Pluck";
        if (val == IGenArtMusic.Melody.Lead) return "Lead";
        if (val == IGenArtMusic.Melody.Shuffle) return "(Shuffle)";
        return "";
    }

    function supportsInterface(bytes4 _interfaceId) public view virtual override(ERC721, ERC2981) returns (bool) {
        return ERC721.supportsInterface(_interfaceId) || super.supportsInterface(_interfaceId);
    }
}
