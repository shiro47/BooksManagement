import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search Books"
          className="mr-sm-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="outline-success" type="submit">Search</Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;
