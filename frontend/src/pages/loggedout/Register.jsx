import React, { useState } from 'react';
import RegisterStudent from '../../components/signups/RegisterStudent';
import RegisterAlumnus from '../../components/signups/RegisterAlumnus';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import login from '../../images/login.jpg';
import { Container, Paper } from '@mui/material';

const Register = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='container'>
            <div style={{ position: 'relative' }}>
                <img
                    id='home'
                    src={login}
                    alt="bg"
                    style={{
                        width: '100%',
                        height: '100vh', // Ensure the image covers the full viewport height
                        objectFit: 'cover',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 0, // Background image lower z-index
                    }} 
                />
            </div>
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    position: 'absolute',
                    top: '70%', // Increased from 60% to 70% to push the content further down
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1, // Higher z-index to ensure visibility above the background
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Optional: Background for better visibility
                    borderRadius: 2, // Optional: Add border radius
                    padding: 2, // Optional: Add padding
                }}
            >
                <Box sx={{ width: '100%' }}>
                    <Paper sx={{ padding: 2 }}>
                        <Tabs value={value} onChange={handleChange} centered>
                            <Tab label="Sign Up as Alumnus" />
                            <Tab label="Sign Up as Student" />
                        </Tabs>
                    </Paper>
                    {value === 0 ? <RegisterAlumnus /> : <RegisterStudent />}
                </Box>
            </Container>
        </div>
    );
}

export default Register;
