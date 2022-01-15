import express from "express";
import * as utils from 'util';
import UniversalProfile from "@lukso/universalprofile-smart-contracts/artifacts/UniversalProfile.json";
import ERC725Y from "@erc725/smart-contracts/artifacts/ERC725Y.json"
import LSP7DigitalAsset from '@lukso/universalprofile-smart-contracts/artifacts/LSP7DigitalAsset.json';
import fetch from 'node-fetch';
import * as fs from 'fs';
import { ERC725} from "@erc725/erc725.js";
import {port,web3,chainId,ERC725AccountSchema,LSP4DigitalAssetSchema,blockNumber,increment,provider,config} from './setup.js'
//import quickstart from './locationDetection.js'
import  { getValueForManyKeys,getKeys,hasKey } from './utils.js';
//import updateDb from './imageAnnotationPg.js'
import {getBlockScoutQuery} from './fetchMethods.js'
import { compareAddresses,getPermissionedAddresses,updatePermissionedAddresses,addOwnedAddress,removeOwnedAddress} from './firebaseMethods.js';
const app = express();
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
async function recursivelyQueueBlock(blockNumber, increment) {
	var dict = {};
	try{
		var latestBlock= await getBlockScoutQuery('https://blockscout.com/lukso/l14/api?module=block&action=eth_block_number');
		if (blockNumber >= latestBlock.result) {
			handleErrors(blockNumber,increment,700);
		} 
		else {
			var toBlock = (blockNumber + increment) >= latestBlock.result ? latestBlock.result - 1 : (blockNumber + increment - 1);
			try{
				var universalProfileData= await getBlockScoutQuery('https://blockscout.com/lukso/l14/api?module=logs&action=getLogs&fromBlock='+blockNumber+'&toBlock='+toBlock+'&topic0=0xece574603820d07bc9b91f2a932baadf4628aabcb8afba49776529c14a6104b2&topic0_1_opr=and&topic1=0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5')
				parseERC725Data(universalProfileData,ERC725AccountSchema,provider,config,UniversalProfile.abi);
				setTimeout(function() {
					blockNumber += increment;
					recursivelyQueueBlock(blockNumber, increment);
				}, 700);
			}
			catch(err){
				handleErrors(blockNumber,increment,2000);
				console.log(err)
			}
		}
	}
	catch(err){
		handleErrors(blockNumber,increment,2000);
	}
}
//  annotateImage('0x6623b3bcef6a8f2328d49283ae15deb460084589','https://ipfs.lukso.network/ipfs/Qmev9TiXXQCCWW8QHX8PwFbqpDjwMQ2eFLyUqrmEeuivqu',99);
//annotateImage(data.result[i].address,'https://ipfs.lukso.network/ipfs/' + x.LSP3Profile.LSP3Profile.profileImage[i].url.substr(7),blockNumber);

//parse Data returned from a blockscout ERC725 query
async function parseERC725Data(data,schema,provider,config,abi){
	if(data.result.length>=1){
		for (var i = 0; i < data.result.length; i++) {
			console.log(data.result[i])
			var address=data.result[i].address;
			const erc725 = new ERC725(schema, data.result[i].address, provider, config);
			var permissionedOwners=await getOwners('0xa46B1F981768Caa69F21C639765336A09D2ABd02');
			var previousPermissionedOwners=await getPermissionedAddresses('0xa46B1F981768Caa69F21C639765336A09D2ABd02');
			var addressDiff=await compareAddresses(previousPermissionedOwners,permissionedOwners);
			console.log(addressDiff,'addressDiff');
			//loop through addressDiff
			for(var j=0;j<addressDiff.length;j++){
				removeOwnedAddress('0xa46B1F981768Caa69F21C639765336A09D2ABd02',addressDiff[j]);
			}
			//loop through permissionedOwners
			for(var j=0;j<permissionedOwners.length;j++){
				addOwnedAddress(permissionedOwners[j],'0xa46B1F981768Caa69F21C639765336A09D2ABd02');
			}
			updatePermissionedAddresses('0xa46B1F981768Caa69F21C639765336A09D2ABd02',permissionedOwners);
			try {
				var x = await erc725.fetchData('LSP3Profile');
				var lsp3profile= x.LSP3Profile.LSP3Profile;
				console.log(lsp3profile['profileImage'][0]['url']);
				var tags=getValueForManyKeys(lsp3profile,['tags']);
				var profileImage=getValueForManyKeys(lsp3profile,['profileImage','0','url']);
				var backgroundImage=getValueForManyKeys(lsp3profile,['backgroundImage','0','url']);
				var mostUpdatedblock=parseInt(data.result[i].blockNumber);
				//updateDb(address,tags,profileImage,backgroundImage,mostUpdatedblock);
				console.log(address,tags,profileImage,backgroundImage,mostUpdatedblock,'aziza')
			} catch (error) {
				console.log('oh no')
			}
		}
	}
	else{console.log('no data')}
	console.log('aaa\n\n\n\n\n')
}

async function getOwners(address){
	var owners=[];
	//create a contract instance
	const universalProfile=new web3.eth.Contract(UniversalProfile.abi,address);
	const ADDRESS_PERMISSIONS_ARRAY_KEY = web3.utils.keccak256('AddressPermissions[]')
	// get the total number of addresses that have some permissions in our UP
	try{
	const total = await universalProfile.methods.getData([ADDRESS_PERMISSIONS_ARRAY_KEY]).call()
	//create a loop to get all the addresses
	console.log(hexToInt(total))
	var addresses=[];
	for (var i = 0; i < hexToInt(total); i++) {
	var intString=hexToInt(i).toString();
	var zero='0';
	var repeatLetter=zero.repeat(32-intString.length);
	var finalString=repeatLetter.concat(intString);
		let address= await universalProfile.methods.getData([ADDRESS_PERMISSIONS_ARRAY_KEY.slice(0, 34) + finalString]).call()
		console.log(address);
		addresses.push(address[0]);
		}
		return addresses;
	}
	catch(err){
		console.log(err)
	}
}
//function to convert a hex string to an int
function hexToInt(hex) {
	return parseInt(hex, 16);
}
function handleErrors(blockNumber,increment,timeout) {
	setTimeout(function() {
		recursivelyQueueBlock(blockNumber, increment)
	}, timeout);
}
recursivelyQueueBlock(blockNumber, increment);


app.listen(port, async () => {
	console.log(`Test at ${port}`);
});
