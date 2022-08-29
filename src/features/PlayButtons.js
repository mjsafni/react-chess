import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import LanguageIcon from '@mui/icons-material/Language';
import QrCodeIcon from '@mui/icons-material/QrCode';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Button, ButtonGroup, Grid, Stack } from '@mui/material';
import * as mainButtonConst from '../common/constants/mainButton';
import * as modeConst from '../common/constants/mode';
import Wording from '../common/Wording';
import CreateInviteCodeDialog from './dialog/CreateInviteCodeDialog';
import EnterInviteCodeDialog from './dialog/EnterInviteCodeDialog';
import PlayComputerDialog from './dialog/PlayComputerDialog';
import PlayOnlineDialog from './dialog/PlayOnlineDialog';
import * as createInviteCodeDialog from '../features/dialog/createInviteCodeDialogSlice';
import * as enterInviteCodeDialog from '../features/dialog/enterInviteCodeDialogSlice';
import * as playComputerDialog from '../features/dialog/playComputerDialogSlice';
import * as playOnlineDialog from '../features/dialog/playOnlineDialogSlice';
import * as mode from '../features/modeSlice';
import WsAction from '../ws/WsAction';

const PlayButtons = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const disabled = state.mode.name === modeConst.PLAY &&
    state.mode.play.accepted &&
    (!state.mode.play.draw || state.mode.play.draw === Wording.verb.PROPOSE.toLowerCase()) &&
    !state.mode.play.resign &&
    !state.mode.play.resign &&
    !state.mode.play.leave &&
    !state.mode.play.timer.over &&
    !state.board.isMate;

  return (
    <Grid>
      <Stack spacing={2}>
        <ButtonGroup
          size="small"
          orientation="vertical"
          aria-label="Play Online"
          fullWidth={true}
          disabled={disabled}
        >
          <Button
            startIcon={<LanguageIcon />}
            variant={state.mainButtons.name === mainButtonConst.PLAY_ONLINE ? "contained" : "outlined"}
            onClick={() => {
              dispatch(playOnlineDialog.open());
              WsAction.onlineGames(state);
            }}
          >
            Play Online
          </Button>
        </ButtonGroup>
        <ButtonGroup
          size="small"
          orientation="vertical"
          aria-label="Play A Friend"
          fullWidth={true}
          disabled={disabled}
        >
          <Button
            startIcon={<QrCodeIcon />}
            variant={state.mainButtons.name === mainButtonConst.PLAY_A_FRIEND ? "contained" : "outlined"}
            onClick={() => {
              dispatch(createInviteCodeDialog.open());
              dispatch(mode.startAnalysis());
            }}
          >
            Play a Friend
          </Button>
          <Button
            startIcon={<KeyboardIcon />}
            onClick={() => dispatch(enterInviteCodeDialog.open())}
          >
            Enter Invite Code
          </Button>
        </ButtonGroup>
        <ButtonGroup
          size="small"
          orientation="vertical"
          aria-label="Play Computer"
          fullWidth={true}
          disabled={disabled}
        >
          <Button
            startIcon={<SmartToyIcon />}
            variant={state.mainButtons.name === mainButtonConst.PLAY_COMPUTER ? "contained" : "outlined"}
            onClick={() => dispatch(playComputerDialog.open())}
          >
            Play Computer
          </Button>
        </ButtonGroup>
      </Stack>
      <PlayOnlineDialog />
      <CreateInviteCodeDialog />
      <EnterInviteCodeDialog />
      <PlayComputerDialog />
    </Grid>
  );
}

export default PlayButtons;