import { Avatar, Progress } from "antd";
import { AiOutlineFire } from "react-icons/ai";
import { BsGem } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { SlGraph } from "react-icons/sl";
import { useGlobalStore } from "../../stores/global";

const UserPanel = () => {
  const { isLoggedIn } = useGlobalStore();

  if (isLoggedIn) {
    return (
      <div
        style={{
          boxShadow: "0px -18px 15px -11px rgba(0,0,0,0.1)",
          paddingTop: "20px",
          padding: "10px",
          margin: "0 -10px",
        }}
      >
        <div style={{ display: "flex", padding: "5px", gap: "20px" }}>
          <Avatar
            src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
            shape="square"
            size={60}
            style={{
              padding: "5px",
              border: "1px solid var(--border-color-default)",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                textAlign: "left",
                color: "var(--font-color-muted)",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {isLoggedIn.name}
              <IoMdSettings />
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <div
                style={{
                  textAlign: "left",
                  display: "flex",
                  gap: "5px",
                }}
              >
                <BsGem color="grey" />
                <div
                  style={{
                    fontSize: "14px",
                    color: "grey",
                  }}
                >
                  0
                </div>
              </div>

              <div
                style={{
                  textAlign: "left",
                  display: "flex",
                  gap: "5px",
                }}
              >
                <AiOutlineFire color="grey" />
                <div
                  style={{
                    fontSize: "14px",
                    color: "grey",
                  }}
                >
                  0
                </div>
              </div>

              <div
                style={{
                  textAlign: "left",
                  display: "flex",
                  gap: "5px",
                }}
              >
                <SlGraph color="grey" />
                <div
                  style={{
                    fontSize: "14px",
                    color: "grey",
                  }}
                >
                  0
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Divider /> */}
        <Progress
          percent={50}
          showInfo={false}
          style={{
            marginBottom: "0px",
          }}
        />
        <div
          style={{
            textAlign: "left",
            color: "var(--font-color-muted)",
            fontSize: "14px",
          }}
        >
          21 / 30XP
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default UserPanel;
