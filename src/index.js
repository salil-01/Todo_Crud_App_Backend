//  importing required modules from nodejs to build the server
const express = require("express");
const fs = require("fs");
const app = express();

//middleware to connvert data received from body
app.use(express.json());

//get request
app.get("/", (req, res) => {

  //reading data from db.json with the help of fs module
  let data = fs.readFileSync("./db.json", { encoding: "utf-8" });
  const parsedData = JSON.parse(data);

  //sending data as response
  res.status(200).send(parsedData.todos);
});

//post request
app.post("/", (req, res) => {
  // storing data received from body
  const todoReceived = req.body;

   //reading data from db.json with the help of fs module
  let data = fs.readFileSync("./db.json", { encoding: "utf-8" });

  //parsing stringified data after reading 
  let parsedData = JSON.parse(data);

  //pushing data received from body into parsedData
  parsedData.todos.push(todoReceived);

  //writing parsed data in db.json with the help of fs module
  fs.writeFile("./db.json", JSON.stringify(parsedData), (err) => {
    if (err) {
      res.status(400).send(err);
    }
    let data = fs.readFileSync("./db.json", { encoding: "utf-8" });
    const parsedData = JSON.parse(data);

    //sending updated data as response
    res.status(200).send(parsedData.todos);
  });
});

//put request
app.put("/:id", (req, res) => {
  //catching id from url params
  const { id } = req.params;

  // storing data received from body
  const todoReceived = req.body;

  //reading data from db.json with the help of fs module
  let data = fs.readFileSync("./db.json", { encoding: "utf-8" });

  //parsing stringified data after reading 
  const parsedData = JSON.parse(data);

  //finding if the element with given id exists in db.json or not
  const findTodo = parsedData.todos.find((el) => el.id === +id);
  if (findTodo) {
    const updatedTodo = parsedData.todos.map((el) => {
      if (el.id === +id) {

        //putting data is id matches
        (el.id = todoReceived.id),
          (el.task = todoReceived.task),
          (el.status = todoReceived.status);
        return el;
      } else {
        return el;
      }
    });

    //writing parsed data in db.json with the help of fs module
    fs.writeFile("./db.json", JSON.stringify({ todos: updatedTodo }), (err) => {
      if (err) {
        res.status(404).send(err);
      } else {
        let data = fs.readFileSync("./db.json", { encoding: "utf-8" });
        const parsedData = JSON.parse(data);

         //sending updated data as response
        res.status(200).send(parsedData.todos);
      }
    });
  } else {
    res.status(400).send("Invalid argument");
  }
});

//patch request
app.patch("/:id", (req, res) => {
  const { id } = req.params;
  //   console.log(id);

  const todoReceived = req.body;

  //converting status to string to handle it in conditional statements
  if (todoReceived.status === true) {
    todoReceived.status = "true";
  }
  if (todoReceived.status === false) {
    todoReceived.status = "false";
  }

  let data = fs.readFileSync("./db.json", { encoding: "utf-8" });
  const parsedData = JSON.parse(data);
  const findTodo = parsedData.todos.find((el) => el.id === +id);
  if (findTodo) {
    const updatedTodo = parsedData.todos.map((el) => {
      if (el.id === +id) {

        //patching data
        el.id = todoReceived.id || el.id;
        el.task = todoReceived.task || el.task;
        el.status = todoReceived.status
          ? todoReceived.status === "true"
            ? true
            : false
          : el.status;
        return el;
      } else {
        return el;
      }
    });
    fs.writeFile("./db.json", JSON.stringify({ todos: updatedTodo }), (err) => {
      if (err) {
        res.status(404).send(err);
      } else {
        let data = fs.readFileSync("./db.json", { encoding: "utf-8" });
        const parsedData = JSON.parse(data);

        //sending updated data as response
        res.status(200).send(parsedData.todos);
      }
    });
  } else {
    res.status(400).send("Invalid argument");
  }
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;
  //   console.log(id);
  let data = fs.readFileSync("./db.json", { encoding: "utf-8" });
  const parsedData = JSON.parse(data);
  const findTodo = parsedData.todos.find((el) => el.id === +id);
  if (findTodo) {

    //filtering that todo whose id match out of the array
    const updatedTodo = parsedData.todos.filter((el) => {
      if (el.id !== +id) {
        return el;
      }
    });
    fs.writeFile("./db.json", JSON.stringify({ todos: updatedTodo }), (err) => {
      if (err) {
        res.status(404).send(err);
      } else {
        let data = fs.readFileSync("./db.json", { encoding: "utf-8" });
        const parsedData = JSON.parse(data);

        //sending updated data as response
        res.status(200).send(parsedData.todos);
      }
    });
  } else {
    res.status(400).send("Invalid argument");
  }
});

//command for running server
app.listen(8080, () => {
  console.log("Server running at 8080");
});

// export the server
// eg.module.exports = app;
module.exports = app;
