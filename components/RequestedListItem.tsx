import { View, Text } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';

interface PropsType {
  itemName: string;
  degree: string;
  amount: number;
  quantity: number;
}

const RequestedListItem = (props: PropsType) => {
  return (
    <View
      style={{
        paddingBottom: 20,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccd4d9',
        padding: 20,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: 'mon-sb', fontSize: 18 }}>
          {props.itemName}
        </Text>
        <Text style={{ fontFamily: 'mon', fontSize: 12 }}>{props.degree}</Text>
      </View>
      <View style={{ width: 100 }}>
        <Text
          style={{
            textAlign: 'right',
            color: Colors.primary,
            fontFamily: 'mon-b',
            fontSize: 18,
          }}
        >
          {props.amount.toLocaleString('en-us', {
            style: 'currency',
            currency: 'PHP',
          })}
        </Text>
        <Text style={{ textAlign: 'right', color: Colors.secondaryLight }}>
          x{props.quantity}
        </Text>
      </View>
    </View>
  );
};

export default RequestedListItem;
