import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Origins.css"

function Origins() {
    const origins = {
        instagram: "Instagram",
        facebook: "Facebook",
        whatsapp: "WhatsApp",
        local: "Local",
        otro: "Otro"
    }

    let navigate = useNavigate();
    const goClient = (origin) => {
        navigate("/clients/add/" + origin);
    }

    return(
        <div className="origins">
            {Object.keys(origins).map(origin => (
                <div className={"origin " + origin} onClick={() => {goClient(origin)}} >{origins[origin]}</div>
            ))}
        </div>
    )
}

export default Origins;