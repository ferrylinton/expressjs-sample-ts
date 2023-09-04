import * as authorityService from "../services/authority-service";
import { handleMongoServerError } from "../util/mongodb-util";

export const createAuthority = async () => {
    try {
        await authorityService.create('USR_R', 'READ data users');
        await authorityService.create('USR_M', 'Modify data users');
    } catch (error: any) {
        handleMongoServerError(error);
    }
}
