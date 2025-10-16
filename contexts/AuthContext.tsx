"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentProfile, onAuthStateChange } from '@/lib/auth';
import { Profile } from '@/lib/supabase';

interface AuthContextType {
  user: any;
  profile: Profile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async () => {
    try {
      const profileData = await getCurrentProfile();
      setProfile(profileData);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile(null);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await refreshProfile();
      } catch (error) {
        console.error('Auth error:', error);
      } finally {
        setLoading(false);
      }
    })();

    onAuthStateChange(async (user) => {
      setUser(user);
      if (user) {
        await refreshProfile();
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
