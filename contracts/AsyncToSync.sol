// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import {IAsyncToSync} from "./interfaces/IAsyncToSync.sol";
import {IRenderer} from "./interfaces/IRenderer.sol";

contract AsyncToSync is IAsyncToSync, ERC721, ERC2981, Ownable {
    uint256 public totalSupply;
    uint16 public tokenRemaining = 128;
    mapping(uint256 => uint16) public tokenIdToMusicIds;
    mapping(uint16 => uint16) public drawCache;
    IRenderer public renderer;
    string public baseImageUrl;
    string public baseAnimationUrl;
    string private _description;
    string private _baseExternalUrl;

    constructor(address rendererAddress) ERC721("AsyncToSync", "A2S") {
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

    function musicParam(uint256 tokenId) public view returns (IAsyncToSync.MusicParam memory) {
        if (tokenId == 1) {
            return IAsyncToSync.MusicParam(IAsyncToSync.Rarity.OneOfOne, IAsyncToSync.Rhythm.Glitch, IAsyncToSync.Speech.LittleBoy, IAsyncToSync.Drone.Glitch, IAsyncToSync.Melody.Lead);
        } else if (tokenId == 2) {
            return IAsyncToSync.MusicParam(IAsyncToSync.Rarity.OneOfOne, IAsyncToSync.Rhythm.HiFi, IAsyncToSync.Speech.FussyMan, IAsyncToSync.Drone.LFO, IAsyncToSync.Melody.Pluck);
        } else if (tokenId == 3) {
            return IAsyncToSync.MusicParam(IAsyncToSync.Rarity.OneOfOne, IAsyncToSync.Rhythm.LoFi, IAsyncToSync.Speech.OldMan, IAsyncToSync.Drone.Freak, IAsyncToSync.Melody.Pad);
        } else if (tokenId == 4) {
            return IAsyncToSync.MusicParam(IAsyncToSync.Rarity.OneOfOne, IAsyncToSync.Rhythm.Thick, IAsyncToSync.Speech.LittleGirl, IAsyncToSync.Drone.Lyra, IAsyncToSync.Melody.Piano);
        }

        uint16 randomSeed = 111; // TODO:
        uint8 number = uint8((tokenIdToMusicIds[tokenId] + randomSeed) % 128);
        if (number < 10) {
            return IAsyncToSync.MusicParam(IAsyncToSync.Rarity.UltraRare, IAsyncToSync.Rhythm.Shuffle, IAsyncToSync.Speech.Shuffle, IAsyncToSync.Drone.Shuffle, IAsyncToSync.Melody.Shuffle);
        } else if (number < 30) {
            IAsyncToSync.Rhythm rhythm = number % 4 == 0 ? IAsyncToSync.Rhythm.Thick : number % 4 == 1 ? IAsyncToSync.Rhythm.LoFi : number % 4 == 2 ? IAsyncToSync.Rhythm.HiFi : IAsyncToSync.Rhythm.Glitch;
            return IAsyncToSync.MusicParam(IAsyncToSync.Rarity.SuperRare, rhythm, IAsyncToSync.Speech.Shuffle, IAsyncToSync.Drone.Shuffle, IAsyncToSync.Melody.Shuffle);
        } else if (number < 54) {
            IAsyncToSync.Rhythm rhythm = number % 4 == 0 ? IAsyncToSync.Rhythm.Thick : number % 4 == 1 ? IAsyncToSync.Rhythm.LoFi : number % 4 == 2 ? IAsyncToSync.Rhythm.HiFi : IAsyncToSync.Rhythm.Glitch;
            IAsyncToSync.Melody melody = number % 4 == 0 ? IAsyncToSync.Melody.Piano : number % 4 == 1 ? IAsyncToSync.Melody.Pad : number % 4 == 2 ? IAsyncToSync.Melody.Pluck : IAsyncToSync.Melody.Lead;
            return IAsyncToSync.MusicParam(IAsyncToSync.Rarity.Rare, rhythm, IAsyncToSync.Speech.Shuffle, IAsyncToSync.Drone.Shuffle, melody);
        } else {
            return IAsyncToSync.MusicParam(IAsyncToSync.Rarity.Common, IAsyncToSync.Rhythm.Glitch, IAsyncToSync.Speech.Shuffle, IAsyncToSync.Drone.Glitch, IAsyncToSync.Melody.Lead);
        }
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "not exists");
        return string.concat("data:application/json;utf8,", getMetadata(tokenId));
    }

    function getMetadata(uint256 tokenId) private view returns (string memory) {
        IAsyncToSync.MusicParam memory param = musicParam(tokenId);
        return
            string.concat(
                '{"name":"AsyncToSync #',
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

    function getRarity(IAsyncToSync.Rarity val) private pure returns (string memory) {
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

    function getSpeechName(IAsyncToSync.Speech val) private pure returns (string memory) {
        if (val == IAsyncToSync.Speech.LittleGirl) return "Little girl";
        if (val == IAsyncToSync.Speech.OldMan) return "Old man";
        if (val == IAsyncToSync.Speech.FussyMan) return "Fussy man";
        if (val == IAsyncToSync.Speech.LittleBoy) return "Little boy";
        if (val == IAsyncToSync.Speech.Shuffle) return "(Shuffle)";
        return "";
    }

    function getDroneName(IAsyncToSync.Drone val) private pure returns (string memory) {
        if (val == IAsyncToSync.Drone.Lyra) return "Lyra";
        if (val == IAsyncToSync.Drone.Freak) return "Freak";
        if (val == IAsyncToSync.Drone.LFO) return "LFO";
        if (val == IAsyncToSync.Drone.Glitch) return "Glitch";
        if (val == IAsyncToSync.Drone.Shuffle) return "(Shuffle)";
        return "";
    }

    function getMelodyName(IAsyncToSync.Melody val) private pure returns (string memory) {
        if (val == IAsyncToSync.Melody.Piano) return "Piano";
        if (val == IAsyncToSync.Melody.Pad) return "Pad";
        if (val == IAsyncToSync.Melody.Pluck) return "Pluck";
        if (val == IAsyncToSync.Melody.Lead) return "Lead";
        if (val == IAsyncToSync.Melody.Shuffle) return "(Shuffle)";
        return "";
    }

    function supportsInterface(bytes4 _interfaceId) public view virtual override(ERC721, ERC2981) returns (bool) {
        return ERC721.supportsInterface(_interfaceId) || super.supportsInterface(_interfaceId);
    }
}
