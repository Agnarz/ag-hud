import { theme } from './theme';
import { MantineProvider } from '@mantine/core';
import { fetchNui } from './utils/fetchNui';
const App: React.FC = () => {
  fetchNui('init');

  return (
    <MantineProvider withNormalizeCSS theme={{ ...theme }}>

    </MantineProvider>
  );
};

export default App;
