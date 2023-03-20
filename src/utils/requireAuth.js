import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function requireAuth(Component) {
  return function AuthenticatedComponent(props) {
    useEffect(() => {
      const token = Cookies.get('session');
      if (!token) {
        return <Navigate to="/" />;
      }
    }, []);

    return <Component {...props} />;
  };
}

export default requireAuth;