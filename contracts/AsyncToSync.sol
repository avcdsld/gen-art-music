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

    uint256 public revealSeed;
    uint256 public blockNumberForRevealSeed;
    bool public revealed = false;

    uint8 public maxDrawsCount = 128;
    uint8 public tokenRemaining = 128;
    mapping(uint256 => uint8) public seeds;
    mapping(uint8 => uint8) public drawCache;

    IRenderer public renderer;
    string public imageUrl;
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

    function setImageUrl(string memory url) external onlyOwner {
        imageUrl = url;
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

    // Important: `reveal()` must be execulted within 256 blocks after this function is executed.
    function preReveal() external onlyOwner {
        require(blockNumberForRevealSeed == 0, "not first time");
        blockNumberForRevealSeed = block.number + 1;
    }

    function reveal() external onlyOwner {
        require(blockNumberForRevealSeed > 0, "must be preRevealed");
        require(!revealed, "already revealed");
        revealed = true;
        revealSeed = uint256(blockhash(blockNumberForRevealSeed));
    }

    function mint(address to) external {
        require(totalSupply <= (4 + maxDrawsCount), "all minted");
        uint256 tokenId = ++totalSupply;
        seeds[tokenId] = drawSeed();
        _safeMint(to, tokenId);
    }

    // Original code by Ping Chen. https://medium.com/taipei-ethereum-meetup/gas-efficient-card-drawing-in-solidity-af49bb135a08
    function drawSeed() private returns (uint8 seed) {
        uint160 seedFromOwner = uint160(_ownerOf(totalSupply - 1));
        uint256 seedFromBlock = uint(blockhash(block.number - 1));
        uint8 i = uint8((seedFromOwner + seedFromBlock) % tokenRemaining);
        seed = drawCache[i] == 0 ? i : drawCache[i];
        tokenRemaining--;
        drawCache[i] = drawCache[tokenRemaining] == 0 ? tokenRemaining : drawCache[tokenRemaining];
    }

    function musicParam(uint256 tokenId) public view returns (IAsyncToSync.MusicParam memory) {
        if (tokenId == 1) {
            return IAsyncToSync.MusicParam(IAsyncToSync.Rarity.OneOfOne, IAsyncToSync.Rhythm.Glitch, IAsyncToSync.Lyric.LittleBoy, IAsyncToSync.Oscillator.Glitch, IAsyncToSync.ADSR.Lead);
        } else if (tokenId == 2) {
            return IAsyncToSync.MusicParam(IAsyncToSync.Rarity.OneOfOne, IAsyncToSync.Rhythm.HiFi, IAsyncToSync.Lyric.FussyMan, IAsyncToSync.Oscillator.LFO, IAsyncToSync.ADSR.Pluck);
        } else if (tokenId == 3) {
            return IAsyncToSync.MusicParam(IAsyncToSync.Rarity.OneOfOne, IAsyncToSync.Rhythm.LoFi, IAsyncToSync.Lyric.OldMan, IAsyncToSync.Oscillator.Freak, IAsyncToSync.ADSR.Pad);
        } else if (tokenId == 4) {
            return IAsyncToSync.MusicParam(IAsyncToSync.Rarity.OneOfOne, IAsyncToSync.Rhythm.Thick, IAsyncToSync.Lyric.LittleGirl, IAsyncToSync.Oscillator.Lyra, IAsyncToSync.ADSR.Piano);
        }

        require(revealed, "not revealed");

        uint8 number = uint8((seeds[tokenId] + revealSeed) % maxDrawsCount);
        if (number < 10) {
            return IAsyncToSync.MusicParam(IAsyncToSync.Rarity.UltraRare, IAsyncToSync.Rhythm.Shuffle, IAsyncToSync.Lyric.Shuffle, IAsyncToSync.Oscillator.Shuffle, IAsyncToSync.ADSR.Shuffle);
        } else if (number < 30) {
            IAsyncToSync.Rhythm rhythm = number % 4 == 0 ? IAsyncToSync.Rhythm.Thick : number % 4 == 1 ? IAsyncToSync.Rhythm.LoFi : number % 4 == 2 ? IAsyncToSync.Rhythm.HiFi : IAsyncToSync.Rhythm.Glitch;
            return IAsyncToSync.MusicParam(IAsyncToSync.Rarity.SuperRare, rhythm, IAsyncToSync.Lyric.Shuffle, IAsyncToSync.Oscillator.Shuffle, IAsyncToSync.ADSR.Shuffle);
        } else if (number < 54) {
            IAsyncToSync.Rhythm rhythm = number % 4 == 0 ? IAsyncToSync.Rhythm.Thick : number % 4 == 1 ? IAsyncToSync.Rhythm.LoFi : number % 4 == 2 ? IAsyncToSync.Rhythm.HiFi : IAsyncToSync.Rhythm.Glitch;
            IAsyncToSync.ADSR adsr = number % 4 == 0 ? IAsyncToSync.ADSR.Piano : number % 4 == 1 ? IAsyncToSync.ADSR.Pad : number % 4 == 2 ? IAsyncToSync.ADSR.Pluck : IAsyncToSync.ADSR.Lead;
            return IAsyncToSync.MusicParam(IAsyncToSync.Rarity.Rare, rhythm, IAsyncToSync.Lyric.Shuffle, IAsyncToSync.Oscillator.Shuffle, adsr);
        } else {
            return IAsyncToSync.MusicParam(IAsyncToSync.Rarity.Common, IAsyncToSync.Rhythm.Glitch, IAsyncToSync.Lyric.Shuffle, IAsyncToSync.Oscillator.Glitch, IAsyncToSync.ADSR.Lead);
        }
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "not exists");
        return string.concat("data:application/json;utf8,", getMetadata(tokenId));
    }

    function getMetadata(uint256 tokenId) private view returns (string memory) {
        if (revealed && bytes(imageUrl).length == 0) {
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
                    '"},{"trait_type":"Oscillator","value":"',
                    getOscillatorName(param.oscillator),
                    '"},{"trait_type":"ADSR","value":"',
                    getADSRName(param.adsr),
                    '"},{"trait_type":"Lyric","value":"',
                    getLyricName(param.lyric),
                    '"}]}'
                );
        }
        return
            string.concat(
                '{"name":"AsyncToSync #',
                Strings.toString(tokenId),
                '","description":"',
                _description,
                '","image":"',
                imageUrl,
                '","external_url":"',
                _baseExternalUrl,
                Strings.toString(tokenId),
                '","attributes":[{"trait_type":"Rarity","value":"Unknown"}]}'
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

    function supportsInterface(bytes4 _interfaceId) public view virtual override(ERC721, ERC2981) returns (bool) {
        return ERC721.supportsInterface(_interfaceId) || super.supportsInterface(_interfaceId);
    }
}
