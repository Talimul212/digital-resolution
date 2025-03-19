import React from "react";

const Profile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  return (
    <div className="  flex items-center justify-center flex-col">
      <p>
        <b>Name: </b>
        {storedUser?.name}
      </p>
      <p>
        <b>Email:</b> {storedUser?.email}
      </p>
    </div>
  );
};

export default Profile;
