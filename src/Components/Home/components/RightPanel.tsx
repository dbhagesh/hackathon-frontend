import { Divider } from "antd";
import { ActiveRoomDisplay } from "../../Room";
import { ActiveUsersDisplay } from "../../User";

const RightPanel = () => {
  return (
    <div>
      <ActiveRoomDisplay />
      <Divider />
      <ActiveUsersDisplay />
    </div>
  );
};

export default RightPanel;
