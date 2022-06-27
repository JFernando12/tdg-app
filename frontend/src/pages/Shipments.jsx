import React from "react";
import Cabecera from "../components/Cabecera";
import List from "../components/List";
import { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Shipments() {

    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await Axios(
                    "http://localhost:3000/api/shipments"
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
        {client_name: "Nombre de cliente"},
        {product_name: "Origen"},
        {shipment_parcel: "Paquetería"},
        {add_shipment: "Añadir Envío"}
    ];

    let navigate = useNavigate()
    const params = useParams();
    const funciones = {
        add_shipment: (shipment_id) => {
            const order_id = params.order_id;
            const url = `http://localhost:3000/api/orders/${order_id}`
            Axios.patch(url, {shipment_id});
            navigate("/orders/" + order_id);
        }
    }

    return(
        <div className="shipments">
            <Cabecera columns={columns}></Cabecera>
            <List data={list} columns={columns} funciones={funciones}></List>
        </div>
    )
}

export default Shipments;