import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router';
import { message } from 'antd';
import Layout from '../components/Layout.js';

const Users = () => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        getUsers()
    }, [])

    const getUsers = async()=>{
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}users`).then(
            (res)=>{
                setUsers(res.data.users);
                setIsLoading(false);
            }
        )
    }

    const usersList = users.map(user=>{
        return(
            <li key={user.id} onClick={()=>navigate(`/user/${user.id}`)}>{user.pseudo}</li>
        )
    })

    return (
        <Layout>
            <div>{users.length} utilisateurs</div>
            <ul>
                {usersList}
            </ul>
        </Layout>
    )
}

export default Users