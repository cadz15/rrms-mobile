import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { Label, RadioGroup, SizeTokens, XStack, YStack } from 'tamagui';
import Colors from '../constants/Colors';
import { useStore } from '../store/studentStore';

type Ref = BottomSheetModal;

type RadioGroupProps = {
  size: SizeTokens;
  value: string;
  label: string;
};

const GenderBottomSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ['35%'], []);
  const { dismiss } = useBottomSheetModal();

  const { selectedGender, setSelectedGender } = useStore((state: any) => state);

  const [gender, setGender] = useState(selectedGender);

  const handleChangeGender = () => {
    setSelectedGender(gender);
    dismiss();
  };

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
  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
    >
      <View style={styles.container}>
        <Text style={{ fontFamily: 'mon', fontSize: 20, marginBottom: 10 }}>
          Please select gender
        </Text>

        <RadioGroup
          value={gender}
          onValueChange={(value) => {
            setGender(value);
          }}
        >
          <YStack space="$2">
            <RadioGroupItemWithLabel value="male" label="Male" size="$5" />
            <RadioGroupItemWithLabel value="female" label="Female" size="$5" />
          </YStack>
        </RadioGroup>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: Colors.primary,
              },
            ]}
            onPress={handleChangeGender}
          >
            <Text
              style={{
                fontFamily: 'mon-sb',
                fontSize: 16,
                color: '#fff',
                textAlign: 'center',
              }}
            >
              Select
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

const RadioGroupItemWithLabel = (props: RadioGroupProps) => {
  const id = `radiogroup-${props.value}`;
  return (
    <XStack
      width={300}
      alignItems="center"
      space="$4"
      style={{ marginHorizontal: 10 }}
    >
      <RadioGroup.Item
        value={props.value}
        id={id}
        size={props.size}
        style={{
          fontFamily: 'mon',
          fontSize: 16,
          backgroundColor: '#fff',
        }}
      >
        <RadioGroup.Indicator
          style={{ backgroundColor: Colors.primary, width: 10, height: 10 }}
        />
      </RadioGroup.Item>

      <Label
        htmlFor={id}
        size={props.size}
        style={{ fontFamily: 'mon', fontSize: 20, color: Colors.secondary }}
      >
        <Text style={{ fontFamily: 'mon', fontSize: 20 }}>{props.label}</Text>
      </Label>
    </XStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
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
});

export default GenderBottomSheet;
