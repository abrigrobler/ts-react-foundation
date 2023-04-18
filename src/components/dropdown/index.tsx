import { css } from '@emotion/react';
import { Button } from '../elements';
import { Flex } from '../layout';
import { Text } from '../typography';
import { useState } from 'react';
import theme from '../../../theme';
import { LabelValuePair } from '../../types/types';

const DropdownItem = ({
  option,
  setOption,
  lastChild = false,
}: {
  option: LabelValuePair;
  setOption: () => void;
  lastChild: boolean;
}) => (
  <Button
    onClick={setOption}
    textAlign="left"
    borderB={!lastChild ? theme.borders.standard1px : undefined}
    p="10px"
    position="relative"
  >
    {option.label}
  </Button>
);

const Dropdown = ({
  value,
  options,
  onChange,
}: {
  value: LabelValuePair;
  options: LabelValuePair[];
  onChange: (option: LabelValuePair) => void;
}) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <Button
      position="relative"
      p="10px"
      border={theme.borders.standard1px}
      borderRadius={theme.borderRadius.small}
      onClick={() => setShowOptions(!showOptions)}
    >
      <Text textAlign="left">{value.label}</Text>
      {showOptions && (
        <Flex
          p="10px"
          position="absolute"
          top="110%"
          left="0"
          backgroundColor="white"
          flexDirection="column"
          zIndex={1000}
          borderRadius={theme.borderRadius.small}
          overrideCss={css`
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
          `}
        >
          {options.map((option: LabelValuePair, idx: number) => (
            <DropdownItem
              option={option}
              setOption={() => onChange(option)}
              key={idx}
              lastChild={idx === options.length - 1}
            />
          ))}
        </Flex>
      )}
    </Button>
  );
};

export default Dropdown;
