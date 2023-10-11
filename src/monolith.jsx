// This approach doesn't bother with any kind of state management, meaning everything is rerendered on any user action, making this the least performant possible approach. That said, it can't be beaten in terms of simplicity.
import react from "react"
import data from "./data"
export default function App() {
    console.log("App")
    let currentChannel = react.useState("HTML")
    let showSpam = react.useState()
    return <>
        <form>
            {data.channels.map(function(channel) {
                return <label key = {channel}>
                    <input type = {"radio"} defaultChecked = {channel === currentChannel[0]} onClick = {function() {
                        currentChannel[1](channel)
                    }} name = {"channel"} />
                    {channel}
                </label>
            })}
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
            {data.posts.map(function(post, key) {
                if ((post.channel === currentChannel[0]) && ((post.user !== "Sam") || showSpam[0])) {
                    return <p key = {key}>
                        {post.time} <span>{post.user}</span>: {post.content}
                    </p>
                } else {
                    return undefined
                }
            })}
        </div>
    </>
}