import Login_form from '../components/LoginForm'
import { Navigate } from 'react-router-dom';
import { userStateContext } from '../contexts/ContextProvider';

export default function Login() {
    const { currentUser, userToken } = userStateContext(); // Pobieramy dane z kontekstu
    if (userToken) { // Jeżeli użytkownik jest zalogowany, przekieruj go na stronę główną
        return <Navigate to="/" />;
    }

    return (
        <Login_form />
    );
}