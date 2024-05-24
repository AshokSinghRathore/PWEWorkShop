import { Pressable, StyleSheet} from 'react-native';
import React from 'react';
import CustomText from './CustomText';

const ConcernLabelButton = ({label, onPress,customStyle,labelStyle}) => {
  return (
    <Pressable onPress={onPress} style={[ConcernLabelButtonStyle.container,customStyle]}>
      <CustomText customStyle={[{padding: 0, marginTop: 0, fontSize: 18},labelStyle]}>
        {label}
      </CustomText>
    </Pressable>
  );
};

export default ConcernLabelButton;

const ConcernLabelButtonStyle = StyleSheet.create({
  container: {
    width: '80%',
    backgroundColor: "#B68460",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginTop: 20,
    borderRadius: 10,
    borderWidth:1,
  },
});
