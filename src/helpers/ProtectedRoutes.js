import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuthentication';

const ProtectedRoutes = () => {
    const { isAuthen } = useAuth();
    return isAuthen ? <Outlet/> : <Navigate to="/sign_in"/>
}

export default ProtectedRoutes;