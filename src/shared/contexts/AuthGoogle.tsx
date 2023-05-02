import React, { createContext, useEffect, useState } from 'react';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { app } from '../services/api/auth/firebaseConfig';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface IAuthGoogle {
  children: React.ReactNode;
}
const provider = new GoogleAuthProvider();
export const AuthGoogleContext = createContext({});

export const AuthGoogleProvider: React.FC<IAuthGoogle> = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openError, setOpenError] = useState<any>();
  const [createUser, setCreateUser] = useState('');
  const {t} = useTranslation();
  

  useEffect(() => {
    const loadStoreAuth = () => {
      const sessionToken = sessionStorage.getItem('AccessToken');
      const sessionUser: any = sessionStorage.getItem('User');

      if (sessionToken && sessionUser) {
        setUser(sessionUser);
      }
    };

    loadStoreAuth();
  }, [email, password, openError, createUser, t]);

  const signInGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token: any = credential?.accessToken;
        const user: any = result?.user;
        setUser(user);
        sessionStorage.setItem('AccessToken', token);
        sessionStorage.setItem('User', JSON.stringify(user));
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  const sign = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user: any = userCredential.user;
        const token: any = user.stsTokenManager.accessToken;
        setUser(user);
        sessionStorage.setItem('AccessToken', token);
        sessionStorage.setItem('User', JSON.stringify(user));
        
      })
      .catch((error) => {
        const errorCode = error.code;
        // console.log(error);
        if (errorCode == 'auth/too-many-requests') {
          return setOpenError(t('asSolicitacoesForamBloqueadas'));
        } else if (errorCode == 'auth/invalid-email') {
          return setOpenError(t('oEnderecoDeEmailNaoEValido'));
        } else if (errorCode == 'auth/wrong-password') {
          return setOpenError(t('senhaIncorreta'));
        } else if (errorCode == 'auth/internal-error') {
          return setOpenError(t('erroInesperado'));
        } else if (errorCode == 'auth/weak-password') {
          return setOpenError(t('senhaMuitoFraca'));
        } else if (errorCode == 'auth/missing-email') {
          return setOpenError(t('emailObrigatorio'));
        } else if (errorCode == 'auth/invalid-password') {
          return setOpenError(t('aSenhaPrecisaTerPeloMenosSeisCaracteres'));
        } else if (errorCode == 'auth/user-not-found') {
          return setOpenError(t('usuarioNaoExiste'));
        } else {
          return false;
        }
      });
  };

  const signedUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
   
        const user: any = userCredential.user;
        setCreateUser(user);

      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode == 'auth/email-already-in-use') {
          return setOpenError(t('jaExisteUmaContaComEsseEmail'));
        } else if (errorCode == 'auth/invalid-email') {
          return setOpenError(t('oEnderecoDeEmailNaoEValido'));
        } else if (errorCode == 'auth/credential-already-in-use') {
          return setOpenError(t('jaExisteUmaContaParaEstaCredencial'));
        } else if (errorCode == 'auth/internal-error') {
          return setOpenError(t('erroInesperado'));
        } else if (errorCode == 'auth/weak-password') {
          return setOpenError(t('senhaMuitoFraca'));
        } else if (errorCode == 'auth/missing-email') {
          return setOpenError('O email é obrigatório!');
        } else if (errorCode == 'auth/invalid-password') {
          return setOpenError(t('emailObrigatorio'));
        } else {
          return null;
        }
      });
  };

  function signOut() {
    sessionStorage.clear();
    setUser(null);
    document.location.reload();
    return <Navigate to='/' />;
  }
  return (
    <AuthGoogleContext.Provider
      value={{
        signInGoogle,
        signed: !!user,
        user,
        signOut,
        sign,
        email,
        password,
        setEmail,
        setPassword,
        signedUser,
        openError,
        createUser,
      }}
    >
      {children}
    </AuthGoogleContext.Provider>
  );
};
