const pagination = require("../../../utils/pagination");
const s3 = require("../../../utils/s3");

const table_orderphotos = "orderphotos";

const controller = (store) => {
    const list = async(query) => {
        let limit = 5;
        let offset = 0;
        const count = await store.count(table_orderphotos);
        if(query.limit) {
            limit = query.limit;
        }
        if(query.offset) {
            offset = query.offset
        }

        const selects = ["orderphoto_id", "orderphoto_image"]
        const next = pagination.next(table_orderphotos, count, offset, limit);
        const previous = pagination.previous(table_orderphotos, count, offset, limit);
        const rows = await store.list(table_orderphotos, selects, [], limit, offset);

        return({
            count,
            next,
            previous,
            rows
        })
    }

    const getOne = async(orderphoto_id) => {
        const result = await store.getOne(table_orderphotos, {orderphoto_id});
        return result;
    }

    const add = async(order_id, file) => {
        const id = file.filename;
        const orderphoto_image = await s3.uploadFile(file);

        const data = {
            orderphoto_id: id,
            orderphoto_image,
            order_id
        }

        await store.add(table_orderphotos, data);
    }

    const remove = async(orderphoto_id) => {
        await store.remove(table_orderphotos, {orderphoto_id});
        await s3.deleteFile(orderphoto_id);
    }

    return({
        list,
        getOne,
        add,
        remove
    })
}

module.exports = controller;