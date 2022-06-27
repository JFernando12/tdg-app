import React from "react";
import { useState } from "react";
import "../styles/Form.css"

function Form({form_title, columns, funcion, inputType}) {

    const [texts, setTexts] = useState({})

    const onChangeText = (e) => {
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
    }

    const handle = async(e) => {
      e.preventDefault();
      await funcion(texts);
    }

    const required = (type) => {
      if(type === "text") {
        return "required";
      }
      if(type === "checkbox") {
        return "";
      }
      if(type === "date") {
        return "required";
      }
      if(type === "email") {
        return "required";
      }
    }

    return (
      <form className="form" onSubmit={handle}>
        <div className="form-title">{form_title}</div>
        {Object.keys(columns).map((column) => (
          <label className="label">
            {columns[column] + ": "}
            <input className="input" title={column} onChange={onChangeText} type={inputType[column]} required={required(inputType[column])} />
          </label>
        ))}
        <input className="input label submit" type="submit" />
      </form>
        
    );
}

export default Form;