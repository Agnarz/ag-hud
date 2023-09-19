import { theme } from './theme';
import { MantineProvider } from '@mantine/core';
import { fetchNui } from './utils/fetchNui';
import { useNuiEvent } from './hooks/useNuiEvent';
import PlayerHud from './layouts/PlayerHud';
import VehicleHud from './layouts/VehicleHud';
import Compass from './layouts/Compass';

const App: React.FC = () => {
  fetchNui('init');

  return (
    <MantineProvider withNormalizeCSS theme={{ ...theme }}>
      <PlayerHud />
      <VehicleHud />
      <Compass />
    </MantineProvider>
  );
};

export default App;
