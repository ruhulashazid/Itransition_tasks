import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/UserManagement.css'; 

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5000/api/users', {
                    headers: { 'x-access-token': token }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSelectUser = (id) => {
        if (selectedUsers.includes(id)) {
            setSelectedUsers(selectedUsers.filter(userId => userId !== id));
        } else {
            setSelectedUsers([...selectedUsers, id]);
        }
    };

    const handleBlockUsers = async () => {
        const token = localStorage.getItem('token');
        try {
            for (let userId of selectedUsers) {
                await axios.put(`http://localhost:5000/api/users/block/${userId}`, {}, {
                    headers: { 'x-access-token': token }
                });
            }
            setUsers(users.map(user => selectedUsers.includes(user.id) ? { ...user, status: 'blocked' } : user));
            setSelectedUsers([]);
        } catch (error) {
            console.error('Error blocking users:', error);
        }
    };

    const handleUnblockUsers = async () => {
        const token = localStorage.getItem('token');
        try {
            for (let userId of selectedUsers) {
                await axios.put(`http://localhost:5000/api/users/unblock/${userId}`, {}, {
                    headers: { 'x-access-token': token }
                });
            }
            setUsers(users.map(user => selectedUsers.includes(user.id) ? { ...user, status: 'active' } : user));
            setSelectedUsers([]);
        } catch (error) {
            console.error('Error unblocking users:', error);
        }
    };

    const handleDeleteUsers = async () => {
        const token = localStorage.getItem('token');
        try {
            for (let userId of selectedUsers) {
                await axios.delete(`http://localhost:5000/api/users/${userId}`, {
                    headers: { 'x-access-token': token }
                });
            }
            setUsers(users.filter(user => !selectedUsers.includes(user.id)));
            setSelectedUsers([]);
        } catch (error) {
            console.error('Error deleting users:', error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="header">
                <h2>Hello Johan, <a href="/logout" className="logout-link">Logout</a></h2>
            </div>
            <div className="toolbar mb-3">
                <button className="btn btn-custom me-2" onClick={handleBlockUsers}>
                    <i className="fas fa-lock"></i> Block
                </button>
                <button className="btn btn-custom me-2" onClick={handleUnblockUsers}>
                    <i className="fas fa-unlock"></i> Unblock
                </button>
                <button className="btn btn-custom" onClick={handleDeleteUsers}>
                    <i className="fas fa-trash-alt"></i> Delete
                </button>
            </div>
            <table className="table table-custom">
                <thead>
                    <tr>
                        <th><input type="checkbox" /></th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Registration time</th>
                        <th>Last login time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.includes(user.id)}
                                    onChange={() => handleSelectUser(user.id)}
                                />
                            </td>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.registration_time}</td>
                            <td>{user.last_login_time}</td>
                            <td>{user.status === 'blocked' ? (
                                <span className="text-danger">Blocked</span>
                            ) : (
                                <span className="text-success">Active</span>
                            )}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="show-more">
                <button className="btn btn-custom">Show more</button>
            </div>
        </div>
    );
};

export default UserManagement;
