import axios from "axios";

const API = "https://gateway.scan-interfax.ru";
const { makeAutoObservable } = require("mobx");

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  login = "";
  setLogin = (login) => {
    this.login = login;
  };

  password = "";
  setPassword = (password) => {
    this.password = password;
  };

  token = "";
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

  isAuthError = false;
  setAuthError = (bool) => {
    this.isAuthError = bool;
  };

  isLoading = false;
  setLoading = (bool) => {
    this.isLoading = bool;
  };

  isCompaniesLoading = false;
  setCompaniesLoading = (bool) => {
    this.isCompaniesLoading = bool;
  };

  companiesInfo = { used: 0, limit: 0 };
  setCompanyLimits = (used, limit) => {
    this.companiesInfo.used = used;
    this.companiesInfo.limit = limit;
  };

  inn = null;
  setInn = (inn) => {
    this.inn = inn;
  };

  tonality = "any";
  setTonality = (tonality) => {
    this.tonality = tonality;
  };

  limit = 0;
  setLimit = (limit) => {
    this.limit = limit;
  };

  startDate = new Date();
  setStartDate = (date) => {
    this.startDate = date;
  };

  endDate = new Date();
  setEndDate = (date) => {
    this.endDate = date;
  };

  summaryDates = [];
  setSummaryDates = (dates) => {
    this.summaryDates = dates;
  };

  summaryTotal = [];
  setSummaryTotal = (total) => {
    this.summaryTotal = total;
  };

  summaryRisks = [];
  setSummaryRisks = (risks) => {
    this.summaryRisks = risks;
  };

  isSummaryError = false;
  setSummaryError = (bool) => {
    this.isSummaryError = bool;
  };

  searchFormChecks = {
    isFullness: false,
    isBusiness: false,
    isMainRole: false,
    isRisksOnly: false,
    isTechNews: false,
    isAnnouncement: false,
    isNews: false,
  };
  setSearchFormChecks = (type) => {
    switch (type) {
      case "isFullness":
        this.searchFormChecks.isFullness
          ? (this.searchFormChecks.isFullness = false)
          : (this.searchFormChecks.isFullness = true);
        console.log(this.searchFormChecks.isFullness);
        break;
      case "isBusiness":
        this.searchFormChecks.isBusiness
          ? (this.searchFormChecks.isBusiness = false)
          : (this.searchFormChecks.isBusiness = true);
        break;
      case "isMainRole":
        this.searchFormChecks.isMainRole
          ? (this.searchFormChecks.isMainRole = false)
          : (this.searchFormChecks.isMainRole = true);
        break;
      case "isRisksOnly":
        this.searchFormChecks.isRisksOnly
          ? (this.searchFormChecks.isRisksOnly = false)
          : (this.searchFormChecks.isRisksOnly = true);
        break;
      case "isTechNews":
        this.searchFormChecks.isTechNews
          ? (this.searchFormChecks.isTechNews = false)
          : (this.searchFormChecks.isTechNews = true);
        break;
      case "isAnnouncement":
        this.searchFormChecks.isAnnouncement
          ? (this.searchFormChecks.isAnnouncement = false)
          : (this.searchFormChecks.isAnnouncement = true);
        break;
      case "isNews":
        this.searchFormChecks.isNews
          ? (this.searchFormChecks.isNews = false)
          : (this.searchFormChecks.isNews = true);
        break;
      default:
        break;
    }
  };

  getToken = () => {
    this.setLoading(true);
    axios
      .post(API + `/api/v1/account/login`, {
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
          let expire = currentDate.setDate(currentDate.getDate() + 2);
          localStorage.setItem("expire", expire);
        }
      })
      .catch((err) => {
        console.log(err);
        this.setAuthError(true);
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
    this.setCompaniesLoading(true);
    axios
      .get(API + `/api/v1/account/info`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        this.setCompanyLimits(
          response.data.eventFiltersInfo.usedCompanyCount,
          response.data.eventFiltersInfo.companyLimit
        );
        this.setCompaniesLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getHistograms = () => {
    this.setLoading(true);
    axios
      .post(API + `/api/v1/objectsearch/histograms`, {
        issueDateInterval: {
          startDate: this.startDate,
          endDate: this.endDate,
        },
        searchContext: {
          targetSearchEntitiesContext: {
            targetSearchEntities: [
              {
                type: "company",
                sparkId: null,
                entityId: null,
                inn: this.inn,
                maxFullness: this.searchFormChecks.isFullness,
                inBusinessNews: this.searchFormChecks.isBusiness,
              },
            ],
            onlyMainRole: this.searchFormChecks.isMainRole,
            tonality: this.tonality,
            onlyWithRiskFactors: this.searchFormChecks.isRisksOnly,
            riskFactors: {
              and: [],
              or: [],
              not: [],
            },
            themes: {
              and: [],
              or: [],
              not: [],
            },
          },
          themesFilter: {
            and: [],
            or: [],
            not: [],
          },
        },
        searchArea: {
          includedSources: [],
          excludedSources: [],
          includedSourceGroups: [],
          excludedSourceGroups: [],
        },
        attributeFilters: {
          excludeTechNews: this.searchFormChecks.isTechNews,
          excludeAnnouncements: this.searchFormChecks.isAnnouncement,
          excludeDigests: this.searchFormChecks.isNews,
        },
        similarMode: "duplicates",
        limit: this.limit,
        sortType: "issueDate",
        sortDirectionType: "desc",
        intervalType: "month",
        histogramTypes: ["totalDocuments", "riskFactors"],
      })
      .then((response) => {
        this.setLoading(false);
        this.setSummaryError(false);
        this.setSummaryDates(
          response.data.data[0].data.map((item) =>
            item.date
              .substring(0, 10)
              .split("-")
              .join(".")
              .split(".")
              .reverse()
              .join(".")
          )
        );
        this.setSummaryTotal(
          response.data.data[0].data.map((item) => item.value)
        );
        this.setSummaryRisks(
          response.data.data[1].data.map((item) => item.value)
        );
      })
      .catch((err) => {
        this.setSummaryError(true);
        console.log(err);
        this.setLoading(false);
      });
  };
}

let store = new Store();
export default store;
