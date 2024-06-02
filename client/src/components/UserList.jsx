import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";

const UserList = () => {
    const [usersList, setUsersList] = useState([]);
    const navigate = useNavigate()
    async function fetchData() {
        console.log("I am fetching");
        try {
            const response = await axios.get("http://localhost:8000/api/users");
            setUsersList(response.data);
        } catch (err) {
            console.log("Error: ", err);
        }
    }

    const deleteUser = async (userId) => {
        const confirmation = window.confirm("Czy chcesz skasować użytkownika?");
        if (!confirmation) return;

        try {
            const response = await axios.delete(`http://localhost:8000/api/users/${userId}`);
            if (response.status !== 200) throw new Error("Error response is not ok");
            fetchData();
        } catch (err) {
            console.log(`There was a problem with deleting the user: ${err.message}`);
        }
    };

    const editUser = (userId) => {
        navigate(`/edit-user/${userId}`);
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div id="all">
            <h1>Lista więźniów</h1>
            <div id="buttons1">
                <button id="powrot" onClick={()=>{navigate("/")}}>Powrót</button>
                <button id="dodaj" onClick={()=>{navigate("../add-user")}}>Dodaj</button>
                <button id="odswiez" onClick={fetchData}>Odśwież</button>
            </div>
            <br/>
            <div className="prisoners-grid">
                {usersList.map(user => (
                <div key={user._id} className="prisoner-card" onClick={()=>{navigate('/')}}>
                    <img src={user.imageUrl} alt="user" className="prisoner-image" />
                    <div className="prisoner-details">
                    <p>Imię: {user.name}</p>
                    <p>Wiek: {user.age}</p>
                    </div>
                    <div className="button-container">
                        <button className="editdelete"
                        onClick={(e) => {
                            e.stopPropagation(); // Zatrzymanie zdarzeń
                            deleteUser(user._id);
                        }}>usuń</button>

                        <button className="editdelete"
                        onClick={(e) => {
                            e.stopPropagation(); // Zatrzymanie zdarzeń
                            editUser(user._id);
                        }}>edytuj</button>
                    </div>
                    
                </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;
