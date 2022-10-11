import { Box, Stack, Title } from '@mantine/core';
import { MantineIcon } from './components/MantineIcon';
import { Rune } from './Rune.enum';
import { Placement } from './types/placement.type';

type TileBreakdownProps = {
  placedTiles: Placement;
};

export const TileBreakdown = ({ placedTiles }: TileBreakdownProps) => {
  const getRemaining = (rune: Rune) => {
    return Object.values(placedTiles).filter((value) => value === rune).length;
  };

  return (
    <Stack sx={{ padding: 4 }}>
      {Object.values(Rune).map((rune, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '60px',
            background: 'white',
            borderRadius: '40px'
          }}
        >
          <MantineIcon rune={rune} />
          <Title order={4} color="black" sx={{ paddingRight: 8 }}>
            {getRemaining(rune)}
          </Title>
        </Box>
      ))}
    </Stack>
  );
};
