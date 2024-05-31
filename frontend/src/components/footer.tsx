import React from 'react';
import { Github } from 'react-bootstrap-icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-3">
      <div className="container">
        <p className="mb-0">© 2024 Books Management</p>
        <p className="mb-0">
          <a href="https://github.com/shiro47" target="_blank" rel="noreferrer" className="text-white text-decoration-none">Github <Github /></a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
