import React, { useState } from "react";
import {
  AppBar,
  Button,
  Typography,
  Toolbar,
  Card, CardContent
} from "@mui/material";
import Box from '@mui/material/Box';
import { FormControl, FormControlLabel } from '@mui/material';
import { RadioGroup, Radio } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import "./App.css";

const stores = [
  { id: 1, name: 'Store 1', description: 'Description for Store 1' },
  { id: 2, name: 'Store 2', description: 'Description for Store 2' },
  { id: 3, name: 'Store 3', description: 'Description for Store 3' }
];

const sideNavItems = ['Stores', 'Categories', 'Stock']
const App = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState('');

  const handleOption = (i) => {
    setPage(i)
  }

  const [selectedStore, setSelectedStore] = useState(stores[0]);

  const handleStoreChange = (event) => {
    const storeId = parseInt(event.target.value);
    const selected = stores.find(store => store.id === storeId);
    setSelectedStore(selected);
    navigate('/categories');
  };


  return (
          <div>
            <AppBar position="static">
            <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            StockApp
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {sideNavItems.map((item) => (
              <Button className="topnav-buttons" key={item} sx={{ color: '#fff' }} onClick={event => handleOption(item)}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
            </AppBar>
            <FormControl component="fieldset">
        <RadioGroup aria-label="store" name="store" value={selectedStore.id.toString()} onChange={handleStoreChange}>
          {stores.map(store => (
            <Card key={store.id} style={{ margin: '8px', width:'100%' }}>
              <CardContent>
                <FormControlLabel value={store.id.toString()} control={<Radio />} label={store.name} />
                <Typography variant="body1">{store.description}</Typography>
              </CardContent>
            </Card>
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  )
};

export default App;