import { Button, Form, Input, Modal, Select, Tag } from "antd";
import { useEffect, useState } from "react";
import { BsGem } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { addUserToRoomAPI, createRoomAPI, getRoomsAPI } from "../../apis/apis";
import Loader from "../../routes/loader";
import { useGlobalStore } from "../../stores/global";
const getTagColor = (type: string) => {
  if (type == "easy") {
    return "green";
  } else if (type == "medium") {
    return "orange";
  } else if (type == "hard") {
    return "red";
  }
};
const RoomMetaData = ({ id, name, type, userId, dispatch, navigate }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleJoin = () => {
    addUserToRoomAPI(id, userId).then(({ data }) => {
      dispatch({
        type: "UPDATE_STATE",
        payload: {
          currentRoom: data,
        },
      });
      navigate(`/room/${id}`);
    });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleJoin}
      style={{
        padding: "10px",
        borderRadius: "10px",
        border: "1px solid var(--border-color-muted)",
        display: "flex",
        flexDirection: "column",
        marginBottom: "10px",
        // color: #254685;
        // background-color: rgba(72, 113, 194, 0.1490196078);
        background: isHovered ? "rgba(72, 113, 194, 0.1490196078)" : "white",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            color: "var(--black-color)",
          }}
        >
          {name}
        </div>
        <Tag color={getTagColor(type)} bordered={false}>
          {type}
        </Tag>
      </div>
      <div
        style={{
          textAlign: "left",
          display: "flex",
          gap: "5px",
        }}
      >
        <BsGem color={"grey"} />
        <div
          style={{
            fontSize: "14px",
            color: "grey",
          }}
        >
          2
        </div>
      </div>
    </div>
  );
};

const ActiveRoomDisplay = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dispatch, isLoggedIn } = useGlobalStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [rooms, setRooms] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const formLayout = "vertical";
  const [form] = Form.useForm();
  console.log("USER : ", isLoggedIn);

  const onFinish = (values: any) => {
    createRoomAPI(values.name, values.timer, values.type).then(({ data }) => {
      addUserToRoomAPI(data.id, isLoggedIn!.id).then(() => {
        dispatch({
          type: "UPDATE_STATE",
          payload: {
            currentRoom: data,
          },
        });
        navigate(`/room/${data.id}`);
      });
    });
  };
  useEffect(() => {
    setLoading(true);
    getRoomsAPI().then(({ data }) => {
      setRooms(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loader size="small" />;
  }

  return (
    <div
      style={{
        height: "calc(100% - 20px)",
        padding: "20px 10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            color: "var(--font-color-muted)",
          }}
        >
          ACTIVE ROOMS
        </div>
        <Button type="primary" onClick={showModal}>
          Create room
        </Button>
        <Modal
          title="Create Room Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={false}
        >
          <Form
            // {...formItemLayout}
            layout={formLayout}
            form={form}
            initialValues={{ timer: "60", type: "easy" }}
            style={{
              maxWidth: 600,
              // padding: "50px 30px",
              // borderRadius: "4px",
              // border: "1px solid var(--border-color-default)",
            }}
            onFinish={onFinish}
          >
            <Form.Item label="Name" name={"name"}>
              <Input placeholder="Your Name" />
            </Form.Item>
            <Form.Item label="Problem Difficulty" name={"type"}>
              <Select
                defaultValue="easy"
                style={{ width: 120 }}
                options={[
                  { value: "easy", label: "easy" },
                  { value: "medium", label: "medium" },
                  { value: "hard", label: "hard" },
                ]}
              />
            </Form.Item>
            <Form.Item label="timer" name={"timer"}>
              <Select
                defaultValue="60"
                style={{ width: 120 }}
                options={[
                  { value: "30", label: "30mins" },
                  { value: "60", label: "60mins" },
                  { value: "90", label: "90mins" },
                ]}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      {rooms.map((room: any) => {
        return (
          <RoomMetaData
            id={room.id}
            name={room.name}
            type={room.level}
            userId={isLoggedIn?.id}
            dispatch={dispatch}
            navigate={navigate}
          />
        );
      })}
      {/* <RoomMetaData name={"The smashers"} type={"hard"} /> */}
    </div>
  );
};

export default ActiveRoomDisplay;
