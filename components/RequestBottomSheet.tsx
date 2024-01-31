import { View, Text, TouchableOpacity } from 'react-native';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import SelectComponent from './SelectComponent';
import { TextInput } from 'react-native-gesture-handler';
import useStore from '../store/studentStore';
import Education from '../types/educationInterface';

type Ref = BottomSheetModal;

const RequestBottomSheet = forwardRef<Ref>((props: any, ref) => {
  const [selectedDegree, setSelectedDegree] = useState(1);
  const [selectedItem, setSelectedItem] = useState(0);
  const [requestForError, setRequestForError] = useState(false);
  const [requestItemError, setRequestItemError] = useState(false);
  const [requestQuantityError, setrequestQuantityError] = useState(false);
  const [quantiy, setQuantity] = useState('0');
  const snapPoints = useMemo(() => ['45%', '70%'], []);
  const { dismiss } = useBottomSheetModal();

  const { educations, requestableItems } = useStore();

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

  const handleAdd = () => {
    setRequestForError(false);
    setRequestItemError(false);
    setrequestQuantityError(false);

    if (selectedItem === 0 || selectedDegree === 0 || quantiy === '0') {
      if (selectedDegree === 0) setRequestForError(true);
      if (selectedItem === 0) setRequestItemError(true);
      if (quantiy === '0') setrequestQuantityError(true);
    } else {
      let foundDegree = degrees?.find(
        (degree: any) => degree.id === selectedDegree,
      );
      let foundItem = requestableItems?.find(
        (item: any) => item.id === selectedItem,
      );

      props?.onAdd({
        degreeId: selectedDegree,
        degreeName: foundDegree?.name ?? '',
        itemId: selectedItem,
        itemName: foundItem?.name ?? '',
        quantity: quantiy,
      });
      dismiss();
    }
  };

  const degrees: { name: string; id: number; group?: string }[] =
    educations?.map((education: Education) => {
      return {
        name: education.degree,
        id: education.id,
        group: education.educationLevel,
      };
    });

  const documents = [
    { name: 'Transcript of Record', id: 1, group: 'Secondary' },
  ];

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
    >
      <View style={styles.container}>
        <Text style={styles.modalTitle}>Request Item/Document</Text>
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.labelText}>Request for</Text>

          <View>
            <SelectComponent
              value={selectedDegree}
              data={degrees}
              onChange={(value: number) => {
                setSelectedDegree(value);
              }}
              title="Education Levels"
              grouped={true}
              style={{
                fontFamily: 'mon',
                borderColor: requestForError
                  ? Colors.danger
                  : Colors.inputBackground,
              }}
              key="Education Levels"
            />
          </View>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.labelText}>Request Item/Document</Text>

          <View>
            <SelectComponent
              value={selectedItem}
              data={requestableItems}
              onChange={(value: number) => {
                setSelectedItem(value);
              }}
              title="Item/Document"
              style={{
                fontFamily: 'mon',
                borderColor: requestItemError
                  ? Colors.danger
                  : Colors.inputBackground,
              }}
              key="Item/Document"
            />
          </View>
        </View>

        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.labelText}>Quantity/Copies</Text>

          <View
            style={[
              styles.inputContainer,
              {
                borderColor: requestQuantityError
                  ? Colors.danger
                  : Colors.inputBackground,
                borderWidth: 1,
              },
            ]}
          >
            <TextInput
              value={quantiy}
              onChangeText={(text) => setQuantity(text.replace(/[^0-9]/g, ''))}
              keyboardType="number-pad"
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: Colors.primary,
              },
            ]}
            onPress={handleAdd}
          >
            <Text
              style={{
                fontFamily: 'mon-sb',
                fontSize: 16,
                color: '#fff',
                textAlign: 'center',
              }}
            >
              Add
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
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'column',
    rowGap: 10,
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'mon-sb',
    color: Colors.secondaryLight,
  },
  labelText: {
    fontFamily: 'mon-sb',
    fontSize: 16,
    color: Colors.secondaryLight,
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
  buttonContainer: {
    flexDirection: 'row',
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
});

export default RequestBottomSheet;
