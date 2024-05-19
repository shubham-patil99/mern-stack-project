const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/mern-stack', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});


const userSchema = new mongoose.Schema({
  given_name: String,
  family_name: String,
  email: String,
  picture: String,
});

const User = mongoose.model('User', userSchema);


const itemSchema = new mongoose.Schema({
  name: String,
  quantity: String,
  description: String,
  price: String,
});

const Item = mongoose.model('Item', itemSchema);


app.post('/user-details', async (req, res) => {
  try {
    const { given_name, family_name, email, picture } = req.body;
    console.log(req.body);
    const newUser = new User({ given_name, family_name, email, picture });
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save user' });
  }
});


app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

app.post('/items', async (req, res) => {
  try {
    const { name, quantity, description, price } = req.body;
    const newItem = new Item({ name, quantity, description, price });
    await newItem.save();
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item' });
  }
});

app.delete('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Deleting item with id: ${id}`);
    const result = await Item.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
