import Header from "./Header"
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    // const [open , setOpen] = useState(false)
    return (
      <>
      <div style={{display:"flex",}}>
      <Header />
      </div>
      <div style={{display: "flex",marginTop:"70px",justifyContent:"center"}}>
      {/* <SidebarContainer drawerState={open} toggleDrawer={setOpen}/> */}
      <Outlet/>
      </div>
      </>
    )
  }

export default DashboardLayout;