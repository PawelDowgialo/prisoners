import { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const AddUserForm = () => {
    const [newUser, setNewUser] = useState({ name: "", email: "", age: 0 });
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = {
            name: newUser.name,
            age: newUser.age,
            email: newUser.email
        };

        console.log("FormData value");
        for (let key in formData) {
            console.log(`${key}: ${formData[key]}`);
        }

        try {
            const response = await axios.post("http://localhost:8000/api/users", formData);
            console.log(`User added ${response.data}`);
            setNewUser({ name: "", email: "", age: 0 });
            navigate('../users')

        } catch (err) {
            console.error(`Some problems with your fetch operation: ${err.message}`);
        }
    };

    return (
        <>
            <h1>Dodaj więźnia</h1>
            <form onSubmit={submitHandler}>
                <input type="text" 
                       placeholder="Imię więźnia" 
                       value={newUser.name}
                       onChange={e => setNewUser({ ...newUser, name: e.target.value })} /><br/>
                <input type="email" 
                       placeholder="Email" 
                       value={newUser.email}
                       onChange={e => setNewUser({ ...newUser, email: e.target.value })} /><br/>
                <input type="number" 
                       placeholder="Wiek" 
                       value={newUser.age}
                       onChange={e => setNewUser({ ...newUser, age: e.target.value })} />
                <button type="submit">Add user</button>
            </form>
        </>
    );
};

export default AddUserForm;