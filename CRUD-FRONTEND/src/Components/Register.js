import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';
import LoginCall from '../Services/LoginCall';

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError]=useState("");


    const history = useHistory();

    const registerUser=(e)=>{
        e.preventDefault();
        LoginCall.register({ name:name, email: email, password: password })
        .then((result)=>{
            setError("");
            history.push("/")
        })
        .catch((error) => {
            if(error.response.status>=400 && error.response.status<=500){
                setError(error.response.data.message);
            }

        })
    }

    return (
        <>
        <div className='container card mt-5 w-50'>
        <h1 className='text-primary text-center'>Enter Required Fields</h1>
                <form className='card-body'>
                <div className="mb-3">
                        <label for="name" className="form-label">Name</label>
                        <input id="name" type="string" onChange={(e) => { setName(e.target.value) }} value={name} className="form-control"/>
                    </div>
                    <div className="mb-3">
                        <label for="email" className="form-label">Email address</label>
                        <input id="email" type="email" onChange={(e) => { setEmail(e.target.value) }} value={email} className="form-control" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label">Password</label>
                        <input id="password" type="password" onChange={(e) => { setPassword(e.target.value) }} value={password} className="form-control"  />
                    </div>
                    {error &&
                        <div className="mb-3 bg-danger">
                            <p className='text-white text-center'>{error}</p>
                        </div>
                    }
                    <button type="submit" onClick={registerUser} className="btn btn-success">Register</button>
                    <br />
                </form>
            </div>
        </>
    )
}

export default Register
