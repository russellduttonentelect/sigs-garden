import { enableMapSet } from 'immer';
import { NotificationsProvider } from '@mantine/notifications';
import { MantineProvider } from '@mantine/core';
import { GameContainer } from './GameContainer';

enableMapSet();

const App = () => {
  return (
    <MantineProvider withNormalizeCSS>
      <NotificationsProvider>
        <GameContainer />
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default App;
