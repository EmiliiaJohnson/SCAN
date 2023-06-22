import axios from "axios";

const { makeAutoObservable } = require("mobx");

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  login = "";
  password = "";
  token = "";
  isAuthError = false;
  isLoading = false;
  companiesInfo = { used: 0, limit: 0 };

  setLogin = (login) => {
    this.login = login;
  };

  setPassword = (password) => {
    this.password = password;
  };

  setLoading = (bool) => {
    this.isLoading = bool;
  };

  setIsAuthError = (bool) => {
    this.isAuthError = bool;
  };

  setCompanyLimits = (used, limit) => {
    this.companiesInfo.used = used;
    this.companiesInfo.limit = limit;
  };

  getToken = () => {
    this.setLoading(true);
    axios
      .post("https://gateway.scan-interfax.ru/api/v1/account/login", {
        login: `${this.login}`,
        password: `${this.password}`,
      })
      .then((response) => {
        if (response.status === 200) {
          this.setToken(response.data.accessToken);
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("login", this.login);
          this.setLoading(false);
          let currentDate = new Date();
          localStorage.setItem(
            "expire",
            currentDate.setDate(currentDate.getDate() + 1)
          );
        }
      })
      .catch((err) => {
        console.log(err);
        this.setIsAuthError(true);
        this.setLoading(false);
        localStorage.setItem("token", "");
        this.setLogin("");
        this.setPassword("");
      });
  };

  checkToken = () => {
    if (
      localStorage.getItem("token") !== "" &&
      localStorage.getItem("expire") > new Date()
    ) {
      this.setToken(localStorage.getItem("token"));
      return;
    }
    localStorage.clear();
  };

  getCompaniesInfo = () => {
    this.setLoading(true);
    axios
      .get("https://gateway.scan-interfax.ru/api/v1/account/info", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        this.setCompanyLimits(
          response.data.eventFiltersInfo.usedCompanyCount,
          response.data.eventFiltersInfo.companyLimit
        );
        this.setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setToken = (token) => {
    axios.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.token = token;
  };
}

export default new Store();
