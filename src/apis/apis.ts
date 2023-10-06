import axios, { AxiosResponse } from "axios";

export const loginUserAPI = (
  id: string,
  name: string,
  pass: string
): Promise<AxiosResponse<any, any>> => {
  console.log("id : ", id, " name: ", name, " pass : ", pass);
  return axios.get(`user/login/${id}/${name}/${pass}`);
};
