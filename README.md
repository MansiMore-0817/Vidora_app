🎥 Vidora — Video Conferencing App

<p align="center"> <b>Modern Video Conferencing App built with MERN + WebRTC (Peer-to-Peer)</b><br/> <i>Connect. Collaborate. Communicate. — all in real time ⚡</i> </p>

<p align="center"> <img src="https://img.shields.io/badge/MERN-Stack-4DB33D?style=for-the-badge&logo=mongodb&logoColor=white" /> <img src="https://img.shields.io/badge/WebRTC-Enabled-blue?style=for-the-badge&logo=webrtc&logoColor=white" /> <img src="https://img.shields.io/badge/Socket.io-Real--time-black?style=for-the-badge&logo=socket.io&logoColor=white" /> <img src="https://img.shields.io/badge/React-Dynamic-61DAFB?style=for-the-badge&logo=react&logoColor=black" /> <img src="https://img.shields.io/badge/Node.js-Fast-339933?style=for-the-badge&logo=node.js&logoColor=white" /> </p>

🌐 Overview

Vidora is a full-stack video conferencing platform built using MongoDB, Express, React, and Node.js, with WebRTC for peer-to-peer streaming and Socket.io for real-time communication.
It allows users to host or join meetings, chat live, and share screens — all from the browser.

✨ Features

🎥 Multi-participant video calls — responsive grid layout that adapts to 1→N participants for smooth group meetings.

🔍 Camera preview / Pre-join screen — preview and set display name before entering a call.

🖥️ Screen sharing — share any tab/window using getDisplayMedia() for presentations and demos.

💬 In-call real-time chat — instant messaging inside the room, keeps conversation synced for all participants.

🕒 Meeting history — persistent records of joined rooms (code, host, timestamp) for easy audit and recall.

🔐 Authentication & sessions — signup / signin flow with session handling to protect user access.



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

### Pre-Join (camera preview)
![Pre Join](/Frontend/Vidora/Project_Screenshots/prejoin.jpg)

### Allow Cam/Mic (Camera permission / Mic permission)
| Camera Access | Mic Access |
|--------:|:-------|
| ![Camera permit](/Frontend/Vidora/Project_Screenshots/cam_mic_permissions.jpg) | ![Mic permit](/Frontend/Vidora/Project_Screenshots/mic_permission.jpg) |


### In-call Chat & Screen Share side-by-side
![Chat and Share](/Frontend/Vidora/Project_Screenshots/chat_and_share.jpg)


### Screen Sharing
![Screen Share](/Frontend/Vidora/Project_Screenshots/screenshare.jpg)


### Group Call (responsive grid)
![Group Call Grid](/Frontend/Vidora/Project_Screenshots/group_grid.jpg)


### Meeting History (single & list)

![History List](/Frontend/Vidora/Project_Screenshots/history_list.jpg)


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

![Project Structure](/Frontend/Vidora/Project_Screenshots/Setup.jpg)


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

# 🔧 Installation (Developer)

> Tested on Node 18+, npm 9+, MongoDB local.

```bash
# 1. Clone
git clone https://github.com/<your-username>/<repo>.git
cd <repo>

# 2. Backend
cd backend
cp .env.example .env
# edit .env (MONGO_URI, JWT_SECRET, PORT)
npm install
npm run dev         # or `npm start` depending on your scripts

# 3. Frontend
cd ../frontend
npm install
# put screenshots into ./screenshots (see mapping at project root)
npm run start       # opens http://localhost:5173 (or your configured port)
```


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
----------------------------------------------

🧪 How to test locally (quick)

Start backend, then frontend.

Open two separate browser windows (or different devices on the same network) and join the same room code — confirm you see each other's video.

Test screen share (Share Chrome Tab / Window) and watch for the browser sharing popup.

Use the chat box to exchange messages in the room.

Check History page — entries should appear when users join.

---------------------------------------------------------------------------------

## Developer Notes

- Some code paths use legacy `addStream`/`onaddstream` APIs. You may prefer `addTrack` / `ontrack` for new work.
- Files containing JSX should use `.jsx` extension to avoid esbuild/Vite parsing issues.

## Contributing

1. Fork the repository and create a feature branch.
2. Implement and test your changes.
3. Open a pull request with a clear description and testing steps.

<p align="center">Built by <b>Mansi More</b> • moremansi1707@gmail.com</p>



