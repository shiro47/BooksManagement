package com.example.BooksManagement.repository;

import com.example.BooksManagement.models.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

	List<Book> findByTitleContaining(String title);

	List<Book> findByAuthorContaining(String author);

	List<Book> findByYear(int year);

	List<Book> findByGenreContaining(String genre);

	List<Book> findByOrderByTitleAsc();

	List<Book> findByOrderByYearDesc();

	List<Book> findByTitleContainingOrAuthorContainingOrGenreContaining(String title, String author, String genre);

}
