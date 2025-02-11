import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa"; // Import icons
import { FaTrash } from "react-icons/fa"; // Import icons
import axios from "axios";
import Sidebar from "./sidebar";
import { toast } from "react-toastify";
const apiUrl = 'http://localhost:5000/';

function EventList() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(apiUrl + `admin/getAllEvent/?page=${page}&limit=${limit}`)
            .then(response => {
                setUsers(response.data.data);
                setTotalPages(response.data.totalCount);
            })
            .catch(error => console.error("Error fetching users:", error));
    }, [page]);

    const handleEdit = (title) => {
        console.log("Edit user with ID:", title);
        navigate(`/updateEvent/${title}`)
    };

    const showModal = async (title) => {
        await axios.get(apiUrl + `admin/getAllEvent/?page=${page}&limit=${limit}`)
            .then(res => {
                console.log(res.data.data)
                localStorage.setItem("title", res.data.data[0].title)
            })
    }

    const eventtitle = localStorage.getItem("title")
    const eventDelete = async (eventtitle) => {
        await axios.post(apiUrl + 'admin/deleteEvent', { title:eventtitle })
            .then(res => {
                if (res.data.status === true) {
                    toast.success(res.data.message);
                }
                else {
                    toast.error(res.data.message);
                }
            })
    }

    return (
        <div>
            <div className="app-container">
                <Sidebar />
                <div className="content">
                    <div className="row">
                        <h5>All Event List</h5>
                        <hr></hr>
                        <table className="table table-hover mt-2">
                            <thead>
                                <tr>
                                    <th scope="col">S.no</th>
                                    <th scope="col">Event Title</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Venue</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((user, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{user.title}</td>
                                            <td>{user.description}</td>
                                            <td>{user.location}</td>
                                            <td> {new Date(user.date).toLocaleDateString("en-US", {
                                                day: "2-digit",
                                                month: "short", // "Feb"
                                                year: "numeric",
                                                hour: "2-digit",  // "08"
                                                minute: "2-digit", // "31"
                                            })}</td>
                                            <td>
                                                <FaEdit
                                                    onClick={() => handleEdit(user.title)}
                                                    style={{ cursor: "pointer", color: "green" }}
                                                />&nbsp;&nbsp;
                                                <FaTrash
                                                    data-bs-toggle="modal" data-bs-target="#myModal"
                                                    onClick={() => showModal(user.title)}
                                                    style={{ cursor: "pointer", marginRight: "10px", color: "red" }}
                                                />
                                            </td>
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
                <div class="modal fade" id="myModal" data-bs-backdrop="static">
                    <div class="modal-dialog" style={{ width: "700px" }}>
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Delete Confirmation</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>``
                            <div class="modal-body text-center">
                                <p class="text-center"><b>Are you sure you want to delete this event?</b></p>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={(e) => eventDelete(eventtitle)}>Delete</button>
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div >

    );
}
export default EventList;
