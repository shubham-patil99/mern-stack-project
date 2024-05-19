import React, { useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ItemTable = ({ items, fetchItems }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`);
      fetchItems(); // Fetch items again to update the list
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  // Calculate the items to be displayed on the current page
  const currentItems = items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableContainer component={Paper}>
      {items.length === 0 ? (
        <h1 style={{ textAlign: 'center', padding: '20px', color: "#858585" }}>Items Not Available</h1>
      ) : (
        <>
          <Table>
            <TableHead style={{ background: '#1976d2' }}>
              <TableRow>
                <TableCell style={{ color: '#fff' }}><b>Item Name</b></TableCell>
                <TableCell style={{ color: '#fff' }}><b>Quantity</b></TableCell>
                <TableCell style={{ color: '#fff' }}><b>Description</b></TableCell>
                <TableCell style={{ color: '#fff' }}><b>Price</b></TableCell>
                <TableCell style={{ color: '#fff' }}><b>Action</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.price} Rs</TableCell>
                  <TableCell style={{ cursor: 'pointer' }} onClick={() => deleteItem(item._id)}>
                    <DeleteIcon style={{ color: '#ff7878' }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={items.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </TableContainer>
  );
};

export default ItemTable;
