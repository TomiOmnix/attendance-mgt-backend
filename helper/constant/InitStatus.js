const init = {
  offlineSource: 0,
  ing: 1,
  onlineSource: 1,
  status: 0,
  oneStatus: 1,
  twoStatus: 2,
  checkedStatus: 2,
  pendingStatus: 2,
  responseStatus: 3,
  successStatus: 4,
  cancelStatus: 5,
  acceptStatus: 6,
  declineStatus: 7,
  controlId: 0,
  syncStatus: 0,
  syncedStatus: 1,
  pushId: 0,
  pullId: 1,
  controlDelete: 1,
  controlEdit: 2,
  itemDisableStatus: 0,
  stockTransferStatus: 0,
  pmtSplitStatus: 0,
  noQueue: 1,
  primaryCurrencyRate: 1,
  queuer: 0,
  cashier: 1,
  salesPerson: 2,
  productGroup: "4",

  DR: "dr",
  CR: "cr",

  //VAT
  activeVAT: 1,
  nonActiveVAT: 0,
  exclusiveVAT: 1,
  inclusiveVAT: 0,

  service: 2,
  retail: 1,
  chargeTypeNormal: "normal",
  chargeTypeAbsolute: "absolute",
  chargeTypePercentage: "percentage",
  itemGrouping: "item grouping",
  defaultVal: 99,
  POS: "pos",
  loyalty: "loyalty",
  bankTfr: "bank transfer",
  cash: "cash",
  refund: "refund",
  deposit: "deposit",
  BD: "B and D",
  otherCharges: "other charges",
  building: 1,
  floor: 2,
  spaceCategory: 3,
  space: 4,
  yearly: "yearly",
  monthly: "monthly",

  //Space Status
  occupied: "o",
  reserved: "r",
  flagged: "f",
  vacant: "v",

  //payment action
  paid: "paid",
  credit: "credit",
  complimentary: "complimentary",
  chargeToAccount: "charged to customer account",
  chargedToSpace: "charged to room",
  paymentSplit: "payment split",
  transfer: "transfer",

  backDate: 1,

  restaurants: "restaurants",
  lounges: "lounges",
  //benefit_class
  spaceBenefit: 1,
  mealBenefit: 2,
  drinkBenefit: 3,
  //Shift_management
  morning: 1,
  afternoon: 2,
  evening: 3,
  //benefit_Type
  freeBenefit: 1,
  discountedBenefit: 0,
  singleBooking: "single check-in",
  groupBooking: "group check-in",
  reservation: "reservation",
  walkInCustomer: "walk-in customer",

  //app_id
  retailId: 4,

  //product
  raw: 1,
  food: 2,
  drink: 3,

  //customer Category
  customerCate: "lba",
  vendorCate: "cust",

  empty: "",
};

module.exports.initStatus = init;
