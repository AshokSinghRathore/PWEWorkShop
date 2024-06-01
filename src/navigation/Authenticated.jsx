import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from '../screens/Authenticated/Dashboard';
import AllIroning from '../screens/Authenticated/Orders/Ironing/AllIroning';
import DetailedIroningOrder from '../screens/Authenticated/Orders/Ironing/DetailedIroningOrder';
import AllDryClean from '../screens/Authenticated/Orders/DryClean/AllDryClean';
import DetailedDryCleanOrder from '../screens/Authenticated/Orders/DryClean/DetailedDryCleanOrder';
import AllCoupon from '../screens/Authenticated/Coupon/AllCoupon';
import DetailedCoupon from '../screens/Authenticated/Coupon/DetailedCoupon';
import AddCoupon from '../screens/Authenticated/Coupon/AddCoupon';
import AllConcern from '../screens/Authenticated/Concern/AllConcern';
import AllBill from '../screens/Authenticated/Bill/AllBills';
import Ads from '../screens/Authenticated/ADS/Ads.jsx';
import AllFeedback from '../screens/Authenticated/Feedback/AllFeedback';
import Subscription from '../screens/Authenticated/Subscription/Subscription';
import EditProfile from '../screens/Authenticated/Profile/EditProfile';
import EditDryCleanOrder from '../components/DryClean/EditDryCleanOrder.jsx';
import EditIroningOrder from '../components/Ironing/EditIroningOrder.jsx';
import UpdateOrderStatusDryClean from '../screens/Authenticated/Orders/DryClean/UpdateOrderStatusDryClean.jsx';
import UpdateOrderStatusIroning from '../screens/Authenticated/Orders/Ironing/UpdateOrderStatusIroning.jsx';
import DetailedConcern from '../screens/Authenticated/Concern/DetailedConcern.jsx';
import SalesDashboard from '../screens/Authenticated/Sales/SalesDashboard.jsx';
import CreateOrder from '../screens/Authenticated/CreateOrder/CreateOrder.jsx';
import DryClean from '../screens/Authenticated/CreateOrder/DryClean.jsx';
import DryCleanDatePicker from '../screens/Authenticated/CreateOrder/DryCleanDatePicker.jsx';
import FinalCartDryClean from '../screens/Authenticated/CreateOrder/FinalCartDryClean.jsx';
import IronScreen from '../screens/Authenticated/CreateOrder/IronScreen.jsx';
import DatePicker from '../screens/Authenticated/CreateOrder/DatePicker.jsx';
import FinalCartIroning from '../screens/Authenticated/CreateOrder/FinalCartIroning.jsx';
import AllRider from '../screens/Authenticated/rider/AllRider.jsx';
import {Pressable, Text} from 'react-native';
import AddRider from '../screens/Authenticated/rider/AddRider.jsx';
const Stack = createStackNavigator();
const Authenticated = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Login">
      <Stack.Screen name="Dashboard" component={Dashboard} />
      {/* Ironing */}
      <Stack.Screen name="AllIroning" component={AllIroning} />
      <Stack.Screen
        name="DetailedIroningOrder"
        component={DetailedIroningOrder}
      />
      <Stack.Screen name="EditIroningOrder" component={EditIroningOrder} />
      <Stack.Screen
        name="UpdateOrderStatusIroning"
        component={UpdateOrderStatusIroning}
      />

      {/* ------- */}
      {/* Dry Clean */}
      <Stack.Screen name="AllDryClean" component={AllDryClean} />
      <Stack.Screen
        name="DetailedDryCleanOrder"
        component={DetailedDryCleanOrder}
      />
      <Stack.Screen
        name="UpdateOrderStatusDryClean"
        component={UpdateOrderStatusDryClean}
      />
      <Stack.Screen name="EditDryCleanOrder" component={EditDryCleanOrder} />
      {/* ------- */}

      {/* Coupon */}
      <Stack.Screen name="AllCoupon" component={AllCoupon} />
      <Stack.Screen name="DetailedCoupon" component={DetailedCoupon} />
      <Stack.Screen name="AddCoupon" component={AddCoupon} />
      {/* ------- */}

      {/* Concern */}
      <Stack.Screen name="AllConcern" component={AllConcern} />
      <Stack.Screen name="DetailedConcern" component={DetailedConcern} />
      {/* ------- */}

      {/* Bill */}
      {/* <Stack.Screen name="AllBill" component={AllBill} /> */}
      {/* <Stack.Screen name='' component={Det} */}
      {/* ------- */}

      {/* ADS */}
      <Stack.Screen name="Ads" component={Ads} />
      {/* ------- */}

      {/* ------- */}
      <Stack.Screen name="AllFeedback" component={AllFeedback} />
      {/* ------- */}

      {/* Subscription */}
      <Stack.Screen name="Subscription" component={Subscription} />
      {/* ------- */}

      {/* Profile */}
      <Stack.Screen name="EditProfile" component={EditProfile} />
      {/* ------- */}

      {/* Sales  */}
      <Stack.Screen name="SalesDashboard" component={SalesDashboard} />
      {/* ------- */}
      {/* Create Order  */}
      <Stack.Screen name="CreateOrder" component={CreateOrder} />
      <Stack.Screen name="DryClean" component={DryClean} />
      <Stack.Screen name="DryCleanDatePicker" component={DryCleanDatePicker} />
      <Stack.Screen name="FinalCartDryClean" component={FinalCartDryClean} />
      <Stack.Screen name="IronScreen" component={IronScreen} />
      <Stack.Screen name="DatePicker" component={DatePicker} />
      <Stack.Screen name="FinalCartIroning" component={FinalCartIroning} />
      {/* ------- */}
      {/* Rider Management  */}
      <Stack.Screen
        name="RiderManagement"
        options={({navigation}) => {
          return {
            headerShown: true,
            title: 'Rider Management',
            headerStyle: {
              backgroundColor: '#1ca3ac',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => {
              return (
                <Pressable
                  onPress={() => navigation.navigate('AddRider')}
                  style={{
                    backgroundColor: 'white',
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 10,
                  }}>
                  <Text style={{color: 'black', fontSize: 25, top: -1}}>+</Text>
                </Pressable>
              );
            },
          };
        }}
        component={AllRider}
      />
      <Stack.Screen name="AddRider" options={{
        title: 'Add Rider',
        headerShown: true,
        headerStyle:{
          backgroundColor: '#1ca3ac'
        },
        headerTitleStyle:{
          color:"white"
        },
        headerTintColor: '#fff',

      }} component={AddRider} />
    </Stack.Navigator>
  );
};

export default Authenticated;
