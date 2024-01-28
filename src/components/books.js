// import BookCard from "./BookCard";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Button from "@mui/material/Button";
// import { useState } from "react";
// import { GetAllBook } from "../utils/BookApi";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { UseSelector } from "react-redux";
// // import BookCard from "./BookCard";

// const Books = ()=>{
//     const [sortAnchorEl, setSortAnchorEl] = useState(null);
//     const [sortOrder, setSortOrder] = useState("default");
//     const [bookList,setBookList] = useState([]);
//     // const dispatch = useDispatch();
//     // const books=useSelector((book)=>book.books.bookList);

//     useEffect(() => {
//       const fetchData = async () => {
//           try {
//               let booksResponse = await GetAllBook();
//               setBookList(booksResponse);
//               // dispatch(
//               //   getBookList(booksResponse)
//               // )
//           } catch (error) {
//               console.error("Error fetching notes:", error);
//           }
//           };
//           fetchData();
//       }, []);

//     const handleSortClick = (event) => {
//         setSortAnchorEl(event.currentTarget);
//       };

//       const handleSortClose = () => {
//         setSortAnchorEl(null);
//       };

//       const sortBy = (order) => {
//         let sortedBooks = [...bookList];

//         switch (order) {
//           case "lowToHigh":
//             sortedBooks.sort((a, b) => a.discountPrice - b.discountPrice);
//             break;
//           case "highToLow":
//             sortedBooks.sort((a, b) => b.discountPrice - a.discountPrice);
//             break;
//           default:
//             // Default order, no sorting
//             break;
//         }
//         setSortOrder(order);
//         setSortAnchorEl(null);
//         console.log("sorted list",sortedBooks);
//         setBookList(sortedBooks);
//         // Update the state with the sorted books
//         // You may want to use a state management library for more complex applications
//         // For simplicity, we are directly updating the state here
//         // In a real application, consider using something like Redux or React Context
//         // setBooksData(sortedBooks);
//       };

//     return (
//         <div style={{
//             paddingTop: "10px",
//             marginLeft: "8%",
//             display:"flex",
//             flexDirection:"column",
//             }}>
//                 <div style={{overflow: "auto",boxSizing: "border-box",float:"right"}}>
//                 <Button variant="outlined" color="inherit" onClick={handleSortClick} sx={{float:"right",marginRight:"15%",zIndex:0}}>Sort by</Button>
//                 <Menu
//                     anchorEl={sortAnchorEl}
//                     open={Boolean(sortAnchorEl)}
//                     onClose={handleSortClose}
//                 >
//                     <MenuItem onClick={() => sortBy("lowToHigh")}>Low to High</MenuItem>
//                     <MenuItem onClick={() => sortBy("highToLow")}>High to Low</MenuItem>
//                 </Menu>
//                 </div>
//                 <div style={{
//             paddingTop: "10px",
//             overflow: "auto",
//             display: "flex",
//             flexWrap: "wrap", // Allow flex items to wrap to the next line
//             gap:"25px",
//             boxSizing: "border-box",
//             paddingLeft:"30px"
//             }}>
//               {bookList && bookList.map((book) => (
//                 <BookCard key={book._id} bookObj={book}/>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default Books;

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import BookCard from "./BookCard";
import { GetAllBook } from "../utils/BookApi";
import { useDispatch, useSelector } from "react-redux";
import { addBooks } from "../utils/store/BookSlice";
import { setCartItems } from "../utils/store/CartSlice";
import "../css/Books.css"

const Books = () => {
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [sortOrder, setSortOrder] = useState("default");
  // const [bookList, setBookList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const bookList = useSelector((store) => store.book.bookList)

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

  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const sortBy = (order) => {
    let sortedBooks = [...bookList];

    switch (order) {
      case "lowToHigh":
        sortedBooks.sort((a, b) => a.discountPrice - b.discountPrice);
        break;
      case "highToLow":
        sortedBooks.sort((a, b) => b.discountPrice - a.discountPrice);
        break;
      default:
        // Default order, no sorting
        break;
    }

    setSortOrder(order);
    setSortAnchorEl(null);
    dispach(addBooks(sortedBooks))
    setCurrentPage(1); // Reset to the first page after sorting
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(bookList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBooks = bookList.slice(startIndex, endIndex);

  return (
        <div style={{ paddingTop: "10px", display: "flex", flexDirection: "column" }}>
          <div className="inner-sort-div">
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleSortClick}
              sx={{ float: "right", marginRight: "10%", zIndex: 0 }}
            >
              Sort by
            </Button>
            <Menu anchorEl={sortAnchorEl} open={Boolean(sortAnchorEl)} onClose={handleSortClose}>
              <MenuItem onClick={() => sortBy("lowToHigh")}>Low to High</MenuItem>
              <MenuItem onClick={() => sortBy("highToLow")}>High to Low</MenuItem>
            </Menu>
          </div>
          <div className="bookcard-div">
            {currentBooks.map((book) => (
              <BookCard key={book._id} bookObj={book} />
            ))}
          </div>
          <div className="page-div">
            {Array.from({ length: totalPages }).map((_, index) => (
              <Button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                variant={currentPage === index + 1 ? "contained" : "outlined"}
                sx={{
                  margin: "0 5px",
                  backgroundColor: currentPage === index + 1 ? "#A90000" : "#ffffff",
                  color: currentPage === index + 1 ? "#ffffff" : "#A90000",
                  borderColor: "#A90000"
                }}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
  );
};

export default Books;
