// src/api/custom-fetch.ts

export const customFetch = async ({ url, method, headers, body }: any) => {
    const token = localStorage.getItem('token');
  
    return fetch(url, {
      method,
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
      body,
    }).then(async (res) => {
      if (!res.ok) throw await res.json();
      return res.json();
    });
  };