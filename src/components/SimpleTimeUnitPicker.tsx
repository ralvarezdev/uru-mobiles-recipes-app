import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { theme } from '@/styles/Theme';

interface SimpleTimeUnitPickerProps {
  selectedValue: 'seconds' | 'minutes' | 'hours';
  onValueChange: (value: 'seconds' | 'minutes' | 'hours') => void;
}

export default function SimpleTimeUnitPicker({
  selectedValue,
  onValueChange,
}: SimpleTimeUnitPickerProps) {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
      >
        <Picker.Item label="seconds" value="seconds" />
        <Picker.Item label="minutes" value="minutes" />
        <Picker.Item label="hours" value="hours" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    borderRadius: 8,
    backgroundColor: '#fff',
    flex: 1,
  },
  picker: {
    height: 50,
  },
});