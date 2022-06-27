const pagination = require("../../utils/pagination");
const { v4: uuid } = require("uuid");
const table_clients = "clients";

const controller = (store) => {
    const list = async(query) => {
        const count = await store.count(table_clients);
        let limit = 50;
        let offset = 0;
        
        if (query.limit) {
            limit = query.limit;
        }
        if (query.offset) {
            offset = query.offset;
        }

        const next = pagination.next(table_clients, count, offset, limit);
        const previous = pagination.previous(table_clients, count, offset, limit);

        const selects = ["client_id", "client_name", "client_origin", "client_username", "client_cp", "client_city", "client_email"]
        
        const rows = await store.list(table_clients, selects, [], limit, offset);
        return({
            rows,
            count,
            previous,
            next
        })
    }

    const getOne = async(client_id) => {
        const result = store.getOne(table_clients, {client_id});
        return result;
    }

    const add = async(data) => {
        const client_id = uuid();
        data.client_id = client_id;
        await store.add(table_clients, data);
    }

    const update = async(client_id, data) => {
        await store.update(table_clients, {client_id}, data);
    }

    const remove = async(client_id) => {
        await store.remove(table_clients, {client_id});
    }

    return({
        list,
        add,
        update,
        remove,
        getOne
    })
}

module.exports = controller;