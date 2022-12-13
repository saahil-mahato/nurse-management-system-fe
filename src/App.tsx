import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import SigninPage from './pages/SigninPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SigninPage />} />
      <Route path="/home/*" element={<HomePage />} />
    </Routes>
  );
}

export default App;
