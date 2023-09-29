// This approach passes children to Providers with props.children, which allows Providers to rerender without necessarily rerendering all of their children, making React context far more powerful. With this technique, assigning components to a Provider turns the components into a self-contained network that will rerender together when their Provider rerenders, even if the components aren't directly connected to each other. There's still a significant limitation and source of complexity in that components that cause a rerender must be part of the network even if there's no need for them to rerender themselves. Furthermore, over 10 lines of setup are needed to avoid typing out every Provider individually.
import react from "react"
import data from "./data"
let Channels = function() {
    console.log("Channels")
    let currentChannel = react.useContext(context.channel)
    let channels = []
    for (let channel in data.channels) {
        channels[channel] = <label key = {channel}>
            <input type = {"radio"} defaultChecked = {channel === currentChannel[0]} onClick = {function() {
                currentChannel[1](channel)
            }} name = {"channel"} />
            {data.channels[channel]}
        </label>
    }
    return channels
}
let Checkbox = function() {
    console.log("Checkbox")
    let showSpam = react.useContext(context.spam)
    return <input type = {"checkbox"} onChange = {function(event) {
        showSpam[1](event.target.checked)
    }} />
}
let Posts = function() {
    console.log("Posts")
    let currentChannel = react.useContext(context.channel)
    let showSpam = react.useContext(context.spam)
    let posts = []
    for (let post in data.posts) {
        if ((data.posts[post].channel === data.channels[currentChannel[0]]) && ((data.posts[post].user !== "Sam") || showSpam[0])) {
            posts.push(<p key = {post}>
                {data.posts[post].time} <span>{data.posts[post].user}</span>: {data.posts[post].content}
            </p>)
        }
    }
    return posts
}
let defaults = { channel: "0", spam: undefined }
let app = <>
    <form>
        <Channels />
    </form>
    <div>
        <div>
            <label>
                <Checkbox />
                show likely spam
            </label>
        </div>
        <Posts />
    </div>
</>
let context = {}
for (let slice in defaults) {
    context[slice] = react.createContext()
    let Provider = context[slice].Provider
    let App = function(props) {
        return <Provider value = {react.useState(defaults[slice])}>
            {props.children}
        </Provider>
    }
    app = <App children = {app} />
}
export default function App() {
    console.log("App")
    return app
}