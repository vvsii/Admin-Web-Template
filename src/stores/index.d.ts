/**
 * token正文
 */
export interface TokenPayload {
  /** 接收此token的机构或个人标识	Z */
  aud: number;
  /** 用户id */
  sub: number;
  /** 签发此token的机构标识 */
  iss: string;
  /** 签发时间 */
  iat: number;
  /** 过期时间 */
  exp: number;
}

/**
 * 身份标识数据
 */
export interface AuthState {
  /** 身份token */
  token?: string;
  /** 刷新用身份token */
  refresh?: string;
  /** 身份数据 */
  payload?: TokenPayload;
  /** 刷新用身份数据 */
  refreshPayload?: TokenPayload;
}

export interface ProfileMenus {
  id: number;
  name: string;
  type: MenuType;
  parentId?: number;
  privilege?: string;
  i18n?: string;
  url?: string;
  path?: string;
  meta?: string;
  sort: number;
  children?: ProfileMenus[];
}

export interface BankInfoApplyResponse {
  id: number;
  uid: number;
  type: number;
  bankName: string;
  cardNumber: string;
  cardName: string;
  amount: number;
  remark: string;
  state: number;
  cdt: number;
  udt: number;
}
