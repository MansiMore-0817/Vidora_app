import "./App.css";
import LandingPage from "./pages/landing";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Authentication from "./pages/authentication";
import SignUp from "./pages/signup";
import { AuthProvider } from "./contexts/AuthContext";
import VideoMeetComp from "./pages/VideoMeet";
import HomeComponent from "./pages/home";
import History from "./pages/history";



function App() {
  return (
    <>
      <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/:url" element={<VideoMeetComp />}/>
          <Route path="/home" element={<HomeComponent/>}/>
          <Route path="/history" element={<History/>}/>
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
