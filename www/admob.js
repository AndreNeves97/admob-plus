"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cordova_1 = require("cordova");
var banner_1 = __importDefault(require("./banner"));
var base_1 = require("./base");
var interstitial_1 = __importDefault(require("./interstitial"));
var reward_video_1 = __importDefault(require("./reward-video"));
var state_1 = __importDefault(require("./state"));
var AdMob = /** @class */ (function () {
    function AdMob() {
        var _this = this;
        var state = new state_1.default();
        this.state = state;
        this.banner = new banner_1.default(state);
        this.interstitial = new interstitial_1.default(state);
        this.rewardVideo = new reward_video_1.default(state);
        document.addEventListener('deviceready', function () {
            _this.ready();
        }, false);
    }
    AdMob.prototype.setAppMuted = function (value) {
        return base_1.execAsync(base_1.NativeActions.set_app_muted, [value]);
    };
    AdMob.prototype.setAppVolume = function (value) {
        return base_1.execAsync(base_1.NativeActions.set_app_volume, [value]);
    };
    AdMob.prototype.setDevMode = function (value) {
        this.state.devMode = value;
    };
    AdMob.prototype.ready = function () {
        var _this = this;
        cordova_1.exec(function (event) {
            _this.state.applicationId = event.data.applicationId;
            base_1.fireDocumentEvent(event.type, event.data);
        }, function (err) {
            alert(err);
        }, base_1.NativeActions.Service, base_1.NativeActions.ready);
    };
    return AdMob;
}());
var admob = new AdMob();
exports.default = admob;
