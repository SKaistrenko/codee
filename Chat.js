import React from 'react';
import PropTypes from 'prop-types'; // ES6
import { AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  Dimensions,
TextInput,
FlatList,
KeyboardAvoidigView} from 'react-native';
  import { Button } from 'react-native-elements';
  import {TextToSpeech} from 'react-native-watson';
  import { Conversation } from 'react-native-watson';
  TextToSpeech.initialize("24761e1d-148d-4cc4-953b-1e164c549163", "zjNmWRzANVKp")
  Conversation.initialize("7d7c1ef3-9dfc-4a9d-aa5f-b3d5aaef3c4d", "kNCp2KSbqxJu")

  class Chat extends React.Component {

    constructor(props)
    {
      super(props)
      this.workspaceId = "bb6a5d95-5625-4566-8cbd-21c5880f2c3c";
      this.state = { text: '', output: '', context: null };
    }

    componentDidMount()
    {
      Conversation.message(this.workspaceId)
      .then(response => {
        console.log(JSON.stringify(response))
        this.setState({output: response.output.text, context: response.context})
        console.log(this.state.output.toString())
        TextToSpeech.synthesize( this.state.output.toString() )
      })
    }

    submit()
    {
      if(this.state.context)
      {
        let input = {
          text: this.state.text,
          context: this.state.context
        }

        Conversation.message(this.workspaceId, input)
        .then(response => {
          console.log(JSON.stringify(response))
          this.setState({output: response.output.text, context: response.context})
          console.log(this.state.output.text)
          TextToSpeech.synthesize( this.state.output.toString() )
          const clearTextState = () => { this.setState({ text: '' }) }
        })
      }

    }

    render()
    {
      const dimensions = Dimensions.get('window');
      const imageWidth = Math.round(dimensions.width*.75);
      const imageHeight = Math.round(imageWidth * 620 / 559);
      return (

        <View style={styles.container}>

        <View style={styles.botBox}>
        <Text style={styles.botBox}>
        {this.state.output}
        </Text>
        </View>
        <View style={styles.humanBox}>
        <TextInput
        autoFocus={true}
        onChangeText={( text ) => this.setState( { text } )}
        defaultValue='text input'
        value={this.state.text}
        />
        </View>
        <Button
        // raised
        buttonStyle={{ backgroundColor: 'blue', borderRadius: 10, margin: 20 }}
        // textStyle={{ textAlign: 'center' }}
        title={`submit`}
        onPress={() => this.submit()}
        />
        </View>
      );
    }
  }

  const styles = StyleSheet.create( {
    container: {
      flex: 1,
      backgroundColor: '#eee',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
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
  } );

  export default Chat;
