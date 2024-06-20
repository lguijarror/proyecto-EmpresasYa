
import UserContext from '../../context/UserContext'
import { useContext } from 'react';

import AdminDashboard from './AdminDashboard'
import UserDashboard from './UserDashboard'


const Dashboard = () => {

  const { user } = useContext(UserContext);
  const usuario = user.data.user;

  return (
     <>
     {
      usuario.admin ? (<AdminDashboard/>) : (<UserDashboard/>)
    }
    </>
  );
};

export default Dashboard;
