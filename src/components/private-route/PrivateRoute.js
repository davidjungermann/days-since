import { Navigate } from 'react-router';
import Counter from '../../pages/counter/Counter';

const PrivateRoute = ({ auth }) => {
  return auth ? <Counter /> : <Navigate to="/login" />;
};

export default PrivateRoute;
