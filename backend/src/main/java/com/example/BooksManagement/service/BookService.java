package com.example.BooksManagement.service;

import com.example.BooksManagement.models.Book;

import java.util.List;

public interface BookService {

	List<Book> getAllBooks(String sortBy, String sortOrder);

	Book getBookById(Long id);

	Book addBook(Book book);

	Book updateBook(Long id, Book book);

	void deleteBook(Long id);

	List<Book> searchBooks(String query);

}
