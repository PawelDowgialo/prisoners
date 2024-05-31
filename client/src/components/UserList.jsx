import { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
    const [usersList, setUsersList] = useState([]);

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

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <h1>Lista użytkowników</h1>
            <h2>Users:</h2>
            <button onClick={fetchData}>Pobierz dane o użytkownikach</button>
            <ul style={{ listStyle: 'none' }}>
                {
                    usersList.map(user => (
                        <li key={user._id} onClick={() => deleteUser(user._id)}>
                            imię: {user.name}, email: {user.email}, wiek: {user.age}
                            <img src={user.imageUrl} alt="user" width="300" />
                        </li>
                    ))
                }
            </ul>
        </>
    );
};

export default UserList;
