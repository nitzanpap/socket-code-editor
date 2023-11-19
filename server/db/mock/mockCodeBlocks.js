export const mockCodeBlocks = [
  {
    title: 'Async',
    code: `console.log('Hello World');
    'async function getData() {
    try {
      const response = await fetch('https://api.example.com/endpoint');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  
  getData()
    .then(data => console.log(data))
    .catch(error => console.error(error));`,
  },
  {
    title: 'Callback',
    code: `console.log('Hello World');
        function getData() {
        fetch('https://api.example.com/endpoint')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }`,
  },
  {
    title: 'Promise',
    code: `console.log('Hello World');
        function getData() {
        fetch('https://api.example.com/endpoint')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }`,
  },
  {
    title: 'Fetch',
    code: `console.log('Hello World');
        function getData() {
        fetch('https://api.example.com/endpoint')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }`,
  },
  {
    title: 'Axios',
    code: `console.log('Hello World');
        function getData() {
        fetch('https://api.example.com/endpoint')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }`,
  },
  {
    title: 'Map',
    code: `console.log('Hello World');
        function getData() {
        fetch('https://api.example.com/endpoint')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }`,
  },
  {
    title: 'Filter',
    code: `console.log('Hello World');
        function getData() {
        fetch('https://api.example.com/endpoint')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }`,
  },
  {
    title: 'Reduce',
    code: `console.log('Hello World');
        function getData() {
        fetch('https://api.example.com/endpoint')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }`,
  },
  {
    title: 'Sort',
    code: `console.log('Hello World');
        function getData() {
        fetch('https://api.example.com/endpoint')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }`,
  },
];
