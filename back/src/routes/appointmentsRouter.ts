import { Router } from "express";
import { getAppointments, getAppointmentById, createAppointment, cancelAppointment } from "../controllers/appointmentsController";
import { validateAppointmentData } from "../middlewares/appointmentsMiddleware";


const appointmentsRouter = Router();

appointmentsRouter.get("/", getAppointments);

appointmentsRouter.get("/:id", getAppointmentById);

appointmentsRouter.post("/schedule", validateAppointmentData, createAppointment);

appointmentsRouter.put("/cancel/:id", cancelAppointment);

export default appointmentsRouter;