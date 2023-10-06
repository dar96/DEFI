const DariToken = artifacts.require("DariToken")
const CoolToken = artifacts.require("CoolToken")
const TokenFarm = artifacts.require("TokenFarm")

module.exports = async function(deployer, network, accounts) {

    // Despliegue del DariToken
    await deployer.deploy(DariToken)
    const dariToken = await DariToken.deployed()

    // Despliegue del CoolToken
    await deployer.deploy(CoolToken)
    const coolToken = await CoolToken.deployed()

    // Despliegue del TokenFarm
    await deployer.deploy(TokenFarm, coolToken.address, dariToken.address)
    const tokenFarm = await TokenFarm.deployed()

    // Transferir tokens CoolToken(token de recompensa) a tokenFarm (1 millon de tokens)
    await coolToken.transfer(tokenFarm.address, "1000000000000000000000000")

    // Transferencia de los tokens para el staking
    await dariToken.transfer(accounts[0], "100000000000000000000")
}