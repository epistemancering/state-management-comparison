// The React Redux library separates listening from dispatching, making it possible to rerender only the components that truly need to be rerendered on any given user action. However, it adds around 14MB and the syntax is rather clunky. Setting it up in the simplest possible way, including avoiding typing out every selector individually, takes over 15 lines.
import * as reduxjs from "@reduxjs/toolkit"
import * as reactRedux from "react-redux"
import data from "./data"
let Posts = function() {
    console.log("Posts")
    let currentChannel = reactRedux.useSelector(select.channel)
    let showSpam = reactRedux.useSelector(select.spam)
    return data.posts.map(function(post, key) {
        if ((post.channel === currentChannel) && ((post.user !== "Sam") || showSpam)) {
            return <p key = {key}>
                {post.time} <span>{post.user}</span>: {post.content}
            </p>
        } else {
            return undefined
        }
    })
}
let defaults = { channel: "HTML", spam: undefined }
let store = reduxjs.configureStore({
    reducer: function(state, input) {
        if (input.value === undefined) {
            return defaults
        }
        return { ...state, [input.type]: input.value }
    }
})
let select = {}
for (let slice in defaults) {
    select[slice] = function(store) {
        return store[slice]
    }
}
export default function App() {
    console.log("App")
    return <>
        <form>
            {data.channels.map(function(channel) {
                return <label key = {channel}>
                    <input type = {"radio"} defaultChecked = {channel === defaults.channel} onClick = {function() {
                        store.dispatch({ type: "channel", value: channel })
                    }} name = {"channel"} />
                    {channel}
                </label>
            })}
        </form>
        <div>
            <div>
                <label>
                    <input type = {"checkbox"} onChange = {function(event) {
                        store.dispatch({ type: "spam", value: event.target.checked })
                    }} />
                    show likely spam
                </label>
            </div>
            <reactRedux.Provider store = {store}>
                <Posts />
            </reactRedux.Provider>
        </div>
    </>
}