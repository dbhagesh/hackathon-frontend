import { Avatar, List } from "antd";
import { useEffect, useState } from "react";
import { getUsersAPI } from "../../apis/apis";
import Loader from "../../routes/loader";

const data = [
  {
    title: "User 1",
  },
  {
    title: "User 2",
  },
  {
    title: "User 3",
  },
  {
    title: "User 4",
  },
];
const ActiveUsersDisplay = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsersAPI().then(({ data }) => {
      setUsers(data);
    });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      style={{
        padding: "10px 20px",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          color: "var(--font-color-muted)",
          textAlign: "left",
          marginBottom: "10px",
        }}
      >
        MEMBERS
      </div>
      <List
        itemLayout="horizontal"
        dataSource={users}
        renderItem={(item: any, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                  shape="square"
                  style={{
                    border: "1px solid var(--border-color-default)",
                  }}
                />
              }
              title={
                <div
                  style={{
                    color: "var(--font-color-muted)",
                  }}
                >
                  {item.name}
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ActiveUsersDisplay;
