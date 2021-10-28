import { VFC, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { langSet } from '../config';

export type Props = {
  isDisplay: boolean;
}

const Notification: VFC<Props> = (Props) => {
  const { isDisplay } = Props;
  const [ display, setDisplay ] = useState<boolean>(isDisplay);
  return (
      <Snackbar open={display} autoHideDuration={3000} onClose={() => setDisplay(false)} sx={{zIndex: 30}}>
        <Alert onClose={() => setDisplay(false)} severity="success" sx={{ width: '100%' }}>
          {langSet.common.message}
        </Alert>
      </Snackbar>
  );
}

export default Notification;