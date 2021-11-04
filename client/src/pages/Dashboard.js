import ControllerBlock from "../components/ControllerBlock";
import Navbar from "../components/Navbar";
import { OuterWrapper } from "../components/OuterWrapper";

const Dashboard = () => {
    return (
        <OuterWrapper>
            <Navbar/>
            <ControllerBlock/>
        </OuterWrapper>
    )
}


export default Dashboard;