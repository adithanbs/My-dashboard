import React from 'react'

const SidebarItem = props => {

    const active = props.active ? 'active' : ''
   
    const { keycloak } = useKeycloak();
    // const history = useHistory();
    // const [hide,setHide] = React.useState(false);
  
    const login = () => {
      localStorage.removeItem('persist:root');
      keycloak.login();
    };
  
    const logout = () => {
      localStorage.removeItem('persist:root');
      keycloak.logout();
    };
  
    return (
        <div className="sidebar__item">
             {keycloak && !keycloak.authenticated 
 
 ?(<button className="btn  btn-header-primary text-nowrap header-button" type="button" onClick={() => keycloak.login()}>Login</button>)
 :(
    <div className={`sidebar__item-inner ${active}`}>
    <i className={props.icon}></i>
    <span>
        {props.title}
        <button onClick={() => logout()}>Logout</button>

    </span>
</div>

 )

}
        </div>
    )
}

export default SidebarItem
