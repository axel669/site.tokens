import "./setup.js"

import TokenGenerator from "./comp/token-gen.js"
import TokenRevoker from "./comp/token-revoke.js"
import TokenValidator from "./comp/token-validate.js"

const App = () => {
    return html`
        <ws-flex ws-x="[p 0px] [m.x auto] [@button-size 125px] [w 320px]">
            <${TokenGenerator} />
            <${TokenValidator} />
            <${TokenRevoker} />
        <//>
    `
}

preact.render(html`<${App} />`, document.body)
