const url = 'https://pochita.herokuapp.com';
 const urlx = 'http://192.168.1.135:3000/'
const headers = { 'Content-Type': 'application/json' };

const send = async (method, endpoint, body) => {
  let response;

  body == null
    ? (response = await fetch(urlx + endpoint, {
        method,
        mode: 'cors',
        headers,
      }))
    : (response = await fetch(urlx + endpoint, {
        method,
        mode: 'cors',
        headers,
        body: JSON.stringify(body),
      }));

  return await response.json();
};


export default {
  send,
};