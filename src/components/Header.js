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
import accountIcon from "../assets/accountIcon.svg"
import cartIcon from "../assets/cartIcon.svg";
import { addBooks } from "../utils/store/BookSlice";
import { GetAllBook } from "../utils/BookApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCartItems,addItemToCart,removeFromCart } from "../utils/store/CartSlice";
import { AddToCart, GetCartItem } from "../utils/CartApi";
import { GetBookByID } from "../utils/BookApi";
import {fetchBookByText} from "../utils/BookApi"

const theme = createTheme();

const useStyles = makeStyles(() => ({
  appBar: {
    color: "#A90000",
  },
  title: {
    display: "flex",
    alignItems: "center",
    marginLeft: "7%",
    cursor:"pointer"
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
    gap: "16px",
    marginRight: "10%",
  },
  accountImage:{
    height:"30px",
  },
  cartImage:{
    height:"26px"
  },
  '@media (max-width: 600px)': {
    title: {
      marginLeft: '0%',
       // Adjust the margin for smaller screens
    },
    search: {
      width: '50%', // Adjust the width of the search bar for smaller screens
    },
    profileAndCart: {
      marginRight: '0%', // Adjust the margin for smaller screens
    },
    searchIcon:{
      marginLeft:"-10px"
    },
    search:{

    },
    inputRoot:{
      width:"90%"
    },
    inputInput:{
      width:"90%"
    },
    profileAndCart:{
      gap:"5px",
      marginRight:"0%"
    }
  },
}));

const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const route = useNavigate();

  const dispach = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let booksResponse = await GetAllBook();
        // setBookList(booksResponse);
        console.log("BookDetails",booksResponse);
        dispach(addBooks(booksResponse))
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      let cartBooks = []
      try {
        cartBooks = await GetCartItem();
        // Extract bookIds and quantities from cartItems
        const bookIdQuantityMap = cartBooks.reduce((map, cartItem) => {
          map[cartItem.bookId] = cartItem.quantity;
          return map;
        }, {});
  
        // Fetch details for each bookId
        const bookDetailsPromises = cartBooks.map(async (cartItem) => {
          let book = await GetBookByID(cartItem.bookId);
          // Add the quantity from the cart item to the book details
          return { ...book, quantity: bookIdQuantityMap[book._id] };
        });
  
        // Wait for all book details promises to resolve
        const resolvedBookDetails = await Promise.all(bookDetailsPromises);
  
          // Update state with the book details
          // setBookDetails(resolvedBookDetails);
          
          
  
          // Update state with the cart items
          // setCartList(cartBooks);
          // debugger
          dispach(setCartItems(resolvedBookDetails));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
  
      };
      fetchData();
    }, []);









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

  const handleSearchChange = async (event) => {
    setSearchQuery(event.target.value);
    if(event.target.value==""){
      const res = await fetchBookByText({bookName:""})
      dispach(addBooks(res))
    }
  };

  const handleSearchSubmit = async() => {
    console.log("Search Query:", searchQuery);
    const res = await fetchBookByText({bookName:searchQuery})
    dispach(addBooks(res))
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
        sx={{ backgroundColor: "#A03037" }}
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
              <img src={accountIcon} className={classes.accountImage}></img>
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
              <Badge badgeContent={1} color="secondary">
              <img src={cartIcon} className={classes.cartImage}></img>
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
