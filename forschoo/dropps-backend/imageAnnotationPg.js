import connectPg from './pg.js'
export default async function updateDb(address,tags,profileImage,backgroundImage,blockNumber){
var values0= [address];
var text0= 'select tags from addresses where address=$1';
var oldTags =await connectPg(text0,values0);
try{
for (var i in oldTags.tags){
const values1= [address,oldTags.tags[i]];
var text1= 'update tags set addresses= array_remove(tags.addresses,$1) where tags.tag=$2';
await connectPg(text1,values1);}
}
catch(error){console.log('tags are empty')}
const values= [address,tags,profileImage,backgroundImage,blockNumber];
var text= 'insert into addresses(address,tags,profileImage,backgroundImage,blockNumber) values($1,$2,$3,$4,$5) on CONFLICT  (address) do update set tags=$2, profileImage=$3,backgroundImage=$4, blockNumber=$5';
var newArrayLabels=await connectPg(text,values);
for (var j in tags){
//console.log(Array.from(newlabels)[j])
const values2= [address,tags[j],[address]]
const text2='insert into tags(tag,addresses) values($2,$3) on conflict (tag) do update set addresses=array_append(tags.addresses,$1) where tags.tag=$2';
var returnStuff=await connectPg(text2,values2);}
}
