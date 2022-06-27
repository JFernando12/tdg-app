const pagination = require("../../../utils/pagination");
const s3 = require("../../../utils/s3");

const table_clientphotos = "clientphotos";

const controller = (store) => {
    const list = async(query) => {
        let limit = 50;
        let offset = 0;
        const count = await store.count(table_clientphotos);
        if(query.limit) {
            limit = query.limit;
        }
        if(query.offset) {
            offset = query.offset
        }

        const selects = ["*"]
        const next = pagination.next(table_clientphotos, count, offset, limit);
        const previous = pagination.previous(table_clientphotos, count, offset, limit);
        const rows = await store.list(table_clientphotos, selects, [], limit, offset);

        return({
            count,
            next,
            previous,
            rows
        })
    }

    const getOne = async(order_id) => {
        const result = await store.getOne(table_clientphotos, {order_id});
        return result;
    }

    const add = async(order_id, file) => {
        const id = file.filename;
        const clientphoto_image = await s3.uploadFile(file);

        const data = {
            clientphoto_id: id,
            clientphoto_image,
            order_id
        }

        await store.add(table_clientphotos, data);
    }

    const remove = async(clientphoto_id) => {
        await store.remove(table_clientphotos, {clientphoto_id});
        await s3.deleteFile(clientphoto_id);
    }

    return({
        list,
        getOne,
        add,
        remove
    })
}

module.exports = controller;