import React from "react";
import Button from "./Button";

function Item( {columns, number, data, funciones} ) {
    const id = Object.keys(data).filter(column => column.includes("_id"))[0];
    
    const arreglo = (column) => {
        let value = data[Object.keys(column)[0]]
        if(value === undefined) {
            value = funciones[Object.keys(column)[0]]
            let text = column[Object.keys(column)[0]]
            return <Button funcion={() => {value(data[id])}}>{text}</Button> 
        }
        if(value === true) {
            return "Si"
        }
        if(value === false) {
            return "No"
        }
        if(value.includes("2022")) {
            return value.substr(0,10)
        }
        return value;
    }
    return(
        <div className="Item">
            <div className="column-item number">{number}</div>
            {columns.map(column => (
                <div className={"column-item " + Object.keys(column)[0]}>{arreglo(column)}</div>
            ))}
        </div>
    )
}

export default Item;