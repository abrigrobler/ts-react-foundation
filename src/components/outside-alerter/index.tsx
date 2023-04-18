import useOutsideAlerter from '../../hooks/use-outside-alerter';
import { ReactNode, useRef } from 'react';

const OutsideAlerter = ({ callback, children }: { callback: () => void; children: ReactNode }) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, callback);

  return <div ref={wrapperRef}>{children}</div>;
};

export default OutsideAlerter;
