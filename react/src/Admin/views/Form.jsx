import { Fragment, useEffect } from 'react'
import { NavLink, Navigate, Outlet} from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import ApplicationLogo from '../../components/ApplicationLogo'
import Footer from '../../components/Footer';
import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../axios';



export default function LogedDefaultLayout() {
    const { currentUser, userToken } = useStateContext();
    const hasAdminRole =
      currentUser?.grupa?.nazwa_grupy.toLowerCase() === "admin" ||
      currentUser?.grupa?.nazwa_grupy.toLowerCase() === "super admin";
  


    if (!userToken) {
        // Przekierowanie na stronę gdy nie jesteśmy zalogowani
        return <Navigate to="/mainpage" />
    }
    if(!hasAdminRole){
        // Przekierowanie na stronę gdy nie jesteśmy adminem
        return <Navigate to="/" />
    }

    return (
    <>
        <div>
            {/* Tu będzie wyświetlana zawartość podstrony */}
            <Outlet /> 
        </div>
        
    </>
  )
}
