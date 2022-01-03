import React, { Component } from 'react';

import { BackAndroid, Dimensions, Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

// External Libraries
import Ionicon from 'react-native-vector-icons/Ionicons';

// Components
//import NavBar from './../components/NavBar';
//import Counts from './../components/Counts';

var {width, height} = Dimensions.get('window')

const Form = () => {
 

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView style={{height: height - 200}}>
          <Image source={{uri: 'https://image.freepik.com/free-vector/tiny-people-sitting-standing-near-giant-faq_74855-7879.jpg'}}  style={styles.image,{resizeMode:"cover",height:200}}></Image>
           
          <Text style={styles.description}>
           Q. What happens when you subscribe to a place ?
          </Text>
          <Text style={styles.a}>
           A. When a user will subscribe to a particular place then he/she will be notified when the crowd density is low in that particular place.
          </Text>
          <Text style={styles.description}>
           Q. Can a user subscribe to more than one place ?
          </Text>
          <Text style={styles.a}>
           A. Yes, a user can subscribe to more than one place.
          </Text>
          <Text style={styles.description}>
           Q. How will a user receive notification ?
          </Text>
          <Text style={styles.a}>
           A. The user will receive notifications via the registered email-id.
          </Text>
          <Text style={styles.description}>
           Q. What does the Graph on the app show ?
          </Text>
          <Text style={styles.a}>
           A. The graph will show real time analytics of the zone-wise crowd density.
          </Text>


          {/* <NavBar
            leftText={Platform.OS === 'ios' ? <Ionicon name='ios-arrow-back' size={32} color={'#eee'} /> : <Ionicon name='md-arrow-back' size={24} color={'#eee'} />}
            onLeftPress={ () => {
              _navigator.pop()
            }}
            containerStyle={{backgroundColor: 'transparent'}}
            colorText='#eee' /> */}

        </ScrollView>
        
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  innerImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200
  },
  title: {
    margin: 15,
    fontSize: 28,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center'
  },
  speakerText: {
    fontStyle: 'italic',
    color: '#fff',
    marginTop: 5,
    fontSize: 16,
  },
  description: {
      marginTop: 10,
      marginRight: 10,
      marginLeft: 10,
      paddingVertical: 2,
      paddingLeft:20,
      paddingRight:20,
      borderWidth: 5, 
      borderColor: "#30475E", 
      borderRadius: 6, 
      backgroundColor: "#F05454", 
      color: "#121212", 
      textAlign: "justify", 
      fontSize: 20,
      fontWeight: "bold"
  },
  a:{
    marginTop: 10,
      marginRight: 10,
      marginLeft: 10,
      marginBottom: 25,
      paddingVertical: 2,
      paddingLeft:20,
      paddingRight:20,
      borderWidth: 5, 
      borderColor: "#30475E", 
      borderRadius: 6, 
      backgroundColor: "#F5F5F5", 
      color: "#121212", 
      textAlign: "justify", 
      fontSize: 20,
      fontWeight: "bold"
  },
  floatFooter: {
    position: 'absolute',
    bottom: 0
  }
})

export default Form;