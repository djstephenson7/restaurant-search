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
      <View style={styles.container}>
        <Text style={styles.title}>{result.name}</Text>
        <Text style={styles.price}>Price: {result.price}</Text>
      </View>
      <Text style={styles.addressHeader}>Address:</Text>
      <FlatList
        style={styles.text}
        data={result.location.display_address}
        keyExtractor={location => location}
        renderItem={({ item }) => {
          return <Text>{item}</Text>;
        }}
      />
      <Text style={styles.text}>Rating: {result.rating}</Text>
      <Text style={styles.text}>Number of reviews: {result.review_count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10
  },
  price: {
    padding: 10,
    paddingTop: 12,
    marginLeft: 'auto'
  },
  addressHeader: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: 10
  },
  text: {
    fontSize: 14,
    padding: 10,
    paddingTop: 0
  },
  image: {
    height: 200,
    width: 300,
    margin: 10
  }
});

export default ResultsShowScreen;
