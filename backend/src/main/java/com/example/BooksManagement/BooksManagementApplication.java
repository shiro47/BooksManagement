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
			repository.save(new Book("The Midnight Garden", "Elena Michaels", 2010, "Mystery",
					"A thrilling mystery novel set in a haunted garden."));
			repository.save(new Book("Echoes of Eternity", "Lucas Parker", 2005, "Science Fiction",
					"An epic science fiction saga spanning across multiple galaxies."));
			repository.save(new Book("Whispers in the Dark", "Amelia Johnson", 2018, "Horror",
					"A spine-chilling horror story about a haunted house."));
			repository.save(new Book("Starlight Serenade", "Isabel Rivera", 2022, "Romance",
					"A heartwarming romance novel set under the starlit sky."));
			repository.save(new Book("Beyond the Horizon", "Nathan Bennett", 1999, "Adventure",
					"An exhilarating adventure tale of discovery and danger."));
			repository.save(new Book("Silent Symphony", "Sophia Collins", 2015, "Drama",
					"A poignant drama exploring the complexities of human relationships."));
			repository.save(new Book("Eternal Echoes", "Ethan Adams", 2008, "Fantasy",
					"A mesmerizing fantasy adventure filled with magic and mystery."));
			repository.save(new Book("Siren's Call", "Lily Evans", 2012, "Thriller",
					"A gripping thriller about a deadly game of cat and mouse."));
			repository.save(new Book("Lost in Time", "Oliver Thompson", 2020, "Historical Fiction",
					"A captivating historical fiction novel set in ancient Rome."));
			repository.save(new Book("Whispers of Destiny", "Hannah Carter", 2003, "Romantic Fantasy",
					"A spellbinding romantic fantasy tale of love and destiny."));
			repository.save(new Book("Shadows of the Past", "Daniel Walker", 2011, "Suspense",
					"A tense and suspenseful mystery unraveling dark secrets from the past."));
			repository.save(new Book("Celestial Dreams", "Ava Mitchell", 2016, "Science Fantasy",
					"An imaginative blend of science fiction and fantasy set in a distant galaxy."));
			repository.save(new Book("Secrets of the Forest", "Elijah Moore", 2007, "Young Adult",
					"An enchanting young adult novel about friendship and adventure."));
			repository.save(new Book("City of Whispers", "Julia Bennett", 2019, "Urban Fantasy",
					"A mesmerizing urban fantasy adventure filled with magic and intrigue."));
			repository.save(new Book("Echoes of Destiny", "Zoe Wilson", 2001, "Time Travel",
					"A thrilling time travel adventure spanning across different historical eras."));
			repository.save(new Book("Infinite Echoes", "Lucy Parker", 2014, "Parallel Universe",
					"A mind-bending tale of parallel universes and alternate realities."));
			repository.save(new Book("Tears of the Moon", "Liam Thompson", 2009, "Historical Romance",
					"A sweeping historical romance set against the backdrop of medieval England."));
			repository.save(new Book("Whispers of War", "Grace Evans", 2017, "War Drama",
					"A gripping war drama depicting the struggles and sacrifices of soldiers."));
			repository.save(new Book("Dreams of Tomorrow", "Eva Martinez", 2006, "Futuristic",
					"A visionary tale of a future world filled with advanced technology and new challenges."));
			repository.save(new Book("Echoes of Silence", "Noah Adams", 2013, "Psychological Thriller",
					"A psychological thriller exploring the depths of the human mind and the nature of reality."));
			repository.save(new Book("Whispers in the Wind", "Sophie Wilson", 2002, "Historical Mystery",
					"A captivating historical mystery unraveling secrets from the past."));
			repository.save(new Book("Echoes of Hope", "Benjamin Carter", 2018, "Dystopian",
					"A dystopian tale of survival and resilience in a world on the brink of collapse."));
			repository.save(new Book("Midnight Whispers", "Emma Taylor", 2011, "Supernatural",
					"A supernatural thriller filled with twists and turns that will keep you guessing until the very end."));
			repository.save(new Book("Whispers of Fate", "Joshua Mitchell", 2004, "Fantasy Adventure",
					"An epic fantasy adventure filled with magic, monsters, and mythical creatures."));

			
			System.out.println("Books found with findAll():");
			System.out.println("---------------------------------");
			repository.findAll().forEach(book -> {
				System.out.println(book.toString());
			});
			System.out.println("");

			
			Book book = repository.findById(1L).orElse(null);
			System.out.println("Book found with findById(1L):");
			System.out.println("--------------------------------");
			System.out.println(book != null ? book.toString() : "Book not found");
			System.out.println("");


			System.out.println("Books found with findByAuthor('J.K. Rowling'):");
			System.out.println("----------------------------------------------");
			repository.findByAuthorContaining("J.K. Rowling").forEach(rowlingBook -> {
				System.out.println(rowlingBook.toString());
			});
			System.out.println("");

			System.out.println("Books found with findByTitle('Harry Potter'):");
			System.out.println("----------------------------------------------");
			System.out
					.println(repository.findByTitleContainingOrAuthorContainingOrGenreContaining("J.K ", "J.K. ",
							"J.K "));
			repository.findByTitleContaining("Harry Potter").forEach(rowlingBook -> {
				System.out.println(rowlingBook.toString());
			});

			System.out.println("");
		};
	}

}
