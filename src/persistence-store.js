// Standalone document store. Transactions never overwrite legacy browser libraries.
function createMicroseqStore(indexedDB,name='grimiss-microseq-state-v1'){
 let db;
 const ready=new Promise((resolve,reject)=>{if(!indexedDB){reject(Error('IndexedDB unavailable'));return;}const r=indexedDB.open(name,1);r.onupgradeneeded=()=>r.result.createObjectStore('records');r.onsuccess=()=>{db=r.result;db.onversionchange=()=>db.close();resolve();};r.onerror=()=>reject(r.error||Error('Cannot open local library'));r.onblocked=()=>reject(Error('Close older Microseq tabs to open the library'));});
 async function get(key){await ready;return new Promise((resolve,reject)=>{const t=db.transaction('records','readonly'),r=t.objectStore('records').get(key);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
 async function put(entries,expected={}){await ready;return new Promise((resolve,reject)=>{const t=db.transaction('records','readwrite'),s=t.objectStore('records');let failure=null;const checks=Object.entries(expected);let left=checks.length;function write(){for(const[k,v]of entries)s.put(v,k);}for(const[k,value]of checks){const r=s.get(k);r.onsuccess=()=>{if(JSON.stringify(r.result||{})!==JSON.stringify(value||{})){failure=Error('Library changed in another window. Reload before saving; working edits are retained.');t.abort();return;}if(--left===0)write();};}if(!left)write();t.oncomplete=()=>resolve();t.onerror=t.onabort=()=>reject(failure||t.error||Error('Library transaction failed'));});}

 async function all(prefix){await ready;return new Promise((resolve,reject)=>{const values=[],t=db.transaction('records','readonly'),r=t.objectStore('records').openCursor();r.onsuccess=()=>{const c=r.result;if(!c){resolve(values);return;}if(String(c.key).startsWith(prefix))values.push(c.value);c.continue();};r.onerror=()=>reject(r.error);});}
 return{ready,get,put,all};
}
