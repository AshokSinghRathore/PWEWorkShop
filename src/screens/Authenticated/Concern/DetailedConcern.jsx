import { View, Text, SafeAreaView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../Orders/DryClean/DetailedDryCleanOrder';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../../../components/UI/CustomButton';
import firestore from '@react-native-firebase/firestore';
import { updateConcern } from '../../../feature/all-feature/feature-concern';
import { ConcernStatus } from '../../../constants/constant';
import AlertPromptModal from '../../../components/UI/AlertPrompt';
const DetailedConcern = ({ navigation, route }) => {
  const Data = useSelector(state =>
    state.ConcernSlice.data.find(item => item.id === route.params),
  );
  const Dispatch = useDispatch()
  const [showPrompt, setShowPrompt] = useState(false)
  const [loaders, setLoaders] = useState({
    markLoader: false,
    screenLoader: false,
    confirmLoader: false
  });

  async function changeStatus(status) {
    try {
      const resp = firestore().collection("Issue").doc(Data.id);
      await resp.update({
        status: status
      })
      const data = await resp.get();
      Dispatch(updateConcern(data));
    } catch (error) {
      console.log(error)
      ToastAndroid.show("Something Went Wrong", ToastAndroid.SHORT)
    }
  }

  async function sendReply(msg) {
    try {

      const resp = firestore().collection("Issue").doc(Data.id);
      await resp.update({
        adminReply: msg,
        status: ConcernStatus[2]
      })
      const data = await resp.get();
      Dispatch(updateConcern(data));
    } catch (error) {
      console.log(error)
      ToastAndroid.show("Something Went Wrong", ToastAndroid.SHORT)
    }
    finally {
      setShowPrompt(false)
    }
  }

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.heading}>Concern Details</Text>

      </SafeAreaView>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <>
          <Text style={styles.detailText}>
            Current Status :{' '}
            <Text style={styles.valueText}>{Data?.data()?.status == ConcernStatus[1] ? "Request Received" : Data?.data()?.status == ConcernStatus[2] ? "Customer Replied Received" : Data?.data()?.status == ConcernStatus[3] ? "Issue Resolved" : "Request Received"}</Text>
          </Text>
          <Text style={styles.detailText}>
            Customer Name:{' '}
            <Text style={styles.valueText}>{Data?.data().name}</Text>
          </Text>
          <Text style={styles.detailText}>
            Customer Contact:{' '}
            <Text style={styles.valueText}>{Data?.data().contact}</Text>
          </Text>
          <Text style={styles.detailText}>
            Issue:{' '}
            <Text style={styles.valueText}>{Data?.data().Issue}</Text>
          </Text>
          {Data?.data().adminReply && <Text style={styles.detailText}>
            Your Replied :{' '}
            <Text style={styles.valueText}>{Data?.data().adminReply}</Text>
          </Text>}
          {Data?.data().status != ConcernStatus[3] && <CustomButton
            showLoader={loaders.markLoader}
            label={"Mark As Resolved"} onPress={async () => {
              if (loaders.markLoader || loaders.screenLoader) {
                return
              }
              setLoaders({ ...loaders, markLoader: true })
              await changeStatus(ConcernStatus[3])
              setLoaders({ ...loaders, markLoader: false })
            }} />}
          {Data?.data().status != ConcernStatus[3] && <CustomButton
            showLoader={loaders.confirmLoader}
            label={"Reply Customer"} onPress={async () => {
              if (loaders.markLoader || loaders.screenLoader) {
                return
              }
              setShowPrompt(true)
            }} />}
        </>
      </KeyboardAwareScrollView>
      <AlertPromptModal confirmLoader={loaders.confirmLoader} placeholder={"Reply..."} title={"Enter Reply..."} visible={showPrompt} onSubmit={async (r) => {
        // console.log(r)
        if (r?.length < 1) {
          ToastAndroid.show("Please Enter Reply", ToastAndroid.SHORT)
          return
        }
        setLoaders({ ...loaders, confirmLoader: true })
        await sendReply(r)
        setLoaders({ ...loaders, confirmLoader: false })
      }} onClose={() => setShowPrompt(false)} />
    </>
  )
}

export default DetailedConcern