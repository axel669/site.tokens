import shionAPI from "../comm/shion.js"

const revokeToken = async (token) => {
    const res = await shionAPI.get({
        url: `/token/${token}/revoke`,
        resType: "text"
    })
    if (res.ok === false) {
        return res.data.message
    }
    return "Token Revoked"
}

export default () => {
    const activeToken = preact.useSignal("")
    const loading = preact.useSignal(false)
    const message = preact.useSignal("")

    const revoke = async () => {
        loading.value = true
        message.value = await revokeToken(activeToken.value)
        loading.value = false
    }
    return html`
        <ws-paper ws-x="[$outline]">
            <ws-titlebar slot="header" ws-x="[$color @danger]">
                <span slot="title" ws-x="[$title]">
                    Revoke Token
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
                    <button ws-x="[$outline] [$color @danger]" onclick=${revoke}
                    disabled=${loading}>
                        <ws-icon class="bi-x">Revoke<//>
                        <${show} when=${loading.value}>
                            <ws-circle-spinner ws-x="[@size 20px]" />
                        <//>
                    <//>
                <//>
                <div ws-x="[hide:empty]">
                    ${message}
                <//>
            <//>
        <//>
    `
}
