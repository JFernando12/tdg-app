import React from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AddShipment() {
    const parcels = [
        {shipment_parcel: "DHL Express"},
        {shipment_parcel: "Estafeta Express"},
        {shipment_parcel: "Estafeta Normal"},
        {shipment_parcel: "FedEx Express"},
        {shipment_parcel: "FedEx Normal"},
        {shipment_parcel: "Redpack"},

    ]

    let navigate = useNavigate();
    const params = useParams();

    const goProduct = async(parcel) => {
        console.log(parcel)
        const order_id = params.order_id;
        const url = `http://localhost:3000/api/shipments/${order_id}`
        await Axios.post(url, parcel);
        navigate(`/orders/${order_id}`)
    }

    return(
        <div className="products">
            {parcels.map(parcel => (
                <div className={"product-select "} onClick={() => {goProduct(parcel)}} >{parcel.shipment_parcel}</div>
            ))}
        </div>
    )
}

export default AddShipment;