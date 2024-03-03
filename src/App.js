import React, { useState } from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import {
  AppBar,
  Button,
  IconButton,
  Tab,
  Tabs,
  Typography,
  Toolbar,
} from "@mui/material";
import { Add, Category, Storefront, Inventory2 } from "@mui/icons-material";
// import ManageCategory from "./pages/manageCategory";
// import ManageStock from "./pages/manageStock";
// import AddStockForm from "./components/AddStock";
// import StorePage from "./pages/manageStore";
// import { useDataContext } from "./context/DataContext";
import "./App.css";

const App = () => {

  return (
          <div>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6">Home</Typography>
              </Toolbar>
            </AppBar>
    </div>
  )
};

export default App;
