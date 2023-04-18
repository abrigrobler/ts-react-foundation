import { css } from '@emotion/react';
import { Button, Image } from '../elements';
import { Flex, Grid } from '../layout';
import { Text } from '../typography';
import { dayLookup, getFirstDayOfMonth, getLengthOfMonth, monthLookup } from '../../functions/date';
import { useEffect, useMemo, useState } from 'react';
import theme from '../../../theme';

const DayButton = ({
  value,
  disabled,
  onClick,
  isSelected,
  outsideRange,
}: {
  value: number;
  disabled: boolean;
  onClick: () => void;
  isSelected: boolean;
  outsideRange: boolean;
}) => (
  <Button
    onClick={onClick}
    disabled={outsideRange}
    opacity={outsideRange ? '0.5' : '1'}
    p="5px"
    borderRadius="50%"
    backgroundColor={isSelected && !disabled ? theme.colors.primary : outsideRange ? theme.colors.borderGrey : 'white'}
    width="30px"
    height="30px"
    alignContent="center"
  >
    <Text color={isSelected && !disabled ? 'white' : disabled ? theme.colors.lightGrey : 'black'} textAlign="center">
      {value.toString()}
    </Text>
  </Button>
);

// Single selection calendar
export const Calendar = ({
  date,
  minDate,
  maxDate,
  setDate,
}: {
  date: Date;
  minDate?: Date;
  maxDate?: Date;
  setDate: (date: Date) => void;
}) => {
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const [dayValuesState, setDayValues] = useState<number[]>([]);

  const nextMonth = month === 11 ? 0 : month + 1;
  const prevMonth = month === 0 ? 11 : month - 1;
  const firstDayOfMonth = getFirstDayOfMonth(month, year);

  const lengthOfMonth = getLengthOfMonth(year, month);
  const lengthOfPrevMonth = getLengthOfMonth(year, prevMonth);

  const isOutsideRange = (index: number, d: number) => {
    const isInPrevMonth = index < firstDayOfMonth;
    const isInNextMonth = index > firstDayOfMonth + lengthOfMonth - 1;
    const isInNextYear = month === 11 && index > firstDayOfMonth + lengthOfMonth - 1;
    const isInPrevYear = month === 0 && index < firstDayOfMonth;
    const associatedMonth = isInPrevMonth ? prevMonth : isInNextMonth ? nextMonth : month;
    const associatedYear = isInPrevYear ? year - 1 : isInNextYear ? year + 1 : year;
    const associatedDate = new Date(associatedYear, associatedMonth, d);
    return (
      associatedDate.getTime() < (minDate || new Date(0, 0, 0)).getTime() ||
      associatedDate.getTime() > (maxDate || new Date(9999, 0, 0)).getTime()
    );
  };

  const isPrevButtonDisabled = useMemo(() => {
    if (minDate) {
      return new Date(year, month, 1).getTime() < minDate?.getTime();
    }
    return false;
  }, [month, year]);

  const isNextButtonDisabled = useMemo(() => {
    if (maxDate) {
      return new Date(year, month, lengthOfMonth).getTime() > maxDate?.getTime();
    }
    return false;
  }, [month, year]);

  const handleDayClick = (day: number, outOfRange: boolean, index: number) => {
    if (!outOfRange && index < firstDayOfMonth) {
      setMonth(prevMonth);
      if (prevMonth === 11) {
        setYear(year - 1);
      }
    } else if (!outOfRange && index > firstDayOfMonth + lengthOfMonth - 1) {
      setMonth(nextMonth);
      if (nextMonth === 0) {
        setYear(year + 1);
      }
    } else {
      setDate(new Date(year, month, day));
    }
  };

  // Populate the dayValuesState array with the correct values for the current month
  useEffect(() => {
    const dayValues = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      dayValues.push(lengthOfPrevMonth - firstDayOfMonth + i + 1);
    }
    for (let i = 0; i < lengthOfMonth; i++) {
      dayValues.push(i + 1);
    }
    for (let i = 0; i < 42 - lengthOfMonth - firstDayOfMonth; i++) {
      dayValues.push(i + 1);
    }
    setDayValues(dayValues);
  }, [month, year]);

  return (
    <Flex flexDirection="column" justifyContent="center" width="100%">
      <Flex justifyContent="space-between" mb="10px" mx="30px">
        <Button
          onClick={() => {
            if (prevMonth === 11) {
              setYear(year - 1);
            }
            setMonth(prevMonth);
          }}
          disabled={isPrevButtonDisabled}
          opacity={isPrevButtonDisabled ? '0.3' : '1'}
        >
          <Image
            border={theme.borders.standard1px}
            borderRadius="50%"
            source="icons/arrow-right-black.svg"
            alt="<"
            overrideCss={css`
              transform: rotate(180deg);
            `}
          />
        </Button>
        <Text fontWeight="500" fontSize="16px">{`${monthLookup[month]} ${year}`}</Text>
        <Button
          onClick={() => {
            if (nextMonth === 0) {
              setYear(year + 1);
            }
            setMonth(nextMonth);
          }}
          disabled={isNextButtonDisabled}
          opacity={isNextButtonDisabled ? '0.3' : '1'}
        >
          <Image border={theme.borders.standard1px} borderRadius="50%" source="icons/arrow-right-black.svg" alt=">" />
        </Button>
      </Flex>
      <Grid gridTemplateColumns="repeat(7, 1fr)" gridTemplateRows="repeat(6, 1fr)" gridRowGap="10px" ml="25px">
        {dayLookup.map((d, index) => (
          <Text key={index} fontWeight="bold">
            {d.slice(0, 3)}
          </Text>
        ))}
        {dayValuesState.map((d, index) => {
          const outOfRange = isOutsideRange(index, d);
          return (
            <DayButton
              outsideRange={outOfRange}
              value={d}
              key={index}
              onClick={() => handleDayClick(d, outOfRange, index)}
              disabled={index < firstDayOfMonth || index > lengthOfMonth + firstDayOfMonth - 1}
              isSelected={new Date(year, month, d).getTime() === date.getTime()}
            />
          );
        })}
      </Grid>
    </Flex>
  );
};

export const CalendarMultiSelect = ({
  date,
  minDate,
  maxDate,
  setDate,
}: {
  date: Date[];
  minDate?: Date;
  maxDate?: Date;
  setDate: (date: Date[]) => void;
}) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [dayValuesState, setDayValues] = useState<number[]>([]);
  const nextMonth = month === 11 ? 0 : month + 1;
  const prevMonth = month === 0 ? 11 : month - 1;
  const firstDayOfMonth = getFirstDayOfMonth(month, year);

  const lengthOfMonth = getLengthOfMonth(year, month);
  const lengthOfPrevMonth = getLengthOfMonth(year, prevMonth);

  const isOutsideRange = (index: number, d: number) => {
    const isInPrevMonth = index < firstDayOfMonth;
    const isInNextMonth = index > firstDayOfMonth + lengthOfMonth - 1;
    const isInNextYear = month === 11 && index > firstDayOfMonth + lengthOfMonth - 1;
    const isInPrevYear = month === 0 && index < firstDayOfMonth;
    const associatedMonth = isInPrevMonth ? prevMonth : isInNextMonth ? nextMonth : month;
    const associatedYear = isInPrevYear ? year - 1 : isInNextYear ? year + 1 : year;
    const associatedDate = new Date(associatedYear, associatedMonth, d);
    return (
      associatedDate.getTime() < (minDate || new Date(0, 0, 0)).getTime() ||
      associatedDate.getTime() > (maxDate || new Date(9999, 0, 0)).getTime()
    );
  };

  const isPrevButtonDisabled = useMemo(() => {
    if (minDate) {
      return new Date(year, month, 1).getTime() < minDate?.getTime();
    }
    return false;
  }, [month, year]);

  const isNextButtonDisabled = useMemo(() => {
    if (maxDate) {
      return new Date(year, month, lengthOfMonth).getTime() > maxDate?.getTime();
    }
    return false;
  }, [month, year]);

  const handleDayClick = (day: number, outOfRange: boolean, index: number) => {
    if (!outOfRange && index < firstDayOfMonth) {
      setMonth(prevMonth);
      if (prevMonth === 11) {
        setYear(year - 1);
      }
    } else if (!outOfRange && index > firstDayOfMonth + lengthOfMonth - 1) {
      setMonth(nextMonth);
      if (nextMonth === 0) {
        setYear(year + 1);
      }
    } else {
      const newDate = new Date(year, month, day);
      const dateIndex = date.findIndex((x) => x.getTime() === newDate.getTime());
      if (dateIndex !== -1) {
        setDate(date.filter((x) => x.getTime() !== newDate.getTime()));
      } else {
        setDate([...date, newDate]);
      }
    }
  };

  // Populate the dayValuesState array with the correct values
  useEffect(() => {
    const dayValues = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      dayValues.push(lengthOfPrevMonth - firstDayOfMonth + i + 1);
    }
    for (let i = 0; i < lengthOfMonth; i++) {
      dayValues.push(i + 1);
    }
    for (let i = 0; i < 42 - lengthOfMonth - firstDayOfMonth; i++) {
      dayValues.push(i + 1);
    }
    setDayValues(dayValues);
  }, [month, year]);

  return (
    <Flex flexDirection="column" justifyContent="center" width="100%">
      <Flex justifyContent="space-between" mb="10px" mx="30px">
        <Button
          onClick={() => {
            if (prevMonth === 11) {
              setYear(year - 1);
            }
            setMonth(prevMonth);
          }}
          disabled={isPrevButtonDisabled}
          opacity={isPrevButtonDisabled ? '0.3' : '1'}
        >
          <Image
            border={theme.borders.standard1px}
            borderRadius="50%"
            source="icons/arrow-right-black.svg"
            alt="<"
            overrideCss={css`
              transform: rotate(180deg);
            `}
          />
        </Button>
        <Text fontSize="16px" fontWeight="500">{`${monthLookup[month]} ${year}`}</Text>
        <Button
          onClick={() => {
            if (nextMonth === 0) {
              setYear(year + 1);
            }
            setMonth(nextMonth);
          }}
          disabled={isNextButtonDisabled}
          opacity={isNextButtonDisabled ? '0.3' : '1'}
        >
          <Image border={theme.borders.standard1px} borderRadius="50%" source="icons/arrow-right-black.svg" alt=">" />
        </Button>
      </Flex>
      <Grid gridTemplateColumns="repeat(7, 1fr)" gridTemplateRows="repeat(6, 1fr)" gridRowGap="10px" ml="25px">
        {dayLookup.map((d, index) => (
          <Text key={index} fontWeight="bold">
            {d.slice(0, 3)}
          </Text>
        ))}
        {dayValuesState.map((d, index) => {
          const outOfRange = isOutsideRange(index, d);
          return (
            <DayButton
              outsideRange={outOfRange}
              value={d}
              key={index}
              onClick={() => handleDayClick(d, outOfRange, index)}
              disabled={index < firstDayOfMonth || index > lengthOfMonth + firstDayOfMonth - 1}
              isSelected={date.some((x) => x.getTime() === new Date(year, month, d).getTime())}
            />
          );
        })}
      </Grid>
    </Flex>
  );
};
