class Api {
  constructor({ url }) {
    this._url = url;
  }

  _getHeaders() {
    const token = localStorage.getItem('jwt');
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getData(path) {
    return fetch(`${this._url}${path}`, {
      headers: this._getHeaders(),
    }).then(this._handleResponse);
  }

  profileEdit({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({ name, about }),
    }).then(this._handleResponse);
  }

  avatarEdit(url) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({ avatar: url }),
    }).then(this._handleResponse);
  }

  sendCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({ name: data.name, link: data.link }),
    }).then(this._handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    }).then(this._handleResponse);
  }

  addLike(id) {
    return fetch(`${this._url}/cards/${id}/likes/`, {
      method: 'PUT',
      headers: this._getHeaders(),
    }).then(this._handleResponse);
  }

  removeLike(id) {
    return fetch(`${this._url}/cards/${id}/likes/`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    }).then(this._handleResponse);
  }
}

export const api = new Api({
  url: 'http://localhost:3000', // 👉 agora usa o seu backend
});
