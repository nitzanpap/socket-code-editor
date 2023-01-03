import axios from 'axios';

const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL;

export async function getServer() {
  console.log('Server:', process.env.REACT_APP_SERVER_BASE_URL);
  const res = await axios.get(`${serverBaseUrl}/`);
  const data = res.data;
  console.log(data);
  return data;
}
