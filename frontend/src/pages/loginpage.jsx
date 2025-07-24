import { useState } from 'react'
import { Eye, EyeOff, Loader2 } from 'lucide-react' 
import { useAuthStore } from '../store/userAuthStore';
import Username from '../components/input/username';
import Password from '../components/input/password';


function Loginpage() {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });


  const [showPassword, setShowPassword] = useState(false);
  const {signup, isSigninup} = useAuthStore();
  let validateForm;

  const toggleShowPassword = ()=>{
    setShowPassword(showPassword => !showPassword)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
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
        <h1 className='font-bold font-serif text-3xl '>LOGIN !</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex space-y-3 flex-col'>
            <Username onChange={handleChange} value={formData.username} name={"username"}/>

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
            <button type='submit' className="btn btn-success w-full" disabled={isSigninup}>Login !</button>
          </div>
          {isSigninup ? <Loader2>loading...</Loader2>: <a href="/signup" className='underline text-blue-900 mt-2'> Signup</a>}
        </form>
        
      </div>
    </div>
  )
}

export default Loginpage
