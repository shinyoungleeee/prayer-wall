import netlifyIdentity, { User } from 'netlify-identity-widget';
import { useEffect, useMemo, useState } from 'react';

const signUp = () => netlifyIdentity.open('signup');
const logIn = () => netlifyIdentity.open('login');
const logOut = () => netlifyIdentity.logout();
const close = () => netlifyIdentity.close();

export const useAuth = () => {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<Error>();
  const authenticated = useMemo(() => Boolean(user?.token), [user?.token]);

  useEffect(() => {
    if (window?.document?.body) {
      netlifyIdentity.on('login', (u) => {
        setUser(u);
        setError(null);
      });

      netlifyIdentity.on('logout', () => {
        setUser(null);
        setError(null);
      });

      netlifyIdentity.on('error', (err) => {
        setError(err);
        console.error('Error', err);
      });

      netlifyIdentity.init();
    }
  }, []);

  return { authenticated, error, signUp, logIn, logOut, close };
};
