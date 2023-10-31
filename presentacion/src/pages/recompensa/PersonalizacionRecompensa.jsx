import React from 'react'
import Sidedar from '../../components/sidebar/Sidedar'
import './PersonalizacionRecompensa.css'
import PerRecompensa from '../../components/PerRecompensa/PerRecompensa'
import {  ToastContainer } from 'react-toastify';

const PersonalizacionRecompensa = () => {
  return (
    <>
    <Sidedar/>
    <ToastContainer position="bottom-center" />
    <PerRecompensa/> 
    </>
  )
}

export default PersonalizacionRecompensa