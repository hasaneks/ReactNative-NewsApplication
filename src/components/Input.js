import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';



export default class Input extends Component {

  state = {
    inputFocus : false,
    inputValue : '',
  };

  handleFocus = () => {
    this.setState({
      inputFocus:true,
    })
  };

  handleOnChangeText = (inputValue) =>{
    console.log(inputValue)
    this.setState({
      inputValue
    });
  }

  render() {
    const { input,customText } = styles;
    return (
      <TextInput 
      style={ [this.state.inputFocus ? customText : input ]} 
      placeholder={this.props.placeholder}
      onFocus={this.handleFocus}

      value={this.state.inputValue}
      onChangeText={inputValue => this.handleOnChangeText(inputValue) }
      />
    );
  }
}


const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    marginBottom: 5,
    paddingLeft: 5,
  },
  customText:{
    borderBottomWidth: 2,
    borderBottomColor: '#2975e7',
    marginBottom: 5,
    paddingLeft: 5,
    fontWeight:'bold',
    fontSize:16,
  }

});