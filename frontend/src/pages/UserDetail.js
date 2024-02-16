import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {Modal, message} from "antd"
import Layout from '../components/Layout.js';

const UserDetail = () => {
    const {id} = useParams();

    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [image, setImage] = useState("");
    const [newPseudo, setNewPseudo] = useState("");
    const [errors, setErrors] = useState([]);
    const [userAuthorized, setUserAuthorized] = useState(false);
    
    const getUser = async()=>{
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}user/${id}/image`);
        setUser(response.data.user);
        setImage(`http://localhost:8000/images/${response.data.image.url}`);
        console.log(response.data.image.url);
    };

    const checkUser = async()=>{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}user/${id}/check`);
        console.log(res.data.request);
        // if(res.data.status === 200){
        //     setUserAuthorized(res.data.userAuthorized);
        // }
    }

    useEffect(()=>{
        getUser();
        checkUser();
    },[])

    useEffect(()=>{
        setNewPseudo(user.pseudo);
    },[user])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    
    const update = async (e)=>{
        e.preventDefault();
        const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}user/${id}/update`, {newPseudo});

        if(res.data.status === 200){
            setNewPseudo("");
            setIsModalOpen(false);
            getUser();
            setErrors([]);
        } else {
            setErrors(res.data.errors);
        }
    }

    const deleteUser = async (e)=>{
        e.preventDefault();
        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}user/${id}/delete`);
        message.success(res.data.message)
        // navigate('/', {state: res.data.message});
        navigate('/');
    }

    return (
        <Layout>
            <div>{user.pseudo}</div>
            <img src={image}/>
            {userAuthorized ?
                <div>
                    <button onClick={()=>showModal()}>Modifier</button>
                    <Modal title="Modifier le nom :" open={isModalOpen} onCancel={handleCancel} footer={null} centered >
                        <form onSubmit={(e)=>update(e)}>
                            <input type='text' id='newPseudo' name='newPseudo' value={newPseudo} onChange={(e)=>setNewPseudo(e.target.value)} required/>
                            <b>{errors.newPseudo}</b>
                            <button type='submit'>Valider</button>
                        </form>
                    </Modal>
                    <button onClick={(e)=>deleteUser(e)}>Supprimer</button>
                </div>
            : ""}
        </Layout>
    )
}

export default UserDetail

