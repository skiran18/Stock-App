import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Typography,
  Toolbar,
  Card,
  CardContent,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import "./App.css";
import Categories from "./component/Categories";
import Stocks from "./component/Stocks";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from 'axios';

const sideNavItems = ["Stores", "Categories", "Stocks", "Logout"];
const employeeSideNavItems = ["Categories", "Stocks", "Logout"];
let navItems = [];

const App = () => {
  let [stores, setStores] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('isLoggedIn')) {
      navigate("/");
    }
    else{
      callStoreApi();
      const interval = setInterval(refreshTokenCall, 60000);
      return () => clearInterval(interval);
    }
  }, []);

  const refreshtoken = localStorage.getItem('refreshtoken')
  const refreshTokenCall = async () => {
    try {
      const response = await axios.post('http://13.53.184.137:5000/auth/refreshToken', { token, refreshtoken });
      console.log(response)
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  };

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  const callStoreApi = () => {
  
    axios.get("http://13.53.184.137:5000/home", config)
      .then(response => {  
        setPage("Stores");
        setStores(response.data.storeDetails);
      })
      .catch(error => {
        console.error(error);
      });
  
    checkPrivileges();
  };

  const checkPrivileges = () => {
    navItems =
      localStorage.getItem("designation") === "manager"
        ? sideNavItems
        : employeeSideNavItems;
  };

  const customTheme = createTheme({
    palette: {
      primary: {
        main: "#293b94",
      },
    },
  });

  const handleOption = (i) => {
    const storeCode = localStorage.getItem("storeCode")
      ? localStorage.getItem("storeCode")
      : null;
    if (i === "Logout") {
      axios.delete("http://13.53.184.137:5000/auth/logout", config)
      .then(response => {  
        localStorage.clear();
      })
      .catch(error => {
        console.error(error);
      });
      navigate("/");
    } else if (
      localStorage.getItem("designation") === "manager" &&
      storeCode === null &&
      (i === "Categories" || i === "Stocks")
    ) {
      alert("Select a store to proceed with Categories and Stocks");
    } else {
      setPage(i);
      if (drawerOpen) {
        setDrawerOpen(false);
      }
    }
  };

  const handleStoreClick = (code) => {
    localStorage.setItem("storeCode", code);
    setPage("Categories");
    if (drawerOpen) {
      setDrawerOpen(false);
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    localStorage.getItem('isLoggedIn') &&
    <ThemeProvider theme={customTheme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            StockApp {">"}{" "}
            {localStorage.getItem("storeCode")
              ? localStorage.getItem("storeCode")
              : ""}
          </Typography>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <Button
              onClick={toggleDrawer}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </Button>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
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
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          {navItems.map((item) => (
            <ListItem button key={item} onClick={(event) => handleOption(item)}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box>
        {page === "Stores" &&
          localStorage.getItem("designation") === "manager" && (
            <Box>
              {stores.map((store) => (
                <div onClick={() => handleStoreClick(store.storeCode)}>
                  <Card
                    style={{ cursor: "pointer", margin: "8px", width: "100%" }}
                  >
                    <CardContent>
                      <Typography variant="body1">{store.storeName}</Typography>
                      <Typography variant="body1">{store.address}</Typography>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </Box>
          )}
        {page === "Stores" &&
          localStorage.getItem("designation") === "employee" && (
            <Box>
              {stores
                .filter(
                  (store) =>
                    store.storeCode === localStorage.getItem("storeCode")
                )
                .map((store) => (
                  <div onClick={() => handleStoreClick(store.storeCode)}>
                    <Card
                      style={{
                        cursor: "pointer",
                        margin: "8px",
                        width: "100%",
                      }}
                    >
                      <CardContent>
                        <Typography variant="body1">
                          {store.storeName}
                        </Typography>
                        <Typography variant="body1">{store.address}</Typography>
                      </CardContent>
                    </Card>
                  </div>
                ))}
            </Box>
          )}

        <Box sx={{ marginLeft: "64px" }}>
          {page === "Categories" && <Categories />}
        </Box>
        <Box sx={{ marginLeft: "64px", marginTop: "64px" }}>
          {page === "Stocks" && <Stocks />}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
