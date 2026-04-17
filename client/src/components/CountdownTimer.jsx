import React, { useState, useEffect } from 'react';
import useSocketStore from '../store/useSocketStore';
import { differenceInSeconds } from 'date-fns';

const CountdownTimer = ({ endTime, onEnd }) => {
  const { serverTimeOffset } = useSocketStore();
  const [timeLeft, setTimeLeft] = useState('');
  const [isEndingSoon, setIsEndingSoon] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date(Date.now() + serverTimeOffset);
      const end = new Date(endTime);
      
      const totalSeconds = differenceInSeconds(end, now);

      if (totalSeconds <= 0) {
        setTimeLeft('Auction Ended');
        if (onEnd) onEnd();
        return;
      }

      setIsEndingSoon(totalSeconds < 60);

      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [endTime, serverTimeOffset, onEnd]);

  return (
    <div className={`font-mono text-2xl font-bold tracking-wider transition-colors duration-300 ${isEndingSoon ? 'text-brand-danger animate-pulse shadow-brand-danger' : 'text-brand-accent'}`}>
      {timeLeft}
    </div>
  );
};

export default CountdownTimer;
