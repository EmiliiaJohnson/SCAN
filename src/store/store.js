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

  isSummaryLoading = false;
  setSummaryLoading = (bool) => {
    this.isSummaryLoading = bool;
  };

  isDocumentLoading = false;
  setDocumentLoading = (bool) => {
    this.isDocumentLoading = bool;
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

  summaryResult;
  setSummaryResult = (result) => {
    this.summaryResult = result;
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

  summaryAll = 0;
  setSummaryAll = (all) => {
    this.summaryAll = all;
  };

  isSummaryError = false;
  setSummaryError = (bool) => {
    this.isSummaryError = bool;
  };

  IDs = {};
  setIDs = (id) => {
    this.IDs = id;
  };

  document = [];
  setDocument = (doc) => {
    this.document = doc;
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

  resetSearchFormChecks = () => {
    this.searchFormChecks.isFullness = false;
    this.searchFormChecks.isBusiness = false;
    this.searchFormChecks.isMainRole = false;
    this.searchFormChecks.isRisksOnly = false;
    this.searchFormChecks.isTechNews = false;
    this.searchFormChecks.isAnnouncement = false;
    this.searchFormChecks.isNews = false;
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
    } else {
      localStorage.clear();
    }
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
    this.setSummaryLoading(true);
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
        this.setSummaryResult(response);
        if (
          this.summaryResult.status === 200 &&
          this.summaryResult.data.data !== [] &&
          this.summaryResult.data.data !== undefined &&
          this.summaryResult.data.data.length !== 0
        ) {
          this.setSummaryLoading(false);
        } else {
          this.setSummaryError(true);
          this.setSummaryLoading(false);
        }
      })
      .catch((err) => {
        this.setSummaryError(true);
        console.log(err);
        this.setSummaryLoading(false);
      });
  };

  getIDs = () => {
    axios
      .post(API + `/api/v1/objectsearch`, {
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
        let docID = [];
        response.data.items.map((id) => {
          return docID.push(id.encodedId);
        });
        this.setIDs(docID);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getFirstDocuments = () => {
    axios
      .post(API + `/api/v1/documents`, {
        ids: this.IDs,
      })
      .then((response) => {
        this.setDocument(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getNextDocuments = (next) => {
    this.setDocumentLoading(true);
    axios
      .post(API + `/api/v1/documents`, {
        ids: next,
      })
      .then((response) => {
        this.setDocument([...this.document, ...response.data]);
        this.setDocumentLoading(false);
      })
      .catch((err) => {
        console.log(err);
        this.setDocumentLoading(false);
      });
  };
}

let store = new Store();
export default store;
