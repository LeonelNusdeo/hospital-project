import { useSelector } from "react-redux";
import styles from "./Home.module.css";
import background from "../../assets/background.jpg";

const Home = () => {
    const user = useSelector((state) => state.user);
    return (
        <>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className={styles.leftHalf}>
                    <h1>BIENVENIDO{user.id && `, ${user.name}`}</h1>
                    <p>Bienvenido a la Clinica Proyecto M3</p>
                </div>
                <div className={styles.rightHalf}></div>
            </div>
        </>
    );
};

export default Home;
