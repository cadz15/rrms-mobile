import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

interface DataInterface {
  name: string;
  id: number;
  group?: string;
}

//way gamit ambot unsaon ning ts... for now ignore sa lamang ni
interface PropTypes {
  value: string;
  label: string;
  style?: any;
  selectedValue: number;
  data: DataInterface[];
  onChange: any;
}

type Ref = BottomSheetModal;

const SelectOptionBottomSheet = forwardRef<Ref>((props: any, ref) => {
  const [selectedValue, setselectedValue] = useState(props?.selectedValue);
  const [withHeader, setWithHeader] = useState(props?.withHeader ?? false);
  let currentHeader: string | undefined = '';

  const snapPoints = useMemo(() => ['100%'], []);
  const { dismiss } = useBottomSheetModal();

  useEffect(() => {
    props?.onChange(selectedValue);
  }, [selectedValue]);

  return (
    <SafeAreaView>
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ display: 'none' }}
        style={styles.droidSafeArea}
      >
        <View style={styles.selectOptionHeader}>
          <TouchableOpacity onPress={() => dismiss()}>
            <Ionicons name="close-sharp" size={30} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              textAlign: 'center',
              flex: 1,
              fontFamily: 'mon-sb',
              fontSize: 18,
            }}
          >
            {props?.title ?? 'Select Option'}
          </Text>
        </View>
        <ScrollView>
          {props?.data?.map((item: DataInterface) => {
            if (withHeader && item.group !== currentHeader) {
              currentHeader = item.group; // ambot ani tuon sa ko'g ts uie

              return (
                <>
                  <View style={styles.listItemHeader} key={item.group}>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontFamily: 'mon-sb',
                          fontSize: 20,
                          color: Colors.secondaryLight,
                        }}
                      >
                        {item.group}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.listItemOption}
                    onPress={() => {
                      setselectedValue(item.id);
                      dismiss();
                    }}
                    key={`${props?.title}-${item.id}`}
                  >
                    <View style={{ flex: 1, paddingBottom: 15, paddingTop: 5 }}>
                      <Text
                        style={{ fontFamily: 'mon-sb', fontSize: 18 }}
                        allowFontScaling
                      >
                        {item.name}
                      </Text>
                    </View>
                    <View style={{ width: 30 }}>
                      {item.id === selectedValue && (
                        <Ionicons
                          name="checkmark-sharp"
                          size={18}
                          color={Colors.success}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                </>
              );
            } else {
              return (
                <TouchableOpacity
                  style={styles.listItemOption}
                  onPress={() => {
                    setselectedValue(item.id);
                    dismiss();
                  }}
                  key={item.id}
                >
                  <View style={{ flex: 1, paddingVertical: 15 }}>
                    <Text style={{ fontFamily: 'mon-sb', fontSize: 18 }}>
                      {item.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 30,
                    }}
                  >
                    {item.id === selectedValue && (
                      <Ionicons
                        name="checkmark-sharp"
                        color={Colors.success}
                        style={{ padding: 0, fontSize: 30 }}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            }
          })}
        </ScrollView>
      </BottomSheetModal>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  selectOptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d9dfe2',
    paddingBottom: 5,
  },
  listItemHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  listItemOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d9dfe2',
    paddingHorizontal: 10,
  },
});

export default SelectOptionBottomSheet;
