import { theme } from './theme';
import { MantineProvider } from '@mantine/core';
import { fetchNui } from './utils/fetchNui';
import PlayerHud from './layouts/PlayerHud';
import VehicleHud from './layouts/VehicleHud';

const App: React.FC = () => {
  fetchNui('init');

  return (
    <MantineProvider withNormalizeCSS theme={{ ...theme }}>
      <PlayerHud />
      <VehicleHud />
    </MantineProvider>
  );
};

export default App;
