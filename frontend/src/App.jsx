import React,{useState,useEffect} from 'react'

import {BrowserRouter,Routes,Route} from "react-router-dom"

import NavBar from "./Components/NavBar.jsx"
import Feed from "./Pages/Feed.jsx"
import SavedPost from "./Pages/SavedPost.jsx" 
import Auth from "./Pages/Auth.jsx"
import Profile from "./Pages/Profile.jsx"


export default function App() {

  let [user,setUser] = useState(null);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if(user)
    {
      setUser(user);
    }
  }, [])

  return (
    <div>
      <BrowserRouter>
        <NavBar user={user} />
        <Routes>
          <Route path="/" element={<Feed/>}/>
          <Route path="/saved" element={<SavedPost/>}/>
          <Route path="/auth" element={<Auth setUser={setUser} />}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
