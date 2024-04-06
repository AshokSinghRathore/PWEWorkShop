import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

const ItemList = ({
  label,
  value,
  onPress,
  connected,
  actionText,
  color = '#00BCD4',
  connectLoader,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>{label || 'UNKNOWN'}</Text>
        <Text>{value}</Text>
      </View>
      {connected && (
        <TouchableOpacity onPress={onPress} style={[styles.button('green')]}>
          <Text style={styles.connected}>Re-Connected</Text>
          {connectLoader && (
            <ActivityIndicator size={'small'} color={'white'} />
          )}
        </TouchableOpacity>
      )}
      {!connected && (
        <TouchableOpacity onPress={onPress} style={styles.button(color)}>
          <Text style={styles.actionText}>{actionText}</Text>
          {connectLoader && (
            <ActivityIndicator size={'small'} color={'white'} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ItemList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E7E7E7',
    marginBottom: 12,
    padding: 12,
    borderRadius: 4,
  },
  label: {fontWeight: 'bold'},
  connected: {fontWeight: 'bold', color: 'white'},
  button: color => ({
    backgroundColor: color,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  }),
  actionText: {color: 'white', width: 60, textAlign: 'center'},
});
