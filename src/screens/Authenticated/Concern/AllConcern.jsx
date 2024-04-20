import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { IroningStyles } from '../Orders/Ironing/AllIroning';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppColors } from '../../../constants/color';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import LoadingOverlay from '../../../components/UI/LoadingOverlay';
import {
  addElementRealTime,
  concatConcernOrder,
  setConcernOrder,
  updateConcern,
} from '../../../feature/all-feature/feature-concern';
import { ConcernStatus } from '../../../constants/constant';

const AllConcern = ({ navigation }) => {
  const PAGE_SIZE = 5;
  const ConcernSlice = useSelector(state => state.ConcernSlice);
  const ServicePinCode = useSelector(state => state.ServicePinCode);
  const [screenLoader, setScreenLoader] = useState(true);
  const ConcernRef = firestore()
    .collection('Issue')
    .where('Pincode', 'in', ServicePinCode.planePinCodeArray)
    .limit(PAGE_SIZE);
  const Dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);

  const initialAndRealtime = useCallback(
    query => {
      if (query == null || !query) {
        setScreenLoader(false);
        return;
      }
      try {
        let fetchedData = new Set();
        query.docChanges().forEach(fetchedOrder => {
          if (fetchedOrder.type == 'added') {
            let isExist = ConcernSlice.data.find(
              oldItem => oldItem.id == fetchedOrder.doc.id,
            );
            if (!isExist) {
              fetchedData.add(fetchedOrder.doc);
            }
          }
          if (fetchedOrder.type == "modified") {
            Dispatch(updateConcern(fetchedOrder.doc))
          }
        });
        let newData = Array.from(fetchedData);
        if (ConcernSlice.firstFetched) {
          Dispatch(
            setConcernOrder({
              data: newData,
              lastElement: newData[newData.length - 1],
            }),
          );
        } else {
          Dispatch(addElementRealTime(newData));
        }
      } catch (error) {
        console.log(error);
        ToastAndroid.show(
          'Something Wrong Happen, Trying Again',
          ToastAndroid.SHORT,
        );
      }
      setScreenLoader(false);
    },
    [ConcernSlice, Dispatch],
  );

  useEffect(() => {
    const unSubscribe = ConcernRef.onSnapshot(initialAndRealtime);

    return () => {
      unSubscribe();
    };
  }, []);

  async function fetchNext() {
    if (!ConcernSlice.lastElement) {
      return;
    }
    setShowLoader(true);
    try {
      const Data = await ConcernRef.startAfter(
        ConcernSlice.lastElement || 0,
      ).get();
      const sendData = [...ConcernSlice.data, ...Data.docs];
      Dispatch(
        concatConcernOrder({
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
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.headerContainer}>
            <Text style={styles.heading}>All Concern</Text>
          </View>
          <FlatList
            contentContainerStyle={{ paddingBottom: 20 }}
            data={ConcernSlice.data}
            ListEmptyComponent={() => {
              return (
                <Text
                  style={{
                    color: 'white',
                    marginTop: 40,
                    textAlign: 'center',
                    fontSize: 18,
                    fontFamily: 'Poppins-SemiBold',
                  }}>
  
                  No Concerns
                </Text>
              );
            }}
            keyExtractor={item =>
              new Date().toString() + Math.random() + ' ' + Math.random() / 2
            }
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
              if (!ConcernSlice.lastElement && showLoader) {
                return;
              }
              fetchNext();
            }}
            renderItem={({ item }) => {

              return (
                <View style={IroningStyles.IroningContainer}>
                  <Text style={IroningStyles.HighlighText}>
                    Current Status :{' '}
                    <Text style={IroningStyles.ValueText}>{item?.data()?.status == ConcernStatus[1] ? "Request Received" : item?.data()?.status == ConcernStatus[2] ? "Customer Replied Received" : item?.data()?.status == ConcernStatus[3] ? "Issue Resolved" : "Request Received"}</Text>
                  </Text>
                  <Text style={IroningStyles.HighlighText}>
                    Customer Name :
                    <Text style={IroningStyles.ValueText}>  {item?.data().name}</Text>
                  </Text>
                  <Text style={[IroningStyles.HighlighText, { paddingTop: 0 }]}>
                    Issue :
                    <Text style={IroningStyles.ValueText}>  {item?.data().Issue}</Text>
                  </Text>
                  <TouchableOpacity
                    onPress={() => { navigation.navigate("DetailedConcern", item.id) }}
                    style={styles.viewButton}>
                    <Text style={styles.viewButtonText}>View & Reply</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: AppColors.statusBarColor,
    flex: 1,
    paddingHorizontal: 10,
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  heading: {
    fontSize: 24,
    color: 'black',
    fontFamily: 'Poppins-Bold',
  },
  addButton: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 5,
    elevation: 5,
  },
  viewButton: {
    padding: 10,
    borderWidth: 1,
    width: 150,
    alignItems: 'center',
    borderRadius: 10,
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: 'black',
  },
  viewButtonText: {
    textAlign: 'right',
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default AllConcern;
