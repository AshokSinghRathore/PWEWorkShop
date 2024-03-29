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
      <Stack.Screen name='EditIroningOrder' component={EditIroningOrder} />
      {/* ------- */}
      {/* Dry Clean */}
      <Stack.Screen name="AllDryClean" component={AllDryClean} />
      <Stack.Screen
        name="DetailedDryCleanOrder"
        component={DetailedDryCleanOrder}
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
      <Stack.Screen name="DetailedConcern" component={DetailedCoupon} />
      {/* ------- */}

      {/* Bill */}
      <Stack.Screen name="AllBill" component={AllBill} />
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
    </Stack.Navigator>
  );
};

export default Authenticated;
