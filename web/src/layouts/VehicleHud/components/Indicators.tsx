import React, { useState } from "react";
import { createStyles } from '@mantine/core';
import { useLockedValue, useSeatbeltValue } from "../../../state";

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
    color: '#FF5100'
  }
}));

const Indicators: React.FC = () => {
  const { classes } = useStyles();
  const seatbelt = useSeatbeltValue();
  const locked = useLockedValue();

  return (
    <div className={classes.container}>
      {!seatbelt && (
        <i className='fas fa-user-slash' />
      )}
      {!locked && (
        <i className='fas fa-unlock' />
      )}
    </div>
  );
};

export default Indicators;
