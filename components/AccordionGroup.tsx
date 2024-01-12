import { View, Text } from 'react-native';
import React, { useState } from 'react';
import AccordionItem from './AccordionItem';
import Education from '../types/educationInterface';

const AccordionGroup = (props: any) => {
  const [selectedId, setSelectedId] = useState(1);

  //Sample data
  const sampleEducation: Education[] = [
    {
      id: 1,
      degree:
        'Bachelor of Science in Information Technology Major in Programming',
      schoolName: 'BATO INSTITUTE OF SCIENCE AND TECHNOLOGY INC',
      schoolAddress: 'Brgy. Dolho, Bato, Leyte 6525',
      yearStart: 'January 2022',
      yearEnd: 'September 2029',
      isGraduate: true,
    },
    {
      id: 2,
      degree: 'Grade 1',
      schoolName: 'BATO INSTITUTE OF SCIENCE AND TECHNOLOGY INC',
      schoolAddress: 'Brgy. Dolho, Bato, Leyte 6525',
      yearStart: 'May 2000',
      yearEnd: 'August 2019',
      isGraduate: false,
    },
  ];

  // ingani nalamang kay lisud man ang children butangan ug props
  return (
    <>
      {sampleEducation.map((education) => {
        return (
          <View
            {...props}
            onTouchStart={() => {
              setSelectedId(education.id);
            }}
            key={education.id}
          >
            <AccordionItem
              id={education.id}
              selectedId={selectedId}
              data={education}
            />
          </View>
        );
      })}
    </>
  );
};

export default AccordionGroup;
