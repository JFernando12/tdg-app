const pagination = require("../../utils/pagination");
const { v4: uuid } = require("uuid");
const table_payments = "payments";
const orderStore = require("../orders/index");

const controller = (store) => {
    const list = async(query) => {
        const count = await store.count(table_payments);
        let limit = 50;
        let offset = 0;
        
        if (query.limit) {
            limit = query.limit;
        }
        if (query.offset) {
            offset = query.offset;
        }

        const next = pagination.next(table_payments, count, offset, limit);
        const previous = pagination.previous(table_payments, count, offset, limit);
        
        const selects = ["orders.payment_id", "client_name", "product_name", "order_date"];
        const inners = {
            payments: "payment_id",
            clients: "client_id",
            products: "product_id"
        }

        const rows = await store.list("orders", selects, inners, limit, offset);
        return({
            rows,
            count,
            previous,
            next
        })
    }

    const getOne = async(payment_id) => {
        const result = store.getOne(table_payments, {payment_id});
        return result;
    }

    const add = async(order_id, data) => {
        const payment_id = uuid();
        data.payment_id = payment_id;
        await store.add(table_payments, data)
        await orderStore.update(order_id, { payment_id });
    }

    const update = async(payment_id, data) => {
        await store.update(table_payments, {payment_id}, data);
    }

    const remove = async(payment_id) => {
        await store.remove(table_payments, {payment_id});
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