import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import RequestBottomSheet from '../../components/RequestBottomSheet';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import apiRoutes from '../../util/APIRoutes';
import useStore from '../../store/studentStore';
import { router } from 'expo-router';
import { ConfirmDialog } from 'react-native-simple-dialogs';

interface AddItemInterface {
  degreeId: number;
  degreeName: string;
  itemId: number;
  itemName: string;
  quantity: string;
}

interface RequestedInvalidItemsInterface {
  item_name: string;
  degree_name: string;
}

const CreateRequest = () => {
  const bottomSheet = useRef<BottomSheetModal>(null);
  const [requestedItems, setRequestedItems] = useState<AddItemInterface[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [invalidItems, setInvalidItems] = useState<
    RequestedInvalidItemsInterface[]
  >([]);
  const [confirmModal, setConfirmModal] = useState(false);

  const { _token, setRequestableItems, requestDetails, setRequestDetails } =
    useStore();

  const openModal = () => {
    bottomSheet.current?.present();
  };

  const addItem = (data: AddItemInterface) => {
    // check if data is already in the list
    if (
      requestedItems.find(
        (item: any) =>
          item.itemId === data.itemId && item.degreeId === data.degreeId,
      )
    ) {
      setIsError(true);
      setErrorMessage('Item already in the list!');
    } else {
      setIsError(false);
      setRequestedItems([...requestedItems, data]);
    }
  };

  const handleRemoveItem = (index: number) => {
    const newRequestedItems = requestedItems.filter(
      (item: any, i: number) => i !== index,
    );
    setRequestedItems(newRequestedItems);
  };

  //TODO handle submit
  const handleSubmit = () => {
    setIsError(false);
    console.log(requestedItems);
    console.log(requestDetails);

    axios
      .post(
        apiRoutes.createRequest,
        { new_request: requestedItems, requestDetails },
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
          setRequestDetails(null);
          router.back();
        }
      })
      .catch((error) => {
        console.log(error.response);
        setIsLoading(false);
        setErrorMessage(error.response.data.message);
        setIsError(true);

        if (error.response.status === 409)
          setInvalidItems(error.response.data?.invalid_items);
      });
  };

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      axios
        .post(
          apiRoutes.requestableItems,
          {},
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
            setRequestableItems(response.data.requestable_items);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, []);

  if (isLoading)
    return <ActivityIndicator size="large" color={Colors.primary} />;

  return (
    <View style={styles.container}>
      <ConfirmDialog
        title="Warning"
        message="Please ensure to review your requested items carefully before submission, as changes or removals cannot be made once the request is submitted. Thank you for your attention to detail."
        visible={confirmModal}
        onTouchOutside={() => setConfirmModal(false)}
        positiveButton={{
          title: 'YES',
          onPress: handleSubmit,
        }}
        negativeButton={{
          title: 'NO',
          onPress: () => setConfirmModal(false),
        }}
      />

      <View style={styles.info}>
        <Ionicons name="information-circle-outline" size={24} color={'#fff'} />
        <View style={{ flex: 0 }}>
          <View>
            <Text style={{ fontSize: 14, fontFamily: 'mon', color: '#fff' }}>
              Purpose :{' '}
              <Text style={{ fontFamily: 'mon-sb' }}>
                {requestDetails?.purposes?.join(', ')}
              </Text>
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 14, fontFamily: 'mon', color: '#fff' }}>
              Delivery Method :{' '}
              <Text style={{ fontFamily: 'mon-sb' }}>
                {requestDetails?.deliveryMethod === 'pick-up'
                  ? 'Pick-up'
                  : `Courier ${
                      requestDetails?.mailTo === 'local'
                        ? '(Local  +300)'
                        : '(International +1,000)'
                    } `}

                {requestDetails?.deliveryMethod === 'courier' && (
                  <Text>{`\n  ${requestDetails?.address}, ${requestDetails?.city}, ${requestDetails?.province}, ${requestDetails?.country}, ${requestDetails?.postal} `}</Text>
                )}
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <View style={{ width: '60%' }}>
        <RequestBottomSheet ref={bottomSheet} onAdd={addItem} />
        <TouchableOpacity style={styles.button} onPress={openModal}>
          <MaterialCommunityIcons
            name="beaker-plus-outline"
            size={18}
            style={{ color: Colors.primary }}
          />
          <Text
            style={{
              color: Colors.primary,
              fontFamily: 'mon-sb',
              fontSize: 18,
            }}
          >
            Add Item/Document
          </Text>
        </TouchableOpacity>
      </View>
      {isError && (
        <View style={styles.error}>
          <Ionicons name="warning" size={24} color={'#fff'} />
          <View>
            <Text style={{ fontSize: 18, fontFamily: 'mon-sb', color: '#fff' }}>
              {errorMessage}
            </Text>
            {invalidItems.map((item) => (
              <Text
                style={{ fontSize: 18, fontFamily: 'mon-sb', color: '#fff' }}
              >{`\u2022 ${item.item_name}`}</Text>
            ))}
          </View>
        </View>
      )}
      <View style={styles.card}>
        <Text
          style={{
            fontFamily: 'mon-sb',
            color: Colors.secondaryLight,
            fontSize: 18,
          }}
        >
          Requested Items/Documents
        </Text>

        {requestedItems.length > 0 ? (
          requestedItems?.map((item: any, index: number) => (
            <RequestedItem
              key={index}
              quantity={item?.quantity}
              itemName={item?.itemName}
              degreeName={item?.degreeName}
              handleRemoveItem={() => handleRemoveItem(index)}
            />
          ))
        ) : (
          <Text
            style={{
              fontFamily: 'mon-b',
              fontSize: 22,
              textAlign: 'center',
              padding: 15,
            }}
          >
            No items added!
          </Text>
        )}

        {requestedItems.length > 0 ? (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: Colors.primary }]}
            onPress={() => setConfirmModal(true)}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'mon-sb',
                  fontSize: 18,
                  textAlign: 'center',
                  flex: 1,
                }}
              >
                Submit Request
              </Text>
            )}
          </TouchableOpacity>
        ) : (
          ''
        )}
      </View>
    </View>
  );
};

const RequestedItem = (props: any) => (
  <View style={styles.requestedItemContainer}>
    <View style={styles.requestedItemLeft}>
      <Text style={{ fontFamily: 'mon-sb', fontSize: 16 }}>
        {`x${props?.quantity ?? ''} ${props?.itemName ?? ''}`}
      </Text>
      <Text
        style={{
          fontFamily: 'mon',
          fontSize: 14,
          color: Colors.secondaryLight,
        }}
      >
        {props?.degreeName}
      </Text>
    </View>
    <View style={styles.requestedItemRight}>
      <TouchableOpacity onPress={props?.handleRemoveItem}>
        <Ionicons
          name="trash-outline"
          style={{ color: Colors.danger, fontSize: 26 }}
        />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    rowGap: 10,
  },
  button: {
    flexDirection: 'row',
    columnGap: 10,
    padding: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
  card: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  requestedItemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: Colors.secondaryLight,
    borderBottomWidth: 1,
    rowGap: 10,
  },
  requestedItemLeft: {
    flex: 1,
  },
  requestedItemRight: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    backgroundColor: Colors.danger,
    marginTop: 10,
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    backgroundColor: Colors.tint,
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CreateRequest;
