import { Button, Form, Input, notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import Context from "react-redux/es/components/Context";
import { useNavigate } from "react-router-dom";
import { loginUserAPI } from "../../apis/apis";
import { useGlobalStore } from "../../stores/global";

const UserLoginModal = () => {
  const { dispatch } = useGlobalStore();
  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const formLayout = "vertical";

  const openNotification = (placement: NotificationPlacement, name: string) => {
    api.info({
      message: `Notification ${placement}`,
      description: (
        <Context.Consumer>
          {({ name }: any) => `Hello, ${name}!`}
        </Context.Consumer>
      ),
      placement,
    });
  };

  const onFinish = (values: any) => {
    console.log("val", values);
    loginUserAPI(values.id, values.username, values.password)
      .then(({ data }) => {
        dispatch({
          type: "UPDATE_STATE",
          payload: {
            isLoggedIn: {
              id: data.id,
              name: values.username,
            },
          },
        });

        navigate("/home/questions");
      })
      .catch((error: any) => {
        console.log(error);
        // openNotification("bottomRight", "name");
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Form
        // {...formItemLayout}
        layout={formLayout}
        form={form}
        // initialValues={{ layout: formLayout }}
        style={{
          maxWidth: 600,
          padding: "50px 30px",
          borderRadius: "4px",
          border: "1px solid var(--border-color-default)",
        }}
        onFinish={onFinish}
      >
        <Form.Item label="Id" name={"id"}>
          <Input placeholder="Your Id" />
        </Form.Item>
        <Form.Item label="User Name" name={"username"}>
          <Input placeholder="User name" />
        </Form.Item>
        <Form.Item label="Password" name={"password"}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserLoginModal;
