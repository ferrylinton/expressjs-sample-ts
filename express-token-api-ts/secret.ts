import { randomBytes } from 'crypto';
import { decrypt, encrypt } from './src/services/crypto-service';
import { destr } from 'destr';

//const secret = randomBytes(64).toString('hex');
//console.log(secret);



const encrypted = encrypt("ferrylinton", "127.0.0.1", ['aaa','bbb','ccc','ddd']);
console.log(encrypted);
const result = decrypt(encrypted);
console.log(result);