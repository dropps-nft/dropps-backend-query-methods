import Web3 from 'web3';
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 8000;
/*const web3provider = new Web3(
  new Web3.providers.HttpProvider('https://rpc.l14.lukso.network'),
);*/

const web3provider = new Web3(
 // new Web3.providers.HttpProvider('wss://rpc.l14.lukso.network/ws'),
  new Web3.providers.HttpProvider('https://rpc.l14.lukso.network'),
);
var web3 = new Web3(web3provider);
const chainId = 22 // Chain Id of the network you want to connect to
const ERC725AccountSchema = [{
    name: 'SupportedStandards:ERC725Account',
    key: '0xeafec4d89fa9619884b6b89135626455000000000000000000000000afdeb5d6',
    keyType: 'Mapping',
    valueContent: '0xafdeb5d6',
    valueType: 'bytes',
  },
  {
    name: 'LSP3Profile',
    key: '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5',
    keyType: 'Singleton',
    valueContent: 'JSONURL',
    valueType: 'bytes',
  },
  {
    name: 'LSP1UniversalReceiverDelegate',
    key: '0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47',
    keyType: 'Singleton',
    valueContent: 'Address',
    valueType: 'address',
  },
];
var LSP4DigitalAssetSchemaNotJsoned=[
    {
        "name": "SupportedStandards:LSP4DigitalAsset",
        "key": "0xeafec4d89fa9619884b6b89135626455000000000000000000000000a4d96624",
        "keyType": "Mapping",
        "valueContent": "0xa4d96624",
        "valueType": "bytes",
    },
    {
        "name": "LSP4TokenName",
        "key": "0xdeba1e292f8ba88238e10ab3c7f88bd4be4fac56cad5194b6ecceaf653468af1",
        "keyType": "Singleton",
        "valueContent": "String",
        "valueType": "string"
    },
    {
        "name": "LSP4TokenSymbol",
        "key": "0x2f0a68ab07768e01943a599e73362a0e17a63a72e94dd2e384d2c1d4db932756",
        "keyType": "Singleton",
        "valueContent": "String",
        "valueType": "string"
    },
    {
        "name": "LSP4Metadata",
        "key": "0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e",
        "keyType": "Singleton",
        "valueContent": "JSONURL",
        "valueType": "bytes"
    },
    {
        "name": "LSP4CreatorsMap:<address>",
        "key": "0x6de85eaf5d982b4e00000000<address>",
        "keyType": "Mapping",
        "valueContent": "Mixed",
        "valueType": "bytes"
    },
    {
        "name": "LSP4Creators[]",
        "key": "0x114bd03b3a46d48759680d81ebb2b414fda7d030a7105a851867accf1c2352e7",
        "keyType": "Array",
        "valueContent": "Number",
        "valueType": "uint256",
        "elementValueContent": "Address",
        "elementValueType": "address"
    },
];
var LSP4DigitalAssetSchema=LSP4DigitalAssetSchemaNotJsoned.map(x=>JSON.parse(JSON.stringify(x)))
var blockNumber = 11045925;
var blockNumber =8634120;
var increment = 65;
const provider = new Web3.providers.HttpProvider(
  'https://rpc.l14.lukso.network',
);
const config = {
  ipfsGateway: 'https://ipfs.lukso.network/ipfs/',
};
export{port,web3,chainId,provider,blockNumber,increment,config,ERC725AccountSchema,LSP4DigitalAssetSchema}
