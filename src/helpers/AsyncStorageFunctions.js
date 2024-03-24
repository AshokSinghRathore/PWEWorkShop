import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setItem(key, value) {
  try {
    const va = await AsyncStorage.setItem(key, value);
    return va;
  } catch (error) {
    //
  }
}

export async function removeItem(key) {
  try {
    const value = await AsyncStorage.removeItem(key);
    return value;
  } catch (error) {
    //
  }
}

export async function getItem(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    //
  }
}
