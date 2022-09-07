import React, { useState } from "react";

import Aux from '../../hoc/Auxj';
import Toolbar from "../Navigation/Toolbar/Toolbar";
import './Layout.css';

import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {

     const [showSideDrawer, setShowSideDrawer] = useState(false);

     const sideDrawerCloseHandler = () => {
          setShowSideDrawer(false)
     }

     const sideDrawerToggleHandler = () => {
          setShowSideDrawer(!showSideDrawer)
     }

     return (
          <Aux>
               <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
               <SideDrawer closed={sideDrawerCloseHandler} open={showSideDrawer}/>
               <main className="Content">
                    {props.children}
               </main>
          </Aux>
     )
};

export default Layout;