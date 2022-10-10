import SpotForm from "./forms/SpotForm";

import "./style/Host.css"

function Host() {
    return (
        <div id="host-id-d1">
            <SpotForm { ...{ edit: false } }/>
        </div>
    );
}

export default Host;