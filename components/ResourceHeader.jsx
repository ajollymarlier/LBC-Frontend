import React from 'react';
import { StyleSheet, View } from 'react-native';
import Subtitle from './Subtitle';
import Title from './Title';

const ResourceHeader = ({
  name, subname, email, phoneNumber,
}) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Title title={name} />
        {subname && <Subtitle subtitle={subname} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //
  innerContainer: {
    marginHorizontal: 25,
    marginVertical: 15,
  },
  // Used for providing background color
  outerContainer: {
    marginTop: -10,
    backgroundColor: '#2A0053',
  },
});

export default ResourceHeader;
