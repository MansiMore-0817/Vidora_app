import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/material/styles';
import { SitemarkIcon } from './CustomIcons.jsx';
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

export default function SignUpCard() {
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = React.useState('');
  const [apiError, setApiError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { handleRegister } = React.useContext(AuthContext) || {};

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiError('');
    if (nameError || usernameError || passwordError || confirmPasswordError) {
      return;
    }
    const data = new FormData(event.currentTarget);
    const name = data.get('name');
    const username = data.get('username');
    const password = data.get('password');
    if (handleRegister) {
      try {
        await handleRegister(name, username, password);
      } catch (err) {
        const errorMsg = err?.response?.data?.message || err?.message || 'Registration failed. Please try again.';
        setApiError(errorMsg);
        console.error('Register error:', err);
      }
    }
  };

  const validateInputs = () => {
    const name = document.getElementById('name');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    let isValid = true;

    if (!name.value || name.value.length < 2) {
      setNameError(true);
      setNameErrorMessage('Name must be at least 2 characters long.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    if (!username.value || username.value.length < 3) {
      setUsernameError(true);
      setUsernameErrorMessage('Username must be at least 3 characters long.');
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!confirmPassword.value || confirmPassword.value !== password.value) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage('Passwords do not match.');
      isValid = false;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage('');
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
        Sign up
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
        <FormControl>
          <FormLabel sx={{ color: 'rgba(226,232,240,0.9)' }} htmlFor="name">
            Full Name
          </FormLabel>
          <TextField
            error={nameError}
            helperText={nameErrorMessage}
            id="name"
            type="text"
            name="name"
            placeholder="John Doe"
            autoComplete="name"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={nameError ? 'error' : 'primary'}
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
          <FormLabel sx={{ color: 'rgba(226,232,240,0.9)' }} htmlFor="username">
            Username
          </FormLabel>
          <TextField
            error={usernameError}
            helperText={usernameErrorMessage}
            id="username"
            type="text"
            name="username"
            placeholder="your-username"
            autoComplete="username"
            required
            fullWidth
            variant="outlined"
            color={usernameError ? 'error' : 'primary'}
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
          <FormLabel sx={{ color: 'rgba(226,232,240,0.9)' }} htmlFor="password">
            Password
          </FormLabel>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
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

        <FormControl>
          <FormLabel sx={{ color: 'rgba(226,232,240,0.9)' }} htmlFor="confirmPassword">
            Confirm Password
          </FormLabel>
          <TextField
            error={confirmPasswordError}
            helperText={confirmPasswordErrorMessage}
            name="confirmPassword"
            placeholder="••••••"
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            autoComplete="new-password"
            required
            fullWidth
            variant="outlined"
            color={confirmPasswordError ? 'error' : 'primary'}
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
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </FormControl>

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
          Sign up
        </Button>

        {apiError && (
          <Typography sx={{ color: 'error.main', fontSize: '0.875rem', textAlign: 'center' }}>
            {apiError}
          </Typography>
        )}

        <Typography sx={{ textAlign: 'center', color: 'rgba(226,232,240,0.9)' }}>
          Already have an account?{' '}
          <span>
            <Link
              component="a"
              href="/auth"
              variant="body2"
              sx={{ alignSelf: 'center', cursor: 'pointer' }}
            >
              Sign in
            </Link>
          </span>
        </Typography>
      </Box>
    </Card>
  );
}
