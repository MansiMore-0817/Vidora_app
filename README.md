🎥 Vidora — Video Conferencing App

<p align="center"> <b>Modern Video Conferencing App built with MERN + WebRTC (Peer-to-Peer)</b><br/> <i>Connect. Collaborate. Communicate. — all in real time ⚡</i> </p>

<p align="center"> <img src="https://img.shields.io/badge/MERN-Stack-4DB33D?style=for-the-badge&logo=mongodb&logoColor=white" /> <img src="https://img.shields.io/badge/WebRTC-Enabled-blue?style=for-the-badge&logo=webrtc&logoColor=white" /> <img src="https://img.shields.io/badge/Socket.io-Real--time-black?style=for-the-badge&logo=socket.io&logoColor=white" /> <img src="https://img.shields.io/badge/React-Dynamic-61DAFB?style=for-the-badge&logo=react&logoColor=black" /> <img src="https://img.shields.io/badge/Node.js-Fast-339933?style=for-the-badge&logo=node.js&logoColor=white" /> </p>

🌐 Overview

Vidora is a full-stack video conferencing platform built using MongoDB, Express, React, and Node.js, with WebRTC for peer-to-peer streaming and Socket.io for real-time communication.
It allows users to host or join meetings, chat live, and share screens — all from the browser.

✨ Features

✅ Peer-to-Peer Video Calls — Real-time connections using WebRTC

💬 In-Meeting Chat — Instant messaging powered by Socket.io

🪄 Create & Join Rooms — Unique room IDs for each meeting

🔐 Authentication — JWT-secured login & registration

🖥️ Screen Sharing — Share your screen with participants

🌙 Dark Modern UI — Responsive and intuitive interface

⚡ Lightweight & Scalable — Built for performance



# 📸 Demo Screenshots

> Visual walkthrough
### Landing Page
![Landing Page](/Frontend/Vidora/Project_Screenshots/landing.jpg)

### Authentication (Sign in / Sign up)
| Sign In | Sign Up |
|--------:|:-------|
| ![Sign In](/Frontend/Vidora/Project_Screenshots/signin.jpg) | ![Sign Up](/Frontend/Vidora/Project_Screenshots/signup.jpg) |

### Home / Dashboard
![Home Page](/Frontend/Vidora/Project_Screenshots/home.jpg)

### Meeting History (single & list)

![History List](/Frontend/Vidora/Project_Screenshots/history_list.jpg)

### Pre-Join (camera preview)
![Pre Join](/Frontend/Vidora/Project_Screenshots/prejoin.jpg)

### Allow Cam/Mic (Camera permission / Mic permission)
| Camera Access | Mic Access |
|--------:|:-------|
| ![Camera permit](/Frontend/Vidora/Project_Screenshots/cam_mic_permissions.jpg) | ![Mic permit](/Frontend/Vidora/Project_Screenshots/mic_permission.jpg) |


### Group Call (responsive grid)
![Group Call Grid](/Frontend/Vidora/Project_Screenshots/group_grid.jpg)

### Screen Sharing
![Screen Share](/Frontend/Vidora/Project_Screenshots/screenshare.jpg)

### In-call Chat & Screen Share side-by-side
![Chat and Share](/Frontend/Vidora/Project_Screenshots/chat_and_share.jpg)

---


🧠 Tech Stack

Frontend:
React.js • Tailwind CSS • Socket.io Client • WebRTC

Backend:
Node.js • Express.js • MongoDB (Mongoose) • Socket.io • JWT

Architecture:

Peer-to-peer connections via WebRTC

Signaling handled by Socket.io

REST APIs for users & meeting management

├── Backend/
│   ├── package.json
│   ├── src/
│   │   ├── app.js                # Express + Socket.IO setup
│   │   ├── controllers/
│   │   │   └── socketManager.js  # signaling, join/leave management
│   │   ├── routes/               # REST endpoints
│   │   └── models/               # optional MongoDB models
│   └── .env.example
│
├── Frontend/
│   └── Vidora/
│       ├── package.json
│       ├── src/
│       │   ├── App.jsx
│       │   ├── main.jsx
│       │   ├── pages/
│       │   │   ├── VideoMeet.jsx
│       │   │   ├── landing.jsx
│       │   │   └── authentication.jsx
│       │   ├── contexts/
│       │   │   └── AuthContext.jsx
│       │   └── mui/                     # shared MUI components
│       └── public/
│
└── README.md


# Vidora

Vidora is a browser-based video conferencing app using WebRTC for peer-to-peer media and Socket.IO for signaling. The project includes a React frontend (Vite) and a Node/Express backend that handles authentication and signaling.

## Key Features

- Sign in / Sign up (basic auth flows)
- Real-time signaling with Socket.IO
- Peer-to-peer video (WebRTC) with a responsive multi-tile grid
- In-meeting chat and optional screen sharing

## Repo Layout

- `Backend/` — Node.js + Express + Socket.IO server
- `Frontend/Vidora/` — React (Vite) app with UI components and WebRTC logic

## Quick Start (development)

Prerequisites:
- Node.js (16+)
- npm or yarn
- (Optional) MongoDB for persistent user storage

1) Backend

```powershell
cd Backend
npm install
# configure environment (see below)
npm run dev
```

2) Frontend

```powershell
cd Frontend/Vidora
npm install
npm run dev
```

Open `http://localhost:5175` (Vite default) to use the app. The backend is expected at `http://localhost:8000` by default.

## Configuration

Backend environment variables (examples):

- `PORT` — API + signaling server port (default: 8000)
- `MONGO_URI` — MongoDB connection string (if using DB)
- `JWT_SECRET` — secret for auth tokens

Update API base URLs in `Frontend/Vidora/src/contexts/AuthContext.jsx` and `Frontend/Vidora/src/pages/VideoMeet.jsx` if your backend runs at a different address.

## Local Testing Tips

- Use multiple browser tabs (or different browsers/incognito windows) with different usernames to simulate multiple participants.
- Grant camera/microphone permissions when prompted.
- If remote video tiles do not appear:
	- Verify the backend (Socket.IO) server is running and reachable.
	- Check browser console for socket connection logs and errors.
	- Ensure the frontend uses the Socket.IO client (`socket.io-client`) rather than raw WebSocket.

## Troubleshooting

- `getUserMedia` errors: ensure the page has permission to use the camera/microphone.
- Socket connection errors: confirm Socket.IO client and server versions are compatible and the server URL is correct.
- If ICE candidates fail across networks, consider adding a TURN server for reliable NAT traversal.

## About Me / What This Project Demonstrates

Vidora showcases my ability to build real-time, full-stack applications with clean architecture and modern frontend design. Through this project, I worked with WebRTC, Socket.IO, React, and Node.js to create a functional video-conferencing experience similar to real-world platforms.

This project demonstrates my skills in:

Real-time communication: WebRTC media handling, signaling, ICE/SDP flow, multi-peer connections.

Full-stack development: React + MUI on the frontend, Node.js + Express + Socket.IO on the backend.

System architecture thinking: stateless signaling, P2P media routing, STUN/TURN, room state management.

Problem-solving: debugging browser differences, managing media tracks, preventing leak issues, handling dynamic UI changes.

Product-focused UI: responsive layouts, screen sharing workflows, intuitive controls for camera/mic.

Overall, Vidora reflects my interest in real-time systems, modern web technologies, and building projects that feel practical, polished, and production-ready.


## Tech Decisions & Tradeoffs

# WebRTC Mesh vs SFU

Chose peer-to-peer mesh for simplicity, low latency, and learning fundamentals.
Tradeoff: not ideal for large meetings; SFU would scale better.

# Socket.IO for Signaling

Used Socket.IO for stable rooms and auto-reconnection.
Tradeoff: slightly more overhead than raw WebSockets.

# React + MUI

Selected React for component structure and MUI for fast, polished UI.
Tradeoff: heavier than custom styling.

$ P2P Media Routing

Kept audio/video P2P to reduce server load.
Tradeoff: requires TURN for strict networks; limits scalability.

# Stateless Signaling Server

Server only relays messages, no media.
Tradeoff: no persistent chat or analytics.

# Public STUN Server

Used Google STUN for convenience.
Tradeoff: not reliable for production; TURN still needed.


## Developer Notes

- Some code paths use legacy `addStream`/`onaddstream` APIs. You may prefer `addTrack` / `ontrack` for new work.
- Files containing JSX should use `.jsx` extension to avoid esbuild/Vite parsing issues.

## Contributing

1. Fork the repository and create a feature branch.
2. Implement and test your changes.
3. Open a pull request with a clear description and testing steps.

<p align="center">Built by <b>Mansi More</b> • moremansi1707@gmail.com</p>



