import {
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoadingOverlay from './src/components/UI/LoadingOverlay';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {setDryClean} from './redux/feature-dryclean';
const Test = () => {
  const [screenLoader, setScreenLoader] = useState(false);
  const PAGE_SIZE = 5;
  const OrderRef = firestore().collection('Order').limit(PAGE_SIZE);
  const DryCleanOrder = useSelector(state => state.DryCleanOrder);
  const [showLoader, setShowLoader] = useState(false);
  const dispatch = useDispatch();
  async function initialGetCall() {
    if (DryCleanOrder.data.length > 0) {
      return;
    }
    setScreenLoader(true);
    const data = await OrderRef.get();
    dispatch(
      setDryClean({
        lastElement: data.docs[data.docs.length - 1],
        data: data.docs
      }),
    );
    setScreenLoader(false);
  }

  useEffect(() => {
    initialGetCall();
  }, []);

  async function fetchNex() {
    if (!DryCleanOrder.lastElement) {
      return;
    }
    setShowLoader(true);
    try {
      const Data = await OrderRef.startAfter(
        DryCleanOrder.lastElement || 0,
      ).get();
      dispatch(
        setDryClean({
          lastElement: Data.docs[Data.docs.length - 1],
          data: [...DryCleanOrder.data, ...Data.docs],
        }),
      );
    } catch (error) {
      console.log(error);
      Alert.alert('Something went wrong', 'Please try after some time');
    }
    setShowLoader(false);
  }

  return (
    <>
      {screenLoader ? (
        <LoadingOverlay />
      ) : (
        <View
          style={{
            backgroundColor: '#e8f7ee',
            flex: 1,
          }}>
          <FlatList
            data={DryCleanOrder.data}
            keyExtractor={item => item.id}
            ListFooterComponent={() => {
              return (
                <>
                  {showLoader && (
                    <ActivityIndicator size={'small'} color={'black'} />
                  )}
                </>
              );
            }}
            onEndReached={() => {
              if (!DryCleanOrder.lastElement && showLoader) {
                return;
              }
              fetchNex();
            }}
            renderItem={({item}) => (
              <View
                style={{
                  backgroundColor: '#9AE0D16C',
                  alignSelf: 'center',
                  alignItems: 'center',
                  padding: 10,
                  marginVertical: 10,
                }}>
                <Text
                  style={{
                    color: 'red',
                    fontSize: 18,
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  {item.id}hal
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    fontFamily: 'Poppins-SemiBold',
                    marginTop: 10,
                  }}>
                  {item.data().user_name}
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    fontFamily: 'Poppins-SemiBold',
                    marginTop: 10,
                  }}>
                  {item.data().Address.State}
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    fontFamily: 'Poppins-SemiBold',
                    marginTop: 10,
                  }}>
                  {item.data().Address.City}
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    fontFamily: 'Poppins-SemiBold',
                    marginTop: 10,
                  }}>
                  {item.data().Address.Pincode}
                </Text>
              </View>
            )}
          />
          <Button
            title="Fetch Next Set"
            onPress={() => {
              if (DryCleanOrder.lastElement) {
                fetchNex();
              }
            }}
          />
        </View>
      )}
    </>
  );
};

export default Test;
