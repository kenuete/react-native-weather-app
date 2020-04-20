import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import SearchInput from './components/SearchInput'
import { getImageForWeather } from './utils/helper'
import { fetchLocationId, fetchWeather } from './utils/apis';

export default function App() {

  const [location, setLocation] = useState('Melbourne')
  const [temperature, setTemperature] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [weather, setWeather] = useState('clear')

  const setLocationWrapper = async (location: string) => {
    try {
      setError(false)
      setLoading(true)
      const locationData = await fetchLocationId(location)
      if (!locationData || !locationData.length) {
        throw 'no location found'
      }
      const { weather, temperature } = await fetchWeather(locationData[0].woeid)
      setLocation(locationData[0].title)
      setTemperature(Math.round(temperature))
      setWeather(weather)
      setLoading(false)

    } catch (error) {
      setLoading(false)
      setError(error)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={getImageForWeather(weather)}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View style={styles.detailsContainer}>
          <ActivityIndicator animating={loading} color="white" size="large" />
          {!loading && (
            <View>
              {error && (
                <Text style={[styles.smallText, styles.textStyle]}>
                  Could not load weather, please try a different city.
                </Text>
              )}
              {!error && (
                <View>
                  <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
                  <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
                  <Text style={[styles.largeText, styles.textStyle]}>{temperature}</Text>
                </View>
              )}
              <SearchInput placeholder="Search city" setLocation={setLocationWrapper} />
            </View>
          )}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',

  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  textStyle: {
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white',
    textAlign: 'center',
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 18,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
  },
});
