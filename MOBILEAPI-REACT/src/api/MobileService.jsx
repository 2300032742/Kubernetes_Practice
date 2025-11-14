import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/mobiles`;

class MobileService {
  getAllMobiles() {
    return axios.get(`${API_URL}/all`);
  }

  getMobileById(id) {
    return axios.get(`${API_URL}/get/${id}`);
  }

  addMobile(mobile) {
    console.log("Backend API base URL:", API_URL);
    return axios.post(`${API_URL}/add`, mobile);
  }

  updateMobile(mobile) {
    return axios.put(`${API_URL}/update`, mobile);
  }

  deleteMobileById(id) {
    return axios.delete(`${API_URL}/delete/${id}`);
  }
}

export default new MobileService();
