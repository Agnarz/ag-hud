import React, { useState } from "react";
import { createStyles } from '@mantine/core';
import { useNuiEvent } from '../../../hooks/useNuiEvent';

const useStyles = createStyles(() => ({
  container: {
    position: 'absolute',
    display: "flex",
    flexDirection: "row",
    alignItems : "center",
    gap: 12,
    fontSize: 26,
    left: 106,
    top: 18,
  },
  seatbelt: {
    color: '#FF5100',
  },
  locked: {
    color: '#FF5100'
  },
}));

const Indicators: React.FC = () => {
  const { classes } = useStyles();
  const [seatbelt , setSeatbelt] = useState(false);
  const [locked , setLocked] = useState(false);

  useNuiEvent("vehicle", (data) => {
    setSeatbelt(data.seatbelt);
    if (data.locked  == (0 || 1) ) {
      setLocked(false);
    } else {
      setLocked(true);
    }
  });

  return (
    <div className={classes.container}>
      {!seatbelt && (
        <div className={classes.seatbelt}>
          <i className='fas fa-user-slash' />
        </div>
      )}
      {!locked && (
        <div className={classes.locked}>
          <i className='fas fa-unlock' />
        </div>
      )}
    </div>
  );
};

export default Indicators;
