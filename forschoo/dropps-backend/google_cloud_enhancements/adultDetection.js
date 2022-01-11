import vision from '@google-cloud/vision';
async function quickstart(){
	const client = new vision.ImageAnnotatorClient();
  // Performs label detection on the image file
  const [result] = await client.safeSearchDetection('https://ipfs.lukso.network/ipfs/QmUNc1KNLNfkuQSnGJ7Eez4u7XzbC7F4a5wALkovvDDLw9');
  const labels = result.safeSearchAnnotation;
	const detections = result.safeSearchAnnotation;
console.log('Safe search:');
console.log(`Adult: ${detections.adult}`);
console.log(`Medical: ${detections.medical}`);
console.log(`Spoof: ${detections.spoof}`);
console.log(`Violence: ${detections.violence}`);
}
quickstart();
