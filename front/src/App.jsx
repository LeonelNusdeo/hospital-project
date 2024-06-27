import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./views/Home/Home";
import MyAppointments from "./views/MyAppointments/MyAppointments";
import About from "./views/About/About";
import Contact from "./views/Contact/Contact";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import BookAppointment from "./views/BookAppointment/BookAppointment";

function App() {
    return (
        <>
            <NavBar />
            <div className="mainContainer">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/appointments" element={<MyAppointments />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/book-appointment" element={<BookAppointment />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
