import { useState, useEffect } from "react";
import { validateBooking } from "../../helpers/validate";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./BookAppointment.module.css";
import axios from "axios";
import appointmentLogo from "../../assets/appointments.png";

const BookAppointment = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [appointmentData, setAppointmentData] = useState({
        date: "",
        time: "",
    });
    const [errors, setErrors] = useState({
        date: "",
        time: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAppointmentData({
            ...appointmentData,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: validateBooking({ [name]: value })[name],
        });
    };

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validateBooking(appointmentData);
        setErrors(validationErrors);

        if (Object.values(validationErrors).every((error) => error === "")) {
            axios
                .post("http://localhost:3000/appointments/schedule", {
                    ...appointmentData,
                    userId: user.id,
                })
                .then((res) => {
                    alert("Turno creado exitosamente");
                    clearForm();
                    navigate("/appointments");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const clearForm = () => {
        setAppointmentData({
            date: "",
            time: "",
        });
        setErrors({
            date: "",
            time: "",
        });
    };

    useEffect(() => {
        !user.id && navigate("/login");
    }, []);

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={styles.leftHalf}>
                <form onSubmit={handleOnSubmit}>
                    <h1>SOLICITAR UN TURNO</h1>
                    <p className={styles.subtitle}>
                        Completa todos los campos para solicitar un turno:
                    </p>
                    <p className={styles.smallPrint}>
                        (el horario de atención es de Lunes a Viernes de 09:00 a
                        18:00 hs.)
                    </p>
                    <div className={styles.inputContainer}>
                        <label>Fecha: </label>
                        <input
                            className={styles.inputStyle}
                            type="date"
                            value={appointmentData.date}
                            name="date"
                            onChange={handleInputChange}
                        />
                        {errors.date && (
                            <p className={styles.errorWarning}>{errors.date}</p>
                        )}
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Hora: </label>
                        <input
                            className={styles.inputStyle}
                            type="time"
                            value={appointmentData.time}
                            name="time"
                            onChange={handleInputChange}
                        />
                        {errors.time && (
                            <p className={styles.errorWarning}>{errors.time}</p>
                        )}
                    </div>
                    <button className={styles.submitButton} type="submit">
                        Solicitar Turno
                    </button>
                </form>
            </div>
            <div className={styles.rightHalf}>
                <img src={appointmentLogo} />
            </div>
        </div>
    );
};

export default BookAppointment;
