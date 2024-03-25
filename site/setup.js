import { html } from "https://esm.sh/htm@3.1.1/preact"
import * as preactCore from "https://esm.sh/htm@3.1.1/preact"
import * as preactSignal from "https://esm.sh/@preact/signals@1.2.2"

window.html = html
window.preact = { ...preactCore, ...preactSignal }

window.show = (props) => {
    const { when, children = [] } = props
    const last = children[children.length - 1]

    if (when === true) {
        if (last?.type === "else") {
            return children.slice(0, -1)
        }
        return children
    }

    if (last?.type === "else") {
        return last.props.children
    }

    return null
}
