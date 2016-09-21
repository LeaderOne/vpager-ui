class AppConfig {
    static getHostname() {
        return window.location.host;
    }

    static getServicesUrl() {
        return window.location.host + '/services';
    }
}

let _instance = new AppConfig();
module.exports = _instance;