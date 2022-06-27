const pagination = require("../../utils/pagination");
const { v4: uuid } = require("uuid");
const table_texts = "texts";

const controller = (store) => {
    const list = async(query) => {
        const count = await store.count(table_texts);
        let limit = 5;
        let offset = 0;
        
        if (query.limit) {
            limit = query.limit;
        }
        if (query.offset) {
            offset = query.offset;
        }

        const next = pagination.next(table_texts, count, offset, limit);
        const previous = pagination.previous(table_texts, count, offset, limit);

        const selects = ["*"];
        
        const rows = await store.list(table_texts, selects, [], limit, offset);
        return({
            rows,
            count,
            previous,
            next
        })
    }

    const getOne = async(text_id) => {
        const result = store.getOne(table_texts, {text_id});
        return result;
    }

    const add = async(order_id, data) => {
        const text_id = uuid();
        data.text_id = text_id;
        data.order_id = order_id;
        await store.add(table_texts, data);
    }

    const update = async(text_id, data) => {
        await store.update(table_texts, {text_id}, data);
    }

    const remove = async(text_id) => {
        await store.remove(table_texts, {text_id});
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