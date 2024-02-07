const { useEffect, useState } = require("react")

const useFetch = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (url, reqData = null) => {
    if (!url) return;
    try {
      setIsLoading(true);

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/${url}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };


  return { data, isLoading, error, fetchData };
}
export default useFetch;