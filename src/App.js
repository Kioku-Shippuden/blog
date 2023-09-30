import { Routes, Route } from 'react-router-dom';
import { AlertProvider } from './hook/useAlert';
import UserPage from './pages/UserPage/UserPage';
import { AuthProvider } from './hook/useAuthentication';
import HomePage from '../src/pages/HomePage/HomePage';
import ReadPage from '../src/pages/ReadPage/ReadPage';
import ProtectedRoutes from './helpers/ProtectedRoutes';
import WritePage from '../src/pages/WritePage/WritePage';
import SignInPage from '../src/pages/SignInPage/SignInPage';
import SignUpPage from '../src/pages/SignUpPage/SignUpPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';
import './App.css';
import './index.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AlertProvider >
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path='/' element={<HomePage />}></Route>
              <Route path='/user-page/:user_id' element={<UserPage />}></Route>
              <Route path='/read-story/:post_id' element={<ReadPage />}></Route>
              <Route path='/new-story' element={<WritePage />}></Route>
            </Route>
            <Route path='/sign_in' element={<SignInPage />}></Route>
            <Route path='/sign_up' element={<SignUpPage />}></Route>
            <Route path='/reset_password' element={<ResetPasswordPage />}></Route>
          </Routes>
        </AlertProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
