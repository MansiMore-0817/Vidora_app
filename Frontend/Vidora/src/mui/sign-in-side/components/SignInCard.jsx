import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/material/styles';
import ForgotPassword from './ForgotPassword.jsx';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons.jsx';
import { AuthContext } from '../../../contexts/AuthContext.jsx';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2.5),
  borderRadius: 3,
  background:
    'radial-gradient(circle at top left, rgba(150, 15, 188, 0.32), rgba(6, 9, 30, 0.96))',
  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.9)',
  border: '1px solid rgba(255, 255, 255, 0.14)',
  color: '#f9fafb',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

export default function SignInCard() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [apiError, setApiError] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const { handleLogin } = React.useContext(AuthContext) || {};

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiError('');
    if (emailError || passwordError) {
      return;
    }
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');
    if (handleLogin) {
      try {
        await handleLogin(username, password);
      } catch (err) {
        const errorMsg = err?.response?.data?.message || err?.message || 'Login failed. Please try again.';
        setApiError(errorMsg);
        console.error('Login error:', err);
      }
    }
  };

  const validateInputs = () => {
    const username = document.getElementById('username');
    const password = document.getElementById('password');

    let isValid = true;

    if (!username.value || username.value.length < 3) {
      setEmailError(true);
      setEmailErrorMessage('Username must be at least 3 characters long.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <SitemarkIcon />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{
          width: '100%',
          fontSize: 'clamp(2rem, 10vw, 2.15rem)',
          fontWeight: 700,
        }}
      >
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
        <FormControl>
          <FormLabel sx={{ color: 'rgba(226,232,240,0.9)' }} htmlFor="username">
            Username
          </FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="username"
            type="text"
            name="username"
            placeholder="your-username"
            autoComplete="username"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? 'error' : 'primary'}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#960fbc',
                },
                '&:hover fieldset': {
                  borderColor: '#7a0897',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#960fbc',
                },
                backgroundColor: 'rgba(15,23,42,0.85)',
              },
              '& .MuiInputBase-input': {
                color: '#f9fafb',
              },
            }}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <FormLabel sx={{ color: 'rgba(226,232,240,0.9)' }} htmlFor="password">
              Password
            </FormLabel>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'baseline', color: '#cbd5f5' }}
            >
              Forgot your password?
            </Link>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#960fbc',
                },
                '&:hover fieldset': {
                  borderColor: '#7a0897',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#960fbc',
                },
                backgroundColor: 'rgba(15,23,42,0.85)',
              },
              '& .MuiInputBase-input': {
                color: '#f9fafb',
              },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
          sx={{ color: 'rgba(226,232,240,0.9)' }}
        />
        {apiError && (
          <Typography sx={{ color: 'error.main', fontSize: '0.875rem', textAlign: 'center' }}>
            {apiError}
          </Typography>
        )}
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={validateInputs}
          sx={{
            mt: 1,
            backgroundColor: '#960fbc',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#7a0897',
            },
          }}
        >
          Sign in
        </Button>
        <Typography sx={{ textAlign: 'center', color: 'rgba(226,232,240,0.9)' }}>
          Don&apos;t have an account?{' '}
          <span>
            <Link
              component="a"
              href="/signup"
              variant="body2"
              sx={{ alignSelf: 'center', cursor: 'pointer' }}
            >
              Sign up
            </Link>
          </span>
        </Typography>
      </Box>
      <Divider sx={{ borderColor: 'rgba(148,163,184,0.4)' }}>or</Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert('Sign in with Google')}
          startIcon={<GoogleIcon />}
          sx={{
            borderColor: 'rgba(148,163,184,0.5)',
            color: '#e5e7eb',
            textTransform: 'none',
            '&:hover': {
              borderColor: '#960fbc',
              backgroundColor: 'rgba(15,23,42,0.85)',
            },
          }}
        >
          Sign in with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert('Sign in with Facebook')}
          startIcon={<FacebookIcon />}
          sx={{
            borderColor: 'rgba(148,163,184,0.5)',
            color: '#e5e7eb',
            textTransform: 'none',
            '&:hover': {
              borderColor: '#960fbc',
              backgroundColor: 'rgba(15,23,42,0.85)',
            },
          }}
        >
          Sign in with Facebook
        </Button>
      </Box>
    </Card>
  );
}
