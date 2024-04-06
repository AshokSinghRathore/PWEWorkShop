import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppColors } from '../../../constants/color';
import { checkAndGetPermission } from '../Dashboard';
import LoadingOverlay from '../../../components/UI/LoadingOverlay';
import { useDispatch, useSelector } from 'react-redux';
import OurAds from '../../../components/ADS/OurAds';
import AddForm from '../../../components/ADS/AddForm';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { updateServicePinCode } from '../../../feature/all-feature/feature-servicepincode';

const Ads = ({ navigation }) => {
  const [screenLoader, setScreenLoader] = useState(false);
  const ServicePinCode = useSelector(state => state.ServicePinCode);
  const [selectedPinCode, setSelectedPinCode] = useState({});
  const [addModal, setAddModal] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState("");
  const Dispatch = useDispatch();

  async function get() {
    setScreenLoader(true);
    await checkAndGetPermission()
    setScreenLoader(false);
  }
  useEffect(() => {
    get()
  }, []);

  async function onRemove(e) {
    setDeleteLoader(e.pathRef)
    try {

      await storage().refFromURL(e.adUrl).delete()
      await firestore().doc(e.pathRef).update({
        adUrl: "",
        websiteUrl: ""
      })
      Dispatch(updateServicePinCode({
        ...e,
        adUrl: "",
        websiteUrl: ""
      }))
    } catch (error) {
     if (error?.code=="storage/object-not-found"){
      await firestore().doc(e.pathRef).update({
        adUrl: "",
        websiteUrl: ""
      })
      Dispatch(updateServicePinCode({
        ...e,
        adUrl: "",
        websiteUrl: ""
      }))
     }
     else{

       Alert.alert("Something went Wrong", "Please Try Again Later");
     }
    }
    setDeleteLoader("")
  }


  return (
    <SafeAreaView style={styles.safeArea}>
      {screenLoader ? <LoadingOverlay /> : <FlatList
        contentContainerStyle={styles.container}
        data={[1]}
        renderItem={() => {
          return (
            <View>
              <Text style={styles.heading}>Ads Manager</Text>
              <FlatList
                ListHeaderComponent={() => <Text style={[styles.heading, { marginTop: 10, fontSize: 17, borderBottomWidth: 1, borderBottomColor: "#ccc", color: "white" }]}>Running ADS</Text>}
                data={ServicePinCode.servicePinCodeArray.filter((e) => e.adUrl)}
                renderItem={({ item }) => {
                  return <OurAds
                    data={item}
                    isDeleting={deleteLoader}
                    isRunning
                    onDelete={(e) => onRemove(e)}
                    onAdd={() => {
                      setSelectedPinCode(item)
                      setAddModal(true)
                    }}
                  />
                }}
              />
              <FlatList
                ListHeaderComponent={() => <Text style={[styles.heading, { marginTop: 10, fontSize: 17, borderBottomWidth: 1, borderBottomColor: "#ccc", color: "white" }]}>Create ADS</Text>}
                data={ServicePinCode.servicePinCodeArray.filter((e) => !e.adUrl)}
                renderItem={({ item }) => {

                  return <OurAds
                    data={item}
                    onAdd={() => {
                      setSelectedPinCode(item)
                      setAddModal(true)
                    }}
                  />
                }}
              />
            </View>
          );
        }}
      />}
      <AddForm
        closeModal={() => setAddModal(false)}
        isVisible={addModal}
        data={selectedPinCode}
      />
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
    marginVertical: 10,
    paddingBottom: 40
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  heading: {
    fontSize: 24,
    color: "black",
    fontFamily: 'Poppins-Bold',
  },
  addButton: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 5,
    elevation: 5,
  }, floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 5,
    elevation: 5,

  }
});

export default Ads;
