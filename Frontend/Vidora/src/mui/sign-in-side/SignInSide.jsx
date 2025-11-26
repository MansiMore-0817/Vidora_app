import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import AppTheme from '../shared-theme/AppTheme.jsx';
import ColorModeSelect from '../shared-theme/ColorModeSelect.jsx';
import SignInCard from './components/SignInCard.jsx';
import Content from './components/Content.jsx';

export default function SignInSide(props) {
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
        <SignInCard />
      </Stack>
    </AppTheme>
  );
}
