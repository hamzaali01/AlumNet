import React, { useEffect, useState } from 'react'

import UpdateAlumnusProfile from './updates/UpdateAlumnusProfile'
import UpdateJob from './updates/UpdateJob'
import AddJob from './creates/AddJob'
import UpdateAdvice from './updates/UpdateAdvice'
import UpdateStory from './updates/UpdateStory'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Navbar from './navbars/Navbar'
import UpdateStudentProfile from './updates/UpdateStudentProfile'
import axios from 'axios'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const UpdateAlumnus = () => {

    const pid = 22747
    const token = localStorage.getItem('jwt');

    const [action, setAction] = useState('My Profile')

    const [advices, setAdvices] = useState([])
    const [stories, setStories] = useState([])
    const [profile, setProfile] = useState({
        id: '',
        first_name: '',
        last_name: '',
        sex: '',
        degree: '',
        major: '',
        graduation: ''
    })
    const [jobs, setJobs] = useState([])

    const setProfileAction = () => {
        setAction('My Profile')
    }

    const setAdviceAction = () => {
        setAction('My Advices')
    }

    const setStoriesAction = () => {
        setAction('My Stories')
    }

    // const setJobsAction = () => {
    //     setAction('My Jobs')
    // }

    const drawerWidth = 250;

    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success')
    const [text, setText] = useState('')

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await axios.get("http://localhost:5000/alumni/" + pid, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setProfile(response.data)
                console.log(response.data.id)
                //alert(response.data.id)
            }
            catch (err) {
                console.log(err.response.data.error)
                setText(err.response.data.error)
                setSeverity('error')
                setOpen(true)
            }
        }
        getProfile()
    }, [token])

    useEffect(() => {
        const getAdvices = async () => {
            try {
                const response = await axios.get("http://localhost:5000/advices/alumni/" + pid, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setAdvices(response.data.advices)
            }
            catch (err) {
                console.log(err.response.data.error)
                setText(err.response.data.error)
                setSeverity('error')
                setOpen(true)
            }
        }
        getAdvices()
    }, [token])

    useEffect(() => {
        const getStories = async () => {
            try {
                const response = await axios.get("http://localhost:5000/stories/alumni/" + pid, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setStories(response.data.stories)
                console.log(stories)
            }
            catch (err) {
                console.log(err.response.data.error)
                setText(err.response.data.error)
                setSeverity('error')
                setOpen(true)
            }
        }
        getStories()
    }, [token])

    useEffect(() => {
        const getJobs = async () => {
            try {
                const response = await axios.get("http://localhost:5000/alumni/jobs/" + pid, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setJobs(response.data)
            }
            catch (err) {
                console.log(err.response.data.error)
                setText(err.response.data.error)
                setSeverity('error')
                setOpen(true)
            }
        }
        getJobs()
    }, [token])

    return (
        <>
            <Box sx={{ display: 'flex', marginTop: 10 }}>

                <CssBaseline />
                <>

                    <AppBar
                        position="absolute"
                        sx={{
                            zIndex: 0,
                            width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, mt: 8.6
                        }}
                    >
                        <Toolbar>
                            <Typography variant="h6" noWrap component="div">
                                {action}
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <Drawer
                        position='absolute'
                        sx={{
                            zIndex: 0,
                            width: drawerWidth,
                            mt: 50,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                                boxSizing: 'border-box',
                            },
                        }}
                        variant="permanent"
                        anchor="left"
                    >
                        <Toolbar />

                        <List>
                            <Divider />
                            <ListItemButton onClick={setProfileAction}>
                                <ListItemText primary='Profile' />
                            </ListItemButton>
                            <Divider />
                            <ListItemButton onClick={setAdviceAction}>
                                <ListItemText primary='Advices' />
                            </ListItemButton>
                            <Divider />
                            <ListItemButton onClick={setStoriesAction}>
                                <ListItemText primary='Stories' />
                            </ListItemButton>
                            <Divider />
                        </List>
                    </Drawer>
                    <Box
                        component="main"
                        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                    >
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={open}
                            onClose={handleClose}
                            autoHideDuration={5000}>
                            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                                {text}
                            </Alert>

                        </Snackbar>
                        <Toolbar />
                        {action === 'My Profile' ?
                            <>
                                <UpdateAlumnusProfile props={profile} />
                                <br />
                                <AddJob />
                                <br />
                                {jobs.map((job) => (<UpdateJob props={job} />))}
                            </>
                            : action === 'My Advices' ?
                                <>
                                    {advices.map((advice) => (<UpdateAdvice key={advice._id} props={advice} />))}
                                </>
                                :
                                <>
                                    {stories.map((story) => (<UpdateStory key={story._id} props={story} />))}
                                </>
                        }
                    </Box>
                </>
            </Box>
        </>
    );
}

export default UpdateAlumnus