/**
 * response code
 */
export enum ResponseCode {
  /** 成功 */
  SUCCESS = 0,
  /** token过期 */
  TOKEN_EXPIRE = 4001,
  /** refresh token过期 */
  REFRESH_TOKEN_EXPIRE = 4002
}

/**
 * 用户查询时的状态码
 */
export enum MemberState {
  /** 正常 */
  NORMAL = 10,
  /** 已禁用 */
  DISABLED = 20,
  /** 已注销帐户 */
  DESTROYES = 30
}

export enum OrderState {
  PENDING = 10,
  REJECT = 20,
  ACTIVE = 30,
  COMPLETED = 40
}

export enum ProductState {
  OFF = 10,
  ON = 20,
  ACTIVE = 30,
  COMPLETED = 40
}
export enum ApplyState {
  CREATED = 10,
  ACTIVE = 20,
  COMPLETED = 30
}

export enum ProductStateOnly {
  OFF = 10,
  ON = 20
}

/**
 * 常量
 */
export enum CipsConstant {
  /** 默认页码 */
  DEFAULT_PAGE = 1,
  /** 默认分页数 */
  DEFAULT_LIMIT = 10
}

/**
 * identity state
 */
export enum IdentityState {
  UNVERIFIED = 10,
  VERIFIED = 20,
  REJECTED = 30
}

export enum CommonConfigKey {
  INVITER_POINT = 'INVITER_POINT',
  CHECK_IN_POINT = 'CHECK_IN_POINT',
  REBATE_POINT = 'REBATE_POINT'
}

/**
 * transcation type
 */
export enum transcationType {
  DEPOSIT = 10,
  WITHDRAW = 20,
  TRADE = 30,
  INCOME = 40,
  COMMISSION = 50,
  TRANSFER = 60,
  RECEIVED = 70,
  REFUND = 80,
  CONVERT = 90
}

export enum TranscationEventType {
  DAILY_REBATE = 10,
  PRODUCT_END = 20,
  CLOSE_ORDER = 30,
  USER_APPLY = 40,
  DEPOSIT_THIRD_PAYMENT = 50,
  ADMIN_SET = 60,
  DEPOSIT_THIRD_FORCE = 70,
  DEPOSIT_USDT_TRANSFER = 80,
  BUY_TYPE_1 = 90,
  BUY_TYPE_2 = 100,
  COMMISSION_TYPE_1 = 110,
  COMMISSION_TYPE_2 = 120,
  RELEASE_FUND = 130,
  EXCHANGE_FUND = 140
}

/**
 * transcation state
 */
export enum transcationState {
  PENDING = 10,
  APPROVE = 20,
  REJECT = 30,
  COMPLETED = 40
}

/**
 * transcation wallet type state
 */
export enum transcationWalletType {
  USDT = 10,
  CIPS = 20,
  YUAN = 30
}
export enum WalletType {
  USDT = 10,
  CIPS = 20,
  YUAN = 30
}

export enum ProductType {
  NORMAL = 10,
  APPLY = 20
}

/**
 * report type
 */
export enum reportType {
  DEPOSIT = 10,
  WITHDRAW = 20,
  REBATE = 30
}

export enum voucherType {
  INVITE_POINT = 10,
  CHECK_IN_POINT = 20,
  ACTIVITY_POINT = 30,
  TRADE_POINT = 40,
  DEBT_SETTLEMENT_FUND = 50,
  VIP_DAILY_POINT = 60
}

export enum voucherHistoryType {
  POINT_TO_FUND = 10,

  FUND_TO_CIPS = 20,

  ACTIVITY_TO_FUND = 30,

  INVITE_SIGNUP = 40,

  INVITE_ACTIVE = 50,

  CHECK_IN = 60,

  VIP_DAILY = 70,

  BUY = 80,

  AUTHENTICATION_PASSED = 90,

  ADMIN_SET = 100
}

export enum MenuType {
  FOLDER = 10,
  MENU = 20,
  BUTTON = 30
}
export enum BankInfoApplyType {
  CARD = 10,
  ALIPAY = 20,
  USDT = 30
}

/**
 * debt fund type
 */
export enum debtFundType {
  DEBT_A = 10,
  DEBT_B = 20,
  DEBT_C = 30
}

export enum ThirePaymentState {
  PENDING = 10,
  APPROVE = 20,
  REJECT = 30
}
