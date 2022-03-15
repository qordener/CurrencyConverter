import { StyleSheet, View, Keyboard, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';

interface Props {
  onToggle: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const KeybardSpacer = ({ onToggle }: Props) => {
  const [keyboardSpace, setKeyboardSpace] = useState(0);

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', (event) => {
      console.log(event);
      const screenHeight = Dimensions.get('window').height;
      const endY = event.endCoordinates.screenY;

      setKeyboardSpace(screenHeight - endY + 20);
      onToggle(true);
    });
    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardSpace(0);
      onToggle(false);
    });
    return () => {
      showListener.remove();
      hideListener.remove();
    };
  });

  return <View style={[styles.container, { height: keyboardSpace }]}></View>;
};

export default KeybardSpacer;

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    bottom: 0,
  },
});
