// @ts-check
import {
  Button,
  Container,
  Content,
  Header,
  Text,
} from 'native-base';
import React, { useState } from 'react';
import { render } from 'react-dom';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import theme from '../theme/theme';
import TimelinePost from './Timeline-Components/TimelinePost';
import CreatePost from './Timeline-Components/CreatePost'; 



const Timeline = function (props){
  let [newPostScreen, setNewPostScreen] = useState(false);  

  if (newPostScreen === true) {
    return (
      <Container>
        <CreatePost newPost = {setNewPostScreen}></CreatePost>
      </Container>
    );
  }
  else {
    return (
      <Container>
        <ScrollView
          automaticallyAdjustContentInsets
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
          }}
        >
          <Header style={theme.verticalCenter}>
            <Text style={theme.header}>Timeline!</Text>
          </Header>
          <Content style={{ flex: 1 }}>
            <View style={{ flexGrow: 1, alignItems: 'center', flexDirection: "row" }}>
              <Button>
                <Text
                  onPress={() => {
                    props.navigation.navigate('Resources');
                  }}
                >
                  Click Me!
                </Text>
              </Button>
              <Button style={{alignSelf:"flex-end", marginLeft: 'auto'}} onPress = {() => setNewPostScreen(true)}>
                <Text>
                  New Post
                </Text>
              </Button>
            </View> 
            <TimelinePost></TimelinePost>
            <TimelinePost></TimelinePost>
            <TimelinePost></TimelinePost>
          </Content>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({});

export default Timeline;
