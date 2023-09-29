// The Recut.js library I'm developing is a work in progress, but it can already do everything I and many others use React Redux for. Compared to React Redux, it's more performant, much simpler to use, and very, very tiny. The only line of setup is the import. I plan to add support for listening to arrays of values (which would condense lines 7-9 here into a single line), possibly add a custom hook to make it even simpler to use, and add error handling and documentation (though it's so simple that you can probably follow exactly what it's doing just by reading this file).
import react from "react"
import recut from "./recut"
import data from "./data"
let Posts = function() {
    console.log("Posts")
    let listener = react.useState()
    recut.listen("currentChannel", listener)
    recut.listen("showSpam", listener)
    let posts = []
    for (let post in data.posts) {
        if ((data.posts[post].channel === data.channels[recut.currentChannel]) && ((data.posts[post].user !== "Sam") || recut.showSpam)) {
            posts.push(<p key = {post}>
                {data.posts[post].time} <span>{data.posts[post].user}</span>: {data.posts[post].content}
            </p>)
        }
    }
    return posts
}
recut.currentChannel = "0"
let channels = []
for (let channel in data.channels) {
    channels[channel] = <label key = {channel}>
        <input type = {"radio"} defaultChecked = {channel === recut.currentChannel} onClick = {function() {
            recut.dispatch("currentChannel", channel)
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
                    <input type = {"checkbox"} onChange = {function() {
                        recut.dispatch("showSpam", !recut.showSpam)
                    }} />
                    show likely spam
                </label>
            </div>
            <Posts />
        </div>
    </>
}