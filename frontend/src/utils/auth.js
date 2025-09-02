export const BASE_URL = 'https://se-register-api.en.tripleten-services.com/v1';

async function getData(url, options) {
  const res = await fetch(url, options);

  if (!res.ok) {
    throw res.status;
  }

  return res.json();
}

export const register = ({ email, password }) => {
  return getData(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
};

export const authorize = ({ email, password }) => {
  return getData(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
};

export const checkToken = (token) => {
  return getData(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
