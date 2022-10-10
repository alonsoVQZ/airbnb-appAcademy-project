import "./style/Errors.css";

export function BackendErrors(props) {
    const { backendErrors, setBackendErrors } = props;
    const { message, errors = {}, statusCode } = backendErrors;
    const handleExit = (e) => setBackendErrors({});
    return (
        <div id="backend-errors-id-d1">
            <div className="backend-errors-d1d2">
                <img id="backend-errors-id-d1d21i3" src="/icons/forbidden.png" alt="forbidden" />
                <span>{`${message}  ${statusCode}`}</span>
            </div>
            <div id="backend-errors-id-d1d22" className="backend-errors-d1d2">
                <ul id="backend-errors-id-d1d22ul3">
                    {
                        Object.values(errors).map((element, i) => {
                            return (
                                <li className="backend-errors-d1d22ul3li4" key={element + (i + 1)}>
                                    {element}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div id="backend-errors-id-d1d23" className="backend-errors-d1d2">
                <button id="backend-errors-id-d1d23b3" type="button" onClick={(e) => handleExit(e)}>Exit</button>
            </div>
        </div>
    )
}

export function InputError({ errorsArray }) {
    return (
        <div className="input-error-d1">
            <ul>
                { 
                    errorsArray.map((element, i) => {
                        return <li><span>{element}</span></li>
                    })
                }
            </ul>
            
        </div>
    );
}