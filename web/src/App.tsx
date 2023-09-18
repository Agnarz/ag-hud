import { theme } from './theme';
import { MantineProvider } from '@mantine/core';
import { fetchNui } from './utils/fetchNui';
import PlayerHud from './layouts/PlayerHud';
const App: React.FC = () => {
  fetchNui('init');

  return (
    <MantineProvider withNormalizeCSS theme={{ ...theme }}>
      <PlayerHud />
    </MantineProvider>
  );
};

export default App;
