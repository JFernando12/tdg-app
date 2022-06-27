import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import Form from "../components/Form";
import "../styles/Order.css";

function Order () {
    const data = {
        data: {
            order: {
                order_id: "",
                order_date: "",
                order_note: "",
                order_design: false,
                order_revision: false,
                order_elaborated: false,
                order_photo_sent: false,
                order_guide_sent: false,
                order_paid: false
            },
            client: {
                client_id: "",
                client_name: "",
                client_cp: "",
                client_city: "",
                client_colony: "",
                client_street: "",
                client_number: "",
                client_reference: "",
                client_phone: "",
                client_email: "",
                client_origin: "",
                client_username: ""
            },
            product: {
                product_id: "",
                product_name: "",
                product_description: "",
                product_quantity: 0,
                product_price: 0,
                product_price_5: 0,
                product_price_10: 0
            },
            user: {
                user_id: "",
                user_name: "",
                user_lastname: "",
                user_username: "",
                user_email: ""
            },
            shipment: {
                shipment_id: null,
                shipment_parcel: null,
                shipment_code: null,
                shipment_code_made: null,
                shipment_send: null,
                shipment_ready: null
            },
            payment: {
                payment_id: null,
                payment_advance: null,
                payment_remaining: null
            }
        }
    }

    const [ orderData, setOrderData ] = useState(data.data)
    const params = useParams()
    const order_id = params.order_id;

    const fetchData = async() => {
        try {
            const url = `http://localhost:3000/api/orders/${order_id}`
            const response = await Axios( url );
            let newData = response.data
            setOrderData(newData.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const preventDefault = (e) => {
        e.preventDefault();
        updateOrder(texts);
    }

    const updateOrder = async(data) => {
        console.log(data);
        const url = `http://localhost:3000/api/orders/${order_id}`
        await Axios.patch(url, data);
        await fetchData()
    }

    const[ texts, setTexts ] = useState({})

    const onChange = (e) => {
        console.log(e.target.value);
        if(e.nativeEvent.inputType || e.nativeEvent.timeStamp) {
          let t = e.target.title;
          const newTex = {
              ...texts,
          }
          newTex[t] = e.target.value;
          setTexts(newTex);
        }
        if(e.nativeEvent.pointerType) {
          let t = e.target.title;
          const newTex = {
              ...texts,
          }
          newTex[t] = e.target.checked;
          setTexts(newTex);
        }
        console.log(texts)
    }

    const selected = {
        diseño: (detail ,input) => {
            if(input === "yes" && orderData.order[detail] === true) {
                return "selected"
            }
            if(input === "no" && orderData.order[detail] === false) {
                return "selected"
            }
        }
    }

    let navigation = useNavigate()
    const exist_payments = () => {
        navigation("/payments/" + order_id);
    }

    const exist_shipments = () => {
        navigation("/shipments/" + order_id);
    }

    const new_shipment = () => {
        navigation("/shipments/add/" + order_id);
    }

    const columnsPayment = {
        payment_advance: "Anticipo"
    }

    const inputTypePayment = {
        payment_advance: "text"
    }

    const funcionPayment = async(data) => {
        const url = `http://localhost:3000/api/payments/${order_id}`
        await Axios.post(url, data);
        await fetchData();
    }

    const columnsPaymentMade = {
        payment_remaining: "Pago restante"
    }

    const inputTypePaymentMade = {
        payment_remaining: "text"
    }

    const funcionPaymentMade = async(paymentData) => {
        console.log("holis")
        const url = `http://localhost:3000/api/payments/${orderData.payment.payment_id}`
        await Axios.patch(url, paymentData);
        await fetchData();
    }

    return(
        <div className="order">
            <div className="order-details">
                <div className="order-detail order-date">
                    {orderData.order.order_date}
                </div>
                <div className="order-detail order-note">
                    Notas: {orderData.order.order_note}
                </div>
                <form className="order-form" onSubmit={preventDefault}>
                    <label className="order-form-label">
                        Lleva diseño:
                        <select name="order_design" title="order_design" onChange={onChange} >
                            <option value="yes" selected={selected.diseño("order_design" ,"yes")} >Si</option>
                            <option value="no" selected={selected.diseño("order_design", "no")} >No</option>
                        </select>
                    </label>
                    <label className="order-form-label">
                        Revisado:
                        <select name="order_revision" title="order_revision" onChange={onChange} >
                        <option value="yes" selected={selected.diseño("order_revision" ,"yes")} >Si</option>
                            <option value="no" selected={selected.diseño("order_revision", "no")} >No</option>
                        </select>
                    </label>
                    <label className="order-form-label">
                        Elaborado:
                        <select name="order_elaborated" title="order_elaborated" onChange={onChange}>
                            <option value="yes" selected={selected.diseño("order_elaborated" ,"yes")} >Si</option>
                            <option value="no" selected={selected.diseño("order_elaborated", "no")} >No</option>
                        </select>
                    </label>
                    <label className="order-form-label">
                        Foto enviada:
                        <select name="order_photo_sent" title="order_photo_sent" onChange={onChange}>
                            <option value="yes" selected={selected.diseño("order_photo_sent" ,"yes")} >Si</option>
                            <option value="no" selected={selected.diseño("order_photo_sent", "no")} >No</option>
                        </select>
                    </label>
                    <label className="order-form-label">
                        Guia enviada:
                        <select name="order_guide_sent" title="order_guide_sent" onChange={onChange}>
                            <option value="yes" selected={selected.diseño("order_guide_sent" ,"yes")} >Si</option>
                            <option value="no" selected={selected.diseño("order_guide_sent", "no")} >No</option>
                        </select>
                    </label>
                    <label className="order-form-label">
                        Pagado:
                        <select name="order_paid" title="order_paid" onChange={onChange}>
                        <option value="yes" selected={selected.diseño("order_paid" ,"yes")} >Si</option>
                            <option value="no" selected={selected.diseño("order_paid", "no")} >No</option>
                        </select>
                    </label>
                    <input type="submit" value="Actualizar" />
                </form>
            </div>
            <div className="order-client">
                {Object.keys(orderData.client).map(client => (
                    <div className="order-client-label">{orderData.client[client]}</div>
                ))}
            </div>
            <div className="order-product">
                <div className="order-product-label">{orderData.product.product_name}</div>
            </div>
            <div className="order-payment">
                {(orderData.payment.payment_id) 
                ?   <div className="payment-existed" >
                        {(orderData.payment.payment_remaining)
                        ? <div className="payment-completed-label">
                            anticipo: {orderData.payment.payment_advance} <br />
                            restante: {orderData.payment.payment_remaining}
                        </div>
                        : <div className="anticipo">
                            <div className="anticipo-label">Anticipo: {orderData.payment.payment_advance}</div>
                            <Form columns={columnsPaymentMade} funcion={funcionPaymentMade} inputType={inputTypePaymentMade} ></Form>
                          </div>
                        }             
                    </div> 
                : <div>
                    <div className="new-payment">
                        <Form columns={columnsPayment} funcion={funcionPayment} inputType={inputTypePayment} form_title="Nuevo Pago"></Form>
                    </div>
                    <div className="exist-payment" onClick={exist_payments} >Pago Existente</div>
                </div>}
            </div>
            <div className="order-shipment">
            {(orderData.shipment.shipment_id) 
                ?   <div className="shipment-existed" >
                        Paquetería: {orderData.shipment.shipment_parcel} <br />
                        Código de rastreo: <a href="{orderData.shipment.shipment_code}">{orderData.shipment.shipment_code}</a>{orderData.shipment.shipment_code}           
                    </div> 
                : <div>
                    <div className="new-shipment" onClick={new_shipment} >Envío Nuevo</div>
                    <div className="exist-shipment" onClick={exist_shipments} >Envío Existente</div>
                </div>}
            </div>
            <div className="order-personalization"></div>
            <div className="order-user"></div>
        </div>
    )
}

export default Order;