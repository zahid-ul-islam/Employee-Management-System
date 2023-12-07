import React from "react";
import { useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';

const Career = () => {
    const navigate = useNavigate
    const handleClick = (e)=>{
        navigate('/apply')
    }
  return (
    <div>
      <h3>Introduction</h3>
      <p>
        Embarking on a career in the MERN stack opens up exciting opportunities
        for individuals interested in web development. MERN stands for MongoDB,
        Express.js, React.js, and Node.js – a powerful combination of
        technologies that enables the development of robust and scalable
        full-stack web applications. As the demand for dynamic and interactive
        web experiences continues to rise, professionals with expertise in the
        MERN stack are in high demand across various industries.
      </p>
      
      <Button  sx={{bgcolor:'orange'}} variant="contained" onClick={handleClick}>Apply Now</Button>
    </div>
  );
};

export default Career;
