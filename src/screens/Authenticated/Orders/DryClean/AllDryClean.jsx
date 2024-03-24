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
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import LoadingOverlay from '../../../../components/UI/LoadingOverlay';
import {formatDate, formatTime} from '../../../../helpers/DateFunction';
const AllDryClean = ({navigation}) => {
  const ServicePinCode = useSelector(state => state.ServicePinCode);
  const [screenLoader, setScreenLoader] = useState(true);
  const [allDryCleanOrder, setAllDryCleanOrder] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const PAGE_SIZE = 5;
  async function getCall() {
    setLoadingMore(true);
    try {
      const DryCleanResp = await firestore()
        .collection('Order')
        .where('isDryClean', '==', true)
        .where('Address.Pincode', 'in', ServicePinCode.planePinCodeArray)
        .orderBy('DateOfOrder', 'desc')
        .startAfter(
          allDryCleanOrder[allDryCleanOrder.length - 1]?.DateOfOrder ||
            new Date(),
        )
        .limit(PAGE_SIZE)
        .get();
      setAllDryCleanOrder([
        ...allDryCleanOrder,
        ...DryCleanResp.docs.map(doc => ({
          ...doc.data(),
          key: doc.id,
        })),
      ]);
      if (DryCleanResp.size < PAGE_SIZE) {
        setHasMore(false);
      }
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
              onEndReachedThreshold={0.5}
              onEndReached={() => {
                if (hasMore && !loadingMore) {
                  getCall();
                }
              }}
              data={allDryCleanOrder}
              renderItem={({item}) => {
                return (
                  <View style={styles.orderContainer}>
                    <Text style={styles.detailText}>
                      Order Id: <Text style={styles.valueText}>{item.key}</Text>
                    </Text>
                    <Text style={styles.detailText}>
                      Date of Order:{' '}
                      <Text style={styles.valueText}>
                        {item.DateOfOrder
                          ? formatDate(item.DateOfOrder.toDate())
                          : ''}
                      </Text>
                    </Text>
                    <Text style={styles.detailText}>
                      Total Cloths :{' '}
                      <Text style={styles.valueText}>
                        {item.DryClean.length}
                      </Text>
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        // navigation.navigate('DetailedDryCleanOrder');
                        Alert.alert(
                          'yaar ye mai kal dunga',
                          'aaj develop kar diya tha but test nahi kiya tha',
                        );
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
