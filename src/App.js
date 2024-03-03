import React, { useState } from "react";
import {
  AppBar,
  Button,
  Typography,
  Toolbar,
} from "@mui/material";
import Box from '@mui/material/Box';

import "./App.css";
const sideNavItems = ['Stores', 'Categories', 'Stock']
const App = () => {
  const [page, setPage] = useState('');

  const handleOption = (i) => {
    setPage(i)
  }
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
    </div>
  )
};

export default App;
