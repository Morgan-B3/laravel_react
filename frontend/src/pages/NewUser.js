import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import swal from 'sweetalert';
import { message, Modal } from 'antd';
import Layout from '../components/Layout.js';

const NewUser = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        pseudo:'',
        email:"",
        password: '',
    });
    const [errors, setErrors] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const handleInput = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const login = async (e) => {
        e.preventDefault();
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}login`, user,{headers:{"Content-Type" : "application/json"}});
        if(res.data.status === 200){
            message.success(res.data.message)
            localStorage.setItem("user_token", res.data.token);
            setErrors([]);
            navigate('/');
        } else if(res.data.status === 401) {
            message.error(res.data.message);
        } else {
            setErrors(res.data.errors);
        }
    }

    const saveUser = async (e) => {
        e.preventDefault();

        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}users/store`, user,{headers:{"Content-Type" : "application/json"}});

        if(res.data.status === 200){
            swal({
                title: "Bravo !",
                text: res.data.message,
                icon: "success",
                button: "OK"
            })
            setUser({
                pseudo:'',
                email:'',
                password: '',
            })
            message.success(res.data.message)
            setErrors([]);
            navigate('/');
        } else {
            // swal({
            //     title: "Nope !",
            //     text: res.data.message,
            //     icon: "error",
            //     button: "OK"
            // })
            message.error("Champ(s) invalide(s)")
            setErrors(res.data.errors);
        }
    }

    return (
        <Layout>
            <form onSubmit={(e)=>login(e)}>
                <div>
                    <label htmlFor='email'>Email :</label>
                    <input type='email' id='email' name='email' value={user.email} onChange={(e)=>handleInput(e)}/>
                    <b>{errors.email}</b>
                </div>
                <div>
                    <label htmlFor='password'>Mot de passe :</label>
                    <input type='password' id='password' name='password' value={user.password} onChange={(e)=>handleInput(e)}/>
                    <b>{errors.password}</b>
                </div>
                <button type='submit' >Valider</button>
            </form>
            <button onClick={()=>showModal()}>S'inscrire</button>
            <Modal title="Inscription :" open={isModalOpen} onCancel={handleCancel} footer={null} centered >
                <form onSubmit={(e)=>saveUser(e)}>
                    <div>
                        <label htmlFor='pseudo'>Nom d'utilisateur :</label>
                        <input type='text' id='pseudo' name='pseudo' value={user.pseudo} onChange={(e)=>handleInput(e)}/>
                        <b>{errors.pseudo}</b>
                    </div>
                    <div>
                        <label htmlFor='email'>Email :</label>
                        <input type='email' id='email' name='email' value={user.email} onChange={(e)=>handleInput(e)}/>
                        <b>{errors.email}</b>
                    </div>
                    <div>
                        <label htmlFor='password'>Mot de passe :</label>
                        <input type='password' id='password' name='password' value={user.password} onChange={(e)=>handleInput(e)}/>
                        <b>{errors.password}</b>
                    </div>
                    <button type='submit' >Valider</button>
                </form>
            </Modal>
        </Layout>
    )
}

export default NewUser