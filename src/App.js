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
import { useNavigate } from "react-router-dom";
import "./App.css";
import Categories from "./component/Categories";
import Stocks from "./component/Stocks";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const sideNavItems = ["Stores", "Categories", "Stocks", "Logout"];
const employeeSideNavItems = ["Categories", "Stocks", "Logout"];
let navItems = [];

const App = () => {
  let [stores, setStores] = useState([]);

  const callStoreApi = (async) => {
    fetch("http://localhost:5000/home")
      .then(async (response) => {
        const res = await response.json();
        setPage("Stores");
        setStores(res.storeDetails);
      })
      .catch((error) => console.error(error));
    checkPrivileges();
  };

  useEffect(() => {
    callStoreApi();
  }, []);

  const checkPrivileges = () => {
    navItems =
      localStorage.getItem("designation") == "manager"
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

  const navigate = useNavigate();
  const [page, setPage] = useState("");

  const handleOption = (i) => {
    const storeCode = localStorage.getItem("storeCode")
      ? localStorage.getItem("storeCode")
      : null;
    if (i === "Logout") {
      localStorage.clear();
      navigate("/");
    } else if (
      localStorage.getItem("designation") === "manager" &&
      storeCode === null &&
      (i === "Categories" || i === "Stocks")
    ) {
      alert("Select a store to proceed with Catergories and Stocks");
    } else {
      setPage(i);
    }
  };

  const handleStoreClick = (code) => {
    localStorage.setItem("storeCode", code);
    setPage("Categories");
  };

  return (
    <ThemeProvider theme={customTheme}>
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
      {page === "Stores" && (
        <Box>
          {stores.map((store) => (
            <div onClick={() => handleStoreClick(store.storeCode)}>
              <Card style={{ cursor: "pointer", margin: "8px", width: "100%" }}>
                <CardContent>
                  <Typography variant="body1">{store.storeName}</Typography>
                  <Typography variant="body1">{store.address}</Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </Box>
      )}

      <Box>{page === "Categories" && <Categories />}</Box>
      <Box>{page === "Stocks" && <Stocks />}</Box>
      </ThemeProvider>
  );
};

export default App;
