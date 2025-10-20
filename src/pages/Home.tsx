import React from 'react'
import { doSignOut } from '../firebase/auth'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router'

const Home = () => {

    const {userLoggedIn} = useAuth()
    const navigate = useNavigate()

  return (
    <>
    <div>Hello</div>
    {
        userLoggedIn && <>
        <button type='submit' className='border border-gray-500' onClick={()=> {doSignOut().then(()=> {navigate("/login")})}}>Sign out</button></>
        
    }
    
    </>
  )
}

export default Home