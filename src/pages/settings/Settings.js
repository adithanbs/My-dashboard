import { Button } from 'bootstrap';
import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

const Settings = () =>{
    const { keycloak } = useKeycloak();

    const login = () => {
        localStorage.removeItem('persist:root');
        keycloak.login();
      };
    
      const logout = () => {
        localStorage.removeItem('persist:root');
        keycloak.logout();
      };
    
    
  
    return(
        <>
          {keycloak && !keycloak.authenticated
          ?(<button  onClick={() => login()} >login</button>)
          :(<button  onClick={() => logout()} >logout</button>)
          
          }

        </>
    )
}

export default Settings