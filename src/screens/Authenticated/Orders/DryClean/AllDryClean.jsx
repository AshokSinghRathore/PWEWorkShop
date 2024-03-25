import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {AppColors} from '../../../../constants/color';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import LoadingOverlay from '../../../../components/UI/LoadingOverlay';
import {formatDate, formatTime} from '../../../../helpers/DateFunction';
import {
  concatDryClean,
  setDryClean,
} from '../../../../feature/all-feature/feature-dryclean';
const AllDryClean = ({navigation}) => {
  const ServicePinCode = useSelector(state => state.ServicePinCode);
  const [screenLoader, setScreenLoader] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const PAGE_SIZE = 5;
  const Dispatch = useDispatch();
  const DryCleanOrder = useSelector(state => state.DryCleanOrder);
  async function getCall() {
    if (DryCleanOrder.data.length > 0) {
      return;
    }
    console.log(DryCleanOrder);
    setLoadingMore(true);
    try {
      const DryCleanResp = await firestore()
        .collection('Order')
        .where('isDryClean', '==', true)
        .where('Address.Pincode', 'in', ServicePinCode.planePinCodeArray)
        .orderBy('DateOfOrder', 'desc')
        .limit(PAGE_SIZE)
        .get();
      let hasMore = null;
      if (!DryCleanResp.empty) {
        hasMore = DryCleanResp.docs[DryCleanResp.docs.length - 1];
      }
      Dispatch(
        setDryClean({
          hasMore: hasMore,
          data: DryCleanResp.docs.map(d => {
            return {
              ...d.data(),
              key: d.id,
              DateOfOrder: d.data().DateOfOrder.toDate().toISOString(),
              expireDate: d.data().expireDate.toDate().toISOString(),
            };
          }),
        }),
      );
      console.log("------------- initial Data -------------");
      console.log(DryCleanResp.size);
      console.log(DryCleanResp.docs.map(d => {
        return {
          ...d.data(),
          key: d.id,
          DateOfOrder: d.data().DateOfOrder.toDate().toISOString(),
          expireDate: d.data().expireDate.toDate().toISOString(),
        };
      }))
      console.log("------------- EOD initial Data -------------");

    } catch (error) {
      console.log(error);
      Alert.alert('Something Went Wrong', 'Please Try Again Later');
    }
    setLoadingMore(false);
  }
  useEffect(() => {
    getCall().then(() => {
      setScreenLoader(false);
    });
  }, []);

  async function onEndReached() {
    if (DryCleanOrder.data.length <= 0) {
      return;
    }
    setLoadingMore(true);
    try {
      const DryCleanResp = await firestore()
        .collection('Order')
        .where('isDryClean', '==', true)
        .where('Address.Pincode', 'in', ServicePinCode.planePinCodeArray)
        .startAfter(DryCleanOrder.hasMore || 0)
        .limit(PAGE_SIZE)
        .get();





      let hasMore = null;
      let newData = DryCleanResp.docs.map(d => {
        return {
          ...d.data(),
          key: d.id,
          DateOfOrder: d.data().DateOfOrder.toDate().toISOString(),
          expireDate: d.data().expireDate.toDate().toISOString(),
        };
      });
      if (!DryCleanResp.empty) {
        hasMore = DryCleanResp.docs[DryCleanResp.docs.length - 1];
      }
      console.log("------------- new Data -------------");
      console.log(DryCleanResp.size);
      console.log(newData);
      console.log("------------- EOD new Data -------------");
      Dispatch(
        concatDryClean({
          hasMore: hasMore,
          data: newData,
        }),
      );
    } catch (error) {
      Alert.alert('Something Went Wrong', 'Please Try Again Later');
      console.log(error);
    }
    setLoadingMore(false);
  }

  useEffect(() => {
    console.log(DryCleanOrder.data, '  new Data');
  }, [DryCleanOrder]);

  return (
    <>
      {screenLoader ? (
        <LoadingOverlay />
      ) : (
        <>
          <View style={styles.container}>
            <Text style={styles.heading}>All DryClean Orders</Text>
            <FlatList
              contentContainerStyle={{paddingBottom: 20}}
              onEndReachedThreshold={1}
              onEndReached={() => {
                if (DryCleanOrder.hasMore != null && !loadingMore) {
                  onEndReached();
                }
              }}
              keyExtractor={item => item.key}
              data={DryCleanOrder.data}
              renderItem={({item}) => {
                return (
                  <View style={styles.orderContainer}>
                    <Text style={styles.detailText}>
                      Customer Name :{' '}
                      <Text style={styles.valueText}>{item.user_name}</Text>
                    </Text>
                    <Text style={styles.detailText}>
                      Order Id: <Text style={styles.valueText}>{item.key}</Text>
                    </Text>
                    <Text style={styles.detailText}>
                      Date of Order:{' '}
                      <Text style={styles.valueText}>
                        {item.DateOfOrder
                          ? formatDate(new Date(item.DateOfOrder))
                          : 'N/A'}
                      </Text>
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('DetailedDryCleanOrder', item);
                      }}
                      style={styles.viewButton}>
                      <Text style={styles.viewButtonText}>View Details</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
              ListFooterComponent={() => {
                return (
                  <>
                    {loadingMore ? (
                      <ActivityIndicator
                        size={'large'}
                        color={'white'}
                        style={{marginTop: 10}}
                      />
                    ) : null}
                  </>
                );
              }}
            />
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: AppColors.statusBarColor,
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.statusBarColor,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 24,
    color: 'black',
    fontFamily: 'Poppins-Bold',
    alignSelf: 'center',
    marginTop: 10,
  },
  orderContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#e8f7ee',
    marginTop: 10,
    shadowColor: 'grey',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,
  },
  detailText: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    paddingVertical: 5,
  },
  valueText: {
    color: 'blue',
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

export default AllDryClean;
