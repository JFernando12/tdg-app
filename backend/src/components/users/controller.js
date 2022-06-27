const { v4: uuid } = require("uuid");
const auth = require("../auth/index");
const pagination = require("../../utils/pagination");
const table_users = "users";

const controller = (store) => {
    const list = async(query) => {
        let limit = 5;
        let offset = 0;
        const count = await store.count(table_users);
        if(query.limit) {
            limit = query.limit;
        }
        if(query.offset) {
            offset = query.offset
        }

        const select = ["user_id", "user_name"];

        const next = pagination.next(table_users, count, offset, limit);
        const previous = pagination.previous(table_users, count, offset, limit);
        const rows = await store.list(table_users, select, [], limit, offset);

        return({
            count,
            next,
            previous,
            rows});
    }

    const getOne = async(user_id) => {
        return await store.getOne(table_users, {user_id});
    }

    const add = async(data) => {
        const user_id = uuid();
        data.user_id = user_id;

        const user = {
            user_id: data.user_id,
            user_name: data.user_name,
            user_lastname: data.user_lastname,
            user_username: data.user_username,
            user_email: data.user_email,
        }

        await store.add(table_users, user);
        await auth.register(data);
    }

    const update = async(user_id, data) => {
        await store.update(table_users, {user_id}, data);
    }

    const remove = async(user_id) => {
        await store.remove(table_users, {user_id});
    }

    return({
        list,
        getOne,
        add,
        update,
        remove
    })
}

module.exports = controller;