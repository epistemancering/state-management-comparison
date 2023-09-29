import react from "react"
import reactDOM from "react-dom/client"
import App from "./instructions"
// import App from "./singleton"
// import App from "./props"
// import App from "./naiveContext"
// import App from "./grizzledContext"
// import App from "./redux"
// import App from "./recut.jsx"
// import App from "./harmony"
reactDOM.createRoot(document.querySelector("div")).render(<react.StrictMode>
    <h1 style = {{ margin: 0, borderBottomStyle: "solid" }}>
        Group Chat App
    </h1>
    <main style = {{ display: "flex" }}>
        <App />
    </main>
</react.StrictMode>)