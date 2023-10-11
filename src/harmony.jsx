// This approach is my personal favorite, and it's what powers my https://bookmark.city/ app. It's too simple for a library: all it is is saving component state to a global object that any other component can access to cause rerenders, and saving global variables outside of React entirely. With all of the other approaches, components contain some sort of listeners that effectively list which user actions will cause a rerender, but with this technique, user actions list which components should be rerendered instead. As such, this is even easier to use than Recut.js for projects that have more kinds of interactivity than kinds of components - put another way, "app-y" web pages. Separating the rerendering concern from the variables concern cleanly eliminates a few other React headaches as well. It can't be beaten in terms of performance. A few lines of setup are needed.
import react from "react"
import data from "./data"
let Posts = function() {
    console.log("Posts")
    state.Posts = react.useState()
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
let render = function(components) {
    for (let component in components) {
        state[components[component]][1]({})
    }
}
let state = {}
let currentChannel = "HTML"
let showSpam
export default function App() {
    console.log("App")
    return <>
        <form>
            {data.channels.map(function(channel) {
                return <label key = {channel}>
                    <input type = {"radio"} defaultChecked = {channel === currentChannel} onClick = {function() {
                        currentChannel = channel
                        render(["Posts"])
                    }} name = {"channel"} />
                    {channel}
                </label>
            })}
        </form>
        <div>
            <div>
                <label>
                    <input type = {"checkbox"} onChange = {function() {
                        showSpam = !showSpam
                        render(["Posts"])
                    }} />
                    show likely spam
                </label>
            </div>
            <Posts />
        </div>
    </>
}