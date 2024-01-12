import {
    SafeAreaView,
    TextInput,
    Text,
    TouchableOpacity,
    StyleSheet,
  } from 'react-native';
  import React, { useContext, useState } from 'react';
  import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
  import {View} from 'react-native-animatable';

  const EditProfile = ({navigation}) => {
    const [Name,setName] = useState("Hiccup Haddock");
    const [Email,setEmail] = useState("nightfury@gmail.com");
    const [PinCode,setPinCode] = useState("120003");
    const [House,setHouse]=useState("12/22 Berk, South City");
    const [Area,setArea]=useState("Sector 5");
    const [City,setCity]=useState("Gurgaon, India");
    const [State,setState]=useState("Haryana");

    async function onSubmit(){
      navigation.goBack()
    }
    return (
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{flex: 1, backgroundColor: 'white'}} >
        <SafeAreaView style={{marginHorizontal: 10, marginTop: 20}}>
          <Text style={StyleForInputs.HeaderText}>Edit Profile</Text>
  
          <View style={StyleForInputs.hr}></View>
          <View style={StyleForInputs.TextInputContainer}>
            <Text style={StyleForInputs.InputTextHeader}>Name</Text>
            <TextInput placeholder="Name" placeholderTextColor={"#414a4c"}  value={Name} onChangeText={(e)=>setName(e)} style={StyleForInputs.Inputstyle} />
            <Text style={StyleForInputs.InputTextHeader}>Email</Text>
            <TextInput placeholder="Email" placeholderTextColor={"#414a4c"}  value={Email} onChangeText={(e)=>setEmail(e)} style={StyleForInputs.Inputstyle} />
            <Text style={StyleForInputs.InputTextHeader}>House No or Near by</Text>
            <TextInput placeholder="House No or Near by" placeholderTextColor={"#414a4c"}  value={House} onChangeText={(e)=>setHouse(e)} style={StyleForInputs.Inputstyle} />
            <Text style={StyleForInputs.InputTextHeader}>Area</Text>
            <TextInput placeholder="Area" placeholderTextColor={"#414a4c"}  value={Area} onChangeText={(e)=>setArea(e)} style={StyleForInputs.Inputstyle} />
            <Text style={StyleForInputs.InputTextHeader}>PinCode</Text>
            <TextInput placeholder="PinCode" keyboardType='number-pad' placeholderTextColor={"#414a4c"}  value={PinCode} onChangeText={(e)=>setPinCode(e)} style={StyleForInputs.Inputstyle} />
            <Text style={StyleForInputs.InputTextHeader}>City</Text>
            <TextInput placeholder="City" keyboardType='number-pad' placeholderTextColor={"#414a4c"}  value={City} onChangeText={(e)=>setCity(e)} style={StyleForInputs.Inputstyle} />
            <Text style={StyleForInputs.InputTextHeader}>State</Text>
            <TextInput placeholder="State" keyboardType='number-pad' placeholderTextColor={"#414a4c"}  value={State} onChangeText={(e)=>setState(e)} style={StyleForInputs.Inputstyle} />
          </View>
  
        </SafeAreaView>
        <TouchableOpacity onPress={onSubmit} style={StyleForInputs.SumbitButtonStyle}>
          <Text style={StyleForInputs.SumbitButtonTextStyle}>Change</Text>
        </TouchableOpacity>
        <Text style={{fontSize:24,color:"white"}}>space</Text>
      </KeyboardAwareScrollView>
    );
  };
  
  export default EditProfile;
  
  export const StyleForInputs = StyleSheet.create({
    HeaderText: {fontSize: 20, color: 'black', fontFamily: 'Poppins-SemiBold'},
    TextInputContainer: {
      marginTop: 30,
    },
    InputTextHeader: {
      fontSize: 16,
      color: 'grey',
      fontFamily: 'Poppins-SemiBold',
    },
    Inputstyle: {
      marginTop: 10,
      width: '100%',
      padding: 10,
      backgroundColor: '#e8f7ee',
      borderRadius:10,
      fontSize:18,
      color:"black",
      marginBottom:20
    },
    SumbitButtonStyle:{
      width:"90%",
      backgroundColor:"black",
      padding:10,
      alignSelf:"center",
      marginBottom:10,
      borderRadius:10
    },
    SumbitButtonTextStyle:{
      fontFamily:"Poppins-SemiBold",
      color:"white",
      fontSize:18,
      textAlign:"center"
    },
    hr:{width:"100%",height:1,backgroundColor:"black"}
  
  });
  