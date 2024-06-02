import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import zdj1 from './bandyta1.webp';
import zdj2 from './bandyta2.webp';
import zdj3 from './bandyta3.webp';
import zdj4 from './bandyta4.webp';
import zdj5 from './bandyta5.webp';
import zdj6 from './bandyta6.webp';
import defaults from './default.jpg';

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getImageSrc = (imageUrl) => {
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
    };

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

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="details-container">
      <h1>Informacje o <span style={{color: "orange"}}>{user.name}</span></h1>
      <div className="paragraph-details">
        <p>Imię: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Wiek: {user.age}</p>
        <p>Zdjęcie: <br/><img src={getImageSrc(user.imageUrl)} alt={`Zdjęcie ${user.imageUrl}`} style={{ width: '200px', marginTop: '10px' }}/></p>
      </div>
      <button onClick={() => navigate("/users")}>Powrót</button>
    </div>
  );
};

export default UserDetails;
