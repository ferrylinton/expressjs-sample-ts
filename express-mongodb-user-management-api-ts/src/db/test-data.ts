import { verifyUsernameAndPassword } from "./init-user-data";


(async () => {
    console.log('[MONGODB] test data');
    await verifyUsernameAndPassword();
    process.exit();
})()