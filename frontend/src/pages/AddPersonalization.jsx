import React, { useEffect, useState } from "react";
import FormFile from "../components/FormFile";
import Cabecera from "../components/Cabecera";
import List from "../components/List";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"
import "../styles/addClient.css"

function AddPersonalization() {

    const [listPhotos, setListPhotos] = useState([]);

    const fetchData = async() => {
        try {
            const response = await Axios(
                "http://localhost:3000/api/clientphotos"
            )
            let data = response.data.results;
            console.log(data)
            setListPhotos(data.reverse());
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const columns = {
        image: "Fotografía"
    }

    const columnsPhotos = [
        {clientphoto_image: "Fotografía"},
    ]

    const inputType = {
       
    }

    let navigate = useNavigate()
    const params = useParams();

    const uploadClientphoto = async(data) => {
        const order_id = params.order_id;
        const url = "http://localhost:3000/api/clientphotos/" + order_id;
        const formData = new FormData();
        formData.append("image", data);
        const headers = {"Content-Type": "multipart/form-data"};
        await Axios.post(url, formData, {headers})
        fetchData();
    }

    return(
        <div className="addPersonalization">
            <div className="title-addPersonalization">Nueva Imagen</div>
            <div className="orders">
                <Cabecera columns={columnsPhotos}></Cabecera>
                <List data={listPhotos} columns={columnsPhotos} ></List>
            </div>
            <FormFile columns={columns} funcion={uploadClientphoto} ></FormFile>
        </div>
    )
}

export default AddPersonalization;