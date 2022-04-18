import React, { useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import LoginCall from '../Services/LoginCall';
const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const history = useHistory();
    const loginUser = (e) => {
        e.preventDefault();
        LoginCall.login({ email: email, password: password })
            .then((result) => {
                if (result.data.message) {
                    // alert("Login SuccessFull");
                    history.push("/")
                }
            })
            .catch((error) => {
                console.log(error);

                if(error.response.status>=400 && error.response.status<=500){
                    setError(error.response.data.message);
                }
            })
    }

    

    useEffect(() => {
        async function doLogout(){
            await LoginCall.logout().then((result => { console.log(result.data.message) }))
        }
        doLogout();
    },[])
    return (
        <>
            <div className='container card mt-5 w-50'>
                <h1 className='text-primary text-center'>Enter Your Credentials</h1>
                <form className='card-body'>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" onChange={(e) => { setEmail(e.target.value) }} value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" onChange={(e) => { setPassword(e.target.value) }} value={password} className="form-control" id="exampleInputPassword1" />
                    </div>
                    {error &&
                        <div className="mb-3 bg-danger">
                            <p className='text-white text-center'>{error}</p>
                        </div>
                    }
                    <button type="submit" onClick={loginUser} className="btn btn-success">Login</button>
                    <br />

                    <div className='mt-2'>
                        <NavLink to="/register" className="text-primary ">Don't have a account? Register Now</NavLink>
                    </div>
                </form>
            </div>
        </>

    )
}

export default Login
