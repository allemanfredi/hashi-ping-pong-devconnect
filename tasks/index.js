task('PingPong:deploy', 'Deploy Ping Pong contract')
  .addParam('yaho', 'Yaho contract address', undefined, types.string, false)
  .addParam('yaru', 'Yaru contract address', undefined, types.string, false)
  .addParam('otherChainId', 'Other chain id', undefined, types.number, false)
  .setAction(async (_taskArgs, _hre) => {
    const { ethers } = _hre
    const { yaho, yaru, otherChainId } = _taskArgs
    const PingPong = await ethers.getContractFactory('PingPong')
    const pingPong = await PingPong.deploy(yaho, yaru, otherChainId)
    console.log('PingPong deployed at:', pingPong.address)
  })

task('PingPong:setOtherPingPong', 'Set other Ping Pong contract address')
  .addParam('pingPong', 'PingPong contract address', undefined, types.string, false)
  .addParam('otherPingPong', 'Other PingPong contract address', undefined, types.string, false)
  .setAction(async (_taskArgs, _hre) => {
    const { ethers } = _hre
    const { pingPong: pingPongAddress, otherPingPong } = _taskArgs
    const PingPong = await ethers.getContractFactory('PingPong')
    const pingPong = await PingPong.attach(pingPongAddress)
    await pingPong.setOtherPingPong(otherPingPong)
    console.log('Other PingPong set')
  })

task('PingPong:ping', 'Ping')
  .addParam('pingPong', 'PingPong contract address', undefined, types.string, false)
  .addParam('messageRelays', 'Message Relays contracts', undefined, types.string, false)
  .addParam('adapters', 'Adapters contracts', undefined, types.string, false)
  .setAction(async (_taskArgs, _hre) => {
    const { ethers } = _hre
    const { pingPong: pingPongAddress, messageRelays, adapters } = _taskArgs
    const messageRelaysAddresses = messageRelays.split(',')
    const adaptersAddresses = adapters.split(',')
    const PingPong = await ethers.getContractFactory('PingPong')
    const pingPong = await PingPong.attach(pingPongAddress)
    const tx = await pingPong.ping(messageRelaysAddresses, adaptersAddresses)
    console.log('Ping:', tx.hash)
  })

// Goerli -> Gnosis
// npx hardhat PingPong:deploy --yaho 0xC1289f49A1972E2C359a0647707a74E24ce73F8b --yaru 0x0000000000000000000000000000000000000000 --other-chain-id 100 --network goerli
// PingPong: 0x99868E19ca1a77eb5972190e528CD9fceD9a413d
// npx hardhat PingPong:setOtherPingPong --ping-pong 0x99868E19ca1a77eb5972190e528CD9fceD9a413d --other-ping-pong 0xa4A926F1CA07B9DC7AC6FfCd200aa0d2F5caCc35 --network goerli
// AMBMessageRelay: 0x2433c921152b3de133f96762a9b359d02db34c93
// npx hardhat PingPong:ping --ping-pong 0x99868E19ca1a77eb5972190e528CD9fceD9a413d --message-relays 0x2433c921152b3de133f96762a9b359d02db34c93 --adapters 0xbA5B3f0643582E75AF252e7631dE62c046970167 --network goerli

// Gnogis -> Goerli
// npx hardhat PingPong:deploy --yaho 0x0000000000000000000000000000000000000000 --yaru 0x171C1161bCde7adB32a9Ca92c412d39bE6F97C59 --other-chain-id 5 --network gnosis
// PingPong: 0xa4A926F1CA07B9DC7AC6FfCd200aa0d2F5caCc35
// npx hardhat PingPong:setOtherPingPong --ping-pong 0xa4A926F1CA07B9DC7AC6FfCd200aa0d2F5caCc35 --other-ping-pong 0x99868E19ca1a77eb5972190e528CD9fceD9a413d --network gnosis
// AMBAdapter: 0xbA5B3f0643582E75AF252e7631dE62c046970167