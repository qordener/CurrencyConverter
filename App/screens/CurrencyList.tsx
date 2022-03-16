import { FlatList, StatusBar, StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import { Entypo } from '@expo/vector-icons';
import colors from '../constants/color';
import currencies from '../data/currencies.json';
import { RowItem, RowSeparator } from '../components/RowItem';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ConversionContext } from '../util/ConversionContext';

const CurrencyList = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params || {};
  const insets = useSafeAreaInsets();

  const { setBaseCurrency, setQuoteCurrency, baseCurrency, quoteCurrency } =
    useContext(ConversionContext);
  return (
    <View style={{ backgroundColor: colors.white }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <FlatList
        data={currencies}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          // const selected = (params as any).activeCurrency === item;
          let selected = false;
          if ((params as any).isBaseCurrency && item === baseCurrency) {
            selected = true;
          } else if (
            !(params as any).isBaseCurrency &&
            item === quoteCurrency
          ) {
            selected = true;
          }
          return (
            <RowItem
              text={item}
              onPress={() => {
                (params as any).isBaseCurrency
                  ? setBaseCurrency(item)
                  : setQuoteCurrency(item);
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
