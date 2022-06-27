import React from "react";
import Cabecera from "../components/Cabecera";
import "../styles/Clients.css";
import List from "../components/List";
import { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Clients() {

    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await Axios(
                    "http://localhost:3000/api/clients"
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
        {client_origin: "Origen"},
        {client_username: "Username"},
        {client_cp: "C.P"},
        {client_city: "Ciudad"},
        {client_email: "Email"},
        {add_order: "Crear Pedido"}
    ];

    let navigate = useNavigate()
    const funciones = {
        add_order: (id) => {
            navigate("/products/" + id);
        }
    }

    return(
        <div className="clients">
            <Cabecera columns={columns}></Cabecera>
            <List data={list} columns={columns} funciones={funciones}></List>
        </div>
    )
}

export default Clients;