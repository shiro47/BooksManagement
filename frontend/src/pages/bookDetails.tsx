import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Book } from "../types/API";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteBook } from "../api/bookService";



const BookDetailsPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate()

    const book: Book | undefined = location.state?.book;

    const handleDelete = async () => {
        if (!book) return;

        const confirmDelete = window.confirm("Are you sure you want to delete this book?");
        if (!confirmDelete) return;

        try {
            if (book.id){
            await deleteBook(book.id);
            alert("Book deleted successfully.");
            navigate("/");
        }
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    if (!book) {
        return <div>No book provided.</div>;
    }
    return (
        <Container>
            <Row>
                <Col>
                    <Card className="my-3">
                        <Card.Body>
                            <Card.Title>{book.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                by {book.author}
                            </Card.Subtitle>
                            <Card.Text>
                                <strong>Release Date:</strong> {book.year}
                            </Card.Text>
                            <Card.Text>
                                <strong>Genre:</strong> {book.genre}
                            </Card.Text>
                            <Card.Text>
                                <strong>Description:</strong> {book.description}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="danger" onClick={handleDelete}>
                                Delete
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default BookDetailsPage;