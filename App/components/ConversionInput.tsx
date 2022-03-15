import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import colors from '../constants/color';

interface Props {
  text: string;
  onButtonPress(): void;
  editable?: boolean;
  value: string;
  onChangeText?: (text: string) => void;
}

const ConversionInput = ({ text, onButtonPress, ...props }: Props) => {
  const containerStyles: Array<object> = [styles.container];
  if (props.editable === false) {
    containerStyles.push(styles.containerDisable);
  }
  return (
    <View style={containerStyles}>
      <TouchableOpacity style={styles.button} onPress={onButtonPress}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
      <TextInput style={styles.input} {...props} />
    </View>
  );
};

export default ConversionInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
  },
  containerDisable: {
    backgroundColor: colors.offWhite,
  },
  button: {
    backgroundColor: colors.white,
    padding: 15,
    borderRightColor: colors.border,
    borderRightWidth: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: colors.blue,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    padding: 10,
    color: colors.textLight,
  },
});
