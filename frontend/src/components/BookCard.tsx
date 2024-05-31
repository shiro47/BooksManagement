import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Book } from "../types/API";

interface BookCardProps {
    book: Book
  }

const BookCard: React.FC<BookCardProps> = ({ book }) => {
    
    return (
        <Card className="book-card">
            <Card.Body>
                <Row>
                    <Col xs={12} sm={5} md={4} lg={3} xl={2}>
                        <Card.Img
                            className="img-fluid"
                            src="/book.png"
                            alt="Book cover"
                        />
                    </Col>
                    <Col xs={12} sm={7} md={8}>
                        <div className="book-details">
                            <Card.Title className="book-title">{book.title}</Card.Title>
                            <Card.Text>
                                <strong>Author:</strong> {book.author}
                            </Card.Text>
                            <Card.Text>
                                <strong>Release Date:</strong> {book.year}
                            </Card.Text>
                            <Card.Text>
                                <strong>Genre:</strong> {book.genre}
                            </Card.Text>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer className="book-footer">
                <Link to={`/books/${book.id}`} state={{ book }}>
                    <Button>Check details</Button>
                </Link>
            </Card.Footer>
        </Card>
    )
}

export default BookCard;