import React from "react";
import { DropdownMenu, DropdownItem } from "@nextui-org/react";

const NavDropdown = (props) => {
  const { logout, user } = props;
  return (
    <DropdownMenu aria-label="User Actions" variant="flat">
      <DropdownItem key="profile" className="h-14 gap-2">
        <p className="font-bold">Signed in as</p>
        <p className="font-bold">{user.username}</p>
      </DropdownItem>
      <DropdownItem key="settings">My Settings</DropdownItem>
      <DropdownItem key="team_settings">Team Settings</DropdownItem>
      <DropdownItem key="analytics">Analytics</DropdownItem>
      <DropdownItem key="system">System</DropdownItem>
      <DropdownItem key="configurations">Configurations</DropdownItem>
      <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
      <DropdownItem key="logout" onClick={logout} color="danger">
        Log Out
      </DropdownItem>
    </DropdownMenu>
  );
};

export default NavDropdown;
