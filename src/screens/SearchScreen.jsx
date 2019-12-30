import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";
import ResultsList from "../components/ResultsList";

const SearchScreen = () => {
  const [term, setTerm] = useState("");
  const [searchApi, results, error] = useResults();

  const filterResultsByPrice = price => {
    return results.filter(result => {
      return result.price === price;
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {error ? <Text>Something went wrong!</Text> : null}
      <Text>We have found {results.length} results</Text>
      <ScrollView>
        <ResultsList
          results={filterResultsByPrice("£")}
          title="Cost Effective"
        />
        <ResultsList results={filterResultsByPrice("££")} title="Bit Pricier" />
        <ResultsList
          results={filterResultsByPrice("£££")}
          title="Big Spender"
        />
        <ResultsList
          results={filterResultsByPrice("££££")}
          title="Lottery Winner!"
        />
      </ScrollView>
    </View>
  );
};

export default SearchScreen;
