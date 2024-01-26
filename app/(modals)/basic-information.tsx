import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import GenderBottomSheet from '../../components/GenderBottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

import { useStore, StoreTypes } from '../../store/studentStore';

const BasicInformation = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentDate, setCurrentDate] = useState(
    new Date(Date.parse('2023-01-01')),
  );

  const openModal = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const changeDate = (event: DateTimePickerEvent, selectedDate: any) => {
    const changedDate: Date = selectedDate || currentDate;
    if (event.type === 'set') {
      setCurrentDate(changedDate);
    }
    setShowDatePicker(false);
  };

  const selectedGender = useStore((state: any) => state.selectedGender);

  return (
    <View style={styles.container}>
      <ScrollView>
        <GenderBottomSheet ref={bottomSheetRef} />
        <View style={styles.card}>
          <View>
            <Text style={styles.inputLabel}>
              Student # <Text style={{ color: Colors.danger }}>*</Text>
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Student #"
                editable={false}
              />
            </View>
          </View>
        </View>

        <View style={[styles.card, { marginBottom: 20 }]}>
          <View>
            <Text style={styles.inputLabel}>
              First Name <Text style={{ color: Colors.danger }}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="First Name" />
            </View>
          </View>

          <View>
            <Text style={styles.inputLabel}>Middle Name</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="Middle Name" />
            </View>
          </View>

          <View>
            <Text style={styles.inputLabel}>
              Last Name <Text style={{ color: Colors.danger }}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="Last Name" />
            </View>
          </View>

          <View>
            <Text style={styles.inputLabel}>Suffix</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="Jr. Sr. etc." />
            </View>
          </View>

          <View>
            <Text style={styles.inputLabel}>Sex</Text>
            <TouchableOpacity
              style={[
                styles.inputContainer,
                {
                  paddingVertical: 5,
                  alignItems: 'center',
                },
              ]}
              onPress={openModal}
            >
              <Text style={styles.input}>{selectedGender?.toUpperCase()}</Text>
              <Ionicons name="chevron-down" size={20} />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.inputLabel}>
              Contact # <Text style={{ color: Colors.danger }}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="Contact #" />
            </View>
          </View>

          <View>
            <Text style={styles.inputLabel}>
              E-mail <Text style={{ color: Colors.danger }}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="E-mail" />
            </View>
          </View>

          <View>
            <Text style={styles.inputLabel}>
              Birth Date <Text style={{ color: Colors.danger }}>*</Text>
            </Text>
            <TouchableOpacity
              style={[
                styles.inputContainer,
                {
                  paddingVertical: 5,
                  alignItems: 'center',
                },
              ]}
              onPressIn={() => setShowDatePicker(true)}
            >
              <Text style={styles.input}>{currentDate.toDateString()}</Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={currentDate}
              mode="date"
              onChange={changeDate}
            ></DateTimePicker>
          )}

          <View>
            <Text style={styles.inputLabel}>
              Birth Place <Text style={{ color: Colors.danger }}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="Birth Place" />
            </View>
          </View>

          <View>
            <Text style={styles.inputLabel}>
              Address <Text style={{ color: Colors.danger }}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="Address" />
            </View>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
    rowGap: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'mon-sb',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    color: '#333',
    paddingVertical: 10,
    paddingRight: 10,
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
  button: {
    width: '100%',
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    color: '#fff',
    alignSelf: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'mon-sb',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default BasicInformation;
