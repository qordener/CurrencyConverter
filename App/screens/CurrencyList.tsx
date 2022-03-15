import { FlatList, StatusBar, StyleSheet, View } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import colors from '../constants/color';
import currencies from '../data/currencies.json';
import { RowItem, RowSeparator } from '../components/RowItem';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

const CurrencyList = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params || {};
  const insets = useSafeAreaInsets();
  return (
    <View style={{ backgroundColor: colors.white }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <FlatList
        data={currencies}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const selected = (params as any).activeCurrency === item;
          return (
            <RowItem
              text={item}
              onPress={() => {
                if ((params as any).onChange) {
                  (params as any).onChange(item);
                }
                navigation.goBack();
              }}
              rightIcon={
                selected && (
                  <View style={styles.icon}>
                    <Entypo name="check" size={20} color={colors.white} />
                  </View>
                )
              }
            />
          );
        }}
        ItemSeparatorComponent={() => <RowSeparator />}
        ListFooterComponent={() => (
          <View style={{ paddingBottom: insets.bottom }} />
        )}
      />
    </View>
  );
};

export default CurrencyList;

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    backgroundColor: colors.blue,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
