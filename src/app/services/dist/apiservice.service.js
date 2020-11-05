"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApiserviceService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
//
var ApiserviceService = /** @class */ (function () {
    function ApiserviceService(_http, toastr) {
        this._http = _http;
        this.toastr = toastr;
        this.urljson = "assets/url.json";
        this.updateTable = new rxjs_1.Subject();
        this.updateTable$ = this.updateTable.asObservable();
        this.updatePopup = new rxjs_1.Subject();
        this.updatePopup$ = this.updatePopup.asObservable();
        this.geturl();
        console.log("API service");
    }
    // settingObservable$: any;
    ApiserviceService.prototype.geturl = function () {
        this.webserviceurl = localStorage.getItem('webserviceURL');
        this.baseURL = this.webserviceurl + '/callmanagement';
    };
    ApiserviceService.prototype.showSuccess = function (message) {
        this.toastr.success('', message, {
            timeOut: 1000
        });
    };
    // calling Table APi
    ApiserviceService.prototype.authenticateUser = function (jsondata) {
        this.geturl();
        return this._http.post(this.baseURL + "/authenticateUser", jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    ApiserviceService.prototype.tableData = function (jsondata) {
        this.geturl();
        return this._http.get(this.baseURL + "/getCallMgmtExceptionsList?jsonObj=" + jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    ApiserviceService.prototype.tableFilterData = function (userid) {
        // console.log("+++++++++",this.baseURL);
        this.geturl();
        return this._http.get(this.baseURL + "/getFilterData?jsonObj={" + "userId:" + userid + "}").pipe(operators_1.catchError(this.errorHandler));
    };
    // mileage exception Api
    ApiserviceService.prototype.getMileageException = function (jsondata) {
        this.geturl();
        return this._http.get(this.baseURL + "/getMilegeExceptionData?jsonObj=" + jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    ApiserviceService.prototype.acceptMilegeException = function (jsondata) {
        this.geturl();
        console.log(jsondata);
        return this._http.get(this.baseURL + "/acceptMilegeException?jsonObj=" + jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    ApiserviceService.prototype.updateMilege = function (jsondata) {
        this.geturl();
        return this._http.get(this.baseURL + "/updateMilege?jsonObj=" + jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    // invaidCaller exception Api
    ApiserviceService.prototype.getCallerIdExceptionData = function (jsondata) {
        // this.geturl()
        return this._http.get(this.baseURL + "/getCallerIdExceptionData?jsonObj=" + jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    ApiserviceService.prototype.acceptCallerIdException = function (jsondata) {
        this.geturl();
        // return this._http.post("http://poc.aquilasoftware.com/poclite" + "_test/callmanagement/acceptCallerIdException" , jsondata).pipe(catchError(this.errorHandler));
        return this._http.post(this.baseURL + "/acceptCallerIdException", jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    ApiserviceService.prototype.updatePSPhone = function (jsondata) {
        this.geturl();
        return this._http.get(this.baseURL + "/updatePSPhone?jsonObj=" + jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    //GPS exception Apis
    ApiserviceService.prototype.getGpsExceptionData = function (jsondata) {
        // this.geturl()
        return this._http.get(this.baseURL + "/getGpsExceptionData?jsonObj=" + jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    ApiserviceService.prototype.acceptGpsException = function (jsondata) {
        this.geturl();
        return this._http.post(this.baseURL + "/acceptGpsException", jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    ApiserviceService.prototype.updateGpsException = function (jsondata) {
        this.geturl();
        return this._http.get(this.baseURL + "/updateGpsException?jsonObj=" + jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    ApiserviceService.prototype.saveFormatAddress = function (jsondata) {
        this.geturl();
        return this._http.get(this.baseURL + "/saveFormatAddress?jsonObj=" + jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    //public schedule variance
    ApiserviceService.prototype.getScheduleVarExceptionData = function (jsondata) {
        this.geturl();
        return this._http.get(this.baseURL + "/getScheduleVarExceptionData?jsonObj=" + jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    ApiserviceService.prototype.acceptScheduleVarException = function (jsondata) {
        this.geturl();
        return this._http.get(this.baseURL + "/acceptScheduleVarException?jsonObj=" + jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    ApiserviceService.prototype.updateReportedTimes = function (jsondata) {
        this.geturl();
        return this._http.get(this.baseURL + "/updateReportedTimes?jsonObj=" + jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    //public travel time
    ApiserviceService.prototype.getTravelTimeExceptionData = function (jsondata) {
        this.geturl();
        return this._http.get(this.baseURL + "/getTravelTimeExceptionData?jsonObj=" + jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    ApiserviceService.prototype.acceptTravelTimeException = function (jsondata) {
        this.geturl();
        return this._http.get(this.baseURL + "/acceptTravelTimeException?jsonObj=" + jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    ApiserviceService.prototype.updateTravelTime = function (jsondata) {
        this.geturl();
        return this._http.get(this.baseURL + "/updateTravelTime?jsonObj=" + jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    // methods for clockin OR out exceptions
    ApiserviceService.prototype.getUnLinkedArrivalDeparture = function (jsondata) {
        this.geturl();
        return this._http.get(this.baseURL + "/getUnLinkedArrivalDeparture?jsonObj=" + jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    ApiserviceService.prototype.createArrivalDeparture = function (jsondata) {
        this.geturl();
        return this._http.get(this.baseURL + "/createArrivalDeparture?jsonObj=" + jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    //methods for clockIn AND clockOut exceptions
    ApiserviceService.prototype.getUnLinkedPunches = function (jsondata) {
        this.geturl();
        return this._http.get(this.baseURL + "/getUnLinkedPunches?jsonObj=" + jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    ApiserviceService.prototype.createPunchForSchedule = function (jsondata) {
        this.geturl();
        return this._http.get(this.baseURL + "/createPunchForSchedule?jsonObj=" + jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    ApiserviceService.prototype.getUserSites = function (jsondata) {
        this.geturl();
        return this._http.get(this.baseURL + "/getUserSites?jsonObj=" + jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    ApiserviceService.prototype.getVisitsCountsToCSSLevel = function (jsondata) {
        this.geturl();
        return this._http.get(this.baseURL + "/getVisitsCountsToCSSLevel?jsonObj=" + jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    ApiserviceService.prototype.getPSVisitDetails = function (jsondata) {
        this.geturl();
        return this._http.get(this.baseURL + "/getPSVisitDetails?jsonObj=" + jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    ApiserviceService.prototype.getVisitsCountsToPSLevel = function (jsondata) {
        this.geturl();
        return this._http.get(this.baseURL + "/getVisitsCountsToPSLevel?jsonObj=" + jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    ApiserviceService.prototype.getVisitsDashboardDetails = function (jsondata) {
        this.geturl();
        return this._http.get(this.baseURL + "/getVisitsDashboardDetails?jsonObj=" + jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    ApiserviceService.prototype.getInvalidTokenCodeExceptionData = function (jsondata) {
        this.geturl();
        return this._http.get(this.baseURL + "/getInvalidTokenCodeExceptionData?jsonObj=" + jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    ApiserviceService.prototype.acceptInvalidTokenCodeException = function (jsondata) {
        this.geturl();
        return this._http.get(this.baseURL + "/acceptInvalidTokenCodeException?jsonObj=" + jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    ApiserviceService.prototype.updateTokenCode = function (jsondata) {
        this.geturl();
        return this._http.get(this.baseURL + "/updateTokenCode?jsonObj=" + jsondata).pipe(operators_1.catchError(this.errorHandler));
    };
    // method for error handling
    ApiserviceService.prototype.errorHandler = function (error) {
        console.log("error in API service", error);
        return rxjs_1.throwError(error);
    };
    //public
    ApiserviceService.prototype.checkUser = function () {
        var data = sessionStorage.getItem('useraccount');
        var token = JSON.parse(data);
        if (token != undefined) {
            // return false;
            if (token.priviledFlag == 'schedule') {
                return true;
            }
            else {
                return false;
            }
        }
    };
    ApiserviceService.prototype.checkAll = function () {
        var data = sessionStorage.getItem('useraccount');
        var token = JSON.parse(data);
        if (token != undefined) {
            if (token.priviledFlag == 'all') {
                return true;
            }
            else {
                return false;
            }
        }
    };
    ApiserviceService.prototype.loggedIn = function () {
        return !!sessionStorage.getItem('useraccount');
    };
    //To check exceptions is their or not
    ApiserviceService.prototype.checkException = function (data) {
        console.log(data);
        if (data.ArrGpsException == 1 || data.DepGpsException == 1 || data.scheduleVarException == 1 || data.arrCallerIdException == 1 || data.depCallerIdException == 1 || data.depMileageException == 1 || data.arrMileageException == 1 || data.depTokenCodeException == 1 || data.arrTokenCodeException == 1 || data.arrTravelTimeException == 1) {
            localStorage.setItem("userlist", JSON.stringify(data));
            return true;
        }
        else {
            localStorage.removeItem("userlist");
            console.log("exceptions are not more than one");
            return false;
        }
    };
    ApiserviceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ApiserviceService);
    return ApiserviceService;
}());
exports.ApiserviceService = ApiserviceService;
