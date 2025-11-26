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

## Developer Notes

- Some code paths use legacy `addStream`/`onaddstream` APIs. You may prefer `addTrack` / `ontrack` for new work.
- Files containing JSX should use `.jsx` extension to avoid esbuild/Vite parsing issues.

## Contributing

1. Fork the repository and create a feature branch.
2. Implement and test your changes.
3. Open a pull request with a clear description and testing steps.

## License

This project does not include a license file by default. Add a `LICENSE` if you wish to make it open source.

---


