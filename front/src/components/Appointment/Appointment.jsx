import { useState } from "react";
import { useDispatch } from "react-redux";
import { cancelAppointment } from "../../redux/reducer";
import styles from "./Appointment.module.css";
import CancelButton from "../CancelButton/CancelButton";
import DisabledButton from "../DisabledButton/DisabledButton";
import Modal from "../Modal/Modal";
import axios from "axios";

const Appointment = ({ id, date, time, status }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleCancel = () => {
    const appointmentDate = new Date(date);
    const currentDate = new Date();
  
    const differenceInDays = Math.floor((appointmentDate - currentDate) / (1000 * 60 * 60 * 24));
  
    if (differenceInDays < 0) {
      alert("ERROR: El turno solo puede ser cancelado hasta el día anterior al día de la reserva.");
      return;
    }
  
    setShowModal(true);
  };
  
  

  const handleYesCancel = () => {
    axios.put(`http://localhost:3000/appointments/cancel/${id}`)
      .then(() => {
        dispatch(cancelAppointment(id));
        setShowModal(false);
      })
      .catch((error) => {
        alert("Turno no encontrado.");
      });
  };

  const handleNoCancel = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <h4>Fecha: <b>{date}</b></h4>
      <h4>Horario: <b>{time.slice(0, -3)}</b></h4>
      <h4>Estado: <b>{status.toUpperCase()}</b></h4>
      {status === "active" ? (
        <div>
          <CancelButton onClick={handleCancel} />
          {showModal && (
            <Modal onClose={handleNoCancel}>
              <div className={styles.modalContent}>
                <p>¿Estás seguro que deseas cancelar este turno?</p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button onClick={handleYesCancel}>Sí</button>
                  <button onClick={handleNoCancel}>No</button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      ) : (
        <DisabledButton />
      )}
    </div>
  );
};

export default Appointment;
