import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./NavBar.module.css";
import logo from "../../assets/logo.jpeg";
import avatarOffline from "../../assets/avatar-offline.png";
import avatarOnline from "../../assets/avatar-online.png";

const NavBar = () => {
    const user = useSelector((state) => state.user);

    return (
        <nav className={styles.navBarContainer}>
            <div className={styles.logoSection}>
                <img src={logo} />
                <h1>Proyecto M3</h1>
            </div>
            <div className={styles.rightSection}>
                <div className={styles.linksSection}>
                    <Link to="/">
                        <span>HOME</span>
                    </Link>
                    <Link to="/about">
                        ABOUT
                    </Link>
                    <Link to="/contact">
                        <span>CONTACTO</span>
                    </Link>
                    {user.id && (
                        <Link to="/appointments">
                            <span>MIS TURNOS</span>
                        </Link>
                    )}
                    {!user.id && (
                        <Link to="/register">
                            <span>REGISTRATE</span>
                        </Link>
                    )}
                </div>
                <div className={styles.avatarSection}>
                    <Link to={user.id ? "/" : "/login"}>
                     <img src={user.id ? avatarOnline : avatarOffline} />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
