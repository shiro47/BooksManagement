package com.example.BooksManagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.context.annotation.Bean;
import com.example.BooksManagement.repository.BookRepository;
import org.springframework.boot.CommandLineRunner;
import com.example.BooksManagement.models.Book;

@SpringBootApplication
@RestController
public class BooksManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(BooksManagementApplication.class, args);
	}

	@GetMapping("/hello")
	public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
		return String.format("Hellossss %s!", name);
	}

	@Bean
	public CommandLineRunner demo(BookRepository repository) {
		return (args) -> {
			repository.deleteAll();
			repository.save(new Book("Harry Potter and the Chamber of Secrets", "J.K. Rowling", 1998, "Fantasy",
					"The second book in the Harry Potter series."));
			repository.save(new Book("To Kill a Mockingbird", "Harper Lee", 1960, "Fiction",
					"A classic novel set in the American South during the 1930s."));
			repository.save(new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925, "Classic",
					"A story of love, greed, and the American Dream."));
			repository.save(new Book("1984", "George Orwell", 1949, "Dystopian",
					"A dystopian novel set in a totalitarian society ruled by the Party."));
			repository.save(new Book("The Catcher in the Rye", "J.D. Salinger", 1951, "Fiction",
					"A coming-of-age novel about a teenager struggling with adolescence."));
			repository.save(new Book("Pride and Prejudice", "Jane Austen", 1813, "Romance",
					"A classic romance novel set in early 19th-century England."));
			repository.save(new Book("The Hobbit", "J.R.R. Tolkien", 1937, "Fantasy",
					"A fantasy novel about the adventures of Bilbo Baggins."));
			repository.save(new Book("The Da Vinci Code", "Dan Brown", 2003, "Mystery",
					"A mystery thriller novel about a symbologist investigating a murder in the Louvre."));
			repository.save(new Book("The Hunger Games", "Suzanne Collins", 2008, "Dystopian",
					"The first book in a dystopian trilogy about a young girl who volunteers to compete in a televised death match."));
			repository.save(new Book("The Lord of the Rings", "J.R.R. Tolkien", 1954, "Fantasy",
					"A high fantasy epic about the quest to destroy the One Ring."));
			repository.save(new Book("The Alchemist", "Paulo Coelho", 1988, "Fiction",
					"A philosophical novel about a young Andalusian shepherd who sets out to find his Personal Legend."));

			// Fetch all books
			System.out.println("Books found with findAll():");
			System.out.println("---------------------------------");
			repository.findAll().forEach(book -> {
				System.out.println(book.toString());
			});
			System.out.println("");

			// Fetch a book by ID
			Book book = repository.findById(1L).orElse(null);
			System.out.println("Book found with findById(1L):");
			System.out.println("--------------------------------");
			System.out.println(book != null ? book.toString() : "Book not found");
			System.out.println("");

			// Fetch books by author
			System.out.println("Books found with findByAuthor('J.K. Rowling'):");
			System.out.println("----------------------------------------------");
			repository.findByAuthorContaining("J.K. Rowling").forEach(rowlingBook -> {
				System.out.println(rowlingBook.toString());
			});
			System.out.println("");

			System.out.println("Books found with findByTitle('Harry Potter'):");
			System.out.println("----------------------------------------------");
			System.out
				.println(repository.findByTitleContainingOrAuthorContainingOrGenreContaining("J.K ", "J.K. ", "J.K "));
			repository.findByTitleContaining("Harry Potter").forEach(rowlingBook -> {
				System.out.println(rowlingBook.toString());
			});

			System.out.println("");
		};
	}

}
