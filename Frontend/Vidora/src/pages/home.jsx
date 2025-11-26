import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';


function HomeComponent() {

    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState('');

    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`);
    }

    return (
        <div className="homePage">
            <header className="navBar">
                <div className="navBrand">
                    <h3>Vidora</h3>
                </div>

                <div className="navActions">
                    <IconButton
                        onClick={() => navigate("/history")}
                        sx={{ color: "#ffffff" }}
                    >
                        <RestoreIcon />
                    </IconButton>
                    <p>History</p>

                    <Button
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/");
                        }}
                        sx={{
                            ml: 1,
                            backgroundColor: "#960fbc",
                            color: "#ffffff",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#7a0897",
                            },
                        }}
                        variant="contained"
                    >
                        Logout
                    </Button>
                </div>
            </header>

            <main className="meetContainer">
                <section className="leftPanel">
                    <div className="heroContent">
                        <p className="eyebrow">Premium video calls for modern classrooms</p>
                        <h2>A complete communication suite for smarter virtual collaboration.</h2>
                        <p className="subtitle">
                            Start or join a secure meeting in seconds. Share, collaborate, and stay connected with a
                            distraction‑free experience.
                        </p>

                        <div className="joinForm">
                            <TextField
                                onChange={e => setMeetingCode(e.target.value)}
                                value={meetingCode}
                                id="meeting-code"
                                label="Enter meeting code"
                                variant="outlined"
                                size="medium"
                                fullWidth
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "#960fbc",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#7a0897",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#960fbc",
                                        },
                                        backgroundColor: "rgba(15,23,42,0.75)",
                                    },
                                    "& .MuiInputLabel-root": {
                                        color: "rgba(226,232,240,0.85)",
                                        "&.Mui-focused": {
                                            color: "#960fbc",
                                        },
                                    },
                                    "& .MuiInputBase-input": {
                                        color: "#ffffff",
                                    },
                                }}
                            />
                            <Button
                                onClick={handleJoinVideoCall}
                                variant="contained"
                                size="large"
                                disableElevation
                                sx={{
                                    backgroundColor: "#960fbc",
                                    color: "#ffffff",
                                    paddingInline: 3,
                                    textTransform: "none",
                                    fontWeight: 600,
                                    "&:hover": {
                                        backgroundColor: "#7a0897",
                                    },
                                }}
                            >
                                Join now
                            </Button>
                        </div>
                    </div>
                </section>

                <section className="rightPanel">
                    <div className="heroImageWrapper">
                        <img src="/logo.png" alt="Vidora logo with video call preview" />
                    </div>
                </section>
            </main>
        </div>
    )
}

export default withAuth(HomeComponent);
