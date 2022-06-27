import React from "react";
import "../styles/Button.css"

function Button({funcion, children}) {
    return(
        <div className="button">
            <button className="button-component" onClick={funcion}>{children}</button>
        </div>
    )
}

export default Button;