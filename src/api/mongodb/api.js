import { store } from "../../store/store";

const host = import.meta.env.VITE_BACKEND_API_URL;

const getCommonHeader = () => {
  const state = store.getState();
  const token = state.auth.user?.token;

  return {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const getHeader = () => {
  return {
    "Content-type": "application/json",
  };
};

export const getBooks = async ({ userId }) => {
  const url = `${host}/books/user/${userId}`;
  const headers = getCommonHeader();
  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch books");
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const addBook = async (data) => {
  const url = `${host}/books`;
  const headers = getCommonHeader();
  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        data: data.data,
        user: data.user,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to add book");
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const updateBook = async (data) => {
  const bookId = data.bookId;
  const url = `${host}/books/${bookId}`;
  const headers = getCommonHeader();
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        data: data.data,
        user: data.user,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to update book");
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteBook = async (bookId) => {
  const url = `${host}/books/${bookId}`;
  const headers = getCommonHeader();
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers,
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to delete book");
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const addRecent = async (data) => {
  const apiUrl = `${host}/recents`;
  const headers = getCommonHeader();
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to add recent book");
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteRecent = async (bookId) => {
  const url = `${host}/recents/${bookId}`;
  const headers = getCommonHeader();
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers,
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to delete recent book");
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getRecents = async ({ userId }) => {
  const url = `${host}/recents/user/${userId}`;
  const headers = getCommonHeader();
  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch recent books");
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const addFavourite = async (data) => {
  const apiUrl = `${host}/favourites`;
  const headers = getCommonHeader();
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch add favourite book");
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteFavourite = async (bookId) => {
  const url = `${host}/favourites/${bookId}`;
  const headers = getCommonHeader();
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers,
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to delete favourite book");
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getFavourites = async ({ userId }) => {
  const url = `${host}/favourites/user/${userId}`;
  const headers = getCommonHeader();
  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch favourite books");
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const signup = async ({ name, email, password, image }) => {
  const url = `${host}/users/signup`;
  const headers = getHeader();
  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ name, email, password, image }),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const login = async ({ email, password }) => {
  const url = `${host}/users/login`;
  const headers = getHeader();
  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getUsers = async () => {
  const url = `${host}/users`;
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch users");
    }
  } catch (error) {
    throw new Error(error);
  }
};
