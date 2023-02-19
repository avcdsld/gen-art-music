// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IAsyncToSync {
    struct MusicParam {
        Rarity rarity;
        Rhythm rhythm;
        Speech speech;
        Drone drone;
        Melody melody;
    }

    enum Rarity {
        Common,
        Rare,
        SuperRare,
        UltraRare,
        OneOfOne
    }

    enum Rhythm {
        Thick,
        LoFi,
        HiFi,
        Glitch,
        Shuffle
    }

    enum Speech {
        LittleGirl,
        OldMan,
        FussyMan,
        LittleBoy,
        Shuffle
    }

    enum Drone {
        Lyra,
        Freak,
        LFO,
        Glitch,
        Shuffle
    }

    enum Melody {
        Piano,
        Pad,
        Pluck,
        Lead,
        Shuffle
    }
}
