const pagination = require("../../../utils/pagination");
const s3 = require("../../../utils/s3");

const table_designphotos = "designphotos";

const controller = (store) => {
    const list = async(query) => {
        let limit = 5;
        let offset = 0;
        const count = await store.count(table_designphotos);
        if(query.limit) {
            limit = query.limit;
        }
        if(query.offset) {
            offset = query.offset
        }

        const selects = ["*"]
        const next = pagination.next(table_designphotos, count, offset, limit);
        const previous = pagination.previous(table_designphotos, count, offset, limit);
        const rows = await store.list(table_designphotos, selects, [], limit, offset);

        return({
            count,
            next,
            previous,
            rows
        })
    }

    const getOne = async(designphoto_id) => {
        const result = await store.getOne(table_designphotos, {designphoto_id});
        return result;
    }

    const add = async(order_id, file) => {
        const id = file.filename;
        const designphoto_image = await s3.uploadFile(file);

        const data = {
            designphoto_id: id,
            designphoto_image,
            order_id
        }

        await store.add(table_designphotos, data);
    }

    const remove = async(designphoto_id) => {
        await store.remove(table_designphotos, {designphoto_id});
        await s3.deleteFile(designphoto_id);
    }

    return({
        list,
        getOne,
        add,
        remove
    })
}

module.exports = controller;