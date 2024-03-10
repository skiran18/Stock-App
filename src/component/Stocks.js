// Stocks.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Button,
  TextField,
} from '@mui/material';

const Stocks = () => {
  const { category } = useParams();

  // Default stock data for the example
  const defaultStocks = [
    { id: 1, name: 'Stock 1', quantity: 10 },
    { id: 2, name: 'Stock 2', quantity: 20 },
    { id: 3, name: 'Stock 3', quantity: 15 },
  ];

  const [stocks, setStocks] = useState(defaultStocks);
  const [newStockQuantity, setNewStockQuantity] = useState(0);

  const handleAddStock = (id) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.id === id ? { ...stock, quantity: stock.quantity + newStockQuantity } : stock
      )
    );
    setNewStockQuantity(0);
  };

  const handleMinusStock = (id) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.id === id && stock.quantity > 0
          ? { ...stock, quantity: stock.quantity - 1 }
          : stock
      )
    );
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Stocks for {category}
      </Typography>
      <div style={{ marginTop: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Add Stock
        </Typography>
        <TextField
          label="Quantity"
          type="number"
          variant="outlined"
          value={newStockQuantity}
          onChange={(e) => setNewStockQuantity(Number(e.target.value))}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={() => handleAddStock(1)}>
          Add Stock
        </Button>
      </div>
      <List>
        {stocks.map((stock) => (
          <Card key={stock.id} style={{ marginBottom: '10px' }}>
            <CardContent>
              <ListItem>
                <ListItemText
                  primary={stock.name}
                  secondary={`Quantity: ${stock.quantity}`}
                />
                <Button variant="outlined" onClick={() => handleAddStock(stock.id)}>
                  +
                </Button>
                <Typography variant="body1" style={{ margin: '0 8px' }}>
                  {stock.quantity}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => handleMinusStock(stock.id)}
                  disabled={stock.quantity === 0}
                >
                  -
                </Button>
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </List>
    </div>
  );
};

export default Stocks;
