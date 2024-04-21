import { View, Text } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Label, RadioGroup, SizeTokens, XStack, YStack } from 'tamagui';
import Colors from '../constants/Colors';

type RadioGroupProps = {
  size: SizeTokens;
  value: string;
  label: string;
};

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

export default RadioGroupItemWithLabel;
