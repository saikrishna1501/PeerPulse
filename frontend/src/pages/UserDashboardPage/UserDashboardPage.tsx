import { Grid } from "@mui/material"
import { Outlet } from "react-router-dom"
import VerticalTabs from "../../components/VerticleTabs/VerticleTabs"
import UserSettingsPage from "../UserSettingsPage/UserSettingsPage"
import { useEffect, useState } from "react"
import user from "../../services/UserService"
import { UserRoles } from '../../services/UserService'
import ManageUsersPage from "../ManageUsersPage/ManageUsersPage"
import UpcomingEventsPage from "../UpcomingEventsPage/UpcomingEventsPage"

const UserDashboardPage = () => {
    // let mapping = [{ textOnTab: "Settings", componentToRender: <UserSettingsPage />, order: 0 }];
    let [mapping,setMapping] = useState([{ textOnTab: "Settings", componentToRender: <UserSettingsPage />, order: 0 }]);
    useEffect(() => {
        
        if(user.role === UserRoles.STUDENT) {
            setMapping([
                { textOnTab: "Settings", componentToRender: <UserSettingsPage />, order: 0 },
                { textOnTab: "Saved Events", componentToRender: (<div>Saved Events</div>), order: 0 },
                { textOnTab: "Saved Housing", componentToRender: (<div>Saved Housing</div>), order: 0 }
            ]);
        }
        else if(user.role === UserRoles.MODERATOR) {
            setMapping([
                { textOnTab: "Settings", componentToRender: <UserSettingsPage />, order: 0 },
                { textOnTab: "Saved Events", componentToRender: (<div>Saved Events</div>), order: 0 },
                { textOnTab: "Saved Housing", componentToRender: (<div>Saved Housing</div>), order: 0 },
                // { textOnTab: "Manage Users", componentToRender: (<div>Manage Users</div>), order: 0 },
                { textOnTab: "Manage Reports", componentToRender: (<div>Manage Reports</div>), order: 0 }
            ]);
        }
        else {
            setMapping([
                { textOnTab: "Settings", componentToRender: <UserSettingsPage />, order: 0 },
                { textOnTab: "Saved Events", componentToRender: (<div>Saved events</div>), order: 0 },
                { textOnTab: "Saved Housing", componentToRender: (<div>Saved Housing`</div>), order: 0 },
                { textOnTab: "Upcoming Events", componentToRender: (<UpcomingEventsPage/>), order: 0 },
                { textOnTab: "Manage Users", componentToRender: (<div><ManageUsersPage /></div>), order: 0 },
            ]);
        }
        console.log(mapping);
    },[])
    

    return (
        <VerticalTabs mapping={mapping} />
    )
}

export default UserDashboardPage;