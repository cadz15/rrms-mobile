import { View, Text, BackHandler, StyleSheet } from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SelectOptionBottomSheet from './SelectOptionBottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

interface DataInterface {
  name: string;
  id: number;
  group?: string;
}

interface PropTypes {
  value: number;
  style?: any;
  data: DataInterface[];
  title: string;
  grouped?: boolean;
  onChange: any;
}

const SelectComponent = (props: PropTypes) => {
  const [val, setVal] = useState(props.value ?? null);
  const [selectedOption, setSelectedOption] = useState('');
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    const backAction = () => {
      bottomSheetRef.current?.dismiss();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const openModal = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  useEffect(() => {
    if (val === 0) {
      return;
    }

    let found = props?.data?.find((item: any) => item.id === val);

    setSelectedOption(found?.name ?? '');

    props?.onChange(val);
  }, [val]);

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.inputContainer,
          {
            paddingVertical: 5,
            alignItems: 'center',
            borderColor: props?.style?.borderColor ?? Colors.inputBackground,
            borderWidth: 1,
          },
        ]}
        onPress={openModal}
      >
        <Text style={styles.input}>
          {selectedOption === '' ? 'Select Option' : selectedOption}
        </Text>
        <Ionicons name="chevron-down" size={20} />
      </TouchableOpacity>
      <SelectOptionBottomSheet
        onChange={(value: number) => setVal(value)}
        ref={bottomSheetRef}
        title={props?.title}
        data={props?.data}
        withHeader={props?.grouped}
        key={props?.title}
        selectedValue={val}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default SelectComponent;
