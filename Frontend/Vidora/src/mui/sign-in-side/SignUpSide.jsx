import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import AppTheme from '../shared-theme/AppTheme.jsx';
import ColorModeSelect from '../shared-theme/ColorModeSelect.jsx';
import SignUpCard from './components/SignUpCard.jsx';

export default function SignUpSide(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      {/* Hidden theme toggle to keep a consistent custom theme */}
      <Stack
        direction="column"
        component="main"
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          backgroundImage: 'url("/background.png")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundColor: '#020617',
        }}
      >
        <SignUpCard />
      </Stack>
    </AppTheme>
  );
}
