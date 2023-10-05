import { createStyles } from '@mantine/core';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { CompassProps } from '../../types';
import { useShowCompass, useCrossroads, useHeading, useZone } from '../../state';


const useStyles = createStyles((theme) => ({
  container: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    top: 12,
    gap: 8,
    color: 'white',
    fontWeight: 700,
    fontSize: 16,
    textShadow: '1px 1px 2px rgba(0, 0, 0, .5)'
  },
  separator: {
    color: theme.colors.blue[3]
  }
}));

const Compass: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = useShowCompass();
  const [crossroads, setCrossroads] = useCrossroads();
  const [heading, setHeading] = useHeading();
  const [zone, setZone] = useZone();

  useNuiEvent<CompassProps>('compass', (data) => {
    setVisible(data.show);
    setCrossroads(data.crossroads);
    setHeading(data.heading);
    setZone(data.zone);
  });

  return (
    <>
      {visible && (
        <div className={classes.container}>
          {heading}
          <div className={classes.separator}>|</div>
          {crossroads[0]}
          {crossroads[1] && (
            <>
              <div className={classes.separator}>x</div>
              {crossroads[1]}
            </>
          )}
          <div className={classes.separator}>|</div>
          {zone}
        </div>
      )}
    </>
  );
};

export default Compass;
