import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BuildIcon from "@mui/icons-material/Build";
import GroupIcon from "@mui/icons-material/Group";
import BarChartIcon from "@mui/icons-material/BarChart";
import InventoryIcon from "@mui/icons-material/Inventory";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, Outlet } from "react-router-dom";
import { ModalLogout } from "./ModalLogout";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: open ? 0 : `-${drawerWidth}px`,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  className?: string;
}
interface PersistentDrawerLeftProps {
  children?: React.ReactNode;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  backgroundColor: "#353232",
  zIndex: "30",
  width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
  marginLeft: open ? `${drawerWidth}px` : 0,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  zIndex: "30",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export function PersistentDrawerLeft({ children }: PersistentDrawerLeftProps) {
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const theme = useTheme();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogoutClick = () => {
    setLogoutModalOpen(true); // Abre el modal al hacer clic en "Log Out"
  };

  const closeLogoutModal = () => {
    setLogoutModalOpen(false); // Cierra el modal
  };

  const logoutFunction = () => {
    localStorage.removeItem("token"); // Elimina el token del localStorage
    navigate("/"); // Navega a la página de inicio de sesión
  };

  // useEffect que solo se dispara al abrir el Dashboard
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setOpen(false); // Cierra el sidebar si se navega a Dashboard
    }
  }, [location.pathname]);

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, link: "../dashboard" },
    {
      text: "Appointments",
      icon: <CalendarTodayIcon />,
      link: "../appointments",
    },
    { text: "Products", icon: <ShoppingCartIcon />, link: "../products" },
    { text: "Services", icon: <BuildIcon />, link: "../services" },
    { text: "Users", icon: <GroupIcon />, link: "../users" },
    { text: "Employees", icon: <GroupIcon />, link: "../employees" },
    { text: "Reports", icon: <BarChartIcon />, link: "../reports" },
    { text: "Materials", icon: <InventoryIcon />, link: "../inventory" },

  ];

  /*
  const secondaryMenuItems = [
    { text: "Inventory", icon: <InventoryIcon />, link: "../inventory" },
  ];
  */
  const logoutItem = {
    text: "Log Out",
    icon: <LogoutIcon />,
    onClick: handleLogoutClick,
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[{ mr: 2 }, open && { display: "none" }]}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Link
              to="/dashboard"
              style={{
                textDecoration: "none",
                display: "flex",
                color: "inherit",
                alignItems: "center",
              }}
            >
              <img
                src="src/images/logoBaza.png"
                alt="Logo Baza"
                style={{
                  height: "5rem",
                  maxHeight: "5rem",
                  width: "auto",
                  marginBottom: "0.5rem",
                  marginTop: "0.5em",
                  paddingLeft: "0.5em",
                }}
              />
              <span className="m-5 font-mono text-3xl font-bold">
                {" "}
                Salón Baza
              </span>
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader
          sx={{ height: "98px", minHeight: "98px", backgroundColor: "#353232" }}
        >
          <IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map(({ text, icon, link }) => (
            <Link to={link} className="no-underline text-black" key={text}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          
          <ListItem key={logoutItem.text} disablePadding>
            <ListItemButton onClick={logoutItem.onClick}>
              <ListItemIcon>{logoutItem.icon}</ListItemIcon>
              <ListItemText primary={logoutItem.text} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>

      {isLogoutModalOpen && (
        <ModalLogout
          open={isLogoutModalOpen}
          onClose={closeLogoutModal}
          onConfirm={logoutFunction}
        />
      )}
    </Box>
  );
}
