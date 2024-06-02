import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import zdj1 from './bandyta1.webp';
import zdj2 from './bandyta2.webp';
import zdj3 from './bandyta3.webp';
import zdj4 from './bandyta4.webp';
import zdj5 from './bandyta5.webp';
import zdj6 from './bandyta6.webp';
import defaults from './default.jpg';
const EditUserForm = () => {
    const [user, setUser] = useState({ name: "", email: "", age: 0, imageUrl: "" });
    const { id } = useParams();
    const navigate = useNavigate();

    function getImageSrc(imageUrl) {
        switch (imageUrl) {
            case "1":
                return zdj1;
            case "2":
                return zdj2;
            case "3":
                return zdj3;
            case "4":
                return zdj4;
            case "5":
                return zdj5;
            case "6":
                return zdj6;
            default:
                return defaults; // Możesz tutaj zwrócić domyślną ścieżkę lub pusty string
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/users/${id}`);
                setUser(response.data);
            } catch (err) {
                console.error(`Error fetching user: ${err.message}`);
            }
        };
        fetchUser();
    }, [id]);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8000/api/users/${id}`, user);
            console.log(`User updated: ${response.data}`);
            navigate("/users");
        } catch (err) {
            console.error(`Error updating user: ${err.message}`);
        }
    };

    return (
        <>
            <h5>Edit User</h5>
            <form onSubmit={submitHandler}>
                <input 
                    type="text" 
                    placeholder="Imię więźnia" 
                    value={user.name}
                    onChange={e => setUser({ ...user, name: e.target.value })} 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={user.email}
                    onChange={e => setUser({ ...user, email: e.target.value })} 
                />
                <input 
                    type="number" 
                    placeholder="Wiek" 
                    value={user.age}
                    onChange={e => setUser({ ...user, age: e.target.value })} 
                />
                <select
                    value={newUser.imageUrl}
                    onChange={e => setUser({ ...user, imageUrl: e.target.value })}>
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
                        <h3>Wybrane zdjęcie:</h3>
                        <img src={getImageSrc(newUser.imageUrl)} alt={`Zdjęcie ${newUser.imageUrl}`} style={{ width: '200px', marginTop: '10px' }} />
                    </div>
                )}
                <button type="submit">Update user</button>
            </form>
        </>
    );
};

export default EditUserForm;
