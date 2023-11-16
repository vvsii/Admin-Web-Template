import type {
  CommonConfigBody,
  CommonConfigParams,
  CommonConfigResponse,
  EnabledCommonConfigBody,
  ServerResponse,
  UpdCommonConfigBody
} from '.';
import client from './request';

const commonConfigList = (params: CommonConfigParams): ServerResponse<CommonConfigResponse[]> =>
  client.get('/v1/commonConfig', { params });
const createCommonConfig = (body: CommonConfigBody): ServerResponse<CommonConfigResponse> =>
  client.post('/v1/commonConfig', body);
const updateCommonConfig = (body: UpdCommonConfigBody): ServerResponse<CommonConfigResponse> =>
  client.patch('/v1/commonConfig', body);
const enabledCommonConfig = (body: EnabledCommonConfigBody): ServerResponse<CommonConfigResponse> =>
  client.patch('/v1/commonConfig/enabled', body);

export { commonConfigList, createCommonConfig, updateCommonConfig, enabledCommonConfig };
