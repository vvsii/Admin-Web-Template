import type { ServerResponse, TokenResponse, LoginBody, RefreshBody } from '.';

import { create } from './request';

const authClient = create();

const login = (body: LoginBody): ServerResponse<TokenResponse> =>
  authClient.post('/v1/auth/login', body);
const refresh = (body: RefreshBody): ServerResponse<TokenResponse> =>
  authClient.post('/v1/auth/refresh', body);

export { login, refresh };
