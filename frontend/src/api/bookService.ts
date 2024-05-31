import axios from 'axios';
import { Book } from '../types/API';

const API_URL = process.env.REACT_APP_API_URL;


export const getBooks = async (sortBy: string = 'id', sortOrder: string = 'asc'): Promise<Book[]> => {
    try {
        const response = await axios.get<Book[]>(`${API_URL}/books`, {
            params: { sortBy, sortOrder }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching books');
    }
};

export const addBook = async (book: Book): Promise<Book> => {
    try {
        const response = await axios.post<Book>(`${API_URL}/books`, book);
        return response.data;
    } catch (error) {
        throw new Error('Error adding book');
    }
};

export const searchBooks = async (query: string): Promise<Book[]> => {
    try {
        const response = await axios.get<Book[]>(`${API_URL}/books/search`, {
            params: { query }
        });
        console.log(response)
        return response.data;
    } catch (error) {
        throw new Error('Error searching books');
    }
};


export const getBookById = async (id: string): Promise<Book> => {
    try {
        const response = await axios.get<Book>(`${API_URL}/books/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching book by ID');
    }
};

export const deleteBook = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/books/${id}`);
    } catch (error) {
        throw new Error('Error deleting book');
    }
};