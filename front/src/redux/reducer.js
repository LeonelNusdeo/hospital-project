import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    user: {},
    userAppointments: []
};

export const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload
        },
        addAppointments: (state, action) => {
            state.userAppointments = action.payload
        },
        cancelAppointment: (state, action) => {
            const idToCancel = action.payload;
            const appointmentToCancel = state.userAppointments.find(appointment => appointment.id === idToCancel);
            if (appointmentToCancel) {
                appointmentToCancel.status = "cancelled";
            }
        }
    }
});

export const { addUser, addAppointments, cancelAppointment } = mainSlice.actions;