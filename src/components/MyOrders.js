// import { useState } from "react";
// import { GetMyOrders } from "../utils/OrderApi";
// import { useEffect } from "react";
// import { Card,CardContent,Typography } from "@mui/material";



// const MyOrders = ()=>{
//     const [orders,setOrders]=useState([]);
//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             let booksResponse = await GetMyOrders();
//             setOrders(booksResponse);
//           } catch (error) {
//             console.error("Error fetching books:", error);
//           }
//         };
//         fetchData();
//       }, []);

//     return (
//         <div>
//             <div>
//                 <h6>Orders {orders.length}</h6>
//             </div>
//             <div>
//             {orders.map((item) => (
//                <Card key={item._id} style={{ marginBottom: '10px', display: 'flex' }}>
//                {/* Book Image */}
//                <img src={item.bookImage} alt={item.bookName} style={{ width: '100px', height: '150px', objectFit: 'contain', marginRight: '10px',marginLeft:"10px" }} />
           
//                {/* Book Details */}
//                <CardContent>
//                  {/* Book Title */}
//                  <Typography variant="h6">{item.bookName}</Typography>
                 
//                  {/* Book Author */}
//                  <Typography variant="subtitle2"> {item.author}</Typography>
                 
//                  {/* Book Price */}
//                  <Typography variant="h6" style={{marginTop:"5px",fontWeight:"bold"}}>RS.{item.discountPrice}</Typography>
//                </CardContent>
//              </Card>
//             ))}
//             </div>
//         </div>

//     )
// };

// export default MyOrders;


import { useState, useEffect } from "react";
import { GetMyOrders } from "../utils/OrderApi";
import { Card, CardContent, Typography } from "@mui/material";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let ordersResponse = await GetMyOrders();
        setOrders(ordersResponse);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchData();
  }, []);

  console.log("in component",orders);
  return (
    <div style={{width:"75%"}}>
      <div style={{width:"100%"}}> 
        {orders.map((order) => (
          <div key={order._id}>
            <h4>Orders: {orders.orderDate}</h4>
            {order.orderData.map((orderData) => (
              <div key={orderData._id} >
                {orderData.items.map((item) => (
                  <Card key={item._id} style={{ marginBottom: "10px", display: "flex" }}>
                    {/* Book Image */}
                    <img src={item.bookImage} alt={item.bookName} style={{ width: "100px", height: "150px", objectFit: "contain", marginRight: "10px", marginLeft: "10px" }} />

                    {/* Book Details */}
                    <CardContent>
                      {/* Book Title */}
                      <Typography variant="h6">{item.bookName}</Typography>
                      <Typography variant="h7">quantity: {item.quantity}</Typography>
                      {/* Book Price */}
                      <Typography variant="h6" style={{ marginTop: "5px", fontWeight: "bold" }}>
                        RS.{item.price}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
                <div style={{marginBottom:"30px"}}>Total: {orderData.total}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;


