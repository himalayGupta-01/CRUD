import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import ApiCall from '../Services/ApiCall';
import Navbar from './Navbar';

const Home = () => {

    const [allStudents, setStudents] = useState([]);
    
    const history = useHistory();
    const gettingData = () => {
        ApiCall.getAllStudent()
            .then((res) => {
                setStudents(res.data);
            })
            .catch((err) => {

                if(err.response.status>=400 && err.response.status<500){
                    console.log(err.response.data.message)
                    history.push("/login")
                }
            })

    }

    useEffect(async () => {
        gettingData();

    },[]);


    return (
        <>
            <Navbar />
            <div className="mt-5">
                <div className="container">
                    <div className="myaddBTN my-2">
                        <NavLink to='/addStudent' className="btn btn-primary">Add Student</NavLink>
                    </div>
                    <table className="table ">
                        <thead className='bg-dark'>
                            <tr>
                                <th scope="col" className='opt text-white'>S.No</th>
                                <th scope="col" className='opt text-white'>First Name</th>
                                <th scope="col" className='opt text-white'>Last Name</th>
                                <th scope="col" className='opt text-white'>Email</th>
                                <th scope="col" className="opt text-white">Operations</th>
                            </tr>
                        </thead>
                        <tbody>

                            {allStudents.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <th className='opt' scope="row">{index + 1}</th>
                                        <td className='opt'>{value.firstName}</td>
                                        <td className='opt'>{value.lastName}</td>
                                        <td className='opt'>{value.email}</td>
                                        <td className='d-flex justify-content-between'>
                                            <NavLink to={`details/${value.id}`} className="btn btn-success">View</NavLink>
                                            <NavLink to={`UpdateStudent/${value.id}`} className="btn btn-warning">Update</NavLink>
                                            <NavLink to={`deleteStudent/${value.id}`} className="btn btn-danger">Delete</NavLink>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Home
