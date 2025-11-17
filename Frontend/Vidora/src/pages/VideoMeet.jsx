import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "../styles/videoComponent.css";

const server_url = "http://localhost:8000";

var connections = {};

const peerConfigConnections = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

function VideoMeetComp() {
  var socketRef = useRef();
  let socketIdRef = useRef();

  let localVideoRef = useRef();

  let [videoAvailable, setVideoAvailable] = useState(true);

  let [audioAvailable, setAudioAvailable] = useState(true);

  let [video, setVideo] = useState([]);
  let [audio, setAudio] = useState();

  let [screen, setScreen] = useState();

  let [showModal, setShowModal] = useState();

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
    setAskForUsername(false);
  };

  const videoRef = useRef([]);

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

  let getUserMediaSuccess = (stream) => {};

  let getUserMedia = () => {
    if ((video && videoAvailable) || (audio && audioAvailable)) {
      navigator.mediaDevices
        .getUserMedia({
          video: video,
          audio: audio,
        })
        .then(getUserMediaSuccess) //TODO : get user media success
        .then((stream) => {})
        .catch((err) => {
          console.log(err);
        });
    } else {
      try {
        let tracks = localVideoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      } catch (e) {}
    }
  };

  useEffect(() => {
    if (video !== undefined && audio !== undefined) {
      getUserMedia();
    }
  }, [audio, video]);

  // TODO
  let gotMessageFromServer = (fromId, message) => {};

  // TODO
  let addMessage = () => {};

  let connectToSocketServer = () => {
    socketRef.current = new WebSocket(server_url, { secure: false });

    socketRef.current.on("signal", gotMessageFromServer);

    socketRef.current.on("connect", () => {
      socketRef.current.emit("join-call", window.location.href);

      socketIdRef.current = socketRef.current.id;

      socketRef.current.on("chat-message", addMessage);

      socketRef.current.on("user-left", (id) => {
        setVideo((videos) => {
          videos.filter((video) => video.socketId !== id);
        });

        socketRef.current.on("user-joined", (id, clients) => {
          clients.forEach((socketListId) => {
            connections[socketListId] = new RTCPeerConnection(
              peerConfigConnections
            );

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
              let videoExist = videoRef.current.find(
                (video) => video.socketId === socketListId
              );

              if (videoExist) {
                setVideo((videos) => {
                  const updatedVideos = videos.map((video) => {
                    video.socketId === socketListId
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
                };

                setVideo((videos) => {
                  const updatedVideos = [...videos, newVideo];
                  videoRef.current = updatedVideos;
                  return updatedVideos;
                });
              }
            };

            if (
              window.localStream !== undefined &&
              window.localStream !== null
            ) {
              connections[socketListId].addStream(window.localStream);
            } else {
              // TODO BlackSilence
            }
          });

          if (id === socketIdRef.current) {
            for (let id2 in connections) {
              if (id2 === socketIdRef.current) continue;

              try {
                connections[id2].addStream(window.localStream);
              } catch (e) {}
              connections[id2].createOffer().then((description) => {
                connections[id2].setLocalDescription(description).then(() => {
                  socketRef.current
                    .emit(
                      "signal",
                      id2,
                      JSON.stringify({ sdp: connections[id2].localDescription })
                    )
                    .catch((e) => {
                      console.log(e);
                    });
                });
              });
            }
          }
        });
      });
    });
  };

  let getMedia = () => {
    setVideo(videoAvailable);
    setAudio(audioAvailable);
  };

  return (
    <div>
      {askForUsername === true ? (
        <div>
          <h2 style={{ textAlign: "center", marginBottom: 12 }}>
            Enter into lobby
          </h2>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <TextField
              id="outlined-basic"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
              sx={{
                width: 320,
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
                "&:hover": {
                  backgroundColor: "#7a0897",
                },
              }}
            >
              Connect
            </Button>
          </Box>
          <div>
            <video ref={localVideoRef} autoPlay muted></video>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default VideoMeetComp;
