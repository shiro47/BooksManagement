package com.example.BooksManagement.service;

import com.example.BooksManagement.models.Book;
import com.example.BooksManagement.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

	private final BookRepository bookRepository;

	@Autowired
	public BookServiceImpl(BookRepository bookRepository) {
		this.bookRepository = bookRepository;
	}

	@Override
	public List<Book> getAllBooks(String sortBy, String sortOrder) {
		Sort sort;
		if (sortBy.equals("year")) {
			sort = Sort.by(Sort.Direction.fromString(sortOrder), "year", "title");
		}
		else {
			sort = Sort.by(Sort.Direction.fromString(sortOrder), sortBy);
		}
		return bookRepository.findAll(sort);
	}

	@Override
	public Book getBookById(Long id) {
		return bookRepository.findById(id).orElse(null);
	}

	@Override
	public Book addBook(Book book) {
		return bookRepository.save(book);
	}

	@Override
	public Book updateBook(Long id, Book book) {
		Book existingBook = bookRepository.findById(id).orElse(null);
		if (existingBook != null) {
			existingBook.setTitle(book.getTitle());
			existingBook.setAuthor(book.getAuthor());
			existingBook.setYear(book.getYear());
			existingBook.setGenre(book.getGenre());

			return bookRepository.save(existingBook);
		}
		return null;
	}

	@Override
	public void deleteBook(Long id) {
		bookRepository.deleteById(id);
	}

	@Override
	public List<Book> searchBooks(String query) {
		return bookRepository.findByTitleContainingOrAuthorContainingOrGenreContaining(query, query, query);
	}

}