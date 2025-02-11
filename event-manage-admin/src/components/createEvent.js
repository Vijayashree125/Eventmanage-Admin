import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import './createEvent.css';
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "./sidebar";

function CreateEvent() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const apiUrl = 'http://localhost:5000/';

    const navigate = useNavigate(); // Initialize navigation


    const onSubmit = async (data) => {
        try {
            const response = await axios.post(apiUrl + "admin/addEvent", data);
            if (response.data.status === true) {
                toast.success(response.data.message);
                reset();
                navigate("/listevents")
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Error submitting form");
        }
    };

    return (
        <div>
            <div className="app-container">
            <Sidebar/>
            <div class="container d-flex justify-content-center align-items-center vh-100">
            <div class="row w-100">
                <div class="col-md-6 col-sm-6 mx-auto">
                    <div class="card p-4 shadow-lg">
                                <h2 className="signup-title">Create Event</h2>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input
                                            type="text"
                                            {...register("title", { required: "Title is required" })}
                                            className="form-input"
                                        />
                                        {errors.title && <p className="error">{errors.title?.message}</p>}
                                    </div>

                                    <div className="form-group">
                                        <label>Description</label>
                                        <input
                                            type="text"
                                            {...register("description", {
                                                required: "Description is required",
                                            })}
                                            className="form-input"
                                        />
                                        {errors.description && <p className="error">{errors.description?.message}</p>}
                                    </div>

                                    <div className="form-group">
                                        <label>Location</label>
                                        <input
                                            type="text"
                                            {...register("location", {
                                                required: "Location is required",
                                            })}
                                            className="form-input"
                                        />
                                        {errors.location && <p className="error">{errors.location?.message}</p>}
                                    </div>

                                    <div className="form-group">
                                        <label>Date</label>
                                        <input
                                            type="datetime-local"
                                            {...register("date", {
                                                required: "Date is required",
                                            })}
                                            className="form-input"
                                        />
                                        {errors.date && <p className="error">{errors.date?.message}</p>}
                                    </div>

                                    <button type="submit" className="signup-button">Submit</button>
                                </form>
                            </div>
                        </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default CreateEvent;
