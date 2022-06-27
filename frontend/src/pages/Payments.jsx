import React from "react";
import Cabecera from "../components/Cabecera";
import List from "../components/List";
import { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Payments.css"

function Payments() {

    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await Axios(
                    "http://localhost:3000/api/payments"
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
        {order_date: "Username"},
        {client_name: "Nombre de cliente"},
        {product_name: "Origen"},
        {add_payment: "Añadir Pago"}
    ];

    let navigate = useNavigate()
    const params = useParams();
    const funciones = {
        add_payment: (payment_id) => {
            const order_id = params.order_id;
            const url = `http://localhost:3000/api/orders/${order_id}`
            Axios.patch(url, {payment_id});
            navigate("/orders/" + order_id);
        }
    }

    return(
        <div className="payments">
            <Cabecera columns={columns}></Cabecera>
            <List data={list} columns={columns} funciones={funciones}></List>
        </div>
    )
}

export default Payments;