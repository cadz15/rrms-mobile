import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../constants/Colors';

const AccordionItem = (props: any) => {
  const [isSelected, setIsSelected] = useState(false);
  const data = props.data;

  useEffect(() => {
    if (props.selectedId === props.id) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [props.selectedId]);

  return (
    <View style={styles.container}>
      {isSelected ? (
        <>
          <Text style={[styles.title, { fontFamily: 'mon-b' }]}>
            {data?.degree}
          </Text>
          <Text style={styles.subtitle}>{data?.schoolName}</Text>
          <Text style={styles.subtitle}>{data?.schoolAddress}</Text>
          <Text style={styles.subtitle}>
            {data?.yearStart} - {data?.yearEnd}
          </Text>
          {props?.data?.isGraduate && (
            <Text
              style={{
                backgroundColor: Colors.success,
                padding: 5,
                flexGrow: 0,
                flex: 0,
                borderRadius: 10,
                color: '#fff',
                width: '25%',
                textAlign: 'center',
              }}
            >
              Graduated
            </Text>
          )}
        </>
      ) : (
        <>
          <Text style={styles.title}>{data?.degree}</Text>
          <Text style={[styles.subtitle, { fontSize: 14 }]}>
            {data?.yearStart} - {data?.yearEnd}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: 5,
  },
  title: {
    fontFamily: 'mon-sb',
    fontSize: 18,
    color: Colors.secondary,
    textAlign: 'justify',
  },
  subtitle: {
    fontFamily: 'mon-sb',
    fontSize: 16,
    textAlign: 'justify',
    color: Colors.secondaryLight,
  },
});

export default AccordionItem;
