import { Divider } from "antd";
import UpIcon from "../../../asset/UpIcon.png";
import { CommunityList } from "../../Community";
import { UserPanel } from "../../User";
import HomeLinks from "./HomeLinks ";
const LeftPanel = () => {
  return (
    <div
      style={{
        height: "calc(100% - 20px)",
        padding: "10px 5px",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-between",
      }}
    >
      <div className="text-and-icon-center" style={{}}>
        <img src={UpIcon} height={"32px"} width={"32px"} />
        <div
          style={{
            letterSpacing: "2px",
            color: "#521d52",
          }}
        >
          UPSKILL
        </div>
      </div>
      <Divider
        style={{
          marginTop: "10px",
        }}
      />
      <HomeLinks />
      <Divider />
      <CommunityList />
      <UserPanel />
    </div>
  );
};

export default LeftPanel;
