// getting express library
const express = require("express");
const menuData = require("./menu-items.json");
const cors = require("cors");
const fs = require("fs");
const { request } = require("http");
const { response } = require("express");

// giving express the name of app
const app = express();
app.use(cors());
app.use(express.json());

app.listen(4000, () => {
  console.log("Our API is listening on port 4000 - YESS it is working");
});

const handleWriteFile = () => {
  const jsonMenuData = JSON.stringify(menuData);
  fs.writeFile("menu-items.json", jsonMenuData, (err) => console.error(err));
};

app.get("/", (request, response) => {
  response.send(menuData);
});

app.post("/", (req, res) => {
  if (request.body.title && request.body.description) {
    menuData.push(request.body); // returns length of array

    handleWriteFile();
    response.send(menuData);
  } else {
    response.send("no body found or wrong body info")
  }
});

// update a menu-item - PUT
app.put("/", (req, res) => {
  if (request.query.title) {
    const itemFound = menuData.find((eachItem) =>
      eachItem.title ? eachItem.title === req.query.title : undefined
    );

    //1.1 Find index of item found
    const indexOfItem = menuData.indexOf(itemFound);

    //2. udpate that item with the new info
    menuData[indexOfItem] = req.body;

    handleWriteFile();
    response.send(menuData);
  } else {
    response.send("no query params found");
  }
});

// delete a menu-item - DELETE
app.delete("/", (req, res) => {
  const itemFound = menuData.find((x) => x.title === req.query.title);
  const indexOfItem = menuData.indexOf(itemFound);

  menuData.splice(indexOfItem, 1);

  handleWriteFile();
  res.send(menuData);
});