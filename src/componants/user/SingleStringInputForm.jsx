import React, { useState } from "react"

function SingleStringInputForm(props) {

    const [value, setValue] =
        useState("dummyValue");

    const handleSubmit = e => {
        e.preventDefault();
        console.log(value)
        props.executeFunction(value)
    }

    const valueChanged = e => {
        setValue(e.target.value)
    }

    return(
        <form className="form-container"
            onSubmit={handleSubmit}>
                    <input
                    type="text"
                    className="single-string-input-form"
                    placeholder={props.placeholder}
                    onChange={valueChanged}
                    />
            <button className="input-submit">Submit</button>
        </form>
    )
}
export default SingleStringInputForm