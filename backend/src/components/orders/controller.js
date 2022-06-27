const pagination = require("../../utils/pagination");
const joinGroup = require("../../utils/joinGroup");
const { v4: uuid } = require("uuid");
const table_orders = "orders";

const controller = (store) => {
    const list = async(query) => {
        const count = await store.count(table_orders);
        let limit = 50;
        let offset = 0;
        if(query.limit) {
            limit = query.limit;
        }
        if(query.offset){
            offset = query.offset;
        }

        const selects = [
            "order_id",
            "order_date",
            "client_name",
            "product_name",
            "order_guide_sent",
            "order_photo_sent",
            "order_revision",
            "order_paid",
            "user_username"
        ];

        const inner = {
            clients: "client_id",
            users: "user_id",
            products: "product_id",
        }

        const next = pagination.next(table_orders, count, offset, limit);
        const previous = pagination.previous(table_orders, count, offset, limit);
        const rows = await store.list(table_orders, selects, inner, limit, offset);

        return({
            count,
            next,
            previous,
            rows
        })
    }

    const getOne = async(order_id) => {
        const inner = {
            clients: "client_id",
            users: "user_id",
            products: "product_id",
            payments: "payment_id",
            shipments: "shipment_id"
        }
        const rows = await store.getInnerJoin(table_orders, {order_id}, inner);
        const result = joinGroup(rows[0]);

        return result;
    }

    const add = async(data, params) => {
        data.user_id = params.user;
        data.client_id = params.client;
        data.product_id = params.product;
        data.order_id = uuid();
        console.log(data);
        await store.add(table_orders, data);
    }

    const update = async(order_id, data) => {
        await store.update(table_orders, {order_id}, data);
    }

    return({
        list,
        getOne,
        add,
        update
    })
}

module.exports = controller;