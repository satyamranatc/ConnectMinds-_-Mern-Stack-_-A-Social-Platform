import React from 'react'
import axios from 'axios'

export default function Auth({setUser}) {

    async function handleSubmit(e) {
        e.preventDefault();
        let data = {
            email:e.target.email.value,
            password:e.target.password.value
        }

        let res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,data);
        if(res.data.user)
        {
            setUser(res.data.user);
            localStorage.setItem("user",JSON.stringify(res.data.user));
        }
        else{
            alert(res.data.message);
        }
        console.log(res.data);
        
    }

  return (
    <div>
        <div className="bg-slate-50 shadow-2xl ">
            <form onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder='Enter your email'/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder='Enter your password'/>
                </div>
                <button className='bg-red-500 text-white px-4 py-2 rounded' >Login</button>
            </form>

        </div>
    </div>
  )
}
