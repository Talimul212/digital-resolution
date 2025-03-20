import React, { useEffect, useState } from "react";
import { baseURL } from "../../../utility/Api/BaseURl";
import UsersTable from "../../../Components/Table/UsersTable";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${baseURL}users`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data?.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="mt-10 px-5">
      <h2 className="text-2xl font-bold mb-4">Users Management List</h2>
      <UsersTable error={error} loading={loading} users={users} />
    </div>
  );
};

export default AllUser;
