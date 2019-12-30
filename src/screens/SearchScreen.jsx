import React, { useState } from "react";
import { View, Text } from "react-native";
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";

const SearchScreen = () => {
  const [term, setTerm] = useState("");
  const [searchApi, results, error] = useResults();

  return (
    <View>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {error ? <Text>Something went wrong!</Text> : null}
      <Text>We have found {results.length} results</Text>
    </View>
  );
};

export default SearchScreen;
