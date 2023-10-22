import { Token } from 'typescript';

interface Response {
  status: boolean;
  statusCode: number;
  ok: boolean;
  content: string;
}

interface TokenResponse extends Response {
  token: string;
}

interface UserResponse extends Response {
  name: string;
}

export function getLocalToken() {
  return localStorage.getItem('token');
}

function setLocalToken(token: string) {
  localStorage.setItem('token', token);
}

export function getDefaultHeaders(): any {
  const token = getLocalToken();
  return {
    'Content-Type': 'application/json',
    Authorization: token,
  };
}

function defaultRoutehandler<Type>(path: string): Promise<Type> {
  return fetch(`${process.env.API_URL}/${path}`, {
    method: 'POST',
    headers: getDefaultHeaders(),
  }).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export function getNewToken(): Promise<TokenResponse> {
  const url = '/auth/refresh';
  return defaultRoutehandler(url);
}

function getProfile(): Promise<UserResponse> {
  const url = '/auth/profile';
  return defaultRoutehandler(url);
}

export async function getUser() {
  let token = getLocalToken();
  if (!token) {
    const tokenResponse: TokenResponse = await getNewToken();
    token = tokenResponse.token;
    setLocalToken(token);
  }

  const userResponse: UserResponse = await getProfile();
  return { token, profile: { name: userResponse.name } };
}

export function register() {}

export function login() {}

export function logout() {}
