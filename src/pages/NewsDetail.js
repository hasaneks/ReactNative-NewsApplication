import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Button, ScrollView, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class NewsDetail extends Component {

    state = {
        author: [],
        title: '',
        sourceName: '',
        content: '',
        imageURL: '',
        newsURL: ''
    }
    componentDidMount() {
        const data = this.props.route.params.user;
        const getDataType = this.props.route.params.dataType;

        console.log('getDataType : ' + getDataType);
        
        if(getDataType === 'list'){
            this.setState({
                title: data.item.title,
                sourceName: data.item.author,
                content: data.item.content,
                imageURL: data.item.urlToImage,
                newsURL: data.item.url,
            })
        }
        else if(getDataType === 'slider'){
            this.setState({
                title: data.title,
                sourceName: data.author,
                content: data.content,
                imageURL: data.urlToImage,
                newsURL: data.url,
            })
        }
    };

    viewSource = () => {
        Linking.openURL(this.state.newsURL)
    };

    render() {
        const { title, sourceName, content, imageURL, newsURL } = this.state;
        return (
            <ScrollView>
                <SafeAreaView />
                <View style={styles.header}>
                    <Text style={styles.sourceName}>{sourceName}</Text>
                </View>
                <View>
                    <Image style={styles.newsImage} source={{ uri: imageURL }} />
                </View>
                <View style={styles.textArea}>
                    <Text style={styles.newsTitle}>{title}</Text>
                    <Text style={styles.newsContent}>{content}</Text>
                </View>
                <TouchableOpacity style={styles.sourceViewButton} onPress={this.viewSource}>
                    <Text style={styles.sourceViewText}>View Source</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const light_gray = '#E1E1E1';
const dark_gray = '#ABAAAA';

const styles = StyleSheet.create({
    header: {
        height: 50,
        borderBottomWidth: 1,
        justifyContent: 'center',
        borderBottomColor: light_gray,
    },
    sourceName: {
        fontSize: 23,
        fontWeight: '600',
        textAlign: 'center'
    },
    newsImage: {
        height: 250,
        width: '100%'
    },
    textArea: {
        padding: 10,
    },
    newsTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 15,
        borderLeftWidth:3,
        paddingLeft:15,
        borderLeftColor:'#2975e7'
    },
    newsContent: {
        fontSize: 18,
        marginTop: 25,
    },
    sourceViewButton:{
        width:'50%',
        height:40,
        backgroundColor:'#2975e7',
        marginLeft:'auto',
        marginRight:'auto',
        justifyContent: 'center',
        alignItems:'center',
        borderRadius:25,
        marginTop:25,
        marginBottom:25,

    },
    sourceViewText:{
        fontSize:18,
        color:'#fff',
    }

});