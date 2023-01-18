//The npm package that gives the server its functionality. 
const express = require("express");
//Routes ther series of route files to the server.
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
//tells node that we have an express server.
const app = express();
//the intial port.
const PORT = process.env.PORT || 3001
const db = require("./db/db.json");
//this is the middle ware that will set up the express app to handle the data parsing for post and put requests. Stores and accepts that data.
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//The static files here set up the express app. 
app.use(express.static("public"));
//Routes ther series of route files to the server. Here is the app use of above statement on lines 4 and 5.
app.use("/api",apiRoutes);
app.use("/",htmlRoutes);
app.listen(PORT,()=>console.log(`listening on port; ${PORT}`));