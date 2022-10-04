// Style
import "./style/Modal.css"

import { useClickCloseElement } from "./helperFunctions";

function Modal(props) {
    const { children, setModal, outside } = props;
    const domNode = useClickCloseElement(() => setModal(false), outside);
    return(
        <div ref={domNode} className="modal">
            {children}
        </div>
    )
}

export default Modal;