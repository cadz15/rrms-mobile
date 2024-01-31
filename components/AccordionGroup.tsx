import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import AccordionItem from './AccordionItem';
import Education from '../types/educationInterface';
import useStore from '../store/studentStore';

const AccordionGroup = (props: any) => {
  const [selectedId, setSelectedId] = useState(1);
  const { educations } = useStore();
  const [currentEducations, setCurrentEducations] = useState<Education | null>(
    null,
  );

  useEffect(() => {
    setCurrentEducations(educations);
  }, [educations]);

  // ingani nalamang kay lisud man ang children butangan ug props
  return (
    <>
      {currentEducations?.map((education: Education) => {
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
              key={education.id}
            />
          </View>
        );
      })}
    </>
  );
};

export default AccordionGroup;
