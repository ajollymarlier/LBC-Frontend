// @ts-check
import {
  Body,
  Container,
  Content,
  Header,
  Left,
  Right,
  Text,
} from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { theme } from '../theme/theme';

const ScreenBase = ({
  header, children, padder = false, left = undefined, right = undefined,
}) => {
  return (
    // TODO: style={{ backgroundColor: 'black' }}
    <Container>
      <Header
        style={theme.appHeader}
        androidStatusBarColor="#2c3e50"
        iosBarStyle="light-content"
      >
        <Left style={styles.flex}>
          {left}
        </Left>
        <Body style={styles.flex}>
          <Text style={theme.appHeaderText}>
            {header}
          </Text>
        </Body>
        <Right style={styles.flex}>
          {right}
        </Right>
      </Header>
      <ScrollView
        automaticallyAdjustContentInsets
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
        // endFillColor="black"
      >
        <Content
          padder={padder}
          contentContainerStyle={{ flex: 1 }}
        >
          {children}
        </Content>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default ScreenBase;
