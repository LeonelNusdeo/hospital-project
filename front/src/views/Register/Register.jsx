import { useState } from "react";
import styles from "./Register.module.css";
import { validateRegister } from "../../helpers/validate";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import background from "../../assets/background.jpg";

const Register = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        birthdate: "",
        nDni: "",
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        birthdate: "",
        nDni: "",
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
            [name]: validateRegister({ [name]: value })[name],
        });
    };

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validateRegister(userData);
        setErrors(validationErrors);

        if (Object.values(validationErrors).every((error) => error === "")) {
            axios
                .post("http://localhost:3000/users/register", userData)
                .then((res) => {
                    alert("Usuario creado exitosamente");
                    clearForm();
                    navigate("/login");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const clearForm = () => {
        setUserData({
            name: "",
            email: "",
            birthdate: "",
            nDni: "",
            username: "",
            password: "",
        });
        setErrors({
            name: "",
            email: "",
            birthdate: "",
            nDni: "",
            username: "",
            password: "",
        });
    };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={styles.leftHalf}>
                <form onSubmit={handleOnSubmit}>
                    <h1>REGISTRATE</h1>
                    <p>
                        Completa todos los campos para ingresar a la plataforma:
                    </p>
                    <div className={styles.inputContainer}>
                        <label>Nombre y Apellido: </label>
                        <input
                            className={styles.inputStyle}
                            type="text"
                            value={userData.name}
                            name="name"
                            placeholder="Ej. Juan Martinez"
                            onChange={handleInputChange}
                        />
                        {errors.name && (
                            <p className={styles.errorWarning}>{errors.name}</p>
                        )}
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Email: </label>
                        <input
                            className={styles.inputStyle}
                            type="text"
                            value={userData.email}
                            name="email"
                            placeholder="Ej. jmartinez@mail.com"
                            onChange={handleInputChange}
                        />
                        {errors.email && (
                            <p className={styles.errorWarning}>
                                {errors.email}
                            </p>
                        )}
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Fecha de Nacimiento: </label>
                        <input
                            className={styles.inputStyle}
                            type="date"
                            value={userData.birthdate}
                            name="birthdate"
                            onChange={handleInputChange}
                        />
                        {errors.birthdate && (
                            <p className={styles.errorWarning}>
                                {errors.birthdate}
                            </p>
                        )}
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Número de DNI: </label>
                        <input
                            className={styles.inputStyle}
                            type="text"
                            value={userData.nDni}
                            name="nDni"
                            placeholder={`Ej. 10921761 (sin ".")`}
                            onChange={handleInputChange}
                        />
                        {errors.nDni && (
                            <p className={styles.errorWarning}>{errors.nDni}</p>
                        )}
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Usuario: </label>
                        <input
                            className={styles.inputStyle}
                            type="text"
                            value={userData.username}
                            name="username"
                            placeholder={`(solo letras a-z / A-Z, números 0-9, "_", "-" y ".")`}
                            onChange={handleInputChange}
                        />
                        {errors.username && (
                            <p className={styles.errorWarning}>
                                {errors.username}
                            </p>
                        )}
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Contraseña: </label>
                        <input
                            className={styles.inputStyle}
                            type="password"
                            value={userData.password}
                            name="password"
                            placeholder="(mínimo 8 caracteres)"
                            onChange={handleInputChange}
                        />
                        {errors.password && (
                            <p className={styles.errorWarning}>
                                {errors.password}
                            </p>
                        )}
                    </div>
                    <button className={styles.submitButton} type="submit">
                        Registrarme
                    </button>
                    <p className={styles.alreadyRegistered}>
                        ¿Ya tienes una cuenta?{" "}
                        <Link to="/login">Ingresa aquí.</Link>
                    </p>
                </form>
            </div>
            <div
                className={styles.rightHalf}
                style={{ backgroundImage: `url(${background})` }}
            ></div>
        </div>
    );
};

export default Register;
