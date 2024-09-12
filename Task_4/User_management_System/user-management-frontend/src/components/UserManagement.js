import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/users`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(res => {
            setUsers(res.data);
        }).catch(err => {
            console.error(err);
        });
    }, []);

    const handleSelectUser = (userId) => {
        setSelectedUsers(prev => {
            if (prev.includes(userId)) {
                return prev.filter(id => id !== userId);
            } else {
                return [...prev, userId];
            }
        });
    };

    const handleBlockUsers = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/users/block`, {
            userIds: selectedUsers,
            action: 'block'
        }, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(res => {
            setUsers(users.map(user => selectedUsers.includes(user.id) ? { ...user, status: 'blocked' } : user));
            setSelectedUsers([]);
        }).catch(err => {
            console.error(err);
        });
    };

    const handleUnblockUsers = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/users/block`, {
            userIds: selectedUsers,
            action: 'unblock'
        }, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(res => {
            setUsers(users.map(user => selectedUsers.includes(user.id) ? { ...user, status: 'active' } : user));
            setSelectedUsers([]);
        }).catch(err => {
            console.error(err);
        });
    };

    const handleDeleteUsers = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/users/delete`, {
            userIds: selectedUsers
        }, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(res => {
            setUsers(users.filter(user => !selectedUsers.includes(user.id)));
            setSelectedUsers([]);
        }).catch(err => {
            console.error(err);
        });
    };

    return (
        <div className="container mt-5">
            <div className="toolbar mb-3">
                <button className="btn btn-danger" onClick={handleBlockUsers}>Block</button>
                <button className="btn btn-warning" onClick={handleUnblockUsers}>Unblock</button>
                <button className="btn btn-danger" onClick={handleDeleteUsers}>Delete</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th><input type="checkbox" /></th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Email</th>
                        <th>Last Login</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>
                                <input type="checkbox" checked={selectedUsers.includes(user.id)}
                                    onChange={() => handleSelectUser(user.id)} />
                            </td>
                            <td>{user.name}</td>
                            <td>{user.position}</td>
                            <td>{user.email}</td>
                            <td>{user.last_login}</td>
                            <td>{user.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
