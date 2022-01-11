//create a function that takes an object and array
function getValueForManyKeys(obj,arr){
        //loop through the array 
        var tempObj=obj;
        for(var i=0;i<arr.length;i++){
                try{
                tempObj=tempObj[arr[i]];
                }
                catch(error){
                        return null;
                }
        }
        return tempObj;
        }
//create a function that gets the keys from an object
function getKeys(obj){   
        var keys=[];
        for(var key in obj){
                keys.push(key);
        }
        return keys;
}
//create a function that checks whether an objects value contains a key
function hasKey(obj, key) {
        return key in obj;
}
// export all functions
export {
	getValueForManyKeys,
	getKeys,
	hasKey
};

