import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ApiCall from '../Services/ApiCall';
import Navbar from './Navbar';

const DeletePage = () => {
    const [stu, setStu] = useState({});

    const { id } = useParams("");
    const history = useHistory();

    const getData = () => {
        try {
            ApiCall.getStudentUsingId(id).then((res) => {
                setStu(res.data);
            })
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getData();
    },[])

    const deleteStudent = (e) => {
        e.preventDefault();
        ApiCall.deleteStudent(id).then((res) => {
            history.push("/");
        }).catch((error) => {
            if (error.response.status === 401) history.push("/login");
        })

    }

    const goBack = () => {
        history.push("/");
    }

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <h1>Are You Sure??</h1>
                <div className="card">
                    <div className="d-flex flex-column justify-content-between card-body mb-0">
                        <h5 className="card-title">You want to delete the data of {stu.firstName + " " + stu.lastName}</h5>
                        <div className='d-flex'>
                            <button onClick={deleteStudent} className="mx-2 btn btn-danger">Yes</button>
                            <button onClick={goBack} className="mx-2 btn btn-primary">No</button>
                        </div>
                    </div>
                    <p className="py-0 card-body text-danger font-weight-bold"><b>You will Permanently loose the following data!!</b></p>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><b>FirstName:</b> {stu.firstName}</li>
                        <li className="list-group-item"><b>Lastname:</b> {stu.lastName}</li>
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

export default DeletePage
