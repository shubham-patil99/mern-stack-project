import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Divider } from '@mui/material';
import ItemTable from './itemtable';

const Items = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      // const response = await axios.get(`${window.location.origin}/items`);
      const response = await axios.get(`http://localhost:5000/items`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !quantity || !description || !price) {
      setErrorMsg('Please Add Item before Submitting');
      return;
    }
    try {
      // await axios.post(`${window.location.origin}/items`, {
        await axios.post(`http://localhost:5000/items`, {
        name,
        quantity,
        description,
        price,
      });
      setName('');
      setQuantity('');
      setDescription('');
      setPrice('');
      fetchItems();
      setErrorMsg('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div>
      <h2 style={{ margin: '0', color:"#5F5F5F" }}> Add Item </h2>
      <Divider />
      <form onSubmit={handleSubmit}>
        <input
          style={{
            margin: '10px',
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
            boxShadow: '1px 1px 2px 2px lightblue',
          }}
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrorMsg('');
          }}
        />
        <input
          style={{
            margin: '10px',
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
            boxShadow: '1px 1px 2px 2px lightblue',
          }}
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
            setErrorMsg('');
          }}
        />
        <input
          style={{
            margin: '10px',
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
            boxShadow: '1px 1px 2px 2px lightblue',
          }}
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setErrorMsg('');
          }}
        />
        <input
          style={{
            margin: '10px',
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
            boxShadow: '1px 1px 2px 2px lightblue',
          }}
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            setErrorMsg('');
          }}
        />
        <button
          type="submit"
          style={{
            margin: '10px',
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
            background: '#1976d2',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Add
        </button>
      </form>
      <text style={{ color: 'red' }}>{errorMsg}</text>
      <ItemTable items={items} fetchItems={fetchItems} />
    </div>
  );
};

export default Items;
