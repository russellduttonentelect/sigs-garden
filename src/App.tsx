import { enableMapSet } from "immer";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import { Board } from "./Board";

enableMapSet();

const App = () => {
  return (
    <MantineProvider withNormalizeCSS>
      <NotificationsProvider>
        <Board />
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default App;
