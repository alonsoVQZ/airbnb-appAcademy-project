import "./style/FormElements.css";
import { InputError } from "../../misc/Errors";
import { useState } from "react";

export function FormInput(props) {
    const { value = "", setValue, text, type, errors = {} } = props;
    const errorsArray = Object.values(errors);
    const [showError, setShowError] = useState(false)
    return (
        <div className="form-input-d1">
            { (errorsArray.length > 0 && showError) && <InputError { ...{ errorsArray } }/> }
            <label className="form-input-d1l2">{text}</label>
            <input className="form-input-d1in2" type={type} value={value} placeholder={text} onChange={(e) => setValue(e.target.value)} onMouseEnter={() => setShowError(true)} onMouseLeave={() => setShowError(false)}/>
        </div>
    )
}


export function FormSelect(props) {
    const { value = "", setValue, text, options } = props;
    return (
        <div className="form-select-d1">
            <label className="form-select-d1l2">{text}</label>
            <select className="form-select-d1op2" value={value} onChange={(e)  => setValue(e.target.value)}>
                <option value="" disabled>Select {text}</option>
                {
                    options.map((element, index) => {
                        return <option value={element} key={element + (index + 1)}>{element}</option>
                    })
                }
            </select>
        </div>
    )
}

export function FormTextArea(props) {
    const { value = "", setValue, text, errors = {} } = props;
    const errorsArray = Object.values(errors);
    const [showError, setShowError] = useState(false)
    return (
        <div className="form-text-area-d1">
            { (errorsArray.length > 0 && showError) && <InputError { ...{ errorsArray } }/> }
            <label className="form-text-area-d1l2">{text}</label>
            <textarea className="form-text-area-d1ta2" value={value} placeholder={text} onChange={(e) => setValue(e.target.value)} onMouseEnter={() => setShowError(true)} onMouseLeave={() => setShowError(false)}/>
        </div>
    )
}