import Header from "./Header"
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "../utils/store/AppStore";
import "../css/DashboardLayout.css"

const DashboardLayout = () => {
    // const [open , setOpen] = useState(false)
    return (
      <Provider store={appStore}>
        <div className="header-container">
        <Header />
        </div>
        <div className="outlet-container" >
        {/* <SidebarContainer drawerState={open} toggleDrawer={setOpen}/> */}
        <Outlet/>
        </div>
      </Provider>
    )
  }

export default DashboardLayout;