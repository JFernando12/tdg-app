const pagination = require("../../utils/pagination");
const { v4:uuid } = require("uuid");

const table_products = "products";

const controller = (store) => {
    const list = async(query) => {
        let limit = 5;
        let offset = 0;
        const count = await store.count(table_products);
        if(query.limit) {
            limit = query.limit;
        }
        if(query.offset) {
            offset = query.offset
        }

        const selects = ["product_id", "product_name"]
        const next = pagination.next(table_products, count, offset, limit);
        const previous = pagination.previous(table_products, count, offset, limit);
        const rows = await store.list(table_products, selects, [], limit, offset);

        return({
            count,
            next,
            previous,
            rows
        })
    }

    const getOne = async(product_id) => {
        const result = await store.getOne(table_products, {product_id});
        return result;
    }

    const add = async(data) => {
        const id = uuid();
        data.product_id = id;
        await store.add(table_products, data);
    }

    const remove = async(product_id) => {
        await store.remove(table_products, {product_id});
    }

    const update = async(product_id, data) => {
        await store.update(table_products, {product_id}, data);
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