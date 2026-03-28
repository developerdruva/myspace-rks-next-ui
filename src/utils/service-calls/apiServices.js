import axiosLoaderCall from "../api-utils/axiosLoaderCall";

import {
  CHATBOT_LOGIN,
  DELETE_COMP_RECORD,
  DELETE_TODO,
  GET_ALLTODOS,
  GET_MYDEVELOPMENTS,
  GET_PORTFOLIO_DETAILS,
  LOGIN_PAGE,
  SAVE_FEEDBACK_DETAILS,
  SAVE_PROFILE_DETAILS,
  SAVE_WORKED_COMPANIES,
  TODO_ADD,
  UPDATE_TODO_ITEM,
  UPDATE_WORKED_COMPANIES,
  GET_DOCUMENT_PARTICULARS,
  CREATE_DOCUMENT_PARTICULAR,
  UPDATE_DOCUMENT_PARTICULAR,
  DELETE_DOCUMENT_PARTICULAR,
  MONTHLY_SPENDS_INCOME,
  MONTHLY_SPENDS_PLANNED,
  MONTHLY_SPENDS_ACTUAL,
  MONTHLY_SPENDS_EXPENSES,
  MONTHLY_SPENDS_EXPENSES_SUMMARY,
} from "./APIUrls";

class apiServices {
  chatbotUserLogin(userData) {
    return axiosLoaderCall.post(CHATBOT_LOGIN, userData);
  }
  todoAdd(todoDesc) {
    return axiosLoaderCall.post(TODO_ADD, todoDesc);
  }
  getAllTodos() {
    return axiosLoaderCall.get(GET_ALLTODOS);
  }
  deleteTodo(itemId) {
    // return axiosLoaderCall.delete(DELETE_TODO + `/${itemid}`);
    return axiosLoaderCall.delete(DELETE_TODO, { params: { itemId: itemId } });
  }
  updateTodoItem(itemId, data) {
    return axiosLoaderCall.put(
      UPDATE_TODO_ITEM,
      {},
      { params: { itemId: itemId, todoDesc: data } },
    );
  }
  getMyDevelopments() {
    return axiosLoaderCall.get(GET_MYDEVELOPMENTS);
  }
  getPortfolioDetails() {
    return axiosLoaderCall.get(GET_PORTFOLIO_DETAILS);
  }
  saveFeedbackForm(values) {
    return axiosLoaderCall.post(SAVE_FEEDBACK_DETAILS, values);
  }
  userLogin(values) {
    return axiosLoaderCall.post(LOGIN_PAGE, values);
  }
  saveProfileDetails(formData) {
    return axiosLoaderCall.post(SAVE_PROFILE_DETAILS, formData);
  }
  saveWorkedCompanies(formData) {
    return axiosLoaderCall.post(SAVE_WORKED_COMPANIES, formData);
  }
  updateWorkedCompanies(values) {
    return axiosLoaderCall.put(
      UPDATE_WORKED_COMPANIES + "/" + values?.sl_no,
      values,
    );
  }
  deleteCompRecord(id) {
    return axiosLoaderCall.delete(DELETE_COMP_RECORD + "/" + id);
  }
  addProject(data) {
    return axiosLoaderCall.post("/saveWorkedProject", data);
  }
  updateProject(id, data) {
    return axiosLoaderCall.put(`/updateWorkedProject/${id}`, data);
  }
  getExperienceDetails(emailId) {
    return axiosLoaderCall.get("/getExperienceDetails", {
      params: { emailId },
    });
  }
  addEducationDetail(data) {
    return axiosLoaderCall.post("/addEducationDetail", data);
  }
  updateEducationDetail(id, data) {
    return axiosLoaderCall.put(`/updateEducationDetail/${id}`, data);
  }
  deleteEducationDetail(id) {
    return axiosLoaderCall.delete(`/deleteEducationDetail/${id}`);
  }
  getEducationDetails(emailId) {
    return axiosLoaderCall.get("/getEducationDetails", { params: { emailId } });
  }
  addMySkill(data) {
    return axiosLoaderCall.post("/addSkillDetail", data);
  }
  updateMySkill(id, data) {
    return axiosLoaderCall.put(`/updateSkillDetail/${id}`, data);
  }
  deleteMySkill(id) {
    return axiosLoaderCall.delete(`/deleteSkillDetail/${id}`);
  }
  getMySkills(emailId) {
    return axiosLoaderCall.get("/getSkillsByCategory", { params: { emailId } });
  }
  addSkillsListDetail(data) {
    return axiosLoaderCall.post("/addSkillsListDetail", data);
  }
  updateSkillsListDetail(id, data) {
    return axiosLoaderCall.put(`/updateSkillsListDetail/${id}`, data);
  }
  deleteSkillsListDetail(id) {
    return axiosLoaderCall.delete(`/deleteSkillsListDetail/${id}`);
  }
  getSkillsListDetails(emailId) {
    return axiosLoaderCall.get("/getSkillsListDetails", {
      params: { emailId },
    });
  }
  addCertification(data) {
    return axiosLoaderCall.post("/addCertification", data);
  }
  updateCertification(id, data) {
    return axiosLoaderCall.put(`/updateCertification/${id}`, data);
  }
  deleteCertification(id) {
    return axiosLoaderCall.delete(`/deleteCertification/${id}`);
  }
  getCertifications(emailId) {
    return axiosLoaderCall.get("/getCertifications", { params: { emailId } });
  }
  addPocProject(data) {
    return axiosLoaderCall.post("/addPocProject", data);
  }
  updatePocProject(id, data) {
    return axiosLoaderCall.put(`/updatePocProject/${id}`, data);
  }
  deletePocProject(id) {
    return axiosLoaderCall.delete(`/deletePocProject/${id}`);
  }
  getPocProjects(emailId) {
    return axiosLoaderCall.get("/getPocProjects", { params: { emailId } });
  }
  getParticulars = (workspace_id) => {
    return axiosLoaderCall.get("/api/particulars", {
      params: { workspace_id: "0d4f53ac-c506-4121-8fe0-cdcddf4690d4" },
    });
  };

  addParticular = (data) => {
    return axiosLoaderCall.post("/api/particulars", data);
  };

  markPayment = (data) => {
    return axiosLoaderCall.post("/api/payments/mark", data);
  };

  getDashboard = (workspace_id) => {
    return axiosLoaderCall.get(
      `/api/partdashboard?workspace_id=${workspace_id}`,
    );
  };

  // Document Particulars CRUD
  getDocumentParticulars = () => {
    return axiosLoaderCall.get(GET_DOCUMENT_PARTICULARS);
  };

  getDocumentParticularById = (id) => {
    return axiosLoaderCall.get(`${GET_DOCUMENT_PARTICULARS}${id}`);
  };

  createDocumentParticular = (data) => {
    return axiosLoaderCall.post(CREATE_DOCUMENT_PARTICULAR, data);
  };

  updateDocumentParticular = (id, data) => {
    return axiosLoaderCall.put(`${UPDATE_DOCUMENT_PARTICULAR}/${id}`, data);
  };

  deleteDocumentParticular = (id, user_id) => {
    return axiosLoaderCall.delete(`${DELETE_DOCUMENT_PARTICULAR}/${id}`, {
      params: { user_id, id },
    });
  };

  // Monthly Spends - Income CRUD
  upsertMonthlyIncome = (data) => {
    return axiosLoaderCall.post(`${MONTHLY_SPENDS_INCOME}/`, data);
  };

  getMonthlyIncomeByMonth = (month, user_id) => {
    return axiosLoaderCall.get(`${MONTHLY_SPENDS_INCOME}/${month}`, {
      params: { user_id },
    });
  };

  updateMonthlyIncome = (id, data) => {
    return axiosLoaderCall.put(`${MONTHLY_SPENDS_INCOME}/${id}`, data);
  };

  deleteMonthlyIncome = (id) => {
    return axiosLoaderCall.delete(`${MONTHLY_SPENDS_INCOME}/${id}`);
  };

  // Monthly Spends - Planned CRUD
  createMonthlyPlanned = (data) => {
    return axiosLoaderCall.post(`${MONTHLY_SPENDS_PLANNED}/`, data);
  };

  getMonthlyPlannedByMonth = (month, user_id) => {
    return axiosLoaderCall.get(`${MONTHLY_SPENDS_PLANNED}/${month}`, {
      params: { user_id },
    });
  };

  updateMonthlyPlanned = (id, data) => {
    return axiosLoaderCall.put(`${MONTHLY_SPENDS_PLANNED}/${id}`, data);
  };

  deleteMonthlyPlanned = (id) => {
    return axiosLoaderCall.delete(`${MONTHLY_SPENDS_PLANNED}/${id}`);
  };

  // Monthly Spends - Actual CRUD
  createMonthlyActual = (data) => {
    return axiosLoaderCall.post(`${MONTHLY_SPENDS_ACTUAL}/`, data);
  };

  getMonthlyActualByMonth = (month, user_id) => {
    return axiosLoaderCall.get(`${MONTHLY_SPENDS_ACTUAL}/${month}`, {
      params: { user_id },
    });
  };

  updateMonthlyActual = (id, data) => {
    return axiosLoaderCall.put(`${MONTHLY_SPENDS_ACTUAL}/${id}`, data);
  };

  deleteMonthlyActual = (id) => {
    return axiosLoaderCall.delete(`${MONTHLY_SPENDS_ACTUAL}/${id}`);
  };

  // Monthly Spends - Expenses
  getMonthlyExpenses = (month, user_id) => {
    return axiosLoaderCall.get(MONTHLY_SPENDS_EXPENSES, {
      params: { user_id, month },
    });
  };

  getMonthlyExpensesSummary = (month, user_id, refreshKey) => {
    return axiosLoaderCall.get(MONTHLY_SPENDS_EXPENSES_SUMMARY, {
      params: {
        user_id,
        month,
        ...(refreshKey ? { refreshKey } : {}),
      },
    });
  };

  createMonthlyExpense = (data) => {
    return axiosLoaderCall.post(MONTHLY_SPENDS_EXPENSES, data);
  };

  updateMonthlyExpense = (id, data) => {
    return axiosLoaderCall.put(`${MONTHLY_SPENDS_EXPENSES}/${id}`, data);
  };

  deleteMonthlyExpense = (id, deleted_by) => {
    return axiosLoaderCall.delete(`${MONTHLY_SPENDS_EXPENSES}/${id}`, {
      data: { deleted_by },
    });
  };
}

export default new apiServices();
