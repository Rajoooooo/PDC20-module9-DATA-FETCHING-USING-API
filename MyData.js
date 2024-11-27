import React, { useState, useEffect } from "react";

function MyData() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost/PDC20/get_user.php', { 
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div style={{ padding: '15px', fontFamily: 'Arial, sans-serif' }}>
            {/* Internal styles */}
            <style>
                {`
                .modern-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                    font-size: 18px;
                    text-align: left;
                    background-color: #f9f9f9;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .modern-table th, .modern-table td {
                    padding: 12px 15px;
                }
                .modern-table th {
                    background-color: #4CAF50;
                    color: white;
                }
                .modern-table tr {
                    border-bottom: 1px solid #dddddd;
                }
                .modern-table tr:hover {
                    background-color: #f1f1f1;
                }
                .modern-table tr:nth-of-type(even) {
                    background-color: #f3f3f3;
                }
                .title {
                    font-size: 24px;
                    color: #333;
                    margin-bottom: 20px;
                }
                .error-message {
                    color: red;
                    font-weight: bold;
                }
                `}
            </style>

            <h1 className="title">User List</h1>

            {error && <p className="error-message">Error: {error}</p>}

            {users.length > 0 ? (
                <table className="modern-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Contact No</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.ID}>
                                <td>{user.ID}</td>
                                <td>{user.Name}</td>
                                <td>{user.Gender}</td>
                                <td>{user.ContactNo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
}

export default MyData;
