const { v4: uuid } = require("uuid");
const pagination = require("../../utils/pagination");
const table_permissions = "permissions";

const controller = (store) => {
    const list = async(query) => {
        let limit = 5;
        let offset = 0;
        const count = await store.count(table_permissions);
        if(query.limit) {
            limit = query.limit;
        }
        if(query.offset) {
            offset = query.offset
        }

        const next = pagination.next(table_permissions, count, offset, limit);
        const previous = pagination.previous(table_permissions, count, offset, limit);
        const rows = await store.list(table_permissions, "permission_id", "permission_name", limit, offset);

        return({
            count,
            next,
            previous,
            rows
        })
    }

    const getOne = async(permission_id) => {
        return await store.getOne(table_permissions, {permission_id});
    }

    const add = async(data) => {
        data.permission_id = uuid();
        await store.add(table_permissions, data);
    }

    const remove = async(permission_id) => {
        await store.remove(table_permissions, {permission_id});
    }

    const update = async(permission_id, data) => {
        await store.update(table_permissions, {permission_id}, data);
    }

    return({
        list,
        getOne,
        add,
        remove,
        update
    })
}

module.exports = controller;