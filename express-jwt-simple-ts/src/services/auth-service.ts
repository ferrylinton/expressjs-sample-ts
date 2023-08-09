
import jsonwebtoken from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constant';

export async function authenticate(username: string, password: string) {
    if (username === 'admin' && password === 'admin') {
        const token = jsonwebtoken.sign({ sub: 'admin' }, JWT_SECRET);

        return {
            token
        };
    } else {
        return null;
    }
}