export const fetchBooks = async (str = "recent") => {
  const url = `https://www.dbooks.org/api/${str}`;
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch Books");
    }
  } catch (error) {}
};
