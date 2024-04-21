import { View, Text, KeyboardAvoidingView } from 'react-native';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { RadioGroup, XStack } from 'tamagui';
import RadioGroupItemWithLabel from './RadioGroupItemWithLabel';
import { YStack } from 'tamagui';
import { TextInput } from 'react-native';
import RequestPurposesBottomSheet from './RequestPurposesBottomSheet';
import useStore, { RequestDetialsInterface } from '../store/studentStore';
import { router } from 'expo-router';

type Ref = BottomSheetModal;

interface RequiredCourierFieldInterface {
  address?: ErrorFieldInterface;
  city?: ErrorFieldInterface;
  province?: ErrorFieldInterface;
  country?: ErrorFieldInterface;
  postal?: ErrorFieldInterface;
}

interface ErrorFieldInterface {
  name: string;
  error: string[];
  border: string;
}

const CreateRequestBottomSheet = forwardRef<Ref>((props, ref) => {
  const { requestDetails, setRequestDetails } = useStore();

  const { dismiss } = useBottomSheetModal();
  const [snapPoints, setSnapPoints] = useState(['40%']);
  const [deliveryMethod, setDeliveryMethod] = useState('pick-up');
  const [mailTo, setMailTo] = useState('local');
  const [errors, setErrors] = useState<RequiredCourierFieldInterface | null>(
    null,
  );

  // courier data
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [country, setCountry] = useState('');
  const [postal, setPostal] = useState('');

  // purposes bottom sheet
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openModal = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const handleCancel = () => {
    setDeliveryMethod('pick-up');
    setAddress('');
    setCity('');
    setProvince('');
    setCountry('');
    setPostal('');
    setMailTo('local');
  };

  const handleCreateRequest = () => {
    let errorObject: RequiredCourierFieldInterface = {};

    if (deliveryMethod === 'courier') {
      if (address.trim() === '') {
        errorObject.address = {
          name: 'address',
          error: [''],
          border: Colors.danger,
        };
      }
      if (city.trim() === '') {
        errorObject.city = {
          name: 'city',
          error: [''],
          border: Colors.danger,
        };
      }
      if (province.trim() === '') {
        errorObject.province = {
          name: 'province',
          error: [''],
          border: Colors.danger,
        };
      }
      if (country.trim() === '') {
        errorObject.country = {
          name: 'country',
          error: [''],
          border: Colors.danger,
        };
      }
      if (postal.trim() === '') {
        errorObject.postal = {
          name: 'postal',
          error: [''],
          border: Colors.danger,
        };
      }
    }

    setErrors(errorObject);

    if (Object.keys(errorObject).length === 0) {
      const requestTemporaryDetails: RequestDetialsInterface = {
        ...requestDetails,
        deliveryMethod,
        address,
        city,
        province,
        country,
        postal,
        mailTo,
      };

      setRequestDetails(requestTemporaryDetails);
      dismiss();
      router.push('/request/createRequest');
    }
  };

  useEffect(() => {
    if (deliveryMethod === 'courier') {
      setSnapPoints(['90%']);
    } else {
      setSnapPoints(['40%']);
    }
  }, [deliveryMethod]);

  return (
    <KeyboardAvoidingView>
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        onDismiss={handleCancel}
      >
        <RequestPurposesBottomSheet ref={bottomSheetRef} />
        <View style={styles.container}>
          <View style={styles.card}>
            <View>
              <Text style={styles.inputLabel}>Purposes</Text>
              <TouchableOpacity
                style={[
                  styles.inputContainer,
                  {
                    paddingVertical: 5,
                    alignItems: 'center',
                    borderColor: 'transparent',
                    borderWidth: 1,
                  },
                ]}
                onPress={openModal}
              >
                <Text style={styles.input}>
                  {requestDetails?.purposes.join(', ') ?? 'Purposes'}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.inputLabel}>Delivery Method</Text>
              <RadioGroup
                value={deliveryMethod}
                onValueChange={(value) => {
                  setDeliveryMethod(value);
                }}
              >
                <YStack space="$2">
                  <RadioGroupItemWithLabel
                    value="pick-up"
                    label="Pick-up"
                    size="$5"
                  />
                  <RadioGroupItemWithLabel
                    value="courier"
                    label="Courier"
                    size="$5"
                  />
                </YStack>
              </RadioGroup>
            </View>
          </View>
          {deliveryMethod === 'courier' && (
            <>
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderStyle: 'dashed',
                  marginBottom: 10,
                }}
              />
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.inputLabel}>Mail To</Text>
                <RadioGroup
                  value={mailTo}
                  onValueChange={(value) => {
                    setMailTo(value);
                  }}
                >
                  <YStack space="$2">
                    <RadioGroupItemWithLabel
                      value="local"
                      label="Local (+300)"
                      size="$2"
                    />
                    <RadioGroupItemWithLabel
                      value="international"
                      label="International (+1000)"
                      size="$2"
                    />
                  </YStack>
                </RadioGroup>
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
                    value={address}
                    onChangeText={(val) => setAddress(val)}
                  />
                </View>
              </View>

              <View>
                <Text style={styles.inputLabel}>
                  City <Text style={{ color: Colors.danger }}>*</Text>
                </Text>
                <View
                  style={[
                    styles.inputContainer,
                    {
                      borderColor: errors?.city?.border ?? 'transparent',
                      borderWidth: 1,
                    },
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="City"
                    value={city}
                    onChangeText={(val) => setCity(val)}
                  />
                </View>
              </View>

              <View>
                <Text style={styles.inputLabel}>
                  Province <Text style={{ color: Colors.danger }}>*</Text>
                </Text>
                <View
                  style={[
                    styles.inputContainer,
                    {
                      borderColor: errors?.province?.border ?? 'transparent',
                      borderWidth: 1,
                    },
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Province"
                    value={province}
                    onChangeText={(val) => setProvince(val)}
                  />
                </View>
              </View>

              <View>
                <Text style={styles.inputLabel}>
                  Country <Text style={{ color: Colors.danger }}>*</Text>
                </Text>
                <View
                  style={[
                    styles.inputContainer,
                    {
                      borderColor: errors?.country?.border ?? 'transparent',
                      borderWidth: 1,
                    },
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Country"
                    value={country}
                    onChangeText={(val) => setCountry(val)}
                  />
                </View>
              </View>

              <View>
                <Text style={styles.inputLabel}>
                  Postal Code <Text style={{ color: Colors.danger }}>*</Text>
                </Text>
                <View
                  style={[
                    styles.inputContainer,
                    {
                      borderColor: errors?.postal?.border ?? 'transparent',
                      borderWidth: 1,
                    },
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Postal Code"
                    value={postal}
                    onChangeText={(val) => setPostal(val)}
                  />
                </View>
              </View>
            </>
          )}

          <View style={{ flex: 0, flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: Colors.primary,
                },
              ]}
              onPress={handleCreateRequest}
            >
              <Text
                style={{
                  fontFamily: 'mon-sb',
                  fontSize: 16,
                  color: '#fff',
                  textAlign: 'center',
                }}
              >
                Create Request
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: Colors.secondary,
                },
              ]}
              onPress={() => dismiss()}
            >
              <Text
                style={{
                  fontFamily: 'mon-sb',
                  fontSize: 16,
                  color: '#fff',
                  textAlign: 'center',
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetModal>
    </KeyboardAvoidingView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  card: {
    rowGap: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    columnGap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    color: '#fff',
    alignSelf: 'center',
    marginTop: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    paddingHorizontal: 14,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'mon-sb',
    marginBottom: 5,
  },
  input: {
    flex: 1,
    color: '#333',
    paddingVertical: 10,
    paddingRight: 10,
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
});

export default CreateRequestBottomSheet;
