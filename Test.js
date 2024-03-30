import {
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import LoadingOverlay from './src/components/UI/LoadingOverlay';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {
  addElementRealTime,
  concatDryCleanOrder,
  setDryCleanOrder,
} from './redux/feature-dryclean';
import {formatDate, formatTime} from './src/helpers/DateFunction';
const Test = () => {
  const [screenLoader, setScreenLoader] = useState(false);
  const PAGE_SIZE = 5;
  const OrderRef = firestore()
    .collection('Order')
    .orderBy('DateOfOrder', 'desc')
    .limit(PAGE_SIZE);
  const DryCleanOrder = useSelector(state => state.DryCleanOrder);
  const [showLoader, setShowLoader] = useState(false);
  const dispatch = useDispatch();
  let firstFetched = DryCleanOrder.firstFetched;
  const initialAndRealtime = useCallback(
    query => {
      if (query == null || !query) {
        return;
      }
      try {
        let fetchedData = new Set();
        query.docChanges().forEach(fetchedOrder => {
          if (fetchedOrder.type == 'added') {
            let isExist = DryCleanOrder.data.find(
              oldItem => oldItem.id == fetchedOrder.doc.id,
            );
            if (!isExist) {
              fetchedData.add(fetchedOrder.doc);
            }
          }
        });
        let newData = Array.from(fetchedData);
        if (DryCleanOrder.firstFetched) {
          dispatch(
            setDryCleanOrder({
              data: newData,
              lastElement: newData[newData.length - 1],
            }),
          );
        } else {
          dispatch(addElementRealTime(newData));
        }
      } catch (error) {
        ToastAndroid.show('Error');
      }
      setScreenLoader(false);
    },
    [firstFetched, DryCleanOrder, dispatch],
  );
  useEffect(() => {
    const unSubscribe = firestore()
      .collection('Order')
      .where('isDryClean', '==', true)
      .where('Address.Pincode', 'in', ['122004'])
      .orderBy('DateOfOrder', 'desc')
      .limit(PAGE_SIZE)
      .onSnapshot(initialAndRealtime);

    return () => {
      unSubscribe();
    };
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
      const sendData = [...DryCleanOrder.data, ...Data.docs];
      dispatch(
        concatDryCleanOrder({
          data: sendData,
          lastElement: Data.docs[Data.docs.length - 1],
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
            renderItem={({item, index}) => {
              const date = formatTime(item.data().DateOfOrder.toDate());
              return (
                <View
                  style={{
                    backgroundColor: '#9AE0D16C',
                    alignSelf: 'center',
                    alignItems: 'center',
                    padding: 10,
                    marginVertical: 10,
                  }}>
                  <Text
                    onPress={() =>
                      console.log(DryCleanOrder.firstFetched, firstFetched)
                    }
                    style={{
                      color: 'red',
                      fontSize: 18,
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    {item.id} {date} {index + 1}
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
              );
            }}
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
