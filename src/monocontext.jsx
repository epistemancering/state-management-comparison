// This approach uses React context to avoid prop drilling, which can be much simpler to work with, but since rerunning the Provider causes all of its descendants to rerun as well, there is no performance benefit. A few lines of setup are needed.
import react from "react"
import data from "./data"
let Channels = function() {
    console.log("Channels")
    let currentChannel = react.useContext(context)
    return data.channels.map(function(channel) {
        return <label key = {channel}>
            <input type = {"radio"} defaultChecked = {channel === currentChannel[0]} onClick = {function() {
                currentChannel[1](channel)
            }} name = {"channel"} />
            {channel}
        </label>
    })
}
let Posts = function() {
    console.log("Posts")
    let currentChannel = react.useContext(context)
    let showSpam = react.useState()
    return <>
        <div>
            <label>
                <input type = {"checkbox"} onChange = {function(event) {
                    showSpam[1](event.target.checked)
                }} />
                show likely spam
            </label>
        </div>
        {data.posts.map(function(post, key) {
            if ((post.channel === currentChannel[0]) && ((post.user !== "Sam") || showSpam[0])) {
                return <p key = {key}>
                    {post.time} <span>{post.user}</span>: {post.content}
                </p>
            } else {
                return undefined
            }
        })}
    </>
}
let context = react.createContext()
export default function App() {
    console.log("App")
    return <context.Provider value = {react.useState("HTML")}>
        <form>
            <Channels />
        </form>
        <div>
            <Posts />
        </div>
    </context.Provider>
}