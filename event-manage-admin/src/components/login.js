import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './login.css';
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

function LoginPage() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const apiUrl = 'http://localhost:5000/';

    const navigate = useNavigate(); // Initialize navigation


    const onSubmit = async (data) => {
        try {
            const response = await axios.post(apiUrl + "admin/adminLogin", data);
            console.log(response);
            if (response.data.status === true) {
                localStorage.setItem("authToken", response.data.data.authToken);
                localStorage.setItem("adminId", response.data.data.adminId)
                toast.success(response.data.message);
                reset();
                navigate("/dashboard")
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Error submitting form");
        }
    };

    return (
        <div class="container d-flex justify-content-center align-items-center vh-100">
            <div class="row w-100">
                <div class="col-md-6 col-sm-6 mx-auto">
                    <div class="card p-4 shadow-lg">
                        <h3 class="text-center">Login</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div id="form-group">
                                <div className="input-group">
                                    <label>Email Address:</label>
                                    <input type="email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: { value: /^\S+@\S+$/, message: "Invalid email format" },
                                        })}
                                        className="form-input"
                                    />
                                    {errors.email && <p className="error">{errors.email.message}</p>}
                                </div>

                                <div className="input-group">
                                    <label>Password:</label>
                                    <input
                                        type="password"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: { value: 6, message: "At least 6 characters" },
                                        })}
                                        className="form-input"
                                    />
                                    {errors.password && <p className="error">{errors.password.message}</p>}
                                </div>

                                <button type="submit" class="btn btn-success w-100 mt-3">Submit</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
