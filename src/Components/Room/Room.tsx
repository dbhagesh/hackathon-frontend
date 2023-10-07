import Editor from '@monaco-editor/react';
import { Button, Tabs, TabsProps, Tag, notification } from 'antd';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from "react";
import { BiSolidUpArrow } from "react-icons/bi";
import { useNavigate, useParams } from 'react-router-dom';
import UpIcon from "../../asset/UpIcon.png";
import { useGlobalStore } from '../../stores/global';
import "./room.scss";

const Question = ({question, index}: any) => {
  return <div style={{marginBottom: "1rem", textAlign: "left"}}>
    <div style={{fontSize: "26px", display:"flex", justifyContent:"space-between"}} >
      <div>{`${index + 1}. ${question.title}`}</div>
      {question.level === "Easy" && <Tag style={{height: "1.5rem"}} color='#52c41a'>Easy</Tag>}
      {question.level === "medium" && <Tag style={{height: "1.5rem"}} color='#faad14'>Medium</Tag>}
      {question.level === "hard" && <Tag style={{height: "1.5rem"}} color='red'>Hard</Tag>}
    </div>
    <div>{question.description}</div>
  </div>
}

const Context = React.createContext({ name: 'Default' });
const Room = () => {
  const [api, contextHolder] = notification.useNotification();
  const {id} = useParams();
  const navigate = useNavigate();
  const [defaultValue, setDefaultValue] = useState("#Write your code here");
  const [loading, setLoading] = useState(false);
  const [compiling, setCompiling] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);

  const [activeQuestionId, setActivequestionId] = useState(""); 
  const [editorContent, setEditorContent] = useState();
  
  const { isLoggedIn, dispatch } = useGlobalStore();
  const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

  const handleCompile = (code: any, qId: any) => {
    if(isLoggedIn) {
      setCompiling(true);
      
      axios.get(`/compile/executePython/${btoa(code)}/${qId}/${isLoggedIn.id}`).then(({data}) => {
        if(data === true) {
          api.success({
            message: `Your code compiled successfully`,
            description: "You can continue to next ques",
            placement: "topRight",
          });
        } else {
          api.error({
            message: `Your code compilation failed`,
            description: "Go to learn tab or try again",
            placement: "topRight",
          });
        }
      })
    }
  }

  useEffect(() => {
    setLoading(true);
    axios.get(`room/getRoom/${id}`).then(({data}) => {
      setQuestions(data.questions);
      if(data.questions.length > 0) {
        setActivequestionId(data.questions[0].id);
        setEditorContent(data.questions[0].functionTemplate);
        setDefaultValue(atob(data.questions[0].functionTemplate))
      }
      setUsers(data.users);
    }).catch(() => {
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const activeQuestion = useMemo(() => {
    const q = questions?.filter((q: any)=> String(q.id) === activeQuestionId )
    if(q.length > 0) {
      setDefaultValue(atob((q[0] as any).functionTemplate))
      return q[0]
    }
    return undefined;
  }, [activeQuestionId])

  if(id === undefined || id === null) {
    navigate("/");
    return <></>
  }

  const items: TabsProps['items'] = questions?.map((q, index) => {
      return {
        key: String(index),
        label: `Question ${index + 1}`,
        children: <Question question={q} index={index} />}
    })

  return <div>
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div style={{display: "flex", width: "100%"}}>
        <div style={{width: "30%", borderRight: "1px solid black", padding: "0 20px"}}>
          <div className="text-and-icon-center" style={{margin: "1rem 0"}}>
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
          <Tabs defaultActiveKey="1" items={items} onChange={(i) => {setActivequestionId(String(i))}} />
        </div>
        <div style={{width: "100%"}}>
          <div style={{textAlign:"left", padding: "0.5rem 0.4rem", fontWeight: 600, fontSize: "22px", borderBottom: "1px solid black"}}>{(activeQuestion as any)?.title}</div>
          <Editor onChange={(c: any) => {
            setEditorContent(c);
          }} height="89vh" defaultLanguage="python" defaultValue={defaultValue} />
          <div style={{textAlign:"left", display:"flex", justifyContent:"space-between", padding: "0.5rem 0.4rem", fontWeight: 600, fontSize: "22px", borderTop: "1px solid black"}}> 
            <Button icon={<BiSolidUpArrow />} type="default" htmlType="submit">
                Console
              </Button>
            <div style={{display: "flex",gap: "1rem"}}>
              <Button type="default" htmlType="submit">
                Compile
              </Button>
              <Button style={{backgroundColor:"green", color: "white"}} onClick={() => {handleCompile(editorContent, activeQuestionId)}} htmlType="submit">
                Run
              </Button>
            </div> 
          </div>
        </div>
        <div style={{width: "20%", borderLeft: "1px solid black"}}>chat</div>
      </div>
    </Context.Provider>

  </div>
};

export default Room;
