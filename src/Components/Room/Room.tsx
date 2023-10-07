import Editor from '@monaco-editor/react';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import "./room.scss";

const Question = ({question, index}: any) => {
  return <div style={{marginBottom: "1rem"}}>
    <div style={{fontSize: "30px"}}>{`${index + 1} ${question.title}`}</div>
    <div>{question.description}</div>
  </div>
}

const Room = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [defaultValue, setDefaultValue] = useState("#Write your code here");
  const [loading, setLoading] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get(`room/getRoom/${id}`).then(({data}) => {
      console.log("data", data);
      setQuestions(data.questions);
      setUsers(data.users);
    }).catch(() => {
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  if(id === undefined || id === null) {
    navigate("/");
    return <></>
  }

  return <div>
    <div style={{display: "flex", width: "100%"}}>
      <div style={{width: "30%", borderRight: "1px solid black"}}>
        <div style={{marginBottom: "1rem"}}>Questions</div>
        {questions.map((q: any, index: number)=> <Question key={q.id} question={q} index={index} />)}
      </div>
      <div style={{width: "100%"}}>
        <Editor height="100vh" defaultLanguage="python" defaultValue={defaultValue} />
      </div>
      <div style={{width: "20%", borderLeft: "1px solid black"}}>chat</div>
    </div>

  </div>
};

export default Room;
