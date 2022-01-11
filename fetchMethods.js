import fetch from 'node-fetch';
async function getBlockScoutQuery(url) {
	//create a variable that has the name of the string held by param	
	try{
		var response=await fetch(url,{method:'GET',headers: {'Content-Type': 'application/json'}})
		if(response.ok){
		return response.json();
		}
		else{
			throw new Error('Error: '+response.statusText);
		}
	}
	catch(error) {throw error;}
}
export {getBlockScoutQuery};
