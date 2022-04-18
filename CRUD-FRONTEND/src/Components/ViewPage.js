import React, { useState, useEffect } from 'react'
import ApiCall from '../Services/ApiCall';
import { useParams } from "react-router-dom";
import { NavLink, useHistory } from 'react-router-dom';
import Navbar from './Navbar';

const ViewPage = () => {

    const [stu, setStu] = useState({});
    const { id } = useParams("");
    const history = useHistory();
    const getStu = () => {
        try {
            ApiCall.getStudentUsingId(id).then((res) => {
                setStu(res.data);
            })
                .catch((error) => {
                    if (error.response.status === 401) history.push("/login");
                })
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getStu();
    },[])



    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <h1>Welcome {stu.firstName + " " + stu.lastName}</h1>
                <div className="card">
                    <div className="d-flex flex-column justify-content-between card-body mb-0">
                        <h5 className="card-title">Your Personal Info</h5>
                        <div className="d-flex">
                            <NavLink to={`../UpdateStudent/${stu.id}`} className="mx-2 btn btn-warning">Update</NavLink>
                            <NavLink to={`../deleteStudent/${stu.id}`} className="mx-2 btn btn-danger">Delete</NavLink>
                            {/* <NavLink to={`../UpdateStudent/${stu._id}`} className="mx-2 btn btn-warning">Update</NavLink>
                            <NavLink to={`../deleteStudent/${stu._id}`} className="mx-2 btn btn-danger">Delete</NavLink> */}
                        </div>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><b>Age:</b> {stu.age}</li>
                        <li className="list-group-item"><b>Email:</b> {stu.email}</li>
                        <li className="list-group-item"><b>Address:</b> {stu.address}</li>
                        <li className="list-group-item"><b>Mobile:</b> {stu.mobile}</li>
                        <li className="list-group-item"><b>Fees:</b> Rs.{stu.fees}</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ViewPage
