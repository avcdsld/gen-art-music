import { ethers } from "hardhat";

async function main() {
	const [deployer] = await ethers.getSigners();

	// const asyncToSync_ = await (await ethers.getContractFactory("AsyncToSync")).attach("0x06699B7096424a0Dd881847c1208216e065Db2c3");
	// const renderer_ = await (await ethers.getContractFactory("Renderer")).attach("0x7580D4969Cb6c3E9650dB8Da66dFd1960eacbae5");
	// await (await renderer_.setAnimationUrl("https://cryptorecord-storage-dev.kumaleon.com/" + asyncToSync_.address.toLowerCase() + "/", ".html")).wait();
	// console.log(1);
	// await (await renderer_.setScriptUrl("https://cryptorecord-storage-dev.kumaleon.com/scripts/script.js")).wait();
	// console.log(2);
	// await (await renderer_.setExternalScript(
	// 	'<script src="https://cryptorecord-storage-dev.kumaleon.com/scripts/audioworklet-polyfill.js"></script>' +
	// 	'<script src="https://cryptorecord-storage-dev.kumaleon.com/scripts/p5.min.js"></script>' +
	// 	'<script src="https://cryptorecord-storage-dev.kumaleon.com/scripts/p5.sound.min.js"></script>'
	// )).wait();
	// console.log(3);
	// await (await renderer_.setSoundBaseUrl("https://cryptorecord-storage-dev.kumaleon.com/sounds/")).wait();
	// console.log(4);
	// await (await renderer_.setImageUrl("https://cryptorecord-storage-dev.kumaleon.com/" + asyncToSync_.address.toLowerCase() + "/", "")).wait();
	// console.log(5);
	// await (await renderer_.setBaseExternalUrl("https://cryptorecord.kumaleon.com/#")).wait();
	// console.log(6);
	// //
	// // const desc = "\\n"
	// // 	+ "[d] key : Toggle display of debug mode message\\n"
	// // 	+ "[m]key : Switch to MIC input mode\\n"
	// // 	+ "[s]key : Get Screenshot\\n"
	// // 	+ "[←↑→↓] : Move the Camera eye\\n"
	// // 	+ "\\n"
	// // 	+ "Built on Terra Nullius";
	// // await (await renderer_.setDescription(desc));
	// // console.log(6);
	// return;

	// const terraNullius = await (await ethers.getContractFactory("TerraNullius")).deploy();
	// await terraNullius.deployed();
	// console.log("TerraNullius deployed to:", terraNullius.address);

	// const cutUpGenerator = await (await ethers.getContractFactory("CutUpGeneration")).deploy(terraNullius.address);
	// // const cutUpGenerator = await (await ethers.getContractFactory("CutUpGeneration")).deploy("0xA46712c46218e4EE9349985930641816a4E9F2EC");
	// await cutUpGenerator.deployed();
	// console.log("CutUpGeneration deployed to:", cutUpGenerator.address);

	// const renderer = await (await ethers.getContractFactory("Renderer")).deploy(cutUpGenerator.address);
	const renderer = await (await ethers.getContractFactory("Renderer")).deploy("0xc15c498fef73362208cf685045F5a7b0FdFa9b4B");
	// const renderer = await (await ethers.getContractFactory("Renderer")).deploy("0xd1eD780c50736AA0a2bBc91DBa77f483F002e01F");
	await renderer.deployed();
	console.log("Renderer deployed to:", renderer.address);

	const asyncToSync = await (await ethers.getContractFactory("AsyncToSync")).deploy(renderer.address);
	await asyncToSync.deployed();
	console.log("AsyncToSync deployed to:", asyncToSync.address);

	// await (await renderer.setAnimationUrl("https://ara.mypinata.cloud/ipfs/QmUGeUwK8m54KWY8UJhk6tGdUPP2kfQK3L5FDVipK3iV4G/#", "")).wait();
	// console.log(1);
	// await (await renderer.setImageUrl("https://ara.mypinata.cloud/ipfs/QmX3KvbuV45UWTcv3Tab93VuuW51A8b7eKG9XEbXFfCYKj/#", "")).wait();
	// console.log(2);
	// await (await asyncToSync.mintByOwner(deployer.address)).wait();
	// console.log(3);
	// return;

	// Setup renderer (p5.js url and image url etc.)
	await (await renderer.setAnimationUrl("https://cryptorecord-storage-dev.kumaleon.com/" + asyncToSync.address.toLowerCase() + "/", ".html")).wait();
	console.log(1);
	await (await renderer.setScriptUrl("https://cryptorecord-storage-dev.kumaleon.com/scripts/script.js")).wait();
	console.log(2);
	await (await renderer.setExternalScript(
		'<script src="https://cryptorecord-storage-dev.kumaleon.com/scripts/audioworklet-polyfill.js"></script>' +
		'<script src="https://cryptorecord-storage-dev.kumaleon.com/scripts/p5.min.js"></script>' +
		'<script src="https://cryptorecord-storage-dev.kumaleon.com/scripts/p5.sound.min.js"></script>'
	)).wait();
	console.log(3);
	await (await renderer.setSoundBaseUrl("https://cryptorecord-storage-dev.kumaleon.com/sounds/")).wait();
	console.log(4);
	await (await renderer.setImageUrl("https://cryptorecord-storage-dev.kumaleon.com/" + asyncToSync.address.toLowerCase() + "/", "")).wait();
	console.log(5);
	await (await renderer.setBaseExternalUrl("https://cryptorecord.kumaleon.com/#")).wait();
	console.log(6);
	await (await asyncToSync.mintByOwner(deployer.address)).wait();
	console.log(7);

	// const description = "Async to Sync is an art series inspired by the relationship between generative art and generative music. The music and visuals are asynchronously and synchronously triggered by the smart contract in a generative way to explore new possibilities while taking advantage of their different unique characteristics. The NFT is composed of four layers, each of which has four sound elements, each lasting 3 minutes 20 seconds and they all come together to be a single piece of art.\\n"
	// 	+ "[d] key : Toggle display of debug mode message\\n"
	// 	+ "[m]key : Switch to MIC input mode\\n"
	// 	+ "[s]key : Get Screenshot\\n"
	// 	+ "[←↑→↓] : Move the Camera eye\\n"
	// 	+ "\\n"
	// 	+ "Built on Terra Nullius";
	// await (await renderer.setDescription(description));
	// console.log(6);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
