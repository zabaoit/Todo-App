import { useEffect, useState } from "react";
import { Avatar, Menu, MenuItem, Divider, ListItemIcon, IconButton, Tooltip, Typography, Box } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { fetchUserApiById } from "../api/userApi";
import { profileimg } from "../assets/asset";

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [user, setUser] = useState("");
  const handleClick = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const fetchUser = async id => {
    try {
      const data = await fetchUserApiById(id);
      console.log("data", data);
      setUser(data);
    } catch (err) {
      console.log("Error fetching", err);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    fetchUser(userId);
  }, []);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Tooltip>
        <IconButton onClick={handleClick} size="small" sx={{ ml: 1 }}>
          <Avatar
            src={profileimg}
            alt={user.username}
            sx={{
              width: 40,
              height: 40,
              cursor: "pointer",
            }}
          />
        </IconButton>
      </Tooltip>

      {/* Dropdown menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 4,
          sx: {
            width: 240,
            mt: 1.5,
            borderRadius: 3,
            overflow: "visible",
            filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.15))",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 20,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ paddingLeft: 4, paddingY: 1 }}>
          <Typography sx={{ fontWeight: 600 }}>Profile</Typography>
        </Box>
        <Divider />

        {/* Thông tin user */}
        <Box sx={{ px: 2, py: 1, display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar src={profileimg} alt={user.username} sx={{ width: 50, height: 50 }} />
          <Box>
            <Typography sx={{ paddingLeft: 2 }}>{user.username}</Typography>
          </Box>
        </Box>

        <Divider />

        {/* Các nút chức năng */}
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          Tài khoản
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" color="error" />
          </ListItemIcon>
          <Typography color="error">Đăng xuất</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileMenu;
