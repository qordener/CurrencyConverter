import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import colors from '../constants/color';
import ConversionInput from '../components/ConversionInput';
import { format } from 'date-fns';
import Button from '../components/Button';
import KeybardSpacer from '../components/KeybardSpacer';
import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const screen = Dimensions.get('window');

const Home = () => {
  const navigation = useNavigation();
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [quoteCurrency, setQuoteCurrency] = useState('GBP');
  const [value, setValue] = useState('100');
  const conversionRate = 0.8345;
  const date = new Date();

  const swapCurrencies = () => {
    setQuoteCurrency(baseCurrency);
    setBaseCurrency(quoteCurrency);
  };

  const [scrollEnabled, setScrollEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView scrollEnabled={scrollEnabled}>
        <StatusBar barStyle="light-content" backgroundColor={colors.blue} />

        <SafeAreaView style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Options' as never)}
          >
            <Entypo name="cog" size={32} color={colors.white} />
          </TouchableOpacity>
        </SafeAreaView>

        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logoBackground}
              source={require('../assets/images/background.png')}
              resizeMode="contain"
            />
            <Image
              style={styles.logo}
              source={require('../assets/images/logo.png')}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.textHeader}>Currency converter</Text>
          <ConversionInput
            text={baseCurrency}
            value={value}
            onButtonPress={() =>
              navigation.navigate(
                'CurrencyList' as never,
                {
                  title: 'BaseCurrency',
                  activeCurrency: baseCurrency,
                  onChange: (currency: string) => setBaseCurrency(currency),
                } as never
              )
            }
            onChangeText={(text: string) => setValue(text)}
            keyboardType="numeric"
          />
          <ConversionInput
            text={quoteCurrency}
            value={
              value && `${(parseFloat(value) * conversionRate).toFixed(2)}`
            }
            onButtonPress={() =>
              navigation.navigate(
                'CurrencyList' as never,
                {
                  title: 'QuoteCurrency',
                  activeCurrency: quoteCurrency,
                  onChange: (currency: string) => setQuoteCurrency(currency),
                } as never
              )
            }
            editable={false}
          />

          <Text
            style={styles.text}
          >{`1 ${baseCurrency} = ${conversionRate} ${quoteCurrency} as of ${format(
            date,
            'MMMM do, yyyy'
          )}`}</Text>

          <Button
            text="reverse currencies"
            onPress={() => swapCurrencies()}
          ></Button>
          <KeybardSpacer
            onToggle={(keyboardIsVisible) =>
              setScrollEnabled(keyboardIsVisible)
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    flex: 1,
  },
  content: {
    paddingTop: screen.height * 0.1,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBackground: {
    width: screen.width * 0.45,
    height: screen.width * 0.45,
  },
  logo: {
    position: 'absolute',
    width: screen.width * 0.25,
    height: screen.width * 0.25,
  },
  textHeader: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 30,
    marginVertical: 20,
    textAlign: 'center',
  },
  text: {
    color: colors.white,
    fontSize: 13,
    textAlign: 'center',
  },
  header: {
    alignItems: 'flex-end',
    marginHorizontal: 20,
  },
});
