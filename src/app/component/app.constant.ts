export const AppConstant = Object.freeze({
  APP: {
    MODULE_NAME: 'ZoomTeams'
  },
  API_ENDPOINT: 'https://5eda58ec98b7f500160dc4c5.mockapi.io/demo/api/',
  ENCRYPTDECRIYPTKEY: 'moc.mooz-smaet-key',
  API_CONFIG: {
    M_ACCOUNT_URL: 'V1/account/',
    M_CONNECT_URL: 'connect/',
    M_BASE_URL: 'api/',
    HEADER_CONTENT_TYPE: {
      FORM_URL_ENCODE: 'application/x-www-form-urlencoded;charset=utf-8;',
      APPLICATION_JSON: 'application/json',
    },
    DATE: {
      format1: 'dd-MM-yyyy',
      apiFormat: 'YYYY-MM-DD',  // A valid moment js data format. Refer https://momentjs.com/docs/#/parsing/string-format/
      displayFormat: 'DD-MM-YYYY',
      sqlDateFormat: 'DD-MM-YYYY',
      dotnetDateFormat: 'MM/DD/YYYY',
      dotnetFullDateFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    ANG_DATE: {
      displaydtime: 'dd-MMM-yyyy HH:mm',
      displayMediumFormat: 'MMM d, y, h:mm:ss a',
      displayFormat: 'dd-MM-y', // 01-31-2019 y-MM-dd
      apiFormat: 'y-MM-dd',
      apiTSFormat: 'y-MM-dd HH:mm',

    },
    API_URL: {

      API: {
        USER_LOGIN: 'login',
      },

    }
  }
});

