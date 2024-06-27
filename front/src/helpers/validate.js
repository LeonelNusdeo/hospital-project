export const validateRegister = (input) => {
    const errors = {};
    const nameSurnameRegex =
        /^[a-zA-Z\u00C0-\u017F']+([-]?[a-zA-Z\u00C0-\u017F']+)*\s[a-zA-Z\u00C0-\u017F']+([-]?[a-zA-Z\u00C0-\u017F']+)*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const birthdateRegex =
        /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    const nDniRegex = /^\d+$/;
    const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
    const passwordRegex = /^.{8,}$/;

    if (!nameSurnameRegex.test(input.name)) {
        errors.name = `* Nombre y Apellido no válido`;
    }
    if (!emailRegex.test(input.email)) {
        errors.email = `* Email no válido`;
    }
    if (!birthdateRegex.test(input.birthdate)) {
        errors.birthdate = `* Fecha de Nacimiento no válida (DD-MM-AAAA)`;
    }
    if (!nDniRegex.test(input.nDni)) {
        errors.nDni = `* DNI no válido (solo números, sin "." ni espacios)`;
    }
    if (!usernameRegex.test(input.username)) {
        errors.username = `* Usuario no válido (solo letras, números, "_", "-" y ".")`;
    }
    if (!passwordRegex.test(input.password)) {
        errors.password = `* Contraseña no válida (mínimo 8 caracteres)`;
    }

    return errors;
};

export const validateLogin = (input) => {
    const errors = {};
    const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
    const passwordRegex = /^.{8,}$/;

    if (!usernameRegex.test(input.username)) {
        errors.username = `* Usuario no válido (solo letras, números, "_", "-" y ".")`;
    }
    if (!passwordRegex.test(input.password)) {
        errors.password = `* Contraseña no válida (mínimo 8 caracteres)`;
    }

    return errors;
};

export const validateBooking = (input) => {
    const errors = {};
    const dateRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    const timeRegex = /^(0[89]|1[0-7]):(?:[0-5]\d)$/;
    
    if (!dateRegex.test(input.date)) {
        errors.date = `* Fecha no válida (DD-MM-AAAA)`;
    } else {
        const dateParts = input.date.split('-');
        const year = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Month is 0-indexed in JavaScript
        const day = parseInt(dateParts[2], 10);
        const inputDate = new Date(year, month, day);
        const currentDate = new Date();
        
        if (inputDate <= currentDate) {
            errors.date = `* La Fecha debe ser un día posterior al actual`;
        } else if (inputDate.getDay() === 0 || inputDate.getDay() === 6) {
            errors.date = `* La Fecha debe ser un día hábil (Lunes a Viernes)`;
        }
    }
    
    if (!timeRegex.test(input.time)) {
        errors.time = `* La Hora debe ser de 09:00 a 18:00 hs.`;
    }

    return errors;
};
