import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./sidebar";
const apiUrl = 'http://localhost:5000/';

function AdminDashboard() {
    const [admin, setadmin] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;
    useEffect(() => {
        const adminId = localStorage.getItem("adminId")
        axios.post(apiUrl + `admin/adminLogHis/${adminId}?page=${page}&limit=${limit}`)
            .then(response => {
                setadmin(response.data.data);
                setTotalPages(response.data.totalCount);
            })
            .catch(error => console.error("Error fetching admin:", error));
    }, [page]);



    return (
        <div>
            <div className="app-container">
                <Sidebar />
                <div className="content">
                    <div className="row">
                        <h5>Admin Login History</h5>
                        <hr></hr>
                        <table className="table table-hover mt-2">
                            <thead>
                                <tr>
                                <th scope="col">S.no</th>
                                    <th scope="col">Admin ID</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Ip Address
                                    </th>
                                    <th scope="col">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admin.length > 0 ? (
                                    admin.map((admin, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{admin.adminId}</td>
                                            <td>{admin.type}</td>
                                            <td>{admin.ip === "::1" ? "127.0.0.1" : admin.ip}</td>
                                            <td> {new Date(admin.createdAt).toLocaleDateString("en-US", {
                                                day: "2-digit",
                                                month: "short", // "Feb"
                                                year: "numeric",
                                                hour: "2-digit",  // "08"
                                                minute: "2-digit",
                                            })}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No admin found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
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
export default AdminDashboard;
