import { ethers } from "hardhat";

async function main() {
	const terraNullius = await (await ethers.getContractFactory("TerraNullius")).deploy();
	await terraNullius.deployed();
	console.log("TerraNullius deployed to:", terraNullius.address);

	const cutUpGenerator = await (await ethers.getContractFactory("CutUpGeneration")).deploy(terraNullius.address);
	await cutUpGenerator.deployed();
	console.log("CutUpGeneration deployed to:", cutUpGenerator.address);

	const renderer = await (await ethers.getContractFactory("Renderer")).deploy(cutUpGenerator.address);
	await renderer.deployed();
	console.log("Renderer deployed to:", renderer.address);

	const asyncToSync = await (await ethers.getContractFactory("AsyncToSync")).deploy(renderer.address);
	await asyncToSync.deployed();
	console.log("AsyncToSync deployed to:", asyncToSync.address);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
