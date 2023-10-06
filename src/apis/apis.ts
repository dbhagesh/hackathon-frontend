import axios, { AxiosResponse } from "axios";

export const loginUserAPI = (
  id: string,
  name: string,
  pass: string
): Promise<AxiosResponse<any, any>> => {
  return axios.get(`user/login/${id}/${name}/${pass}`);
};

export const createRoomAPI = (
  name: string,
  timer: string,
  type: string
): Promise<AxiosResponse<any, any>> => {
  return axios.post(`room/createRoom/${name}/${timer}/${type}`);
};

export const getRoomsAPI = (): Promise<AxiosResponse<any, any>> => {
  return axios.get(`room/getRooms`);
};

export const getRoomAPI = (id: string): Promise<AxiosResponse<any, any>> => {
  return axios.get(`room/getRooms`);
};

export const getUsersAPI = (): Promise<AxiosResponse<any, any>> => {
  return axios.get(`user/getUsers`);
};

export const getQuestionsAPI = (): Promise<AxiosResponse<any, any>> => {
  return axios.get(`question/questions`);
};

export const addUserToRoomAPI = (
  roomId: string,
  userId: string
): Promise<AxiosResponse<any, any>> => {
  return axios.post(`room/addUser/${roomId}/${userId}`);
};

export const removeUserFromRoomAPI = (
  roomId: string,
  userId: string
): Promise<AxiosResponse<any, any>> => {
  return axios.post(`room/removeUser/${roomId}/${userId}`);
};
