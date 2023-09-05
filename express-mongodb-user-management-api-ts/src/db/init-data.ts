import * as authorityService from "../services/authority-service";
import * as userService from "../services/user-service";
import * as whitelistService from "../services/whitelist-service";


(async () => {
    console.log('[MONGODB] init data');

    try {

        await whitelistService.createMany(['localhost', '127.0.0.1', '172.28.160.1', '192.168.231.31']);

        await userService.create('admin', 'admin');

        await authorityService.create('USR_R', 'READ data users');
        await authorityService.create('USR_M', 'Modify data users');

    } catch (error) {
        console.error(error);
    }

    process.exit();
})()