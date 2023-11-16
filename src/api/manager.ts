import type {
  ServerResponse,
  ManagerOperateLogParams,
  ManagerOperateLogResponse,
  ManagerParam,
  ManagerParams,
  ManagerEnableBody,
  ManagerListResponse,
  ManagerResponse,
  MnagerLoginLogResponse,
  ManagerUpdateBody,
  ManagerChangePasswordBody,
  MyRoleResponse,
  CheckPasswordBody,
  ChangePasswordHistoryRequest,
  ChangePasswordHistoryResponse
} from '.';
import client from './request';

const myRole = (): ServerResponse<MyRoleResponse[]> => client.get('/v1/managers/myRole');
const managerList = (params: ManagerParams): ServerResponse<ManagerListResponse[]> =>
  client.get('/v1/managers', { params });
const managerInfo = (id: number): ServerResponse<ManagerResponse> =>
  client.get(`/v1/managers/${id}`);
const managerEnabled = (body: ManagerEnableBody): ServerResponse<void> =>
  client.post('/v1/managers/enable', body);
const managerOperateLog = (
  params: ManagerOperateLogParams
): ServerResponse<ManagerOperateLogResponse[]> =>
  client.get('/v1/managers/operateLogs', { params });
const managerSignUp = (body: ManagerUpdateBody): ServerResponse<void> =>
  client.post('/v1/managers/signUp', body);
const managerUpdate = (body: ManagerUpdateBody): ServerResponse<void> =>
  client.patch('v1/managers', body);
const managerLoginLog = (params: ManagerParam): ServerResponse<MnagerLoginLogResponse[]> =>
  client.get('/v1/managers/signHistory', { params });
const managerChangePassword = (body: ManagerChangePasswordBody): ServerResponse<void> =>
  client.post('/v1/managers/password', body);
const checkPassword = (body: CheckPasswordBody): ServerResponse<void> =>
  client.post('/v1/managers/checkPassword', body);
const changePasswordHistory = (
  params: ChangePasswordHistoryRequest
): ServerResponse<ChangePasswordHistoryResponse[]> =>
  client.get('/v1/managers/changePassword', { params });

export {
  myRole,
  managerList,
  managerInfo,
  managerUpdate,
  managerEnabled,
  managerSignUp,
  managerLoginLog,
  managerOperateLog,
  managerChangePassword,
  checkPassword,
  changePasswordHistory
};
