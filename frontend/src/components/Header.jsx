import React from "react";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
  return (
    <div className="text-center mb-8">
      <div className="relative flex ">
        <h1 className="text-4xl font-bold text-white mb-2 mx-auto ">Todo List</h1>
        <div className="absolute right-0">
          <ProfileMenu />
        </div>
      </div>

      <p className="text-gray-300">Stay organized and get things done!</p>
    </div>
  );
};

export default Header;
