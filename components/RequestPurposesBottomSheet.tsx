import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import Checkbox from 'expo-checkbox';
import Colors from '../constants/Colors';
import useStore, { RequestDetialsInterface } from '../store/studentStore';
import { ScrollView } from 'react-native-gesture-handler';

type Ref = BottomSheetModal;

const RequestPurposesBottomSheet = forwardRef<Ref>((props, ref) => {
  const { requestDetails, setRequestDetails } = useStore();
  const purposesList = [
    'Board Exam',
    'Transfer to other School',
    'Ranking',
    'Employment Abroad',
    'Scholarship',
    'Local Employment',
    'Others',
  ];

  const [boardExam, setBoardExam] = useState(
    requestDetails?.purposes.length > 0 &&
      requestDetails?.purposes.includes('Board Exam')
      ? true
      : false,
  );
  const [transfer, setTransfer] = useState(
    requestDetails?.purposes.length > 0 &&
      requestDetails?.purposes.includes('Transfer to other School')
      ? true
      : false,
  );
  const [ranking, setRanking] = useState(
    requestDetails?.purposes.length > 0 &&
      requestDetails?.purposes.includes('Ranking')
      ? true
      : false,
  );
  const [employmentAbroad, setEmploymentAbroad] = useState(
    requestDetails?.purposes.length > 0 &&
      requestDetails?.purposes.includes('Employment Abroad')
      ? true
      : false,
  );
  const [forScholarship, setForScholarship] = useState(
    requestDetails?.purposes.length > 0 &&
      requestDetails?.purposes.includes('Scholarship')
      ? true
      : false,
  );
  const [localEmployment, setLocalEmployment] = useState(
    requestDetails?.purposes.length > 0 &&
      requestDetails?.purposes.includes('Local Employment')
      ? true
      : false,
  );
  const [other, setOther] = useState(
    requestDetails?.purposes.length > 0 &&
      requestDetails?.purposes.filter(
        (purpose: string) => !purposesList.includes(purpose),
      ).length > 0
      ? true
      : false,
  );
  const [otherPurposes, setOtherPurposes] = useState(
    requestDetails?.purposes
      ?.filter((purpose: string) => !purposesList.includes(purpose))
      .join(', '),
  );
  const [snapPoints, setSnapPoints] = useState(['48%']);
  const [hasError, setHasError] = useState(false);

  const { dismiss } = useBottomSheetModal();
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

  const handleSetDetails = () => {
    let purposesArray = [];

    if (boardExam) purposesArray.push('Board Exam');
    if (transfer) purposesArray.push('Transfer to other School');
    if (ranking) purposesArray.push('Ranking');
    if (employmentAbroad) purposesArray.push('Employment Abroad');
    if (forScholarship) purposesArray.push('Scholarship');
    if (localEmployment) purposesArray.push('Local Employment');
    if (other && otherPurposes.trim() !== '') purposesArray.push(otherPurposes);

    const requestTemporaryDetail: RequestDetialsInterface = {
      ...requestDetails,
      purposes: purposesArray,
    };

    if (purposesArray.length > 0) {
      setRequestDetails(requestTemporaryDetail);
      setHasError(false);
      dismiss();
    } else {
      setHasError(true);
    }
  };

  useEffect(() => {
    if (other) {
      setSnapPoints(['55%']);
    } else {
      setSnapPoints(['48%']);
    }
  }, [other]);
  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
    >
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.titleHeader}>REQUEST PURPOSES</Text>
          <Text
            style={
              hasError
                ? [styles.error, { display: 'flex' }]
                : { display: 'none' }
            }
          >
            Please select atleast 1 purpose.
          </Text>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={boardExam}
              onValueChange={setBoardExam}
              color={boardExam ? Colors.primary : undefined}
            />
            <Text
              style={styles.paragraph}
              onPress={() => setBoardExam(!boardExam)}
            >
              Board Exam
            </Text>
          </View>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={transfer}
              onValueChange={setTransfer}
              color={transfer ? Colors.primary : undefined}
            />
            <Text
              style={styles.paragraph}
              onPress={() => setTransfer(!transfer)}
            >
              Transfer to other School
            </Text>
          </View>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={ranking}
              onValueChange={setRanking}
              color={ranking ? Colors.primary : undefined}
            />
            <Text style={styles.paragraph} onPress={() => setRanking(!ranking)}>
              Ranking
            </Text>
          </View>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={employmentAbroad}
              onValueChange={setEmploymentAbroad}
              color={employmentAbroad ? Colors.primary : undefined}
            />
            <Text
              style={styles.paragraph}
              onPress={() => setEmploymentAbroad(!employmentAbroad)}
            >
              Employment Abroad
            </Text>
          </View>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={forScholarship}
              onValueChange={setForScholarship}
              color={forScholarship ? Colors.primary : undefined}
            />
            <Text
              style={styles.paragraph}
              onPress={() => setForScholarship(!forScholarship)}
            >
              For Scholarship
            </Text>
          </View>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={localEmployment}
              onValueChange={setLocalEmployment}
              color={localEmployment ? Colors.primary : undefined}
            />
            <Text
              style={styles.paragraph}
              onPress={() => setLocalEmployment(!localEmployment)}
            >
              Local Employment
            </Text>
          </View>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={other}
              onValueChange={setOther}
              color={other ? Colors.primary : undefined}
            />
            <Text style={styles.paragraph} onPress={() => setOther(!other)}>
              Others
            </Text>
          </View>

          {other && (
            <View>
              <Text style={styles.inputLabel}>
                Other Purposes <Text style={{ color: Colors.danger }}>*</Text>
              </Text>
              <View
                style={[
                  styles.inputContainer,
                  {
                    borderColor: 'transparent',
                    borderWidth: 1,
                  },
                ]}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Other Purposes"
                  value={otherPurposes}
                  onChangeText={(val) => setOtherPurposes(val)}
                />
              </View>
            </View>
          )}

          <View style={{ flex: 0, flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: Colors.primary,
                },
              ]}
              onPress={handleSetDetails}
            >
              <Text
                style={{
                  fontFamily: 'mon-sb',
                  fontSize: 16,
                  color: '#fff',
                  textAlign: 'center',
                }}
              >
                Set Details
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
        </ScrollView>
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  titleHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 18,
    fontWeight: '500',
  },
  checkbox: {
    margin: 8,
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
  error: {
    color: Colors.danger,
    alignItems: 'center',
  },
});

export default RequestPurposesBottomSheet;
