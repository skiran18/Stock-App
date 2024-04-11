import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";


const Categories = () => {
  const [categories, setCategories] = useState([]);
  let storecode = localStorage.getItem("storeCode");
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  const callCategoriesApi = () => {
    const storecode = localStorage.getItem('storeCode');
    axios.get(`http://13.53.184.137:5000/category/${storecode}`, config)
      .then((response) => {
        const headers = response.headers;
        if (headers.authorization) {
          console.log('Authorization header found:', headers.authorization);
        } else {
          console.log('Authorization header not found');
        }
        setCategories(response.data.categoryStoreWise.categories);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('isLoggedIn')) {
      navigate("/");
    }
    else{
      callCategoriesApi();
    }
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
        }, config);
        alert("Category added successfully");
        callCategoriesApi();
      } catch (err) {
        console.log(err.response.data.message);
      }
      setNewCategory("");
      setError("");
    }
  };

  const handleDeleteCategory = async (categoryToDelete) => {
    try {
      await axios.post("http://13.53.184.137:5000/category/delete", { category: categoryToDelete, storecode }, config);
      alert("Category deleted successfully");
      callCategoriesApi();
    } catch (err) {
      console.log(err.response.data.message);
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
    localStorage.getItem('isLoggedIn') &&
    <ThemeProvider theme={customTheme}>
      <br />
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddCategory}
        >
          Add
        </Button>
      </div>
      <br />
      <Typography variant="h6" gutterBottom>
        Categories List
      </Typography>
      <div>
        {categories &&
          categories.map((item, index) => (
            <div key={index} style={{ display: "inline-block", margin: "5px" }}>
              <Button variant="outlined" onClick={() => handleDeleteCategory(item)}>
                {item}
                <DeleteIcon />
              </Button>
            </div>
          ))}
      </div>
    </ThemeProvider>
  );
};

export default Categories;
