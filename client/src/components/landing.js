import React, { useState, useEffect } from 'react';
import ItemTable from './itemtable';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Landing() {
  const [items, setItems] = useState([]);
  const [chartData, setChartData] = useState([]);
  const fetchItems = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/items`);
      setItems(response.data);
      calculateChartData(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const calculateChartData = (items) => {
    const totalItems = items.length;
    const totalQuantity = items.reduce((acc, item) => acc + Number(item.quantity), 0);
    const totalPrice = items.reduce((acc, item) => acc + Number(item.price), 0);

    setChartData([
      { name: 'Total Items', Items: totalItems, Quantity: 0, Price: 0 },
      { name: 'Total Quantity', Items: 0, Quantity: totalQuantity, Price: 0 },
      { name: 'Total Price', Items: 0, Quantity: 0, Price: totalPrice },
    ]);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const customLegend = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div>
        <svg width="20" height="10">
          <rect width="20" height="10" style={{ fill: "#8884d8" }} />
        </svg>
        <span>Items</span>
      </div>
      <div>
        <svg width="20" height="10">
          <rect width="20" height="10" style={{ fill: "#82ca9d" }} />
        </svg>
        <span>Quantity</span>
      </div>
      <div>
        <svg width="20" height="10">
          <rect width="20" height="10" style={{ fill: "#ffc658" }} />
        </svg>
        <span>Price</span>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ color: "#5F5F5F" }}>Overview</h2>
        {customLegend()}
      </div>
      <ResponsiveContainer width="80%" height={200}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Items" fill="#8884d8" />
          <Bar dataKey="Quantity" fill="#82ca9d" />
          <Bar dataKey="Price" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
      <h2 style={{ color: "#5F5F5F" }}>List Of Your Items</h2>
      <ItemTable items={items} fetchItems={fetchItems} />
      <p>* You can add items in My Items Tab</p>
    </div>
  );
}

export default Landing;
