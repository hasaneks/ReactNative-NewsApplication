import React, { Component } from 'react';
import { SafeAreaView, FlatList, Text, View, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const language = [
  {
    id: 'en',
    title: 'Global',
    flag: 'https://hasaneksi.net/wp-content/uploads/2020/04/uk_flag.png',
  },
  {
    id: 'tr',
    title: 'Turkey',
    flag: 'https://hasaneksi.net/wp-content/uploads/2020/04/turkey_flag.png',
  },
  {
    id: 'de',
    title: 'Germany',
    flag: 'https://hasaneksi.net/wp-content/uploads/2020/04/germany_flag.png',
  },
  {
    id: 'fr',
    title: 'France',
    flag: 'https://hasaneksi.net/wp-content/uploads/2020/04/france_flag.png',
  },
  {
    id: 'ru',
    title: 'Russia',
    flag: 'https://hasaneksi.net/wp-content/uploads/2020/04/russia_flag.png',
  },
];
export default class Language extends Component {

  state = {
    language,
  };

  goToNews = item => {
    this.props.navigation.navigate('News',{
        language:item
    });
  }

  renderData = (item, index) => {
    return (
      <TouchableOpacity style={styles.listItem} key={index} onPress={() => this.goToNews(item)}>
        <Image style={styles.listItemImage} source={{ uri: item.item.flag }} />
        <Text style={styles.lisItemTitle} >{item.item.title}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    console.log("sayfa yüklendi");
    return (
      <SafeAreaView style={styles.container}>
      <Text style={{position:'absolute',top:50,fontSize:20,fontWeight:'bold'}}>Select News Country</Text>
        <FlatList
          data={this.state.language}
          renderItem={this.renderData}
          keyExtractor={(index) => index.toString()}
          style={styles.flatListArea}
        />

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',

  },
  flatListArea: {
  },
  listItem: {
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    flexDirection:'row',
    backgroundColor:'#fff'
  },
  listItemImage: {
    height: 32,
    width: 32,
    marginRight:25,
  },
  lisItemTitle: {
    fontSize: 20,
    fontWeight: '600',
  }
});
