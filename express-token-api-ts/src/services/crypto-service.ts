import Cryptr from 'cryptr';
import { destr } from 'destr';

const cryptr = new Cryptr('db25093eb4efd20d39b85fb0c43aea2bc55fcbb450715664c2f23c50c020d931ee778b8fb2880f5f0fe679ffdae36db7c686e0b6e7bd', { pbkdf2Iterations: 1, saltLength: 1 });

export function encrypt(ip: string, username: string, authorities: string[]) {
    const str = `${ip},${username},${authorities.join('-')}`
    return cryptr.encrypt(str);
}

export function decrypt(encryptedString: string): AuthData {
    const result = cryptr.decrypt(encryptedString).split(',');
    console.log(result);
    const username = result[0];
    const ip = result[1];
    const authorities = result[2].split('-');
    return {
        username,
        ip,
        authorities
    };
}