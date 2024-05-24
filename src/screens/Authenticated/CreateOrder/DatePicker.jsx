import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  FlatList,
  LogBox,
  TextInput,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import DatePicker from 'react-native-date-picker';
import {fontFamily} from './DryCleanDatePicker';
import {DashboardStyles} from './DryClean';
import CustomDropdown from '../../../components/CustomDropdown';
import {AppColors as color} from '../../../constants/color';
import DeliveryPreference from '../../../components/Ironing/DeliveryPreference';
import ConcernLabelButton from '../../../components/UI/ConcernLabelButton';

const timeSlots = [
  {id: 1, value: '08:00', label: '08:00 - 08:15'},
  {id: 2, value: '08:15', label: '08:15 - 08:30'},
  {id: 3, value: '08:30', label: '08:30 - 08:45'},
  {id: 4, value: '08:45', label: '08:45 - 09:00'},
  {id: 5, value: '09:00', label: '09:00 - 09:15'},
  {id: 6, value: '09:15', label: '09:15 - 09:30'},
  {id: 7, value: '09:30', label: '09:30 - 09:45'},
  {id: 8, value: '09:45', label: '09:45 - 10:00'},
  {id: 9, value: '10:00', label: '10:00 - 10:15'},
  {id: 10, value: '10:15', label: '10:15 - 10:30'},
  {id: 11, value: '10:30', label: '10:30 - 10:45'},
  {id: 12, value: '10:45', label: '10:45 - 11:00'},
  {id: 13, value: '11:00', label: '11:00 - 11:15'},
  {id: 14, value: '11:15', label: '11:15 - 11:30'},
  {id: 15, value: '11:30', label: '11:30 - 11:45'},
  {id: 16, value: '11:45', label: '11:45 - 12:00'},
  {id: 17, value: '12:00', label: '12:00 - 12:15'},
  {id: 18, value: '12:15', label: '12:15 - 12:30'},
  {id: 19, value: '12:30', label: '12:30 - 12:45'},
  {id: 20, value: '12:45', label: '12:45 - 13:00'},
  {id: 21, value: '13:00', label: '13:00 - 13:15'},
  {id: 22, value: '13:15', label: '13:15 - 13:30'},
  {id: 23, value: '13:30', label: '13:30 - 13:45'},
  {id: 24, value: '13:45', label: '13:45 - 14:00'},
  {id: 25, value: '14:00', label: '14:00 - 14:15'},
  {id: 26, value: '14:15', label: '14:15 - 14:30'},
  {id: 27, value: '14:30', label: '14:30 - 14:45'},
  {id: 28, value: '14:45', label: '14:45 - 15:00'},
  {id: 29, value: '15:00', label: '15:00 - 15:15'},
  {id: 30, value: '15:15', label: '15:15 - 15:30'},
  {id: 31, value: '15:30', label: '15:30 - 15:45'},
  {id: 32, value: '15:45', label: '15:45 - 16:00'},
  {id: 33, value: '16:00', label: '16:00 - 16:15'},
  {id: 34, value: '16:15', label: '16:15 - 16:30'},
  {id: 35, value: '16:30', label: '16:30 - 16:45'},
  {id: 36, value: '16:45', label: '16:45 - 17:00'},
  {id: 37, value: '17:00', label: '17:00 - 17:15'},
  {id: 38, value: '17:15', label: '17:15 - 17:30'},
  {id: 39, value: '17:30', label: '17:30 - 17:45'},
  {id: 40, value: '17:45', label: '17:45 - 18:00'},
  {id: 41, value: '18:00', label: '18:00 - 18:15'},
  {id: 42, value: '18:15', label: '18:15 - 18:30'},
  {id: 43, value: '18:30', label: '18:30 - 18:45'},
  {id: 44, value: '18:45', label: '18:45 - 19:00'},
  {id: 45, value: '19:00', label: '19:00 - 19:15'},
  {id: 46, value: '19:15', label: '19:15 - 19:30'},
  {id: 47, value: '19:30', label: '19:30 - 19:45'},
  {id: 48, value: '19:45', label: '19:45 - 20:00'},
  {id: 49, value: '20:00', label: '20:00 - 20:15'},
  {id: 50, value: '20:15', label: '20:15 - 20:30'},
];

const Datepicker = ({navigation, route}) => {
  LogBox.ignoreLogs([
    'Sending `onAnimatedValueUpdate` with no listeners registered.',
  ]);
  const IroningCharges = useSelector(state => state.IroningCharges);

  const test = new Date();
  test.setHours(21, 0, 0, 0);
  const [
    deliveryPreference2to4HrsInstant,
    setdeliveryPreference2to4HrsInstant,
  ] = useState(false);
  const [deliveryPreference12to24Hrs, setdeliveryPreference12to24Hrs] =
    useState(false);
  const [deliveryPreference24to48Hrs, setdeliveryPreference24to48Hrs] =
    useState(false);
  const Selector = useSelector(state => state.TempCartItems);
  const [PickDate, setPickDate] = useState(null);
  const [PickMinDate, setPickMinDate] = useState(new Date());
  const [isPickDateOpen, setIsPickDateOpen] = useState(false);
  const [PickTime, setPickTime] = useState(null);
  const [DropDate, setDropDate] = useState(null);
  const [DropMinDate, setDropMinDate] = useState(new Date());
  const [isDropDateOpen, setIsDropDateOpen] = useState(false);
  const [DropTime, setDropTime] = useState(null);
  const [TotatCloth, setTotalCloth] = useState(0);
  const [PickAllTimes, setPickAllTimes] = useState(timeSlots);
  const [DropAllTimes, setDropAllTimes] = useState(timeSlots);
  const [instantAvailable, setInstantAvailable] = useState(null);
  const Cred = useSelector(state => state.Credential);
  const isPickTimeOpenRef = useRef();
  const isDropTimeOpenRef = useRef();

  const openModalPickTime = () => {
    isPickTimeOpenRef.current?.open();
  };

  const openModalDropTime = () => {
    isDropTimeOpenRef.current?.open();
  };

  function isCurrentHourBetween17To7() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    if (currentHour >= 17 && currentHour <= 23) {
      return true;
    }

    if (currentHour >= 0 && currentHour < 7) {
      return true;
    }

    return false;
  }

  useEffect(() => {
    if (isCurrentHourBetween17To7()) {
      setInstantAvailable(false);
    } else {
      setInstantAvailable(true);
    }
    var clothCount = 0;
    for (var i in Selector.DryClean) {
      count = parseInt(Selector.DryClean[i].Quantity);

      clothCount += count;
    }
    for (var j in Selector.Ironing) {
      count = parseInt(Selector.Ironing[j].Quantity);

      clothCount += count;
    }
    setTotalCloth(clothCount);
  }, []);
  // ----------n 24 to 48 login n--------------------
  function time24to48() {
    setPickDate(null);
    setDropDate(null);
    setPickTime(null);
    setDropTime(null);
    const UserCurrentDate = new Date();
    const currentTime = new Date();

    const targetTime = new Date();
    targetTime.setHours(19, 40, 0);

    if (UserCurrentDate.getHours() >= 20 || currentTime >= targetTime) {
      UserCurrentDate.setDate(UserCurrentDate.getDate() + 1);

      setPickAllTimes(timeSlots);
    } else {
      if (UserCurrentDate.getHours() < 7) {
        setPickAllTimes(timeSlots);
      } else {
        var CurrentHour = UserCurrentDate.getHours();
        var CurrentMin = UserCurrentDate.getMinutes();
        var PickTime = `${CurrentHour + 1}:${CurrentMin}`;

        const newPickTimes = timeSlots.filter(e => {
          const time = new Date(`1970-01-01T${e.value}:00`);
          const targetTime = new Date(`1970-01-01T${PickTime}:00`);
          return time > targetTime;
        });
        setPickAllTimes(newPickTimes);
      }
    }
    setPickMinDate(UserCurrentDate);
  }

  function pickDateFor24to48(date) {
    setDropDate(null);
    setDropTime(null);
    setPickTime(null);
    if (
      date.getDate() != new Date().getDate() ||
      date.getMonth() != new Date().getMonth() ||
      date.getFullYear() != new Date().getFullYear()
    ) {
      setPickAllTimes(timeSlots);
      const newDropMinDate = new Date(date);
      newDropMinDate.setDate(newDropMinDate.getDate() + 1);
      setDropMinDate(newDropMinDate);
    } else {
      time24to48();
    }

    setPickDate(date);
    setIsPickDateOpen(false);
  }

  function dropDateFor24to48(date) {
    setDropTime(null);
    const MinYear = DropMinDate.getFullYear();
    const DateYear = date.getFullYear();
    const MinMonth = DropMinDate.getMonth();
    const DateMonth = date.getMonth();
    const MinDay = DropMinDate.getDate();
    const DateDay = date.getDate();
    const constructedMinDate = new Date(MinYear, MinMonth, MinDay);
    const constructedDate = new Date(DateYear, DateMonth, DateDay);
    constructedMinDate.setHours(0, 0, 0, 0);
    constructedDate.setHours(0, 0, 0, 0);
    if (constructedDate > constructedMinDate) {
      setDropAllTimes(timeSlots);
    } else {
      pickTimeFor24to48(PickTime);
    }
    setDropDate(date);
    setIsDropDateOpen(false);
  }

  function pickTimeFor24to48(item) {
    setDropDate(null);
    setDropTime(null);
    const time = new Date(`1970-01-01T${item.value}:00`);
    const targetTime = new Date(`1970-01-01T20:45:00`);

    if (time >= targetTime) {
      const UserCurrentTime = new Date(PickDate);
      UserCurrentTime.setDate(UserCurrentTime.getDate() + 2);
      UserCurrentTime.setHours(8, 0, 0, 0);
      setDropMinDate(UserCurrentTime);
      setDropAllTimes(timeSlots);
    } else {
      const UserCurrentTime = new Date(PickDate);
      UserCurrentTime.setDate(UserCurrentTime.getDate() + 1);
      UserCurrentTime.setHours(8, 0, 0, 0);
      setDropMinDate(UserCurrentTime);
      const UserCurrentDate = new Date();

      if (TotatCloth <= 10) {
        const newDropTimes = timeSlots.filter(e => {
          const time = new Date(`1970-01-01T${e.value}:00`);
          const targetTime = new Date(`1970-01-01T${item.value}:00`);
          return time > targetTime;
        });
        setDropAllTimes(newDropTimes);
      } else if (TotatCloth <= 20) {
        const [hours, minutes] = item.value.split(':');
        var [copyHours, copyMinutes] = [hours, minutes];
        const parsedHours = parseInt(hours, 10);
        const parsedMinutes = parseInt(minutes, 10);
        const newHours = parsedHours + 6;
        const Time = `${newHours.toString().padStart(2, '0')}:${parsedMinutes
          .toString()
          .padStart(2, '0')}`;
        if (item.value < '14:45') {
          const newDropTimes = timeSlots.filter(e => {
            const time = new Date(`1970-01-01T${e.value}:00`);
            const targetTime = new Date(`1970-01-01T${Time}:00`);
            return time > targetTime;
          });
          setDropAllTimes(newDropTimes);
        } else {
          UserCurrentTime.setDate(UserCurrentTime.getDate() + 1);
          UserCurrentTime.setHours(8, 0, 0, 0);
          setDropMinDate(UserCurrentTime);
          setDropAllTimes(timeSlots);
        }
      } else {
        const [hours, minutes] = item.value.split(':');
        var [copyHours, copyMinutes] = [hours, minutes];
        const parsedHours = parseInt(hours, 10);
        const parsedMinutes = parseInt(minutes, 10);
        const newHours = parsedHours + 10;
        const Time = `${newHours.toString().padStart(2, '0')}:${parsedMinutes
          .toString()
          .padStart(2, '0')}`;
        if (item.value < '10:45') {
          const newDropTimes = timeSlots.filter(e => {
            const time = new Date(`1970-01-01T${e.value}:00`);
            const targetTime = new Date(`1970-01-01T${Time}:00`);
            return time > targetTime;
          });
          setDropAllTimes(newDropTimes);
        } else {
          UserCurrentTime.setDate(UserCurrentTime.getDate() + 1);
          UserCurrentTime.setHours(8, 0, 0, 0);
          setDropMinDate(UserCurrentTime);
          setDropAllTimes(timeSlots);
        }
      }
    }
  }
  function dropTimeFor24to48(item) {
    setDropTime(item);
    isDropTimeOpenRef.current?.close();
  }

  function priceCalculate24to48() {
    var price_1 = 0;
    var price_2 = 0;
    var price_3 = 0;
    var price_4 = 0;
    const priceForDelayed = IroningCharges.IroningDelayed;
    for (var i in Selector.Ironing) {
      if (Selector.Ironing[i].ClothType === '0-5') {
        switch (Selector.Ironing[i].PressType) {
          case 'Normal':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) *
              priceForDelayed.age0to5[1];
            price_1 += temp;
            break;
          case 'Standing Steam Press':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) *
              priceForDelayed.age0to5[2];
            price_1 += temp;
            break;
          case 'Germ Kill disinfectant':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) *
              priceForDelayed.age0to5[3];
            price_1 += temp;
            break;
          default:
            break;
        }
      } else if (Selector.Ironing[i].ClothType === '5-15') {
        switch (Selector.Ironing[i].PressType) {
          case 'Normal':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) *
              priceForDelayed.age5to15[1];
            price_2 += temp;
            break;
          case 'Standing Steam Press':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) *
              priceForDelayed.age5to15[2];
            price_2 += temp;
            break;
          case 'Germ Kill disinfectant':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) *
              priceForDelayed.age5to15[3];
            price_2 += temp;
            break;
          default:
            break;
        }
      } else if (Selector.Ironing[i].ClothType === '15+') {
        switch (Selector.Ironing[i].PressType) {
          case 'Normal':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) *
              priceForDelayed.age15AndMore[1];
            price_3 += temp;
            break;
          case 'Standing Steam Press':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) *
              priceForDelayed.age15AndMore[2];
            price_3 += temp;
            break;
          case 'Germ Kill disinfectant':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) *
              priceForDelayed.age15AndMore[3];
            price_3 += temp;
            break;
          default:
            break;
        }
      } else if (Selector.Ironing[i].isSpecial) {
        const findCloth = IroningCharges.specialCloth.find(
          e => e.value == Selector.Ironing[i].ClothType,
        );
        switch (Selector.Ironing[i].PressType) {
          case 'Normal':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) * findCloth.delayed[1];
            price_3 += temp;
            break;
          case 'Standing Steam Press':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) * findCloth.delayed[2];
            price_3 += temp;
            break;
          case 'Germ Kill disinfectant':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) * findCloth.delayed[3];
            price_3 += temp;
            break;
          default:
            break;
        }
      }
    }

    const finalIroningCostWithoutPackaging =
      price_1 + price_2 + price_3 + price_4;

    navigation.navigate('FinalCartIroning', {
      price: finalIroningCostWithoutPackaging,
      PickTime: PickTime.label,
      PickDate: PickDate.toISOString(),
      DropDate: DropDate.toISOString(),
      DropTime: DropTime.label,
      isDelete: route?.params?.isDelete,
      cartKey: route?.params?.key,
    });
  }
  function priceCalculate12to24() {
    var price_1 = 0;
    var price_2 = 0;
    var price_3 = 0;
    var price_4 = 0;
    const priceForNormal = IroningCharges.IroningNormal;
    for (let i in Selector.Ironing) {
      if (Selector.Ironing[i].ClothType === '0-5') {
        switch (Selector.Ironing[i].PressType) {
          case 'Normal':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) *
              priceForNormal.age0to5[1];
            price_1 += temp;
            break;
          case 'Standing Steam Press':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) *
              priceForNormal.age0to5[2];
            price_1 += temp;
            break;
          case 'Germ Kill disinfectant':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) *
              priceForNormal.age0to5[3];
            price_1 += temp;
            break;
          default:
            break;
        }
      } else if (Selector.Ironing[i].ClothType === '5-15') {
        switch (Selector.Ironing[i].PressType) {
          case 'Normal':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) *
              priceForNormal.age5to15[1];
            price_2 += temp;
            break;
          case 'Standing Steam Press':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) *
              priceForNormal.age5to15[2];
            price_2 += temp;
            break;
          case 'Germ Kill disinfectant':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) *
              priceForNormal.age5to15[3];
            price_2 += temp;
            break;
          default:
            break;
        }
      } else if (Selector.Ironing[i].ClothType === '15+') {
        switch (Selector.Ironing[i].PressType) {
          case 'Normal':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) *
              priceForNormal.age15AndMore[1];
            price_3 += temp;
            break;
          case 'Standing Steam Press':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) *
              priceForNormal.age15AndMore[2];
            price_3 += temp;
            break;
          case 'Germ Kill disinfectant':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) *
              priceForNormal.age15AndMore[3];
            price_3 += temp;
            break;
          default:
            break;
        }
      } else if (Selector.Ironing[i].isSpecial) {
        const findCloth = IroningCharges.specialCloth.find(
          e => e.value == Selector.Ironing[i].ClothType,
        );
        switch (Selector.Ironing[i].PressType) {
          case 'Normal':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) * findCloth.normal[1];
            price_3 += temp;
            break;
          case 'Standing Steam Press':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) * findCloth.normal[2];
            price_3 += temp;
            break;
          case 'Germ Kill disinfectant':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) * findCloth.normal[3];
            price_3 += temp;
            break;
          default:
            break;
        }
      }
    }

    const finalIroningCostWithoutPackaging =
      price_1 + price_2 + price_3 + price_4;

    navigation.navigate('FinalCartIroning', {
      price: finalIroningCostWithoutPackaging,
      PickTime: PickTime.label,
      PickDate: PickDate.toISOString(),
      DropDate: DropDate.toISOString(),
      DropTime: DropTime.label,
      isDelete: route?.params?.isDelete,
      cartKey: route?.params?.key,
    });
  }
  function priceCalculate2to4() {
    var price_1 = 0;
    var price_2 = 0;
    var price_3 = 0;
    var price_4 = 0;
    const priceForInstant = IroningCharges.IroningInstant;

    for (var i in Selector.Ironing) {
      if (Selector.Ironing[i].ClothType === '0-5') {
        switch (Selector.Ironing[i].PressType) {
          case 'Normal':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) *
              priceForInstant.age0to5[1];
            price_1 += temp;
            break;
          case 'Standing Steam Press':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) *
              priceForInstant.age0to5[2];
            price_1 += temp;
            break;
          case 'Germ Kill disinfectant':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) *
              priceForInstant.age0to5[3];
            price_1 += temp;
            break;
          default:
            break;
        }
      } else if (Selector.Ironing[i].ClothType === '5-15') {
        switch (Selector.Ironing[i].PressType) {
          case 'Normal':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) *
              priceForInstant.age5to15[1];
            price_2 += temp;
            break;
          case 'Standing Steam Press':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) *
              priceForInstant.age5to15[2];
            price_2 += temp;
            break;
          case 'Germ Kill disinfectant':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) *
              priceForInstant.age5to15[3];
            price_2 += temp;
            break;
          default:
            break;
        }
      } else if (Selector.Ironing[i].ClothType === '15+') {
        switch (Selector.Ironing[i].PressType) {
          case 'Normal':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) *
              priceForInstant.age15AndMore[1];
            price_3 += temp;
            break;
          case 'Standing Steam Press':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) *
              priceForInstant.age15AndMore[2];
            price_3 += temp;
            break;
          case 'Germ Kill disinfectant':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) *
              priceForInstant.age15AndMore[3];
            price_3 += temp;
            break;
          default:
            break;
        }
      } else if (Selector.Ironing[i].isSpecial) {
        const findCloth = IroningCharges.specialCloth.find(
          e => e.value == Selector.Ironing[i].ClothType,
        );
        switch (Selector.Ironing[i].PressType) {
          case 'Normal':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) * findCloth.instant[1];
            price_3 += temp;
            break;
          case 'Standing Steam Press':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) * findCloth.instant[2];
            price_3 += temp;
            break;
          case 'Germ Kill disinfectant':
            var temp =
              parseInt(Selector.Ironing[i].Quantity) * findCloth.instant[3];
            price_3 += temp;
            break;
          default:
            break;
        }
      }
    }

    const finalIroningCostWithoutPackaging =
      price_1 + price_2 + price_3 + price_4;

    navigation.navigate('FinalCartIroning', {
      price: finalIroningCostWithoutPackaging,
      PickTime: PickTime.label,
      PickDate: PickDate.toISOString(),
      DropDate: DropDate.toISOString(),
      DropTime: DropTime.label,
      isDelete: route?.params?.isDelete,
      cartKey: route?.params?.key,
    });
  }

  // -----------------n Ends n---------------------------

  // -------------n 12 to 24 Logic n---------------------

  function time12to24() {
    setPickDate(null);
    setDropDate(null);
    setPickTime(null);
    setDropTime(null);
    const UserCurrentDate = new Date();
    if (UserCurrentDate.getHours() >= 20) {
      UserCurrentDate.setDate(UserCurrentDate.getDate() + 1);

      setPickAllTimes(timeSlots);
    } else {
      if (UserCurrentDate.getHours() < 7) {
        setPickAllTimes(timeSlots);
      } else {
        var CurrentHour = UserCurrentDate.getHours();
        var CurrentMin = UserCurrentDate.getMinutes();
        const PickTime = `${CurrentHour + 1}:${
          CurrentMin < 10 ? '0' : ''
        }${CurrentMin}`;

        const targetTime = new Date(`1970-01-01T10:00:00`);

        const newPickTimes = timeSlots.filter(e => {
          const time = new Date(`1970-01-01T${e.value}:00`);

          return time > new Date(`1970-01-01T${PickTime}:00`);
        });
        setPickAllTimes(newPickTimes);
      }
    }
    setPickMinDate(UserCurrentDate);
  }

  function pickDateFor12to24(date) {
    setDropDate(null);
    setDropTime(null);
    setPickTime(null);
    if (
      date.getDate() != new Date().getDate() ||
      date.getMonth() != new Date().getMonth() ||
      date.getFullYear() != new Date().getFullYear()
    ) {
      setPickAllTimes(timeSlots);

      setDropMinDate(date);
    } else {
      time12to24();
    }

    setPickDate(date);
    setIsPickDateOpen(false);
  }

  function pickTimeFor12to24(item) {
    setDropDate(null);
    setDropTime(null);
    const time = new Date(`1970-01-01T${item.value}:00`);
    const targetTime = new Date(`1970-01-01T18:00:00`);

    if (time >= targetTime) {
      const UserCurrentTime = new Date(PickDate);

      if (item.value >= '20:45') {
        UserCurrentTime.setDate(UserCurrentTime.getDate() + 2);
        UserCurrentTime.setHours(8, 0, 0, 0);
        setDropMinDate(UserCurrentTime);
        setDropAllTimes(timeSlots);
      } else {
        const newDropTimes = timeSlots.filter(e => {
          const time = new Date(`1970-01-01T${e.value}:00`);
          const targetTime = new Date(`1970-01-01T${item.value}:00`);
          return time > targetTime;
        });
        setDropAllTimes(newDropTimes);
        UserCurrentTime.setDate(UserCurrentTime.getDate() + 1);
        UserCurrentTime.setHours(8, 0, 0, 0);
        setDropMinDate(UserCurrentTime);
      }
    } else {
      const MinYear = PickMinDate.getFullYear();
      const DateYear = PickDate.getFullYear();
      const MinMonth = PickMinDate.getMonth();
      const DateMonth = PickDate.getMonth();
      const MinDay = PickMinDate.getDate();
      const DateDay = PickDate.getDate();
      const constructedMinDate = new Date(MinYear, MinMonth, MinDay);
      const constructedDate = new Date(DateYear, DateMonth, DateDay);
      constructedMinDate.setHours(0, 0, 0, 0);
      constructedDate.setHours(0, 0, 0, 0);

      function isTimeBetween8And10(time) {
        const startTime = new Date('1970-01-01T08:00');
        const endTime = new Date('1970-01-01T10:00');
        const checkTime = new Date(`1970-01-01T${time}`);

        return checkTime >= startTime && checkTime < endTime;
      }

      if (isTimeBetween8And10(item.value)) {
        setDropMinDate(PickDate);
        setDropAllTimes([
          {id: 41, value: '18:00', label: '18:00 - 18:15'},
          {id: 42, value: '18:15', label: '18:15 - 18:30'},
          {id: 43, value: '18:30', label: '18:30 - 18:45'},
          {id: 44, value: '18:45', label: '18:45 - 19:00'},
          {id: 45, value: '19:00', label: '19:00 - 19:15'},
          {id: 46, value: '19:15', label: '19:15 - 19:30'},
          {id: 47, value: '19:30', label: '19:30 - 19:45'},
          {id: 48, value: '19:45', label: '19:45 - 20:00'},
          {id: 49, value: '20:00', label: '20:00 - 20:15'},
          {id: 50, value: '20:15', label: '20:15 - 20:30'},
          {id: 51, value: '20:30', label: '20:30 - 20:45'},
          {id: 52, value: '20:45', label: '20:45 - 21:00'},
        ]);
      } else {
        const UserCurrentTime = new Date(PickDate);
        if (item.value >= '20:45') {
          UserCurrentTime.setDate(UserCurrentTime.getDate() + 2);
          UserCurrentTime.setHours(8, 0, 0, 0);
          setDropMinDate(UserCurrentTime);
          setDropAllTimes(timeSlots);
        } else {
          const newDropTimes = timeSlots.filter(e => {
            const time = new Date(`1970-01-01T${e.value}:00`);
            const targetTime = new Date(`1970-01-01T${item.value}:00`);
            return time > targetTime;
          });
          setDropAllTimes(newDropTimes);
          UserCurrentTime.setDate(UserCurrentTime.getDate() + 1);
          UserCurrentTime.setHours(8, 0, 0, 0);
          setDropMinDate(UserCurrentTime);
        }
      }
    }
  }

  function dropDateFor12to24(date) {
    setDropTime(null);
    const MinYear = DropMinDate.getFullYear();
    const DateYear = date.getFullYear();
    const MinMonth = DropMinDate.getMonth();
    const DateMonth = date.getMonth();
    const MinDay = DropMinDate.getDate();
    const DateDay = date.getDate();
    const constructedMinDate = new Date(MinYear, MinMonth, MinDay);
    const constructedDate = new Date(DateYear, DateMonth, DateDay);
    constructedMinDate.setHours(0, 0, 0, 0);
    constructedDate.setHours(0, 0, 0, 0);
    if (constructedDate > constructedMinDate) {
      setDropAllTimes(timeSlots);
    } else {
      pickTimeFor12to24(PickTime);
    }
    setDropDate(date);
    setIsDropDateOpen(false);
  }

  function dropTimeFor12to24(item) {
    setDropTime(item);
    isDropTimeOpenRef.current?.close();
  }
  // -----------------n Ends n---------------------------

  // -----------------n 2 to 4 Logic n-----------------
  function time2to4() {
    setPickDate(null);
    setDropDate(null);
    setPickTime(null);
    setDropTime(null);
    const UserCurrentDate = new Date();
    if (UserCurrentDate.getHours() >= 20) {
      UserCurrentDate.setDate(UserCurrentDate.getDate() + 1);

      setPickAllTimes(timeSlots);
    } else {
      if (UserCurrentDate.getHours() < 7) {
        setPickAllTimes(timeSlots);
      } else {
        if (UserCurrentDate.getHours() < 7) {
          setPickAllTimes(timeSlots);
        } else {
          var CurrentHour = UserCurrentDate.getHours();
          var CurrentMin = UserCurrentDate.getMinutes();
          var PickTime = `${CurrentHour + 1}:${CurrentMin}`;

          const newPickTimes = timeSlots.filter(e => {
            const time = new Date(`1970-01-01T${e.value}:00`);
            const targetTime = new Date(`1970-01-01T${PickTime}:00`);
            return time > targetTime;
          });
          setPickAllTimes(newPickTimes);
        }
      }
    }
    setPickMinDate(UserCurrentDate);
  }

  function pickDateFor2to4(date) {
    setDropDate(null);
    setDropTime(null);
    setPickTime(null);
    if (
      date.getDate() != new Date().getDate() ||
      date.getMonth() != new Date().getMonth() ||
      date.getFullYear() != new Date().getFullYear()
    ) {
      setPickAllTimes(timeSlots);
      const newDropMinDate = new Date(date);
      newDropMinDate.setDate(newDropMinDate.getDate() + 1);
      setDropMinDate(newDropMinDate);
    } else {
      time24to48();
    }

    setPickDate(date);
    setIsPickDateOpen(false);
  }
  function pickTimeFor2to4(item) {
    setDropDate(null);
    setDropTime(null);
    const time = new Date(`1970-01-01T${item.value}:00`);
    const targetTime = new Date(`1970-01-01T20:45:00`);

    if (time >= targetTime) {
      const UserCurrentTime = new Date(PickDate);
      UserCurrentTime.setDate(UserCurrentTime.getDate() + 1);
      UserCurrentTime.setHours(8, 0, 0, 0);
      setDropMinDate(UserCurrentTime);
      setDropAllTimes(timeSlots);
    } else {
      const UserCurrentTime = new Date(PickDate);

      if (TotatCloth <= 15) {
        setDropMinDate(UserCurrentTime);
        const [hours, minutes] = item.value.split(':');
        var [copyHours, copyMinutes] = [hours, minutes];
        const parsedHours = parseInt(hours, 10);
        const parsedMinutes = parseInt(minutes, 10);
        const newHours = parsedHours + 2;
        const Time = `${newHours.toString().padStart(2, '0')}:${parsedMinutes
          .toString()
          .padStart(2, '0')}`;
        if (item.value < '19:00') {
          const newDropTimes = timeSlots.filter(e => {
            const time = new Date(`1970-01-01T${e.value}:00`);
            const targetTime = new Date(`1970-01-01T${Time}:00`);
            return time > targetTime;
          });
          setDropAllTimes(newDropTimes);
        } else {
          UserCurrentTime.setDate(UserCurrentTime.getDate() + 1);
          UserCurrentTime.setHours(8, 0, 0, 0);
          setDropMinDate(UserCurrentTime);
          setDropAllTimes(timeSlots);
        }
      } else if (TotatCloth > 15) {
        setDropMinDate(UserCurrentTime);
        const [hours, minutes] = item.value.split(':');
        var [copyHours, copyMinutes] = [hours, minutes];
        const parsedHours = parseInt(hours, 10);
        const parsedMinutes = parseInt(minutes, 10);
        const newHours = parsedHours + 3;
        const Time = `${newHours.toString().padStart(2, '0')}:${parsedMinutes
          .toString()
          .padStart(2, '0')}`;
        if (item.value < '18:00') {
          const newDropTimes = timeSlots.filter(e => {
            const time = new Date(`1970-01-01T${e.value}:00`);
            const targetTime = new Date(`1970-01-01T${Time}:00`);
            return time > targetTime;
          });
          setDropAllTimes(newDropTimes);
        } else {
          UserCurrentTime.setDate(UserCurrentTime.getDate() + 1);
          UserCurrentTime.setHours(8, 0, 0, 0);
          setDropMinDate(UserCurrentTime);
          setDropAllTimes(timeSlots);
        }
      }
    }
  }

  function dropDateFor2to4(date) {
    setDropTime(null);
    const MinYear = DropMinDate.getFullYear();
    const DateYear = date.getFullYear();
    const MinMonth = DropMinDate.getMonth();
    const DateMonth = date.getMonth();
    const MinDay = DropMinDate.getDate();
    const DateDay = date.getDate();
    const constructedMinDate = new Date(MinYear, MinMonth, MinDay);
    const constructedDate = new Date(DateYear, DateMonth, DateDay);
    constructedMinDate.setHours(0, 0, 0, 0);
    constructedDate.setHours(0, 0, 0, 0);
    if (constructedDate > constructedMinDate) {
      setDropAllTimes(timeSlots);
    } else {
      pickTimeFor2to4(PickTime);
    }
    setDropDate(date);
    setIsDropDateOpen(false);
  }

  function dropTimeFor2to4(item) {
    setDropTime(item);
    isDropTimeOpenRef.current?.close();
  }

  // -----------------n Ends n---------------------------
  function Submit() {
    const Preference = Boolean(
      deliveryPreference12to24Hrs ||
        deliveryPreference2to4HrsInstant ||
        deliveryPreference24to48Hrs,
    );
    if (Preference && PickDate && PickTime && DropDate && DropTime) {
      if (deliveryPreference24to48Hrs) {
        priceCalculate24to48();
      } else if (deliveryPreference12to24Hrs) {
        priceCalculate12to24();
      } else if (deliveryPreference2to4HrsInstant) {
        priceCalculate2to4();
      }
    } else {
      Alert.alert(
        'Please Select Above Information',
        'First select your delivery preference then pick date and lastly pick time ',
      );
    }
  }
  return (
    <>
      <SafeAreaView style={DashboardStyles.container}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
          }}>
          <ConcernLabelButton
            label={'Select Delivery Preference'}
            customStyle={{
              height: 50,
              width: '90%',
              marginTop: 30,
            }}
          />
          <DeliveryPreference
            label={'24-48 Hours\n(Reduced Per Cloth Cost)'}
            onPress={() => {
              setdeliveryPreference12to24Hrs(false);
              setdeliveryPreference24to48Hrs(true);
              setdeliveryPreference2to4HrsInstant(false);
              time24to48();
            }}
            condition={deliveryPreference24to48Hrs}
          />
          <DeliveryPreference
            label={'12-24 Hours'}
            onPress={() => {
              setdeliveryPreference12to24Hrs(true);
              setdeliveryPreference24to48Hrs(false);
              setdeliveryPreference2to4HrsInstant(false);
              time12to24();
            }}
            condition={deliveryPreference12to24Hrs}
          />
          <DeliveryPreference
            isDisable={!instantAvailable}
            label={'3-4 Hours\n(Increased Per Cloth Cost)'}
            onPress={() => {
              if (!instantAvailable) {
                Alert.alert(
                  'Instant Disabled',
                  'Instant is only available between 08:00 AM to 06:00 PM. Please select another delivery preference',
                );
              } else {
                setdeliveryPreference12to24Hrs(false);
                setdeliveryPreference24to48Hrs(false);
                setdeliveryPreference2to4HrsInstant(true);
                time2to4();
              }
            }}
            condition={deliveryPreference2to4HrsInstant}
          />
          <ConcernLabelButton
            label={'Select Pick Up Date & Time'}
            customStyle={{
              height: 50,
              width: '90%',
              marginTop: 30,
            }}
          />

          <View
            onPress={() => {}}
            style={{
              flexDirection: 'row',
              marginTop: 20,
              borderRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginHorizontal: 5,
              borderWidth: 1,
              borderColor: 'black',
              justifyContent: 'space-between',
              width: '90%',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                if (
                  deliveryPreference12to24Hrs ||
                  deliveryPreference24to48Hrs ||
                  deliveryPreference2to4HrsInstant
                ) {
                  setIsPickDateOpen(!isPickDateOpen);
                } else {
                  Alert.alert(
                    'Please Select Delivery Preference',
                    'First Select Delivery Preference, Then Select Pick Date',
                  );
                }
                // setIsPickDateOpen(!isPickDateOpen);
              }}
              style={{
                width: 100,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: fontFamily.regular,
                  color: 'black',
                  textAlign: 'center',
                }}>
                {PickDate ? PickDate.toLocaleDateString('en-GB') : 'Pick Date'}
              </Text>
            </TouchableOpacity>
            <DatePicker
              mode="date"
              modal
              title={'Pick Time'}
              theme="light"
              open={isPickDateOpen}
              date={PickDate ? PickDate : PickMinDate}
              minimumDate={PickMinDate}
              onConfirm={date => {
                if (deliveryPreference24to48Hrs) {
                  pickDateFor24to48(date);
                } else if (deliveryPreference12to24Hrs) {
                  pickDateFor12to24(date);
                } else if (deliveryPreference2to4HrsInstant) {
                  pickDateFor2to4(date);
                }
              }}
              onCancel={() => {
                setIsPickDateOpen(false);
              }}
            />
            <TouchableOpacity
              style={{
                width: 150,
                alignItems: 'flex-end',
              }}
              onPress={() => {
                if (PickDate) {
                  openModalPickTime();
                } else {
                  Alert.alert(
                    'Please Select Pick Date',
                    'First Select Pick Date, Then Select Pick Time',
                  );
                }
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: fontFamily.regular,
                  color: 'black',
                }}>
                {PickTime ? PickTime.label : 'Pick Time'}
              </Text>
            </TouchableOpacity>
          </View>
          <ConcernLabelButton
            label={'Select Drop Date & Time'}
            customStyle={{
              height: 50,
              width: '90%',
              marginTop: 30,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              borderRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginHorizontal: 5,
              borderWidth: 1,
              borderColor: 'black',
              justifyContent: 'space-between',
              width: '90%',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: 100,
              }}
              onPress={() => {
                const Preference = Boolean(
                  deliveryPreference12to24Hrs ||
                    deliveryPreference2to4HrsInstant ||
                    deliveryPreference24to48Hrs,
                );

                if (Preference && PickDate && PickTime) {
                  setIsDropDateOpen(!isDropDateOpen);
                } else {
                  Alert.alert(
                    'Please Select Above Information',
                    'First select your delivery preference then pick date and lastly pick time ',
                  );
                }
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: fontFamily.regular,
                  color: 'black',
                  textAlign: 'center',
                }}>
                {DropDate ? DropDate.toLocaleDateString('en-GB') : 'Drop Date'}
              </Text>
            </TouchableOpacity>

            <DatePicker
              mode="date"
              modal
              t
              open={isDropDateOpen}
              title={'Drop Time'}
              theme="light"
              date={DropDate ? DropDate : DropMinDate}
              minimumDate={DropMinDate}
              onConfirm={date => {
                if (deliveryPreference24to48Hrs) {
                  dropDateFor24to48(date);
                } else if (deliveryPreference12to24Hrs) {
                  dropDateFor12to24(date);
                } else if (deliveryPreference2to4HrsInstant) {
                  dropDateFor2to4(date);
                }
              }}
              onCancel={() => {
                setIsDropDateOpen(false);
              }}
            />
            <TouchableOpacity
              style={{}}
              onPress={() => {
                const Preference = Boolean(
                  deliveryPreference12to24Hrs ||
                    deliveryPreference2to4HrsInstant ||
                    deliveryPreference24to48Hrs,
                );

                if (Preference && PickDate && PickTime && DropDate) {
                  openModalDropTime();
                } else {
                  Alert.alert(
                    'Please Select Above Information',
                    'First select your delivery preference, pick date, pick time, drop date. ',
                  );
                }
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: fontFamily.regular,
                  color: 'black',
                }}>
                {DropTime ? DropTime.label : 'Drop Time'}
              </Text>
            </TouchableOpacity>
          </View>
          <ConcernLabelButton
            label={'Submit'}
            onPress={() => {

                Submit();

            }}
            customStyle={{
              height: 50,
              width: '90%',
              marginTop: 30,
              backgroundColor: color.tertiary,
            }}
          />
        </ScrollView>

        <CustomDropdown
          label={'Pick Time'}
          noDataLine={'No Pick Time'}
          data={PickAllTimes}
          access={'label'}
          keyAccess={'id'}
          customDropdownRef={isPickTimeOpenRef}
          onPress={item => {
            setPickTime(item);
            if (deliveryPreference24to48Hrs) {
              pickTimeFor24to48(item);
            } else if (deliveryPreference12to24Hrs) {
              pickTimeFor12to24(item);
            } else if (deliveryPreference2to4HrsInstant) {
              pickTimeFor2to4(item);
            }
          }}
        />

        <CustomDropdown
          label={'Drop Time'}
          noDataLine={'No Drop Time'}
          data={DropAllTimes}
          access={'label'}
          keyAccess={'id'}
          customDropdownRef={isDropTimeOpenRef}
          onPress={item => {
            if (deliveryPreference24to48Hrs) {
              dropTimeFor24to48(item);
            } else if (deliveryPreference12to24Hrs) {
              dropTimeFor12to24(item);
            } else if (deliveryPreference2to4HrsInstant) {
              dropTimeFor2to4(item);
            }
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default Datepicker;
