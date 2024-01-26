import Header from "./Header"
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "../utils/store/AppStore";

const DashboardLayout = () => {
    // const [open , setOpen] = useState(false)
    return (
      <Provider store={appStore}>
        <div style={{display:"flex",}}>
        <Header />
        </div>
        <div style={{display: "flex",marginTop:"70px",justifyContent:"center",marginLeft:"15%",marginRight:"12%"}}>
        {/* <SidebarContainer drawerState={open} toggleDrawer={setOpen}/> */}
        <Outlet/>
        </div>
      </Provider>
    )
  }

export default DashboardLayout;