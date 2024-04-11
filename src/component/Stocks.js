import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";


const Stocks = () => {
  const [categories, setCategories] = useState([]);
  const [newStock, setNewStock] = useState({
    category: "",
    name: "",
    count: 0,
  });
  const storecode = localStorage.getItem("storeCode");
  const customTheme = createTheme({
    palette: {
      primary: {
        main: "#293b94",
      },
    },
  });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };
 

const callStockApi = async () => {
  try {
    const response = await axios.get(
      `http://13.53.184.137:5000/stock/${storecode}`, config
    );
    const data = response.data;
    setCategories(Object.entries(data.stockStoreWise.stock.categories));

    const categoryNames = Object.keys(data.stockStoreWise.stock.categories);
    if (categoryNames.length > 0) {
      setNewStock({
        ...newStock,
        category: categoryNames[0],
      });
    }
  } catch (error) {
    console.error(error);
  }
};


  useEffect(() => {
    if (!localStorage.getItem('isLoggedIn')) {
      navigate("/");
    }
    else{
      callStockApi();
    }
  }, []);

  const handleAddStock = async () => {
    try {
      const res = await axios.post(
        "http://13.53.184.137:5000/stock/addstock/newstock",
        {
          category: newStock.category,
          storecode,
          categoryItem: {
            name: newStock.name,
            count: Number(newStock.count),
          },
        }, config
      );
      setNewStock({
        category: "",
        name: "",
        count: 0,
      });
      newStock.category = "";
      newStock.name = "";
      newStock.count = 0;
      callStockApi();
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const handleInputChange = (e) => {
    setNewStock({
      ...newStock,
      [e.target.name]: e.target.value,
    });
  };

  const StockItem = ({ category, name, count }) => {
    const [stockcount, setQuantity] = useState(count);

    const handleAdd = () => {
      setQuantity(stockcount + 1);
    };

    const handleMinus = () => {
      if (stockcount > 0) {
        setQuantity(stockcount - 1);
      }
    };

    const handleSave = async () => {
      try {
        await axios.post(
          "http://13.53.184.137:5000/stock/addstock/existingstock",
          {
            category,
            storecode,
            name,
            newCount: stockcount,
          },
          config
        );
      } catch (err) {
        console.log(err.response.data.message);
      }
    };

    const handleDelete = async () => {
      try {
        await axios.post('http://13.53.184.137:5000/stock/removestock',  {
          category,
          storecode,
          name
        }, config)
        callStockApi();
      } catch (err) {
        console.log(err.response.data.message);
      }
    };

    return (
      <ThemeProvider theme={customTheme}>
        <Card variant="outlined" sx={{ marginBottom: 1 }}>
          <CardContent>
            <Typography variant="body1">{name}</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body1">Quantity: {stockcount}</Typography>
              <IconButton onClick={handleAdd}>
                <AddIcon />
              </IconButton>
              <IconButton onClick={handleMinus}>
                <RemoveIcon />
              </IconButton>
            </Box>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </CardContent>
        </Card>
      </ThemeProvider>
    );
  };

  return (
    localStorage.getItem('isLoggedIn') &&
    <ThemeProvider theme={customTheme}>
      <Box>
        <Box sx={{ marginBottom: 2 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5">Add New Stock</Typography>
              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    name="category"
                    label="Category"
                    variant="outlined"
                    size="small"
                    fullWidth
                    select
                    value={newStock.category}
                    onChange={handleInputChange}
                  >
                    {categories.map(([category, stocks]) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    name="name"
                    label="Stock Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={newStock.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    name="count"
                    label="Quantity"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={newStock.count}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button variant="contained" onClick={handleAddStock}>
                    Add Stock
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
        {categories.map(([category, stocks]) => (
          <Box key={category} sx={{ marginBottom: 2 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5">{category}</Typography>
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                  {stocks.map((stock, index) => (
                    <Grid key={index} item xs={12} sm={2} md={2}>
                      <StockItem
                        category={category}
                        name={stock.name}
                        count={stock.count}
                      />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </ThemeProvider>
  );
};

export default Stocks;
