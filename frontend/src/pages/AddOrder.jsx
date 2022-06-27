import React from "react";
import Form from "../components/Form";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"
import "../styles/addClient.css"

function AddOrder() {

    const columns = {
        order_date: "Fecha",
        order_note: "Notas",
        order_design: "Diseñar",
        order_revision: "Revisado"
    }

    const inputType = {
        order_date: "date",
        order_note: "text",
        order_design: "checkbox",
        order_revision: "checkbox"
    }

    let navigate = useNavigate()
    const params = useParams();

    const holis = async(data) => {
        const client_id = params.client_id;
        const product_id = params.product_id;
        const user_id = "fce803f1-f0be-4d7e-bae5-1454c76f51be";
        await Axios.post(`http://localhost:3000/api/orders/${user_id}/${client_id}/${product_id}`, data);
        navigate("/orders")
        console.log(data);
    }

    return(
        <div className="addClient">
            <div className="title-addClient">Nuevo Pedido</div>
            <Form columns={columns} funcion={holis} inputType={inputType}></Form>
        </div>
    )
}

export default AddOrder;