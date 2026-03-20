// "use client";
// import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
// import { BsArrowBarLeft } from "react-icons/bs";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import "./CSS/NavbarStyles.css";
// import { useDispatch } from "react-redux";
// import { FcRefresh } from "react-icons/fc";

// const AuthorizedNavbar = ({ logoTitle, isLightTheme }) => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const handleLogout = () => {
//     localStorage.clear();
//     router.push("/login");
//   };

//   return (
//     <AppBar
//       position="sticky"
//       elevation={1}
//       sx={{
//         backgroundColor: isLightTheme ? "white" : "black",
//         color: isLightTheme ? "black" : "white",
//         zIndex: 1200,
//       }}
//     >
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//         {/* Logo / Brand */}
//         <Typography
//           variant="h6"
//           sx={{
//             color: isLightTheme ? "black" : "steelblue",
//             fontWeight: 600,
//           }}
//         >
//           {logoTitle}
//         </Typography>

//         {/* Navigation Links */}
//         <Box
//           className="navActions"
//           sx={{ display: "flex", alignItems: "center", gap: 2 }}
//         >
//           <Link className="navLink">
//             <Button
//               onClick={() =>
//                 dispatch({ type: "REFRESH_GLOBAL_STATE", payload: true })
//               }
//             >
//               <span className="navIcon">
//                 <FcRefresh />
//               </span>
//               Refresh
//             </Button>
//           </Link>
//           <Link href="/" className="navLink">
//             <Button>Back 1111</Button>
//           </Link>
//           <Button
//             className="navLink logoutBtn"
//             onClick={handleLogout}
//             disableRipple
//           >
//             Logout
//           </Button>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default AuthorizedNavbar;
