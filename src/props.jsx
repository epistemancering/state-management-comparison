// This approach splits logically self-contained parts of the app into child components, continuing to provide non-self-contained logic with props where necessary. This is one of the most basic React techniques, and it means that some user actions can rerender only part of the app rather than the whole thing, but it's limited since data can only be passed to direct parents or direct children. It's possible to drill props across a chain of many components, but every component along that chain will need to rerender for that to work.
import react from "react"
import data from "./data"
let Posts = function(props) {
    console.log("Posts")
    let showSpam = react.useState()
    let posts = []
    for (let post in data.posts) {
        if ((data.posts[post].channel === data.channels[props.channel]) && ((data.posts[post].user !== "Sam") || showSpam[0])) {
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
export default function App() {
    console.log("App")
    let currentChannel = react.useState("0")
    let channels = []
    for (let channel in data.channels) {
        channels[channel] = <label key = {channel}>
            <input type = {"radio"} defaultChecked = {channel === currentChannel[0]} onClick = {function() {
                currentChannel[1](channel)
            }} name = {"channel"} />
            {data.channels[channel]}
        </label>
    }
    return <>
        <form>
            {channels}
        </form>
        <div>
            <Posts channel = {currentChannel[0]} />
        </div>
    </>
}