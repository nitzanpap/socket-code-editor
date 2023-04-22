import axios from 'axios';

export const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;

export async function getServer() {
  console.log('Server:', serverBaseUrl);
  const res = await axios.get(`${serverBaseUrl}/`);
  const data = res.data;
  console.log(data);
  return data;
}

export async function getCodeBlocksTitles() {
  const res = await axios.get(`${serverBaseUrl}/api/get/code-blocks-titles`);
  const data = res.data;
  return data;
}

export async function getCodeBlock(id) {
  const res = await axios.get(`${serverBaseUrl}/api/get/code-block:${id}`);
  const data = res.data;
  return data;
}
