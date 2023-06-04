## Goerli

```
TerraNullius deployed to: 0x668575bF5263c1139DF9F58a62A00f555CBC2FFA
CutUpGeneration deployed to: 0x6c5aCE38487B60E1DB82328a45F216D48539C4Ed
Renderer deployed to: 0x9d96fCCa46e3cE8AFa83efa90fd4770b3330260c
AsyncToSync deployed to: 0xA5884b59e3F76564100a4d946c2f2426484168b5
```

```
TerraNullius deployed to: 0xCd0b105f30da96d7930699BEFb526300c3C8be69
CutUpGeneration deployed to: 0x72265665d02E668e35879437e78F91fE70DeEA01
Renderer deployed to: 0x1978F72d48E3F4630EaE39d065EC2c7453997Aff
AsyncToSync deployed to: 0xEA275E410237c056a7F969E13bCF6f44fCbaD40c
```

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
