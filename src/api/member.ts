import type {
  ServerResponse,
  Pagination,
  MemberParams,
  MemberListResponse,
  MemberStateBody,
  AgentLinkParams,
  AgentLinkResponse,
  MemberPerformanceParams,
  resetPassBody,
  LevelListResponse,
  DisableTeamBody
} from '.';
import client from './request';

const memberList = (params: MemberParams): ServerResponse<MemberListResponse[]> =>
  client.get('/v1/members', { params });

const activeAudit = (params: Pagination): ServerResponse<MemberListResponse[]> =>
  client.get('/v1/members/actives', { params });

const memberState = (body: MemberStateBody): ServerResponse<void> =>
  client.post('/v1/members/state', body);

const deleteMember = (uid: number): ServerResponse<void> => client.delete(`/v1/members/${uid}`);
const deleteTeam = (uid: number): ServerResponse<void> => client.delete(`/v1/members/team/${uid}`);

const agentLink = (params: AgentLinkParams): ServerResponse<AgentLinkResponse[]> =>
  client.get('/v1/members/agentLink', { params });

const memberPerformance = (params: MemberPerformanceParams): ServerResponse<AgentLinkResponse[]> =>
  client.get('/v1/members/performances', { params });

const disableTeam = (body: DisableTeamBody): ServerResponse<void> =>
  client.post('/v1/members/disableTeam', body);

const ResetPass = (body: resetPassBody): ServerResponse<void> => client.patch('/v1/members', body);

const resetTransactionPassword = (body: resetPassBody): ServerResponse<void> =>
  client.patch('/v1/members/transaction/password', body);

const levelList = (): ServerResponse<LevelListResponse[]> => client.get('/v1/members/level');

const updateLevel = (body: resetPassBody): ServerResponse<void> =>
  client.patch('/v1/members/level', body);

const syncWalletUsdt = (uid: number): ServerResponse<void> =>
  client.post(`/v1/members/syncUSDT/${uid}`);

export {
  memberList,
  memberState,
  deleteMember,
  agentLink,
  ResetPass,
  resetTransactionPassword,
  levelList,
  updateLevel,
  memberPerformance,
  disableTeam,
  syncWalletUsdt,
  activeAudit,
  deleteTeam
};
