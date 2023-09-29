// This approach uses React context to avoid prop drilling, which can be much simpler to work with, but since rerunning the Provider causes all of its descendants to rerun as well, there is no performance benefit. A few lines of setup are needed.
import react from "react"
import data from "./data"
let Channels = function() {
    console.log("Channels")
    let currentChannel = react.useContext(context)
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
let Posts = function() {
    console.log("Posts")
    let currentChannel = react.useContext(context)
    let showSpam = react.useState()
    let posts = []
    for (let post in data.posts) {
        if ((data.posts[post].channel === data.channels[currentChannel[0]]) && ((data.posts[post].user !== "Sam") || showSpam[0])) {
            posts.push(<p key = {post}>
                {data.posts[post].time} <span>{data.posts[post].user}</span>: {data.posts[post].content}
            </p>)
        }
    }
    return <>
        <div>
            <label>
                <input type = {"checkbox"} onChange = {function(event) {
                    showSpam[1](event.target.checked)
                }} />
                show likely spam
            </label>
        </div>
        {posts}
    </>
}
let context = react.createContext()
export default function App() {
    console.log("App")
    return <context.Provider value = {react.useState("0")}>
        <form>
            <Channels />
        </form>
        <div>
            <Posts />
        </div>
    </context.Provider>
}