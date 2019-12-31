import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import yelp from '../api/yelp';

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const id = navigation.getParam('id');

  const getResult = async id => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };

  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return null;
  }

  console.log(result);

  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={result.photos}
        keyExtractor={photo => photo}
        renderItem={({ item }) => (
          <Image style={styles.image} source={{ uri: item }} />
        )}
      />
      <Text style={styles.title}>{result.name}</Text>
      <Text style={styles.subheader}>Address:</Text>
      <FlatList
        data={result.location.display_address}
        keyExtractor={location => location}
        renderItem={({ item }) => {
          return <Text>{item}</Text>;
        }}
      />
      <Text>Price: {result.price}</Text>
      <Text>Rating: {result.rating}</Text>
      <Text>Number of reviews: {result.review_count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10
  },
  subheader: {
    fontWeight: 'bold',
    fontSize: 14,
    padding: 10
  },
  image: {
    height: 200,
    width: 300,
    margin: 10
  }
});

export default ResultsShowScreen;
