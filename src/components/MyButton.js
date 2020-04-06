import React, { Component } from 'react';
import {  Text, StyleSheet, View } from 'react-native';

export default class componentName extends Component {
    render() {
        return (
            <View style={[styles.touchable]}>
                <Text style={[styles.title]}>{this.props.textTitle}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    touchable: {
        width: '75%',
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems:'center',
        borderRadius:25,
    },
    title: {
        fontSize: 20,
        color:'#fff',
        fontWeight:'700',
        paddingHorizontal:12,
        paddingVertical:8
    }
});
