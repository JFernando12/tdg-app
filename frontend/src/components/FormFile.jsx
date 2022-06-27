import React from "react";
import { useState } from "react";
import "../styles/Form.css"

function FormFile({form_title, columns, funcion}) {

    const [file, setFile] = useState({})

    const onChangeText = (e) => {
        setFile(e.target.files[0]);
    }

    const handle = async(e) => {
      e.preventDefault();
      await funcion(file);
    }

    return (
      <form className="formFile" onSubmit={handle}>
        <div className="form-title">{form_title}</div>
        {Object.keys(columns).map((column) => (
          <label className="label">
            {columns[column] + ": "}
            <input className="inputFile" title={column} onChange={onChangeText} type="file" required />
          </label>
        ))}
        <input className="label submit" type="submit" />
      </form>
        
    );
}

export default FormFile;