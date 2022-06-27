const pagination = require("../../utils/pagination");
const { v4: uuid } = require("uuid");
const orderStore = require("../orders/index");
const table_shipments = "shipments";

const controller = (store) => {
    const list = async(query) => {
        const count = await store.count(table_shipments);
        let limit = 50;
        let offset = 0;
        
        if (query.limit) {
            limit = query.limit;
        }
        if (query.offset) {
            offset = query.offset;
        }

        const next = pagination.next(table_shipments, count, offset, limit);
        const previous = pagination.previous(table_shipments, count, offset, limit);

        const selects = ["orders.shipment_id", "shipment_parcel", "client_name", "product_name"];
        const inners = {
            clients: "client_id",
            shipments: "shipment_id",
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

    const getOne = async(shipment_id) => {
        const result = store.getOne(table_shipments, {shipment_id});
        return result;
    }

    const add = async(order_id ,data) => {
        const shipment_id = uuid();
        data.shipment_id = shipment_id;
        await store.add(table_shipments, data);
        await orderStore.update(order_id, { shipment_id });
    }

    const update = async(shipment_id, data) => {
        await store.update(table_shipments, {shipment_id}, data);
    }

    const remove = async(shipment_id) => {
        await store.remove(table_shipments, {shipment_id});
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