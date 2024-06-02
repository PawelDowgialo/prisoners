import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import zdj1 from './bandyta1.webp';
import zdj2 from './bandyta2.webp';
import zdj3 from './bandyta3.webp';
import zdj4 from './bandyta4.webp';
import zdj5 from './bandyta5.webp';
import zdj6 from './bandyta6.webp';
import defaults from './default.jpg';

const AddUserForm = () => {
    const [newUser, setNewUser] = useState({ name: "", email: "", age: "", imageUrl: "" });
    const navigate = useNavigate();

    function getImageSrc(imageUrl) {
        if (imageUrl == 1){
            return zdj1
        }else if (imageUrl == 2){
            return zdj2
        }else if (imageUrl == 3){
            return zdj3
        }else if (imageUrl == 4){
            return zdj4
        }else if (imageUrl == 5){
            return zdj5
        }else if (imageUrl == 6){
            return zdj6
        }else{
            return defaults
        }
        }
    

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = {
            name: newUser.name,
            age: newUser.age,
            email: newUser.email,
            imageUrl: newUser.imageUrl  // Dodanie imageUrl do formData
        };

        console.log("FormData value");
        for (let key in formData) {
            console.log(`${key}: ${formData[key]}`);
        }

        try {
            const response = await axios.post("http://localhost:8000/api/users", formData);
            console.log(`User added ${response.data}`);
            setNewUser({ name: "", email: "", age: "", imageUrl: "" });
            navigate('../users');

        } catch (err) {
            console.error(`Some problems with your fetch operation: ${err.message}`);
        }
    };

    return (
        <>
            <h1>Dodaj więźnia</h1>
            <form className="formclass" onSubmit={submitHandler}>
                <input 
                    type="text" 
                    placeholder="Imię więźnia" 
                    value={newUser.name}
                    onChange={e => setNewUser({ ...newUser, name: e.target.value })} 
                /><br/>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={newUser.email}
                    onChange={e => setNewUser({ ...newUser, email: e.target.value })} 
                /><br/>
                <input 
                    type="number" 
                    placeholder="Wiek" 
                    value={newUser.age}
                    onChange={e => setNewUser({ ...newUser, age: e.target.value })} 
                /><br/>
                <select
                    value={newUser.imageUrl}
                    onChange={e => setNewUser({ ...newUser, imageUrl: e.target.value })}>
                    <option value="">Wybierz numer zdjęcia</option>
                    <option value="1">Zdjęcie 1</option>
                    <option value="2">Zdjęcie 2</option>
                    <option value="3">Zdjęcie 3</option>
                    <option value="4">Zdjęcie 4</option>
                    <option value="5">Zdjęcie 5</option>
                    <option value="6">Zdjęcie 6</option>
                </select>
                {newUser.imageUrl && ( //gdy newUser.imageUrl jest true
                    <div>
                        <h2 style={{ borderBottom: "2px solid black", borderTop: "2px solid black" }}>Wybrane zdjęcie:</h2>
                        <img src={getImageSrc(newUser.imageUrl)} alt={`Zdjęcie ${newUser.imageUrl}`} style={{ width: '200px', marginTop: '10px' }} />
                    </div>
                )}
               <button className="submit-add-button"type="submit">Dodaj więźnia</button>
            </form>
        </>
    );
};

export default AddUserForm;
