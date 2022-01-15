import { initializeApp } from "firebase/app";
import {getDoc, doc, setDoc ,getFirestore,updateDoc,arrayUnion } from "firebase/firestore";
import dotenv from "dotenv";
dotenv.config();
const firebaseApp = initializeApp({
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId});
const db= getFirestore();

//compare the two listsOfAddresses and return addresses that are in list1 but not in list2
async function compareAddresses(adrList1,adrList2) {
	const diff= adrList1.filter(adr => !adrList2.includes(adr));
 	return diff;
}
async function getPermissionedAddresses(ownedAddress) {
	const docRef=doc(db,"ownedAddresses",ownedAddress);
	const docSnapshot=await getDoc(docRef);
	if(docSnapshot.exists) {
		try {
			const permissionedAddresses=docSnapshot.data().permissionedAddresses;
			return permissionedAddresses;
		} catch(error) {
			return [];
		}
	}
	else{
		return [];
	}
}
async function updatePermissionedAddresses(ownedAddress,permissionedAddresses) {
	await setDoc(doc(db,"ownedAddresses",ownedAddress),{
	permissionedAddresses: permissionedAddresses
	});
	
}
async function addOwnedAddress(permissionedAddress,ownedAddress) {
	const docRef=doc(db,"permissionedAddresses",permissionedAddress);
	await setDoc(docRef,{
		ownedAddresses: arrayUnion(ownedAddress)
	});
}
async function removeOwnedAddress(permissionedAddress,ownedAddress) {
	await setDoc(db,"permissionedAddresses",permissionedAddress,{
		ownedAddresses: arrayRemove(ownedAddress)
	});
}

export { compareAddresses,getPermissionedAddresses,updatePermissionedAddresses,addOwnedAddress,removeOwnedAddress};
