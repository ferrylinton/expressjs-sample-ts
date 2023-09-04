import { createAuthority } from "./init-authority-data";
import { createUser } from "./init-user-data";


(async () => {
    console.log('[MONGODB] init data');
    await createAuthority();
    await createUser();
    process.exit();
})()