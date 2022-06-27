import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
    return(
        <div className="navbar">
            <div className="nav nav-home">
                <Link className="link" to="/" >Home</Link>
            </div>
            <div className="nav nav-orders">
                <Link className="link" to="/orders" >Pedidos</Link>
            </div>
            <div className="nav nav-clients">
                <Link className="link" to="/clients" >Clientes</Link>
            </div>
            <div className="nav nav-addClient">
                <Link className="link" to="/clients/origins" >Añadir Cliente</Link>
            </div>
        </div>
    )
}

export default Navbar;