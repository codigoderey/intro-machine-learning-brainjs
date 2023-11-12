const brain = require("brain.js")
const express = require("express")
const app = express()

app.get("/", (req, res) => {
    res.send("Hello Brain.js")
})

app.get("/sentiment/:sentiment", (req, res) => {
    const net = new brain.recurrent.LSTM();
    // fetch ./db/data.json
    const {feelings} = require("./db/data.json")
    
    const data = feelings

    net.train(data, {
        iterations: 1000,
        log: true,
    })
    
    const output = net.run(req.params.sentiment);

    console.log(output)
    
    res.send(`Word ${req.params.sentiment} es ${output}.`)
})

// set public folder as root
app.use(express.static('public'));

app.listen(8080, () => console.log('app running on port 8080'))