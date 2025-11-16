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
      { params: { itemId: itemId, todoDesc: data } }
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
      values
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
}

export default new apiServices();
