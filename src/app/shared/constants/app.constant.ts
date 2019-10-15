export class AppConstants {
    public static API_ENDPOINT = 'http://127.0.0.1:6666/api/';
    public static API_CONTEXT_PATH = 'api/';
    public static API_SECRET_KEY = 'iReferral';
    public static API_SECRET_PASSWORD = 'iReferral123';
    public static page = 1;
    public static pageSize = 10;
    public static consentType = 1;
    public static SIGNUP_URL = 'signup';
    public static API_AUTH = 'login';
    public static GET_ALL_USERS_LIST = 'getuserlist';
    public static ALERT_DISMISS_TIMEOUT = 20000; //Set alert dismiss time out in miliseconds
    public static DATE_FORMAT = 'yyyy-MM-dd';
    public static VIEW_DATE_FORMAT = 'dd-MM-yyyy';
    public static POST_CODE_REGEX = '^([A-Za-z][A-Ha-hK-Yk-y]?[0-9][A-Za-z0-9]? [0-9][A-Za-z]{2}|[Gg][Ii][Rr] 0[Aa]{2})$';
  
    /*This pattern requires at least two lowercase letters, two uppercase letters,
     two digits, and two special characters. There must be a minimum of 8 characters total,
     and no white space characters are allowed.**/
    public static PASSWORD_VALIDATION_REGEX = '^(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z])(?=..*[0-9].*[0-9])(?=.*[#?!@$%^&*-].*[#?!@$%^&*-]).{8,}$';
    public static PASSWORD_MAX_LENGTH = 50;
    public static PASSWORD_VALIDATION_TEXT = `Password requires at least two lowercase letters, 
    two uppercase letters, two digits, and two special characters. 
    There must be a minimum of 8 characters total, and no white space characters are allowed.`;
    /* Password min length Should be greater than 8**/
    public static PASSWORD_MIN_LENGTH = 8;
    public static ADDRESS_REGEX = '^[a-zA-Z0-9][a-zA-Z0-9-/,. ]*$';
    public static MOBILE_NO_REGEX = '^[0-9]*$';
    /* Regex for No white space**/
    public static NO_WHITE_SPACE_REGEX = '[^ ](.*|\n|\r|\r\n)*$';
  
    public static EXPIRES_IN = 1000 * 60 * 60 * 24; // set for 1 days, one seconds equals to 1000 miliseconds
  
    public static pageList = [
  
      {
        key: 10,
        value: '10 items per page'
      },
      {
        key: 20,
        value: '20 items per page'
      },
      {
        key: 50,
        value: '50 items per page'
      }
    ];
  
    public static dashboardHeaderTitle = [
  
      {
        key: 'CANDI',
        value: 'Candidate'
      },
      {
        key: 'SUADM',
        value: 'Admin'
      }
    ];
  
    public static gender = [
      { key: 'Female', value: 'Female' },
      { key: 'Male', value: 'Male' },
      { key: 'Not Known', value: 'Not Known' },
      { key: 'Not Specified', value: 'Not Specified' },
  ];
  
  public static title = [
    { key: 'Captain', value: 'Captain' },
    { key: 'Dame', value: 'Dame' },
    { key: 'Dr', value: 'Dr' },
    { key: 'Lady', value: 'Lady' },
    { key: 'Lord', value: 'Lord' },
    { key: 'Miss', value: 'Miss' },
    { key: 'Mr', value: 'Mr' },
    { key: 'Mrs', value: 'Mrs' },
    { key: 'Rev', value: 'Rev' },
    { key: 'Sir', value: 'Sir' },
  ];
  }
  