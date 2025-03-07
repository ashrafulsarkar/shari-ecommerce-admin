"use client";

import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { RootState } from './../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedIn } from '@/redux/auth/authSlice';

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [authChecked, setAuthChecked] = useState<boolean>(false);

  useEffect(() => {
    // Only run this once when the component mounts
    const checkAuth = () => {
      const localAuth = Cookies.get('admin');

      if (localAuth) {
        try {
          const auth = JSON.parse(localAuth);

          if (auth?.accessToken && auth?.user) {
            dispatch(
              userLoggedIn({
                accessToken: auth.accessToken,
                user: auth.user,
              })
            );
          }
        } catch (error) {
          console.error("Error parsing auth cookie:", error);
        }
      }

      // Important: Always set authChecked to true, even if there's an error
      setAuthChecked(true);
    };

    // Slight delay to ensure this doesn't interfere with rendering
    setTimeout(checkAuth, 0);

    // Clean-up function not needed here, but good practice
    return () => {};
  }, [dispatch]);

  return {
    authChecked,
    user,
  };
}