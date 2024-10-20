import axios from "axios";

export default async function fetchData<T>(url: string): Promise<T> {
  const accessToken = localStorage.getItem("access_token");
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}
