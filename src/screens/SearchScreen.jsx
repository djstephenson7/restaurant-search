import React, { useState } from "react";
import { View, Text } from "react-native";
import SearchBar from "../components/SearchBar";
import yelp from "../api/yelp";

const SearchScreen = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const searchApi = async () => {
    const response = await yelp
      .get("/search", {
        params: {
          limit: 50,
          term,
          location: "London"
        }
      })
      .catch(error => {
        console.log(error);
        setError("Something went wrong!");
      });
    setResults(response.data.businesses);
  };

  return (
    <View>
      <SearchBar term={term} onTermChange={setTerm} onTermSubmit={searchApi} />
      {error ? <Text>error</Text> : null}
      <Text>We have found {results.length} results</Text>
    </View>
  );
};

export default SearchScreen;
