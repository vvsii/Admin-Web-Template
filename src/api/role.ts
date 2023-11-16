import type { ServerResponse, RoleResponse, RoleParams, RoleListResponse } from '.';
import client from './request';

const queryRole = (data?: RoleParams): ServerResponse<RoleListResponse[]> =>
  client.get('/v1/roles', { params: data });
const queryRoleInfo = (id: number): ServerResponse<RoleResponse> => client.get(`/v1/roles/${id}`);

const createRole = (data: RoleResponse): ServerResponse<void> => client.post('/v1/roles', data);
const updateRole = (data: RoleResponse): ServerResponse<void> => client.patch('/v1/roles', data);
const deleteRole = (id: number): ServerResponse<void> => client.delete(`/v1/roles/${id}`);

export { createRole, updateRole, deleteRole, queryRole, queryRoleInfo };
