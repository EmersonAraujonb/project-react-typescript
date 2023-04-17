import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import { AuthGoogleContext } from '../../contexts/AuthGoogle';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  textAlign: 'center',
  boxShadow: 24,
  p: 4,
};

function Welcome() {
  const { signed }: any = useContext(AuthGoogleContext);
  const sessionUser: any = sessionStorage.getItem('User');
  const dados = JSON.parse(sessionUser);
  const user = dados?.displayName;
  const email = dados?.email;

  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const hasShownWelcomeMessage = sessionStorage.getItem(
      'hasShownWelcomeMessage'
    );

    if (!hasShownWelcomeMessage && signed) {
      setShowMessage(true);
      sessionStorage.setItem('hasShownWelcomeMessage', 'true');
    }
  }, [signed]);

  return (
    <>
      {showMessage && sessionUser ? (
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                variant='h6'
                component='h2'
              >
                Bem-vindo!
              </Typography>
              <Typography sx={{ mt: 2 }}>
                Olá,{' '}
                {user ? (
                  <>
                    <strong>{user}</strong>
                  </>
                ) : (
                  <>
                    usuário do e-mail: <strong>{email}</strong>
                  </>
                )}
                ! Obrigado por visitar a página <strong>WEB CADASTRO</strong>.
              </Typography>
            </Box>
          </Fade>
        </Modal>
      ) : null}
    </>
  );
}

export default Welcome;
