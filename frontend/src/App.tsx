import React from 'react';
import Footer from './components/footer';
import './App.css';
import Header from './components/header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import BookDetailsPage from './pages/bookDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/:id" element={<BookDetailsPage/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
