import react from "react"
let recut = {
    "listen": function(test, listener) {
        if (typeof test === "string") {
            react.useState(function() {
                if (simpleListeners[test]) {
                    simpleListeners[test].push(listener[1])
                } else {
                    simpleListeners[test] = [listener[1]]
                    simpleValues[test] = recut[test]
                }
            })
            return recut[test]
        }
        let result = test(recut)
        react.useState(function() {
            customListeners.push(listener[1])
            customTests.push(test)
            customValues.push(result)
        })
        return result
    },
    "dispatch": function(name, value) {
        if (value !== undefined) {
            simpleValues[name] = value
        }
        if (recut[name] !== simpleValues[name]) {
            recut[name] = simpleValues[name]
            for (let index in simpleListeners[name]) {
                simpleListeners[name][index]({})
            }
            for (let index in customListeners) {
                let result = customTests[index](recut)
                if (customValues[index] !== result) {
                    customValues[index] = result
                    customListeners[index]({})
                }
            }
        }
        return recut[name]
    }
}
let simpleListeners = {}
let simpleValues = {}
let customListeners = []
let customTests = []
let customValues = []
export default recut