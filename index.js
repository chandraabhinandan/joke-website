import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
app.get("/", (req, res) => {
    res.render("index.ejs");
});
app.post("/submit", async (req, res) => {
    const response = await axios.get("https://v2.jokeapi.dev/joke/"+req.body.joke);        
    
    if(response.data.error)
    {
        var msg1 = "fuck";
        res.render("index.ejs", {msg1});
    }
    else
    {
        var msg1="", msg2="";
        if(response.data.type==="single"){        
            msg1 = response.data.joke;
        }
        else if(response.data.type==="twopart"){
            msg1 = response.data.setup;
            msg2 = response.data.delivery;
        }
        res.render("index.ejs", {msg1, msg2});        
    }
});