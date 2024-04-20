import Login_form from '../components/LoginForm'
import { Navigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

export default function Login() {
    const { currentUser, userToken } = useStateContext(); // Pobieramy dane z kontekstu
    if (userToken) { // Jeżeli użytkownik jest zalogowany, przekieruj go na stronę główną
        return <Navigate to="/" />;
    }

    return (
        <Login_form />
    );
}