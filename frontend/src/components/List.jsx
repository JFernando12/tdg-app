import React from "react";
import Item from "./Item";
import "../styles/List.css"

function List({data, columns, funciones}) {
    return(
        <div className="List">
            {data.map(object => (
                <Item data={object} columns={columns} funciones={funciones} number={data.length - (data.indexOf(object))}></Item>
            ))}
        </div>
    )
}

export default List;