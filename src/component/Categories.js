import React, { useState } from 'react';
import { Typography, TextField, Button, Alert, Card, CardContent, FormControlLabel } from '@mui/material';
import { RadioGroup, Radio } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const categories = [
    { id: 1, category: 'Drink' },
    { id: 2, category: 'Food' },
    { id: 3, category: 'Crisps' },
  ];

  const navigate = useNavigate();
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleAddCategory = () => {
    const trimmedCategory = newCategory.trim();
    if (trimmedCategory === '') {
      setError('Category cannot be empty');
    } else if (categories.some((category) => category.category === trimmedCategory)) {
      setError('Category already exists');
    } else {
      setNewCategory('');
      setError('');
    }
  };

  const handleCategoryChange = (event) => {
    const categoryId = parseInt(event.target.value, 10);
    const selected = categories.find((category) => category.id === categoryId);
    setSelectedCategory(selected);
    navigate('/stocks');
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Categories
      </Typography>
      <Typography variant="h6" gutterBottom>
        Add New Category
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          label="Category"
          variant="outlined"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={handleAddCategory}>
          Add
        </Button>
      </div>
      <Typography variant="h6" gutterBottom>
        Categories List
      </Typography>

      <RadioGroup aria-label="store" name="store" value={typeof(selectedCategory) !== 'string' && selectedCategory.id.toString()} onChange={handleCategoryChange}>
        {categories.map((category) => (
          <Card key={category.id} style={{ margin: '8px', width: '100%' }}>
            <CardContent>
              <FormControlLabel value={category.id.toString()} control={<Radio />} label={category.category} />
            </CardContent>
          </Card>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Categories;
