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
  const [openError, setOpenError] = useState('');
  const [createUser, setCreateUser] = useState('');
  

  useEffect(() => {
    const loadStoreAuth = () => {
      const sessionToken = sessionStorage.getItem('AccessToken');
      const sessionUser: any = sessionStorage.getItem('User');

      if (sessionToken && sessionUser) {
        setUser(sessionUser);
        
      }
      
    };

    loadStoreAuth();
  }, [email, password, openError, createUser]);

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
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
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
        const errorMessage = error.message;
        if (errorCode == 'auth/too-many-requests') {
          return setOpenError(
            'As solicitações foram bloqueadas devido a atividades incomuns. Tente novamente depois que algum tempo.'
          );
        } else if (errorCode == 'auth/invalid-email') {
          return setOpenError('O endereço de e-mail não é válido.');
        } else if (errorCode == 'auth/wrong-password') {
          return setOpenError('Senha incorreta.');
        } else if (errorCode == 'auth/internal-error') {
          return setOpenError(
            'O servidor de autenticação encontrou um erro inesperado ao tentar processar a solicitação.'
          );
        } else if (errorCode == 'auth/weak-password') {
          return setOpenError('A senha é muito fraca.');
        } else if (errorCode == 'auth/missing-email') {
          return setOpenError('O email é obrigatório!');
        } else if (errorCode == 'auth/invalid-password') {
          return setOpenError(
            'A senha é inválida, precisa ter pelo menos 6 caracteres'
          );
        } else if (errorCode == 'auth/user-not-found') {
          return setOpenError('Usuário não existe.');
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
        const errorMessage = error.message;
        if (errorCode == 'auth/email-already-in-use') {
          return setOpenError(
            'Já existi uma conta com o endereço de email fornecido.'
          );
        } else if (errorCode == 'auth/invalid-email') {
          return setOpenError('O endereço de e-mail não é válido.');
        } else if (errorCode == 'auth/credential-already-in-use') {
          return setOpenError('Já existe uma conta para esta credencial.');
        } else if (errorCode == 'auth/internal-error') {
          return setOpenError(
            'O servidor de autenticação encontrou um erro inesperado ao tentar processar a solicitação.'
          );
        } else if (errorCode == 'auth/weak-password') {
          return setOpenError('A senha é muito fraca.');
        } else if (errorCode == 'auth/missing-email') {
          return setOpenError('O email é obrigatório!');
        } else if (errorCode == 'auth/invalid-password') {
          return setOpenError(
            'A senha é inválida, precisa ter pelo menos 6 caracteres'
          );
        } else {
          return null;
        }
      });
  };

  function signOut() {
    sessionStorage.clear();
    setUser(null);
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
