import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import ChatIcon from "@mui/icons-material/Chat";
import io from "socket.io-client";
import styles from "../styles/videoComponent.module.css";


// const server_url = "http://localhost:8000";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || window.location.origin;


var connections = {};

const peerConfigConnections = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

function VideoMeetComp() {
  const navigate = useNavigate();
  var socketRef = useRef();
  let socketIdRef = useRef();

  let localVideoRef = useRef();

  let [videoAvailable, setVideoAvailable] = useState(true);

  let [audioAvailable, setAudioAvailable] = useState(true);

  let [videoEnabled, setVideoEnabled] = useState(false);
  let [audioEnabled, setAudioEnabled] = useState(false);

  let [screen, setScreen] = useState(false);

  let [showModal, setShowModal] = useState(false);

  let [screenAvailable, setScreenAvailable] = useState();

  let [messages, setMessages] = useState([]);

  let [message, setMessage] = useState("");

  let [newMessages, setNewMessages] = useState(0);

  let [askForUsername, setAskForUsername] = useState(true);

  let [username, setUsername] = useState("");

  const connect = () => {
    if (!username || username.trim().length < 1) {
      alert("Please enter a username");
      return;
    }
    setVideoEnabled(videoAvailable);
    setAudioEnabled(audioAvailable);
    setAskForUsername(false);
    // Connect to the signaling server after a short delay to let state update
    setTimeout(() => {
      connectToSocketServer();
    }, 500);
  };

  const videoRef = useRef([]);
  const peerNamesRef = useRef({});

  let [videos, setVideos] = useState([]);

  // TODO: add a check to see if its chromium based browser
  // if(isChrome() === false){

  // }

  const getPermissions = async () => {
    try {
      const videoPermission = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoPermission) {
        setVideoAvailable(true);
      } else {
        setVideoAvailable(false);
      }

      const audioPermission = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      if (audioPermission) {
        setAudioAvailable(true);
      } else {
        setAudioAvailable(false);
      }

      if (navigator.mediaDevices.getDisplayMedia) {
        setScreenAvailable(true);
      } else {
        setScreenAvailable(false);
      }

      if (videoAvailable || audioAvailable) {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({
          video: videoAvailable,
          audio: audioAvailable,
        });
        if (userMediaStream) {
          window.localStream = userMediaStream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = userMediaStream;
          }
        }
      }
    } catch (err) {
      console.log("Error getting permissions: ", err);
    }
  };

  useEffect(() => {
    getPermissions();
  }, []);


  let silence = () => {
    let ctx = new AudioContext();
    let oscillator = ctx.createOscillator();

    let dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    ctx.resume();
    return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
  };

  let black = ({ width = 640, height = 480 } = {}) => {
    let canvas = Object.assign(document.createElement("canvas"), {
      width,
      height,
    });

    canvas.getContext("2d").fillRect(0, 0, width, height);
    let stream = canvas.captureStream();
    return Object.assign(stream.getVideoTracks()[0], { enabled: false });
  };

  let getUserMediaSuccess = (stream) => {
    try {
      window.localStream.getTracks().forEach((track) => {
        track.stop();
      });
    } catch (e) {
      console.log(e);
    }

    window.localStream = stream;
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }

    for (let id in connections) {
      if (id === socketIdRef.current) continue;
      connections[id].addStream(window.localStream);

      connections[id].createOffer().then((description) => {
        connections[id]
          .setLocalDescription(description)
          .then(() => {
            socketRef.current.emit(
              "signal",
              id,
              JSON.stringify({ sdp: connections[id].localDescription })
            );
          })
          .catch((e) => console.log(e));
      });
    }

    stream.getTracks().forEach((track) => {
      track.onended = () => {
        setVideoEnabled(false);
        setAudioEnabled(false);

        try {
          if (
            localVideoRef.current &&
            localVideoRef.current.srcObject &&
            typeof localVideoRef.current.srcObject.getTracks === "function"
          ) {
            let tracks = localVideoRef.current.srcObject.getTracks();
            tracks.forEach((t) => t.stop());
          }
        } catch (e) {
          console.log(e);
        }

        let blackSilence = (...args) =>
          new MediaStream([black(...args), silence()]);
        window.localStream = blackSilence();
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = window.localStream;
        }

        for (let id in connections) {
          connections[id].addStream(window.localStream);
          connections[id].createOffer().then((description) => {
            connections[id]
              .setLocalDescription(description)
              .then(() => {
                socketRef.current.emit(
                  "signal",
                  id,
                  JSON.stringify({ sdp: connections[id].localDescription })
                );
              })
              .catch((e) => console.log(e));
          });
        }
      };
    });
  };

  let getUserMedia = () => {
    if ((videoEnabled && videoAvailable) || (audioEnabled && audioAvailable)) {
      navigator.mediaDevices
        .getUserMedia({
          video: videoEnabled,
          audio: audioEnabled,
        })
        .then(getUserMediaSuccess) //TODO : get user media success
        .then((stream) => {})
        .catch((err) => {
          console.log(err);
        });
    } else {
      try {
        if (
          localVideoRef.current &&
          localVideoRef.current.srcObject &&
          typeof localVideoRef.current.srcObject.getTracks === "function"
        ) {
          let tracks = localVideoRef.current.srcObject.getTracks();
          tracks.forEach((track) => track.stop());
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (videoEnabled !== undefined && audioEnabled !== undefined) {
      getUserMedia();
    }
  }, [audioEnabled, videoEnabled]);

  // Screen share
  let getDisplayMediaSuccess = (stream) => {
    try {
      if (window.localStream) {
        window.localStream.getTracks().forEach((track) => track.stop());
      }
    } catch (e) {
      console.log(e);
    }

    window.localStream = stream;
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }

    for (let id in connections) {
      if (id === socketIdRef.current) continue;

      connections[id].addStream(window.localStream);

      connections[id].createOffer().then((description) => {
        connections[id]
          .setLocalDescription(description)
          .then(() => {
            socketRef.current.emit(
              "signal",
              id,
              JSON.stringify({ sdp: connections[id].localDescription })
            );
          })
          .catch((e) => console.log(e));
      });
    }

    stream.getTracks().forEach((track) => {
      track.onended = () => {
        setScreen(false);

        try {
          if (
            localVideoRef.current &&
            localVideoRef.current.srcObject &&
            typeof localVideoRef.current.srcObject.getTracks === "function"
          ) {
            let tracks = localVideoRef.current.srcObject.getTracks();
            tracks.forEach((t) => t.stop());
          }
        } catch (e) {
          console.log(e);
        }

        let blackSilence = (...args) =>
          new MediaStream([black(...args), silence()]);
        window.localStream = blackSilence();
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = window.localStream;
        }

        // Go back to camera/mic if enabled
        getUserMedia();
      };
    });
  };

  let getDisplayMedia = () => {
    if (screen) {
      if (navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices
          .getDisplayMedia({ video: true, audio: true })
          .then(getDisplayMediaSuccess)
          .then(() => {})
          .catch((e) => console.log(e));
      }
    } else {
      // Screen sharing turned off, revert to normal media
      getUserMedia();
    }
  };

  useEffect(() => {
    if (screen !== undefined) {
      getDisplayMedia();
    }
  }, [screen]);

  // TODO
  let gotMessageFromServer = (fromId, message) => {
    console.log("Received signal from", fromId, message);
    var signal = JSON.parse(message);

    if (fromId !== socketIdRef.current) {
      // Lazily create a peer connection if we receive a signal before "user-joined" handler sets it up
      if (!connections[fromId]) {
        console.log("Creating peer connection from signal for:", fromId);
        connections[fromId] = new RTCPeerConnection(peerConfigConnections);

        connections[fromId].onicecandidate = (event) => {
          if (event.candidate != null) {
            socketRef.current.emit(
              "signal",
              fromId,
              JSON.stringify({ ice: event.candidate })
            );
          }
        };

        connections[fromId].onaddstream = (event) => {
          console.log("Stream received (signal path) from:", fromId);
          let videoExist = videoRef.current.find(
            (video) => video.socketId === fromId
          );

          if (videoExist) {
            setVideos((videos) => {
              const updatedVideos = videos.map((video) => {
                return video.socketId === fromId
                  ? { ...video, stream: event.stream }
                  : video;
              });
              videoRef.current = updatedVideos;
              return updatedVideos;
            });
          } else {
            let newVideo = {
              socketId: fromId,
              stream: event.stream,
              autoPlay: true,
              playsInline: true,
              username: peerNamesRef.current[fromId] || "Guest",
            };

            setVideos((videos) => {
              const updatedVideos = [...videos, newVideo];
              videoRef.current = updatedVideos;
              console.log(
                "Added new video via signal:",
                fromId,
                "Total videos:",
                updatedVideos.length
              );
              return updatedVideos;
            });
          }
        };

        // Attach our local stream, if available, so answers/offers include our media
        if (window.localStream) {
          try {
            connections[fromId].addStream(window.localStream);
          } catch (e) {
            console.log("Error adding local stream in signal handler:", e);
          }
        }
      }

      if (signal.sdp) {
        connections[fromId]
          .setRemoteDescription(new RTCSessionDescription(signal.sdp))
          .then(() => {
            if (signal.sdp.type === "offer") {
              return connections[fromId].createAnswer();
            }
          })
          .then((description) => {
            if (!description) return;
            return connections[fromId].setLocalDescription(description);
          })
          .then(() => {
            if (signal.sdp.type === "offer") {
              socketRef.current.emit(
                "signal",
                fromId,
                JSON.stringify({ sdp: connections[fromId].localDescription })
              );
            }
          })
          .catch((e) => console.log("Error handling SDP signal:", e));
      }

      if (signal.ice) {
        connections[fromId]
          .addIceCandidate(new RTCIceCandidate(signal.ice))
          .catch((e) => console.log("Error adding ICE candidate:", e));
      }
    }
  };

  const addMessage = (data, sender, socketIdSender) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: sender, data: data },
    ]);
    if (socketIdSender !== socketIdRef.current) {
      setNewMessages((prevNewMessages) => prevNewMessages + 1);
    }
  };

  let connectToSocketServer = () => {
    socketRef.current = io(BACKEND_URL, {
      path: "/socket.io",
      transports: ["websocket", "polling"],
      withCredentials: true,
    });

    console.log("Attempting to connect to socket server:", BACKEND_URL);

    socketRef.current.on("signal", gotMessageFromServer);

    socketRef.current.on("connect", () => {
      console.log("Socket connected with ID:", socketRef.current.id);
      socketRef.current.emit("join-call", {
        path: window.location.href,
        username,
      });

      socketIdRef.current = socketRef.current.id;

      socketRef.current.on("chat-message", addMessage);

      socketRef.current.on("user-left", (id) => {
        console.log("User left:", id);
        setVideos((videos) => {
          return videos.filter((video) => video.socketId !== id);
        });
      });

      socketRef.current.on("user-joined", (id, clients, userNames) => {
        console.log("User joined:", id, "All clients:", clients);
        clients.forEach((socketListId) => {
          // Don't create a peer connection for our own socket here
          if (socketListId === socketIdRef.current) {
            return;
          }

          // Avoid recreating connections that already exist (e.g. another user joined)
          if (!connections[socketListId]) {
            console.log("Creating peer connection for:", socketListId);
            connections[socketListId] = new RTCPeerConnection(
              peerConfigConnections
            );
            if (userNames && userNames[socketListId]) {
              peerNamesRef.current[socketListId] = userNames[socketListId];
            }

            connections[socketListId].onicecandidate = (event) => {
              if (event.candidate != null) {
                socketRef.current.emit(
                  "signal",
                  socketListId,
                  JSON.stringify({ ice: event.candidate })
                );
              }
            };

            connections[socketListId].onaddstream = (event) => {
              console.log("Stream received from:", socketListId);
              let videoExist = videoRef.current.find(
                (video) => video.socketId === socketListId
              );

                if (videoExist) {
                setVideos((videos) => {
                  const updatedVideos = videos.map((video) => {
                    return video.socketId === socketListId
                      ? { ...video, stream: event.stream }
                      : video;
                  });
                  videoRef.current = updatedVideos;
                  return updatedVideos;
                });
                } else {
                let newVideo = {
                  socketId: socketListId,
                  stream: event.stream,
                  autoPlay: true,
                  playsInline: true,
                    username: peerNamesRef.current[socketListId] || "Guest",
                };

                setVideos((videos) => {
                  const updatedVideos = [...videos, newVideo];
                  videoRef.current = updatedVideos;
                  console.log(
                    "Added new video:",
                    socketListId,
                    "Total videos:",
                    updatedVideos.length
                  );
                  return updatedVideos;
                });
              }
            };
          }

          // Ensure each connection has our current local stream
          if (
            window.localStream !== undefined &&
            window.localStream !== null
          ) {
            try {
              console.log("Adding local stream to peer:", socketListId);
              connections[socketListId].addStream(window.localStream);
            } catch (e) {
              console.log("Error adding local stream to peer:", e);
            }
          } else {
            // Fallback to a black/silent stream if we don't have media yet
            let blackSilence = (...args) =>
              new MediaStream([black(...args), silence()]);
            window.localStream = blackSilence();
            connections[socketListId].addStream(window.localStream);
          }
        });

        // When this client is the one that just joined, create offers to all existing peers
        if (id === socketIdRef.current) {
          console.log("This is the current user, creating offers to all peers");
          for (let id2 in connections) {
            if (id2 === socketIdRef.current) continue;

            try {
              if (
                window.localStream &&
                !connections[id2].getSenders().length
              ) {
                connections[id2].addStream(window.localStream);
              }

              connections[id2]
                .createOffer()
                .then((description) => {
                  return connections[id2].setLocalDescription(description);
                })
                .then(() => {
                  socketRef.current.emit(
                    "signal",
                    id2,
                    JSON.stringify({ sdp: connections[id2].localDescription })
                  );
                })
                .catch((e) => {
                  console.log("Error creating/sending offer:", e);
                });
            } catch (e) {
              console.log("Error preparing offer for peer", id2, e);
            }
          }
        }
      });
    });

    socketRef.current.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socketRef.current.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  };

  // UI handlers
  let handleVideoToggle = () => {
    setVideoEnabled((prev) => !prev);
  };

  let handleAudioToggle = () => {
    setAudioEnabled((prev) => !prev);
  };

  let handleScreenToggle = () => {
    if (screenAvailable) {
      setScreen((prev) => !prev);
    }
  };

  let handleEndCall = () => {
    try {
      if (
        localVideoRef.current &&
        localVideoRef.current.srcObject &&
        typeof localVideoRef.current.srcObject.getTracks === "function"
      ) {
        let tracks = localVideoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    } catch (e) {
      console.log(e);
    }
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
    navigate("/home");
  };

  let handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  let sendMessage = () => {
    if (!message.trim()) return;
    if (!socketRef.current) return;
    socketRef.current.emit("chat-message", message, username);
    setMessage("");
  };

  return (
    <div className={styles.meetVideoContainer}>
      {askForUsername === true ? (
        <div className={styles.lobbyContent}>
          <div className={styles.lobbyCard}>
            <div className={styles.lobbyTitle}>Get ready to join your call</div>
            <div className={styles.lobbySubtitle}>
              Check your name and preview before entering the meeting.
            </div>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                gap: 1.5,
              }}
            >
              <TextField
                id="outlined-basic"
                label="Display name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
                sx={{
                  width: "100%",
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
                    backgroundColor: "transparent",
                  },
                  "& .MuiInputLabel-root": {
                    color: "#ffffff",
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
                variant="contained"
                onClick={connect}
                sx={{
                  mt: 1,
                backgroundColor: "#960fbc",
                  color: "#ffffff",
                  paddingX: 3,
                  paddingY: 1,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                  backgroundColor: "#7a0897",
                  },
                }}
              >
                Join meeting
              </Button>
            </Box>
          </div>

          <div className={styles.lobbyPreview}>
            <video ref={localVideoRef} autoPlay muted />
          </div>
        </div>
      ) : (
        <div className={styles.meetVideoContainer}>
          {/* Chat sidebar */}
          {showModal && (
            <div className={styles.chatRoom}>
              <div className={styles.chatContainer}>
                <div className={styles.chatHeader}>
                  <div>
                    <div className={styles.chatTitle}>Room chat</div>
                    <div className={styles.chatSubtitle}>
                      Talk with everyone in this call
                    </div>
                  </div>
                  <IconButton
                    size="small"
                    sx={{ color: "#960fbc" }}
                    onClick={() => setShowModal(false)}
                  >
                    ✕
                  </IconButton>
                </div>

                <div className={styles.messageList}>
                  {messages.length !== 0 ? (
                    messages.map((item, index) => {
                      const isOwn = item.sender === username;
                      return (
                        <div
                          key={index}
                          className={`${styles.messageRow} ${
                            isOwn ? styles.messageOwn : styles.messageOther
                          }`}
                        >
                          <div
                            className={`${styles.messageBubble} ${
                              isOwn ? styles.bubbleOwn : styles.bubbleOther
                            }`}
                          >
                            <div className={styles.messageSender}>
                              {isOwn ? "You" : item.sender}
                            </div>
                            <p className={styles.messageText}>{item.data}</p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className={styles.messageEmptyState}>
                      No messages yet. Start the conversation!
                    </div>
                  )}
                </div>

                <div className={styles.chattingArea}>
                  <TextField
                    value={message}
                    onChange={handleMessageChange}
                    id="chat-input"
                    label="Type a message"
                    variant="outlined"
                    size="small"
                    sx={{
                      mr: 1,
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "rgba(201, 196, 255, 0.4)",
                        },
                        "&:hover fieldset": {
                          borderColor: "#960fbc",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#960fbc",
                        },
                        backgroundColor: "rgba(5, 8, 30, 0.8)",
                      },
                      "& .MuiInputBase-input": {
                        color: "#f5f5ff",
                        fontSize: "0.85rem",
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(201, 196, 255, 0.7)",
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={sendMessage}
                    sx={{
                      backgroundColor: "#960fbc",
                      textTransform: "none",
                      boxShadow:
                        "0 8px 20px rgba(155, 93, 255, 0.45)",
                      "&:hover": {
                        backgroundColor: "#7a0897",
                        boxShadow:
                          "0 10px 26px rgba(155, 93, 255, 0.6)",
                      },
                    }}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Control buttons */}
          <div className={styles.buttonContainers}>
            <IconButton onClick={handleVideoToggle} sx={{ color: "white" }}>
              {videoEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
            </IconButton>

            <IconButton onClick={handleEndCall} sx={{ color: "red" }}>
              <CallEndIcon />
            </IconButton>

            <IconButton onClick={handleAudioToggle} sx={{ color: "white" }}>
              {audioEnabled ? <MicIcon /> : <MicOffIcon />}
            </IconButton>

            {screenAvailable && (
              <IconButton
                onClick={handleScreenToggle}
                sx={{ color: "white" }}
              >
                {screen ? <StopScreenShareIcon /> : <ScreenShareIcon />}
              </IconButton>
            )}

            <Badge badgeContent={newMessages} max={999} color="secondary">
              <IconButton
                onClick={() => {
                  setShowModal((prev) => !prev);
                  setNewMessages(0);
                }}
                sx={{ color: "white" }}
              >
                <ChatIcon />
              </IconButton>
            </Badge>
          </div>

          {/* Local video */}
          <div className={styles.localVideoWrapper}>
            <video
              className={styles.meetUserVideo}
              ref={localVideoRef}
              autoPlay
              muted
            />
            <div className={styles.videoNameTag}>
              {username || "You"}
            </div>
          </div>

          {/* Remote videos */}
          <div className={styles.conferenceView}>
            {videos.map((video) => (
              <div key={video.socketId} className={styles.remoteVideoTile}>
                <video
                  data-socket={video.socketId}
                  ref={(ref) => {
                    if (ref && video.stream) {
                      ref.srcObject = video.stream;
                    }
                  }}
                  autoPlay
                  playsInline
                />
                <div className={styles.videoNameTag}>
                  {video.username || "Guest"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoMeetComp;







