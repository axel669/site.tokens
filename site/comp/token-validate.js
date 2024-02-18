import shionAPI from "../comm/shion.js"

const validateToken = async (token) => {
    const res = await shionAPI.get(`/token/${token}/validate`)
    if (res.ok === false) {
        return res.data.message
    }
    return res.data
    // return `Token is valid<br /><pre>${JSON.stringify(res.data, null, 2)}</pre>`
}

export default () => {
    const activeToken = preact.useSignal("")
    const loading = preact.useSignal(false)
    const validation = preact.useSignal(null)

    const validate = async () => {
        loading.value = true
        validation.value = await validateToken(activeToken.value)
        loading.value = false
    }
    return html`
        <ws-paper ws-x="[$outline]">
            <ws-titlebar slot="header" ws-x="[$color @secondary]">
                <span slot="title" ws-x="[$title]">
                    Validate Token
                <//>
            <//>
            <ws-flex slot="content" ws-x="[fl.cross center]">
                <ws-grid ws-x="[p 0px] [gr.cols 1fr @button-size] [w 100%]">
                    <input
                        type="password"
                        autocomplete="off"
                        ws-x="[w 100%] [outln:focus none] [b 1px solid @primary]
                        [bg transparent] [r 4px]"
                        placeholder="Twitch OAuth Token"
                        value=${activeToken}
                        oninput=${evt => activeToken.value = evt.target.value}
                    />
                    <button ws-x="[$outline] [$color @secondary]" onclick=${validate}
                    disabled=${loading}>
                        <ws-icon class="bi-cloud-check">Validate<//>
                        <${show} when=${loading.value}>
                            <ws-circle-spinner ws-x="[@size 20px]" />
                        <//>
                    <//>
                <//>
                <div ws-x="[hide:empty] [w 100%]">
                    <${show} when=${validation.value !== null}>
                        <${show} when=${typeof validation.value === "string"}>
                            <div ws-x="[t.a center]">
                                ${validation}
                            <//>
                            <else>
                                Token is valid<br />
                                <div ws-x="[w 100%] [over.x auto]">
                                    <pre>${JSON.stringify(validation.value, null, 2)}<//>
                                <//>
                            <//>
                        <//>
                    <//>
                <//>
            <//>
        <//>
    `
}
