import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Typography,
  Toolbar,
  Card,
  CardContent,
} from "@mui/material";
import Box from "@mui/material/Box";
import { FormControl, FormControlLabel } from "@mui/material";
import { RadioGroup, Radio } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./App.css";
import Categories from "./component/Categories";
import Stocks from "./component/Stocks";

const stores = [
  { id: 1, name: "Store 1", description: "Description for Store 1" },
  { id: 2, name: "Store 2", description: "Description for Store 2" },
  { id: 3, name: "Store 3", description: "Description for Store 3" },
];

const sideNavItems = ["Stores", "Categories", "Stock"];
const employeeSideNavItems = ["Categories", "Stock"];
let navItems = [];

const App = () => {
  let [stores, setStores] = useState([]);

  const callStoreApi = (async) => {
    fetch("http://localhost:5000/home")
      .then(async (response) => {
        const res = await response.json();
        setPage('Stores')
        setStores(res.storeDetails);
      })
      .catch((error) => console.error(error));
      checkPrivileges();
  };

  useEffect(() => {
    callStoreApi();
  }, []);

  const checkPrivileges = () => {
   navItems = localStorage.getItem("designation") == "manager" ? sideNavItems : employeeSideNavItems;
  }

  const navigate = useNavigate();
  const [page, setPage] = useState("");

  const handleOption = (i) => {
    setPage(i);
  };

  const [selectedStore, setSelectedStore] = useState("no srof");

  const handleStoreClick = (code) => {
    localStorage.setItem("storeCode", code)
    console.log("code" , code)
    setPage('Categories');
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            StockApp
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            { navItems.map((item) => (
              <Button
                className="topnav-buttons"
                key={item}
                sx={{ color: "#fff" }}
                onClick={(event) => handleOption(item)}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      {(page === 'Stores') && <Box>
         {stores.map((store) => (
          <div onClick={() => handleStoreClick(store.storeCode)}>
          <Card  style={{ cursor: 'pointer', margin: "8px", width: "100%" }}>
            <CardContent >
            <Typography variant="body1">{store.storeName}</Typography>
              <Typography variant="body1">{store.address}</Typography>
            </CardContent>
          </Card>

          </div>
        ))}
      </Box>}
         
          <Box>
        {(page === 'Categories') &&
          <Categories />
        }
      </Box>
      <Box>
        {(page === 'Stocks') &&
          <Stocks />
        }
      </Box>
    </div>
  );
};

export default App;
