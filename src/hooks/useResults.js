import { useEffect, useState } from "react";
import yelp from "../api/yelp";

export default () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const searchApi = async searchTerm => {
    const response = await yelp
      .get("/search", {
        params: {
          limit: 50,
          term: searchTerm,
          location: "London"
        }
      })
      .catch(error => {
        console.log(error);
        setError("Something went wrong!");
      });
    setResults(response.data.businesses);
  };

  useEffect(() => {
    searchApi("pasta");
  }, []);

  return [searchApi, results, error];
};
