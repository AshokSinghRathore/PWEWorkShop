import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {Modalize} from 'react-native-modalize';
import Icon from 'react-native-vector-icons/Feather';

const CustomDropdown = ({
  data,
  onPress,
  onEndReached,
  paginationCondition,
  access,
  customDropdownRef,
  label,
  anotherAccess,
  keyAccess,
  noDataLine,
  noCenter,
}) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const HeaderComponent = () => (
    <View style={ModalStyle.modalHeader}>
      <CustomText
        customStyle={{marginTop: 0, padding: 0, color: 'black', fontSize: 18}}>
        {label}
      </CustomText>
      <TouchableOpacity
        onPress={() => {
          customDropdownRef.current?.close();
        }}>
        <Icon name="x" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
  return (
    <Modalize
      ref={customDropdownRef}
      HeaderComponent={HeaderComponent}
      avoidKeyboardLikeIOS={true}
      keyboardAvoidingBehavior={Platform.OS == 'ios' ? undefined : 'height'}
      modalHeight={400}
      handlePosition="inside"
      modalStyle={ModalStyle.modal}>
      <View style={ModalStyle.modalContent}>
        {data.length > 0 && (
          <FlatList
            data={data}
            keyExtractor={
              keyAccess ? item => item[keyAccess] : item => item.key
            }
            onEndReachedThreshold={0.5}
            contentContainerStyle={[
              !noCenter && {
                alignItems: 'center',
              },
            ]}
            onEndReached={async () => {
              if (paginationCondition && !loadingMore) {
                setLoadingMore(true);
                await onEndReached();
                setLoadingMore(false);
              }
            }}
            ListFooterComponent={() =>
              loadingMore ? (
                <ActivityIndicator
                  color="black"
                  style={{width: '100%', height: 50, alignSelf: 'center'}}
                  size={50}
                />
              ) : null
            }
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    onPress(item);
                    customDropdownRef.current?.close();
                  }}
                  style={{
                    paddingVertical: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <CustomText
                    customStyle={{
                      marginTop: 0,
                      padding: 0,
                      color: 'black',
                      fontSize: 18,
                    }}>
                    {item[access]}
                  </CustomText>
                  {anotherAccess && (
                    <CustomText
                      customStyle={{
                        marginTop: 0,
                        padding: 0,
                        color: 'green',
                        fontSize: 18,
                      }}>
                      {item[anotherAccess]}
                    </CustomText>
                  )}
                </TouchableOpacity>
              );
            }}
          />
        )}
        {data.length == 0 && (
          <CustomText customStyle={{color: 'red', fontSize: 18}}>
            {noDataLine}
          </CustomText>
        )}
      </View>
    </Modalize>
  );
};

export default CustomDropdown;

function CustomText({customStyle, children}) {
  return (
    <Text
      style={[
        {color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14},
        customStyle,
      ]}>
      {children}
    </Text>
  );
}

export const ModalStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modal: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
  },
  listItem: {
    fontSize: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});
