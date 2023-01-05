import axios from 'axios';

export const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL;

export async function getServer() {
  console.log('Server:', process.env.REACT_APP_SERVER_BASE_URL);
  const res = await axios.get(`${serverBaseUrl}/`);
  const data = res.data;
  console.log(data);
  return data;
}

export async function getCodeBlocksTitles() {
  // TODO: replace dummy data with real data from DB
  const res = await axios.get(`${serverBaseUrl}/code-blocks-titles`);
  const data = res.data;
  return data;
}
