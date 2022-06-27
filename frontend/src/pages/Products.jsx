import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Products.css"

function Products() {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await Axios(
                    "http://localhost:3000/api/products"
                )
                let data = response.data.results;
                setProducts(data.reverse());
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    let navigate = useNavigate();
    const params = useParams();

    const goProduct = (product) => {
        navigate(`/orders/add/${params.client_id}/${product.product_id}`)
    }

    return(
        <div className="products">
            {products.map(product => (
                <div className={"product-select "} onClick={() => {goProduct(product)}} >{product.product_name}</div>
            ))}
        </div>
    )
}

export default Products;