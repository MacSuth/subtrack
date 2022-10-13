import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/system';
import ServiceTable from './ServiceTable';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        <h1 className='header'>Your Subs</h1>
      </Container>
      <Container>
        <ServiceTable/>
      </Container>
    </ThemeProvider>
  );
}

export default App;
