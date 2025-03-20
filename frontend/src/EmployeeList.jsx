import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateEmployee from './UpdateEmployee';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/employees");
            setEmployees(response.data);
        } catch (err) {
            setError("Error fetching employee data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const updateEmployee = (employeeId) => {
        setSelectedEmployeeId(employeeId);
        setShowModal(true);
    };

    const deleteEmployee = async (employeeId) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await axios.delete(`/api/employees/${employeeId}`);
                alert("Employee deleted successfully");
                fetchEmployees();
            } catch (error) {
                alert("Failed to delete employee");
            }
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedEmployeeId(null);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredEmployees = employees.filter((employee) =>
        `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const downloadExcel = () => {
        const ws = XLSX.utils.json_to_sheet(employees);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Employees");
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        saveAs(data, "Employee_List.xlsx");
    };

    if (loading) return <div className='text-center mt-5'>Loading...</div>;
    if (error) return <div className='alert alert-danger text-center'>{error}</div>;

    return (
        <div className='container mt-5'>
            <h1 className='text-center mb-4'>Employee List</h1>
            <input
                type='text'
                className='form-control mb-3'
                placeholder='Search by name or email...'
                value={searchQuery}
                onChange={handleSearch}
            />
            <button className='btn btn-primary mb-3' onClick={fetchEmployees}>Refresh Employee List</button>
            <button className='btn btn-success mb-3 ms-2' onClick={downloadExcel}>Download Excel</button>
            {filteredEmployees.length === 0 ? (
                <p>No Employees found</p>
            ) : (
                <ul className='list-group'>
                    {filteredEmployees.map((employee) => (
                        <div key={employee.id} className='card mb-3'>
                            <div className='card-body'>
                                <h5 className='card-title'>
                                    {employee.firstName} {employee.lastName}
                                </h5>
                                <p className="mb-2 text-muted">{employee.email}</p>
                                <div className="button-container" style={{ display: 'flex', gap: '10px' }}>
                                    <button className="btn btn-primary" onClick={() => updateEmployee(employee.id)}>
                                        Update Employee
                                    </button>
                                    <button className="btn btn-danger" onClick={() => deleteEmployee(employee.id)}>
                                        Delete Employee
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </ul>
            )}
            {showModal && (
                <UpdateEmployee
                    employeeId={selectedEmployeeId}
                    onClose={handleModalClose}
                    onUpdate={fetchEmployees}
                />
            )}
        </div>
    );
};

export default EmployeeList;