import React, { useState, useEffect } from 'react';
import { useHistory, useParams, } from "react-router-dom";
import ApiCall from '../Services/ApiCall';
import Navbar from './Navbar';

const EditPage = () => {

    const [preValue, setPrevFunc] = useState({
        firstName: "",
        lastName: "",
        age: "",
        email: "",
        address: "",
        mobile: "",
        fees: ""
    })
    const[error,setError]=useState("");
    const history = useHistory();

    const { id } = useParams('');

    const getPrevDetails = () => {
        ApiCall.getStudentUsingId(id)
            .then((res) => {
                setPrevFunc(res.data);
            })
            .catch((error) => {
                if (error.response.status === 401) history.push("/login");
                console.log(error.response.data);
            })
    }

    const setData = (e) => {
        const { name, value } = e.target;
        setPrevFunc((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    useEffect(() => {
        getPrevDetails();
    }, [])

    const update = (e) => {
        e.preventDefault();
        ApiCall.editStudent(id, preValue)
            .then((res) => {
                setError("");
                history.push("/")
            })
            .catch((error) => {
                if(error.response.status>=400 && error.response.status<=500){
                    setError(error.response.data.message)
                }
                // if (error.response.status === 403) alert(error.response.data);
            })
    }

    return (
        <>
            <Navbar />
            <div className='container mt-4'>
                <form>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input onChange={setData} value={preValue.firstName} type="text" className="form-control" name="firstName" id="firstName" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input onChange={setData} value={preValue.lastName} type="text" className="form-control" name="lastName" id="lastName" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input onChange={setData} value={preValue.age} type="number" className="form-control" name="age" id="age" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input onChange={setData} value={preValue.email} type="email" className="form-control" name="email" id="email" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input onChange={setData} value={preValue.address} type="text" className="form-control" name="address" id="address" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="mobile" className="form-label">Mobile</label>
                        <input onChange={setData} value={preValue.mobile} type="text" className="form-control" name="mobile" id="mobile" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="fees" className="form-label">Fees</label>
                        <input onChange={setData} value={preValue.fees} type="number" step=".01" className="form-control" name="fees" id="fees" />
                    </div>

                    {error &&
                        <div className="mb-3 bg-danger">
                            <p className='text-white text-center'>{error}</p>
                        </div>
                    }

                    <button onClick={update} type="submit" className="btn btn-success">Submit</button>
                </form>

            </div>
        </>
    )
}

export default EditPage
