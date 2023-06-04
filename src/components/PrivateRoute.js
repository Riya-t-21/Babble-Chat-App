import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';
import { useProfile } from '../context/profile.context';

const PrivateRoute = ({children ,...routeProps}) => {

  const profile = useProfile();

  if(!profile)
  {
    return <Redirect to="/signin" />
  }

  return <Route {...routeProps}>{children}</Route>;
    
  
};

export default PrivateRoute