## Ethereum

```
TerraNullius: 0x6e38A457C722C6011B2dfa06d49240e797844d66
CutUpGeneration deployed to: 0xc15c498fef73362208cf685045F5a7b0FdFa9b4B
Renderer deployed to: 0xb25C7e64Eb948EBCF5A6e610014F0Af095b1AAc6
AsyncToSync deployed to: 0xC048bE32eaeC60BD03C1f28Df9836e958e4f5Ef3

npx hardhat verify 0xC048bE32eaeC60BD03C1f28Df9836e958e4f5Ef3 0xb25C7e64Eb948EBCF5A6e610014F0Af095b1AAc6 --network mainnet
```

## Goerli

```
TerraNullius deployed to: 0xA46712c46218e4EE9349985930641816a4E9F2EC
CutUpGeneration deployed to: 0xd1eD780c50736AA0a2bBc91DBa77f483F002e01F
Renderer deployed to: 0x7580D4969Cb6c3E9650dB8Da66dFd1960eacbae5
AsyncToSync deployed to: 0x06699B7096424a0Dd881847c1208216e065Db2c3
```

## Mumbai

```
TerraNullius deployed to: 0xBc824713819304E02cEa2aB8A5289C84Ff58d172
CutUpGeneration deployed to: 0x4A92F9008dD5c79baD7BE15603DDA4a639aa9001
Renderer deployed to: 0x3118B6e2371CC786A6e88226f2786b690409a14d
AsyncToSync deployed to: 0xeF3d3ab68BAa8feaCcB413659e950e7402E45993
```

---

## Setting

- setDescription: `Async to Sync is an art series inspired by the relationship between generative art and generative music. The music and visuals are asynchronously and synchronously triggered by the smart contract in a generative way to explore new possibilities while taking advantage of their different unique characteristics. The NFT is composed of four layers, each of which has four sound elements, each lasting 3 minutes 20 seconds and they all come together to be a single piece of art.\\n\\n[d] key : Toggle display of debug mode message\\n\\n[m] key : Switch to MIC input mode\\n\\n[s] key : Get Screenshot\\n\\n[←↑→↓] : Move the Camera\\n\\n[r]key : Apply automatic Camera movement mode\\n\\n[c] key : Show texts from Bitcoin white paper and Terra Nullius`
- setAnimationUrl: `https://cryptorecord-storage.kumaleon.com/{contract address}/` / `.html`
- setScriptUrl: `/scripts/script.js`
- setExternalScript: `<script src="/scripts/audioworklet-polyfill.js"></script><script src="/scripts/p5.min.js"></script><script src="/scripts/p5.sound.min.js"></script>`
- setSoundBaseUrl: `https://cryptorecord-storage.kumaleon.com/sounds/`
- setImageUrl: `https://cryptorecord-storage.kumaleon.com/{contract address}/` / `.png`
- setBaseExternalUrl: `https://cryptorecord-storage.kumaleon.com/{contract address}/animation_url/`

---

# Advanced Sample Hardhat Project

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/deploy.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
