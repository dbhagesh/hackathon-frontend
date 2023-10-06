import { Space, Table, Tag } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getQuestionsAPI } from "../../apis/apis";

const QuestionList = () => {
  const columns: any = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: any, record: any) => (
        <Link to={`/quesiton/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_: any, { tags }: any) => (
        <>
          {tags.map((tag: any) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data: any = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  useEffect(() => {
    getQuestionsAPI().then(() => {});
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default QuestionList;
