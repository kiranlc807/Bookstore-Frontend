// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Typography,
//   InputBase,
//   Badge,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import { Book, AccountCircle, ShoppingCart, Search } from "@mui/icons-material";
// import { makeStyles } from "@mui/styles";
// import { useNavigate } from "react-router-dom";

// const useStyles = makeStyles(() => ({
//   appBar: {
//     color: "#A90000",
//   },
//   title: {
//     display: "flex",
//     alignItems: "center",
//     marginLeft: "7%" ,
//   },
//   search: {
//     display:"flex",
//     justifyContent:"center",
//     position: "relative",
//     borderRadius: 4,
//     backgroundColor: "white",
//     marginLeft: "5%",
//     width: "40%",

//   },
//   inputRoot: {
//     color: "inherit",
//     width: "85%",
//   },
//   inputInput: {
//     padding: "8px 8px 8px 40px",
//     width: "100%",
//   },
//   searchIcon: {
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     left: 12,
//     top: "50%",
//     transform: "translateY(-50%)",
//     color:"gray",
//   },
//   profileAndCart: {
//     marginLeft: "auto",
//     display: "flex",
//     alignItems: "center",
//     gap: 16,
//     marginRight:"8%"
//   },
// }));

// const Header = () => {
//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const route = useNavigate();
//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleProfileMenuClose = (action) => {
//     if(action==='wishlist')
//     {
//       route("/dashboard/wishlist")
//     }
//     else if(action==="profile")
//     {
//       route("/dashboard/profile")
//     }
//     else if(action==="logout")
//     {
//       localStorage.removeItem('Authorization');
//       route('/')
//     }
//     setAnchorEl(null);
//   };

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleSearchSubmit = () => {
//     console.log("Search Query:", searchQuery);
//     // Add your search logic here
//   };

  
//   const handleCart = ()=>{
//     route("/dashboard/cart");
//   }

//   return (
//     <div>
//     <AppBar
//       position="static"
//       className={classes.appBar}
//       sx={{ backgroundColor: "#A90000" }}
//       style={{position:"fixed", zIndex:"50"}}
//     >
//       <Toolbar>
//         <div className={classes.title}>
//           <IconButton color="inherit">
//             <Book />
//           </IconButton>
//           <Typography variant="h6">BookStore</Typography>
//         </div>

//         <div className={classes.search}>
//           <div className={classes.searchIcon}>
//             <Search />
//           </div>
//           <InputBase
//             placeholder="   Search..."
//             classes={{
//               root: classes.inputRoot,
//               input: classes.inputInput,
//             }}
//             value={searchQuery}
//             onChange={handleSearchChange}
//             onKeyPress={(e) => e.key === "Enter" && handleSearchSubmit()}
//           />
//         </div>

//         <div className={classes.profileAndCart}>
//           <IconButton color="inherit" onClick={handleProfileMenuOpen}>
//             <AccountCircle />
//           </IconButton>
//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleProfileMenuClose}
//           >
//             <MenuItem onClick={()=>handleProfileMenuClose("profile")}>Profile</MenuItem>
//             <MenuItem onClick={()=>handleProfileMenuClose("orders")}>My Orders</MenuItem>
//             <MenuItem onClick={()=>handleProfileMenuClose("wishlist")}>Wishlist</MenuItem>
//             <MenuItem onClick={()=>handleProfileMenuClose("logout")}>Logout</MenuItem>
//           </Menu>
//           <IconButton color="inherit" onClick={handleCart}>
//             <Badge badgeContent={0} color="secondary">
//               <ShoppingCart />
//             </Badge>
//           </IconButton>
//         </div>
//       </Toolbar>
//     </AppBar>
//     </div>
//   );
// };

// export default Header;

import  { useState ,React} from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import { Book, AccountCircle, ShoppingCart, Search } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  appBar: {
    color: "#A90000",
  },
  title: {
    display: "flex",
    alignItems: "center",
    marginLeft: "7%",
  },
  search: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    borderRadius: 4,
    backgroundColor: "white",
    marginLeft: "5%",
    width: "40%",
  },
  inputRoot: {
    color: "inherit",
    width: "85%",
  },
  inputInput: {
    padding: "8px 8px 8px 40px",
    width: "100%",
  },
  searchIcon: {
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    left: 12,
    top: "50%",
    transform: "translateY(-50%)",
    color: "gray",
  },
  profileAndCart: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginRight: "8%",
  },
}));

const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const route = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = (action) => {
    if (action === "wishlist") {
      route("/dashboard/wishlist");
    } else if (action === "profile") {
      route("/dashboard/profile");
    } else if (action === "logout") {
      localStorage.removeItem("Authorization");
      route("/");
    } else if(action==='orders') {
      route("/dashboard/myorders")
    }
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("Search Query:", searchQuery);
    // Add your search logic here
  };

  const handleCart = () => {
    route("/dashboard/cart");
  };

  const handleNavigate = ()=>{
    route('/dashboard/books')
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        className={classes.appBar}
        sx={{ backgroundColor: "#A90000" }}
        style={{ position: "fixed", zIndex: "50" }}
      >
        <Toolbar>
          <div className={classes.title}>
            <IconButton color="inherit">
              <Book />
            </IconButton>
            <Typography variant="h6" onClick={handleNavigate}>BookStore</Typography>
          </div>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder="   Search..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={(e) => e.key === "Enter" && handleSearchSubmit()}
            />
          </div>

          <div className={classes.profileAndCart}>
            <IconButton color="inherit" onClick={handleProfileMenuOpen}>
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => handleProfileMenuClose()}
            >
              <MenuItem onClick={() => handleProfileMenuClose("profile")}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => handleProfileMenuClose("orders")}>
                My Orders
              </MenuItem>
              <MenuItem onClick={() => handleProfileMenuClose("wishlist")}>
                Wishlist
              </MenuItem>
              <MenuItem onClick={() => handleProfileMenuClose("logout")}>
                Logout
              </MenuItem>
            </Menu>
            <IconButton color="inherit" onClick={handleCart}>
              <Badge badgeContent={0} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
