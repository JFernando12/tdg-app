import React from "react";
import Cabecera from "../components/Cabecera";
import "../styles/Orders.css";
import List from "../components/List";
import { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Orders() {

    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await Axios(
                    "http://localhost:3000/api/orders"
                )
                let data = response.data.results;
                setList(data.reverse());
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    const columns = [
        {order_date: "Fecha"},
        {client_name: "Nombre de cliente"},
        {product_name: "Producto"},
        {order_guide_sent: "Guia"},
        {order_photo_sent: "Foto"},
        {order_paid: "Pagado"},
        {order_revision: "Revisado"},
        {order_go: "Ver Pedido"}
    ];

    let navigate = useNavigate();

    const funciones = {
        order_go: (id) => {
            navigate("/orders/" + id);
        }
    }

    return(
        <div className="orders">
            <Cabecera columns={columns}></Cabecera>
            <List data={list} columns={columns} funciones={funciones} ></List>
        </div>
    )
}

export default Orders;