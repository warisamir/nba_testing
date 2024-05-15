import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, QuizPage, ResultPage } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;