const fs = require('fs');
const cors = require('cors');

const express = require('express');
const app = express();

const port = 3000;



let db = [];
fs.readFile('db.json', 'utf8', (err, data) => {
  if (err) {
    console.status(400).error(err);
    return;
  }
  db = JSON.parse(data);
  console.log(db);
});


app.use(cors());
app.use(express.json());




// Retrieve all todos
app.get('/todos', (req, res) => {
  res.json(db);
});

// Create a new todo
app.post('/todos', (req, res) => {
  console.log(req.body);
  db = db.concat(req.body);

  // Write the data to a file
  fs.writeFile('db.json', JSON.stringify(db), (err) => {
    if (err) {
      res.status(400).error(err);
      return;
    }
    console.log('Todo saved to file');
  });

  res.json("Created a new todo");
});

// Retrieve a specific todo by ID
app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (id < 0 || id >= db.length) {
    res.status(400).end("Error");
  } else {
    res.json(`Retrieve todo ${id} = ${db[id]}`);
  }
});

// Update a specific todo by ID
app.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (id < 0 || id >= db.length) {
    res.status(400).end("Error");
  } else {
    db[id] = req.body[0];
    // Write the data to a file
    fs.writeFile('db.json', JSON.stringify(db), (err) => {
      if (err) {
        res.status(400).error(err);
        return;
      }
      console.log('Todo updated to file');
    });
    res.json(`Updated ${id} todo`);
  }
});

// Delete a specific todo by ID
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (id < 0 || id >= db.length) {
    res.status(400).end("Error");
  } else {
    db.splice(id, 1);
    // Write the data to a file
    fs.writeFile('db.json', JSON.stringify(db), (err) => {
      if (err) {
        res.status(400).error(err);
        return;
      }
      console.log('Todo delited to file');
    });
    res.json(`Deleted ${id} todo`);
  }
});

// default
app.all('*', (req, res) => {
  res.status(404).end("error");
});




// Start the server
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

