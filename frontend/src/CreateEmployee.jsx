import React, { useState } from 'react';
import axios from 'axios';

const CreateEmployee = () => {
    // State to hold form input values
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // success or error

    // Handle input changes
    const handleInputChanges = (e) => {
        const { name, value } = e.target;
        setEmployee({
            ...employee,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/employees', employee);
            setMessage('Employee Created Successfully!');
            setMessageType('success');
            setEmployee({ firstName: '', lastName: '', email: '' }); // Reset form
        } catch (error) {
            setMessage('Error creating employee. Please try again.');
            setMessageType('danger');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg">
                        <div className="card-header bg-primary text-white text-center">
                            <h2>Create New Employee</h2>
                        </div>
                        <div className="card-body">
                            {message && (
                                <div className={`alert alert-${messageType} text-center`} role="alert">
                                    {message}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className="form-control"
                                        value={employee.firstName}
                                        onChange={handleInputChanges}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        className="form-control"
                                        value={employee.lastName}
                                        onChange={handleInputChanges}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={employee.email}
                                        onChange={handleInputChanges}
                                        required
                                    />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary btn-lg">
                                        Create Employee
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEmployee;
