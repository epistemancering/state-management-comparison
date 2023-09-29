// This approach doesn't bother with any kind of state management, meaning everything is rerendered on any user action, making this the least performant possible approach. That said, it can't be beaten in terms of simplicity.
import react from "react"
import data from "./data"
export default function App() {
    console.log("App")
    let currentChannel = react.useState("0")
    let showSpam = react.useState()
    let channels = []
    for (let channel in data.channels) {
        channels[channel] = <label key = {channel}>
            <input type = {"radio"} defaultChecked = {channel === currentChannel[0]} onClick = {function() {
                currentChannel[1](channel)
            }} name = {"channel"} />
            {data.channels[channel]}
        </label>
    }
    let posts = []
    for (let post in data.posts) {
        if ((data.posts[post].channel === data.channels[currentChannel[0]]) && ((data.posts[post].user !== "Sam") || showSpam[0])) {
            posts.push(<p key = {post}>
                {data.posts[post].time} <span>{data.posts[post].user}</span>: {data.posts[post].content}
            </p>)
        }
    }
    return <>
        <form>
            {channels}
        </form>
        <div>
            <div>
                <label>
                    <input type = {"checkbox"} onChange = {function(event) {
                        showSpam[1](event.target.checked)
                    }} />
                    show likely spam
                </label>
            </div>
            {posts}
        </div>
    </>
}