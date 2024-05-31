import React, { useState, useEffect } from 'react';
import { searchBooks, getBooks } from '../api/bookService';
import { Book } from '../types/API';
import { Button, Container, Pagination } from 'react-bootstrap';
import BookModal from '../components/BookModal';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import SortBy from '../components/SortBy';

const Home: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<string>('title');
    const [sortOrder, setSortOrder] = useState<string>('asc');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [booksPerPage] = useState<number>(10);

    const sortOptions = {
        'Title': 'title',
        'Author': 'author',
        'Year': 'year',
        'Genre': 'genre',
    };

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setError(null);
                const booksData = await getBooks(sortBy, sortOrder);
                setBooks(booksData);
            } catch (error) {
                setError('Error fetching books');
            }
        };
        fetchBooks();
    }, [sortBy, sortOrder]);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleBookAdded = (book: Book) => {
        setBooks([...books, book]);
    };

    const handleSearch = async (query: string) => {
        try {
            setError(null);
            const booksData = await searchBooks(query);
            setBooks(booksData);
        } catch (error) {
            setError('Error searching books');
        }
    };

    const handleSort = async (option: string) => {
        let newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortBy(option);
        setSortOrder(newSortOrder);
        try {
            setError(null);
            const booksData = await getBooks(option, newSortOrder);
            setBooks(booksData);
        } catch (error) {
            setError('Error fetching books');
        }
    };

    //Pagination
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <Container>
            <h1 className='text-center'>Home Page</h1>
            <p className='text-center'>Welcome to the Books Management application.</p>
            <Button variant="primary" onClick={handleShowModal} className='mb-3'>
                Add New Book
            </Button>
            <SearchBar onSearch={handleSearch} />
            <SortBy options={sortOptions} onSelect={handleSort} />
            {error ? (
                <p className="text-center text-danger">{error}</p>
            ) : (
                <>
                    {currentBooks.map((book, index) => (
                        <BookCard key={index} book={book} />
                    ))}
                    <div className='d-flex justify-content-center mt-3'>
                        <Pagination>
                            {Array.from({ length: Math.ceil(books.length / booksPerPage) }).map((_, index) => (
                                <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </div>
                </>
            )}
            <BookModal
                show={showModal}
                handleClose={handleCloseModal}
                onBookAdded={handleBookAdded}
            />
        </Container>
    );
};

export default Home;
