import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { ArrowDown, ArrowUp } from 'react-bootstrap-icons';

interface SortByProps {
  options: { [key: string]: string };
  onSelect: (option: string, orderby: string) => void;
}

const SortBy: React.FC<SortByProps> = ({ options, onSelect }) => {
  const [currentSort, setCurrentSort] = useState<{ option: string; order: string } | null>(null);

  const handleSelect = (option: string, order: string) => {
    setCurrentSort({ option, order });
    onSelect(option, order);
  };

  return (
    <Dropdown className='mb-3'>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {currentSort ? `${currentSort.option} ${currentSort.order === 'asc' ? '▲' : '▼'}` : 'Sort By'}
      </Dropdown.Toggle>
      <Dropdown.Menu>
      {Object.keys(options).map((optionKey, index) => (
          <React.Fragment key={index}>
            <Dropdown.Item onClick={() => handleSelect(optionKey, 'asc')}>
              {optionKey} <ArrowUp />
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSelect(optionKey, 'desc')}>
              {optionKey} <ArrowDown />
            </Dropdown.Item>
          </React.Fragment>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortBy;
