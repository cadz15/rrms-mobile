import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import GenderBottomSheet from '../../components/GenderBottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

import User from '../../types/userInterface';
import useStore from '../../store/studentStore';
import axios from 'axios';
import apiRoutes from '../../util/APIRoutes';

interface RequiredFieldType {
  first_name?: ErrorFieldType;
  last_name?: ErrorFieldType;
  sex?: ErrorFieldType;
  contact_number?: ErrorFieldType;
  email?: ErrorFieldType;
  birth_date?: ErrorFieldType;
  birth_place?: ErrorFieldType;
  address?: ErrorFieldType;
}

interface ErrorFieldType {
  name: string;
  error: string[];
  border: string;
}

const BasicInformation = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { _token, user, setUser, setSelectedGender, selectedGender } =
    useStore();

  //TODO Update information
  const [currentUser, setCurrentUser] = useState<User>(user);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentDate, setCurrentDate] = useState(
    new Date(Date.parse(currentUser?.birth_date)),
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState<RequiredFieldType | null>(null);

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

  const handleUpdate = () => {
    const updatedUser: User = {
      ...currentUser,
      birth_date: currentDate.toISOString(),
      sex: selectedGender,
    };

    if (!isLoading) {
      setIsLoading(true);

      axios
        .put(
          apiRoutes.updateUser,
          {
            ...updatedUser,
          },
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${_token}`,
            },
          },
        )
        .then((response) => {
          if (response.status === 200) {
            setCurrentUser(updatedUser);
            setUser(updatedUser);
            setIsLoading(false);
            setIsSuccess(true);
            setErrors(null);
            setIsError(false);
          }
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.status === 401) {
            let errors = error.response.data?.errors;
            let errorObject: RequiredFieldType = {};

            if ('first_name' in errors) {
              errorObject.first_name = {
                name: 'first_name',
                error: errors.first_name,
                border: Colors.danger,
              };
            }

            if ('last_name' in errors) {
              errorObject.last_name = {
                name: 'last_name',
                error: errors.last_name,
                border: Colors.danger,
              };
            }

            if ('sex' in errors) {
              errorObject.sex = {
                name: 'sex',
                error: errors.sex,
                border: Colors.danger,
              };
            }

            if ('contact_number' in errors) {
              errorObject.contact_number = {
                name: 'contact_number',
                error: errors.contact_number,
                border: Colors.danger,
              };
            }

            if ('email' in errors) {
              errorObject.email = {
                name: 'email',
                error: errors.email,
                border: Colors.danger,
              };
            }

            if ('birth_date' in errors) {
              errorObject.birth_date = {
                name: 'birth_date',
                error: errors.birth_date,
                border: Colors.danger,
              };
            }

            if ('birth_place' in errors) {
              errorObject.birth_place = {
                name: 'birth_place',
                error: errors.birth_place,
                border: Colors.danger,
              };
            }

            if ('address' in errors) {
              errorObject.address = {
                name: 'address',
                error: errors.address,
                border: Colors.danger,
              };
            }

            setErrors(errorObject);
          }
          setIsLoading(false);
          setIsSuccess(false);
          setIsError(true);
        });
    }
  };

  useEffect(() => {
    setSelectedGender(currentUser.sex);
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false);
      }, 1000);
    }
  }, [isSuccess]);

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
                value={currentUser.id_number}
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

            <View
              style={[
                styles.inputContainer,
                {
                  borderColor: errors?.first_name?.border ?? 'transparent',
                  borderWidth: 1,
                },
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="First Name"
                value={currentUser.first_name}
                onChangeText={(text) => {
                  setCurrentUser({
                    ...currentUser,
                    first_name: text,
                  });
                }}
              />
            </View>
            {errors?.first_name !== undefined ? (
              <Text style={{ color: Colors.danger }}>
                {errors.first_name.error[0]}
              </Text>
            ) : (
              ''
            )}
          </View>

          <View>
            <Text style={styles.inputLabel}>Middle Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Middle Name"
                value={currentUser.middle_name}
                onChangeText={(text) => {
                  setCurrentUser({
                    ...currentUser,
                    middle_name: text,
                  });
                }}
              />
            </View>
          </View>

          <View>
            <Text style={styles.inputLabel}>
              Last Name <Text style={{ color: Colors.danger }}>*</Text>
            </Text>
            <View
              style={[
                styles.inputContainer,
                {
                  borderColor: errors?.last_name?.border ?? 'transparent',
                  borderWidth: 1,
                },
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={currentUser.last_name}
                onChangeText={(text) => {
                  setCurrentUser({
                    ...currentUser,
                    last_name: text,
                  });
                }}
              />
            </View>
            {errors?.last_name !== undefined ? (
              <Text style={{ color: Colors.danger }}>
                {errors.last_name.error[0]}
              </Text>
            ) : (
              ''
            )}
          </View>

          <View>
            <Text style={styles.inputLabel}>Suffix</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Jr. Sr. etc."
                value={currentUser.suffix}
                onChangeText={(text) => {
                  setCurrentUser({
                    ...currentUser,
                    suffix: text,
                  });
                }}
              />
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
                  borderColor: errors?.sex?.border ?? 'transparent',
                  borderWidth: 1,
                },
              ]}
              onPress={openModal}
            >
              <Text style={styles.input}>{selectedGender?.toUpperCase()}</Text>
              <Ionicons name="chevron-down" size={20} />
            </TouchableOpacity>
            {errors?.sex !== undefined ? (
              <Text style={{ color: Colors.danger }}>
                {errors.sex.error[0]}
              </Text>
            ) : (
              ''
            )}
          </View>

          <View>
            <Text style={styles.inputLabel}>
              Contact # <Text style={{ color: Colors.danger }}>*</Text>
            </Text>
            <View
              style={[
                styles.inputContainer,
                {
                  borderColor: errors?.contact_number?.border ?? 'transparent',
                  borderWidth: 1,
                },
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Contact #"
                value={currentUser.contact_number}
                onChangeText={(text) => {
                  setCurrentUser({
                    ...currentUser,
                    contact_number: text,
                  });
                }}
              />
            </View>
            {errors?.contact_number !== undefined ? (
              <Text style={{ color: Colors.danger }}>
                {errors.contact_number.error[0]}
              </Text>
            ) : (
              ''
            )}
          </View>

          <View>
            <Text style={styles.inputLabel}>
              E-mail <Text style={{ color: Colors.danger }}>*</Text>
            </Text>
            <View
              style={[
                styles.inputContainer,
                {
                  borderColor: errors?.email?.border ?? 'transparent',
                  borderWidth: 1,
                },
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={currentUser.email}
                onChangeText={(text) => {
                  setCurrentUser({
                    ...currentUser,
                    email: text,
                  });
                }}
              />
            </View>
            {errors?.email !== undefined ? (
              <Text style={{ color: Colors.danger }}>
                {errors.email.error[0]}
              </Text>
            ) : (
              ''
            )}
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
                  borderColor: errors?.birth_date?.border ?? 'transparent',
                  borderWidth: 1,
                },
              ]}
              onPressIn={() => setShowDatePicker(true)}
            >
              <Text style={styles.input}>{currentDate.toDateString()}</Text>
            </TouchableOpacity>
            {errors?.birth_date !== undefined ? (
              <Text style={{ color: Colors.danger }}>
                {errors.birth_date.error[0]}
              </Text>
            ) : (
              ''
            )}
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
            <View
              style={[
                styles.inputContainer,
                {
                  borderColor: errors?.birth_place?.border ?? 'transparent',
                  borderWidth: 1,
                },
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Birth Place"
                value={currentUser.birth_place}
                onChangeText={(text) => {
                  setCurrentUser({
                    ...currentUser,
                    birth_place: text,
                  });
                }}
              />
            </View>
            {errors?.birth_place !== undefined ? (
              <Text style={{ color: Colors.danger }}>
                {errors.birth_place.error[0]}
              </Text>
            ) : (
              ''
            )}
          </View>

          <View>
            <Text style={styles.inputLabel}>
              Address <Text style={{ color: Colors.danger }}>*</Text>
            </Text>
            <View
              style={[
                styles.inputContainer,
                {
                  borderColor: errors?.address?.border ?? 'transparent',
                  borderWidth: 1,
                },
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={currentUser.address}
                onChangeText={(text) => {
                  setCurrentUser({
                    ...currentUser,
                    address: text,
                  });
                }}
              />
            </View>
            {errors?.address !== undefined ? (
              <Text style={{ color: Colors.danger }}>
                {errors.address.error[0]}
              </Text>
            ) : (
              ''
            )}
          </View>

          {isSuccess ? (
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: Colors.success,
                  justifyContent: 'center',
                  flexDirection: 'row',
                },
              ]}
              onPress={handleUpdate}
            >
              <Ionicons
                name="checkmark"
                style={{ fontFamily: 'mon-sb', fontSize: 16, color: '#fff' }}
              />
              <Text
                style={{ fontFamily: 'mon-sb', fontSize: 16, color: '#fff' }}
              >
                {' '}
                Successfully updated!{' '}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
              {isLoading ? (
                <ActivityIndicator size="small" />
              ) : (
                <Text style={styles.buttonText}>Update</Text>
              )}
            </TouchableOpacity>
          )}
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
