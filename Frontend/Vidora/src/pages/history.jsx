import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';
import withAuth from '../utils/withAuth';

function History() {


    const { getHistoryOfUser } = useContext(AuthContext);

    const [meetings, setMeetings] = useState([])


    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch {
                // IMPLEMENT SNACKBAR
            }
        }

        fetchHistory();
    }, [])

    let formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        return `${day}/${month}/${year} • ${time}`;
    };

    return (
        <div className="historyPage">

            <header>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <IconButton
                        onClick={() => routeTo("/home")}
                        size="small"
                        sx={{ color: "#ffffff", backgroundColor: "rgba(15,23,42,0.6)" }}
                    >
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ color: "#ffffff" }}>
                        Meeting History
                    </Typography>
                </div>
            </header>

            <div className="historyList">
                {meetings.length !== 0 ? (
                    meetings.map((e, i) => (
                        <Card key={i} className="historyCard" variant="outlined">
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="inherit" gutterBottom>
                                    Code: {e.meetingCode}
                                </Typography>
                                {e.user_id && (
                                    <Typography sx={{ fontSize: 13 }} color="inherit">
                                        Joined by: {e.user_id}
                                    </Typography>
                                )}
                                <Typography sx={{ mt: 0.5, mb: 1.5 }} color="inherit">
                                    When: {formatDateTime(e.date)}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography sx={{ mt: 2, color: "#e5e7eb" }}>
                        No meetings yet. Join a call from the home page to see it appear here.
                    </Typography>
                )}
            </div>

        </div>
    )
}

export default withAuth(History);