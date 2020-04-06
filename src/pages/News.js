import React, { Component } from 'react';
import { SafeAreaView, Text, FlatList, ScrollView, View, StyleSheet, Dimensions, ImageBackground, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

// import NewsDetail from './NewsDetail';

const { width } = Dimensions.get('window');

import axios from 'axios';

const newsApiKey = ''; //News Api Key

//FlatList Column Number
const listColumnNumber = 2;

export default class News extends Component {

    state = {
        newsData: [],
        sliderData: [],
        loadMore: true,
        page: 1,
        logOut:false,
        newsLanguage:'tr',
    };

    signOut = () => {
    //   firebase.auth().signOut()
    //   .then(
    //     this.props.navigation.navigate('Language')
    //   )
    this.props.navigation.navigate('Language')
    };

    componentDidMount() {
        const countryCode = this.props.route.params.language.item.id;
        this.getNewsData(countryCode);
        this.getSliderData(countryCode);

    };

    getNewsData = async (countryCode) => {
        if(countryCode === '')
        countryCode = 'tr';
      
        this.setState({
            loadMore: true,
        });
        console.log("getNewsData");
        try {
            const { data: { articles } } = await axios.get(`https://newsapi.org/v2/top-headlines?country=${countryCode}&page=${this.state.page}&apiKey=${newsApiKey}`);
            const fullData = [...this.state.newsData, ...articles];
            this.setState({
                newsData: fullData,
                loadMore: false,
            });
        } catch (error) {
            this.setState({
                loadMore: true,
            });
            alert("Not Found Data!")
        }
    };

    getSliderData = async (countryCode) => {
        if(countryCode === '')
            countryCode = 'tr';

        const { data: { articles } } = await axios.get(`https://newsapi.org/v2/top-headlines?country=${countryCode}&page=5&pageSize=5&apiKey=${newsApiKey}`);
        this.setState({
            sliderData: articles,
        });
    };
    ListLoadCircle = () => {
        if (!this.state.loadMore)
            return null;
        return (
            <View style={{ padding: 50 }}>
                <ActivityIndicator size={"large"} />
            </View>
        )
    };

    goToDetail = (user,dataType) => {
        console.log(user);
        this.props.navigation.navigate('NewsDetail',{
            user,
            dataType
        });
    };

    renderData = (item, index) => {
        return (
            <TouchableOpacity style={[styles.newsCard]} onPress={() => this.goToDetail(item,'list')}>
                <Image style={styles.newsCardImage} source={{ uri: item.item.urlToImage }} />
                <View style={styles.newsCardTextArea}>
                    <Text style={styles.newsCardSource}>{item.item.author}</Text>
                    <Text style={styles.newsCardTitle} numberOfLines={7}>{item.item.title}</Text>
                </View>
                <Text style={styles.newsCardDate}>3 Hour Ago</Text>
            </TouchableOpacity>
        )
    };

    loadMoreData = () => {
        console.log("LoadMoreData");
        this.setState({
            page: this.state.page + 1,
        }, () => {
            this.getNewsData();
        })
    };

    renderSliderData = () => {
        return this.state.sliderData.map((sliderData, index) =>
            <View style={styles.sliderCard} key={index}>
                <View style={styles.sliderBackgroundArea} >
                    <Image style={styles.sliderBackground} source={{ uri: sliderData.urlToImage }} />
                    <TouchableOpacity style={styles.sliderTextArea} onPress={() => this.goToDetail(sliderData,'slider')}>
                        <Text style={styles.sliderSource}>{sliderData.author === null ? 'News Application' : sliderData.author}</Text>
                        <Text style={styles.sliderTitle} numberOfLines={2}>{sliderData.title}</Text>
                        <Text style={styles.sliderDate}>12 Saat Önce</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    HeaderSlider = () => {
        return (
            <View>
                <View style={styles.header}>
                    <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>News Application</Text>
                    <TouchableOpacity style={{position:'absolute',right:10}} onPress={this.signOut}>
                        <Image style={{height:18,widht:18,resizeMode:'contain'}} source={require('../img/log-out.png')}/>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    horizontal={true}
                    pagingEnabled={true}
                    persistentScrollbar={true}
                >
                    {this.renderSliderData()}

                </ScrollView>
            </View>
        )
    };

    render() {
        return (
            <View style={styles.Container}>
                <SafeAreaView />
                <FlatList
                    renderItem={this.renderData}
                    data={this.state.newsData}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={listColumnNumber}
                    style={styles.newsCardList}
                    ListHeaderComponent={this.HeaderSlider}
                    ListHeaderComponentStyle={styles.headerArea}
                    ListFooterComponent={this.ListLoadCircle}

                    onEndReached={this.loadMoreData}
                    onEndReachedThreshold={0}
                />
            </View>

        );
    }
}

const light_gray = '#E1E1E1';
const dark_gray = '#ABAAAA';

const styles = StyleSheet.create({

    Container: {
        flex: 1,
    },
    headerArea: {
        marginBottom: 10
    },
    header: {
        height: 50,
        borderBottomWidth: 1.5,
        borderBottomColor: light_gray,
        alignItems: 'center',
        justifyContent:'center',
        flexDirection: 'row',
    },
    sliderCard: {
        width,
        height: 250,
        padding: 10,
        paddingBottom: 20
    },
    sliderBackgroundArea: {
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
    },
    sliderBackground: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
        opacity: 0.7,
        backgroundColor: '#000',

    },
    sliderTextArea: {
        position: 'absolute',
        bottom: 15,
        width: '100%',
        height: '50%',
        padding: 10,
    },
    sliderSource: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        fontSize: 10,
        borderRadius: 5,
        alignSelf: 'flex-start',
        backgroundColor: '#2975e7',
        color: '#FCFBFB',
        fontWeight: '100'
    },
    sliderTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 5,
    },
    sliderDate: {
        fontSize: 12,
        marginTop: 5,
        textAlign: 'right',
        color: '#FCFBFB',
        position: 'absolute',
        bottom: -5,
        right: 15
    },
    newsCardList: {
        flex: 1,
    },
    newsCard: {
        height: 'auto',
        minHeight: 200,
        width: width / listColumnNumber,
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: light_gray,
        paddingBottom: 30,
    },
    newsCardImage: {
        height: 100,
        width: '100%',
    },
    newsCardTextArea: {
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    newsCardSource: {
        fontSize: 10,
        marginTop: 10,
        color: dark_gray,
    },
    newsCardTitle: {
        fontSize: 18,
        lineHeight: 25,
        fontWeight: '700',
        marginTop: 10,
    },
    newsCardDate: {
        fontSize: 10,
        marginTop: 10,
        position: 'absolute',
        bottom: 10,
        left: 10,
        color: dark_gray,
    },
})

