import React, { use, useEffect } from 'react'
import { useState } from 'react'
import { useAuthStore } from '../store/userAuthStore';
import Password from '../components/input/password';
import Username from '../components/input/username';
import Email from '../components/input/email';
import { Eye, EyeOff } from 'lucide-react';

function Signup() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });


  const [showPassword, setShowPassword] = useState(false);
  const {signup, isSigninup} = useAuthStore();

  const toggleShowPassword = ()=>{
    setShowPassword(showPassword => !showPassword)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    signup(formData);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className='flex justify-center items-center m-auto w-3xl'>
      <div className='bg-gray-300 flex flex-col gap-4 p-8 rounded-2xl shadow-md w-full items-center max-w-md mt-60'>
        <h1 className='font-bold font-serif text-3xl '>SIGNUP NOW !</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex space-y-3 flex-col'>
            <Username onChange={handleChange} value={formData.username} name={"username"}/>
            <Email onChange={handleChange} value={formData.email} name={"email"}/>

            
            <div className='flex flex-row gap-2 items-center justify-center'>
              <Password onChange={handleChange} value={formData.password} name={"password"} showpassword={showPassword}/>
              
              {showPassword ? <button onClick={toggleShowPassword} className='transition-all'>
                <Eye size={18}/>
              </button> : <button className='transition-all' onClick={toggleShowPassword}>
                <EyeOff size={18} />
              </button> }
            </div>
            
          </div>
          <div className='flex flex-row gap-3 mt-4'>
            <button type='submit' className="btn btn-success w-full" disabled={isSigninup}>Signup !</button>
          </div>
          {isSigninup ? <Loader2>loading...</Loader2>: <a href="/login" className='underline text-blue-900 mt-2'> Login </a>}
        </form>
        
      </div>
    </div>
  )
}

export default Signup