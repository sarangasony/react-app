import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import './SideDrawer.css';
import BackDrop from "../../UI/Backdrop/BackDrop";
import Aux from "../../../hoc/Auxj";

const sideDrawer = (props) => {

    let attachedClasses = ['SideDrawer', 'Close'];

    if(props.open) {
        attachedClasses = ['SideDrawer', 'Open'];  
    }

    return (
        <Aux>
            <BackDrop clicked={props.closed} show={props.open}/>
            <div className={attachedClasses.join(' ')}>
                <div className="SideDrawerLogo">
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    )
}


export default sideDrawer;