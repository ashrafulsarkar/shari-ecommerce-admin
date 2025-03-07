'use client';

import { store } from './store'; // Import your pre-configured Redux store
import { Provider } from 'react-redux';
import { useRef, useEffect } from 'react';
import AuthCom from '@/app/components/auth/auth-com'; // Import the AuthCom component for authentication logic
import { Toaster } from 'sonner'; // Import Toaster for displaying toast notifications

export function Providers({ children }: { children: React.ReactNode }) {
  // Create a ref to store the Redux store instance
  const storeRef = useRef(store); // Directly use the initialized store from `store`

  // Make sure this code only runs on the client side and doesn't update state during render
  useEffect(() => {
    // You can dispatch actions or perform any logic here after mounting if needed
    // Example: storeRef.current.dispatch(someAction());
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <Provider store={storeRef.current}> {/* Use the store reference in Provider */}
      <AuthCom> {/* Wrap the children with AuthCom for authentication */}
        {children} {/* Render the children inside AuthCom */}
      </AuthCom>
      <Toaster /> {/* Add Toaster for toast notifications */}
    </Provider>
  );
}
