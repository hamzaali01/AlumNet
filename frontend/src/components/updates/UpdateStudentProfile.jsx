import React, { useState } from 'react'

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const UpdateStudentProfile = ({ props }) => {

    const token = localStorage.getItem('jwt')

    const [profile, setProfile] = useState({
        first_name: props.first_name,
        last_name: props.last_name,
        id: props.id,
        sex: props.sex,
        degree: props.degree,
    })

    const { first_name, last_name, id, sex, degree } = profile;

    const onChange = e => {
        setProfile((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        })
        )
    }

    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success')
    const [text, setText] = useState('')

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.put('http://localhost:5000/student/' + id,
                profile,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

            setSeverity('success')
            setText(response.data.message)
        }
        catch (err) {
            setSeverity('error')
            setText(err.response.error)
        }

        setOpen(true)
    }

    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="m">
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={open}
                    onClose={handleClose}
                    autoHideDuration={5000}>
                    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                        {text}
                    </Alert>

                </Snackbar>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Paper sx={{ p: 4, }} elevation={5} >

                        <Typography component="h1" variant="h5" textAlign='left'>
                            Personal Information
                        </Typography>
                        <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="first_name"
                                        required
                                        fullWidth
                                        id="first_name"
                                        label="First Name"
                                        onChange={onChange}
                                        value={first_name}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="last_name"
                                        label="Last Name"
                                        name="last_name"
                                        onChange={onChange}
                                        value={last_name}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="id"
                                        label="ID"
                                        name="id"
                                        type='Number'
                                        onChange={onChange}
                                        value={id}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Sex *</InputLabel>
                                        <Select
                                            labelId='demo-simple-select-label'
                                            name='sex'
                                            id="sex"
                                            value={sex}
                                            label="Sex"
                                            onChange={onChange}
                                            required
                                        >
                                            <MenuItem value={'M'}>Male</MenuItem>
                                            <MenuItem value={'F'}>Female</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>


                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="degree"
                                        label="Degree"
                                        name="degree"
                                        onChange={onChange}
                                        value={degree}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} />

                                <Grid item xs={12} sm={2}>

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 0, mb: -2 }}
                                        color='success'
                                    >
                                        Update
                                    </Button>
                                </Grid>
                            </Grid>



                        </Box>
                    </Paper>
                </Box>

            </Container>
        </ThemeProvider>

    )
}

export default UpdateStudentProfile