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
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {IroningStyles} from '../Orders/Ironing/AllIroning';
import Ionicons from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AppColors} from '../../../constants/color';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {
  addPaginatedDataCoupon,
  concatCoupon,
  deleteCouponRedux,
  setCoupon,
  setLastElement,
} from '../../../feature/all-feature/feature-coupon';
import LoadingOverlay from '../../../components/UI/LoadingOverlay';
const AllCoupon = ({navigation}) => {
  const CouponSlice = useSelector(state => state.CouponSlice);
  const Cred = useSelector(state => state.Cred);
  const [loading, setLoading] = useState(false);
  const Dispatch = useDispatch();
  const [deleteLoader, setDeleteLoader] = useState(-1);
  const PAGE_SIZE = 5;
  const [loadMore, setLoadMore] = useState(false);
  const couponRef = firestore()
    .collection('Coupons')
    .where('admin_uid', '==', Cred.uid)
    .where('isActive', '==', true)
    .limit(PAGE_SIZE);
  async function getCall() {
    setLoading(true);
    try {
      const couponResp = await couponRef.get();
      if (!couponResp.empty) {

        Dispatch(
          setCoupon({
            data: couponResp.docs.map(e => {
              return {...e.data(), id: e.id};
            }),
            lastElement: couponResp?.docs[couponResp?.docs.length - 1],
          }),
        );
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Something Went Wrong', 'Please Try Again Later');
    }
    setLoading(false);
  }

  async function onDelete(id) {
    setDeleteLoader(id);

    try {
      await firestore().collection('Coupons').doc(id).update({
        isActive: false,
      });

      Dispatch(deleteCouponRedux(id));
    } catch (error) {
      Alert.alert('Something went wrong', 'Please try again later');
      console.log(error);
    }
    setDeleteLoader(-1);
  }


  async function onEndReached() {
    if (!CouponSlice.lastElement) {
      return;
    }
    try {
      const paginatedCoupon = await couponRef.startAfter(CouponSlice.lastElement||0).get();
      const dataCoupon = paginatedCoupon.docs.map((e)=>{return{...e.data(),id:e.id}});
      const sendData = [...CouponSlice.data, ...dataCoupon];
      Dispatch(
        concatCoupon({
          data: sendData,
          lastElement: paginatedCoupon.docs[paginatedCoupon.docs.length - 1],
        }),
      );
    } catch (error) {}
  }

  useEffect(() => {
    getCall();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <LoadingOverlay message={'Please wait ...'} />
      ) : (
        <>
          <View style={styles.headerContainer}>
            <Text style={styles.heading}>All Coupon</Text>
          </View>
          <FlatList
            bounces={false}
            contentContainerStyle={{paddingBottom: 20}}
            onEndReached={onEndReached}
            ListFooterComponent={() => (
              <>
                {loadMore && (
                  <ActivityIndicator
                    size={'small'}
                    color={'black'}
                    style={{alignSelf: 'center', paddingVertical: 3}}
                  />
                )}
              </>
            )}
            data={CouponSlice.data}
            ListEmptyComponent={() => (
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  textAlign: 'center',
                  marginTop: 100,
                }}>
                No Coupons
              </Text>
            )}
            renderItem={e => {
              return (
                <View style={IroningStyles.IroningContainer}>
                  <Text style={IroningStyles.HighlighText}>
                    Coupon Code :-{' '} {e.index}
                    <Text style={IroningStyles.ValueText}>
                      {e.item?.couponCode}
                    </Text>
                  </Text>
                  <Text style={IroningStyles.HighlighText}>
                    Offer :-{' '}
                    <Text style={IroningStyles.ValueText}>
                      {e.item?.offer} %
                    </Text>
                  </Text>
                  <Text style={IroningStyles.HighlighText}>
                    Dashboard Msg :-{' '}
                    <Text style={IroningStyles.ValueText}>
                      {e.item?.dashboardMsg}
                    </Text>
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      marginHorizontal: 10,
                    }}>
                    {deleteLoader == e?.item?.id ? (
                      <ActivityIndicator size={'small'} color={'red'} />
                    ) : (
                      <MaterialIcons
                        onPress={() => onDelete(e.item.id)}
                        name="delete"
                        color="red"
                        size={30}
                      />
                    )}
                  </View>
                </View>
              );
            }}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('AddCoupon')}
            style={styles.floatingButton}>
            <Ionicons name="plus" size={30} color={AppColors.statusBarColor} />
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: AppColors.statusBarColor,
    flex: 1,
  },
  container: {
    marginHorizontal: 10,
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
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 5,
    elevation: 5,
  },
});

export default AllCoupon;
