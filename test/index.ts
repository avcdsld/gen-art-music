import { expect } from "chai";
import { ethers } from "hardhat";
const crypto = require("crypto");

const genRandomAddress = () => {
  const id = crypto.randomBytes(32).toString("hex");
  const privateKey = "0x" + id;
  const wallet = new ethers.Wallet(privateKey);
  return wallet.address;
}

describe("AsyncToSync", function () {
  it("should mint randomly", async function () {
    // Deploy contracts
    const terraNullius = await (await ethers.getContractFactory("TerraNullius")).deploy();
    await terraNullius.deployed();
    const cutUpGenerator = await (await ethers.getContractFactory("CutUpGeneration")).deploy(terraNullius.address);
    await cutUpGenerator.deployed();
    const renderer = await (await ethers.getContractFactory("Renderer")).deploy(cutUpGenerator.address);
    await renderer.deployed();
    const asyncToSync = await (await ethers.getContractFactory("AsyncToSync")).deploy(renderer.address);
    await asyncToSync.deployed();

    // Prepare TerraNullius for testing
    for (let i = 0; i < 40; i++) {
      const tx = await terraNullius.claim("test" + i);
      await tx.wait();
    }

    // Setup renderer (p5.js url and image url etc.)
    await (await renderer.setAnimationUrl("https://cryptorecord-storage-dev.kumaleon.com/" + asyncToSync.address + "/", ".html")).wait();
    await (await renderer.setScriptUrl("https://ara.mypinata.cloud/ipfs/QmRp94673XW9oTmY311g542tLaKocELC7aNFhu7rVz3kFB/script.js")).wait();
    await (await renderer.setExternalScript(
      '<script src="https://ara.mypinata.cloud/ipfs/QmRp94673XW9oTmY311g542tLaKocELC7aNFhu7rVz3kFB/audioworklet-polyfill.js"></script>' +
      '<script src="https://ara.mypinata.cloud/ipfs/QmRp94673XW9oTmY311g542tLaKocELC7aNFhu7rVz3kFB/p5.min.js"></script>' +
      '<script src="https://ara.mypinata.cloud/ipfs/QmRp94673XW9oTmY311g542tLaKocELC7aNFhu7rVz3kFB/p5.sound.min.js"></script>'
    )).wait();
    await (await renderer.setSoundBaseUrl("https://ara.mypinata.cloud/ipfs/QmSv9SwzNFGBeqWxvxaDzrfHgjcKVAE958xoE5VaRUM5Er/")).wait();
    await (await renderer.setImageUrl("https://ara.mypinata.cloud/ipfs/QmX3KvbuV45UWTcv3Tab93VuuW51A8b7eKG9XEbXFfCYKj/#", "")).wait();
    await (await renderer.setBaseExternalUrl("https://cryptorecord.kumaleon.com/#")).wait();

    // Check initial status
    const totalNum = 128;
    const price = ethers.utils.parseEther("0.1");
    expect(await asyncToSync.tokenRemaining()).to.equal(totalNum);
    expect(await asyncToSync.PRICE()).to.equal(price);

    // Mint by owner
    const mintByOwnerNum = 5;
    for (let i = 0; i < mintByOwnerNum; i++) {
      const tx = await asyncToSync.mintByOwner(genRandomAddress());
      await tx.wait();
    }

    // Mint Extra by owner
    const mintExtraByOwnerNum = 128;
    for (let i = 0; i < mintExtraByOwnerNum; i++) {
      const tx = await asyncToSync.mintExtraByOwner(genRandomAddress());
      await tx.wait();
    }

    // Batch Mint
    await (await asyncToSync.setOnSale(true)).wait();
    const batchMintNum = 82;
    await (await asyncToSync.batchMint(genRandomAddress(), 2, { value: price.mul(2) })).wait();
    await (await asyncToSync.batchMint(genRandomAddress(), 10, { value: price.mul(10) })).wait();
    await (await asyncToSync.batchMint(genRandomAddress(), 20, { value: price.mul(20) })).wait();
    await (await asyncToSync.batchMint(genRandomAddress(), 50, { value: price.mul(50) })).wait();
    await expect(asyncToSync.batchMint(genRandomAddress(), 50, { value: price })).to.be.revertedWith(
      "not enough left"
    );
    await expect(asyncToSync.batchMint(genRandomAddress(), 10, { value: price })).to.be.revertedWith(
      "invalid value"
    );

    // Mint
    for (let i = mintByOwnerNum + batchMintNum; i < totalNum; i++) {
      const tx = await asyncToSync.mint(genRandomAddress(), { value: price });
      await tx.wait();
    }

    // Check and withdraw ETH sales
    expect(await ethers.provider.getBalance(asyncToSync.address)).to.equal(price.mul(totalNum - mintByOwnerNum));
    const recipient = genRandomAddress();
    await (await asyncToSync.withdrawETH(recipient)).wait();
    expect(await ethers.provider.getBalance(asyncToSync.address)).to.equal(ethers.BigNumber.from(0));

    // Check each music params
    const rarities: { [key: string]: number } = {};
    const mintedSeeds: { [key: number]: boolean } = [];
    const totalSupply = (await asyncToSync.totalSupply()).toNumber();
    for (let i = 1; i <= totalSupply; i++) {
      const seed = await asyncToSync.seeds(i);
      mintedSeeds[seed] = true;

      const { rhythm, oscillator, adsr, lyric, rarity } = await asyncToSync.musicParam(i);
      console.log({ rhythm, oscillator, adsr, lyric, rarity }, seed);

      if (!rarities[rarity]) {
        rarities[rarity] = 0;
      }
      rarities[rarity]++;
    }
    for (let seed = 0; seed < totalNum; seed++) {
      expect(mintedSeeds[seed]).to.be.true;
    }

    // For debugging
    console.log(await asyncToSync.musicParam(5));
    console.log(await asyncToSync.tokenURI(5));
    console.log({ rarities });
  });
});
