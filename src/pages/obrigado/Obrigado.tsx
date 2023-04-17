import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  ImageListItem,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Obrigado = () => {
  return (
    <Box width='100%' display='flex'>
      <Grid container margin={3} textAlign='center'>
        <Grid item container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '30%',
              }}
            >
              <CardContent>
                <ImageListItem sx={{ marginBottom: 2 }}>
                  <Typography>
                    Obrigado por entrar em contato conosco.
                  </Typography>
                </ImageListItem>
                <Button variant="contained" color='error' startIcon={<ArrowBackIcon />}>
                  <Link to='/contato' style={{textDecoration: 'none', color: 'white'}}>Voltar</Link>
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Obrigado;
