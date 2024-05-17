import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import LoadingOverlay from '../../../components/UI/LoadingOverlay';
import {formatDate} from '../../../helpers/DateFunction';
import {formatPrice} from '../../../helpers/formatPrice';
import {PERMISSIONS} from 'react-native-permissions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Poppins-Bold',
  },
  dateFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    alignItems: 'center',
  },
  dateFilterButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  dateFilterButtonText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Poppins-Bold',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Poppins-Bold',
  },

  saleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
  saleItemText: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'Poppins-Bold',
  },
});

const SalesDashboard = () => {
  const [allSales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const servicePinCode = useSelector(state => state.ServicePinCode);
  const [dateFilter, setDateFilter] = useState({
    last7Days: true,
    last30Days: false,
  });

  const [orderTypeFilter, setOrderTypeFilter] = useState({
    isBoth: true,
    isIroning: false,
    isDryClean: false,
  });

  const getSales = async () => {
    setLoading(true);
    try {
      const today = new Date();
      let startFilterDate;

      if (dateFilter.last7Days) {
        startFilterDate = new Date(today);
        startFilterDate.setDate(startFilterDate.getDate() - 7);
      } else {
        startFilterDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          0,
          0,
          0,
        );
      }

      const query = firestore()
        .collection('Order')
        .where('Address.Pincode', 'in', servicePinCode.planePinCodeArray)
        .where('DateOfOrder', '>=', startFilterDate);

      const salesResp = await query.get();

      if (!salesResp.empty) {
        const formattedSales = salesResp.docs.map(e => ({
          ...e.data(),
          id: e.id,
        }));
        setSales(formattedSales);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Something Went Wrong', 'Please try after some time');
    }
    setLoading(false);
  };

  useEffect(() => {
    setDateFilter({
      last7Days: true,
    });
    setOrderTypeFilter({
      isBoth: true,
    });
    getSales(false, true);
  }, []);

  const handleDateFilter = filter => {
    setDateFilter(filter);
    changeFilter(
      orderTypeFilter.isBoth,
      orderTypeFilter.isDryClean,
      filter.last7Days,
    );
  };
  const handleOrderType = filter => {
    setOrderTypeFilter(filter);
    changeFilter(filter.isBoth, filter.isDryClean, dateFilter.last7Days);
  };

  async function changeFilter(isBoth, isDryClean, last7Days) {
    setSales([]);
    setLoading(true);
    try {
      let startFilterDate;
      const today = new Date();

      if (last7Days) {
        startFilterDate = new Date(today);
        startFilterDate.setDate(startFilterDate.getDate() - 7);
      } else {
        startFilterDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          0,
          0,
          0,
        );
      }

      let query = firestore()
        .collection('Order')
        .where('Address.Pincode', 'in', servicePinCode.planePinCodeArray)
        .where('DateOfOrder', '>=', startFilterDate);

      if (!isBoth) {
        query = query.where(
          isDryClean ? 'isDryClean' : 'isIroning',
          '==',
          true,
        );
      }

      const salesResp = await query.get();

      if (!salesResp.empty) {
        const formattedSales = salesResp.docs.map(e => ({
          ...e.data(),
          id: e.id,
        }));
        setSales(formattedSales);
      }
    } catch (error) {
      Alert.alert('Something Went Wrong', 'Please Try After Some time');
    }
    setLoading(false);
  }
  const countPrice = () => {
    let totalPrice = 0;
    allSales.map(e => {
      totalPrice += Math.trunc(parseInt(e.price));
    });
    return totalPrice;
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingOverlay />
      ) : (
        <>
          <View style={styles.headerContainer}>
            <Text style={styles.heading}>Sales Dashboard</Text>
          </View>
          <View style={styles.dateFilterContainer}>
            <Text style={styles.headerText}> Date Filter : </Text>
            <TouchableOpacity
              onPress={() => handleDateFilter({last7Days: false, today: true})}
              style={[
                styles.dateFilterButton,
                {backgroundColor: dateFilter.today ? 'grey' : 'wheat'},
              ]}>
              <Text style={styles.dateFilterButtonText}>Todays Sales</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDateFilter({last7Days: true, today: false})}
              style={[
                styles.dateFilterButton,
                {backgroundColor: dateFilter.last7Days ? 'grey' : 'wheat'},
              ]}>
              <Text style={styles.dateFilterButtonText}>Last 7 Days</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dateFilterContainer}>
            <Text style={styles.headerText}> Order Type : </Text>
            <TouchableOpacity
              onPress={() =>
                handleOrderType({
                  isBoth: true,
                  isIroning: false,
                  isDryClean: false,
                })
              }
              style={[
                styles.dateFilterButton,
                {
                  backgroundColor: orderTypeFilter.isBoth ? 'grey' : 'wheat',
                  paddingHorizontal: 5,
                  paddingVertical: 5,
                },
              ]}>
              <Text style={styles.dateFilterButtonText}>Both</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                handleOrderType({
                  isBoth: false,
                  isIroning: true,
                  isDryClean: false,
                })
              }
              style={[
                styles.dateFilterButton,
                {
                  backgroundColor: orderTypeFilter.isIroning ? 'grey' : 'wheat',
                  paddingHorizontal: 5,
                  paddingVertical: 5,
                },
              ]}>
              <Text style={styles.dateFilterButtonText}>Ironing</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                handleOrderType({
                  isBoth: false,
                  isIroning: false,
                  isDryClean: true,
                })
              }
              style={[
                styles.dateFilterButton,
                {
                  backgroundColor: orderTypeFilter.isDryClean
                    ? 'grey'
                    : 'wheat',
                  paddingHorizontal: 5,
                  paddingVertical: 5,
                },
              ]}>
              <Text style={styles.dateFilterButtonText}>DryClean</Text>
            </TouchableOpacity>
          </View>
          <View style={{padding: 10}}>
            <Text style={styles.headerText}>
              Total Orders : {allSales.length || 0}
            </Text>
            <Text style={styles.headerText}>
              Total Price : {formatPrice(countPrice()) || 0}
            </Text>
          </View>
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>Date</Text>
            <Text style={styles.headerText}>{'        '}Price</Text>
            <Text style={[styles.headerText]}>Customer</Text>
          </View>
          <FlatList
            data={allSales}
            renderItem={({item}) => (
              <View style={styles.saleItem}>
                <Text style={styles.saleItemText}>
                  {formatDate(item.DateOfOrder.toDate())}
                </Text>
                <Text style={styles.saleItemText}>
                  {formatPrice(Math.trunc(item?.price || 0))}
                </Text>
                <Text style={styles.saleItemText}>
                  {item?.user_name?.length > 18
                    ? item.user_name.substring(0, 9) + '..'
                    : item?.user_name}
                </Text>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

export default SalesDashboard;
