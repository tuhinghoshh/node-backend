import 'dotenv/config'
import express from "express";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

let pizzaData = [];
let nextId = 1;

// add a new pizza
app.post("/pizzas", (req, res) => {
  const { name, price } = req.body;
  const newPizza = { id: nextId++, name, price };
  pizzaData.push(newPizza);
  res.status(201).send(newPizza);
});

// get all pizza
app.get("/pizzas", (req, res) => {
  res.status(200).send(pizzaData);
});

// get a pizza with id
app.get("/pizzas/:id", (req, res) => {
  const pizza = pizzaData.find((t) => t.id === parseInt(req.params.id));
  if (!pizza) {
    return res.status(404).send("Pizza Not found");
  }
  res.status(200).send(pizza);
});

//update pizza
app.put("/pizzas/:id", (req, res) => {
  const pizza = pizzaData.find((t) => t.id === parseInt(req.params.id));
  if (!pizza) {
    return res.status(404).send("Pizza Not found");
  }
  const { name, price } = req.body;
  pizza.name = name;
  pizza.price = price;
  res.status(200).send(pizza);
});

//delete pizza
app.delete("/pizzas:id", (req, res) => {
  const index = pizzaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("Pizza Not found");
  }
  pizzaData.splice(index, 1);
  return res.status(204).send("deleted");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}...`);
});