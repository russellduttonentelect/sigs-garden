import { Box, Center, Container, SegmentedControl, Space } from '@mantine/core';
import { useState } from 'react';
import { Builder } from './Builder';
import { GameLogic } from './GameLogic';

export const GameContainer = () => {
  const [mode, setMode] = useState('Game');

  return (
    <Container
      sx={{
        height: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Space h="md" />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center'
        }}
      >
        <SegmentedControl
          value={mode}
          onChange={setMode}
          radius={20}
          data={['Game', 'Builder']}
        />
      </Box>
      <Space h="md" />
      {mode === 'Game' ? <GameLogic /> : <Builder />}
    </Container>
  );
};
