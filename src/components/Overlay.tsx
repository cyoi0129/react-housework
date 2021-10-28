import { VFC, useState } from 'react';
import { CircularProgress, Backdrop } from '@mui/material';

export type Props = {
  isDisplay: boolean;
}

const Overlay: VFC<Props> = (Props) => {
  const { isDisplay } = Props;
  const [display, setDisplay] = useState<boolean>(isDisplay);
  return (
    <Backdrop open={display} sx={{ display: 'flex', zIndex: 20 }}>
      <CircularProgress />
    </Backdrop>
  );
}

export default Overlay;