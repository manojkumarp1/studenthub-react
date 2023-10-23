import React, {useState} from "react";
import axios from 'axios';
import SignupAuth from "../Auth/SignupAuth";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Signup.css'

function Signup(){

    const [values, setValues] = useState({
        firstname: '',
        lastname:'',
        dob:'',
        email:'',
        phone:'',
	    password:'',
	    confirmpassword:''

    })
    const navigate = useNavigate()

    const [errors, setError] = useState('')

    const handleInput = (event)=> {
        setValues(prev => ({...prev,[event.target.name]: [event.target.value]}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(SignupAuth(values));
        if(errors.firstname === "" && errors.lastname === ""  && errors.dob === "" && errors.email === "" && errors.phone === "" && errors.password === ""){
            axios.post('http://localhost:8081/signup',values)
            .then(res=>{
                navigate("/login");
            })
            .catch(err=>console.log(err));
        }
    }
    return(
        <>
        <div className='d-flex justify-content-center align-items-center p-4 w-100 signupHead'>
        <strong>Register</strong>
        </div>
        <br/>
        <div className='d-flex justify-content-center align-items-center vh-90 SignupPage'>
                <div className='p-1 rounded w-25 signupForm'>
                    <form onSubmit={handleSubmit}>




                        <div className='mb-3'>
                            <input type="text" id="firstname" placeholder='Enter First Name' name='firstname'
                            onChange={handleInput} className='form-control rounded-0' autoComplete='off'/>
                            {errors.firstname && <span className='text-danger'>{errors.firstname}</span>}
                        </div>
                        <div className='mb-3'>
                            <input type="text" id="lastname" placeholder='Enter Last Name' name='lastname'
                            onChange={handleInput} className='form-control rounded-0' autoComplete='off'/>
                            {errors.lastname && <span className='text-danger'>{errors.lastname}</span>}
                        </div>
                        <div className='mb-3'>
                            <input type="text" id="dob" placeholder='Enter Date of Birth' name='dob'
                            onChange={handleInput} className='form-control rounded-0' autoComplete='off'/>
                            {errors.dob && <span className='text-danger'>{errors.dob}</span>}
                        </div>
                        <div className='mb-3'>
                            <input type="email" id="email" placeholder='Enter email' name='email'
                            onChange={handleInput} className='form-control rounded-0' autoComplete='off'/>
                            {errors.email && <span className='text-danger'>{errors.email}</span>}
                        </div>
                        <div className='mb-3'>
                            <input type="text" id="phone" placeholder='Enter Mobile number' name='phone'
                            onChange={handleInput} className='form-control rounded-0' autoComplete='off'/>
                            {errors.phone && <span className='text-danger'>{errors.phone}</span>}
                        </div>
                        <div className='mb-3'>
                            <input type="password" id="password" placeholder='Password' name='password'
                            onChange={handleInput} className='form-control rounded-0' />
                            {errors.password && <span className='text-danger'>{errors.password}</span>}
                        </div>
                        <div className='mb-3'>
                            <input type="password" id="confirmPassword" placeholder='Confirm Password' name='confirmPassword'
                            onChange={handleInput} className='form-control rounded-0' />
                            {errors.confirmpassword && <span className='text-danger'>{errors.confirmpassword}</span>}
                        </div>




                        <div>
                            <div className='col'>
                                <button type='submit' id="loginButton" className='btn btn-success w-100 rounded-0'> Submit</button>
                            </div>
                            <div className='d-flex justify-content-center'>
                               <p>Already an user?</p>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <Link to='/login' type="button" id='signupLink' className="btn btn-primary rounded-0"> Login </Link>
                            </div>
                            <Outlet/>
                        </div> 
                    </form>
                </div>
        </div>
    </>
    )
}

export default Signup