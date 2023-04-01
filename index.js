const mongoose = require("mongoose");
const app = require("./app");
require('dotenv').config();
mongoose.connect(process.env.DB_URL+process.env.DB_NAME)
.then(()=>{
    console.log("Connected to DB");
})
.catch(()=>{
    console.log("failed to connect");
})

app.listen(process.env.PORT, ()=>{
    console.log("server is running");
});
