import { Center, Container, SegmentedControl, Space } from '@mantine/core';
import { useState } from 'react';
import { Builder } from './Builder';
import { GameLogic } from './GameLogic';

export const GameContainer = () => {
  const [mode, setMode] = useState('Game');

  return (
    <Container>
      <Center>
        <SegmentedControl
          value={mode}
          onChange={setMode}
          size="md"
          radius={20}
          data={['Game', 'Builder']}
        />
      </Center>
      <Space h="md" />
      {mode === 'Game' ? <GameLogic /> : <Builder />}
    </Container>
  );
};
