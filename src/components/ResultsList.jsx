import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import ResultsDetail from "./ResultsDetail";

const ResultsList = ({ title, results }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={results}
        keyExtractor={result => result.id}
        renderItem={({ item }) => <ResultsDetail result={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  },
  container: {
    marginBottom: 10
  }
});

export default ResultsList;
