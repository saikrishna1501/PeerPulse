import VerticalTabs from "../../components/VerticleTabs/VerticleTabs"
import UserSettingsPage from "../UserSettingsPage/UserSettingsPage"
import { useEffect, useState } from "react"
import { UserRoles } from '../../models/UserModel';
import ManageUsersPage from "../ManageUsersPage/ManageUsersPage"
import UpcomingEventsPage from "../UpcomingEventsPage/UpcomingEventsPage"
import { useSelector } from "react-redux"

const UserDashboardPage = () => {
    // let mapping = [{ textOnTab: "Settings", componentToRender: <UserSettingsPage />, order: 0 }];
    let [mapping,setMapping] = useState([{ textOnTab: "Settings", componentToRender: <UserSettingsPage />, order: 0 }]);
    const user = useSelector((state:any) => state.auth.user);
    useEffect(() => {
        if(user.role === UserRoles.STUDENT) {
            setMapping([
                { textOnTab: "Settings", componentToRender: <UserSettingsPage />, order: 0 },
                
                { textOnTab: "Registered Events", componentToRender: (<UpcomingEventsPage/>), order: 0 },
            ]);
        }
        else {
            setMapping([
                { textOnTab: "Settings", componentToRender: <UserSettingsPage />, order: 0 },
                
                { textOnTab: "Registered Events", componentToRender: (<UpcomingEventsPage/>), order: 0 },
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