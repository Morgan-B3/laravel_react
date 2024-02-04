import React from 'react'
import { useNavigate } from 'react-router'

const Layout = ({children}) => {
    const navigate = useNavigate();
    return (
        <div>
            <header>
                <button onClick={()=>navigate('/')}>Accueil</button>
                <button onClick={()=>navigate('/nouvel-utilisateur')}>Connexion</button>
            </header>
            {children}
        </div>
    )
}

export default Layout