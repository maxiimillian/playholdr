import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/router';
import * as userApi from '../../api/user';

export function AuthProvider({ children }: { children: any }) {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState();

  const router = useRouter();
}
