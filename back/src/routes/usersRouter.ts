import { Router } from "express";
import { getUsers, getUserById, createUser, loginUser } from "../controllers/usersController";
import { validateUserRegistration } from "../middlewares/usersMiddleware";

const usersRouter = Router();

usersRouter.get("/", getUsers);

usersRouter.get("/:id", getUserById);

usersRouter.post("/register", validateUserRegistration, createUser);

usersRouter.post("/login", loginUser);

export default usersRouter;