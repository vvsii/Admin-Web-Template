import { MemberState, IdentityState, MenuType } from './enum';

/**
 * API响应数据载体
 */
export interface ApiResponse<T> {
  /** 业务码 */
  code: number;
  /** 文字说明 */
  description: string;
  /** 具体业务数据 */
  result?: T;
  /** 列表数据的数据量 */
  records: number;
}

/**
 * 统一响应数据载体
 */
export type ServerResponse<T> = Promise<AxiosResponse<ApiResponse<T>>>;

/**
 * API请求分页能用数据载体
 */
export interface Pagination {
  /** 页码 */
  page?: number;
  /** 限制 */
  limit?: number;
  sorts?: string;
}

/**
 * Token相关数据响应体
 */
export interface TokenResponse {
  /** 身份token */
  token: string;
  /** 刷新用身份token */
  refresh: string;
  /** 身份token过期时间 */
  expire: number;
  /** 刷新用身份token过期时间 */
  refreshExpire: number;
}

/**
 * 登录请求体
 */
export interface LoginBody {
  /** 用户名 */
  name: string;
  /** 密码 */
  password: string;
}

/**
 * 刷新token请求体
 */
export interface RefreshBody {
  /** 刷新token */
  token: string;
}

export interface MyRoleResponse {
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
}

/**
 * 会员列表查询参数
 */
export interface MemberParams extends Pagination {
  id?: number;
  name?: string;
  mobileInviter?: string;
  address?: string;
  level?: number;
  mobile?: string;
  state?: MemberState;
  walletType?: number;
  bc?: number;
  ec?: number;
  active?: boolean;
}

export interface ManagerParam extends Pagination {
  uid?: string;
}

/**
 * 会员列表响应体
 */
export interface MemberListResponse {
  id: number;
  name: string;
  passPostName: string;
  passPostCode: string;
  mobile: string;
  mobileInviter: any;
  hasProduct: boolean;
  balanceUSDT: number;
  balanceCIPS: number;
  balanceYUAN: number;
  address: string[];
  point: number;
  activityPoint: number;
  enabledWithdraw: boolean;
  state: number;
  cdt: number;
}

/**
 * level
 */
export interface LevelListResponse {
  level: number;
}

/**
 * 会员状态修改请求体
 */
export interface MemberStateBody {
  /** 用户ID */
  uid: number;
  /** 状态 */
  state: MemberState;
}

/**
 * Member param
 */
export interface ManagerParams extends Pagination {
  name?: string;
  enabled: boolean;
}

/**
 * Manager enable body
 */
export interface ManagerEnableBody {
  /** 用户ID */
  uid: number;
  /** 状态 */
  enabled: boolean;
}

/**
 * Manager list response body
 */
export interface ManagerListResponse {
  /** id */
  id: number;
  /** 用户名 */
  name: string;
  /** 是否启用 */
  enabled: boolean;
  /** 创建时间 */
  cdt: number;
}

export interface ManagerUpdateBody {
  id?: number;
  name?: string;
  password?: string;
  confirm?: string;
  enabled: boolean | string;
  roleIds?: number[];
}

export interface ManagerResponse {
  id?: number;
  name?: string;
  enabled: boolean;
  roleIds?: number[];
}

/**
 * operateLog params
 */
export interface ManagerOperateLogParams extends Pagination {
  code?: string;
  enabled?: boolean;
}

/**
 * Manager operate log response body
 */
export interface ManagerOperateLogResponse {
  /** id */
  id: number;
  /** atTime */
  atTime: string;
  /** ipv4 */
  ipv4: string;
  /** before */
  before: string;
  /** after */
  after: string;
  /** 创建时间 */
  cdt: number;
}

export interface ManagerListResponse {
  id: number;
  name: string;
  enabled: boolean;
  cdt: number;
}

export interface MnagerLoginLogResponse {
  id: number;
  uid: string;
  in_time: number;
  ipv4: string;
  ua: string;
}

export interface ChangePasswordHistoryRequest extends Pagination {
  mobile?: string;
  type?: number;
  operateType?: number;
}

export interface ChangePasswordHistoryResponse {
  name: string;
  mobile: string;
  type: number;
  operateType: number;
  ip: string;
  cdt: number;
}

export interface ManagerStateBody {
  uid: number;
  enabled: Boolean;
}

export interface ProductParams extends Pagination {
  id?: number;
  name?: string;
  type?: number;
  walletType?: number;
  state?: number;
  enabled?: boolean;
}

export interface ProductRequest {
  sort: number;
  images: string;
  name: string;
  type: number;
  price: number;
  walletType: number;
  cycle: number;
  earningsYield: number;
  purchaseMethod: number;
  allowRepeatPurchase: boolean;
  dailyRebate: boolean;
  activity: number;
  point: number;
  debtFund: number;
  state: number;
  quantities: number;
  progress: number;
  price: number;
  cycle: number;
}

export interface ProductResponse {
  id: number;
  srot: number;
  images: string;
  name: string;
  totalBuy: number;
  price: number;
  walletType: number;
  cycle: number;
  earningsYield: number;
  purchaseMethod: number;
  allowRepeatPurchase: boolean;
  dailyRebate: boolean;
  activity: number;
  point: number;
  debtFund: number;
  state: number;
  quantities: number;
  progress: number;
  enabled: boolean;
  cdt: number;
  udt: number;
}

export interface UpdProductRequest {
  id: number;
  sort: number;
  name: string;
  images: string;
  earningsYield: number;
  purchaseMethod: number;
  allowRepeatPurchase: boolean;
  dailyRebate: boolean;
  activity: number;
  point: number;
  debtFund: number;
  state: number;
  quantities: number;
  progress: number;
  price: number;
  cycle: number;
}

export interface ProductApplyRequest {
  uids: number[];
  productId: number;
}

export interface CloseProductApplyRequest {
  applyId: number;
}
export interface ProductApplyParams extends Pagination {
  uid?: number;
  name?: string;
  mobile?: string;
  bc?: number;
  ec?: number;
  walletType?: number;
  count?: number;
  unCount?: number;
  state?: number;
}

export interface ProductApplyResponse {
  id: number;
  orderId: number;
  end: number;
  uid: number;
  name: string;
  mobile: string;
  balanceUSDT: number;
  balanceCIPS: number;
  balanceYUAN: number;
  cdt: number;
  state: number;
}

export interface ProductApplyTotalResponse {
  count: number;
  ordered: number;
  today: number;
}

/**
 * change state on or off
 */
export interface ProductEnabledBody {
  /* product ID */
  ids: number[];
  /* product state */
  enabled: boolean;
}

export interface CommonConfigBody {
  key: string;
  value: string;
  title: string;
}

export interface CommonConfigResponse {
  id: number;
  key: string;
  value: string;
  title: string;
  enabled: boolean;
  cdt: number;
}

export interface CommonConfigParams extends Pagination {
  key?: string;
  enabled?: boolean;
}

export interface UpdCommonConfigBody {
  id: number;
  key?: string;
  value?: string;
  title?: string;
}

export interface EnabledCommonConfigBody {
  id: number;
  enabled: boolean;
}

/**
 * identity param
 */
export interface identityParams extends Pagination {
  uid?: number;
  mobile?: string;
  passportCode?: string;
  state?: IdentityState;
}

/**
 * identity response body
 */
export interface IdentityListResponse {
  uid: number;
  name: string;
  passportCode: string;
  state: IdentityState;
  cdt: number;
  udt: number;
}

export interface OrderResponse {
  id: number;
  uid: number;
  name: string;
  mobile: string;
  productId: number;
  productPrice: number;
  productType: number;
  walletType: number;
  earningYield: number;
  begin: string;
  end: string;
  extendEnd: number;
  cycle: number;
  extendCycle: number;
  dailyRebate: boolean;
  paid: number;
  activity: number;
  point: number;
  debtFund: number;
  state: number;
  expire: boolean;
  cdt: number;
}

export interface OrderTotalResponse {
  count: number;
  amount: number;
}

export interface OrderListResponse {
  id: number;
  uid: number;
  mobile: string;
  productId: number;
  productPrice: number;
  earningYield: number;
  begin: string;
  end: string;
  extendEnd: string;
  cycle: number;
  extendCycle: number;
  paid: number;
  activity: number;
  point: number;
  state: number;
  cdt: number;
}

export interface OrderParams extends Pagination {
  id?: number;
  uid?: number;
  name?: string;
  mobile?: string;
  productType?: number;
  dailyRebate?: boolean;
  state?: number;
  begin?: string;
  end?: string;
}

export interface UpdateOrder {
  id: number;
  state: number;
}
export interface UpdateOrderList {
  updateId: number[];
  state: number;
}

export interface ExtendOderBody {
  id: number;
  extendEnd: string;
}

export interface CloseOderBody {
  ids: number[];
}

export interface AnnouncementBody {
  title: string;
  content: string;
}

export interface UpdAnnouncementBody {
  id: number;
  title: string;
  content: string;
}

export interface EnabledAnnouncementBody {
  id: number;
  enabled: boolean;
}

export interface AnnouncementParams extends Pagination {
  uid?: number;
  enabled?: boolean;
}

export interface AnnouncementResponse {
  id: number;
  title: string;
  content: string;
  enabled: boolean;
  cdt: number;
  udt: number;
}
export interface ExchangeRateBody {
  from: number;
  to: number;
  rate: number;
}

export interface UpdExchangeRateBody {
  from: number;
  to: number;
  rate: number;
}

export interface EnabledExchangeRateBody {
  from: number;
  to: number;
  enabled: boolean;
}

export interface ExchangeRateParams extends Pagination {
  from: number;
  to: number;
  enabled: boolean;
}

export interface ExchangeRateResponse {
  from: number;
  to: number;
  rate: number;
  enabled: boolean;
  cdt: number;
  udt: number;
}

export interface IdentityStateBody {
  uid: number;
  state: MemberState;
}

export interface RebateParams extends Pagination {
  uid?: number;
  name?: string;
  mobile?: string;
  pid?: number;
  date?: string;
}

export interface RebateResponse {
  uid: number;
  pid: number;
  productName: string;
  date: string;
  commission: number;
  timeBuyOrder: number;
  name: string;
  mobile: string;
}
export interface DepositRequest {
  uid: number;
  amount: number;
  walletType: number;
}

export interface EnabledWithdrawBody {
  uid?: number;
  enabled: boolean;
  all?: boolean;
}

/**
 * transaction param
 */
export interface transactionParams extends Pagination {
  uid?: number;
  name?: string;
  mobile?: string;
  mobileInviter?: string;
  date?: string;
  type?: number;
  walletType?: number;
  state?: number;
}

/**
 * transaction response body
 */
export interface transactionResponse {
  id: number;
  uid: number;
  username: string;
  mobile: string;
  bankName: string;
  cardNumber: string;
  cardName: string;
  type: number;
  walletType: number;
  txId: string;
  fromAddress: string;
  toAddress: string;
  currency: number;
  transferUid: number;
  eventType: number;
  amount: number;
  before: number;
  after: number;
  state: number;
  cdt: number;
  udt: number;
}

export interface transactionTypeBody {
  uid: number;
  type: number;
  walletType: number;
  state: number;
}

export interface AgentLinkResponse {
  uid: number;
  mobile: string;
  mobileInviter: string;
  hasProduct: boolean;
  passportName: string;
  passportCode: string;
  teamCount: number;
  bottomTeamCount: number;
  commission: number;
  performance?: number[];
  cdt: number;
}

export interface AgentLinkParams extends Pagination {
  uid: number;
  name?: string;
  mobile?: string;
  m?: string;
  level?: number;
}

export interface MemberPerformanceParams extends Pagination {
  uid?: number; // 用户id
  m?: string; // 手机
  pm?: string; // 上级手机
  bp?: number; // 最小业绩
  ep?: number; // 最大业绩
  bc?: number; // 最小提成
  ec?: number; // 最大提成
}

export interface DisableTeamBody {
  uid: number; // 用户id
  disable: boolean; // 启用/禁用
  changeCode: boolean; // 是否修改邀请码
}

export interface FileUploadResponse {
  link: string;
  size: number;
}

export interface CarosuelRequest {
  title: string;
  image: string;
  number: number;
}

export interface CarosuelResponse {
  title: string;
  image: string;
  number: number;
  enabled: boolean;
  cdt: number;
  udt: number;
}

export interface UpCarouselRequest {
  id: number;
  title: string;
  image: string;
  number: number;
}

export interface CarouselParams extends Pagination {
  enabled?: boolean;
}

export interface EnabledCarouselBody {
  id: number;
  enabled: boolean;
}

export interface NotificationsRequest {
  all: boolean;
  uid: string;
  title: string;
  content: string;
}
export interface NotificationsParams extends Pagination {
  uid?: string;
  title?: string;
}

export interface NotificationsResponse {
  id: number;
  uid: number;
  title: string;
  content: string;
  cdt: number;
  udt: number;
}

export interface resetPassBody {
  id: number;
  password: string;
}

export interface levelBody {
  id: number;
  level: number;
}

export interface editIndentityBody {
  uid: number;
  name: string;
  passportCode: string;
}

export interface ReportDailyResponse {
  totalRegister: number;
  registerToday: number;
  totalActive: number;
  todayActive: number;
  totalDepositYUAN: number;
  totalDepositUSDT: number;
  todayDepositYUAN: number;
  todayDepositUSDT: number;
  totalWithdrawYUAN: number;
  totalWithdrawUSDT: number;
  todayWithdrawYUAN: number;
  todayWithdrawUSDT: number;
}
/**
 * report param
 */
export interface reportParams extends Pagination {
  uid?: number;
  type?: number;
  walletType?: number;
  startDate?: string;
  endDate?: string;
}

export interface reportDailyParams {
  date: string;
}

export interface reportUserParams extends Pagination {
  uid?: number;
}
/**
 * report response body
 */
export interface reportResponse {
  date: string;
  type: number;
  walletType: number;
  eventType: number;
  amount: number;
}

export interface ManagerChangePasswordBody {
  cur: string;
  latest: string;
}
export interface CheckPasswordBody {
  password: string;
}

export interface BankInfoParams extends Pagination {
  bankName?: string;
  enabled?: boolean;
}
export interface BankInfoApplyParams extends Pagination {
  id?: number;
  uid?: number;
  name?: string;
  passportName?: string;
  cardNumber?: string;
  mobile?: string;
  mobileInviter?: string;
  type?: number;
  state?: number;
  date?: string;
}
export interface UpdBankInfoStateBody {
  ids: number[];
  state: number;
  force: boolean;
}

export interface BankInfoApplyResponse {
  id: number;
  uid: number;
  name: string;
  mobile: string;
  bankName: string;
  fromAddress: string;
  toAdress: string;
  cardNumber: number;
  cardName: string;
  bankNumber: number;
  amount: number;
  type: number;
  state: number;
  cdt: number;
  udt: number;
}

export interface WithdrawTotalResponse {
  all: number[];
  allWait: number[];
  allComplete: number[];
  today: number[];
  todayWait: number[];
  todayComplete: number[];
}

export interface BankInfoDepositResponse {
  id: number;
  uid: number;
  name: string;
  mobile: string;
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

export interface BankInfoRequest {
  bankNameCn: string;
  bankNameEn: string;
  bankNumber: string;
}
export interface UpdBankInfoRequest {
  id: number;
  bankName: string;
  bankNumber: string;
}
export interface EnabledBankInfoBody {
  id: number;
  enabled: boolean;
}

export interface BankInfoResponse {
  id: number;
  bankNameCn: string;
  bankNameEn: string;
  bankNumber: string;
  enabled: boolean;
  cdt: number;
  udt: number;
}

/**
 * transactionOnlyDeposit param
 */
export interface transactionOnlyDepositParams extends Pagination {
  id?: number;
  uid?: number;
  name?: string;
  mobile?: string;
  mobileInviter?: string;
  walletType?: number;
  adminDeposit?: boolean;
  date?: string;
}

export interface TransactionTotalParams {
  type: number;
  mobileInviter?: string;
}

export interface TransactionTotalResponse {
  count: number[];
  amount: number[];
}

export interface DepositTotalResponse {
  total: number[];
  today: number[];
}

export interface AgentReportRequest extends Pagination {
  mp?: string;
}

export interface AgentReportResponse {
  mobile: string;
  name: string;
  deposit: number;
  withdraw: number;
  todayDeposit: number;
  todayWithdraw: number;
  vipCount: number;
  todaySignup: number;
  todayActive: number;
}

export interface CipsDetailRequest extends Pagination {
  uid?: number;
  name?: string;
  mobile?: string;
}

export interface CipsDetailResponse {
  name: string;
  mobile: string;
  amount: number;
  before: number;
  after: number;
  from: string;
  to: string;
  state: number;
  time: number;
}

export interface CipsTotalResponse {
  amount: number;
  toCny: number;
  toUsdt: number;
}

export interface CipsDailyTotalRequest {
  date?: string;
}

export interface CipsDailyTotalResponse {
  rebate: number;
  commission: number;
  transfer: number;
}

export interface VoucherParams extends Pagination {
  uid?: number;
  name?: string;
  mobile?: string;
  type?: number;
  voucherType: numbe | string;
}

export interface VoucherResponse {
  id: number;
  uid: number;
  name: string;
  mobile: string;
  type: number;
  voucherType: number;
  point: number;
  before: number;
  after: number;
  cdt: number;
  udt: number;
}

export interface MenuResponse {
  id?: number;
  name?: string;
  type: number;
  parentId?: number;
  privileges?: string;
  i18nKey?: string;
  url?: string;
  path?: string;
  meta?: string;
  sort: number;
  children?: MenuResponse[];
}

export interface RoleResponse {
  id?: number;
  name?: string;
  remark?: string;
  menuIds?: number[];
}

export interface RoleParams extends Pagination {
  name?: string;
}

export interface RoleListResponse {
  id: number;
  name: string;
  remark?: string;
  cdt: number;
}

export interface AgentAdminParams extends Pagination {
  uid?: number;
  name?: string;
}

export interface AgentAdminResponse {
  uid: number;
  name: string;
  cdt: number;
}

export interface AgentAdminRequest {
  uid: number;
  name: string;
  password: string;
}

export interface ResetPasswordAdminAgent {
  uid: number;
  password: string;
}

export interface debtParams extends Pagination {
  id?: number;
  uid?: number;
  state?: number;
}

/**
 * debt response body
 */
export interface debtResponse {
  date: string;
  type: number;
  walletType: number;
  amount: number;
}

export interface UpdDebtStateBody {
  id: number;
  state: number;
}

export interface ThirdPaymentRequest extends Pagination {
  orderNo?: string;
  uid?: number;
  name?: string;
  mobile?: string;
  type?: string;
  channel?: string;
  state?: number;
  begin?: string;
  end?: string;
}

export interface ThirdPaymentResponse {
  id: number;
  name: string;
  mobile: string;
  type: string;
  amount: number;
  payId?: string;
  payTime?: string;
  cdt: string;
  state: number;
}

export interface ThirdPaymentTotalRequest {
  companyId?: number;
}

export interface ThirdPaymentTotalResponse {
  count: number;
  amount: number;
  finishAmount: number;
  todayCount: number;
  todayAmount: number;
  todayFinishAmount: number;
  companyCount: number;
  companyAmount: number;
  companyFinishAmount: number;
}

export interface PaymentMehodParams extends Pagination {
  uid?: number;
  type?: number;
  bankName?: string;
  cardNumber?: number;
  cardName?: string;
}

export interface PaymentMethodResponse {
  id: number;
  uid: number;
  type: number;
  walletAddress: string;
  bankName: string;
  cardNumber: number;
  cardName: string;
  cdt: number;
  udt: number;
}

export interface PaymentMethodRequest {
  uid: number;
  type: number;
  walletAddress?: string;
  bankName?: string;
  branch?: string;
  cardNumber?: number;
  cardName?: string;
}
export interface UpdPaymentMethodRequest {
  id: number;
  uid: number;
  type: number;
  walletAddress?: string;
  bankName?: string;
  branch?: string;
  cardNumber?: number;
  cardName?: string;
}
export interface PaymentCompanyResponse {
  id: number;
  name: string;
  i18n: string;
  enabled: boolean;
}

export interface PaymentChannelResponse {
  id: number;
  companyId: number;
  channel: string;
  name: string;
  i18n: string;
  enabled: boolean;
}

export interface Product2ApplyBuyResponse {
  id: number;
  uid: number;
  name: string;
  mobile: string;
  productId: number;
  productPrice: number;
  productName: string;
  productEarnings: number;
  quantity: number;
  agreeQuantity: number;
  state: number;
  cdt: number;
  udt: number;
  applyTime: number;
}

export interface Product2ApplyBuyTotalResponse {
  count: number;
  waitQuantity: number;
  finishQuantity: number;
  rejectQuantity: number;
  waitAmount: number;
  finishAmount: number;
  rejectAmount: number;
  values: Product2ApplyBuyResponse[];
}

export interface Product2ApplyBuyParams extends Pagination {
  id?: number;
  uid?: number;
  name?: string;
  mobile?: string;
  walletType?: string;
  bc?: number;
  ec?: number;
  productPrice?: number;
  productName?: string;
  state?: number;
  page?: number;
  limit?: number;
}

export interface AgreeProductApplyRequest {
  id: number;
  quantity: number;
}

export interface RejectProductApplyRequest {
  ids: number[];
}

export interface Product2ApplyBatchAgreeRequest {
  id: number;
  quantity: number;
}
