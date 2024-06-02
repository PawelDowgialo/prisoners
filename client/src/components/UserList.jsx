import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import zdj1 from './bandyta1.webp';
import zdj2 from './bandyta2.webp';
import zdj3 from './bandyta3.webp';
import zdj4 from './bandyta4.webp';
import zdj5 from './bandyta5.webp';
import zdj6 from './bandyta6.webp';
import defaults from './default.jpg';

const UserList = () => {
    const [usersList, setUsersList] = useState([]);
    const navigate = useNavigate();
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
                <button id="powrot" onClick={() => { navigate("/") }}>Powrót</button>
                <button id="dodaj" onClick={() => { navigate("../add-user") }}>Dodaj</button>
                <button id="odswiez" onClick={fetchData}>Odśwież</button>
            </div>
            <br />
            <div className="prisoners-grid">
                {usersList.map(user => (
                    <div key={user._id} className="prisoner-card" onClick={() => { navigate(`/detail-user/${user._id}`) }}>
                        {(() => {
                    if (user.imageUrl == 1){
                        return <img src={zdj1} alt="user" className="prisoner-image" />;
                    }else if (user.imageUrl == 2){
                        return <img src={zdj2} alt="user" className="prisoner-image" />;
                    }else if (user.imageUrl == 3){
                        return <img src={zdj3} alt="user" className="prisoner-image" />;
                    }else if (user.imageUrl == 4){
                        return <img src={zdj4} alt="user" className="prisoner-image" />;
                    }else if (user.imageUrl == 5){
                        return <img src={zdj5} alt="user" className="prisoner-image" />;
                    }else if (user.imageUrl == 6){
                        return <img src={zdj6} alt="user" className="prisoner-image" />;
                    }
                    else{
                        return <img src={defaults} alt="user" className="prisoner-image" />;
                    }
                })()}
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
