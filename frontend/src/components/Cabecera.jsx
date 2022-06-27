import React from "react";
import "../styles/Cabecera.css"

function Cabecera({columns}) {
    return(
        <div className="container-cabecera">
            <div className="column number">No.</div>
            {columns.map(column => (
                <div className={"column " + Object.keys(column)[0]}>{Object.values(column)[0]}</div>
            ))}
        </div>
    )
}

export default Cabecera;