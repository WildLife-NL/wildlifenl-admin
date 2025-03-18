import { NavLink } from "react-router-dom";
import "./css/Nav-Bar.css";

function NavBar(){
        const logout = () => {
        window.location.href = "/"
    }

    const links = [
        {
            id: 0,
            path: "/Users",
            text: "Users"
        },
        {
            id: 1,
            path: "/EditSpecies",
            text: "Edit Species"
        },
        {
            id: 2,
            path: "CreateSpecies",
            text: "Create Species"
        }]

        return (
            <nav className="navBar">
                <ul className="menuNav">
                    {
                    links.map(link => {
                        return (
                            <li key={link.id}>
                                <NavLink to={link.path}>
                                    {link.text}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </nav>)
    }  
export default NavBar;