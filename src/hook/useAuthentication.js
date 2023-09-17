import { createContext, useState, useEffect, useContext } from "react";
import { callGetApiWithoutToken, callPostApiWithoutToken } from "../helpers/request";
import { useNavigate } from "react-router-dom";

const apiDomain = process.env.REACT_APP_API_DOMAIN

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const [isAuthen, setIsAuthen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUserStatus();
    }, []);

    const loginUser = async (userInfo) => {
        setLoading(true);

        try {
            const apiUrl = `${apiDomain}/v1/api/auth/login`;
			await callPostApiWithoutToken(apiUrl, {
				"username": userInfo.userName,
				"password": userInfo.userPass,
			});
            setIsAuthen(true);
            navigate('/')
        } catch (error) {
            console.error(error)
        }

        setLoading(false);
    }

    const registerUser = async (userInfo) => {
        setLoading(true);

        try {
            const apiUrl = `${apiDomain}/v1/api/auth/signup`;
            await callPostApiWithoutToken(apiUrl, {
                "username": userInfo.userName,
                "email"   : userInfo.userEmail,
                "password": userInfo.userPass,
                "birth"   : userInfo.userBirth,
            });
            navigate('/sign_in')
        } catch (error) {
            console.error(error)
        }

        setLoading(false);
    }

    const logoutUser = async () => {
        try {
			const apiUrl = `${apiDomain}/v1/api/auth/logout`;
			await callPostApiWithoutToken(apiUrl);
      		navigate('/sign_in');
            setIsAuthen(false);
		} catch (error) {
            console.error(error)
        }
    }

    const checkUserStatus = async () => {
        try {
            const apiUrl = `${apiDomain}/v1/api/auth/ping`;
            await callGetApiWithoutToken(apiUrl);
            setIsAuthen(true);
        } catch {
            setIsAuthen(false);
        }
        setLoading(false);
    }

    const contextData = { 
        isAuthen,
        loginUser,
        registerUser,
        logoutUser
    }

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=> {return useContext(AuthContext)};

export default AuthContext;