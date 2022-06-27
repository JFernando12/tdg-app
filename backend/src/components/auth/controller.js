const bcrypt = require("bcrypt");

const table_auth = "auths";

const controller = (store) => {
    const register = async(data) => {
        data.user_password = await bcrypt.hash(data.user_password, 5);
        const auth = {
            auth_id: data.user_id,
            auth_username: data.user_username,
            auth_password: data.user_password,
            permission_id: data.permission_id
        }
        console.log(auth)
        await store.add(table_auth, auth);
    }

    return({
        register
    })
}

module.exports = controller;