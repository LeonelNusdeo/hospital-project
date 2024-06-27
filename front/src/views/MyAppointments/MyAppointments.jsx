import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addAppointments } from "../../redux/reducer.js"
import styles from "./MyAppointments.module.css";
import Appointment from "../../components/Appointment/Appointment";
import axios from "axios";
import BookButton from "../../components/BookButton/BookButton";

const Appointments = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const turnos = useSelector((state) => (state.userAppointments));

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${user.id}`)
    .then((res) => dispatch(addAppointments(res.data.appointments)));
  }, []);

  useEffect(() => {
    !user.id && navigate("/login")
  }, []);

  return (
    <div className={styles.myAppointmentsContainer}>
      <div className={styles.headerContainer}>
        <div>
          <h1>MIS TURNOS</h1>
          <p>{turnos.length == 0 ? `El paciente no posee turnos.` : `Estos son los turnos del paciente ${user.name}:`}</p>
        </div>
        <div className={styles.newAppointmentButtonContainer}>
          <Link to="/book-appointment"><BookButton /></Link>
        </div>
      </div>
      <div className={styles.centeredContainer}>
        <div className={styles.appointmentContainer}>
          {turnos.map((turno) => {
            return (
              <Appointment
                key={turno.id}
                id={turno.id}
                date={turno.date}
                time={turno.time}
                status={turno.status}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
