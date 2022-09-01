import { createContext, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import About from "./components/About";
import Login from "./components/Login";
import PostResume from "./components/PostResume";
import Navbar from "./components/Navbar";
import RateResume from "./components/RateResume";
import TopFive from "./components/TopFive";


export const data = createContext();

function App() {
  const [loggedIn, setLoggedin] = useState(false);
  const [filebase64,setFileBase64] = useState("")
  const [userInfo,setUserInfo] = useState('')
  const [id,setID] = useState('')
  const [output,setOutput]=useState([])
  const [input,setInput]=useState([])


  return (
    <data.Provider value={{input,setInput, output,setOutput, loggedIn, setLoggedin,setFileBase64,filebase64,userInfo,setUserInfo,id,setID }}>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <>
                <About />
                <Login />
              </>
            }
          />
          <Route
            path="post"
            element={
              <>
                <Navbar />
                <br />
                <PostResume />
              </>
            }
          />
          <Route path='score' element={<><Navbar/><RateResume/></>}/>
          <Route path='topfive' element={<><Navbar/><TopFive/></>}/>
        </Routes>
      </BrowserRouter>
    </data.Provider>
  );
}

export default App;
