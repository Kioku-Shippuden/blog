import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../src/pages/HomePage/HomePage';
import ReadPage from '../src/pages/ReadPage/ReadPage';
import WritePage from '../src/pages/WritePage/WritePage';
import SignInPage from '../src/pages/SignInPage/SignInPage';
import SignUpPage from '../src/pages/SignUpPage/SignUpPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/home/:user_id' element={<HomePage />}></Route>
        <Route path='/:user_id/:content_id' element={<ReadPage />}></Route>
        <Route path='/newpost/:user_id' element={<WritePage />}></Route>
        <Route path='/sign_in' element={<SignInPage />}></Route>
        <Route path='/sign_up' element={<SignUpPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
