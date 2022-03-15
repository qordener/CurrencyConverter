import {
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import React from 'react';
import colors from '../constants/color';
import { Entypo } from '@expo/vector-icons';
import { RowItem, RowSeparator } from '../components/RowItem';

const openUrl = (url: string) => {
  Linking.openURL(url).catch(() => {
    Alert.alert('Sorry, something went wrong.', 'Please try again later.');
  });
};

const Options = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView>
        <RowItem
          text="Themes"
          onPress={() => alert('todo!')}
          rightIcon={
            <Entypo name="chevron-right" size={20} color={colors.blue} />
          }
        />
        <RowSeparator />
        <RowItem
          text="React Native Basics"
          onPress={() =>
            openUrl(
              'https://learn.handlebarlabs.com/p/react-native-basics-build-a-currency-converter'
            )
          }
          rightIcon={<Entypo name="export" size={20} color={colors.blue} />}
        />
        <RowSeparator />
        <RowItem
          text="React Native by Example"
          onPress={() => openUrl('https://reactnativebyexample.com')}
          rightIcon={<Entypo name="export" size={20} color={colors.blue} />}
        />
        <RowSeparator />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Options;
