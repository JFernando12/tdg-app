import React from "react";
import Form from "../components/Form";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"
import "../styles/addClient.css"

function AddClient() {

    const columns = {
        client_name: "Nombre Completo",
        client_cp: "Código Postal",
        client_city: "Ciudad",
        client_colony: "Colonia",
        client_street: "Calle",
        client_number: "Número de Calle",
        client_reference: "Referencia",
        client_phone: "Número de teléfono",
        client_email: "Correo electrónico",
        client_username: "Nombre de usuario"
    }

    const inputType = {
        client_name: "text",
        client_cp: "text",
        client_city: "text",
        client_colony: "text",
        client_street: "text",
        client_number: "text",
        client_reference: "text",
        client_phone: "text",
        client_email: "email",
        client_username: "text"
    }

    let navigate = useNavigate()
    const params = useParams();

    const holis = async(data) => {
        data.client_origin = params.client_origin
        await Axios.post("http://localhost:3000/api/clients", data);
        navigate("/clients")
    }

    return(
        <div className="addClient">
            <div className="title-addClient">Nuevo Cliente</div>
            <Form columns={columns} funcion={holis} inputType={inputType} ></Form>
        </div>
    )
}

export default AddClient;