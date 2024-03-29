import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const Categories = () => {
  const [categories, setCategories] = useState([]);
  let storecode = localStorage.getItem("storeCode");
  const callCategoriesApi = () => {
    fetch(`http://13.53.184.137:5000/category/${storecode}`)
      .then(async (response) => {
        const res = await response.json();
        setCategories(res.categoryStoreWise.categories);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    callCategoriesApi();
  }, []);

  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState("");

  const handleAddCategory = async (event) => {
    const trimmedCategory = newCategory.trim();
    if (trimmedCategory === "") {
      setError("Category cannot be empty");
    } else if (
      categories.some((category) => category.category === trimmedCategory)
    ) {
      setError("Category already exists");
    } else {
      event.preventDefault();
      setNewCategory(newCategory);
      try {
        const res = await axios.post("http://13.53.184.137:5000/category", {
          newCategory,
          storecode,
        });
        alert("category added successfully");
        callCategoriesApi();
      } catch (err) {
        console.log(err.response.data.message);
      }
      setNewCategory("");
      setError("");
    }
  };
  const customTheme = createTheme({
    palette: {
      primary: {
        main: "#293b94",
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <br></br>
      <Typography variant="h6" gutterBottom>
        Add New Category
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          label="Category"
          variant="outlined"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <Button variant="contained" color="primary" onClick={handleAddCategory}>
          Add
        </Button>
      </div>
      <br></br>
      <Typography variant="h6" gutterBottom>
        Categories List
      </Typography>
      <div>
        {categories &&
          categories.map((item, index) => (
            <Card key={index} style={{ margin: "8px", width: "200px" }}>
              <CardContent>
                <Typography component="div">{item}</Typography>
              </CardContent>
            </Card>
          ))}
      </div>
    </ThemeProvider>
  );
};

export default Categories;
