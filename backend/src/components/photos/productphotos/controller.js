const pagination = require("../../../utils/pagination");
const s3 = require("../../../utils/s3");

const table_productphotos = "productphotos";

const controller = (store) => {
    const list = async(query) => {
        let limit = 5;
        let offset = 0;
        const count = await store.count(table_productphotos);
        if(query.limit) {
            limit = query.limit;
        }
        if(query.offset) {
            offset = query.offset
        }

        const selects = ["productphoto_id", "productphoto_image"]
        const next = pagination.next(table_productphotos, count, offset, limit);
        const previous = pagination.previous(table_productphotos, count, offset, limit);
        const rows = await store.list(table_productphotos, selects, [], limit, offset);

        return({
            count,
            next,
            previous,
            rows
        })
    }

    const getOne = async(productphoto_id) => {
        const result = await store.getOne(table_productphotos, {productphoto_id});
        return result;
    }

    const add = async(product_id, file) => {
        const id = file.filename;
        const productphoto_image = await s3.uploadFile(file);

        const data = {
            productphoto_id: id,
            productphoto_image,
            product_id
        }

        await store.add(table_productphotos, data);
    }

    const remove = async(productphoto_id) => {
        await store.remove(table_productphotos, {productphoto_id});
        await s3.deleteFile(productphoto_id);
    }

    return({
        list,
        getOne,
        add,
        remove
    })
}

module.exports = controller;