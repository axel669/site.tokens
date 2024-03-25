import update from "https://esm.sh/@axel669/immutable-update"

const token = tokenInfo.access_token ?? null
const scopes = preact.signal([
    { scope: "chat:read", label: "Read Chat", checked: false },
    { scope: "chat:edit", label: "Send Chat Messages", checked: false },
    { scope: "bits:read", label: "API: Read Bits Information", checked: false },
    // { scope: "channel:moderate", label: "Moderate Channel", checked: false },
    { scope: "channel:manage:broadcast", label: "API: Manage Stream Information", checked: false },
    { scope: "channel:manage:redemptions", label: "API: Manage Custom Redeems", checked: false },
    { scope: "channel:read:redemptions", label: "API: Read Custom Redeems", checked: false },
    { scope: "moderator:manage:chat_messages", label: "API: Moderate Chat", checked: false },
    { scope: "moderator:manage:chat_settings", label: "API: Edit Chat Mode", checked: false },
    { scope: "moderator:manage:shoutouts", label: "API: Send Shoutouts", checked: false },
    { scope: "moderator:read:followers", label: "EventSub: See Follows", checked: false },
    { scope: "channel:read:subscriptions", label: "EventSub: See Subs", checked: false },
    { scope: "channel:read:hype_train", label: "EventSub: See Hype Trains", checked: false },
])
const scopeString = preact.computed(
    () => {
        const scopeList =
            scopes.value
            .filter(item => item.checked)
            .map(item => item.scope)
            .join(" ")
        return `openid ${scopeList}`
    }
)

const scopeSelector = () => {
    const toggleScope = (evt) => {
        const pos = scopes.value.findIndex(
            item => item.scope === evt.target.dataset.scope
        )
        scopes.value = update(
            scopes.value,
            { [`${pos}.checked.$set`]: evt.target.checked }
        )
    }
    const options = scopes.value.map(
        item => html`
            <label ws-x="@toggle [$color @primary] [$flat] [bg:hover #333]">
                <span>
                    ${item.label}
                    <div ws-x="[$subtitle]">${item.scope}<//>
                <//>
                <input
                    type="checkbox"
                    checked=${item.checked}
                    oninput=${toggleScope}
                    data-scope=${item.scope}
                />
            <//>
        `
    )
    return html`
        <div ws-x="[grid] [gr.cols 1fr] [w 100%] [gap 4px]">
            ${options}
        <//>
    `
}

export default () => {
    const copied = preact.useSignal(false)
    const copy = () => {
        if (token === null) {
            return
        }
        navigator.clipboard.writeText(token)
        copied.value = true
        setTimeout(
            () => copied.value = false,
            1500
        )
    }

    return html`
        <ws-paper ws-x="[$outline]">
            <ws-titlebar slot="header" ws-x="[$color @primary]">
                <span slot="title" ws-x="[$title]">
                    Shion Bot Token Generator
                <//>
            <//>
            <ws-flex slot="content" ws-x="[fl.cross center]">
                <ws-grid ws-x="[p 0px] [gr.cols 1fr @button-size] [w 100%]">
                    <input
                        readonly
                        type="password"
                        autocomplete="off"
                        ws-x="[w 100%] [outln:focus none] [b 1px solid @primary]
                        [bg transparent] [r 4px]"
                        placeholder="No Token Generated"
                        value=${token}
                    />
                    <button ws-x="[$outline] [$color @secondary]" onclick=${copy}>
                        <${show} when=${copied.value === false}>
                            <ws-icon class="bi-copy">Copy<//>
                            <else>
                                <ws-icon class="bi-check">Copied<//>
                            <//>
                        <//>
                    <//>
                <//>
                <form action="https://id.twitch.tv/oauth2/authorize">
                    <input type="hidden" name="scope" value=${scopeString} />
                    <input type="hidden" name="response_type" value="token" />
                    <input type="hidden" name="redirect_uri" value=${location.href} />
                    <input type="hidden" name="client_id" value="6net4tt1o054ehn80jijztk7ij5zo8" />
                    <button ws-x="[$fill] [$color @accent]">
                        <ws-icon class="bi-twitch">Get Twitch Token<//>
                    <//>
                <//>
                <${scopeSelector} />
            <//>
        <//>
    `
}
