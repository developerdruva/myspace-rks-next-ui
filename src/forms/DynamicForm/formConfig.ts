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
    name: "document_particular",
    label: "Document / Particular Name",
    type: "text",
    categories: ["ALL"],
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: ["ACTIVE", "INACTIVE", "CLOSED"],
    categories: ["ALL"],
  },
  {
    name: "tenure",
    label: "Tenure (months)",
    type: "number",
    categories: ["BANKING", "LOANS", "INVESTMENTS"],
  },
  {
    name: "renewal_due",
    label: "Renewal / Due Date",
    type: "date",
    categories: ["INSURANCE", "SUBSCRIPTIONS", "DOCUMENTS"],
  },
  {
    name: "frequency",
    label: "Frequency",
    type: "select",
    options: ["MONTHLY", "QUARTERLY", "YEARLY"],
    categories: ["LOANS", "INSURANCE", "SUBSCRIPTIONS"],
  },
  {
    name: "start_date",
    label: "Start Date",
    type: "date",
    categories: ["BANKING", "LOANS", "INVESTMENTS", "SUBSCRIPTIONS", "ASSETS"],
  },
  {
    name: "base_amount",
    label: "Base Amount (₹)",
    type: "number",
    categories: [
      "BANKING",
      "LOANS",
      "INSURANCE",
      "INVESTMENTS",
      "ASSETS",
      "SUBSCRIPTIONS",
    ],
  },
  {
    name: "total_amount",
    label: "Total Amount (₹)",
    type: "number",
    categories: [
      "BANKING",
      "LOANS",
      "INSURANCE",
      "INVESTMENTS",
      "ASSETS",
      "SUBSCRIPTIONS",
    ],
  },
  {
    name: "reference_number",
    label: "Reference Number",
    type: "text",
    categories: ["DOCUMENTS", "INSURANCE", "ASSETS"],
  },
  {
    name: "validity_from",
    label: "Validity From",
    type: "date",
    categories: ["DOCUMENTS", "INSURANCE"],
  },
  {
    name: "validity_to",
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
