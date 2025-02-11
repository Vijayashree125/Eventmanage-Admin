import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import axios from "axios";
import Sidebar from "./sidebar";
const apiUrl = 'http://localhost:5000/';

function UserList() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;
    useEffect(() => {
        axios.get(apiUrl + `admin/getUserdetails/?page=${page}&limit=${limit}`)
            .then(response => {
                setUsers(response.data.data);
                setTotalPages(response.data.totalCount);
            })
            .catch(error => console.error("Error fetching users:", error));
    }, [page]);

    return (
        <div>
            <div className="app-container">
                <Sidebar />
                <div className="content">
                    <div className="row">
                        <h5>Users List</h5>
                        <hr></hr>
                        <table className="table table-hover mt-2">
                            <thead>
                                <tr>
                                    <th scope="col">S.no</th>
                                    <th scope="col">User ID</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">EmailId</th>
                                    <th scope="col">Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((user, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{user._id}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td> {new Date(user.createdAt).toLocaleDateString("en-US", {
                                                day: "2-digit",
                                                month: "short", // "Feb"
                                                year: "numeric",
                                                hour: "2-digit",  // "08"
                                                minute: "2-digit", // "31"
                                            })}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4"><span className="text-center">No users found</span></td>                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {/* Pagination Buttons */}

                    </div>
                    <div>
                        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                            Prev
                        </button>
                        <span> Page {page} of {totalPages} </span>
                        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div >

    );
}
export default UserList;
