import React, { useState, useEffect } from 'react';
import {
    Container, Box, Card, CardContent, Typography, Button,
    TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid,
    IconButton, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [collections, setCollections] = useState([]);

    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [bookData, setBookData] = useState({ book_name: '', book_publisher: '', book_launch_date: '', book_cat_id: '', book_collection_id: '' });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchBooks();
        fetchCategories();
        fetchCollections();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:4000/books');
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:4000/categories');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchCollections = async () => {
        try {
            const response = await fetch('http://localhost:4000/collections');
            const data = await response.json();
            setCollections(data);
        } catch (error) {
            console.error('Error fetching collections:', error);
        }
    };

    const handleOpen = (book = null) => {
        setEditMode(!!book);
        setBookData(book || { book_name: '', book_publisher: '', book_launch_date: '', book_cat_id: '', book_collection_id: '' });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setBookData({ ...bookData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (editMode) {
            // Update book API call
            try {
                await fetch(`http://localhost:4000/books/${bookData.book_id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bookData),
                });
                fetchBooks();
            } catch (error) {
                console.error('Error updating book:', error);
            }
        } else {
            // Add new book API call
            try {
                await fetch('http://localhost:4000/books', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bookData),
                });
                fetchBooks();
            } catch (error) {
                console.error('Error adding book:', error);
            }
        }
        setOpen(false);
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:4000/books/${id}`, { method: 'DELETE' });
            fetchBooks();
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <Container>
            <Box display="flex" justifyContent="space-between" alignItems="center" my={3}>
                <TextField
                    label="Search Books"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => handleOpen()}>
                    Add Book
                </Button>
            </Box>

            <Grid container spacing={3}>
                {books
                    .filter(book => book.book_name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((book) => (
                        <Grid item xs={12} sm={6} md={4} key={book.book_id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{book.book_name}</Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        Publisher: {book.book_publisher}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Launch Date: {new Date(book.book_launch_date).toLocaleDateString()}
                                    </Typography>
                                    <Box display="flex" justifyContent="space-between" mt={2}>
                                        <Button variant="contained" size="small" color="primary" startIcon={<EditIcon />}
                                            onClick={() => handleOpen(book)}>
                                            Edit
                                        </Button>
                                        <Button variant="contained" size="small" color="secondary" startIcon={<DeleteIcon />}
                                            onClick={() => handleDelete(book.book_id)}>
                                            Delete
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
            </Grid>

            {/* Add/Edit Book Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {editMode ? 'Edit Book' : 'Add Book'}
                    <IconButton edge="end" color="inherit" onClick={handleClose} style={{ position: 'absolute', right: 10, top: 10 }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <TextField label="Book Name" fullWidth margin="dense" name="book_name" value={bookData.book_name} onChange={handleChange} />
                    <TextField label="Publisher" fullWidth margin="dense" name="book_publisher" value={bookData.book_publisher} onChange={handleChange} />
                    <TextField label="Launch Date" type="date" fullWidth margin="dense" name="book_launch_date"
                        value={bookData.book_launch_date?.split('T')[0] || ''} onChange={handleChange} InputLabelProps={{ shrink: true }} />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Category</InputLabel>
                        <Select name="book_cat_id" value={bookData.book_cat_id} onChange={handleChange}>
                            {categories.map(category => (
                                <MenuItem key={category.cat_id} value={category.cat_id}>{category.cat_name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Collection</InputLabel>
                        <Select name="book_collection_id" value={bookData.book_collection_id} onChange={handleChange}>
                            {collections.map(collection => (
                                <MenuItem key={collection.collection_id} value={collection.collection_id}>{collection.collection_name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={handleSave} color="primary">{editMode ? 'Update' : 'Add'}</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Books;
