INSERT INTO public.code_blocks (
title, code, solution) VALUES (
'Async Case'::text, 'console.log(''Hello World'');'::text, 'async function getData() {
  try {
    const response = await fetch(''https://api.example.com/endpoint'');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

getData()
  .then(data => console.log(data))
  .catch(error => console.error(error));'::text)
 returning id;
