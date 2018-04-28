import React from 'react';
import PropTypes from 'prop-types'; // ES6
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {TextToSpeech} from 'react-native-watson';
import { Conversation } from 'react-native-watson';
TextToSpeech.initialize("24761e1d-148d-4cc4-953b-1e164c549163", "zjNmWRzANVKp")
//Conversation.initialize("24761e1d-148d-4cc4-953b-1e164c549163", "zjNmWRzANVKp")

class Chat extends React.Component {
  state={
    messages: [
      {
        _id: 1,
        text: 'This is a test',
        createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
        image: 'https://peggyli.xyz/codee.png',
      }
    ]
  };

  // componentDidMount()
  // {
  //     Conversation.message(this.workspaceId)
  //         .then(response => {
  //             console.log(JSON.stringify(response))
  //             this.setState({output: response.output.text, context: response.context})
  //         })
  // }
  //
  // submit()
  // {
  //     if(this.state.context)
  //     {
  //         let input = {
  //             text: this.state.text,
  //             context: this.state.context
  //         }
  //
  //         Conversation.message(this.workspaceId, input)
  //             .then(response => {
  //                 console.log(JSON.stringify(response))
  //                 this.setState({output: response.output.text, context: response.context})
  //             })
  //     }
  //
  // }

  render() {
    console.log(this.state.messages)
    const dimensions = Dimensions.get('window');
    const imageWidth = Math.round(dimensions.width*.75);
    const imageHeight = Math.round(imageWidth * 620 / 559);
     TextToSpeech.synthesize( "Hi" "! How are you today?" )
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend = {(message)=> {
          this.setState({messages: [message[0], ...this.state.messages]})
        }}
        user={{
          _id: 1,
        }}
      />


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  botBox: {
    backgroundColor: '#7C45D8',
    padding: 10,
    borderRadius: 25,
    marginBottom: 10,
    maxWidth: '85%',
    alignSelf: 'flex-start'
  },
  botText: {
    color: '#fff',
    fontSize: 30,
  },
  humanBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 25,
    alignSelf: 'flex-end',
    marginTop: 3,
  },
  humanText: {
    color: '#000',
  }
});

export default Chat;
