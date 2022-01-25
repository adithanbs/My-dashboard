import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/dashboard/Dashboard'
import Events from '../pages/events/Events'
import Users from '../pages/users/Users'
import { useKeycloak } from '@react-keycloak/web';
import Settings from '../pages/settings/Settings'
import AddNewUser from '../pages/add_new_user/AddNewUser'


const Routes = () => {

    const { keycloak } = useKeycloak();
    const logout = () => {
        localStorage.removeItem('persist:root');
        keycloak.logout();
      };
    
    return (
        <>

    <Switch>

    <Route path='/' exact component={Dashboard}/>
    <Route path='/users' component={Users}/>
    <Route path='/evevts' component={Events}/>
    <Route path='/settings' component={Settings}/>
    <Route path='/add-new-user' component={AddNewUser}/>



</Switch>


 
 
 </>
    )
}

export default Routes
