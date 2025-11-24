import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { token } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true, state: { from: location } });
    }
  }, [token, navigate, location]);

  if (!token) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
