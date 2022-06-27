const pagination = require("../../utils/pagination");
const { v4: uuid } = require("uuid");
const table_spotifys = "spotifys";

const controller = (store) => {
    const list = async(query) => {
        const count = await store.count(table_spotifys);
        let limit = 5;
        let offset = 0;
        
        if (query.limit) {
            limit = query.limit;
        }
        if (query.offset) {
            offset = query.offset;
        }

        const next = pagination.next(table_spotifys, count, offset, limit);
        const previous = pagination.previous(table_spotifys, count, offset, limit);

        const selects = ["*"];
        
        const rows = await store.list(table_spotifys, selects, [], limit, offset);
        return({
            rows,
            count,
            previous,
            next
        })
    }

    const getOne = async(spotify_id) => {
        const result = store.getOne(table_spotifys, {spotify_id});
        return result;
    }

    const add = async(order_id, data) => {
        const spotify_id = uuid();
        data.spotify_id = spotify_id;
        data.order_id = order_id;
        await store.add(table_spotifys, data);
    }

    const update = async(spotify_id, data) => {
        await store.update(table_spotifys, {spotify_id}, data);
    }

    const remove = async(spotify_id) => {
        await store.remove(table_spotifys, {spotify_id});
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