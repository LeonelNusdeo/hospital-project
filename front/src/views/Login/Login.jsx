import { useState } from "react";
import styles from "./Login.module.css";
import { validateLogin } from "../../helpers/validate";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/reducer";
import background from "../../assets/background.jpg";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        username: "",
        password: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: validateLogin({ [name]: value })[name],
        });
    };

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validateLogin(userData);
        setErrors(validationErrors);

        if (Object.values(validationErrors).every((error) => error === "")) {
            axios
                .post("http://localhost:3000/users/login", userData)
                .then((res) => {
                    dispatch(addUser(res.data.user));
                    clearForm();
                    navigate("/");
                })
                .catch((error) => {
                    alert("Datos de usuario incorrectos.");
                });
        }
    };

    const clearForm = () => {
        setUserData({
            username: "",
            password: "",
        });
        setErrors({
            username: "",
            password: "",
        });
    };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={styles.leftHalf}>
                <form onSubmit={handleOnSubmit}>
                    <h1>LOGIN</h1>
                    <p>Accede ingresando tu usuario y contraseña:</p>
                    <div className={styles.inputContainer}>
                        <input
                            className={styles.inputStyle}
                            type="text"
                            value={userData.username}
                            name="username"
                            placeholder="Usuario"
                            onChange={handleInputChange}
                        />
                        {errors.username && (
                            <p className={styles.errorWarning}>
                                {errors.username}
                            </p>
                        )}
                    </div>
                    <div className={styles.inputContainer}>
                        <input
                            className={styles.inputStyle}
                            type="password"
                            value={userData.password}
                            name="password"
                            placeholder="Contraseña"
                            onChange={handleInputChange}
                        />
                        {errors.password && (
                            <p className={styles.errorWarning}>
                                {errors.password}
                            </p>
                        )}
                    </div>
                    <button className={styles.submitButton} type="submit">
                        Ingresar
                    </button>
                    <p className={styles.notRegistered}>
                        ¿Aún no tienes una cuenta?{" "}
                        <Link to="/register">Regístrate aquí.</Link>
                    </p>
                </form>
            </div>
            <div className={styles.rightHalf} style={{ backgroundImage: `url(${background})` }}>
            </div>
        </div>
    );
};

export default Login;
