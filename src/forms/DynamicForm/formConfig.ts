// formConfig.ts

export type CategoryType =
  | "BANKING"
  | "LOANS"
  | "INSURANCE"
  | "DOCUMENTS"
  | "INVESTMENTS"
  | "ASSETS"
  | "SUBSCRIPTIONS";

export const FIELD_CONFIG = [
  {
    name: "documentParticular",
    label: "Document Particular",
    type: "text",
    categories: ["ALL"],
  },
  {
    name: "type",
    label: "Type",
    type: "text",
    categories: ["ALL"],
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: ["Active", "Inactive", "Closed"],
    categories: ["ALL"],
  },
  {
    name: "tenure",
    label: "Tenure (months)",
    type: "number",
    categories: ["BANKING", "LOANS", "INVESTMENTS"],
  },
  {
    name: "renewalDue",
    label: "Renewal / Due",
    type: "date",
    categories: ["INSURANCE", "SUBSCRIPTIONS"],
  },
  {
    name: "frequency",
    label: "Frequency",
    type: "select",
    options: ["Monthly", "Quarterly", "Yearly"],
    categories: ["LOANS", "INSURANCE", "SUBSCRIPTIONS"],
  },
  {
    name: "startDate",
    label: "Start Date",
    type: "date",
    categories: ["BANKING", "LOANS", "INVESTMENTS", "SUBSCRIPTIONS", "ASSETS"],
  },
  {
    name: "amount",
    label: "Amount (₹)",
    type: "number",
    categories: ["BANKING", "LOANS", "INSURANCE", "INVESTMENTS", "ASSETS", "SUBSCRIPTIONS"],
  },
  {
    name: "referenceNumber",
    label: "Reference Number",
    type: "text",
    categories: ["DOCUMENTS", "INSURANCE", "ASSETS"],
  },
  {
    name: "validityFrom",
    label: "Validity From",
    type: "date",
    categories: ["DOCUMENTS", "INSURANCE"],
  },
  {
    name: "validityTo",
    label: "Validity To",
    type: "date",
    categories: ["DOCUMENTS", "INSURANCE"],
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    categories: ["ALL"],
  },
];