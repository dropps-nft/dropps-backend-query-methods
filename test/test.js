import assert from 'assert';
import {compareAddresses} from '../firebaseMethods.js';
describe('test', () => {
  it('should pass', async() => {
	  var list1=["abcd","efg"]
	  var list2=["efg","zzz","kkk"];
	  console.log((await compareAddresses(list1,list2)));
    assert.equal(1, 1);
  });
});
