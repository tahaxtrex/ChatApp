import React, { use } from 'react'
import { useState } from 'react'
import { useAuthStore } from '../store/userAuthStore';
import Password from '../components/input/password';
import Username from '../components/input/username';
import Email from '../components/input/email';

function Signup() {

  const [showPassword, setShowPassword] = useState(false);
  const {signup, isSigninup} = useAuthStore();
  let validateForm;
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className='flex justify-center items-center m-auto w-3xl'>
      <div className='bg-white flex flex-col gap-4 p-8 rounded-2xl shadow-md w-full max-w-md'>
        <Username/>
        <Email/>
        <Password/>
      </div>
    </div>
  )
}

export default Signup