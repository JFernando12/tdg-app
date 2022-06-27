const pagination = require("../../../utils/pagination");
const s3 = require("../../../utils/s3");

const table_voucherphotos = "voucherphotos";

const controller = (store) => {
    const list = async(query) => {
        let limit = 5;
        let offset = 0;
        const count = await store.count(table_voucherphotos);
        if(query.limit) {
            limit = query.limit;
        }
        if(query.offset) {
            offset = query.offset
        }

        const selects = ["voucherphoto_id", "voucherphoto_image"]
        const next = pagination.next(table_voucherphotos, count, offset, limit);
        const previous = pagination.previous(table_voucherphotos, count, offset, limit);
        const rows = await store.list(table_voucherphotos, selects, [], limit, offset);

        return({
            count,
            next,
            previous,
            rows
        })
    }

    const getOne = async(voucherphoto_id) => {
        const result = await store.getOne(table_voucherphotos, {voucherphoto_id});
        return result;
    }

    const add = async(payment_id, file) => {
        const id = file.filename;
        const voucherphoto_image = await s3.uploadFile(file);

        const data = {
            voucherphoto_id: id,
            voucherphoto_image,
            payment_id
        }

        await store.add(table_voucherphotos, data);
    }

    const remove = async(voucherphoto_id) => {
        await store.remove(table_voucherphotos, {voucherphoto_id});
        await s3.deleteFile(voucherphoto_id);
    }

    return({
        list,
        getOne,
        add,
        remove
    })
}

module.exports = controller;