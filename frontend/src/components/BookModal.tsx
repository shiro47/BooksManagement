import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { addBook } from '../api/bookService';
import { Book } from '../types/API';

interface BookModalProps {
  show: boolean;
  handleClose: () => void;
  onBookAdded: (book: Book) => void;
}

const BookModal: React.FC<BookModalProps> = ({ show, handleClose, onBookAdded }) => {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [year, setYear] = useState<number | undefined>(undefined);
  const [genre, setGenre] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newBook: Book = { title, author, year: year!, genre, description };

    try {
      const addedBook = await addBook(newBook);
      onBookAdded(addedBook);
      setTitle('');
      setAuthor('');
      setYear(undefined);
      setGenre('');
      setDescription('');
      setError(null);
      handleClose();
    } catch (error) {
      setError('Error adding book');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBookTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBookAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBookReleaseDate">
            <Form.Label>Release Year</Form.Label>
            <Form.Control
              type="number"
              placeholder="YYYY"
              value={year !== undefined ? year : ''}
              onChange={(e) => setYear(parseInt(e.target.value, 10))}
              min={1000}
              max={9999}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid year (e.g., 2023).
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBookGenre">
            <Form.Label>Genre</Form.Label>
            <Form.Control
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBookDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className='mt-3'>
            Add Book
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BookModal;
