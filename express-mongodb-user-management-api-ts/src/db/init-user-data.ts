import * as userService from "../services/user-service";
import { handleMongoServerError } from "../util/mongodb-util";

export const createUser = async () => {
    try {
        const newUser = await userService.create('admin', 'admin');
        console.log(newUser);

        const admin = await userService.verifyUsernameAndPassword('admin', 'admin');
        console.log(admin);
    } catch (error: any) {
        handleMongoServerError(error);
    }
}

export const verifyUsernameAndPassword = async () => {
    const admin = await userService.verifyUsernameAndPassword('admin', 'admin');
    console.log(admin);
}