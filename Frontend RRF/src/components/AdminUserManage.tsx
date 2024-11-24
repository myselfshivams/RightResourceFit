import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import AdminSidebar from './AdminSidebar';
import '../styles/AdminUserManage.css';

const AdminUserManage = () => {
  type User = {
    _id: string;
    imageUrl: string;
    name: string;
    email: string;
    phoneNumber: string;
    isAdmin: boolean;
    isDeleted: boolean;
    userStatus: string;
  };

  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/all-users`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setUsers(data);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchUsers();
  }, []);

  // Grant Admin Access
  const handleGrantAccess = async (id: string) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/update-admin/${id}`,
        { isAdmin: true },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, isAdmin: true } : user
        )
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/delete-user/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setUsers(
        users.map((user) =>
          user._id === id
            ? { ...user, isDeleted: true, userStatus: 'Deactivated' }
            : user
        )
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleUngrantAccess = async (id: string) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/update-admin/${id}`,
        { isAdmin: false },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, isAdmin: false } : user
        )
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  // Restore User
  const handleRestore = async (id: string) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/restore-user/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setUsers(
        users.map((user) =>
          user._id === id
            ? { ...user, isDeleted: false, userStatus: 'Active' }
            : user
        )
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="admin-user-manage-container">
  <AdminSidebar  />
  <div className="admin-user-manage-content">
    <h1>User Management</h1>
    {loading && <p>Loading users...</p>}
    {error && <p className="text-danger">{error}</p>}

    <div className="table-container">
      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Admin Access</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>
                <img
                  src={user.imageUrl}
                  alt={`${user.name}'s avatar`}
                  className="user-avatar"
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.isAdmin ? 'Yes' : 'No'}</td>
              <td>{user.userStatus}</td>
              <td>
                {user.isDeleted ? (
                  <Button
                    variant="warning"
                    onClick={() => handleRestore(user._id)}
                  >
                    Restore
                  </Button>
                ) : (
                  <>
                    {!user.isAdmin ? (
                      <Button
                        variant="success"
                        onClick={() => handleGrantAccess(user._id)}
                      >
                        Grant Access
                      </Button>
                    ) : (
                      <Button
                        variant="info"
                        onClick={() => handleUngrantAccess(user._id)}
                      >
                        Remove Access
                      </Button>
                    )}
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  </div>
</div>

  );
};

export default AdminUserManage;
