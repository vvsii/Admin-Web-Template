import type { FileUploadResponse, ServerResponse } from '.';
import client from './request';

const FileUpload = (file: FormData): ServerResponse<FileUploadResponse> =>
  client.put('/v1/files', file);

export { FileUpload };
