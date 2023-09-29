// The React Redux library separates listening from dispatching, making it possible to rerender only the components that truly need to be rerendered on any given user action. However, it adds around 14MB and the syntax is rather clunky. Setting it up in the simplest possible way, including avoiding typing out every selector individually, takes over 15 lines.
import * as reduxjs from "@reduxjs/toolkit"
import * as reactRedux from "react-redux"
import data from "./data"
let Posts = function() {
    console.log("Posts")
    let currentChannel = reactRedux.useSelector(select.channel)
    let showSpam = reactRedux.useSelector(select.spam)
    let posts = []
    for (let post in data.posts) {
        if ((data.posts[post].channel === data.channels[currentChannel]) && ((data.posts[post].user !== "Sam") || showSpam)) {
            posts.push(<p key = {post}>
                {data.posts[post].time} <span>{data.posts[post].user}</span>: {data.posts[post].content}
            </p>)
        }
    }
    return posts
}
let defaults = { channel: "0", spam: undefined }
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
let channels = []
for (let channel in data.channels) {
    channels[channel] = <label key = {channel}>
        <input type = {"radio"} defaultChecked = {channel === defaults.channel} onClick = {function() {
            store.dispatch({ type: "channel", value: channel })
        }} name = {"channel"} />
        {data.channels[channel]}
    </label>
}
export default function App() {
    console.log("App")
    return <>
        <form>
            {channels}
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