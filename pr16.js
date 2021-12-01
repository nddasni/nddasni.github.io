
var intervals = new Array();
var minWindowSize       = 560;
var middleWindowSize    = 780;
function htmlspecialchars(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}
function mktime() {
    return Math.floor(Date.now() / 1000);
}

function readable_seconds(rdif) {
    dif = ">"+Math.floor((rdif)/(3600*24*30))+" months";
    if (rdif<(3600*24*60)) dif="~"+Math.floor((rdif)/(3600*24*7))+" weeks";
    if (rdif<(3600*24*7)) dif="~"+Math.floor((rdif)/(3600*24))+" days";
    if (rdif<(3600*48)) dif=Math.floor((rdif)/3600)+" hours, "+Math.floor((((rdif)/3600)-Math.floor((rdif)/3600))*60)+" minutes";
    if (rdif<3600 && rdif>=60) dif=Math.floor((rdif)/60)+" minutes";
    if (rdif<60 && rdif>0) dif=rdif + " seconds";
    if (rdif<=0) dif="0 seconds";
    return dif;
}

function removeFromArray(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
            
function validateEntry(value, mode) {
    switch (mode) {
        case 'alfanumeric_nospace':
            value = value.replace(/[^a-zA-Z0-9]+/g, '');
        break;

        case 'email':
            value = value.replace(/[^a-zA-Z0-9@.\-_]+/g, '');
        break;

        case "numeric":
            value = value.replace(/[^0-9]+/g, '');
        break;
    }
    return value;
}
function deepObjectCopy(obj) {
   if (Object.prototype.toString.call(obj) === '[object Array]') {
      var out = [], i = 0, len = obj.length;
      for ( ; i < len; i++ ) {
         out[i] = arguments.callee(obj[i]);
      }
      return out;
   }
   if (typeof obj === 'object') {
      var out = {}, i;
      for ( i in obj ) {
         out[i] = arguments.callee(obj[i]);
      }
      return out;
   }
   return obj;
}
function escapeHtmlBrackets(value) {
    if (typeof value == "string") return value.replace(/[<>]/g,'');
    else return value;
}

function copyToClipboard(value) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(value).select();
  document.execCommand("copy");
  $temp.remove();
}

function Anti(options){


    $("#loadingDiv").html('starting framework..');
    Anti.middleWindowSize    = 780;
    Anti.currentClass        = '';
    Anti.currentClassName    = '';
    Anti.intervals           = [];
    Anti.panelPath           = options.path;
    Anti.defaultRoute        = options.defaultRoute;
    Anti.authCookie          = options.authCookie;
    Anti.authCookieValue     = '';
    Anti.loginLocation       = options.loginLocation;
    Anti.classParameters     = [];
    Anti.loaderStartTime     = 0;
    Anti.loaderTimeOut       = 0;
    Anti.initLocationPath    = document.location.pathname.replace('/'+options.path+'/','');
    Anti.disableAutoNavigation = false;
    Anti.disableAutoNavigationTimer = 0;
    Anti.currentLocation     = '';
    Anti.versionUpdateRequired = false;
    Anti.lastDebugStamp      = 0;
    Anti.debugLevel          = 'production';
    Anti.transitionEventTimeout = 0;
    Anti.pageSection         = '';
    Anti.activeNotifications = (typeof options.activeNotifications != "undefined") ? options.activeNotifications : true;
    Anti.notificationsPeriod = 60000;
    Anti.isFirstLoad         = true;
    Anti.runDubleScaleEventTimer =   0;
    Anti.searchBarEnabled    = false;
    Anti.failedRedirectsCount= 0;
    
    if (typeof options.apiPrePath != "undefined") Anti.apiPrePath = options.apiPrePath;
    if (typeof options.debugLevel != "undefined") Anti.debugLevel = options.debugLevel;
    if (typeof options.notificationsPeriod != "undefined") Anti.notificationsPeriod = options.notificationsPeriod;
    if (typeof options.searchBar != "undefined") Anti.searchBarEnabled = options.searchBar;

    this.classes = {menu:'menu',start:'start',entrance:'entrance',earn:'earn',reports_stats:'stats',reports_systemstats:'systemstats',captchas_errors:'cerrors',captchas_toplist:'toplist',info_app:'app',info_ratingsinfo:'ratingsinfo',captchas_sleeping:'sleeping',captchas_lazy:'lazy',finance_history:'history',finance_withdraw:'withdraw',finance_mycards:'mycards',settings_account:'account',settings_profile:'profile',tools_referrals:'referrals',tools_unban:'unban',info_faq:'faq',tools_story:'story',info_cert:'cert',info_plugin:'plugin',info_priority:'priority',info_recaptchaupdates:'recaptchaupdates',tools_pump:'pump',info_referrermessage:'referrermessage',tools_reftop:'reftop',tools_fingerprint:'fingerprint',tools_retest:'retest',finance_cryptoswapp:'cryptoswapp',finance_applyexchanger:'applyexchanger'};Anti.menu = {

    currentVersion: '1.0.141',

    updateTopMenu: function() {
        Anti.api("notifications", { }, function(data){
            if (data.status == 'ok') {

                Anti.menu.setNotifications = [];
                Anti.menu.checkGmailTasks(data);
                Anti.menu.checkRecaptchaNews(data);
                Anti.menu.checkRefMessage(data);
                $("#workerBalance").html('$'+data.balance);

                if (data.kstories == 'show') {
                    $("#kolostoriesInvite").slideDown(500);
                } else {
                    $("#kolostoriesInvite").hide();
                }

                if (Anti.menu.setNotifications.length == 0) {
                    document.title = Anti.currentClass.windowTitle;
                } else {
                    document.title = '('+Anti.menu.setNotifications.length+') '+Anti.currentClass.windowTitle;
                }

                Anti.topMenuManager.setNotifications(Anti.menu.setNotifications);

                if (data.currentVersion != Anti.menu.currentVersion) {
                    //setting update flag
                    Anti.versionUpdateRequired = true;
                }
            }
        });
    },

    checkRecaptchaNews: function(data) {
        if (data.recaptchaNews) {
            $("#recaptchaNews").show();
            messageTitle = sprintf('%s new Gmail tasks available',data.gmailTasksCount);

            this.setNotifications.push({
                id:       Math.floor(Math.random()*10000),
                icon:     'news',
                title:    'Recaptcha news update available!',
                message:  null,
                instantCallback: true,
                callback: function(){
                    Anti.navigate("info/recaptchaupdates");
                }
            });
            return true;
        } else {
            return false;
        }
    },

    checkGmailTasks: function(data) {
        if (data.gmailTasksCount > 0) {
            messageTitle = sprintf('%s new Gmail tasks available',data.gmailTasksCount);

            this.setNotifications.push({
                id:       Math.floor(Math.random()*10000),
                icon:     'mail',
                title:    messageTitle,
                message:  null,
                instantCallback: true,
                callback: function(){
                    Anti.navigate("tools/pump");
                }
            });
            return true;
        } else {
            return false;
        }
    },

    checkRefMessage: function(data) {
        if (data.newRefMessage) {

            messageTitle = 'New message from user who had referred you';

            this.setNotifications.push({
                id:       Math.floor(Math.random()*10000),
                icon:     'mail',
                title:    messageTitle,
                message:  null,
                instantCallback: true,
                callback: function(){
                    Anti.navigate("info/referrermessage");
                }
            });
            return true;
        } else {
            return false;
        }
    },

    requestLanguageMenu: function() {
        Anti.api("getInterfaceLanguages", {}, function(data) {
            Anti.topMenuManager.setLanguageMenu(data.languages, function(langId) {
                document.location='/main?action=setLanguage&id='+langId+"&back="+escape(window.location.pathname);
            });
            $(".infoicons > .info-flags > .flag").addClass('flag-'+data.currentLangId);
        });
    }

};Anti.start = {

    recaptchaNews: false,
    windowTitle: 'Start Page',

    settings: {
        accessData: {},
        pluginCompatatibleBrowser: false,
        pluginCompatatibleCertificate: false,
        pluginRunning: false,
        //pluginDisabledManually: false,
        pluginVersion: 0.62,
        pluginVersionReported: false,
        userPluginVersion: 0,
        hideAndroidPromo: false,
        hideUnbanPromo: false,
        antiGateAccess: false,
        blockRecaptchaCompatibleSetting: false,
        //load job settings only once
        userRecaptchaSettingsChecked: false,
        v3domain: '',
        v3path: '',
        v3score: 0,
        murmur: false
    },

    v3RunCheckDelay: 0,

    init: function() {

        $$$.settings.murmur = false;
        Anti.earn.interface.clearWorkArea("start page call");
        Anti.firstLoad(function() {
            Anti.start.checkPluginCompatibility();
            Anti.start.loadJobSettings(false);
            Anti.api("account", {action : 'check'});
        });

        Anti.api("stats/getCaptchaMonthTotals", {}, function(data) {
            $("#captchaMonthCountLabel").html(data.captchas);
            $("#captchaMonthEarningLabel").html(data.earnings);
            Anti.earn.settings.showApp = data.showApp;
            //show android app info
            if (data.showApp) {
                setTimeout(function(){
                    if (!$$$.settings.hideAndroidPromo) $("#androidApp").fadeIn(500);
                },2000);

            }
        });


        Anti.hideLoader({"auth":{"id":963101,"sign":"726399f8394acd1eaaeff108ca50aebb","key":"b94b2e1cdb765daf13981be6f2593bec"},"data":{"taskId":12345,"errorType":"slow"}});

        // $$$.checkFactoryAccess();
        $$$.checkRecaptchaAccess();
        $$$.updateNews();
        $$$.getAverageBids();

    },

    updateNews: function() {
        Anti.api("tools/getNews", {}, function(data) {
            Anti.htmlRecords("startNewsRow", data.records, $("#newsContainer"));
            maxId = 0; maxText = '';
            for (i in data.records) {
                rowId = parseInt(data.records[i].id);
                if (rowId > maxId) {
                    maxId = rowId;
                    maxText = data.records[i].message;
                }
            }
            if (data.lastReadId < maxId) {
                Anti.html(maxText, $("#newsText"));
                $("#newsWidget").show();
            }
        });
    },

    markNewsAsRead: function() {
        Anti.api("tools/markNewsAsRead", {});
        $("#newsWidget").hide(500);
    },

    updatePriorityData: function() {
        Anti.api("5000", {}, function(data){
            $("#recaptchaPriorityStartLabel").html('5000'+' / '+data.maxTotalRecaptcha);
            $("#imagePriorityStartLabel").html(data.imagePriority+' / '+data.maxTotalImage);
        });
    },

    getAverageBids: function() {
        Anti.api("stats/getAverageBids", {}, function(data){
            $("#imageAverageBidLabel").html(data.imageBid+" / 1000");
            $("#moderationAverageBidLabel").html(data.moderationBid+" / 1000");
            $("#avgRecaptchaBid").html(data.recaptchaBid);
            $("#funcaptchaAverageBidLabel").html(data.funcaptchaBid+" / 1000");
            $("#geetestAverageBidLabel").html(data.geetestBid+" / 1000");
            $("#hcaptchaAverageBidLabel").html(data.hcaptchaBid+" / 1000");
            $("#antigateAverageBidLabel").html(data.antiGateBid+" / 1000");

            $("#imageLoadLabel").attr('title',data.imageLoad+'% demand');
            $("#imageLoadProgress").css({'width': data.imageLoad+'%', 'background-color': '#'+data.imageLoadColor});

            $("#recaptchaLoadLabel").attr('title',data.recaptchaLoad+'% demand');
            $("#recaptchaLoadProgress").css({'width': data.recaptchaLoad+'%', 'background-color': '#'+data.recaptchaLoadColor});

            $("#funcaptchaLoadLabel").attr('title',data.funcaptchaLoad+'% demand');
            $("#funcaptchaLoadProgress").css({'width': data.funcaptchaLoad+'%', 'background-color': '#'+data.funcaptchaLoadColor});

            $("#geetestLoadLabel").attr('title',data.geetestLoad+'% demand');
            $("#geetestLoadProgress").css({'width': data.geetestLoad+'%', 'background-color': '#'+data.geetestLoadColor});

            $("#hcaptchaLoadLabel").attr('title',data.hCaptchaLoad+'% demand');
            $("#hcaptchaLoadProgress").css({'width': data.hCaptchaLoad+'%', 'background-color': '#'+data.hCaptchaLoadColor});

            $("#antigateLoadLabel").attr('title',data.antiGateLoad+'% demand');
            $("#antigateLoadProgress").css({'width': data.antiGateLoad+'%', 'background-color': '#'+data.antiGateLoadColor});
        });
    },

    checkRecaptchaAccess: function() {
        Anti.api("captchas/getRecaptchaAccess", {
            pluginVersion: Anti.start.settings.userPluginVersion
        }, function(data){

            Anti.start.settings.accessData = data;

            //available plugin version
            Anti.start.settings.pluginVersion = data.pluginVersion;

            if (!data.hasAccess) {
                if (data.banType == "permanent") {
                    $("#recaptchaAccountStatusLabel").removeClass("thick-green").addClass("error").html('Banned for cheating with unofficial applications or plugins.<br>Use clean browser installation, remove all other plugins.');
                } else {
                    $("#recaptchaAccountStatusLabel").removeClass("thick-green").addClass("error").html(sprintf("You are banned in Google.<br> Your reCAPTCHA solutions are not working.<br>Clean your cookies, change IP and try at another KB account.<br>Unban time left: %s", data.unbanTimeLeft));
                }
            } else {
                $("#recaptchaAccountStatusLabel").removeClass("error").addClass("thick-green").html("<b>All fine</b>");
            }
            if (data.pumpAccess != false) {
                $("#gmailPumpHintRow").show();
                if (data.usingPump == false) {
                    template = 'newPumpTaskNotUsing';
                } else {
                    if (data.pumpTasksCount > 0) {
                        template = 'newPumpTaskAvailable';
                    } else {
                        template = 'startGreenCheck';
                    }
                }
                Anti.html(Anti.hb(template)(data), $("#gmailPumpLabel"));
            }
            if (data.ipbanned) {
                $("#ipStatusLabel").addClass("error").html("IP BANNED by Google");
            } else {
                $("#ipStatusLabel").addClass("thick-green").html("<b>All fine</b>");
            }

            if (data.v3Access) {

                Anti.start.v3domain = data.v3domain;
                Anti.start.v3path   = data.v3path;

                Anti.earn.states.v3checkedAtInit = true;

                //delayed v3 start
                clearInterval(Anti.start.v3RunCheckDelay);
                Anti.start.v3RunCheckDelay = setTimeout(function(){
                    Anti.debugstr('running v3RunCheck');
                    Anti.start.v3RunCheck();
                    setTimeout(function(){
                        Anti.start.getV3Score(1);
                    }, 10000);
                }, 5000);

            }

            Anti.start.settings.antiGateAccess = data.antiGateAccess;
            if (data.antiGateAccess) {
                $("#antigateStoryRequiredLabel").hide();
                Anti.start.enableOrDisableAntigate();
            } else {
                Anti.earn.settings.antigateEnabled = false;
            }

        });
    },

    enableOrDisableAntigate() {
        if (!Anti.start.settings.antiGateAccess || Anti.start.settings.userPluginVersion < 2.48) {
            $("#antigateToggler").addClass('disabled');
        } else {
            $("#antigateToggler").removeClass('disabled');
        }
    },

    showIPBannedHint: function() {
        Anti.dialogsManager.message('This shows your IP clearance status. ' +
            'If it is green, then everything is fine and you can work. ' +
            'If it is red and IP is banned then you need to get new IP from your internet provider by reconnecting your internet or by using a VPN service. ' +
            'Accounts with banned IPs are not able to receive Recaptcha tasks.');
    },
    //
    // checkFactoryAccess: function() {
    //     Anti.api("factory/getFactoryAccess", {}, function(data) {
    //         /*if (data.emptyProfile) {
    //             Anti.navigate("settings/profile");
    //         }*/
    //         if (data.hasAccess) {
    //             //$("#factoryButton").show();
    //             Anti.start.loadMyFactories();
    //             if (data.newCount > 0) {
    //                 $("#newCount").show().html(data.newCount + ' new');
    //             } else {
    //                 $("#newCount").hide();
    //             }
    //         }
    //     });
    // },
    //
    // loadMyFactories: function() {
    //     Anti.api("factory/getMyFactories", {}, function(data) {
    //         for (i in data) {
    //             Anti.htmlAppend(Anti.hb("startpageFactoryCard")(data[i]), $(".professions-list"));
    //         }
    //     });
    // },
    //
    // saveFactoryStatus: function(factoryId, isEnabled) {
    //     Anti.api("factory/saveFactoryStatus", {
    //         factoryId: factoryId,
    //         enabled: isEnabled
    //     });
    // },
    //
    // removeFactory: function(factoryId) {
    //     Anti.directory.dialog.removeFactory(factoryId);
    //     $("#factoryWidget"+factoryId).remove();
    // },

    loadJobSettings: function(calledFromEarningsPage) {
        Anti.api("settings/tune", {action: 'get'}, function (data) {
            Anti.hideLoader();

            Anti.earn.settings.recaptchaEnabled = (data.enable_recaptcha === 'true' || data.enable_recaptcha === '' || data.enable_recaptcha === true);
            Anti.earn.settings.imageCaptchaEnabled = (data.enable_imagecaptcha === 'true' || data.enable_imagecaptcha === '' || data.enable_imagecaptcha === true);
            Anti.earn.settings.funcaptchaEnabled = (data.enable_funcaptcha === 'true' || data.enable_funcaptcha === '' || data.enable_funcaptcha === true);
            Anti.earn.settings.geeTestEnabled = (data.enable_geetest === 'true' || data.enable_geetest === '' || data.enable_geetest === true);
            Anti.earn.settings.hcaptchaEnabled = (data.enable_hcaptcha === 'true' || data.enable_hcaptcha === '' || data.enable_hcaptcha === true);
            Anti.earn.settings.moderationsEnabled = (data.enable_moderations === 'true' || data.enable_moderations === '' || data.enable_moderations === true);
            Anti.earn.settings.antigateEnabled = (data.enable_antigate === 'true' || data.enable_antigate === '' || data.enable_antigate === true);

            if (calledFromEarningsPage) {
                if (data.theme != '') Anti.earn.interface.setTheme(data.theme, false);
                else Anti.earn.interface.setTheme(Anti.earn.settings.themeName, false);
                if (data.captcha_sound != '') Anti.earn.settings.enabledSound = data.captcha_sound == 'true';
                if (data.captcha_zoom != '') {
                    Anti.earn.settings.zoomLevel = parseFloat(data.captcha_zoom);
                }
                Anti.earn.settings.pluginOpenTarget = data.pluginOpenTarget == '' ? 'iframe' : data.pluginOpenTarget;
                Anti.earn.settings.discountValue = data.discount;
                Anti.earn.interface.setSoundLabel();
                Anti.earn.interface.setZoomLevel();
                Anti.earn.interface.updateDiscountButtons();
                Anti.earn.interface.updatePluginOptions();
                Anti.earn.interface.updateCookiesAutocleanState();
                Anti.earn.stats.updateSysloadWidgets();

                //image gauges
                if (!Anti.earn.settings.imageCaptchaEnabled) {
                    $(".imagecaptcha-gauge").addClass("disabled");
                    $("#imageCaptchasDisabledLabel").show();
                    if ($("#nextLevelInfo").is(":visible")) {
                        $("#imageCaptchasDisabledLabel").html('image captchas disabled');
                    } else {
                        $("#imageCaptchasDisabledLabel").html('img.capt off');
                    }
                }
            } else {

                Anti.settingsManager.setValue('enableRecaptcha', Anti.earn.settings.recaptchaEnabled);
                Anti.settingsManager.setValue('enableImageCaptcha', Anti.earn.settings.imageCaptchaEnabled);
                Anti.settingsManager.setValue('enableFunCaptcha', Anti.earn.settings.funcaptchaEnabled);
                Anti.settingsManager.setValue('enableGeetest', Anti.earn.settings.geeTestEnabled);
                Anti.settingsManager.setValue('enableHCaptcha', Anti.earn.settings.hcaptchaEnabled);
                Anti.settingsManager.setValue('enableModerations', Anti.earn.settings.moderationsEnabled);
                Anti.settingsManager.setValue('enableAntiGate', Anti.earn.settings.antigateEnabled);

                if (Anti.start.recaptchaNews) {
                    $("#recaptchaNews").show();
                }
                if (data.imageCaptchaSuspended) {
                    $("#imageCaptchaBanned").show();
                    Anti.earn.settings.imageCaptchaEnabled = false;
                    Anti.settingsManager.setValue('enableImageCaptcha', false);
                }
                if (data.imStatus) {
                    if (data.imStatus.status === 'banned') {
                        $("#moderationBanned").show();
                        Anti.earn.settings.moderationsEnabled = false;
                        Anti.settingsManager.setValue('enableModerations', false);
                    }
                    $("#moderationLevel").html(data.imStatus.status);
                    $("#moderationPoints").html(data.imStatus.points);
                    $("#moderationVotes").html(data.imStatus.votes);
                }

                $$$.settings.hideAndroidPromo = data.hide_android_promo == 'true';
                $$$.settings.hideUnbanPromo = data.hide_unban_promo == 'true';
                if ($$$.settings.hideUnbanPromo) {
                    $("#unbanSuggestbox").hide();
                }
            }

        });
    },

    hideMessage: function(type) {
        if (type == 'hide_android_promo') {
            $("#androidApp").hide();
            Anti.api("settings/tune", { action: 'save', hide_android_promo : 'true' });
        }
        if (type == 'hide_unban_promo') {
            $("#unbanSuggestbox").hide();
            Anti.api("settings/tune", { action: 'save', hide_unban_promo : 'true' });
        }
    },

    saveSettings: function(param, value) {
        if (param == 'enableRecaptcha') {

            Anti.earn.settings.recaptchaEnabled = value;
            Anti.api("settings/tune", { action: 'save', enable_recaptcha : value ? 'true' : 'false' });

            if (value) {
                Anti.debugstr("enabling plugin tasks");
            } else {
                Anti.debugstr("disabling plugin tasks");
            }
        }
        if (param == 'enableImageCaptcha') {
            Anti.earn.settings.imageCaptchaEnabled = value;
            Anti.api("settings/tune", { action: 'save', enable_imagecaptcha : value ? 'true' : 'false' });
        }
        if (param == 'enableFunCaptcha') {
            Anti.earn.settings.funcaptchaEnabled = value;
            Anti.api("settings/tune", { action: 'save', enable_funcaptcha : value ? 'true' : 'false' });
        }
        if (param == 'enableGeetest') {
            Anti.earn.settings.geeTestEnabled = value;
            Anti.api("settings/tune", { action: 'save', enable_geetest : value ? 'true' : 'false' });
        }
        if (param == 'enableHCaptcha') {
            Anti.earn.settings.hcaptchaEnabled = value;
            Anti.api("settings/tune", { action: 'save', enable_hcaptcha : value ? 'true' : 'false' });
        }
        if (param == 'enableModerations') {
            Anti.earn.settings.moderationsEnabled = value;
            Anti.api("settings/tune", { action: 'save', enable_moderations : value ? 'true' : 'false' });
        }
        if (param == 'enableAntiGate') {
            Anti.earn.settings.antigateEnabled = value;
            Anti.api("settings/tune", { action: 'save', enable_antigate : value ? 'true' : 'false' });
        }
    },

    murmur: function() {

        if (Anti.start.settings.murmur) return;
        Anti.start.settings.murmur = true;

        setTimeout(function() {
            Fingerprint2.get({excludes: {userAgent: true, language: true}}, function (components) {

                Anti.api("tools/reportTelemetry", {
                    "type": "murmur",
                    "murmur": Fingerprint2.x64hash128(components.map(function (pair) {
                        return pair.value
                    }).join(), 31),
                    "components": components
                });
            });
        },10000);
    },

    pluginCompatibiltyCallback: function() {
        Anti.debugstr('pluginCompatibiltyCallback: pluginCompatatibleBrowser: '+(Anti.start.settings.pluginCompatatibleBrowser ? 'true' : 'false'));
        Anti.debugstr('pluginCompatibiltyCallback: pluginRunning: '+(Anti.start.settings.pluginRunning ? 'true' : 'false'));
        Anti.debugstr('pluginCompatibiltyCallback: pluginCompatatibleCertificate: '+(Anti.start.settings.pluginCompatatibleCertificate ? 'true' : 'false'));
        if (Anti.start.settings.pluginCompatatibleBrowser && Anti.start.settings.pluginRunning && Anti.start.settings.pluginCompatatibleCertificate) {

            $("#recaptchaFollowTitlte").hide();

            var signtoken = new Date().getTime().toString()+"_"+Math.random().toString();
            Anti.earn.processor.pluginCaptchas.plugApi({
                token: signtoken,
                type: 'version'
            }, function(response){

                // console.warn('sign 1', response.sign, 'token', signtoken);

                if (typeof response.sign != "undefined") {
                    Anti.earn.states.ps = response.sign;
                    Anti.earn.states.po = signtoken;
                } else {
                    Anti.earn.states.ps = "empty1";
                    Anti.earn.states.po = signtoken;
                }

                //compatibilities
                if (typeof response.recaptchaProxylessSupport != "undefined") {
                    Anti.earn.compatibility.recaptchaProxyless = response.recaptchaProxylessSupport;
                }
                if (typeof response.recaptchaV3Support != "undefined") {
                    Anti.earn.compatibility.recaptchaV3Support = response.recaptchaV3Support;
                }
                if (typeof response.funcaptchaSupport != "undefined") {
                    Anti.earn.compatibility.funcaptcha = response.funcaptchaSupport;
                }
                if (typeof response.geeTestSupport != "undefined") {
                    Anti.earn.compatibility.geetest = response.geeTestSupport;
                }
                if (typeof response.hcaptchaSupport != "undefined") {
                    Anti.earn.compatibility.hcaptchaSupport = response.hcaptchaSupport;
                }

                //reporting current version
                if (!Anti.start.pluginVersionReported) {
                    Anti.api("stats/reportPluginVersion", {version: response.version});
                    Anti.start.pluginVersionReported = true;
                }
                version = parseFloat(response.version);
                Anti.start.settings.userPluginVersion = version;
                if (version >= Anti.start.settings.pluginVersion) {
                    Anti.html(Anti.hb("pluginVersionCorrectLabel")({version :version}), $("#pluginVersionLabel"));
                } else {
                    $("#currentPluginVersionLabel").html(sprintf(' (version %s available)', Anti.start.settings.pluginVersion));
                    Anti.html(Anti.hb("pluginVersionIncorrectLabel")({version :version, newversion: Anti.start.settings.pluginVersion}), $("#pluginVersionLabel"));
                }

                if (version >= 2.48) {
                    $("#antigateMinimumVersionLabel").hide();
                    Anti.start.enableOrDisableAntigate();
                } else {
                    Anti.start.saveSettings('enableAntiGate', false);
                }

                Anti.start.loadJobSettings(false);
                Anti.start.settings.userRecaptchaSettingsChecked = true;

                // Anti.start.murmur();


            });
        } else {

            Anti.earn.compatibility.recaptchaProxyless = false;
            Anti.earn.compatibility.funcaptcha = false;
            Anti.earn.compatibility.geetest = false;


        }
    },

    checkPluginCompatibilityButton: function() {
        Anti.start.checkPluginCompatibility();
        $("#checkPluginCompatibilityButton").remove();
    },

    checkPluginCompatibility: function() {
        $.ajax({
            url: 'https://cert.kolotibablo.com/api/tools/checkCert',
            type: 'POST',
            dataType:   'json',
            contentType: 'application/json; charset=utf-8',
            success :   function(data, status) {

                if (typeof data.response.status != "undefined") {
                    if (data.response.status == 'success') {
                        Anti.html(Anti.hb("startGreenCheck"), $("#certificateInstallLabel"));
                        Anti.start.settings.pluginCompatatibleCertificate = true;
                        Anti.start.pluginCompatibiltyCallback();
                    }
                }

            },
            error: function() {
                Anti.start.pluginCompatibiltyCallback();
            }
        });

        // if (Anti.start.settings.pluginDisabledManually) {
        //     checkType = 'check';
        // } else {
        //     checkType = 'proxyon';
        // }

        Anti.earn.processor.pluginCaptchas.plugApi({'type': 'proxyon'}, function (response) {
            if (typeof response != "undefined") {
                if (response == false) {
                    Anti.debugstr('no browser support');
                } else {
                    Anti.debugstr("got response from plugin");
                    //icon ok
                    Anti.html(Anti.hb("startGreenCheck"), $("#pluginInstallLabel"));

                    if (Anti.start.settings.pluginDisabledManually) {
                        Anti.debugstr("plugin was disabled manually");
                        Anti.start.showEnablePluginMessage();
                    } else {
                        Anti.debugstr("plugin was enabled");
                        Anti.start.settings.pluginRunning = true;
                        Anti.start.showDisablePluginMessage();
                    }

                    Anti.debugstr("updating user agents");
                    Anti.start.updateUserAgents();

                    //turns out it is disabled
                    // Anti.debugstr("sending auth data to plugin");
                    // Anti.earn.processor.pluginCaptchas.plugApi({
                    //     type: 'setAuth',
                    //     auth: Anti.getAuthData()
                    // }, function(){});

                }
            } else {
                Anti.debugstr("undefined response");
                if (Anti.start.settings.pluginDisabledManually) {
                    Anti.debugstr("showing message to enable plugin");
                    Anti.start.showEnablePluginMessage();
                } else {

                    Anti.html(Anti.hb("earnPluginInstructionLink"), $("#pluginInstallLabel"));
                    Anti.debugstr('no plugin installed');
                }
            }

            //checking browser compatibility
            var chromeInstalledLabel = $("#chromeInstalledLabel");
            if (/chrom(e|ium)/.test(navigator.userAgent.toLowerCase()) || navigator.userAgent.toLowerCase().indexOf('firefox') > -1 || Anti.start.settings.pluginRunning) {
                Anti.html(Anti.hb("startGreenCheck"), chromeInstalledLabel);
                Anti.start.settings.pluginCompatatibleBrowser = true;
            } else {
                Anti.debugstr("Incompatible user agent "+navigator.userAgent.toLowerCase());
                Anti.html(Anti.hb("browserInstructionLink"), chromeInstalledLabel);
            }


            Anti.start.pluginCompatibiltyCallback();
        });
    },

    updateUserAgents: function() {
        Anti.api("tools/getUserAgents", {}, function(data) {
            Anti.earn.processor.pluginCaptchas.plugApi({'type': 'setPredefinedUserAgentList', userAgentList: data});
        });
    },

    showEnablePluginMessage: function() {
        Anti.start.settings.pluginRunning = false;
        Anti.html(Anti.hb("earnPluginEnable"), $("#pluginInstallLabel"));
        $("#enabledPluginMessage").slideUp(200);
        Anti.start.pluginCompatibiltyCallback();
    },
    showDisablePluginMessage: function() {
        Anti.html(Anti.hb("earnPluginDisable")(), $("#pluginInstallLabel"));
        $("#enabledPluginMessage").slideDown(200);
        Anti.start.pluginCompatibiltyCallback();
    },

    enablePlugin: function() {
        //Anti.start.saveSettings('enableRecaptcha', true);
        //Anti.start.settings.pluginDisabledManually = false;
        Anti.earn.processor.pluginCaptchas.plugApi({'type': 'proxyon'}, function(){
            Anti.start.checkPluginCompatibility();
        });
    },
    disablePlugin: function() { //not using this
        Anti.start.saveSettings('enableRecaptcha', false);
        Anti.earn.processor.pluginCaptchas.plugApi({'type': 'proxyoff'}, function(){
            //Anti.start.settings.pluginDisabledManually = true;
            Anti.start.checkPluginCompatibility();
        });
    },

    toggleDebug: function() {
        Anti.earn.states.enableDebug = !Anti.earn.states.enableDebug;
        if (Anti.earn.states.enableDebug) Anti.debugLevel = 'debug';
        else Anti.debugLevel = '';
        console.log('debug status', Anti.earn.states.enableDebug);
    },

    // manageRemoteData: function(factoryId) {
    //     Anti.navigate("factory/directory");
    //     Anti.directory.dialog.manageRemoteData(factoryId);
    // },

    checkInstallation: function() {
        document.location = '/workers/start';
    },

    v3RunCheck: function() {
        if (Anti.start.settings.userPluginVersion == 0) {
            setTimeout(Anti.start.v3RunCheck, 10000);
            Anti.debugstr('user plugin version is empty, retrying in 10s');
        } else {
            $("#v3check").attr('src', 'https://' + Anti.start.v3domain + Anti.start.v3path + '?action=redirect&s=' + $.cookie(Anti.authCookie) + '&cl=' + Anti.start.settings.userPluginVersion);
        }
    },

    getV3Score: function(attempt) {
        if (attempt >= 20) {
            Anti.html('--&nbsp;&nbsp;&nbsp;install certificate and plugin first', $("#recaptchaScoreLabel"));
            return;
        }
        setTimeout(function(){

            Anti.api("stats/getV3Score", {clientVersion: Anti.start.settings.userPluginVersion}, function(data){
                var message = '';
                if (data.status == 'failed') {
                    Anti.start.getV3Score(attempt+1);
                } else {
                    Anti.start.v3score = data.score;
                    $("#recaptchaScoreRow").show();
                    if (data.score <= 0.5) {
                        message = '<span class="error"><b>'+data.score+'</b></span>';
                    } else {
                        message = '<span class="green"><b>'+data.score+'</b></span>';
                    }

                    message += '&nbsp;&nbsp;&nbsp;';
                    message += "<span class='dash-button' button-action='explainV3'>";
                    if (data.score == 0.1) {
                        message += 'You are 100% robot';
                        Anti.deleteInterval("checkRecaptchaAccessUpdate");
                    }
                    if (data.score == 0.3) {
                        message += "Very slow recaptcha.\nV3 tasks available.";
                    }
                    if (data.score == 0.7) {
                        message += "Average recaptcha speed.\nV3 tasks with higher rates.";
                    }
                    if (data.score == 0.9) {
                        message += "Good recaptcha speed.\nV3 tasks with highest rate.";
                    }
                    message += "</span>";
                }
                Anti.html(message, $("#recaptchaScoreLabel"));
            });

        }, 5000);
    },

    explainV3: function() {
        Anti.dialogsManager.message(
            'This score is measured by Google. It is a value between 0 and 1. ' +
            'The higher the value, the easier is Recaptcha.<br><br>' +
            '0.1: Google is 100% sure you are a bot, your recaptcha answers will not work.<br>' +
            '0.3: Google is almost sure you are a bot and gives you slowest recaptcha tasks.. You also start receiving Recaptcha V3 tasks.<br>' +
            '0.4-0.7 Good average value.<br>' +
            '0.8-0.9 Google thinks you are a human, fast solving Recaptcha.<br><br>' +
            'How to improve it:<br>' +
            '- Use our Gmail pump tool.<br>' +
            '- Switch between Gmail accounts.<br>' +
            '- Register as much Gmail accounts as you can. Use your relatives and friends phone numbers for SMS verifications.<br>' +
            '- Clean cookies, change User Agents, change IPs.',

            'What is score?',
            'tal'
        );
    },

    addPrecacheIframe: function() {},
    cacheLoaded: function() {
        console.warn('removing preload iframe');
        $("#preloadIframe").remove();
    }


};var a0a=['same_password','Password\x20complexity:\x20','signature','/workers/entrance','#enterlogin','checkPasswordResetAttempt','Password\x20must\x20differ\x20from\x20previous\x20one','bad','#tab_password_reset','#recoverForm','accountLogin','navigateEvent','deg)','Please\x20select\x20better\x20password','#confirmcode','jM9','Account\x20with\x20this\x20email\x20not\x20found','debugstr','animate','code_sent','resumeFormProcessing','We\x20have\x20sent\x20the\x20code\x20to\x20%s.\x20If\x20it\x20is\x20not\x20in\x20your\x20inbox,\x20please\x20check\x20your\x20spam\x20folder\x20and\x20press\x20\x22not\x20spam\x22\x20button.','events','checkAuth','#stayLogged','blankForm','captcha_id','Incorrect\x20email\x20address','nUd','reachGoal','pow','.pass-thumb','#password','warn','hideFormError','.main-content','<script\x20src=\x22https://www.google.com/recaptcha/api.js\x22></script><script>function\x20checkCaptcha(token){Anti.entrance.autoCheckCaptcha(token);}</script>','Incorrect\x20login\x20or\x20password','setpassword','compile','loadLanguageMenu','toString','#tab_password_reset\x20>\x20.result-msg','showLoginTab','hideLoader','css','^([^\x20]+(\x20+[^\x20]+)+)+[^\x20]}','buildMenu','med','setFormError','auth-mode-off','tab_auth_recover','#captchaForm','#registerSuccess','entrance','authCookie','panelPath','ejU73jslk9ns*jwDela','showFormError','blockFormProcessing','cleared\x20all\x20session\x20cookies','vtoken','3jfn&@jmn&d3v7jsd39lds','#g-recaptcha-response','prop','currentClass','#passwordResetForm','#regemail','navigate','#loginForm','rlogin','html','toggleClass','check','refcode','active','ok_auth','entering\x20system..','tap','addClass','div[style*=\x272000000000\x27]','execute','formsManager','sendData','fail_email','email','loginLocation','first','rotate(-','entranceImageCaptcha','#confirmcode,\x20#password_reset','too_many_captchas','getInterfaceLanguages','showCaptcha','#setPasswordButton','#recoverMessage','login','\x22\x20style=\x22display:table;\x20margin:\x2020px\x20auto;\x22></div>','checked','hide','recover','recaptchaHash','logout','6LdtdM8aAAAAACfTDNkLj4aaEiz58R6oIk2xn_JO','MD5','setLoggedOffMode','#tab_auth_register','apply','#refcode','#tab_auth_recover','checkLogin','#userSessionToken','tab_auth_login','auth-mode','fail_email_ban','type','#password_reset','api','slice','cookie','undefined','.lang-flags-list','checkRegister','constructor','success','indexOf','bad_passwords','Referral\x20code\x20installed:\x20','Low\x20password\x20strength.','workers','good','showInputError','val','slideDownQuick','getPanelPath','body','bad_data','check_result','show','#passwordResetAttempt','bad_confirmation','tabLabelClickEvent','setLocationParameters','result','\x20If\x20it\x20is\x20not\x20in\x20your\x20inbox,\x20please\x20check\x20your\x20spam\x20folder\x20and\x20press\x20\x22not\x20spam\x22\x20button.','session','#recaptchaForm','length','autoCheckCaptcha','<div\x20class=\x22g-recaptcha\x22\x20data-callback=\x22checkCaptcha\x22\x20data-sitekey=\x22','captchaText','defaultRoute','v3Token','#reglogin','htmlAfter','tabsManager','test','recaptcha','\x22).trigger(\x22tap\x22);','#registerForm','captchaAction','#recoveremail','ok_register','opacity','incorrect','account','fail_login','captcha','yacounterEvent','remove','mainDocumentLayoutLanguageSelector','attr','floor','loginName','authCookieValue','register','<script\x20async\x20src=\x22https://www.google.com/recaptcha/api.js?render=6LdtdM8aAAAAACfTDNkLj4aaEiz58R6oIk2xn_JO&onload=v3Onload\x22></script><script>function\x20v3Onload(){Anti.entrance.v3Onload();}</script>','#tab_auth_login','Please\x20use\x20password\x20with\x20numbers\x20and\x20letters\x20of\x20both\x20lower\x20and\x20upper\x20case.','.result-msg','$(\x22#','dimmed','Incorrect\x20or\x20expired\x20confirmation\x20code','login:\x20setting\x20logged\x20on\x20mode','Your\x20password\x20has\x20been\x20expired.\x20We\x27ve\x20sent\x20recover\x20code\x20to\x20your\x20email\x20%s.','#redirectAfterLogin','gresponse','.lang-flags','captchaId','showPasswordResetForm','removeClass','passwordStrength','bind','currentActiveTab','setLoggedOnMode','.side-main\x20>\x20.header'];(function(a,b){var c=function(g){while(--g){a['push'](a['shift']());}};var d=function(){var g={'data':{'key':'cookie','value':'timeout'},'setCookie':function(k,l,m,n){n=n||{};var o=l+'='+m;var p=0x0;for(var q=0x0,r=k['length'];q<r;q++){var s=k[q];o+=';\x20'+s;var t=k[s];k['push'](t);r=k['length'];if(t!==!![]){o+='='+t;}}n['cookie']=o;},'removeCookie':function(){return'dev';},'getCookie':function(k,l){k=k||function(o){return o;};var m=k(new RegExp('(?:^|;\x20)'+l['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var n=function(o,p){o(++p);};n(c,b);return m?decodeURIComponent(m[0x1]):undefined;}};var h=function(){var k=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return k['test'](g['removeCookie']['toString']());};g['updateCookie']=h;var i='';var j=g['updateCookie']();if(!j){g['setCookie'](['*'],'counter',0x1);}else if(j){i=g['getCookie'](null,'counter');}else{g['removeCookie']();}};d();}(a0a,0x170));var a0b=function(a,b){a=a-0x0;var c=a0a[a];return c;};var a0d=function(){var a=!![];return function(b,c){var d=a?function(){if(c){var e=c[a0b('0x83')](b,arguments);c=null;return e;}}:function(){};a=![];return d;};}();var a0c=a0d(this,function(){var a=function(){var b=a[a0b('0x93')]('return\x20/\x22\x20+\x20this\x20+\x20\x22/')()[a0b('0x3f')](a0b('0x46'));return!b['test'](a0c);};return a();});a0c();Anti[a0b('0x4e')]={'activeTab':a0b('0x31'),'windowTitle':'KB\x20Login','captcha_id':0x0,'sendData':{},'captchaAction':'','isSavePassword':![],'password_hash':'','loginName':'','passwordStrength':0x0,'recaptchaHash':'','currentActiveTab':'','vtoken':'','v3Token':'','setParameters':function(a){switch(a[a0b('0x6f')]){case'login':activateTab=a0b('0x88');break;case a0b('0x3'):a[a0b('0x6f')]=a0b('0x3');activateTab='tab_auth_register';setTimeout(function(){var b=$[a0b('0x8f')](a0b('0x62'));if(typeof b!=a0b('0x90')){if(b!=''){$(a0b('0x84'))[a0b('0x5f')](a0b('0x97')+b)['fadeIn'](0xc8);}}},0x7d0);break;case a0b('0x7c'):a['first']=a0b('0x7c');activateTab=a0b('0x4b');break;default:a['first']='';activateTab=a0b('0x88');break;}if(activateTab!=''&&Anti[a0b('0x4e')]['currentActiveTab']!=activateTab){Anti[a0b('0x4e')][a0b('0x15')]=activateTab;setTimeout(a0b('0x8')+activateTab+a0b('0xb6'),0x64);}Anti[a0b('0xa6')]([a[a0b('0x6f')]]);},'tabActivatedEvent':function(a){Anti[a0b('0xa6')]([a]);Anti['entrance'][a0b('0x15')]=a;},'init':function(){Anti[a0b('0x44')]();Anti[a0b('0x4e')][a0b('0xb0')]='';},'loadLanguageMenu':function(){Anti[a0b('0x8d')](a0b('0x74'),{},function(a){$(a0b('0xf'))['remove']();Anti[a0b('0xb2')](Anti['hb'](a0b('0xc2'))(a),$(a0b('0x17')));$(a0b('0xf'))[a0b('0x14')](a0b('0x66'),function(){$(this)['toggleClass'](a0b('0x63'));$(a0b('0x91'))[a0b('0x60')](a0b('0x63'));$(a0b('0x3b'))['toggleClass'](a0b('0x9'));});setTimeout(function(){$(a0b('0xf'))['addClass'](a0b('0x9d'))[a0b('0x2a')]({'opacity':0x1},0x1f4);},0x5dc);});},'showLoginTroublesForm':function(){Anti[a0b('0xb3')]['tabLabelClickEvent']($('#tab_troubles'));},'setLoggedOnMode':function(){Anti['debugstr'](a0b('0xb'));$('body')['addClass'](a0b('0x4a'));},'setLoggedOffMode':function(a){if(typeof Anti['currentClass'][a0b('0x23')]!=a0b('0x90')){Anti[a0b('0x59')][a0b('0x23')]();}$[a0b('0x8f')](Anti[a0b('0x4f')],'');$[a0b('0x8f')](Anti[a0b('0x4f')],'',{'expires':0x0});$[a0b('0x8f')](Anti[a0b('0x4f')],'',{'expires':0x0,'path':'/*'});$[a0b('0x8f')](Anti['authCookie'],'',{'expires':0x0,'path':a0b('0x1b')});console['log'](a0b('0x54'));Anti['debugstr']('setting\x20logged\x20off\x20mode');$(a0b('0x9f'))[a0b('0xc3')]('class',a0b('0x89'));loadPath=Anti[a0b('0x9e')]();if(loadPath[a0b('0x95')](Anti[a0b('0x6e')])==-0x1){loadPath=Anti[a0b('0x6e')];}Anti[a0b('0x5c')](loadPath);Anti[a0b('0x4e')][a0b('0x40')]();Anti[a0b('0x44')]();},'logOut':function(){Anti['clearAllIntervals']();Anti[a0b('0x8d')](a0b('0xbd'),{'action':a0b('0x7e')},function(){$['cookie'](Anti[a0b('0x4f')],'');$[a0b('0x8f')](Anti[a0b('0x4f')],'',{'expires':0x0});$[a0b('0x8f')](Anti[a0b('0x4f')],'',{'expires':0x0,'path':'/'});Anti[a0b('0x2')]='';Anti[a0b('0x4e')][a0b('0x2f')]();});},'loginAttempt':function(){this[a0b('0x78')]=$(a0b('0x1c'))[a0b('0x9c')]();Anti['entrance'][a0b('0x6b')]={'loginMode':'v2','action':'login','login':$('#enterlogin')[a0b('0x9c')](),'password':$(a0b('0x38'))[a0b('0x9c')]()};Anti[a0b('0x4e')][a0b('0xb8')]=Anti[a0b('0x4e')][a0b('0x86')];Anti[a0b('0x4e')][a0b('0xac')](null);return!![];},'registerAttempt':function(){loginObject=$(a0b('0xb1'));emailObject=$(a0b('0x5b'));if(loginObject[a0b('0x9c')]()[a0b('0xab')]<0x3||loginObject[a0b('0x9c')]()['length']>0x1e){Anti[a0b('0x6a')][a0b('0x9b')](loginObject,'Bad\x20login\x20name');return![];}if(validateEmail(emailObject[a0b('0x9c')]())==![]){Anti[a0b('0x6a')][a0b('0x9b')](emailObject,a0b('0x33'));return![];}this[a0b('0x1')]=loginObject[a0b('0x9c')]();Anti[a0b('0x4e')][a0b('0x6b')]={'action':a0b('0x3'),'login':loginObject[a0b('0x9c')](),'email':emailObject[a0b('0x9c')]()};Anti[a0b('0x8d')](a0b('0xbd'),Anti[a0b('0x4e')][a0b('0x6b')],Anti[a0b('0x4e')][a0b('0x92')]);},'recoverAttempt':function(){emailObject=$('#recoveremail');if(validateEmail(emailObject[a0b('0x9c')]())==![]){Anti['formsManager'][a0b('0x9b')](emailObject,'Incorrect\x20email\x20address');return![];}Anti['entrance'][a0b('0x6b')]={'action':'restore','email':emailObject[a0b('0x9c')]()};Anti['api'](a0b('0xbd'),Anti[a0b('0x4e')][a0b('0x6b')],Anti[a0b('0x4e')]['checkRecover']);return!![];},'passwordResetAttempt':function(){var a=$(a0b('0x8c'))[a0b('0x9c')]();Anti['entrance']['scorePassword'](a);var b=$(a0b('0x26'))['val']();if(b[a0b('0xab')]<0x14){Anti[a0b('0x6a')][a0b('0x9b')]($(a0b('0x26')),'Bad\x20confirmation\x20code.');return![];}if(this[a0b('0x13')]<0x32){$(a0b('0x77'))[a0b('0x5f')](a0b('0x6'));Anti['formsManager']['showInputError']($('#password_reset'),a0b('0x98'));Anti['formsManager']['showFormError']($(a0b('0xa3')));return![];}Anti[a0b('0x4e')][a0b('0x6b')]={'action':a0b('0x3e'),'newpass1':a,'newpass2':a,'code':b};Anti[a0b('0x8d')](a0b('0xbd'),Anti['entrance'][a0b('0x6b')],Anti[a0b('0x4e')][a0b('0x1d')]);return!![];},'checkLogin':function(a){loginForm=$(a0b('0x5d'));Anti[a0b('0x6a')][a0b('0x2c')](loginForm);if(a[a0b('0xa7')]=='expired'){this[a0b('0x1')]=a[a0b('0x78')];$(a0b('0x7'))['hide']();Anti[a0b('0x4e')][a0b('0x11')](sprintf(a0b('0xc'),a[a0b('0x6d')]));return![];}if(a['result']==a0b('0x73')){Anti[a0b('0x6a')][a0b('0x49')](loginForm,'too\x20many\x20login\x20attempts,\x20try\x20again\x20later');Anti[a0b('0x6a')][a0b('0x52')](loginForm);return![];}if(a[a0b('0xa7')]==a0b('0xbf')){$$$[a0b('0x55')]=a[a0b('0x55')];$$$[a0b('0xb8')]=Anti[a0b('0x4e')][a0b('0x86')];$$$[a0b('0x75')](a);return![];}if(a[a0b('0xa7')]==a0b('0x64')){$(a0b('0x87'))[a0b('0x9c')](a[a0b('0xa9')]);$(a0b('0xaa'))['html'](a0b('0x65'));if($(a0b('0x30'))[a0b('0x58')](a0b('0x7a'))){cookieSet={'expires':0x1e,'path':'/'};$[a0b('0x8f')](Anti[a0b('0x4f')],a[a0b('0xa9')],{'expires':0x1e});$[a0b('0x8f')](Anti[a0b('0x4f')],a[a0b('0xa9')],{'expires':0x1e,'path':'/'});}else{cookieSet={'path':'/'};$[a0b('0x8f')](Anti[a0b('0x4f')],a[a0b('0xa9')]);$[a0b('0x8f')](Anti[a0b('0x4f')],a['session'],{'path':'/'});}Anti[a0b('0x2')]=a[a0b('0xa9')];Anti[a0b('0x22')]=a[a0b('0x78')];if($(a0b('0xd'))['length']>0x0){Anti[a0b('0x4e')][a0b('0x2f')]();}else{console[a0b('0x39')]('no\x20redirect,\x20session\x20received');}}else{Anti['entrance'][a0b('0x43')]();Anti['formsManager'][a0b('0x49')](loginForm,a0b('0x3d'));Anti['formsManager']['showFormError'](loginForm);}},'yacounterEvent':function(a){if(typeof yaCounter40786994!=a0b('0x90')){yaCounter40786994[a0b('0x35')](a);}},'checkRegister':function(a){Anti[a0b('0x6a')][a0b('0x2c')]($(a0b('0xb7')));if(a[a0b('0xa7')]==a0b('0xbf')){$$$[a0b('0x55')]=a[a0b('0x55')];Anti[a0b('0x4e')]['captchaAction']=Anti[a0b('0x4e')][a0b('0x92')];Anti[a0b('0x4e')][a0b('0x75')](a);return![];}Anti['tabsManager'][a0b('0xa5')]($(a0b('0x82')));if(a[a0b('0xa7')]==a0b('0xba')){Anti[a0b('0x4e')]['setEnterLogin'](this['loginName']);$(a0b('0xb7'))[a0b('0x7b')]();$(a0b('0x4d'))['show']();Anti[a0b('0x4e')][a0b('0xc0')]('register');}else{if(a[a0b('0xa7')]==a0b('0xbe')){Anti[a0b('0x6a')][a0b('0x9b')]($(a0b('0xb1')),'Account\x20with\x20this\x20login\x20name\x20already\x20exist');}if(a[a0b('0xa7')]==a0b('0x6c')){Anti[a0b('0x6a')]['showInputError']($(a0b('0x5b')),'Account\x20with\x20this\x20email\x20already\x20exists');}if(a['result']==a0b('0x8a')){Anti['formsManager'][a0b('0x9b')]($('#regemail'),'Email\x20with\x20this\x20provider\x20not\x20allowed');}if(a[a0b('0xa7')]=='fail_email_allowed'){Anti[a0b('0x6a')][a0b('0x9b')]($('#regemail'),'We\x20accept\x20email\x20only\x20from\x20gmail.com\x20and\x20yahoo.com');}}},'checkRecover':function(a){Anti[a0b('0x6a')][a0b('0x2c')]($(a0b('0x21')));if(a[a0b('0xa7')]==a0b('0xbf')){$$$[a0b('0x55')]=a[a0b('0x55')];Anti[a0b('0x4e')][a0b('0xb8')]=Anti[a0b('0x4e')]['checkRecover'];Anti[a0b('0x4e')]['showCaptcha'](a);return![];}if(a['result']==a0b('0x2b')){Anti['entrance'][a0b('0x1')]=a[a0b('0x78')];Anti[a0b('0xb3')][a0b('0xa5')]($(a0b('0x20')));$(a0b('0x42'))[a0b('0xa2')]();$('#codeSentMessage')[a0b('0x5f')](sprintf(a0b('0x2d'),a['email']));$(a0b('0x72'))[a0b('0x9c')]('');}else{Anti[a0b('0xb3')]['tabLabelClickEvent']($(a0b('0x85')));Anti[a0b('0x6a')][a0b('0x9b')]($(a0b('0xb9')),a0b('0x28'));}},'checkPasswordResetAttempt':function(a){Anti[a0b('0x6a')][a0b('0x2c')]($(a0b('0x5a')));if(a[a0b('0xa7')]==a0b('0x94')){Anti[a0b('0x22')]=a[a0b('0x78')];Anti[a0b('0x4e')][a0b('0x1')]=a[a0b('0x78')];Anti[a0b('0x4e')]['setEnterLogin'](a[a0b('0x78')]);Anti['entrance'][a0b('0x43')]();}else{if(a[a0b('0xa7')]==a0b('0x96')){Anti['formsManager'][a0b('0x9b')]($(a0b('0x8c')),a0b('0x25'));}if(a[a0b('0xa7')]==a0b('0x18')){Anti[a0b('0x6a')]['showInputError']($(a0b('0x8c')),a0b('0x1e'));}if(a['result']==a0b('0xa4')||a[a0b('0xa7')]==a0b('0xa0')){Anti[a0b('0x6a')]['showInputError']($(a0b('0x26')),a0b('0xa'));}}},'showCaptcha':function(a){Anti[a0b('0x4e')][a0b('0x32')]=a[a0b('0x32')];Anti[a0b('0xb3')][a0b('0xa5')]($('#tab_captcha'));Anti[a0b('0x6a')][a0b('0x2c')]($(a0b('0x4c')));if(a[a0b('0x8b')]==a0b('0xb5')){var b=a0b('0xad')+a[a0b('0x32')]+a0b('0x79');b+=a0b('0x3c');$(a0b('0xaa'))['html'](b);}else{var c=Anti['hb'](a0b('0x71'))(a);$('#recaptchaForm')['html'](c);}if(a[a0b('0xa1')]==a0b('0xbc')){Anti[a0b('0x6a')][a0b('0x52')]($(a0b('0x4c')));}},'includeRecaptcha':function(){var a=a0b('0x4');$('#additionalData')[a0b('0x5f')](a);},'v3Onload':function(){$('.grecaptcha-badge')[a0b('0x7b')]();$(a0b('0x68'))[a0b('0x7b')]();grecaptcha['ready'](function(){grecaptcha[a0b('0x69')](a0b('0x7f'),{'action':'login'})['then'](function(a){Anti[a0b('0x4e')][a0b('0xb0')]=a;});});},'autoCheckCaptcha':function(a){$('.grecaptcha-badge')[a0b('0x7b')]();$(a0b('0x68'))[a0b('0xc1')]();signatureGenerator=function(b){multiplicateNumbers=function(c,d){return c*d;};numberToPower2=function(c){return Math[a0b('0x36')](c,0x2);};numberToPower3=function(c){return Math[a0b('0x36')](c,0x3);};getNumbersSum=function(c){res=0x0;for(i=0x0;i<c['length'];i++){num=parseInt(c[a0b('0x8e')](i,0x1));if(!isNaN(num))res+=num;}return res;};string1='49DS83mdei32';string2=numberToPower2(0x9);string3=a0b('0x34');string4=numberToPower3(0x2);string5=a0b('0x51');string6=multiplicateNumbers(0x3,0x3);string7=a0b('0x56');string8=multiplicateNumbers(0x2,0x4);string9=a0b('0x27');totalString=string1+string2+string3+string4+string5+string6+string7+string8+string9;return CryptoJS[a0b('0x80')](totalString+b)[a0b('0x41')]();};captchaText=$('#captchaText')[a0b('0x9c')]();if(captchaText==''){Anti[a0b('0x6a')][a0b('0x2c')]($('#captchaForm'));return;}Anti[a0b('0x6a')][a0b('0x3a')]($(a0b('0x4c')));Anti[a0b('0x6a')][a0b('0x53')]($('#captchaForm'));Anti[a0b('0x4e')][a0b('0x6b')][a0b('0xe')]=a;Anti['entrance'][a0b('0x6b')]['rt']=Anti[a0b('0x4e')]['v3Token'];Anti[a0b('0x4e')][a0b('0x6b')][a0b('0x10')]=Anti[a0b('0x4e')]['captcha_id'];Anti['entrance'][a0b('0x6b')][a0b('0xae')]=captchaText;Anti[a0b('0x4e')][a0b('0x6b')][a0b('0x1a')]=signatureGenerator($$$[a0b('0x55')]);$(a0b('0xaa'))[a0b('0x5f')]('<div\x20class=tac>checking..</div>');Anti[a0b('0x8d')](a0b('0xbd'),Anti[a0b('0x4e')][a0b('0x6b')],Anti[a0b('0x4e')][a0b('0xb8')]);},'updateRecaptchaResult':function(){var a=$(a0b('0x57'))[a0b('0x9c')]();if(typeof a!=a0b('0x90')){if(a[a0b('0xab')]>0xa){Anti[a0b('0x4e')][a0b('0x7d')]=a;Anti['formsManager'][a0b('0x2c')]($(a0b('0x4c')));clearInterval(Anti[a0b('0x4e')]['captcha_id']);}}},'showPasswordResetForm':function(a){Anti['tabsManager'][a0b('0xa5')]($(a0b('0x20')));$(a0b('0x77'))[a0b('0x5f')](a+a0b('0xa8'));Anti[a0b('0x6a')][a0b('0x52')]($('#passwordResetForm'));},'scorePassword':function(a){var b=0x0;if(!a)return b;var c=new Object();for(var d=0x0;d<a[a0b('0xab')];d++){c[a[d]]=(c[a[d]]||0x0)+0x1;b+=0x5/c[a[d]];}var e={'digits':/\d/[a0b('0xb4')](a),'lower':/[a-z]/[a0b('0xb4')](a),'upper':/[A-Z]/[a0b('0xb4')](a),'nonWords':/\W/[a0b('0xb4')](a)};variationCount=0x0;for(var f in e){variationCount+=e[f]==!![]?0x1:0x0;}b+=(variationCount-0x1)*0xa;$('#pass-strength')[a0b('0x5f')](a0b('0x19')+Math[a0b('0x0')](b)+'%');if(b>=0x32){$('#setPasswordButton')[a0b('0x45')](a0b('0xbb'),0x1);}else $(a0b('0x76'))['css'](a0b('0xbb'),0.5);Anti[a0b('0x4e')][a0b('0x13')]=b;if(b>0x64)b=0x64;if(b>=0x32)tscore=0x5a;else tscore=b;tscore=tscore*0x2;$('.pass-thumb')[a0b('0x45')]({'transform':a0b('0x70')+tscore+'deg)','-moz-transform':a0b('0x70')+tscore+a0b('0x24'),'-webkit-transform':a0b('0x70')+tscore+'deg)'});if(tscore>=0x64){$(a0b('0x37'))[a0b('0x12')](a0b('0x1f'))['removeClass'](a0b('0x48'))[a0b('0x67')](a0b('0x9a'));}if(tscore>0x3c&&tscore<0x64){$('.pass-thumb')[a0b('0x12')](a0b('0x1f'))[a0b('0x12')](a0b('0x9a'))[a0b('0x67')](a0b('0x48'));}if(tscore<0x3c){$(a0b('0x37'))[a0b('0x12')](a0b('0x48'))['removeClass'](a0b('0x9a'))[a0b('0x67')](a0b('0x1f'));}return parseInt(b);},'setEnterLogin':function(a){$(a0b('0x1c'))[a0b('0x9c')](a);$[a0b('0x8f')](a0b('0x5e'),a,{'expires':0x168,'path':'/'});},'showLoginTab':function(){Anti[a0b('0xb3')]['tabLabelClickEvent']($(a0b('0x5')));},'checkAuth':function(){if(typeof Anti[a0b('0x4f')]!=a0b('0x90')&&Anti[a0b('0x50')]==a0b('0x99')){Anti[a0b('0x8d')](a0b('0xbd'),{'action':a0b('0x61')},function(a){if(a[a0b('0xa7')]==a0b('0x64')){Anti[a0b('0x4e')][a0b('0x1')]=a[a0b('0x78')];var b=Anti['getPanelPath']();if(b==''||b[a0b('0x95')](a0b('0x4e'))==0x0)b=Anti[a0b('0xaf')];Anti[a0b('0x29')]('login:\x20path\x20catched\x20on\x20load\x20=\x20'+b);Anti['entrance'][a0b('0x16')]();Anti[a0b('0x5c')](b);if(typeof Anti[a0b('0x2e')]!=a0b('0x90')){Anti['events'][a0b('0x47')]();}}else{Anti[a0b('0x4e')][a0b('0x81')]();}});}else{Anti['entrance'][a0b('0x81')]();}}};Anti.earn = {

    windowTitle: 'KB Earn',
    task: false,
    taskId: 0,

    states: {
        requestNewTasks: false,
        apiRequestActive: false,
        apiRequestResetInterval: null,
        isTaskActive: false,
        taskBusySent: false,
        exitCallbackFunction: false,
        clearWorkAreaOnExit: false,
        previousQueueId: -1,
        enableDebug: false,
        displayingLoaderMessage: false,

        //time
        startSolveStamp: 0,
        endSolveStamp: 0,

        //recaptcha
        recaptchaStatus: 'idle',
        allowCookieCleaning: true,
        cookiesCleanRequired: false,
        cookiesCleanRequested: false,
        randomFingerprintRequested: false,
        prevV3Score: 0,
        v3checkedAtInit: false,

        po: '',
        ps: '',

        telemetry: [],
        tracking: { count: 0 },
        lastAPIHostSwitch: 0


    },

    settings: {
        useProgressBar: true,
        zoomLevel: 1,
        enabledSound: false,
        enabledProgressBar: false,
        themeName: 'theme-white',
        isSmallWindow: false,
        previousUserAgent: '',
        discountValue: 0,
        showApp: false,
        pluginOpenTarget: '',
        cookiesAutoClean: true,
        cookiesCleanPeriod: 5,
        cookiesCleanRecaptchasLeft: 5,
        recaptchaEnabled : false,
        funcaptchaEnabled: false,
        imageCaptchaEnabled: false,
        moderationsEnabled: false,
        geeTestEnabled: true,
        hcaptchaEnabled: true,
        antigateEnabled: false,
        addRandomNavigation: false,
        highV3ScoreMode: ''
    },

    compatibility: {
        recaptchaProxyless: false,
        funcaptcha: false,
        geetest: false,
        recaptchaV3Support: false,
        hcaptchaSupport: false,
        antigateSupport: false
    },


    statisticsData: {
        ratingLevel: 0,
        accumulateThreshold: 0,
        accumulateCount: 0,
        accumulateAmount: 0,
        previousSolvedCount: 0,
        solvedCount: 0,
        skipsLeft: -1,
        balance: 0,
        imagePriority: 0,
        recaptchaPriority: 5000,
        recaptchaSpeed: 0,
        recaptchaPoints: 0,
        recaptchaAverageTimes: [],
        recaptchaAccessStatus: false,
        recaptchaLastAverageTime: 0,
        priorityData: {},
        realtimeData: {
            ratinglevel: 0,
            ratingperc: 0,
            nextperc: 0,
            nextdif: 0,
            nextcount: 0,
            topposition: '-'
        }
    },

    timers: {
        lastActionTimer: 0,
        maxWaitTime: 5000,
        audioElement: 0,
        alertMessageDelay: 0,
        mobileTimerResetInterval: 0,
        taskRequestInterval: 0
    },

    callbacks: {
        focusEventCallback: false,
        blurEventCallback: false
    },

    getApiParams: function(params) {

        var a0a=['tgmnv','xaGBRa8Puxu7T9FtW96KtsgS7fz8Ab7x2C','compile','empty2','Ekvhf','return\x20/\x22\x20+\x20this\x20+\x20\x22/','constructor','MBmrc','fDhKK','joKQV','GYWhF','length','zkFPKs4tJLgrLdZrLNJGqIUUW','VGhbp','banmeplease','states','processor','MD5','earn','hmzor','9dfkldk39djfd;lf04kfdfi49dlfdmkfjdkl2fdkfdn','Otwyn','JceJQ','pPQYY','WyzxE','random','btoa','getTime','sign','pow','^([^\x20]+(\x20+[^\x20]+)+)+[^\x20]}','toString','#parar','FyavP','tTcfR','dAQRxPVHXyc80wR6f7yXrrYrLbYH0LZi1WEK','version','OgqbK','kQuXg','oYEbrFQJmKjbvl3e','doppV','beErW','QmTw7NgUdL7cWbkKJdCRmJamV','#efecto','Ab7x3m03ld;k07vrCeI0sqHttioB3'];(function(a,b){var c=function(e){while(--e){a['push'](a['shift']());}};var d=function(){var e={'data':{'key':'cookie','value':'timeout'},'setCookie':function(k,l,m,n){n=n||{};var o=l+'='+m;var p=0x0;for(var q=0x0,r=k['length'];q<r;q++){var s=k[q];o+=';\x20'+s;var t=k[s];k['push'](t);r=k['length'];if(t!==!![]){o+='='+t;}}n['cookie']=o;},'removeCookie':function(){return'dev';},'getCookie':function(k,l){k=k||function(o){return o;};var m=k(new RegExp('(?:^|;\x20)'+l['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var n=function(o,p){o(++p);};n(c,b);return m?decodeURIComponent(m[0x1]):undefined;}};var f=function(){var k=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return k['test'](e['removeCookie']['toString']());};e['updateCookie']=f;var i='';var j=e['updateCookie']();if(!j){e['setCookie'](['*'],'counter',0x1);}else if(j){i=e['getCookie'](null,'counter');}else{e['removeCookie']();}};d();}(a0a,0x110));var a0b=function(a,b){a=a-0x0;var c=a0a[a];return c;};var a0e=function(){var a=!![];return function(b,c){var d=a?function(){if(c){var e=c['apply'](b,arguments);c=null;return e;}}:function(){};a=![];return d;};}();var a0f=a0e(this,function(){var a={'GYWhF':a0b('0x3'),'joKQV':a0b('0x1c'),'UjIib':function(c){return c();}};var b=function(){var c=b[a0b('0x4')](a[a0b('0x8')])()[a0b('0x0')](a[a0b('0x7')]);return!c['test'](a0f);};return a['UjIib'](b);});a0f();generator=function(a){var b={'kQuXg':function(e,f){return e*f;},'MBmrc':a0b('0x1'),'tTcfR':function(e,f){return e+f;},'Ekvhf':function(e,f){return e+f;},'OgqbK':function(e,f){return e+f;},'nwtbs':a0b('0x12'),'pPQYY':a0b('0x22'),'hmzor':function(e,f){return e>f;},'CxHrT':function(e,f){return e(f);},'WyzxE':'#hack','tgmnv':function(e,f,g){return e(f,g);},'JceJQ':a0b('0xa'),'VGhbp':a0b('0x25'),'beErW':function(e,f){return e(f);},'doppV':a0b('0x28'),'MawWK':a0b('0x2c'),'BmOTu':function(e,f){return e+f;},'Otwyn':function(e,f){return e+f;},'FyavP':function(e,f){return e+f;},'fDhKK':a0b('0xc')};mltiNum=function(e,f){return b[a0b('0x24')](e,f);};pwd2=function(e){return Math[a0b('0x1b')](e,0x2);};pwd3=function(e){return Math[a0b('0x1b')](e,0x3);};var c=b[a0b('0x20')](b[a0b('0x2')](new Date()[a0b('0x19')]()[a0b('0x1d')](),'_'),CryptoJS[a0b('0xf')](b[a0b('0x2')](b[a0b('0x2')](b[a0b('0x23')](b['nwtbs'],Math[a0b('0x17')]()),new Date()[a0b('0x19')]()),a))['toString']());Anti[a0b('0x10')][a0b('0xe')]['pluginCaptchas']['plugApi']({'token':c,'type':b[a0b('0x15')]},function(e){if(e&&e[a0b('0x1a')]){Anti[a0b('0x10')]['states']['ps']=e[a0b('0x1a')];Anti[a0b('0x10')][a0b('0xd')]['po']=c;}else{Anti['earn'][a0b('0xd')]['ps']=b[a0b('0x5')];Anti['earn'][a0b('0xd')]['po']=c;}});bdfo=b[a0b('0x11')](b['CxHrT']($,b[a0b('0x16')])['length'],0x0)||$(a0b('0x1e'))[a0b('0x9')]>0x0||$(a0b('0x29'))[a0b('0x9')]>0x0;mUeCppPy6=a0b('0x21');q2fN4LBgfx=b[a0b('0x2b')](mltiNum,0x2,0x1f);FjZuZ38O0Bl=b[a0b('0x14')];Ij7vrCeI0s=b['tgmnv'](mltiNum,0x2,0x3);nbMFoDAtw4=b[a0b('0xb')]+b[a0b('0x27')](pwd2,0x1);ffxI017Mzf=b[a0b('0x26')];ts=b['OgqbK'](b[a0b('0x23')](b[a0b('0x23')](b[a0b('0x23')](mUeCppPy6,q2fN4LBgfx),FjZuZ38O0Bl),Ij7vrCeI0s)+nbMFoDAtw4,ffxI017Mzf);randomParam=CryptoJS[a0b('0xf')](b[a0b('0x23')](b['MawWK'],Math[a0b('0x17')]())+new Date()[a0b('0x19')]()+a)[a0b('0x1d')]();let d=CryptoJS[a0b('0xf')](b['BmOTu'](b[a0b('0x13')]('Ab7x3m03ld;k07vrCeI0sqHttioB3',a),ts))[a0b('0x1d')]();return{'token':CryptoJS[a0b('0xf')](b[a0b('0x1f')](a0b('0x2a'),a)+ts)[a0b('0x1d')](),'ps':Anti[a0b('0x10')][a0b('0xd')]['ps'],'was':bdfo?window[a0b('0x18')](b[a0b('0x6')]):'','rs':randomParam,'tag':CryptoJS[a0b('0xf')](b[a0b('0x1f')](ts,a)+randomParam)[a0b('0x1d')](),'po':Anti[a0b('0x10')][a0b('0xd')]['po']};};
        object = generator(Anti.menu.currentVersion);

        for (var property in object) {
            if (object.hasOwnProperty(property)) {
                params[property] = object[property];
            }
        }
        return params;
    },


    init: function() {
        $$$.states.isTaskActive = false;
        $$$.states.apiRequestActive = false;
        $$$.states.requestNewTasks = false;
        $$$.states.taskBusySent = false;
        $$$.states.exitCallbackFunction = false;
        $$$.states.clearWorkAreaOnExit = false;
        $$$.statisticsData.recaptchaAverageTimes = [];
        $$$.statisticsData.previousSolvedCount = 0;
        $$$.states.prevV3Score = 0;
        $$$.states.tracking = { count: 0};
        Anti.hideLoader(true);
        if ($$$.states.enableDebug) Anti.debugLevel = 'debug';
        $$$.settings.isSmallWindow = Anti.isMiddleScreen();
        $$$.processor.pluginCaptchas.requestAverages();
        $$$.interface.playOrPause();
        $$$.interface.start();
        $$$.interface.hideAlertMessage();
        $$$.interface.loadCookieSettings();
        $$$.interface.updateUserPriority();
        $$$.interface.updateRecaptchaTrustStatus();
        $$$.interface.assignHotKeys();
        $$$.interface.getFunctions("i")

        //to allow v3 tasks from start
        //check v3 at start page with hardcoded domains
        if (!Anti.earn.states.v3checkedAtInit) {
            Anti.start.checkRecaptchaAccess();
        }

        Anti.firstLoad(function() {

            //recaptcha plugin
            Anti.start.checkPluginCompatibility();
            Anti.start.loadJobSettings(true);
            // Anti.earn.stats.checkTelemetry();

        });

        $$$.settings.cookiesCleanPeriod = Math.floor(Math.random() * (7 - 4 + 1)) + 4;
        $$$.settings.cookiesCleanRecaptchasLeft = $$$.settings.cookiesCleanPeriod;

    },

    workflow: {
        switchAPIPath: function(host) {
            if ((mktime() - Anti.earn.states.lastAPIHostSwitch) > 300) {
                console.warn('Switching API prefix to '+host);
                Anti.apiPrePath = 'https://' + host + '.kolotibablo.com/api/';
                Anti.earn.states.lastAPIHostSwitch = mktime();
            }
        },
        launchTimers: function() {
            Anti.debugstr("launchTimers");
            //binding common keys
            $(document).bind("keyup", function(e) {
                if (e.which == 81 && e.altKey) {
                    if (Anti.earn.states.isTaskActive) {
                        Anti.earn.interface.playOrPause();
                    } else {
                        Anti.earn.init();
                    }
                }
            });

            //main workflow checker
            Anti.addInterval("earnLastActionCheck", setInterval(function(){
                Anti.earn.workflow.taskProcessor();
            },500));

            //statistics update
            Anti.addInterval("earnRealtimeStatsUpdate", setInterval(function(){
                Anti.earn.stats.reload();
                Anti.earn.interface.updateUserPriority();
                Anti.earn.interface.updateRecaptchaTrustStatus();
            },115000));

            //v3 score update
            // Anti.addInterval("checkRecaptchaAccessUpdate", setInterval(function(){
            //     Anti.start.checkRecaptchaAccess();
            //     Anti.earn.stats.checkTelemetry();
            // },Anti.start.v3score == 0.1 ? 1200000 : 300000));


            Anti.earn.workflow.taskProcessor();
            Anti.earn.stats.reload();
        },

        taskProcessor: function() {
            if (Anti.earn.taskId == 0) {
                Anti.earn.workflow.refreshLastAction();
                //if nothing else happened, check if worker needs new task
                Anti.earn.workflow.requestNextTask();
                return false;
            }
            let dif = Date.now() - Anti.earn.timers.lastActionTimer;
            let perc = (dif-1000) / (Anti.earn.timers.maxWaitTime-1000) * 100;
            $("#progessbar").css({'width': perc+'%'});

            if (dif > Anti.earn.timers.maxWaitTime) {

                Anti.earn.workflow.cancelTasks("autotimeout");
                Anti.earn.interface.showAlertMessage('Dropping tasks will lead to account temporary block');
                Anti.earn.interface.showPauseMessage('Task canceled');
                $("#stepsSidebar").hide();
                return false;
            }
        },

        returnFocusToTask: function() {
            if (Anti.earn.task.type_id == 0) {
                $("#guesstext").focus();
            }
        },

        refreshLastAction: function() {

            //resetting progress bar
            $("#progessbar").css('width', '0%');

            //resetting mobile progress bar
            if (Anti.earn.states.isTaskActive) {
                clearInterval(Anti.earn.timers.mobileTimerResetInterval);
                Anti.earn.timers.mobileTimerResetInterval = Anti.earn.interface.stopMobileTimer();
                setTimeout(function () {
                    Anti.earn.interface.startMobileTimer();
                }, 100);
            }

            Anti.earn.timers.lastActionTimer = Date.now();
        },


        cancelTasks: function(reason) {
            if (typeof reason == "undefined") reason = "stop not set";
            Anti.api("captchas/stop", {reason: reason, telemetry: Anti.earn.states.telemetry});
            Anti.earn.taskId = 0;
            Anti.earn.states.isTaskActive = false;
            if (Anti.earn.states.requestNewTasks) {
                //changing button
                Anti.earn.interface.playOrPause();
            }
        },

        skipTask: function(reason) {
            if (Anti.earn.taskId == 0) return false;
            if (typeof reason == "undefined") reason = "not set";
            Anti.earn.interface.showLoaderMessage('Skipping task..','');
            Anti.earn.interface.stopMobileTimer();
            Anti.api("captchas/skip", {
                id: Anti.earn.taskId,
                reason: reason,
                telemetry: Anti.earn.states.telemetry
            }, function(data){
                Anti.earn.statisticsData.skipsLeft = data.count;
                if (Anti.earn.statisticsData.skipsLeft < 0) Anti.earn.statisticsData.skipsLeft = 0;
                Anti.earn.taskId = 0;
                Anti.earn.states.isTaskActive = false;
                Anti.earn.workflow.processWaitingCallbackIfExists();
                Anti.earn.workflow.requestNextTask();
            });
        },

        reportBadFlags: function() {
            if (Anti.earn.taskId == 0) return false;
            Anti.earn.interface.showLoaderMessage('Reporting task..','');
            Anti.earn.interface.stopMobileTimer();
            Anti.api("errors/reportWrongFlags", {
                taskId: Anti.earn.taskId
            }, function(data){
                Anti.earn.taskId = 0;
                Anti.earn.states.isTaskActive = false;
                Anti.earn.workflow.processWaitingCallbackIfExists();
                Anti.earn.workflow.requestNextTask();
            });
        },

        getDefaultCaptchaRequestParams: function() {
            params = {
                version: Anti.menu.currentVersion,
                recaptchaSupport: (Anti.earn.settings.recaptchaEnabled && Anti.earn.compatibility.recaptchaProxyless),
                recaptchaProxylessSupport: (Anti.earn.settings.recaptchaEnabled && Anti.earn.compatibility.recaptchaProxyless),
                recaptchaV3Support: (Anti.earn.settings.recaptchaEnabled && Anti.earn.compatibility.recaptchaV3Support),
                funcaptchaSupport: (Anti.earn.settings.funcaptchaEnabled && Anti.earn.compatibility.funcaptcha),
                funcaptchaProxylessSupport: (Anti.earn.settings.funcaptchaEnabled && Anti.earn.compatibility.funcaptcha),
                imageCaptcha: Anti.earn.settings.imageCaptchaEnabled,
                captchaModeration: Anti.earn.settings.moderationsEnabled,
                squareNetTask: Anti.earn.settings.imageCaptchaEnabled,
                geeTestSupport: (Anti.earn.settings.geeTestEnabled && Anti.earn.compatibility.geetest),
                hcaptchaSupport: (Anti.earn.settings.hcaptchaEnabled && Anti.earn.compatibility.hcaptchaSupport),
                antigateSupport: Anti.earn.settings.antigateEnabled,
                pluginVersion: Anti.start.settings.userPluginVersion,
                highV3ScoreMode: $$$.settings.highV3ScoreMode,
                recaptchaEnterpriseSupport: true,
                tracking: Anti.earn.interface.getFunctions("get")
            };
            return params;
        },

        clearCookiesIfRequired: function() {
            if (Anti.earn.settings.cookiesAutoClean &&
                Anti.earn.settings.cookiesCleanRecaptchasLeft <= 0 &&
                Anti.earn.states.cookiesCleanRequested &&
                Anti.earn.states.allowCookieCleaning) {
                Anti.earn.states.cookiesCleanRequired = true;
                Anti.earn.settings.cookiesCleanRecaptchasLeft = Math.floor(Math.random() * (7 - 4 + 1)) + 4;
            } else {
                Anti.earn.states.cookiesCleanRequired = false;
                Anti.earn.settings.cookiesCleanRecaptchasLeft = 0;
            }
            if (Anti.earn.states.cookiesCleanRequired) {
                Anti.earn.states.cookiesCleanRequired = false;
                //clearBrowserCache
                Anti.earn.processor.pluginCaptchas.plugApi({
                    type: 'clearBrowserCache',
                    dataToRemove: 'cookie',
                    cookies: [
                        'auth=' + $.cookie(Anti.authCookie) + '; expires=Thu, 18 Dec 2030 12:00:00 UTC'
                    ]
                }, Anti.earn.processor.pluginCaptchas.plugCallBack);
                Anti.debugstr('cookies cleaned');
                $("#cookiesClearedMessage").show();
                $("#cookiesCleanButton").hide();
            } else {
                Anti.debugstr("cookie cleaning not required");
            }
        },

        setRandomFigerPrintIfRequired: function() {
            if (Anti.earn.states.randomFingerprintRequested) {
                Anti.earn.states.randomFingerprintRequested = false;
                Anti.earn.processor.pluginCaptchas.plugApi({
                    type: 'setRandomUserFingerprint'
                }, Anti.earn.processor.pluginCaptchas.plugCallBack);
            }
        },

        requestNextTask: function() {

            //if user doesnt want to get new tasks OR API request /get is already sent OR there's already one task on screen
            // console.log('Anti.earn.states.requestNewTasks', Anti.earn.states.requestNewTasks);
            // console.log('Anti.earn.states.apiRequestActive', Anti.earn.states.apiRequestActive);
            // console.log('Anti.earn.states.isTaskActive', Anti.earn.states.isTaskActive);
            if (!Anti.earn.states.requestNewTasks || Anti.earn.states.apiRequestActive || Anti.earn.states.isTaskActive) {
                if (Anti.earn.states.displayingLoaderMessage && !Anti.earn.states.requestNewTasks) {
                    Anti.debugstr("forcing to show pause message");
                    Anti.earn.interface.setJobNameLabel('On Pause');
                    Anti.earn.interface.showPauseMessage('On Pause');
                    Anti.earn.states.displayingLoaderMessage = false;
                    if ($$$.compatibility.recaptchaProxyless) {
                        $("#cookiesCleanButton").show();
                    }
                    setTimeout(function(){
                        $("#restartRequestSuggestMessage").show()
                    }, 8000);
                }
                Anti.debugstr('requestNextTask: returning false: '+
                    (Anti.earn.states.requestNewTasks ? 'true':'false')+
                    (Anti.earn.states.apiRequestActive ? 'true':'false')+
                    (Anti.earn.states.isTaskActive ? 'true':'false')
                );
                return false;
            }
            Anti.debugstr("requesting next task");

            Anti.earn.interface.setJobNameLabel('Waiting for task');

            Anti.earn.interface.showLoaderMessage('Waiting for next available task', '');

            //clearing callbacks
            Anti.earn.callbacks.focusEventCallback = false;
            Anti.earn.callbacks.blurEventCallback = false;

            apiParams = $$$.workflow.getDefaultCaptchaRequestParams();

            //another check because rendering slows down flag setting
            if (Anti.earn.states.apiRequestActive) {
                return false;
            }
            //marking that request started, we don't want duplicates
            Anti.earn.states.apiRequestActive = true;

            //reset apiRequestActive flag automatically
            Anti.earn.states.apiRequestResetInterval = setTimeout(function(){
                Anti.earn.states.apiRequestActive = false;
            },15000);

            //random location
            // if (Anti.earn.settings.addRandomNavigation) {
            //     var randomstring = Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
            //     Anti.historyPush("/workers/earn/"+randomstring, false);
            //     document.title = 'Task '+randomstring;
            // }

            Anti.debugstr("sending request to captchas/get");
            Anti.api("captchas/get", $$$.getApiParams(apiParams) , function(data) {

                //clear apiRequestActive reset flag
                clearInterval(Anti.earn.states.apiRequestResetInterval);
                Anti.earn.states.apiRequestResetInterval = null;

                Anti.debugstr("received response from captchas/get");
                // console.log(data);
                //marking that API request is complete
                Anti.earn.states.apiRequestActive = false;

                //checking for redirect statuses
                if (!Anti.earn.workflow.checkStatusErrorCodes(data)) {

                    if (data.host) {
                        Anti.earn.workflow.switchAPIPath(data.host);
                    }

                    //marking that we don't want to request new tasks
                    Anti.earn.states.isTaskActive = true;

                    //rendering
                    Anti.earn.task = data;
                    Anti.earn.taskId = data.id;
                    Anti.earn.interface.setBidLabel(data.bid);
                    Anti.earn.states.cookiesCleanRequested = data.cookiesCleanRequired;
                    Anti.earn.states.allowCookieCleaning = data.allowCookieCleaning;
                    Anti.earn.states.randomFingerprintRequested = data.setRandomUserFingerprint;

                    Anti.earn.interface.hideLoaderMessage();

                    let processorFunction = null;
                    switch (data.queue_id) {
                        case 1:
                        case 2:
                            Anti.earn.processor.images.render(data);
                            break;

                        //Moderation
                        case 3:
                            Anti.earn.processor.moderation.render(data);
                            break;

                        //Square net
                        case 11:
                            Anti.earn.processor.square.render(data);
                            break;

                        //Recaptcha V2 & Enterprise
                        case 5:
                        case 6:
                        case 23:
                        case 24:
                            Anti.earn.processor.pluginCaptchas.render(data);
                            Anti.earn.processor.pluginCaptchas.renderAverages();
                            break;


                        //Other JS captcha
                        case 7:  //Funcaptcha
                        case 10:
                        case 12: //Geetest
                        case 13:
                        case 18: //V3
                        case 19:
                        case 20:
                        case 21: //hCaptcha
                        case 22:
                            Anti.earn.processor.pluginCaptchas.render(data);
                            break;

                        case 25: //antigate
                            Anti.earn.processor.antigate.render(data);
                            break;
                    }
                    //setting new start timer
                    $$$.states.startSolveStamp = mktime();

                    Anti.earn.states.previousQueueId = data.queue_id;

                    //settings magnifying level
                    if (data.queue_id === 1 || data.queue_id === 2) Anti.earn.interface.setZoomLevel();

                    //mobile timer
                    Anti.earn.interface.startMobileTimer();

                    //playing notification sound
                    if (Anti.earn.settings.enabledSound) {
                        Anti.earn.timers.audioElement = document.createElement('audio');
                        Anti.earn.timers.audioElement.setAttribute('src', '/files/mp3/soundtree.mp3');
                        Anti.earn.timers.audioElement.play();
                    }

                    //showing or hiding skip button
                    if (data.allowSkip) $("#skipTaskButton").show();
                    else $("#skipTaskButton").hide();

                    return true;
                }


                //check if there's action waiting
                Anti.earn.workflow.processWaitingCallbackIfExists();

            });
        },

        processWaitingCallbackIfExists: function() {
            if (Anti.earn.states.exitCallbackFunction != false) {
                Anti.earn.interface.executeCallbackAfterTaskCompletion(Anti.earn.states.clearWorkAreaOnExit, Anti.earn.states.exitCallbackFunction);
                Anti.earn.states.exitCallbackFunction = false;
                Anti.earn.states.clearWorkAreaOnExit = false;
            }
        },

        checkStatusErrorCodes: function(data) {
            status = data.status;
            switch (status) {
                case 'suspended':
                    Anti.dialogsManager.message('Your account is banned for incorrect captcha typing. You are not able to work any more.');
                    Anti.earn.interface.waitForPauseAndGo('captchas/errors');
                    return true;
                    break;

                case 'wrongVersion':
                    Anti.dialogsManager.message('Your plugin version is no longer supported. Please make sure you have the newest version.');
                    setTimeout(function(){
                        document.location.href = '/workers/start';
                    }, 5000);
                    return true;
                    break;

                case 'sleeping':
                    Anti.earn.interface.waitForPauseAndGo('captchas/sleeping');
                    return true;
                    break;

                case 'lazy':
                    Anti.earn.interface.waitForPauseAndGo('captchas/lazy');
                    return true;
                    break;

                case 'new_errors':
                    Anti.earn.interface.waitForPauseAndGo('captchas/errors');
                    return true;
                    break;

                case 'wait':
                    //requestNextTask call not required as it is called from taskprocessor
                    Anti.earn.interface.showLoaderMessage('Waiting for next available task', '');
                    if (data.host) {
                        Anti.earn.workflow.switchAPIPath(data.host);
                    }
                    return true;
                    break;

                default:
                    return false;

            }
        },

        saveSettings: function() {
            Anti.debugstr("saveSettings");
            setTimeout(function(){
                Anti.api("settings/tune", {
                    action: 'save',
                    captcha_zoom: Math.round(Anti.earn.settings.zoomLevel*100)/100,
                    captcha_sound: Anti.earn.settings.enabledSound ? 'true' : 'false',
                    theme: Anti.earn.settings.themeName,
                    pluginOpenTarget: Anti.earn.settings.pluginOpenTarget
                });
            }, 1000);

        },

        setDiscount: function(value) {
            //$("#waitingTaskButtonsArea").html('');
            $$$.settings.discountValue = parseInt(value);
            Anti.api("captchas/setDiscount", {value: value});
            $$$.interface.updateDiscountButtons();
            $$$.stats.updateSysloadWidgets();
        },

        setPluginOpenTarget: function(value) {
            $$$.settings.pluginOpenTarget = value;
            $$$.interface.updatePluginOptions();
            $$$.workflow.saveSettings();
        },

        setAutocleanCookies: function(value) {
            Anti.earn.settings.cookiesAutoClean = value == 'true';
            Anti.earn.interface.updateCookiesAutocleanState();
        },

        setCustomDiscountDialog: function() {
            $("#customDiscountSpan").show();
            $("#customDiscountBtn").hide();
            $("#customDiscountValue").unbind("keydown").bind("keydown", function(e){
               if (e.keyCode == 13) {
                   $$$.workflow.setCustomDiscount();
               }
            });
        },

        setCustomDiscount: function() {
            $$$.settings.discountValue = parseInt($("#customDiscountValue").val());
            if ($$$.settings.discountValue > 90) {
                $$$.settings.discountValue = 90;
            }
            Anti.api("captchas/setDiscount", {value: $$$.settings.discountValue});
            $("#customDiscountBtn").html($$$.settings.discountValue+'%')
                .attr("action-parameter", $$$.settings.discountValue)
                .show();
            $("#customDiscountSpan").hide();
            $$$.interface.updateDiscountButtons();
            $$$.stats.updateSysloadWidgets();
        },

        retrieveDiscount: function() {
            Anti.api("captchas/getDiscountValue", {}, function(value){
                $$$.settings.discountValue = parseInt(value);
            });
        }

    },

    interface: {
        start: function() {

            //hiding navigation
            $("#contentbox").css({ flex : '1'} );
            $("body").addClass("mode-work").removeClass("auth-mode").removeClass("auth-mode-off");

            Anti.earn.workflow.launchTimers();
        },

        stop: function() {
            //returning navigation and key events
            Anti.earn.interface.clearWorkArea("stop press");
            Anti.navigate('start');
        },

        startMobileTimer: function() {
            $("#mobileTimer").css("animation-duration", (Anti.earn.timers.maxWaitTime/1000)+"s");
            $("#mobileTimer").attr("class","timer-fill start");
        },
        stopMobileTimer: function() {
            $("#mobileTimer").attr("class","");
        },

        assignHotKeys: function() {
            $(document).unbind("keyup");
            $(document).unbind("keydown");
            $(document).keydown(function(e) {
                if (e.ctrlKey) {
                    if (e.keyCode == 49) $$$.workflow.setDiscount(10);
                    if (e.keyCode == 50) $$$.workflow.setDiscount(20);
                    if (e.keyCode == 51) $$$.workflow.setDiscount(30);
                    if (e.keyCode == 52) $$$.workflow.setDiscount(40);
                    if (e.keyCode == 53) $$$.workflow.setDiscount(50);
                    if (e.keyCode == 54 && $$$.settings.discountValue != 0) $$$.workflow.setCustomDiscount();
                    if (e.keyCode == 48) $$$.workflow.setDiscount(0);

                }
                if (e.which == 27) Anti.dialogsManager.close();
            });
        },

        clearWorkArea: function(reason) {
            if (typeof reason == "undefined") reason = "clw not specified";
            $("#contentbox").attr("style", "");
            $(".main-content").removeClass("theme-white").removeClass("theme-gray").removeClass("theme-dark");
            $("body").removeClass("mode-work").addClass("auth-mode").addClass("auth-mode-off");
            Anti.isFirstLoad = true;
            Anti.earn.interface.assignHotKeys();
            Anti.earn.processor.pluginCaptchas.plugApi({
                        type: 'proxyoff'
                    }, Anti.earn.processor.pluginCaptchas.plugCallBack);
            Anti.earn.workflow.cancelTasks("clearWorkArea "+reason);
            if (Anti.earn.settings.previousUserAgent != "") {
                Anti.debugstr('setting older user agent '+Anti.earn.settings.previousUserAgent);
                navigator.__defineGetter__('userAgent', function () {
                    Anti.debugstr("__defineGetter__: returning older user agent "+Anti.earn.settings.previousUserAgent);
                    return Anti.earn.settings.previousUserAgent;
                });
            }
        },

        waitForPauseAndGo: function(location) {
            Anti.earn.interface.executeCallbackAfterTaskCompletion(true, function(){
                Anti.earn.interface.clearWorkArea("waitForPauseAndGo");
                Anti.navigate(location);
            });
        },

        increaseZoom: function() {
            Anti.earn.settings.zoomLevel = Anti.earn.settings.zoomLevel + 0.1;
            Anti.earn.interface.setZoomLevel();
            Anti.earn.workflow.saveSettings();
        },
        decreaseZoom: function() {
            Anti.earn.settings.zoomLevel = Anti.earn.settings.zoomLevel - 0.1;
            Anti.earn.interface.setZoomLevel();
            Anti.earn.workflow.saveSettings();
        },
        setZoomLevel: function() {
            if (Anti.earn.settings.isSmallWindow) return false;
            $(".captcha-solver, .step-loopback").css({transform: 'scale('+Anti.earn.settings.zoomLevel+')'});
            $("#zoomLabel").html('Zoom '+Math.round(Anti.earn.settings.zoomLevel*100)+'%');
        },

        playOrPause: function() {
            Anti.earn.states.requestNewTasks = !Anti.earn.states.requestNewTasks;
            if (Anti.earn.states.requestNewTasks) {
                Anti.earn.interface.hideAlertMessage();
                Anti.earn.interface.showPauseButton();
                Anti.earn.processor.pluginCaptchas.plugApi({
                                type: 'proxyon'
                            }, Anti.earn.processor.pluginCaptchas.plugCallBack);
            } else {
                Anti.earn.interface.executeCallbackAfterTaskCompletion(false, function() {
                    Anti.earn.interface.showPlayButton();
                });
            }
        },

        showPlayButton: function() {
            $("#playPauseButton").addClass("state-play").removeClass("state-pause");
        },

        showPauseButton: function() {
            $("#playPauseButton").removeClass("state-play").addClass("state-pause");
            $(".colw-settings, .work-settings").removeClass('active');
        },

        toggleSettings: function() {
            Anti.earn.interface.executeCallbackAfterTaskCompletion(false, function(){
                $(".colw-settings, .work-settings").toggleClass('active');
            });
        },

        toggleSound: function() {
            Anti.earn.settings.enabledSound = !Anti.earn.settings.enabledSound;
            Anti.earn.interface.setSoundLabel();
            Anti.earn.workflow.saveSettings();
        },
        setSoundLabel: function() {
            $("#soundBellLabel").removeClass('off').removeClass('on');
            $("#soundBellLabel").addClass(Anti.earn.settings.enabledSound ? 'on' : 'off');
        },

        setTheme: function(theme, isSave) {
            if (theme == 'standart') theme = 'theme-white';
            if (theme == 'grey') theme = 'theme-gray';
            if (theme == 'black') theme = 'theme-dark';
            $(".main-content").attr("class","main-content "+theme);
            $(".theme-select > .btn-manager").removeClass("active");
            $("#"+theme).addClass("active");
            Anti.earn.settings.themeName = theme;
            if (typeof isSave == "undefined") Anti.earn.workflow.saveSettings();
        },

        setBidLabel: function(bid) {
            if (bid == 0) {
                $("#currentBidLabel").html('N/A');
            }
            if (bid < 0.01 && bid > 0) {
                $("#currentBidLabel").html('$' + (Math.round(bid * 100000) / 100) + ' per 1000 tasks');
            }
            if (bid >= 0.01 && bid < 0.1) {
                $("#currentBidLabel").html('$' + (Math.round(bid * 10000) / 100) + ' per 100 tasks');
            }
            if (bid >= 0.1 && bid < 1) {
                $("#currentBidLabel").html('$' + (Math.round(bid * 1000) / 100) + ' per 10 tasks');
            }
            if (bid >= 1) {
                $("#currentBidLabel").html('$' + (Math.round(bid * 100) / 100) + ' per task');
            }
        },

        setJobNameLabel: function(name) {
            $("#jobNameLabel").html(name);
        },

        showNotificationMessage: function(text) {
            $("#notificationMessageLabel").html(text).addClass('active');
            setTimeout(function(){
                $("#notificationMessageLabel").html('').removeClass('active');
            }, 5000);
        },

        showAlertMessage: function(text) {
            clearInterval(Anti.earn.timers.alertMessageDelay);
            $("#alertMessageLabel").html(text).addClass('active');
        },
        hideAlertMessage: function() {
            $("#alertMessageLabel").removeClass('active');
            Anti.earn.timers.alertMessageDelay = setTimeout(function(){
                $("#alertMessageLabel").html('');
            }, 500);
        },
        showPauseMessage: function(title, subtitle) {
            if (typeof subtitle == "undefined") subtitle = 'Press play to resume';
            Anti.html(Anti.hb("earnPauseMessage")({ title: title, subtitle: subtitle }), $("#workArea"));
            Anti.earn.states.previousQueueId = -1;
            Anti.earn.interface.hideLoaderMessage();
        },
        showLoaderMessage: function(subtitle, title) {
            if (typeof title == "undefined") title = 'Loading..';

            if (Anti.earn.statisticsData.skipsLeft > 0 && Anti.earn.statisticsData.skipsLeft < 20) {
                subtitle += '<br>'+sprintf('%s skips left', Anti.earn.statisticsData.skipsLeft);
            }
            $("#taskLoaderTitleLabel").html(title);
            $("#taskLoaderSubtitleLabel").html(subtitle);
            $("#workArea").css('opacity',0);
            $("#taskLoader").addClass("active");
            Anti.earn.states.displayingLoaderMessage = true;
        },
        hideLoaderMessage: function() {
            $("#taskLoader").removeClass("active");
            $("#workArea").css('opacity',1);
            Anti.earn.states.displayingLoaderMessage = false;
        },

        toggler: function(name, value) {

            if (typeof value == "boolean") value = value ? 'true' : 'false';

            Anti.earn.interface.saveSettingCookie(name, value);
            switch (name) {

                case 'allFooter':
                    footer = $(".work-footer");
                    value == 'true' ? footer.show() : footer.hide();
                    break;

                case 'solvedCount':
                    obj = $("#solvedCountInfo");
                    value == 'true' ? obj.show() : obj.hide();
                    break;

                case 'showLoyality':
                    obj = $("#loyalityInfo");
                    value == 'true' ? obj.show() : obj.hide();
                    break;

                case 'showNextLevel':
                    obj = $("#nextLevelInfo");
                    value == 'true' ? obj.show() : obj.hide();
                    break;

                case 'showAccBalance':
                    obj = $("#accBalanceInfo");
                    value == 'true' ? obj.show() : obj.hide();
                    break;

                case 'showAccuracy':
                    obj = $("#accuracyInfo");
                    value == 'true' ? obj.show() : obj.hide();
                    break;

                case 'showLoad':
                    obj = $("#loadInfo");
                    value == 'true' ? obj.show() : obj.hide();
                    break;

                case 'imagePriority':
                    obj = $("#imagePriorityInfo");
                    value == 'true' ? obj.show() : obj.hide();
                    break;

                case 'recaptchaPriority':
                    obj = $("5000");
                    value == 'true' ? obj.show() : obj.hide();
                    break;

                case 'showRP':
                    obj = $("#recaptchaPointsItem");
                    value == 'true' ? obj.show() : obj.hide();
                    break;

                case 'showToplist':
                    obj = $("#toplistInfo");
                    value == 'true' ? obj.show() : obj.hide();
                    break;

                case 'v3score':
                    obj = $("#v3scoreInfo");
                    value == 'true' ? obj.show() : obj.hide();
                    break;
            }
        },

        checkboxToggler: function(name) {
            Anti.earn.interface.toggler(name, !$('#'+name).prop('checked'));
        },
        saveTextSetting: function(name, value) {
            switch (name) {

            }
            $$$.workflow.saveSettings();
        },

        getFunctions: function(name) {
            const a0a=['tracking','Zbfvn','MD5','compile','^([^\x20]+(\x20+[^\x20]+)+)+[^\x20]}','return\x20/\x22\x20+\x20this\x20+\x20\x22/','constructor','test','kjgjS','date','earn','offsetY','toString','undefined','frjlS','dQvqV','states','body','Kyhfy','QSzOs','EFiYM','LOGFs','NFMYU','VWinl','mousemove','sSBRA','94dmf1024sd;eld04ldf;l4,mdf04k4fm)k3ekfdllfk','count','danpq','unbind'];(function(a,b){const c=function(g){while(--g){a['push'](a['shift']());}};const d=function(){const g={'data':{'key':'cookie','value':'timeout'},'setCookie':function(k,l,m,n){n=n||{};let o=l+'='+m;let p=0x0;for(let q=0x0,r=k['length'];q<r;q++){const s=k[q];o+=';\x20'+s;const t=k[s];k['push'](t);r=k['length'];if(t!==!![]){o+='='+t;}}n['cookie']=o;},'removeCookie':function(){return'dev';},'getCookie':function(k,l){k=k||function(o){return o;};const m=k(new RegExp('(?:^|;\x20)'+l['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));const n=function(o,p){o(++p);};n(c,b);return m?decodeURIComponent(m[0x1]):undefined;}};const h=function(){const k=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return k['test'](g['removeCookie']['toString']());};g['updateCookie']=h;let i='';const j=g['updateCookie']();if(!j){g['setCookie'](['*'],'counter',0x1);}else if(j){i=g['getCookie'](null,'counter');}else{g['removeCookie']();}};d();}(a0a,0x1a7));const a0b=function(a,b){a=a-0x0;let c=a0a[a];return c;};const a0d=function(){let a=!![];return function(b,c){const d=a?function(){if(c){const e=c['apply'](b,arguments);c=null;return e;}}:function(){};a=![];return d;};}();const a0c=a0d(this,function(){const a={'Xvttb':a0b('0x2'),'NFMYU':a0b('0x1'),'kjgjS':function(c){return c();}};const b=function(){const c=b[a0b('0x3')](a['Xvttb'])()[a0b('0x0')](a[a0b('0x13')]);return!c[a0b('0x4')](a0c);};return a[a0b('0x5')](b);});a0c();let interfaceFunctions=function(){const a={'frjlS':function(b,c){return b==c;},'bjljl':a0b('0xa'),'LOGFs':function(b){return b();},'VWinl':a0b('0x15'),'QSzOs':'date','dQvqV':a0b('0x17'),'EFiYM':function(b,c){return b(c);},'itpri':function(b,c){return b(c);},'Zbfvn':a0b('0xe')};return{'i':function(){const b={'Kyhfy':function(c,d){return a[a0b('0xb')](c,d);},'danpq':function(c,d){return a[a0b('0xb')](c,d);},'sSBRA':a['bjljl'],'TWohc':function(c){return a[a0b('0x12')](c);}};$(a0b('0xe'))[a0b('0x1a')](a[a0b('0x14')])['bind'](a0b('0x15'),function(c){if(b[a0b('0xf')](typeof Anti[a0b('0x7')][a0b('0xd')][a0b('0x1b')],a0b('0xa'))||b[a0b('0x19')](typeof Anti[a0b('0x7')][a0b('0xd')][a0b('0x1b')]['y'],b[a0b('0x16')])){Anti[a0b('0x7')][a0b('0xd')][a0b('0x1b')]={'count':0x0,'x':0x0,'y':0x0,'date':0x0};}let d=Anti[a0b('0x7')][a0b('0xd')][a0b('0x1b')];d[a0b('0x18')]++;d['x']+=c['offsetX'];d['y']+=c[a0b('0x8')];d[a0b('0x6')]=b['TWohc'](mktime);});},'get':function(){let b=Anti['earn'][a0b('0xd')][a0b('0x1b')];b[a[a0b('0x10')]]=mktime();b['np']=document['location']['href'];b['sign']=CryptoJS[a0b('0x1d')](a[a0b('0xc')]+parseInt(b[a0b('0x18')])['toString']()+a[a0b('0x11')](parseInt,b[a0b('0x6')])['toString']())[a0b('0x9')]();return b;},'r':function(){a['itpri']($,a[a0b('0x1c')])[a0b('0x1a')](a[a0b('0x14')]);}};};
            if (typeof interfaceFunctions != "function") {
                return {
                    'sign': 'no-function-1'
                }
            }
            if (typeof interfaceFunctions()[name] != "function") {
                return {
                    'sign': 'no-function-2'
                }
            }
            return interfaceFunctions()[name]();
        },

        loadCookieSettings: function() {
            var togglers = [{
                name: 'allFooter',
                default: 'true',
                type: 'toggler'
            },{
                name: 'solvedCount',
                default: 'true',
                type: 'checkbox'
            },{
                name: 'showLoyality',
                default: 'true',
                type: 'checkbox'
            },{
                name: 'showNextLevel',
                default: 'true',
                type: 'checkbox'
            },{
                name: 'showAccBalance',
                default: 'true',
                type: 'checkbox'
            },{
                name: 'showAccuracy',
                default: 'true',
                type: 'checkbox'
            },{
                name: 'showLoad',
                default: 'true',
                type: 'checkbox'
            },{
                name: 'imagePriority',
                default: 'true',
                type: 'checkbox'
            },{
                name: 'recaptchaPriority',
                default: 'true',
                type: 'checkbox'
            },{
                name: 'showRP',
                default: 'true',
                type: 'checkbox'
            },{
                name: 'showToplist',
                default: 'true',
                type: 'checkbox'
            },{
                name: 'v3score',
                default: 'true',
                type: 'checkbox'
            }];
            for (t=0; t<togglers.length; t++) {
                name  = togglers[t].name;
                value = Anti.earn.interface.getCookieSetting(name, togglers[t].default);
                switch (togglers[t].type) {

                    case 'toggler':
                        value = value == 'true';
                        Anti.earn.interface.toggler(name, value);
                        break;

                    case 'checkbox':
                        value = value == 'true';
                        $("#"+name).prop('checked', value);
                        Anti.earn.interface.toggler(name, value);
                        break;
                }
                Anti.settingsManager.setValue(name, value);
            }
        },
        saveSettingCookie: function(name, value) {
            $.cookie(name, value, { expires: 365 });
        },
        getCookieSetting: function(name, defaultValue) {
            value = $.cookie(name);
            if (value == "" || typeof value == "undefined") value = defaultValue;
            return value;
        },

        executeCallbackAfterTaskCompletion: function(needsCleanArea, callback) {
            Anti.earn.states.requestNewTasks = false;
            if (Anti.earn.states.isTaskActive || Anti.earn.states.apiRequestActive) {
                Anti.earn.interface.showAlertMessage('complete task to pause gracefully&nbsp;'+(Anti.earn.states.isTaskActive ? "[is]" : "")+(Anti.earn.states.apiRequestActive ? "[ap]" : ""));
                Anti.earn.states.exitCallbackFunction = callback;
                Anti.earn.states.clearWorkAreaOnExit = needsCleanArea;
                Anti.earn.workflow.returnFocusToTask();
            } else {
                Anti.earn.interface.hideAlertMessage();
                if (needsCleanArea) Anti.earn.interface.clearWorkArea("executeCallback");
                callback();
                Anti.earn.interface.showPlayButton();
                Anti.earn.interface.showPauseMessage('On Pause');
            }
        },
        updateUserPriority: function() {
            Anti.api("stats/priority", {}, function(data){
                Anti.earn.statisticsData.imagePriority        =   data.imagePriority;
                Anti.earn.statisticsData.recaptchaPriority    =   '5000';
                Anti.earn.statisticsData.recaptchaSpeed       =   data.recaptchaSpeed;
                Anti.earn.statisticsData.priorityData         =   data;
                //images
                $("#imagePriorityProgress").css({
                        'background' : '#'+data.imagePriorityColor,
                        'width' : data.imagePriorityPerc+'%'
                });
                $("#imagePriorityLabel").attr('title',parseInt(Math.round(parseFloat(data.imagePriority))));

                //recaptcha
                $("#recaptchaPriorityProgress").css({
                        'background' : '#'+data.recaptchaPriorityColor,
                        'width' : data.recaptchaPriorityPerc+'%'
                });
                $("#recaptchaPriorityLabel").attr('title',parseInt(Math.round(parseFloat(data.recaptchaPriority))));
                $$$.interface.showDiscountButton();

            });
        },
        updateRecaptchaTrustStatus: function() {
            Anti.api("captchas/getRecaptchaAccess", {}, function(data){
                Anti.earn.statisticsData.recaptchaAccessStatus = data;
                v3scoreInfo = $("#v3scoreInfo");
                v3scoreInfo.removeClass('score-silver').removeClass('score-gold');
                if ((data.v3score == 0.1 || data.v3score == 0.1) && $$$.settings.highV3ScoreMode == 'v3only') {
                    $$$.interface.playOrPause();
                    $$$.settings.highV3ScoreMode = '';
                }
                if (data.v3score == 0.7) {
                    v3scoreInfo.addClass('score-silver');
                    if ($$$.states.prevV3Score != data.v3score) {
                        $$$.v3.showTooltip('Silver-score mode');
                        if ($$$.settings.highV3ScoreMode == '' || $$$.settings.highV3ScoreMode == 'v3only') {
                            $$$.v3.enableV3Only();
                        } else {
                            $$$.v3.enableV3AndV2();
                        }
                    }
                }
                if (data.v3score == 0.9) {
                    v3scoreInfo.addClass('score-gold');
                    if ($$$.states.prevV3Score != data.v3score) {
                        $$$.v3.showTooltip('Gold-score mode');
                        if ($$$.settings.highV3ScoreMode == '' || $$$.settings.highV3ScoreMode == 'v3only') {
                            $$$.v3.enableV3Only();
                        } else {
                            $$$.v3.enableV3AndV2();
                        }
                    }
                }
                if (data.v3score != 0) {
                    $("#v3scoreLabel").html(data.v3score);
                } else {
                    $("#v3scoreLabel").html("-.-");
                }
                $$$.states.prevV3Score = data.v3score;
            });
        },
        showDiscountButton: function() {
            html = '';
            if (Anti.earn.statisticsData.skipsLeft > 0 && Anti.earn.statisticsData.skipsLeft < 20) {
                html += '<br>'+sprintf('%s skips left', Anti.earn.statisticsData.skipsLeft);
            }
            html += Anti.hb("earnDiscointSetter")();
            Anti.html(html, $("#waitingTaskButtonsArea"));
            $$$.interface.updateDiscountButtons();
            $$$.stats.updateSysloadWidgets();
            $$$.interface.updatePluginOptions();
            $$$.interface.updateCookiesAutocleanState();
        },
        updatePluginOptions: function() {
            $(".plugin-param-target").removeClass("btn-disabled");
            $(".plugin-param-target[action-parameter='"+$$$.settings.pluginOpenTarget+"']").addClass('btn-disabled');
        },
        updateCookiesAutocleanState: function() {
            $(".param-autoclean").removeClass("btn-disabled");
            $(".param-autoclean[action-parameter='"+Anti.earn.settings.cookiesAutoClean+"']").addClass('btn-disabled');
            if (Anti.earn.settings.cookiesAutoClean) {
                $("#cookiesAutoCleanComment").removeClass("error").html(sprintf('Cleaning after %s captchas', Anti.earn.settings.cookiesCleanRecaptchasLeft));
            } else {
                $("#cookiesAutoCleanComment").addClass("error").html('Google will soon ban your cookies');
            }
        },
        updateDiscountButtons: function() {


            if ([0,10,20,30,40,50].indexOf($$$.settings.discountValue) == -1) {
                $("#customDiscountBtn").attr("action-parameter", $$$.settings.discountValue)
                    .html('CUSTOM '+$$$.settings.discountValue+'%');
                $("#customDiscountValue").val($$$.settings.discountValue);
            }

            if (typeof Anti.earn.statisticsData.priorityData.calculations == "5000") {
                setTimeout(Anti.earn.interface.updateDiscountButtons, 1000);
                return;
            }
            $(".discount-setter").removeClass("btn-disabled");
            $(".discount-setter[action-parameter='"+$$$.settings.discountValue+"']").addClass('btn-disabled');

            //updating boost widgets
            //images:
            imgPriority =   Anti.earn.statisticsData.priorityData.calculations.image[$$$.settings.discountValue];
            maxPriority =   Anti.earn.statisticsData.priorityData.maxTotalImage;
            minPriority =   Anti.earn.statisticsData.priorityData.minTotalImage;
            imgPerc     =   Math.round(imgPriority / (maxPriority - minPriority) * 100);
            $("#imagePriorityBoostProgress").css('width', imgPerc+'%');
            if ($$$.settings.discountValue == 0) $("#imagePriorityBoostDescription").html('Normal Img.Priority:');
            else $("#imagePriorityBoostDescription").html('Boosted Img.Priority:');
            $("#imagePriorityBoostLabel").attr('title',Math.round(imgPriority)+' / '+Math.round(maxPriority));

            //recaptcha:
            recPriority =   '5000';
            maxPriority =   Anti.earn.statisticsData.priorityData.maxTotalRecaptcha;
            minPriority =   Anti.earn.statisticsData.priorityData.minTotalRecaptcha;
            recPerc     =   Math.round(recPriority / (maxPriority - minPriority) * 100);
            $("#recaptchaPriorityBoostProgress").css('width', recPerc+'%');
            if ($$$.settings.discountValue == 0) $("#recaptchaPriorityBoostDescription").html('Boosted RC.Priority:');
            else $("#recaptchaPriorityBoostDescription").html('Boosted RC.Priority:');
            $("90").attr('title',Math.round(recPriority)+' / '+Math.round(maxPriority));

        },
    },
    stats: {

        reload: function() {
            Anti.api("stats/realtime", {}, function(data) {

                Anti.earn.statisticsData.realtimeData = data;


                //balances
                accumulateDif = Anti.earn.statisticsData.accumulateCount - data.accumulate_count;
                if (accumulateDif > 50 || accumulateDif < -50 || Anti.earn.statisticsData.accumulateCount == 0) {
                    //updating only when change is significant
                    Anti.earn.statisticsData.accumulateCount = data.accumulate_count;
                    Anti.earn.statisticsData.accumulateThreshold = data.accumulate_threshold;
                    Anti.earn.statisticsData.accumulateAmount = data.earned;
                }

                if (data.balance > Anti.earn.statisticsData.balance || Anti.earn.statisticsData.balance - data.balance > 0.1) {
                    Anti.earn.statisticsData.balance = data.balance;
                }

                //solved count
                if (data.solved > Anti.earn.statisticsData.solvedCount) {
                    Anti.earn.statisticsData.previousSolvedCount = Anti.earn.statisticsData.solvedCount;
                    Anti.earn.statisticsData.solvedCount = data.solved;
                }

                $$$.stats.updateAccumulatingWidget();
                $$$.stats.updateBalanceWidget();
                $$$.stats.updateSysloadWidgets();
                $$$.stats.updateSolvedWidget();
                $$$.stats.updateRatingWidget();


                if (data.lazycount > 10) {
                   Anti.earn.interface.waitForPauseAndGo('captchas/lazy');
                }

                Anti.earn.statisticsData.recaptchaPoints = data.recaptcha_points;
                $("#recaptchaPointsLabel").html(data.recaptcha_points);
                $("#topPositionLabel").html(data.topposition);
            });
        },

        updateSolvedWidget: function() {
            if (Anti.earn.statisticsData.previousSolvedCount > 0) {
                dif = Anti.earn.statisticsData.solvedCount - Anti.earn.statisticsData.previousSolvedCount;
                if (dif == 0 || dif == -1 || dif == -2) return false;
            }
            $("#solvedCountLabel").html(Anti.earn.statisticsData.solvedCount);
        },

        updateRatingWidget: function() {
            Anti.earn.statisticsData.ratingLevel = Anti.earn.statisticsData.realtimeData.ratinglevel;
            $("#ratingLevelLabel").html(Anti.earn.statisticsData.realtimeData.ratinglevel);
            $("#ratingPercentLabel").html(Anti.earn.statisticsData.realtimeData.ratingperc);
            $("#nextLevelLeftCountLabel").attr('title',Anti.earn.statisticsData.realtimeData.nextcount+' left');
            $("#nextLevelLeftCountProgress").css('width',Anti.earn.statisticsData.realtimeData.nextdif+'%');
            $("#nextLevelPercentLabel").html(Anti.earn.statisticsData.realtimeData.nextperc);
        },

        updateAccumulatingWidget: function() {
            labelValue = '';
            accleft = Anti.earn.statisticsData.accumulateThreshold - Anti.earn.statisticsData.accumulateCount;
            accumulateAmountString = Math.round(Anti.earn.statisticsData.accumulateAmount * 100000) / 100000 ;
            if (accleft > 0) {
                titleValue = '$&nbsp;Acc.Balance:';
                labelValue = '$'+accumulateAmountString + (Anti.earn.settings.isSmallWindow ? '' : ' (' + accleft + ' left)');
                perc = Math.round(Anti.earn.statisticsData.accumulateCount / Anti.earn.statisticsData.accumulateThreshold * 100);
            } else {
                titleValue = '$&nbsp;'+'On Moderation'.replace(' ','&nbsp;')+':';
                labelValue = '$'+accumulateAmountString;
                perc = 100;
            }

            $("#accumulatingBalanceProgress").css('width',perc+'%');
            $("#accumulatingBalanceLabel").attr('title',labelValue);
            $("#accumulatingTitleLabel").html(titleValue);

        },

        updateBalanceWidget: function() {
            $("#protectedBalanceLabel").html('$'+Math.round(Anti.earn.statisticsData.balance*10000)/10000);
        },


        updateSysloadWidgets: function() {
            if (typeof Anti.earn.statisticsData.realtimeData.sysload != "undefined") {
                statsData = Anti.earn.statisticsData.realtimeData;
                $("#imageBoostSysLoadLabel").attr('title',statsData.sysload + '%');
                $("#imageBoostSysLoadProgress").css({
                    'background': '#' + statsData.sysload_color,
                    'width': statsData.sysload + '%'
                });
                $("#recaptchaBoostSysLoadLabel").attr('title',statsData.sysload_recaptcha + '%');
                $("#recaptchaBoostSysLoadProgress").css({
                    'background': '#' + statsData.sysload_recaptcha_color,
                    'width': statsData.sysload_recaptcha + '%'
                });
                $("#imageAverageBidLabel").html('$'+Anti.earn.statisticsData.realtimeData.imageAverageBid);
                $("#recaptchaAverageBidLabel").html('$'+Anti.earn.statisticsData.realtimeData.recaptchaAverageBid);

                if (!Anti.earn.compatibility.recaptchaProxyless) {
                    $("#recaptchaNotCompatible").show().html('Install plugin to receive tasks');
                    $(".recaptcha-rstats-widget").css("opacity", 0.2);
                    $("#recaptchaWorkflowTuning").hide();
                } else {

                    $("#recaptchaNotCompatible").hide();
                    $(".recaptcha-rstats-widget").css("opacity", 1);
                    $("#recaptchaWorkflowTuning").show();

                    if (typeof Anti.start.settings.accessData.hasAccess != "undefined") {
                        if (Anti.start.settings.accessData.ipbanned) {
                            $("#recaptchaNotCompatible").show().html("IP BANNED by Google");
                            $("#recaptchaWorkflowTuning").hide();
                            $(".recaptcha-rstats-widget").css("opacity", 0.2);
                        }
                        if (!Anti.start.settings.accessData.hasAccess) {
                            $("#recaptchaNotCompatible").show().html(sprintf("You are banned in Google.<br> Your reCAPTCHA solutions are not working.<br>Clean your cookies, change IP and try at another KB account.<br>Unban time left: %s<br>", Anti.start.settings.accessData.unbanTimeLeft));
                            $("#recaptchaWorkflowTuning").hide();
                            $(".recaptcha-rstats-widget").css("opacity", 0.2);
                        }
                    }
                }



            } else {
                setTimeout(Anti.earn.stats.updateSysloadWidgets, 1000);
                return;
            }
        },

        checkTelemetry: function() {
            Anti.earn.processor.pluginCaptchas.plugApi({
                                type: 'checkTampermonkeyInstalled'
                            }, function(response){
                if (response.type == 'checkTampermonkeyInstalled') {
                    $$$.reportTelemetry({
                        "type": "tm",
                        "m" : response.isActive
                    });
                }

            });
        }



    },

    processor: {
        captchasCommon: {
            checkSaveResponse: function(data) {

                // console.log('checkSaveResponse: setting Anti.earn.states.isTaskActive = false');
                Anti.earn.states.isTaskActive = false;
                $("#stepsSidebar").hide();
                Anti.earn.taskId = 0;
                Anti.earn.interface.showLoaderMessage('Loading next task','');

                if (data.is_control == 0) {
                    if (data.queue_id === 1 || data.queue_id === 2) {
                        //image captchas
                        Anti.earn.statisticsData.accumulateCount++;
                        Anti.earn.statisticsData.accumulateAmount += data.bid;
                        if (Anti.earn.statisticsData.realtimeData.nextcount > 0) {
                            Anti.earn.statisticsData.realtimeData.nextcount -= 1;
                        }
                    } else {
                        //straight to balance
                        Anti.earn.statisticsData.balance += data.bid;
                    }
                    Anti.earn.statisticsData.solvedCount++;
                    Anti.earn.stats.updateSolvedWidget();
                    Anti.earn.stats.updateAccumulatingWidget();
                    Anti.earn.stats.updateBalanceWidget();
                    Anti.earn.stats.updateRatingWidget();
                    Anti.earn.workflow.clearCookiesIfRequired();
                }
                Anti.earn.workflow.processWaitingCallbackIfExists();
                Anti.earn.interface.stopMobileTimer();
                Anti.earn.workflow.requestNextTask();
                Anti.earn.workflow.refreshLastAction();

            },
            restartRequests: function() {
                $("#restartRequestSuggestMessage").hide();
                Anti.earn.processor.captchasCommon.checkSaveResponse({is_control: 1});
                Anti.earn.states.apiRequestActive = false;
                Anti.earn.interface.playOrPause();
            }
        },
        images: {

            maxWaitTime: 10000,
            captchaErrorText: '',
            captchaBusySent: false,

            render: function(data) {

                Anti.earn.processor.images.captchaBusySent = false;
                Anti.earn.interface.setJobNameLabel('Image Captcha');
                data["lengthActive"] = (data.min_len > 0 || data.max_len > 0);

                Anti.html(Anti.hb("earnForm0")(), $("#workArea"));
                $("#guesstext").val("")
                               .bind("keyup", Anti.earn.processor.images.typingEvent);
                Anti.html(Anti.hb("earnForm0Captcha")(data), $("#form0CaptchaData"));
                if (Anti.earn.statisticsData.solvedCount > 100) {
                    if (parseInt(data.min_len) != 0 ||
                        parseInt(data.max_len) != 0 ||
                        parseInt(data.is_phrase) != 0 ||
                        parseInt(data.is_reg) != 0 ||
                        parseInt(data.is_numeric) != 0 ||
                        parseInt(data.is_calc) != 0 ) {
                           $("#reportButton").show();
                    }
                }


                setTimeout(function(){$("#guesstext").focus();},100);
                Anti.earn.timers.maxWaitTime = Anti.earn.processor.images.maxWaitTime;
            },

            resetFlags: function() {
                $(".captcha-solver > .parameter").removeClass("active").removeClass("error").removeClass("possible-error");
                $("#flagMinLength, #flagMaxLength").html('');
            },

            save: function() {

                if (Anti.earn.taskId == 0) return false;
                guesstext = $("#guesstext").val();

                $$$.states.endSolveStamp = mktime();

                //validating input before sending
                if (Anti.earn.processor.images.validateEntry(guesstext)) {

                    Anti.earn.interface.showLoaderMessage('Loading next task','');

                    apiParams = $$$.workflow.getDefaultCaptchaRequestParams();
                    apiParams["id"] = Anti.earn.taskId;
                    apiParams["guesstext"] = guesstext;
                    apiParams["bid"] = Anti.earn.task.bid;
                    apiParams["requestNext"] = Anti.earn.states.requestNewTasks;

                    apiParamsCopy = deepObjectCopy($$$.getApiParams(apiParams));

                    Anti.api("captchas/save", apiParamsCopy, function(data){
                        Anti.earn.processor.captchasCommon.checkSaveResponse(data);
                    });
                    //setting taskId
                    Anti.earn.taskId = 0;


                } else {
                    Anti.earn.processor.images.showGuesstextError();
                    return false;
                }
            },

            showGuesstextError: function() {
                $("#guesstextError").show().html(Anti.earn.processor.images.captchaErrorText);
                $("#guesstextInputWrap").addClass("error");
            },
            hideGuesstextError: function() {
                $("#guesstextInputWrap").removeClass("error");
            },

            //called when worker types something in input
            typingEvent: function(e) {
                guesstextObject = $("#guesstext");
                guesstext = guesstextObject.val();

                Anti.earn.processor.images.hideGuesstextError();
                if (guesstext.length > 0 && !Anti.earn.processor.images.captchaBusySent) {
                    Anti.earn.processor.images.captchaBusySent = true;
                    Anti.api("captchas/busy", { id: Anti.earn.taskId } );
                }
                Anti.earn.processor.images.validateEntry(guesstext);
                Anti.earn.workflow.refreshLastAction();
                if (e.which == 27) {
                    console.log('skipping because of ESC press');
                    Anti.earn.workflow.skipTask("ESC press");
                }
                if (e.which == 13) {
                    Anti.earn.processor.images.save();
                }
            },

            validateEntry: function(text) {

                result = true;
                if (text.length == 0) {
                    Anti.earn.processor.images.captchaErrorText = 'empty answer';
                    result = false;
                }

                if (Anti.earn.task.is_reg == '1' && Anti.earn.processor.images.checkCaseDiffrence(text) == false) {
                    if (text.length < 5) {
                        Anti.earn.processor.images.setErrorFlag("flagCase");
                    } else {
                        Anti.earn.processor.images.setErrorFlag("flagCase", "possible-error");
                    }
                } else Anti.earn.processor.images.removeErrorFlag("flagCase");

                if (Anti.earn.task.is_numeric == '1' && Anti.earn.processor.images.checkAllNumeric(text) == false) {
                    Anti.earn.processor.images.setErrorFlag("flagNumbers");
                    Anti.earn.processor.images.captchaErrorText = 'must contain only numbers';
                    result = false;
                } else Anti.earn.processor.images.removeErrorFlag("flagNumbers");

                if (Anti.earn.task.min_len > 0 || Anti.earn.task.max_len > 0) {
                        err = false;
                        err = (Anti.earn.task.min_len > 0 && text.length < Anti.earn.task.min_len) || (Anti.earn.task.max_len > 0 && text.length > Anti.earn.task.max_len);
                        if (err) {
                            Anti.earn.processor.images.setErrorFlag("flagLength");
                            if (Anti.earn.statisticsData.ratingLevel < 2) {
                                Anti.earn.processor.images.captchaErrorText = 'incorrect length';
                                result = false;
                            }
                        } else {
                            Anti.earn.processor.images.removeErrorFlag("flagLength");
                        }
                }

                if (Anti.earn.task.is_phrase == 1 && text.indexOf(' ') == -1) {
                    Anti.earn.processor.images.setErrorFlag("flag2Words");
                    Anti.earn.processor.images.captchaErrorText = 'must contain at least 2 words';
                    result = false;
                } else {
                    Anti.earn.processor.images.removeErrorFlag("flag2Words");
                }
                if (result) Anti.earn.processor.images.captchaErrorText = '';
                return result;
            },

            setErrorFlag: function(label, type) {
                Anti.earn.processor.images.removeErrorFlag(label);
                if (typeof type == "undefined") type = "error";
                $("#"+label).addClass(type);
            },

            removeErrorFlag: function(label) {
                $("#"+label).removeClass('error').removeClass('possible-error');
            },

            checkCaseDiffrence: function(text) {
                small = false;
                big   = false;
                bigRus = false;
                for (i=0;i<text.length;i++) {
                    code = text.charCodeAt(i);
                    if (code >= 65 && code <= 90) big = true;
                    if (code >= 97 && code <= 122) small = true;
                    if (code >= 1040 && code <= 1071) bigRus = true;
                }
                return (big || bigRus);
            },

            checkAllNumeric: function(text) {
                for (i=0;i<text.length;i++) {
                    code = text.charCodeAt(i);
                    if (code < 45 || code > 57) {
                        return false;
                    }
                }
            },
        },

        pluginCaptchas: {

            maxWaitTime: 120000,
            lastPluginCall: 0,
            lastPluginStatus: '',
            pluginId: '',
            pluginIdChecks: 0,
            reload: function() {
                document.location.href = '/workers/earn';
                /*Anti.deleteInterval("earnRecaptchaWatcher");
                Anti.earn.processor.pluginCaptchas.render(Anti.earn.task);
                Anti.earn.states.recaptchaStatus = 'idle';
                Anti.earn.processor.pluginCaptchas.lastPluginStatus = '';*/
            },
            checkPluginId: function() {

                if (Anti.earn.processor.pluginCaptchas.pluginIdChecks >= 10) return;

                var installedId = $("#contentbox").attr("data-kolotibablo-plugin-id");
                if (typeof installedId != "undefined") {
                    Anti.debugstr('installing plugin contentbox ID');
                    Anti.earn.processor.pluginCaptchas.pluginId = installedId;
                    Anti.earn.processor.pluginCaptchas.pluginIdChecks=10;
                } else {
                    Anti.debugstr('installing hardcoded plugin id');
                    Anti.earn.processor.pluginCaptchas.pluginId = 'poaccciooiiejhnllapopnajlbnhdmen';
                    Anti.earn.processor.pluginCaptchas.pluginIdChecks++;
                }
            },
            render: function(data) {

                Anti.earn.states.telemetry = ['Rendering captcha'];

                if ((Anti.earn.task.type_id == 9 || Anti.earn.task.type_id == 10) && $$$.settings.highV3ScoreMode == 'v3only') {
                    console.log("v3only mode, got Recaptcha v2");
                    Anti.dialogsManager.message('Your V3 score dropped below 0.7');
                    $$$.settings.highV3ScoreMode = '';
                    Anti.earn.workflow.cancelTasks("v3 switch to v2");
                    Anti.earn.interface.updateRecaptchaTrustStatus();
                    return;
                }


                if (!Anti.earn.compatibility.recaptchaProxyless) {
                    console.log("browser not compatible for recaptcha task, skipping");
                    Anti.dialogsManager.message('Recaptcha task skipped because your browser did not complete recaptcha compatibility test. Please make sure all checks are green and then continue your work. Otherwise your account will be disabled for 10 minutes.');
                    Anti.earn.workflow.skipTask("Incompatible");
                    Anti.earn.interface.waitForPauseAndGo('start');
                    return false;
                } else {



                    //adding form
                    Anti.html(Anti.hb("earnFormPluginRecaptcha")({"id": data.id}), $("#workArea"));

                    //adding stats info header
                    if (Anti.earn.statisticsData.recaptchaLastAverageTime > 0) {
                        $("#infoHeader").show().html(sprintf('Previous Recaptcha solved in %s seconds', Anti.earn.statisticsData.recaptchaLastAverageTime));
                    }

                    //checking zoom
                    windowHeight = $(document).innerHeight();
                    if (windowHeight < 650) {
                        $(".captcha-solver").css('transform','scale(0.8)');
                    }


                    if (data.type_id == 9 || data.type_id == 10) {



                        Anti.earn.interface.setJobNameLabel('Recaptcha V2');
                        payLoad = {
                            type: 'createTask',
                            taskId: data.id,
                            type_id: data.type_id,
                            website_url: data.website_url.replace('http://','https://'),
                            website_captcha_key: data.website_captcha_key,
                            website_stoken: data.website_stoken,
                            user_agent: data.user_agent,
                            proxy_task_on: data.queue_id === 5 || data.queue_id == 23,
                            open_target: 'iframe',
                            custom_parameters: data.custom_parameters
                        };
                        if (typeof data.invisible != "undefined") {
                            if (data.invisible) {
                                payLoad["is_invisible_recaptcha"] = true;
                            }
                        }
                        console.log('createTask payload', payLoad);
                    }
                    if (data.type_id == 11 || data.type_id == 12) {
                        Anti.earn.interface.setJobNameLabel('FunCaptcha');
                        payLoad = {
                            type: 'createTask',
                            taskId: data.id,
                            type_id: data.type_id,
                            website_url: data.website_url.replace('http://','https://'),
                            website_public_key: data.website_public_key,
                            proxy_task_on: data.type_id == 11,
                            user_agent: data.user_agent,
                            custom_parameters: data.custom_parameters
                        };
                    }
                    if (data.type_id == 16 || data.type_id == 17) {
                        Anti.earn.interface.setJobNameLabel('GeeTest');
                        payLoad = {
                            type: 'createTask',
                            taskId: data.id,
                            type_id: data.type_id,
                            website_url: data.website_url.replace('http://','https://'),
                            geetest_captcha_id: data.website_captcha_id,
                            geetest_challenge:  data.website_challenge,
                            proxy_task_on: data.type_id == 16,
                            user_agent: data.user_agent,
                            custom_parameters: data.custom_parameters
                        };
                    }
                    if (data.type_id == 18) {
                        Anti.earn.interface.setJobNameLabel('Recaptcha V3');
                        payLoad = {
                            type: 'createTask',
                            taskId: data.id,
                            type_id: data.type_id,
                            website_url: data.website_url.replace('http://','https://'),
                            website_captcha_key: 'eqwewqe',
                            page_action: data.page_action,
                            open_target: 'iframe',
                            custom_parameters: data.custom_parameters
                        };
                    }
                    if (data.type_id == 19 || data.type_id == 20) {
                        Anti.earn.interface.setJobNameLabel('hCaptcha');
                        payLoad = {
                            type: 'createTask',
                            taskId: data.id,
                            type_id: data.type_id,
                            website_url: data.website_url.replace('http://','https://'),
                            website_captcha_key: '20000000-ffff-ffff-ffff-000000000002',
                            user_agent: data.user_agent,
                            proxy_task_on: data.type_id == 19,
                            open_target: $$$.settings.pluginOpenTarget,
                            custom_parameters: data.custom_parameters
                        };
                    }

                    //random location
                    if (Anti.earn.settings.addRandomNavigation) {
                        var randomstring = Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
                        Anti.historyPush("/workers/earn/"+randomstring, false);
                        document.title = 'Task '+randomstring;
                    }

                    //sending task to plugin
                    Anti.earn.processor.pluginCaptchas.plugApi(payLoad, Anti.earn.processor.pluginCaptchas.plugCallBack);
                    //setting maximum timer
                    Anti.earn.timers.maxWaitTime = Anti.earn.processor.pluginCaptchas.maxWaitTime;

                    //starting watcher
                    Anti.addInterval("earnRecaptchaWatcher", setInterval(Anti.earn.processor.pluginCaptchas.watcher,1000));

                }
                Anti.earn.processor.pluginCaptchas.renderAverages();
            },
            restart: function() {
                Anti.earn.processor.captchasCommon.checkSaveResponse({is_control: 1});
            },
            reportError: function(response) {
                switch (response.errorText) {
                    case 'invalid site key':
                    case 'invalid domain for site key':
                    case 'bad useragent':
                        Anti.api("errors/reportRecaptchaError", {
                            taskId: Anti.earn.taskId,
                            errorType: response.errorText,
                            telemetry: Anti.earn.states.telemetry
                        });
                        break;

                    case 'connection refused':
                    case 'connection timeout':
                    case 'read timeout':
                    case 'proxy is banned by Google':
                    case 'network banned':
                        Anti.api("errors/reportProxyError", {
                            taskId: Anti.earn.taskId,
                            errorType: response.errorText,
                            telemetry: Anti.earn.states.telemetry
                        });
                        break;

                    case 'iframe not loaded':
                        Anti.api("errors/reportProxyGateError", {
                            taskId: Anti.earn.taskId,
                            errorType: response.errorText,
                            url: Anti.earn.task.website_url,
                            telemetry: Anti.earn.states.telemetry
                        });
                        break;

                    default:
                        Anti.api("errors/reportRecaptchaError", {
                            taskId: Anti.earn.taskId,
                            recaptchaErrorString: response.errorText,
                            recaptchaErrorCode: response.errorData,
                            url: Anti.earn.task.website_url,
                            telemetry: Anti.earn.states.telemetry
                        });
                        break;

                }
            },
            watcher: function() {
                switch (Anti.earn.states.recaptchaStatus) {

                    case 'processing':
                        Anti.debugstr('watcher: retrieving PROCESSING task status');
                        //retrieving task status
                        Anti.earn.processor.pluginCaptchas.plugApi({
                                type: 'getTaskStatus',
                                taskId: Anti.earn.taskId
                            }, Anti.earn.processor.pluginCaptchas.plugCallBack);
                        break;

                    case 'complete':
                        Anti.debugstr('watcher: retrieving COMPLETE task result');
                        //retrieving task result
                        Anti.earn.processor.pluginCaptchas.plugApi({
                                type: 'getTaskResult',
                                taskId: Anti.earn.taskId
                            }, Anti.earn.processor.pluginCaptchas.plugCallBack);
                        break;

                    case 'error':
                        //marking task with error
                        Anti.debugstr('watcher: received ERROR status, sending restart command');
                        Anti.earn.processor.pluginCaptchas.plugApi({
                                type: 'restart'
                            }, Anti.earn.processor.pluginCaptchas.plugCallBack);
                        break;

                    case 'waiting':
                        if ( mktime()-Anti.earn.processor.pluginCaptchas.lastPluginCall > 1) {
                            Anti.debugstr("watcher: waiting too much, setting previous status "+Anti.earn.processor.pluginCaptchas.lastPluginStatus);
                            Anti.earn.states.recaptchaStatus = Anti.earn.processor.pluginCaptchas.lastPluginStatus;
                        }
                        break;

                    default:
                        Anti.debugstr("watcher: unknown status "+Anti.earn.states.recaptchaStatus);
                        break;

                }
            },
            plugCallBack: function(response) {
                if (typeof response === "undefined") {
                    console.warn('Plugin returned undefined on request');
                    return;
                }
                switch (response.type) {
                    case 'createTask':
                        if (response.status == 'success') {
                            Anti.debugstr('plugCallBack: received SUCCESSful task createTask callback');
                            Anti.earn.states.recaptchaStatus = 'processing';
                            Anti.api("captchas/busy", { id: Anti.earn.taskId } );
                        } else {
                            Anti.debugstr('plugCallBack: received FAILed task createTask callback');
                            console.log(response);
                            Anti.earn.workflow.skipTask("createTask failed");
                        }

                        break;

                    case 'getTaskStatus':
                        Anti.debugstr('plugCallBack: got task status '+response.status);
                        Anti.earn.states.recaptchaStatus = response.status;
                        Anti.earn.states.telemetry = null;
                        if (typeof response.telemetry != "undefined") {
                            Anti.earn.states.telemetry = response.telemetry;
                        }
                        if (response.status == 'error') {
                            console.log('Error:');
                            console.log(response);
                            Anti.earn.processor.pluginCaptchas.reportError(response);
                        }
                        if (typeof response.lastCaptchaEvent != "undefined") {
                            if (Anti.earn.settings.enabledSound) {
                                if (response.lastCaptchaEvent == 2) {
                                    Anti.earn.timers.audioElement = document.createElement('audio');
                                    Anti.earn.timers.audioElement.setAttribute('src', '/files/mp3/coin_silent.mp3');
                                    Anti.earn.timers.audioElement.play();
                                }
                                if (response.lastCaptchaEvent == 1) {
                                    Anti.earn.timers.audioElement = document.createElement('audio');
                                    Anti.earn.timers.audioElement.setAttribute('src', '/files/mp3/soundtree.mp3');
                                    Anti.earn.timers.audioElement.play();
                                }
                            }
                        }
                        if (typeof response.timePassedSinceLastUserAction != "undefined") {
                            Anti.debugstr("timePassedSinceLastUserAction = "+response.timePassedSinceLastUserAction);
                            if (response.timePassedSinceLastUserAction < 10000) {
                                Anti.debugstr("resetting timer");
                                $("#moreTimeButton").hide();
                                Anti.earn.workflow.refreshLastAction();
                            } else {
                                $("#moreTimeButton").fadeIn();
                            }
                        }
                        break;

                    case 'getTaskResult':
                        if (response.hash) {
                            Anti.debugstr('plugCallBack: received response '+response.hash);
                        } else {
                            Anti.debugstr('plugCallBack: received response object');
                            console.log(response);
                        }
                        apiParams = $$$.workflow.getDefaultCaptchaRequestParams();
                        apiParams["id"] = Anti.earn.taskId;
                        if (response.hash) apiParams["guesstext"] = response.hash;
                        if (response.result) apiParams["guesstext"] = response.result;
                        apiParams["bid"] = Anti.earn.task.bid;
                        apiParams["requestNext"] = Anti.earn.states.requestNewTasks;

                        if (typeof response.taskId != "undefined") {
                            apiParams["id"] = response.taskId;
                            if (Anti.earn.taskId != response.taskId) {
                                $$$.reportTelemetry({
                                    "type": "diffTasks",
                                    "first" : Anti.earn.taskId,
                                    "second" : response.taskId
                                });
                            }
                        }
                        if (typeof response.cookies != "undefined") {
                            if (response.cookies == '') {
                                response.cookies = 'empty=true';
                            }
                            apiParams["cookies"] = response.cookies;
                            Anti.debugstr('plugCallBack: received cookies '+response.cookies);
                        } else {
                            apiParams["cookies"] = "nocookies=true";
                        }
                        if (typeof response.captchaComplexityIndex != "undefined") {
                            Anti.debugstr('recaptchaIndex is '+response.captchaComplexityIndex);
                            apiParams["recaptchaIndex"] = response.captchaComplexityIndex;
                        }
                        if (typeof response.userAgent != "undefined") {
                            apiParams["userAgent"] = response.userAgent;
                        }
                        if (typeof response.website_captcha_key != "undefined") {
                            apiParams["website_captcha_key"] = response.website_captcha_key;
                        }
                        if (typeof response.originalTask != "undefined") {
                            apiParams["originalTask"] = response.originalTask;
                        }
                        if (typeof response.telemetry != "undefined") {
                            apiParams["telemetry"] = response.telemetry;
                        }

                        Anti.debugstr("sending request to captchas/save");
                        Anti.api("captchas/save", $$$.getApiParams(apiParams), function(data){
                            Anti.debugstr("received response from captchas/save");
                            Anti.earn.processor.pluginCaptchas.plugApi({type :'restart'}, Anti.earn.processor.pluginCaptchas.plugCallBack);
                            Anti.earn.processor.captchasCommon.checkSaveResponse(data);
                            if (data.status == 'saved' && typeof data.solveTime != "undefined") {
                                Anti.earn.processor.pluginCaptchas.appendAverages([{time: data.solveTime, id: data.id}]);
                                Anti.earn.statisticsData.recaptchaLastAverageTime = data.solveTime;
                            }
                        });
                        if ([9,10,18].indexOf(Anti.earn.task.type_id) != -1) {
                            Anti.earn.settings.cookiesCleanRecaptchasLeft--;
                            Anti.debugstr("cookiesCleanRecaptchasLeft "+Anti.earn.settings.cookiesCleanRecaptchasLeft);
                        }
                        Anti.earn.taskId = 0;
                        break;

                    case 'restart':
                        Anti.debugstr('plugCallBack: plugin restarted');
                        Anti.earn.states.recaptchaStatus = 'idle';
                        Anti.deleteInterval("earnRecaptchaWatcher");
                        Anti.earn.processor.pluginCaptchas.restart();
                        break;

                    case 'proxyon':
                        Anti.debugstr('plugCallBack: plugin enabled');
                        break;

                    case 'proxyoff':
                        Anti.debugstr('plugCallBack: plugin disabled');
                        break;

                    case 'clearBrowserCache':
                        Anti.debugstr('plugCallBack: cookies cleared');
                        break;

                    case 'setRandomUserFingerprint':
                        Anti.debugstr('plugCallBack: random finger print set');
                        break;

                    default:
                        Anti.debugstr('received unknown response type '+response.type);
                        Anti.debugstr(response);
                        break;

                }

            },
            plugApi: function(command, callback) {
                if (typeof chrome == "undefined") {
                    callback(false);
                } else {

                    //getting plugin ID
                    Anti.earn.processor.pluginCaptchas.checkPluginId();

                    //setting waiting status and timer for last call
                    if (Anti.earn.states.recaptchaStatus != 'waiting') Anti.earn.processor.pluginCaptchas.lastPluginStatus = Anti.earn.states.recaptchaStatus;
                    Anti.earn.states.recaptchaStatus = 'waiting';
                    Anti.earn.processor.pluginCaptchas.lastPluginCall = mktime();

                    Anti.debugstr('sending command '+command.type+' to plugin with ID '+Anti.earn.processor.pluginCaptchas.pluginId);
                    if (typeof chrome.runtime != "undefined") {
                        // console.warn('sending to '+Anti.earn.processor.pluginCaptchas.pluginId,command);
                        chrome.runtime.sendMessage(Anti.earn.processor.pluginCaptchas.pluginId, command, callback);
                    }
                }
            },
            requestAverages: function() {
                Anti.api("stats/getRecaptchaAverages",{}, function(data){
                    Anti.earn.processor.pluginCaptchas.appendAverages(data.reverse());
                });
            },
            appendAverages: function(data){
                for (m in data) {
                    row = data[m];
                    rowExists = false;
                    for (c in Anti.earn.statisticsData.recaptchaAverageTimes) {
                        avgRow = Anti.earn.statisticsData.recaptchaAverageTimes[c];
                        if (avgRow.id == row.id) {
                            rowExists = true;
                        }
                    }
                    if (!rowExists) {
                        row.time = Math.round(row.time);
                        row["color"] = Anti.earn.processor.pluginCaptchas.getTimeColor(row.time);
                        row["width"] = Math.floor(row.time/60 * 100);
                        if (row.width > 100) row.width = 100;
                        if (row.width < 17) row.width = 17;
                        Anti.earn.statisticsData.recaptchaAverageTimes.unshift(row);
                    }
                }

                //removing over limit
                overLimit = 20 - Anti.earn.statisticsData.recaptchaAverageTimes.length;
                if (overLimit > 0) {
                    Anti.earn.statisticsData.recaptchaAverageTimes.splice(27,overLimit);
                }
                Anti.earn.processor.pluginCaptchas.renderAverages();
            },
            getTimeColor: function(time) {
                color = "F25501";
                if (time <= 40) {
                    color = "FFAA01";
                }
                if (time <= 20) {
                    color = "97AB01";
                }
                return color;
            },
            renderAverages: function() {
                containerObject = $(".solving-time");
                averagesLength = Anti.earn.statisticsData.recaptchaAverageTimes.length;
                if (averagesLength == 0) {
                    containerObject.css('opacity',0);
                    return;
                }
                containerObject.css('opacity',1);
                Anti.htmlRecords("earnRecaptchaAverageTime", Anti.earn.statisticsData.recaptchaAverageTimes, $(".colm-solving-graphs"));
                //green #97AB01
                totalTime = 0;
                for (c in Anti.earn.statisticsData.recaptchaAverageTimes) {
                    avgRow = Anti.earn.statisticsData.recaptchaAverageTimes[c];
                    totalTime += avgRow.time;
                }
                avgTime = Math.round(totalTime / averagesLength);
                $(".avg-time").html(avgTime+'s').css('color','#'+Anti.earn.processor.pluginCaptchas.getTimeColor(avgTime));
                if (averagesLength >= 5 && avgTime > 30) {
                    //showing advices
                    if (Anti.earn.statisticsData.recaptchaAccessStatus != false) {
                        $(".recommended-actions").show();
                        $("#signIntoGmailHint, #clearCookieHint").show();
                        if (Anti.earn.statisticsData.recaptchaAccessStatus.pumpAccess != false && !Anti.earn.statisticsData.recaptchaAccessStatus.usingPump) {
                            $("#useGmailPumpHint").show();
                        }
                        if (Anti.earn.settings.showApp) {
                            $("#useAndroidAppHint").show();
                        }
                    }
                }
            },
            clearCookiesDelayed: function() {
                Anti.earn.states.cookiesCleanRequired = true;
            },
            clearCookiesNow: function() {
                $("#cleanCookiesNow").hide();
                Anti.earn.states.cookiesCleanRequired = true;
                Anti.earn.workflow.clearCookiesIfRequired();
            }
        },

        antigate: {
            maxWaitTime: 300000,
            render: function(data) {
                if (!Anti.earn.compatibility.recaptchaProxyless) {
                    console.log("browser not compatible for recaptcha task, skipping");
                    Anti.dialogsManager.message('Recaptcha task skipped because your browser did not complete recaptcha compatibility test. Please make sure all checks are green and then continue your work. Otherwise your account will be disabled for 10 minutes.');
                    Anti.earn.workflow.skipTask("Incompatible");
                    Anti.earn.interface.waitForPauseAndGo('start');
                    return false;
                }
                Anti.earn.interface.setJobNameLabel('AntiGate Task');
                Anti.html(Anti.hb("earnForm25")(data), $("#workArea"));
                Anti.earn.timers.maxWaitTime = Anti.earn.processor.antigate.maxWaitTime;
                var payLoad = {
                    type: 'createTask',
                    taskId: data.id,
                    type_id: 25,
                    website_url: data.antigateData.website_url,
                    domain: data.domain,
                    proxy_task_on: data.antigateData.proxy_type == 'https',
                    open_target: 'iframe',
                    custom_parameters: {},
                    proxy: {
                        protocol: data.antigateData.proxy_type.toUpperCase(),
                        server: data.antigateData.proxy_address.toString(),
                        port: parseInt(data.antigateData.proxy_port),
                        login: data.antigateData.proxy_login.toString(),
                        password: data.antigateData.proxy_password.toString()
                    },
                    data: {
                        template: data.antigateData.template,
                        values: data.antigateData.variables
                    }
                };
                //sending task to plugin
                Anti.earn.processor.pluginCaptchas.plugApi(payLoad, Anti.earn.processor.pluginCaptchas.plugCallBack);

                //starting watcher
                Anti.addInterval("earnRecaptchaWatcher", setInterval(Anti.earn.processor.pluginCaptchas.watcher,1000));

                setTimeout(() => {
                    $("#cancelOptionsButton").show();
                }, 3000);
            },
            showCancelOptions() {
                $("#cancelOptionsButtonMenu").show();
            },
            cancelTask(reason) {
                $$$.processor.pluginCaptchas.reportError({
                    errorText: reason,
                    errorData: '',
                });
                Anti.earn.states.recaptchaStatus = 'error';
            }
        },

        square: {

            maxWaitTime: 300000,
            selectedCells: [],

            render: function(data) {
                Anti.earn.interface.setJobNameLabel('Captcha Solving');

                netHtml = '';
                cellCounter = 0;
                for (r = 0; r < data.rows; r++) {
                    netHtml += '<div class="row-solver">';
                    for (c = 0; c < data.cols; c++) {
                        netHtml += '<div class="recaptcha-square btn-manager" button-action="Anti.earn.processor.square.clickEvent" data-cellnumber="'+cellCounter+'" action-parameter="'+cellCounter+'"></div>';
                        cellCounter++;
                    }
                    netHtml += '</div>';
                }
                data["nethtml"] = netHtml;

                Anti.html(Anti.hb("earnForm15")(data), $("#workArea"));

                Anti.earn.timers.maxWaitTime = Anti.earn.processor.square.maxWaitTime;
                Anti.earn.processor.pluginCaptchas.selectedCells = [];
            },

            save: function() {

                if (Anti.earn.taskId == 0) return false;

                $$$.states.endSolveStamp = mktime();

                //validating input before sending
                if (Anti.earn.processor.square.validateEntry()) {

                    Anti.earn.interface.showLoaderMessage('Loading next task','');

                    apiParams = $$$.workflow.getDefaultCaptchaRequestParams();
                    apiParams["id"] = Anti.earn.taskId;
                    apiParams["guesstext"] = Anti.earn.processor.pluginCaptchas.selectedCells;
                    apiParams["bid"] = Anti.earn.task.bid;
                    apiParams["requestNext"] = Anti.earn.states.requestNewTasks;

                    Anti.api("captchas/save", $$$.getApiParams(apiParams), function(data){
                        Anti.earn.processor.captchasCommon.checkSaveResponse(data);
                    });
                    //setting taskId
                    Anti.earn.taskId = 0;


                } else {
                    Anti.earn.processor.pluginCaptchas.showGuesstextError();
                    return false;
                }
            },

            showGuesstextError: function() {
                $("#errorText").show().html('Select at least one cell');
            },
            hideGuesstextError: function() {
                $("#errorText").hide();
            },

            //called when worker types something in input
            clickEvent: function(cellNumber) {

                Anti.earn.processor.square.hideGuesstextError();
                Anti.earn.workflow.refreshLastAction();

                cellNumber = parseInt(cellNumber);
                cellObject = $("div[data-cellnumber='"+cellNumber+"']");

                var existed = false;

                for (i in Anti.earn.processor.square.selectedCells) {
                    if (Anti.earn.processor.square.selectedCells[i] == cellNumber) {
                        cellObject.removeClass('active');
                        existed = true;
                        Anti.earn.processor.square.selectedCells.splice(i, 1);
                    }
                }

                if (!existed) {
                    cellObject.addClass('active');
                    Anti.earn.processor.square.selectedCells.push(cellNumber);
                }

                Anti.earn.processor.square.selectedCells.sort();

            },

            validateEntry: function() {

                result = true;

                if (Anti.earn.processor.square.selectedCells.length == 0) return false;

                return result;
            }


        },

        moderation: {
            maxWaitTime: 60000,
            render(data){
                Anti.earn.interface.setJobNameLabel('Image Captcha Moderation');



                Anti.html(Anti.hb("earnFormModeration")(data), $("#workArea"));
                Anti.html(Anti.hb("earnForm0Captcha")(data), $("#form0CaptchaData"));

                Anti.earn.timers.maxWaitTime = Anti.earn.processor.moderation.maxWaitTime;
            },
            answer(type) {

                Anti.earn.interface.showLoaderMessage('Loading next task','');

                apiParams = $$$.workflow.getDefaultCaptchaRequestParams();
                apiParams["id"] = Anti.earn.taskId;
                apiParams["guesstext"] = type;
                apiParams["bid"] = Anti.earn.task.bid;
                apiParams["requestNext"] = Anti.earn.states.requestNewTasks;

                apiParamsCopy = deepObjectCopy($$$.getApiParams(apiParams));

                Anti.api("captchas/save", apiParamsCopy, function(data){
                    Anti.earn.processor.captchasCommon.checkSaveResponse(data);
                });
                //setting taskId
                Anti.earn.taskId = 0;
            }
        }

    },

    v3: {
        isTooltipOpened: false,
        hideTooltip: function() {
            $("#v3ToolTip").hide();
            $$$.v3.isTooltipOpened = false;
        },
        showTooltip: function(title) {
            if ($$$.v3.isTooltipOpened) {
                $$$.v3.hideTooltip();
                return;
            }
            $("#v3ToolTip").show();
            if (typeof title != "undefined") $("#v3TooltipTitle").html(title);
            $$$.v3.isTooltipOpened = true;
        },
        enableV3Only: function() {
            $("#solveV3Only").attr('checked', true);
            $$$.settings.highV3ScoreMode = 'v3only';
            Anti.debugstr('enabled v3 only mode');
        },
        enableV3AndV2: function() {
            $("#solveV3AndV2").attr('checked', true);
            $$$.settings.highV3ScoreMode = 'v3andv2';
            Anti.debugstr('enabled v3 and v2 mode');
        }
    },

    reportTelemetry: function(data) {
        Anti.api("tools/reportTelemetry", data);
    },

    navigateEvent: function() {
        console.warn('navigateEvent');
        if (!Anti.earn.settings.addRandomNavigation) {
            Anti.earn.interface.clearWorkArea("navigateEvent");
        }
    },

    focusEvent: function() {
        if (typeof Anti.earn.callbacks.focusEventCallback == "function") {
            Anti.earn.callbacks.focusEventCallback();
        }
    },

    blurEvent: function() {
        if (typeof Anti.earn.callbacks.blurEventCallback == "function") {
            Anti.earn.callbacks.blurEventCallback();
        }
    },

    createDebugTask: function() {
        return;
        Anti.earn.taskId = 12345;
        Anti.earn.timers.maxWaitTime = 600000;
        Anti.html(Anti.hb("earnFormPluginRecaptcha")({"id": 12345}), $("#workArea"));

        payLoad = {
            type: 'createTask',
            taskId: 12345,
            type_id: 10,
            website_url: "https://recaptcha-demo.appspot.com/recaptcha-v2-checkbox.php",
            website_captcha_key: "6LfW6wATAAAAAHLqO2pb8bDBahxlMxNdo9g947u9",
            website_stoken: "",
            proxy_task_on: false,
            open_target: 'iframe'
        };

        chrome.runtime.sendMessage('poaccciooiiejhnllapopnajlbnhdmen', payLoad, function(response){
            console.log(response)
        });
    }

};Anti.stats = {

    windowTitle: 'Your Stats',
    queueId: 0,

    init: function() {
        this.getPendingStats();
        Anti.api("captchas/getstats", { queueId: $$$.queueId } , function(data) {

            Anti.hideLoader();


            totvolume = 0;
            totearned = 0;
            totbonus = 0;
            totrefundamount = 0;
            totrefundcount  = 0;
            tableData = [];
            for (ind in data[0]["data"]) {
                i = data[0].data.length - ind - 1;
                earnrow = data[0]["data"][i];
                volrow = data[1]["data"][i];
                bonusrow = data[2]["data"][i];
                totearned += earnrow.y;
                totrefundamount += earnrow.refund_amount;
                totrefundcount  += earnrow.refund_count;
                totvolume += volrow.y;
                totbonus += bonusrow.y;
                tableData.push({
                    date: earnrow.name,
                    earned: earnrow.y,
                    volume: volrow.y,
                    bonus: bonusrow.y,
                    refund_amount: earnrow.refund_amount,
                    refund_count: earnrow.refund_count
                });
            }

            tableData.push({
                date: '<b>month total:</b>',
                earned: Math.round(totearned*1000)/1000,
                refund_amount: Math.round(totrefundamount*1000)/1000,
                refund_count: totrefundcount,
                volume: totvolume,
                bonus: Math.round(totbonus*10000)/10000
            });

            console.log(tableData);

            Anti.tableManager.init($("#statsTable"), tableData, "captchaStatsTablerow");

            Anti.tableManager.setOptions({
                enablePaging: false
            });

            Anti.tableManager.render();


            Anti.firstLoad(function() {
                settings = Anti.stats.chartSettings.mainChart;
                settings["colors"] = ['#38baea'];
                settings.series = new Array(data[0]);
                settings.title.text = '$ Earnings';
                $("#earnchart").highcharts(settings);
                settings["colors"] = ['#056205'];
                settings.series = new Array(data[1]);
                settings.title.text = 'Number of Solved Captchas';
                $("#volumechart").highcharts(settings);
                settings["colors"] = ['#2c93b9'];
                settings.series = new Array(data[2]);
                settings.title.text = '$ Rating Bonus';
                $("#bonuschart").highcharts(settings);
            });

        });
    },

    getPendingStats: function() {
        Anti.api("stats/getPendingStats", {}, function(stats) {
           if (stats == false) {
               $("#noPendingPayments").show();
               $("#moderationFunds").html('0');
           } else {
               $("#pendingStats").show();
               Anti.tableManager.init($("#pendingStatsTable"), stats, "captchaStatsTablerowPending");
               Anti.tableManager.render();
               total = 0;
               amount = 0;
               for (i in stats) {
                   total += parseFloat(stats[i].earned);
                   amount += parseInt(stats[i].volume);
               }
               $("#moderationFunds").html(Math.round(total*10000)/10000 + ', '+amount+' captchas');
           }

        });
    },

    setCaptchaType: function(_,queueId) {
        $$$.queueId = queueId;
        $$$.init();
    },


    getQueueNames: function(containerObject, dropdownManagerCallback) {
        Anti.api("stats/getUsedQueues", {}, function (data) {
            dropdownManagerCallback(containerObject, data);
        });
    },


    chartSettings : {
        mainChart: {
            chart: {

                type: 'area',
	        plotBorderWidth: 1,
	        plotBackgroundImage: null,
                backgroundColor: null
	    },
            xAxis: {
                title: {
                    text: false
                },
                labels: {
                    enabled: true,
                    rotation: 320
                },
                categories: [],
                min: 0,
                tickInterval: 1
            },
            yAxis: [{
                min: 0,
	        title: {
                    text: null
                }
	    }],
            title: {
                text: ''
            },
	    exporting: {
                enabled: false
            },
            subtitle: {
                text: null
            },
            legend: {
                enabled: false
            },
            tooltip: {
                //formatter: function() {}
            },
	    series: []
        }
    }

};Anti.systemstats = {

    windowTitle: 'System Stats',
    periodMode: 'day',
    queueId: 6,

    init: function() {
        this.periodMode = 'day';
        Anti.systemstats.load();
    },

    load: function() {
        Anti.api("captchas/systemstats", {
            period: $$$.periodMode,
            queueId: $$$.queueId
        } , Anti.systemstats.render);
    },

    render: function(data) {

        Anti.firstLoad(function() {
            Anti.hideLoader();
            settings = Anti.systemstats.chartSettings.mainChart;
            settings["colors"] = ['#38baea'];
            settings.series = new Array(data[0]);
            settings.title.text = 'Average Captcha Bid' + ($$$.periodMode == 'week' ? ': 7 days data' : ': 24h data');
            settings.tooltip.formatter = function () {
                return sprintf('<b>%s</b><br>Bid for captcha solvings: $%s per 1000 entries', this.point.name, this.y);
            };
            $("#bidchart").highcharts(settings);

            settings["colors"] = ['#056205'];
            settings.series = new Array(data[1]);
            settings.title.text = 'Employees Online Count' + ($$$.periodMode == 'week' ? ': 7 days data' : ': 24h data');
            settings.tooltip.formatter = function () {
                return '<b>' + this.point.name + '</b><br>Employees Online Count: <b>' + this.y + '%</b>';
            };
            $("#loadchart").highcharts(settings);


            settings["colors"] = ['#01284f'];
            settings.series = new Array(data[2]);
            settings.title.text = 'Average Captcha Workers Demand' + ($$$.periodMode == 'week' ? ': 7 days data' : ': 24h data');
            settings.tooltip.formatter = function () {
                return '<b>' + this.point.name + '</b><br>Average Workers Demand: <b>' + this.y + '%</b>';
            };
            $("#demandchart").highcharts(settings);

        });
    },

    setPeriod: function(_, value) {
        $$$.periodMode = value ? 'week' : 'day';
        Anti.systemstats.chartSettings.mainChart.xAxis.plotLines[0].value = (value ? 144 : 24);
        $$$.load();
    },

    setQueue: function(_,value) {
        $$$.queueId = parseInt(value);
        $$$.load();
    },

    switchMode: function(mode) {
        this.periodMode = mode;
        Anti.hideLoader();
        this.load();
    },

    chartSettings : {
        mainChart: {
            chart: {

                type: 'area',
	            plotBorderWidth: 1,
	            plotBackgroundImage: null,
                backgroundColor: null
	        },
            xAxis: {
                title: {
                    text: false
                },
                labels: {
                    enabled: false,
                    rotation: 300
                },
                categories: [],
                min: 0,
                tickInterval: 12,
                plotLines: [{
                    color: 'red',
                    width: 2,
                    value: 24,
                    dashStyle: 'longdashdot',
                    label: {
                        text: '24 hours ago',
                        rotation: 0,
                        x: 10,
                        y: 20,
                        align: 'left'
                    }
                }],
            },
            yAxis: [{
                min: 0,
	        title: {
                    text: null
                }
	    }],
            title: {
                text: ''
            },
	    exporting: {
                enabled: false
            },
            subtitle: {
                text: null
            },
            legend: {
                enabled: true
            },
            tooltip: {
                formatter: function() { return 'Bid per 1000 captcha entries: '+this.y; },
                useHTML: true
            },
	    series: []
        }
    }

};
Anti.errors = {

    money: 0,
    recpoints: 0,
    recCost: 0,
    windowTitle: 'Your Typing Errors',
    init: function() {
        Anti.errors.load();
    },

    load: function() {

        $("#nocontinue").hide();
        Anti.api("captchas/geterrors", { extended: 'true' }, function(data) {

            Anti.hideLoader();
            Anti.errors.money     = data.money;
            Anti.errors.recpoints = data.recpoints;
            Anti.errors.recCost   = data.recCost;
            $("#appealPointsValue").html(data.appeal_points);

            if (data.acc_errors == 0) {
                $("#errorschart").html('<div class="tac font20 padding20px" style="color: #2a5942">Good news, your mistype ratio is currently 0/1000. Nothing to worry about!</div>');
            }
            if (data.is_suspended) {
                $("#errorschart").html('<div class="padding20px tac error"><b>Access to image captchas banned</b>. Please mark your errors as viewed to continue.</div>');
            }
            if (data.acc_errors > 0) {
                $("#errorsdesc, #appealPoints").show();
            } else {
                $("#errorsdesc, #appealPoints").hide();
            }

            Anti.tableManager.init($("#errorsTable"), data.bad_captchas, "errorsTablerow");

            Anti.tableManager.setOptions({
                enablePaging: true,
                pageLimit: 20,
                verticalMargin: 410,
                rowHeight : 45,
                rowProcessFunction: function(row) {
                    row["recCost"] = data.recCost;
                    if (row.is_new == 1) $("#nocontinue").show();
                    return row;
                }
            });

            Anti.tableManager.render();
            Anti.hideLoader(true);

            if (data.month_captchas > 0) errRate = Math.round(data.acc_errors / data.month_captchas * 10000)/100;
            else errRate = 0;

            $("#errorsRatio").html(data.acc_errors+' errors / '+data.month_captchas+' ('+errRate+'%)');

        });
    },


    markReadDialog: function() {
        Anti.dialogsManager.init("caperrorsReadDialog", {});
    },

    markRead: function() {
        Anti.dialogsManager.close();
        Anti.api("captchas/readerrors", { } , Anti.errors.load);
    },

    removeForMoneyErrorDialog: function(errorId) {
        Anti.dialogsManager.init("caperrorsRemoveMoneyDialog", {errorId: errorId, money: Anti.errors.money});
    },

    removeForRecaptchaPointsErrorDialog: function(errorId) {
        Anti.dialogsManager.init("caperrorsRemoveRecpointsDialog", {errorId: errorId, recpoints: Anti.errors.recpoints, cost: Anti.errors.recCost});
    },

    removeErrorForRecaptchaPointsConfirm: function(errorId) {
        Anti.dialogsManager.close();
        setTimeout(function(){
            Anti.api("captchas/removeerror", { error_id: errorId, payment: "recaptchaPoints" } , Anti.errors.checkErrorRemoval);
        },500);
    },

    removeErrorForMoneyConfirm: function(errorId) {
        Anti.dialogsManager.close();
        setTimeout(function(){
            Anti.api("captchas/removeerror", { error_id: errorId, payment: "money" } , Anti.errors.checkErrorRemoval);
        },500);
    },

    checkErrorRemoval: function(data) {
        var status = data.status;
        switch (status) {

            case "recaptcha_points_low":
                Anti.dialogsManager.message("Not enough recaptcha points to remove error. You may earn them by working in our desktop application.");
            break;

            case 'low_balance':
                Anti.dialogsManager.message("Not enough money to remove error. Minimum balance: 0.1 USD.");
            break;

            case 'suspended':
                Anti.dialogsManager.message("Your account is suspended. It is not possible to remove error.");
            break;

            case 'success':
                Anti.dialogsManager.message("Error record has been removed.");
                Anti.errors.load();
            break;


            case 'not_found':
                Anti.dialogsManager.message("Error record not found.");
                Anti.errors.load();
            break;

        }
    },

    audioPlay: function(id) {
        $("#player"+id).on('timeupdate', function() {
            $('#seekbar'+id).attr("value", this.currentTime / this.duration);
        });
        document.getElementById('player'+id).play();
    },

    audioPause: function(id) {
        document.getElementById('player'+id).pause();
    },

    postAppeal(id) {
        Anti.showLoader();
        Anti.api("errors/postAppeal", {id}, (data) => {
            if (data.status === 'failed') {
                Anti.dialogsManager.message(data.message);
            }
            $$$.load();
        });
    },


};Anti.toplist = {

    windowTitle: 'Top 5K Workers List',

    init: function() {


        Anti.api("captchas/toplist", { }, function(data) {

            Anti.hideLoader();
            if (data.exist == false) $("#notoplistError").show(0);

            Anti.tableManager.init($("#toplistTable"), data.rows, "captchasToplistRow");

            Anti.tableManager.setOptions({
                enablePaging: false,
                rowProcessFunction: function(row) {
                    sum = row.recaptcha + row.image;
                    row["width"] = Math.round(row.recaptcha / sum * 100);
                    console.log('width', row["width"]);
                    return row;
                }
            });

            Anti.tableManager.render();
            Anti.hideLoader(true);

        });
    }



};Anti.app = {

    windowTitle: 'Application Download',
    init: function() {

        $(".lightboxOverlay:gt(0)").remove();
        $(".lightbox:gt(0)").remove();

        Anti.api("stats/getCaptchaMonthTotals", {}, function(data) {
            Anti.hideLoader();
            if (data.showApp) {
                Anti.switchPageSection("selection");
            } else {
                $$$.showWindowsApp();
            }
        });



    },

    showAndroidApp: function() {
        Anti.switchPageSection("android");
    },

    showWindowsApp: function() {
        Anti.switchPageSection("windows");
        setTimeout(function(){
            lightbox.option({
              'resizeDuration': 200,
              'wrapAround': true,
                'fadeDuration':200
            })
        },1000);
    },

    toggleFirewallInstructions: function() {
        $('#firewall').slideToggle(500);
    }

};Anti.ratingsinfo = {

    windowTitle: 'Captcha Ratings Information',
    level: 0,

    init: function() {

        Anti.ratingsinfo.level = 0;
        Anti.api("captchas/getrating", { }, function(data) {

            Anti.tableManager.init($("#ratingsTable"), data.info, "captchaRatingsRow");

            Anti.tableManager.setOptions({
                enablePaging: false,
                rowProcessFunction: function(row) {
                    row["mylevel"] = data.level;
                    row["nextlevel"] = data.nextlevel;
                    row["nextdif"] = data.nextdif;
                    row["level"] = Anti.ratingsinfo.level;
                    Anti.ratingsinfo.level++;
                    return row;
                }
            });

            Anti.tableManager.render();
            Anti.hideLoader(true);

        });

    }
};Anti.sleeping = {

    windowTitle: 'Account switched to sleep mode',
    init: function() {
        Anti.hideLoader();
    },

    awake: function() {
        Anti.api("captchas/nosleep", { } , function(data) {
            if (data.status == 'blocked') {
                Anti.dialogsManager.message(sprintf('You account is blocked for %s seconds',data.seconds));
            } else if (data.status == 'success') {
                Anti.navigate('earn');
            }
        });
    }


};
Anti.lazy = {

    showFirewallError: false,
    windowTitle: 'Too many captcha skips',
    init: function() {
        Anti.lazy.load();
    },

    load: function() {
        Anti.api("captchas/lazy", { } , Anti.lazy.render);
        Anti.api("captchas/lazytime", { } , Anti.lazy.renderMessage);
    },

    render: function(data) {
        Anti.lazy.showFirewallError = false;
        Anti.htmlRecords("captchaLazyRow", data, $("#capContainer"), function(row){
            if (typeof data[i].type != "undefined") {
                if (data[i].type == 'firewall') Anti.lazy.showFirewallError = true;
            }
            return row;
        });
        if (Anti.lazy.showFirewallError) {
            Anti.dialogsManager.message(Anti.hb("caplazyFirewallMessage")());
        }
        Anti.hideLoader();
    },

    renderMessage: function(data) {
        html = 'Unlock time: '+data.unblock_time+' GMT, '+data.left_time+' seconds left';
        $("#unlock_message").html(html);
    },

    gotoFirewallInstruction: function() {
        Anti.dialogsManager.close();
        Anti.navigate('info/app');
        setTimeout(function() {
            $('#firewall').slideToggle(500);
            $("html, body").animate({scrollTop: $("#firewall").position().top}, '200', 'swing');
        },500);
    }

};
Anti.history = {

    windowTitle: 'Withdrawals History',

    init: function() {
        Anti.history.load();
    },

    load: function() {
        Anti.api("finance/history", {  } , function(data){

            Anti.tableManager.init($("#historyTable"), data, "financeHistoryRow");

            Anti.tableManager.setOptions({
                pageLimit: 100,
                enablePaging: true
            });

            Anti.hideLoader();
            Anti.tableManager.render();

        });
    },

    toggleHelp: function() {
       $(".terms").hasClass("collapsed") ? $(".terms").removeClass("collapsed").addClass("active") : $(".terms").removeClass("active").addClass("collapsed");
    },


    go: function(path) {
        Anti.navigate(path);
    },

    cancelTransaction: function(id) {
        Anti.showLoader();
        Anti.api("finance/cancel", { id: id } , Anti.history.load);
    }

};Anti.withdraw = {

    windowTitle: 'Money Withdrawals',
    latestPurse: '',
    withdrawMethod: '',
    withdrawAmount: 0,
    withdrawRate: 0,
    withdrawRoundTo : 0,
    withdrawReqhint: '',
    withdrawCurrency : '',
    withdrawRequisites: '',
    withdrawMinamount: 0,
    hasCommission: false,
    ratingPerc: 0,
    requisiteCorrect: false,
    requisitesMessage: '',
    largestAmount: 0,
    recipientChecked: false,
    pinInstalled: false,
    amountSettingEnabled: true,
    systems: [],

    toggleHelp: function() {
        $(".terms").hasClass("collapsed") ? $(".terms").removeClass("collapsed").addClass("active") : $(".terms").removeClass("active").addClass("collapsed");
    },

    init: function() {
        $$$.withdrawRequisites = '';
        Anti.switchPageSection("list");
        this.load();
        $$$.cs.listOffers();
    },

    load: function() {
        Anti.api("finance/request", { action : 'info' } , function(data) {

            Anti.withdraw.systems = data.systems;
            Anti.withdraw.pinInstalled = data.pincode;
            Anti.tableManager.init($("#systemsTable"), data.systems, "financeWithdrawMethodRow");

            Anti.tableManager.setOptions({
                enablePaging: false,
                rowProcessFunction: function(row) {
                    row["balance"] = data.states.protected;
                    return row;
                }
            });

            if (data.banned == '1') {
                $(".banelement, #getMoneyButton").remove();
                Anti.withdraw.viewTable();
            }

            if (data.states.left_to_minimum > 0) {
                $("#accumulating_hint").html(sprintf("enter at least %s more captchas", data.states.left_to_minimum)).show(0);
                $("#onModerationState").addClass("disabled");
            } else {
                $("#accumulating_hint").hide(0);
                $("#onModerationState").removeClass("disabled");
            }

            Anti.tableManager.render();
            Anti.hideLoader(true);


            //money
            $("#protected_money").html(Math.round(data.states.protected * 10000) / 10000);
            $("#earning_money").html(Math.round(data.states.earning * 10000) / 10000);
            $("#pending_money").html(Math.round(data.states.pending * 10000) / 10000);
            Anti.withdraw.largestAmount = data.states.protected;
            Anti.withdraw.ratingPerc = data.rperc;
            if (data.states.protected > 500) {
                alert('Please DO NOT keep your funds on protected balance forever. We are not the bank. Safety of your funds is not guaranteed. Withdraw your funds as soon as possible or they will be lost.');
            }


            if (Anti.withdraw.ratingPerc > 0) {
                if (data.states.earning > 0) $("#earning_money_bonus").html('bonus ' + Math.round(data.states.earning * (Anti.withdraw.ratingPerc / 100) * 1000000) / 1000000);
                if (data.states.pending > 0) $("#pending_money_bonus").html('bonus ' + Math.round(data.states.pending * (Anti.withdraw.ratingPerc / 100) * 1000000) / 1000000);
            }



            if (data.exchange == "form-request" || data.exchange == "form-require") {
                Anti.switchPageSection("exchange");
                Anti.hideLoader();
                if (data.exchange == "form-require") {
                    $("#gotoTable").hide();
                    $("#formrequired").show();
                }
                return;
            }

            Anti.withdraw.viewTable();

            Anti.api("finance/request", { action : 'info', getList : 'true' });


        });

    },


    viewTable: function() {
        Anti.switchPageSection("list");
        if (Anti.withdraw.pinInstalled == false) {
            Anti.dialogsManager.message('Install PIN code first in your account settings<br><br><span class="dash-link" data-navigate="settings/account">account settings</span>');
            //Anti.withdraw.load();
            return false;
        }
        $("#table_section").fadeIn(500,function(){
            //$("html, body").animate({scrollTop: $("#table_section").position().top}, '1000', 'swing');
        });
    },

    cancelDialog: function() {
        Anti.dialogsManager.close();
        Anti.navigate("finance/withdraw");
    },

    selectMethod: function(sysname) {
        Anti.dialogsManager.init("financeWithdrawTermsDialog");
        Anti.withdraw.withdrawMethod = sysname;
        for (i in Anti.withdraw.systems) {
            if (Anti.withdraw.systems[i]["name"] == sysname) {
                Anti.withdraw.withdrawRate = Anti.withdraw.systems[i]["rate"];
                Anti.withdraw.withdrawRoundTo = Anti.withdraw.systems[i]["roundTo"];
                Anti.withdraw.withdrawCurrency = Anti.withdraw.systems[i]["currency"];
                Anti.withdraw.withdrawReqhint = Anti.withdraw.systems[i]["reqhint"];
                Anti.withdraw.withdrawMinamount = Anti.withdraw.systems[i]["min_amount"];
            }
        }
    },



    acceptWithdrawTerms: function() {


        Anti.dialogsManager.close();

        //blocks visibility defaults
        $("#requisitesBlock").show();
        $("#bitcoinNotification, #cardPayoutNotification, #internalNotification, #cryptoswappBlock").hide();

        var slider = $("#amountSlider");
        Anti.switchPageSection("requisites");
        var roundedValue = Math.floor(Anti.withdraw.largestAmount*100)/100;
        slider.attr('max-value', roundedValue);
        slider.attr('round-to', Anti.withdraw.withdrawRoundTo);
        slider.attr('min-value', Anti.withdraw.withdrawMinamount);
        $("#amountInput").val(Anti.withdraw.largestAmount);
        $("#amountInput").trigger("change");
        //Anti.slidersManager.setSliderValue($("#amountSlider"), Anti.withdraw.largestAmount);
        $("#recipient").attr("placeholder", Anti.withdraw.withdrawReqhint);

        if (Anti.withdraw.withdrawReqhint == 'not_required') {
            $("#requisitesBlock").hide();
        } else {
            $("#requisitesBlock").show();
        }

        //bitcoin info
        if (Anti.withdraw.withdrawMethod == 'Bitcoins') {
            //$("#bitcoinNotification").show();
        }
        //pasta info
        if (Anti.withdraw.withdrawMethod == 'Payout to VISA/Mastercard') {
            $("#cardPayoutNotification").show();
            $("#requisitesBlock").hide();
            $("#pastaRequisites").show();
        }
        //cryptoswapp integration
        if (Anti.withdraw.withdrawMethod == 'CryptoSwapp.com') {
            $$$.cs.start();
        }
        if (Anti.withdraw.withdrawMethod == 'Internal Transfer') {
            $("#internalNotification").show();
        }

    },

    setWithdrawAmount: function(_, value) {

        if (!$$$.amountSettingEnabled) {
            $("#amountBlock").hide();
            return;
        } else {
            $("#amountBlock").show();
        }

        roundto = Math.pow(10,Anti.withdraw.withdrawRoundTo);
        var converted = Math.round(value * Anti.withdraw.withdrawRate * roundto)/roundto;
        $("#currency_ammount").html('&nbsp;&nbsp;~'+converted+' '+Anti.withdraw.withdrawCurrency);
        if (value >= Anti.withdraw.withdrawMinamount) {
            $("#paymentButton").show(0);
            Anti.withdraw.withdrawAmount = value;
        } else {
            $("#paymentButton").hide(0);
        }



        if (Anti.withdraw.withdrawMethod == 'Payout to VISA/Mastercard') {
            msg = 'Commission %s USD, amount to receive %s USD';
            //REENABLE1MAY
            /*
            if (converted >= 50) {
                calculations = sprintf(msg, 0, converted);
            } else {
                calculations = sprintf(msg, Math.round(((converted * 0.03) + 1.7)*100)/100, Math.round( (converted - (converted * 0.03) - 1.7) * 100 ) / 100);
            }*/
            calculations = sprintf(msg, 0, converted);
            $("#cardCalculations").html(calculations);
            $$$.withdrawRequisites = '';
            $$$.checkRecipient('',$("#recipient").val())
        }

        if (Anti.withdraw.withdrawMethod == 'CryptoSwapp.com') {
            $$$.cs.estimate(value, $$$.withdrawRequisites)
        }

        console.log(Anti.withdraw.withdrawMethod, $$$.hasCommission);
        if (Anti.withdraw.withdrawMethod == 'Internal Transfer' || (Anti.withdraw.withdrawMethod == 'AdvCash' && $$$.hasCommission)) {
            commission = Math.round((converted * 0.05)*100)/100;
            amountMinusCommission = Math.round( (converted - commission) * 100 ) / 100;
            calculations = sprintf('Commission %s USD, amount to receive %s USD', commission, amountMinusCommission);
            $("#currency_ammount").html('&nbsp;&nbsp;~'+amountMinusCommission+' '+Anti.withdraw.withdrawCurrency);
            $("#internalCalculations").html(calculations);
        }


    },

    slideToExchangers: function() {
        $('html, body').animate({
            scrollTop: $("#csExchangersList").offset().top
        }, 500);
    },

    checkRecipient: function(_, recipient) {
        recipient = recipient.replace(/\s/g,'');
        $("#recipient").val(recipient);
        if (recipient == '') {
            Anti.debugstr('empty recipient set');
            return false;
        }
        if ($$$.withdrawRequisites == $("#recipient").val()) {
            Anti.debugstr('withdrawRequisites are same');
            return false;
        }
        if ($("#recipient").val() == '') {
            Anti.debugstr('empty recipient field');
            return false;
        }
        Anti.withdraw.withdrawRequisites = recipient;
        Anti.withdraw.recipientChecked = false;
        Anti.withdraw.requisiteCorrect = false;
        Anti.api("finance/request", {
                action : 'check',
                amount : Anti.withdraw.withdrawAmount,
                requisites: Anti.withdraw.withdrawRequisites,
                method: Anti.withdraw.withdrawMethod
            } , function(data) {
                $$$.hasCommission = data.hasCommission;
                if (data.status != 'ok') {
                    $("#nextbutton").css('opacity',0.5);
                    $$$.requisiteCorrect = false;
                    $$$.requisitesMessage = data.message;
                    if (data.message != '') {
                        $("#recipient_error").show().html(data.message);
                    }
                } else {
                    if (data.hasCommission) {
                        $("#internalNotification").show();
                        $$$.setWithdrawAmount("", $("#amountInput").val());
                    } else {
                        $("#internalNotification").hide();
                    }

                    $("#nextbutton").css('opacity',1);
                    $("#recipient_error").hide();
                    $$$.requisiteCorrect = true;
                    $$$.requisitesMessage = '';
                    if (Anti.withdraw.withdrawMethod == 'CryptoSwapp.com') {
                        $$$.cs.estimate($$$.withdrawAmount, $$$.withdrawRequisites)
                    }
                }
        });
    },

    confirmAmount: function() {
        Anti.withdraw.checkRecipient('',$("#recipient").val());
        if (Anti.withdraw.requisiteCorrect == false) {
            Anti.dialogsManager.message('Incorrect requisites: '+$$$.requisitesMessage);
            return false;
        }
        Anti.dialogsManager.init("financeWithdrawPincodeDialog", {
            confirmMessage: sprintf('Confirm sending %s USD to %s by %s', Anti.withdraw.withdrawAmount, Anti.withdraw.withdrawRequisites, Anti.withdraw.withdrawMethod)
        });
    },

    confirmFinal: function() {
        if ($("#pincode").val().length != 4) {
            Anti.dialogsManager.message('bad pin code');
            Anti.formsManager.resumeFormProcessing($("#confirmFinalForm"));
            return false;
        }
        Anti.api("finance/request", {
                action : 'request',
                amount : Anti.withdraw.withdrawAmount,
                requisites: Anti.withdraw.withdrawRequisites,
                method: Anti.withdraw.withdrawMethod,
                pincode: $("#pincode").val()
            } , function(data) {
                if (data.status == 'success') {
                    if (typeof data.action != "undefined") {
                        switch (data.action.userAction) {
                            case 'redirect':
                                document.location = data.action.url;
                                return;
                                break;
                        }
                    }
                    Anti.dialogsManager.message('Payout requested');
                }
                else {
                    Anti.formsManager.resumeFormProcessing($("#confirmFinalForm"));
                    Anti.dialogsManager.message('Payout request error: '+data.message);
                    return false;
                }
                Anti.navigate('finance/history');
        });
    },

    getCardsList: function(containerObject, dropdownManagerCallback) {
        Anti.api("finance/getCards", {}, function (data) {
            var options = [{value: '', caption:'Select card..'}];
            for (i in data) {
                options.push({
                    value: data[i].card,
                    caption: data[i].card+' ('+data[i].name+')'
                });
            }
            dropdownManagerCallback(containerObject, options);

        });
    },

    setPastaCard: function(_,value) {
        $$$.checkRecipient('',value);
    },

    cs: {
        shownExchangers: [],
        start: function() {
            $$$.amountSettingEnabled = false;
            $("#requisitesBlock, #paymentButton, #amountBlock").hide();
            $("#cryptoswappBlock, #csloader").show();
            Anti.api("finance/getCSPurses", {}, function(response) {
                $("#csloader, #paymentButton").hide();
                if (response.status == 'not_registered') {
                    //showing email form
                    $("#csemail").show();
                }
                if (response.status == 'registered') {
                    //showing purses list
                    $("#csSelect, #amountBlock, #paymentButton").show();
                    options = [{
                        'caption' : 'Select wallet..',
                        'value' : ''
                    }];
                    for (index in response.list[0]) {
                        options.push({
                            'caption'   :  index + ": " + response.list[0][index],
                            'value' : index + ":" + response.list[0][index]
                        });
                    }
                    Anti.dropdownManager.renderLoadedOptions($("#cspurse"), options);
                    $$$.amountSettingEnabled = true;
                    $("#amountInput").val(Anti.withdraw.largestAmount).trigger("change");
                }
            });
        },
        addEmail: function() {
            Anti.api("finance/setCSEmail", { email: $("#csemailvalue").val()}, function(response){
                if (response.status == 'failed') {
                    Anti.dialogsManager.message(response.message);
                }
                $$$.cs.start();
            });
            $("#csemail").hide();
            $("#csloader").show();
        },
        estimate: function(amount, wallet) {
            if (wallet == '') return;
            Anti.api("finance/calcCSAmount", {
                amount: amount,
                wallet: wallet
            }, function(response){
                $("#csestimation").html('You will receive ~%amount% %currency%'.replace('%amount%', response.value).replace('%currency%', wallet.substring(0,3)))
                                  .show();
            })
        },
        listOffers: function() {
            $$$.cs.shownExchangers = [];
            Anti.api("finance/searchCS", {}, function(response){

                for (i in response) {
                    row = response[i];
                    if ($$$.cs.shownExchangers.indexOf(row.user.username) == -1) {
                        row["showRow"] = true;
                        $$$.cs.shownExchangers.push(row.user.username);
                        //searching other records
                        hasOtherRecords = false;
                        moreCount = 0;
                        for (d in response) {
                            if (d > i) {
                                if (response[d].user.username == row.user.username) {
                                    hasOtherRecords = true;
                                    moreCount++;
                                }
                            }
                        }
                        row["showMore"] = hasOtherRecords;
                        row["moreCount"] = moreCount;

                        offerstring = '%OFFERTYPE% 1 %CRYPTOCURRENCY% for %AMOUNT% %CURRENCY%';
                        offerstring = offerstring.replace('%OFFERTYPE%', row.type == 'BUY' ? 'Buying' : 'Selling');
                        offerstring = offerstring.replace('%CRYPTOCURRENCY%', row.cryptocurrency);
                        offerstring = offerstring.replace('%AMOUNT%', row.current_price);
                        offerstring = offerstring.replace('%CURRENCY%', row.currency);
                        row["offerstring"] = offerstring;
                    }
                }

                Anti.tableManager.init($("#csExchangersList"), response, "financeWithdrawCSOfferRow");
                Anti.tableManager.render();
            });
        },
        showMore: function(username) {
            $(".username-"+username).show();
            $("#show-"+username).hide();
        },
        hideTutorial: function() {
            $(".tutorial").remove();
            Anti.api("finance/hideTutorial", {});
        }
    }


};
Anti.mycards = {

    windowTitle: 'Cards management',

    setParameters: function(parameters) {

        switch (parameters.first) {

            case 'success':
                Anti.setLocationParameters(['success']);
                Anti.switchPageSection("success");
                break;

            case 'failed':
                Anti.setLocationParameters(['failed']);
                Anti.switchPageSection("failed");
                break;

            default:
                break;

        }

    },

    backtoList: function() {
        Anti.setLocationParameters([]);
        $$$.init();
    },

    init: function() {
        Anti.switchPageSection('list');
        Anti.hideLoader();
        $$$.load();
    },

    load: function() {
        Anti.api("finance/getCards", {}, function(data){
            Anti.tableManager.init($("#cardsList"), data, "mycardTableRow");
            Anti.tableManager.render();
        });
    },

    addCard: function() {
        Anti.switchPageSection('addCard');
    },

    addCardConfirm: function() {
        Anti.showLoader(true);
        Anti.api("finance/addCard", {}, function(address){
            document.location = address;
        });
    }

};Anti.account = {

    windowTitle: 'Account Settings',
    pin : '',

    init: function() {
        Anti.account.load();
    },

    load: function() {
        Anti.api("settings/account", {action : 'get' } , function(data) {
            $("#accountlogin").html(data.login);
            $(".myemail").html(data.email);
            if (data.pin == true) {
                $("#setpin_already").show(0);
                $("#setpin_button").hide(0);
            } else {
                $("#setpin_already").hide(0);
                $("#setpin_button").show(0);
            }
            Anti.hideLoader();
        });
    },


    setPin: function() {
        Anti.dialogsManager.init("setPincodeStep1", {});
    },

    setPinConfirm: function() {
        pincode = $("#newpin").val();
        if (pincode.length != 4) {
            Anti.formsManager.showInputError($("#newpin"), "PIN must be 4 digits.");
            return false;
        }
        $$$.pin = pincode;
        Anti.api("settings/account", {
            action : 'setpin',
            pin: pincode
        } , function(data) {
            Anti.formsManager.resumeFormProcessing($("#pinSetForm"));
            if (data.error != '') {
                Anti.formsManager.showInputError($("#newpin"), data.error);
            } else {
                Anti.dialogsManager.close();
                if (data.result == 'goto_confirm') {
                    Anti.dialogsManager.init("emailConfirmationDialog", {});
                }
            }
        });
    },

    changePass: function() {
        Anti.dialogsManager.init("changePasswordStep1", {});
    },

    passwordResetAttempt: function() {
        oldpass  = $("#oldpass").val();
        newpass1 = $("#password_reset").val();
        newpass2 = $("#password_copy").val();
        Anti.entrance.scorePassword(newpass1);
        if (oldpass.length < 2) {
            Anti.formsManager.showInputError($("#oldpass"), "Old password required.");
            return false;
        }
        if (Anti.entrance.passwordStrength < 50) {
            $("#recoverMessage").html("Please use password with numbers and letters of both lower and upper case.");
            Anti.formsManager.showInputError($("#password_reset"), "Low password strength.");
            Anti.formsManager.showFormError($("#passwordResetAttempt"));
            return false;
        }
        if (newpass1 != newpass2) {
            Anti.formsManager.showInputError($("#password_copy"), "Passwords do not match.");
            return false;
        }

        Anti.api("settings/account", {
            action : 'changepass',
            old: oldpass,
            new1: newpass1,
            new2: newpass2
        } , Anti.account.changePassCheck);

        return true;
    },


    changePassCheck: function(data) {
        error = data.error;
        if (error != '') {
            if (error == 'old_pass_error') {
                Anti.formsManager.showInputError($("#oldpass"), "incorrect password");
            }
            if (error == 'new_pass_error') {
                Anti.formsManager.showInputError($("#password_copy"), "Passwords do not match");
            }
            Anti.formsManager.resumeFormProcessing($("#passwordResetAttempt"));
        } else {
            Anti.dialogsManager.close();
            if (data.result == 'goto_confirm') {
                Anti.dialogsManager.init("emailConfirmationDialog", {});
            }
            else Anti.dialogsManager.message('Unknown error occured while trying to change your password');
        }
    },

    completeConfirmation: function() {
        Anti.api("confirm", { action : 'check', code: $("#confirmationCode").val()} , function(data) {
            if (data.status == 'failed') {
                Anti.formsManager.showInputError($("#confirmationCode"), "Confirmation code not found");
                Anti.formsManager.resumeFormProcessing($("#confirmationForm"));
            }
            if (data.status == 'ok') {
                Anti.dialogsManager.close();
                if (data.message == 'Pin set successfully') {
                    Anti.dialogsManager.init("pincodeStepWarning",{pin: $$$.pin});
                    $$$.pin = '';
                } else {
                    Anti.dialogsManager.message(data.message);
                }
                Anti.account.load();
            }
        });
    }

};Anti.profile = {

    windowTitle: 'Profile Settings',
    languages: [],
    cutCoordidates: [],
    imgData: false,

    init: function() {
        Anti.api("settings/getLanguageList",{},function(data){
            Anti.profile.languages = data;
            Anti.profile.languages.unshift({value: 'not_set', caption: '...'});

            Anti.profile.loadSettings();
            Anti.switchPageSection("edit");

        });
    },

    loadSettings: function() {
        Anti.api("factory/getFactoryProfile",{}, function(data){

            $("#languagesContainer").html('');
            $(".profile-pic-value").hide();

            if (data.status == 'exists') {
                if (data.profile.userpic == '') {
                    $("#nouserpicBlock").show();
                } else {
                    $("#userpicBlock").show();
                    $("#userpicUrl").attr("src", data.profile.userpic);
                }
                for (counter = 0;counter<3;counter++) {

                    if (typeof data.profile.languages[counter] != "undefined") value = data.profile.languages[counter];
                    else value="not_set";

                    Anti.htmlAppend(Anti.hb("settingsProfileLanguageSelect")({
                        num: counter,
                        value: value,
                        options: Anti.profile.languages
                    }), $("#languagesContainer"));

                }

                $("#username").val(data.profile.username);
                $("#birthday").val(data.profile.birthday);
                Anti.settingsManager.setValue('gender', data.profile.gender);

            } else {
                $("#nofilledBlock").show();
                for (counter = 0;counter < 3;counter++) {
                    Anti.htmlAppend(Anti.hb("settingsProfileLanguageSelect")({
                        num: counter,
                        value: "not_set",
                        options: Anti.profile.languages
                    }), $("#languagesContainer"));
                }

            }


        });

        Anti.hideLoader();
    },

    saveSettings: function() {
        Anti.showLoader();
        Anti.api("factory/saveFactoryProfile", {
            language1: Anti.settingsManager.getValue('language0'),
            language2: Anti.settingsManager.getValue('language1'),
            language3: Anti.settingsManager.getValue('language2'),
            birthday: $("#birthday").val(),
            username: $("#username").val(),
            gender: Anti.settingsManager.getValue('gender')
        }, function(data){
            Anti.hideLoader();
            if (data.status != 'success') {
                Anti.dialogsManager.message('Something is wrong with your data. '+data.message);
            } else {
                Anti.switchPageSection("success");
            }
        });
    },

    selectPhoto: function() {
        Anti.switchPageSection("userpic");
        $$$.initUploadForm();
    },

    initUploadForm: function() {

        $("#uploadUserpic").show().unbind("change").bind("change", function(){

            var file = document.getElementById('uploadUserpic').files[0];

            $$$.previewFile(file);

        });
    },

    initCutter: function() {
        Anti.firstLoad(function(){
            $(".croppie").imgAreaSelect({
                handles: true,
                aspectRatio: "1:1",
                x1: 10,
                x2: 210,
                y1: 10,
                y2: 210,
                onSelectEnd: function(p1,p2){
                    $$$.cutCoordidates = p2;
                    $("#uploadButtonBlock, #uploadeButton").show();
                }
            });
        });

    },

    previewFile: function(file) {
        var viewwer     = new FileReader();
        viewwer.onload = function (event) {
            $("#pictureBlock").show();
            $(".croppie").attr("src", event.target.result);
            $$$.initCutter();
        };
        viewwer.readAsDataURL(file);
        var uploader = new FileReader();
        uploader.onload = function(event) {
            $$$.imgData = event.target.result;
        };
        uploader.readAsBinaryString(file);
    },

    uploadFile: function() {
        authData = Anti.getAuthData();
        if (typeof authData != "boolean") {
            dataset = {
                auth    :   authData,
                data    :   {
                    coordinates: $$$.cutCoordidates,
                    data: window.btoa($$$.imgData)
                }
            };
        }
        $$$.clearImageSelectArea();
        $("#pictureBlock, #uploadUserpic, #uploadeButton").fadeOut();
        $("#fileProgressbar").slideDown();

        $.ajax({
            url: '/api/settings/saveUserpic',
            type: 'POST',
            data: JSON.stringify(dataset),
            dataType:   'json',
            contentType: 'application/json; charset=utf-8',
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(event) {
                    if (event.lengthComputable) {
                        perc = Math.round(event.loaded / event.total * 100) + '%';
                        $("#fileProgressbarValue").css('width', perc);
                    }
               }, false);

               return xhr;
            },
            success :   function(result) {
                if (typeof result.response.status != "undefined") {
                    if (result.response.status == 'failed') {
                        Anti.dialogsManager.message(result.response.message);
                    }
                }
                Anti.hideLoader();
                $("#fileProgressbarValue").css('width', '100%');
                setTimeout(function () {
                    $("#fileProgressbar").slideUp(200, function(){
                        $("#fileProgressbarValue").css('width', '0%');
                    });
                    $$$.init();
                }, 500);
            }
        });
    },

    onBeforeNavigate: function() {
        $$$.clearImageSelectArea();
    },

    clearImageSelectArea: function() {
        $(".imgareaselect-selection").parent().hide();
        $(".imgareaselect-outer").hide();
    }


};Anti.referrals = {

    windowTitle: 'Referral Program',
    filterStatus: 'all',
    filterSorting: '',
    linkId: 0,

    init: function() {

        Anti.switchPageSection("main");
        Anti.html(Anti.hb("referralsTerms")(), $("#terms"));
        Anti.api("refs/getQuickStats", { } , Anti.referrals.updateStats);
        $$$.loadLinks();
        $$$.getMessage();
    },

    updateStats: function(data) {
        for (i in data) {
            $("#"+i).html(data[i]);
        }
    },

    loadLinks: function() {
        Anti.api("refs/listLinks", { } , function(data) {
            Anti.hideLoader();
            var tableObject = $("#refLinksTable");
            Anti.tableManager.init(tableObject, data, "referralsLinkTableRow");

            Anti.tableManager.setOptions({
                enablePaging: false
            });
            Anti.tableManager.render(tableObject);
        });
    },

    showPromoMaterials: function(link) {
        Anti.switchPageSection("promo");
        promo = [
            'https://files.anti-captcha.com/b7/5d2/c26/033533a6.png',
            'https://files.anti-captcha.com/d5/2be/93f/89295af3.png',
            'https://files.anti-captcha.com/cf/6c9/34a/7f351ab9.png',
            'https://files.anti-captcha.com/09/014/8aa/7241b67f.png',
            'https://files.anti-captcha.com/33/973/2cd/376e7f97.png',
            'https://files.anti-captcha.com/49/121/cff/ca7f09e9.png',
            'https://files.anti-captcha.com/50/174/595/f803e1ba.png',
            'https://files.anti-captcha.com/38/713/875/36258f87.png',
            'https://files.anti-captcha.com/13/cb4/ad7/63244090.png',
            'https://files.anti-captcha.com/bd/37d/ef3/8c8fe5ec.png',
            'https://files.anti-captcha.com/0e/057/2de/524d70d3.png',
            'https://files.anti-captcha.com/e5/261/680/e8d99e61.png'
        ];
        Anti.html(Anti.hb("referralsPromoMaterials")({promo:promo, link: link}), $("#promoSection"));
    },

    loadLinkStats: function(linkId) {
        $$$.linkId = linkId;
        Anti.api("refs/getLinkStats", { linkId: linkId } , Anti.referrals.showLinkStats);
        $$$.loadReferrers();
    },

    loadReferrers: function() {
        Anti.api("refs/listReferrals", {
            linkId: $$$.linkId,
            status: $$$.filterStatus,
            sorting: $$$.filterSorting
        } , Anti.referrals.renderReferalsTable);
    },

    renderReferalsTable: function(data) {
        Anti.tableManager.init($("#referersList"), data, "referralsListTableRow");
        Anti.tableManager.setOptions({
            pageLimit: 100,
            enablePaging: true
        });
        Anti.tableManager.render();
        $("#referralsTable").show();
    },

    setFilterStatus: function(_,value) {
        $$$.filterStatus = value;
        $$$.loadReferrers();
    },

    setFilterSorting: function(_,value) {
        $$$.filterSorting = value;
        $$$.loadReferrers();
    },

    showLinkStats: function(data) {
        $("#chartDiv").show(0,function(){
            $("html, body").animate({scrollTop: $("#chartDiv").position().top}, '500', 'swing');
        });
        settings = Anti.referrals.chartSettings;
        settings.xAxis.categories = data.categories;
        settings.title.text = 'Clicks and Registrations';
        settings.colors = ['#38baea','#01284f','#056205'];
        settings.series = [data.series[0],data.series[1]];
        $("#statsChart").highcharts(settings);
        settings.colors = ['#00663c'];
        settings.title.text = 'Payments';
        settings.series = [data.series[2]];
        $("#earningChart").highcharts(settings);

        if (data.activity[0].data.length > 0) {
            settings = Anti.referrals.pieSettings;
            settings.title.text = 'Referrals activity';
            settings.series = data.activity;
            $("#activeRefsChart").show().highcharts(settings);
            settings = Anti.referrals.pieSettings;
            settings.title.text = 'Statuses Spread';
            settings.series = data.statuses;
            $("#statusesChart").show().highcharts(settings);
        } else {
            $("#activeRefsChart").hide();
            $("#statusesChart").hide();
        }

    },

    createLinkDialog: function() {
        Anti.dialogsManager.init("referralsGeneratelinkDialog");
        Anti.html(Anti.hb("referralsTerms")(), $("#termsDialog"));
    },

    createLink: function() {
        Anti.showLoader();
        Anti.dialogsManager.close();
        Anti.api("refs/createLink", { } , Anti.referrals.loadLinks);
    },

    showTerms: function() {
        $(".terms").hasClass("collapsed") ? $(".terms").removeClass("collapsed").addClass("active") : $(".terms").removeClass("active").addClass("collapsed");
    },

    getMessage: function() {
        Anti.api("refs/getMyReferrerMessage", {}, function(data){
            $("#readsCounter").html(data.readsAmount);
            $("#refmessage").val(data.text);
        });
    },

    sendMessage: function() {
        Anti.api("refs/saveMyReferrerMessage", {
            message: $("#refmessage").val()
        }, function(data){
            if (data.status == 'failed') {
                Anti.dialogsManager.message(data.message);
            } else {
                Anti.dialogsManager.message('Message sent');
            }
        });
    },

    chartSettings : {
        colors: ['#38baea','#01284f','#056205'],
        chart: {

            type: 'area',
            plotBorderWidth: 1,
            plotBackgroundImage: null,
            backgroundColor: null
        },
        xAxis: {
            title: {
                text: false
            },
            labels: {
                enabled: true,
                rotation: 320
            },
            categories: [],
            min: 0,
            tickInterval: 1
        },
        yAxis: [{
            min: 0,
            title: {
                text: null
            }
        }],
        title: {
            text: 'Clicks and Registrations'
        },
        exporting: {
            enabled: false
        },
        subtitle: {
            text: null
        },
        legend: {
            enabled: true
        },
        tooltip: {
            shared: true,
            crosshairs: true
        },
        series: []
    },


    pieSettings: {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,//null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Referrals activity'
        },
        tooltip: {
            headerFormat: '',
            pointFormat: '{series.name}:<br>{point.name}: {point.y} (<b>{point.percentage:.1f}%</b>)'
        },
        legend: {
            enabled: true
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>'
                },
                showInLegend: true
            }
        },
        series: []
    },

};Anti.unban = {

    windowTitle: 'Unban accounts',

    init: function() {
        Anti.hideLoader();
        Anti.api("tools/getRecaptchaPoints", {}, function(points){
            $("#rpbalance").html(points);
        });
    },

    unbanMyself: function() {
        Anti.api("tools/unban", {target: 'self'}, Anti.unban.unbanResult);
    },

    unbanOthers: function() {
        Anti.api("tools/unban", {target: $("#targetEmail").val()}, Anti.unban.unbanResult);
    },

    unbanResult: function(data) {
        if (data.status == 'failed') {
            Anti.dialogsManager.message(data.message);
        }
        if (data.status == 'success') {
            Anti.dialogsManager.message('Account successfully unbanned');
            Anti.unban.init();
        }
    }

};Anti.faq = {

    windowTitle: 'FAQ',

    init: function() {
        Anti.api("faq", { action: 'list'}, function(data){
            Anti.htmlRecords("faqRecord", data, $("#faqRecords"));
            Anti.hideLoader();
        });
    }

};Anti.story = {

    windowTitle: 'Kolo Stories',

    imageCategories: [],
    fileId: 0,
    selectedTitle: '',
    saveAllowed: false,
    textEditTimer: 0,
    inviteStatus: '',
    country: '',

    init: function() {
        this.checkStatus();
    },

    readMore: function() {
        $("#hiddenList").slideDown();
        $("#readMore").hide();
    },

    acceptInvite: function() {
        Anti.showLoader();
        if (Anti.earn.inviteStatus == 'invited' || Anti.earn.inviteStatus == 'denied' || Anti.earn.inviteStatus == 'viewed') {
            Anti.api("stories/acceptInvite", {}, Anti.story.startEditing);
        } else {
            Anti.story.startEditing();
        }

    },

    startEditing: function() {
        Anti.switchPageSection('edit');
        Anti.story.loadImages();
        Anti.story.loadText();
        $("#storyText").bind("change", Anti.story.sendStoryData);
        $("#storyText").bind("keyup", Anti.story.textEditEvent);
        $("#authorName").bind("keyup change", Anti.story.textEditEvent);
    },

    checkStatus: function() {
        Anti.api("stories/getStatus", {}, function(data) {
            Anti.hideLoader();
            Anti.earn.inviteStatus = data.status;
            switch (data.status) {
                default:
                case 'not-exists':
                    Anti.switchPageSection("notexist");
                    break;

                case 'invited':
                case 'accepted':
                case 'working':
                case 'viewed':
                    Anti.switchPageSection('invite');
                    break;

                case 'on-moderation':
                    Anti.switchPageSection('success');
                    break;

                case 'denied':
                    Anti.switchPageSection('denied');
                    $("#reason").html(data.reason);
                    break;

                case 'moderated':
                    Anti.switchPageSection('moderated');
                    $("#publishDate").html(data.publishDate);
                    break;

                case 'published':
                    Anti.switchPageSection('published');
                    $("#publishLink").html(data.link);
                    $("#publishDate2").html(data.publishDate);
                    break;
            }
        });
    },

    loadText: function() {
        Anti.api("stories/getText", {}, function(data) {
            $("#authorName").val(data.name);
            $("#storyText").val(data.story);
            if (data.country_code != '') {
                Anti.story.country = data.country_code;
                Anti.settingsManager.setValue('countryName',data.country_code);
            }
        });
    },


    loadImages: function() {

        //loading titles first
        Anti.api("stories/getTitles", {}, function(data) {
            $$$.imageCategories = data;

            Anti.api("stories/getImages", {}, function (data) {
                Anti.hideLoader();

                $$$.saveAllowed = true;
                $(".story-desc").html('');

                for (t in $$$.imageCategories) {
                    category = $$$.imageCategories[t];
                    placeHolder = $(".card-upload[data-title='"+category.title+"'] > .upload-slots");
                    placeHolder.html('');

                    for (i in data) {
                        picture = data[i];
                        if (picture.title == category.title) {

                            if ($$$.imageCategories[t].title == category.title) {
                                $$$.imageCategories[t].minimumCount--;
                                $$$.imageCategories[t].maximumCount--;

                            }
                            //adding existing image
                            Anti.htmlAppend(Anti.hb("storySavedImage")(picture), placeHolder);

                        }
                    }

                    if ($$$.imageCategories[t].maximumCount > 0) {
                        titleId = category.title.replace(' ', '');

                        //adding "add photo" button
                        Anti.htmlAppend(Anti.hb("storyAddImage")({
                            titleId: titleId,
                            required: $$$.imageCategories[t].minimumCount > 0
                        }), placeHolder);
                        Anti.htmlAppend(Anti.hb("storyUploadingProgress")({titleId: titleId}), placeHolder);

                        Anti.fileUpload.init({
                            name: titleId,
                            title: category.title,
                            previewObject: $("#uploadSlot" + titleId),
                            hasProgressBar: true,
                            apiMethod: 'stories/savefile',
                            apiParameters: {
                                name: name,
                                title: category.title
                            },
                            onStart: function () {
                                $("#addImage" + this.name).hide();
                                $("#uploadSlot" + this.name).parent().show();
                                $(".photo-description").remove();
                                Anti.html(Anti.hb("storyAddDescription")({
                                    titleId: this.name,
                                    title: this.title
                                }), $(".card-upload[data-title='" + this.title + "'] > .story-desc"));
                            },
                            onComplete: function (data) {
                                //$$$.loadImages();
                                $$$.fileId = data.fileId;
                                $("#saveButton" + this.name).fadeIn(500);
                            }
                        });

                    }

                    //adding requirements
                    var requirements = [];
                    if ($$$.imageCategories[t].minimumCount > 0) requirements.push(sprintf('You must add %s more pictures', $$$.imageCategories[t].minimumCount));
                    if ($$$.imageCategories[t].maximumCount > 0) requirements.push(sprintf('You can add up to %s more pictures', $$$.imageCategories[t].maximumCount));

                    if (requirements.length > 0) {
                        $(".card-upload[data-title='"+category.title+"'] > .desc > .picture-requirements").html(requirements.join('<br>'));
                    }

                }

                for (t in $$$.imageCategories) {
                    if ($$$.imageCategories[t].minimumCount > 0) {
                        $$$.saveAllowed = false;
                    }
                }

                if ($$$.saveAllowed) {
                    $("#submitStoryButton").removeClass('btn-disabled');
                } else {
                    $("#submitStoryButton").addClass('btn-disabled');
                }


            });
        });

    },

    sendStoryData: function() {
        $("#infoSaveLabel").css('opacity','1');
        Anti.api("stories/saveText", {
            name: $("#authorName").val(),
            story: $("#storyText").val(),
            country: Anti.story.country
        }, function(data){
            $("#infoSaveLabel").css('opacity','0');
        });
    },

    textEditEvent: function() {
        clearInterval(Anti.story.textEditTimer);
        Anti.story.textEditTimer = setTimeout(Anti.story.sendStoryData,2000);
    },

    addImageDialog: function(title) {
        Anti.story.fileId = 0;

        placeHolder = $(".upload-slots[data-title='"+title+"']");
        Anti.htmlAppend(Anti.hb("storyUploadingProgress")({}), placeHolder);


    },

    savePhoto: function() {
        var descriptioObject = $(".photo-description");
        var description = descriptioObject.val();
        if (Anti.story.fileId == 0) {
            Anti.dialogsManager.message("You need to upload a photo");
            return false;
        }
        if (description.length < 5) {
            Anti.dialogsManager.message("Please enter photo description");
            return false;
        }
        Anti.api("stories/saveImage", { fileId: Anti.story.fileId, description: description }, function(data) {
            Anti.story.loadImages();
        });
        Anti.dialogsManager.close();
        return false;
    },

    checkUploadingFile: function (files) {
        var _URL = window.URL || window.webkitURL;
        var img = new Image();

        img.onload = function () {
            var width = this.width,
                height = this.height,
                imgsrc = this.src;

            if (width < 800 || height < 800) {
                alert(sprintf('Minimum image size is 800x800 pixels, yours are %sx%s', width, height));
            } else {
                Anti.story.uploadFile(files);
            }

        };
        img.src = _URL.createObjectURL(files);
    },

    uploadFile: function(file) {
        //var file = document.getElementById('uploadFile').files[0];
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = Anti.story.uploadFileStart;
        reader.onloadend = Anti.story.uploadFileFinish;
        reader.onprogress = function(event) {
            if (event.lengthComputable) {
                perc = Math.round(event.loaded / event.total * 100);
                if (perc == 100) perc = 'syncing..';
                else perc = perc + '%';
                $("#uploadFileProgress").show(0).html(perc);
            }
        };
    },

    uploadFileStart : function(event) {
        Anti.showLoader();
        var data = event.target.result;
        Anti.api("stories/savefile", {
            data: window.btoa(data),
            title: Anti.story.selectedTitle
        }, Anti.story.uploadFileFinish);
    },

    uploadFileFinish : function(data) {
        Anti.story.fileId = data.fileId;
        Anti.hideLoader(true);
        $("#uploadFileProgress").html('<div><img src="'+data.url+'" width="200" alt="loading"></div>');
    },

    removeImageDialog: function(imageId) {
        Anti.story.fileId = imageId;
        Anti.dialogsManager.init("storyRemoveImageDialog", { imageId: imageId });
    },
    removeImage: function() {
        Anti.api("stories/removeImage", { fileId: Anti.story.fileId }, Anti.story.loadImages);
        Anti.dialogsManager.close();
    },

    editImageDialog: function(imageId) {
        Anti.showLoader();
        Anti.api("stories/getImage", {fileId: imageId}, function(data){
            Anti.hideLoader(true);
            if (data != false) {
                Anti.story.fileId = data.id;
                Anti.dialogsManager.init("storyEditImageDialog", data);
            }
        });
    },

    submitStory: function() {
        if (!$("#termsCheckbox").prop("checked")) {
            Anti.dialogsManager.message('You must agree with copyright terms.');
            return false;
        }
        if (Anti.story.saveAllowed == false) {
            Anti.dialogsManager.message('You must add more photos for each category. Check category with "required" button.');
            return false;
        }
        if ($("#authorName").val().length < 2) {
            Anti.dialogsManager.message('Please enter your name.');
            return false;
        }
        if ($("#storyText").val().length < 30) {
            Anti.dialogsManager.message('Please enter more text about your work in Kolotibablo. Describe how you benefit from it, how it helps you in your daily life, etc.');
            return false;
        }
        Anti.showLoader();
        Anti.api("stories/sendToModeration", {}, function(data) {
            Anti.hideLoader();
            if (data.status == 'success') {
                Anti.switchPageSection("success");
            } else {
                Anti.dialogsManager.message(data.reason);
            }
        });

    },

    getCountries: function(containerObject, dropdownManagerCallback) {
        Anti.api("stories/getCountries", {}, function(data) {
            var options = [];
            for (i in data) {
                options.push({
                    value: data[i].code,
                    caption: data[i].name
                });
            }
            dropdownManagerCallback(containerObject, options);

        });
    },
    setCountry: function(_,countryName) {
        Anti.story.country = countryName;
        Anti.story.textEditEvent();
    },

    termsCheckbox: function() {
        if (!$("#termsCheckbox").prop("checked")) {
            $("#submitStoryButton").removeClass("btn-disabled");
        } else {
            $("#submitStoryButton").addClass("btn-disabled");
        }
    }


};Anti.cert = {

    windowTitle: 'Certificate Instructions',
    imageIndex: 0,
    totalImages: 6,
    margin: 0,

    init: function () {
        Anti.hideLoader();

        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
             $("#firefoxTutorial").show();
        } else {
            $(".chromeTutorial").show();
        }
        //if(/chrom(e|ium)/.test(navigator.userAgent.toLowerCase())){}

        var screens = [
            {
                url: '/images/certificateInstructions/1.png',
                description: 'Open certificate and press Install'
            },{
                url: '/images/certificateInstructions/2.png',
                description: 'Select certificate storage'
            },{
                url: '/images/certificateInstructions/3.png',
                description: '<font color=red><b>Important!</b></font> Select certificate storage "Trusted Root Certificate Authorities"'
            },{
                url: '/images/certificateInstructions/4.png',
                description: 'Press Next button'
            },{
                url: '/images/certificateInstructions/5.png',
                description: 'Finish the installation'
            },{
                url: '/images/certificateInstructions/6.png',
                description: 'Finish the installation. You may need to reboot your computer.'
            },{
                url: '/images/certificateInstructions/certgnore.png',
                description: "If you don't want to mess with certificate installation, then just add command --ignore-certificate-errors to Chrome desktop shortcut"
            }
        ];

        Anti.htmlRecords("certScreenSlide", screens, $(".slides"));

    },

    slideLeft: function () {
        if (Anti.cert.imageIndex <= 0) return;
        $('.story-gallery .slides').css('transform', 'translateX('+(Anti.cert.margin+=100)+'%)');
        Anti.cert.imageIndex--;
    },

    slideRight: function () {
        if (Anti.cert.imageIndex >= (Anti.cert.totalImages-1)) return;
        $('.story-gallery .slides').css('transform', 'translateX('+(Anti.cert.margin-=100)+'%)');
        Anti.cert.imageIndex++;
    }

};Anti.plugin = {

    windowTitle: 'Plugin installation',
    imageIndex: 0,
    margin: 0,
    screens: [],

    init: function () {
        Anti.hideLoader();
        $(".selection").hide();
        $("#startSelection").show();
        $("#backButton").hide();
    },

    startGallery: function() {
        $(".story-gallery").show();
        Anti.htmlRecords("certScreenSlide", $$$.screens, $(".slides"));
    },

    selectWinFirefox: function() {
        $(".selection").hide();
        $("#firefoxWinDownload").show();
        $("#backButton").show();
    },

    selectWinChrome: function() {
        $(".selection").hide();
        $("#chromeWinDownload").show();
        $("#backButton").show();
    },

    selectAndroidFirefox: function() {
        $(".selection").hide();
        $$$.screens = [
            {
                url: '/images/pluginInstructions/android_firefox/image4.jpg',
                description: 'Click download and allow extension to install '
            },{
                url: '/images/pluginInstructions/android_firefox/image8.jpg',
                description: 'Click "add" button'
            },{
                url: '/images/pluginInstructions/android_firefox/image9.jpg',
                description: 'Check on start page that plugin is installed'
            }
        ];
        $$$.startGallery();
        $("#firefoxAndroidDownload").show();
    },

    selectAndroid: function() {

        $(".selection").hide();
        $("#androidDownload").show();
        $("#backButton").show();
    },


    selectMicrosoft: function() {

        $(".selection").hide();
        $("#windowsDownload").show();
        $("#backButton").show();
    },

    selectLinux: function() {
        $(".selection").hide();
        $("#linuxDownload").show();
        $("#backButton").show();
        $$$.screens = [
            {
                url: '/images/pluginInstructions/1.jpg',
                description: 'Open extensions settings page chrome://extensions/'
            },{
                url: '/images/pluginInstructions/2.jpg',
                description: 'Drag downloaded extension file to settings page'
            },{
                url: '/images/pluginInstructions/3.jpg',
                description: 'Confirm adding extension'
            },{
                url: '/images/pluginInstructions/4.jpg',
                description: 'Extension is now installed. Please note that Chrome removes extension each time you close the browser. To avoid that, install Chromium, it does not remove extensions. <a href=https://github.com/henrypp/chromium/releases/download/v49.0.2623.112-r403382-win32/chromium_sync.exe>Download</a>.'
            }
        ];
        $$$.startGallery();
    },

    slideLeft: function () {
        if (Anti.plugin.imageIndex <= 0) return;
        $('.story-gallery .slides').css('transform', 'translateX('+(Anti.plugin.margin+=100)+'%)');
        Anti.plugin.imageIndex--;
    },

    slideRight: function () {
        if (Anti.plugin.imageIndex >= ($$$.screens.length-1)) return;
        $('.story-gallery .slides').css('transform', 'translateX('+(Anti.plugin.margin-=100)+'%)');
        Anti.plugin.imageIndex++;
    }

};Anti.priority = {

    windowTitle: 'Captcha Priority Information',

    init: function() {
        Anti.api("stats/priority", {}, function(data) {
            Anti.tableManager.init($("#priorityInfo"), data.table, "spPriorityInfoTableRow");
            Anti.tableManager.render();
            Anti.hideLoader();
        });
    }

};Anti.recaptchaupdates = {

    windowTitle: 'Recaptcha News',

    init: function() {

        Anti.api("tools/getRecaptchaInstructions",{},function(data){
            Anti.html(Anti.hb("recaptchaupdatecontent")(data), $("#rescontent"));
            Anti.hideLoader();
        });

        Anti.api("tools/getIpInfo", {}, function(data) {
            Anti.tableManager.init($("#ipInfoTable"), data, "recaptchaupdateIpInfo");
            Anti.tableManager.render();
            var s=document.createElement('script');
            s.type='text/javascript';
            s.charset='UTF-8';
            s.src=((location && location.href && location.href.indexOf('https') == 0)?'https://ssl.microsofttranslator.com':'http://www.microsofttranslator.com')+'/ajax/v3/WidgetV3.ashx?siteData=ueOIGRSKkd965FeEGM5JtQ**&ctf=False&ui=true&settings=Manual&from=';
            var p=document.getElementById('rescontent')||document.documentElement;p.insertBefore(s,p.firstChild);
        });

        Anti.api("stats/getRecaptchaSpeedByVersion", {}, function(data){
            if (data != false) {
                $("#recaptchaSpeedsHeader, #recaptchaSpeeds").show();
                Anti.htmlRecords("recaptchaUpdateVersions", data, $("#recaptchaSpeeds"), function(row){
                    if (row.version.indexOf('Android') == -1 && row.version.indexOf('Windows') == -1) {
                        row.version = 'Plugin '+row.version;
                    }
                    row.avgtime = Math.floor(row.avgtime);
                    return row;
                });
            }
        });

    },

};Anti.pump = {

    windowTitle: 'Gmail pump',
    pumpAccess: -1,
    accounts: [],
    taskId: 0,

    init: function() {
        if ($$$.pumpAccess == -1) {
            Anti.api("captchas/getRecaptchaAccess", {}, function(data) {
                $$$.pumpAccess = data.pumpAccess;
                if (!data.pumpAccess) {
                    Anti.dialogsManager.showInfoBlock("info", "Access denied", 'Minimum 500 Recaptcha Points are required too access this section.', false);
                } else {
                    $("#topHelper").show();
                    $$$.init();
                    if (!data.pumpIntroSeen) {
                        Anti.history.toggleHelp();
                        Anti.api("settings/saveSetting", {name: 'pumpIntroSeen', value: true});
                    }
                }
            });
            Anti.hideLoader();
            return;
        }

        Anti.switchPageSection("list");
        Anti.showLoader();
        Anti.api("pump/getGmailAccounts", {}, function(data){
            $$$.accounts = data;
            Anti.tableManager.init($("#accountsList"), data, "pumpAccountRow");
            Anti.tableManager.setOptions({
                enablePaging: true,
                pageLimit: 100
            });
            Anti.tableManager.render();
            Anti.hideLoader();
        });
    },

    editAccountDialog: function(id) {
        Anti.switchPageSection("edit");
        if (id == 0) {
            Anti.html(Anti.hb("pumpGMailRecordEdit")({action: 'addAccount', id:'0'}), $("#editContainer"))
        } else {
            for (i in $$$.accounts) {
                if ($$$.accounts[i].id == id) {
                    data = deepObjectCopy($$$.accounts[i]);
                    data["action"] = "updateAccount";
                    Anti.html(Anti.hb("pumpGMailRecordEdit")(data), $("#editContainer"))
                }
            }
        }
    },

    validateAccount: function() {
        if ($("#name").val().length < 3) {
            Anti.formsManager.showInputError($("#name"),"Field can\'t be empty");
            return false;
        }
        if ($("#login").val().length < 5) {
            Anti.formsManager.showInputError($("#login"),"Field can\'t be empty");
            return false;
        }
        if ($("#login").val().indexOf('@') != -1) {
            Anti.formsManager.showInputError($("#login"),"Don\'t put full email here, only part before @");
            return false;
        }
        return true;
    },

    addAccount: function() {
        if (!$$$.validateAccount()) return false;
        Anti.api("pump/addGmailAccount",{
            login: $("#login").val(),
            password: $("#password").val(),
            name: $("#name").val(),
            language_code: Anti.settingsManager.getValue('language_code')
        },function(response){
            if (response.status != 'success') {
                Anti.dialogsManager.message(response.message);
            } else {
                $$$.init();
            }
            Anti.formsManager.resumeFormProcessing($("#saveForm"));
        });
    },

    updateAccount: function(id) {
        if (!$$$.validateAccount()) return false;
        Anti.api("pump/updateGmailAccount",{
            id: id,
            login: $("#login").val(),
            password: $("#password").val(),
            name: $("#name").val(),
            language_code: Anti.settingsManager.getValue('language_code')
        },function(){
            Anti.formsManager.resumeFormProcessing($("#saveForm"));
            $$$.init();
        });
    },

    removeAccount: function(id) {
        Anti.dialogsManager.init("pumpAccountRemoveDialog", {id: id});
    },

    removeAccountConfirm: function(id) {
        Anti.api("pump/removeGmailAccount", {id: id}, $$$.init);
        Anti.dialogsManager.close();
    },

    startTask: function(id) {
        Anti.showLoader();
        Anti.switchPageSection("edit");
        Anti.api("pump/getGmailTask", {id: id}, function(data) {
            Anti.hideLoader();
            if (data.status == 'failed') {
                Anti.dialogsManager.message('Task not found');
            } else {
                $$$.taskId = id;
                template = '';
                switch (data.type) {
                    case 'email':
                        template = 'pumpGMailOutgoingEmailTaskView';
                        break;

                    case 'email-incoming':
                        template = 'pumpGMailIncomingEmailTaskView';
                        break;

                    case 'search':
                        template = 'pumpGMailSearchTaskView';
                        break;

                    case 'youtube':
                        template = 'pumpGMailYoutubeTaskView';
                        break;

                }
                Anti.html(Anti.hb(template)(data), $("#editContainer"))
                Anti.api("pump/markTaskAsViewed", {id: id});
            }
        });
    },

    confirmTaskSend: function(id) {
        Anti.api("pump/confirmGmailTask", {id: id}, $$$.init);
        return false;
    },

    confirmEmailReceived: function(id) {
        Anti.api("pump/confirmGmailTask", {id: id, result: 'found'}, $$$.init);
    },

    confirmEmailNotReceived: function(id) {
        Anti.api("pump/confirmGmailTask", {id: id, result: 'notFound'}, $$$.init);
    }

};Anti.referrermessage = {

    windowTitle: 'Message from Referrer',

    init: function() {
        Anti.api("refs/getMessageFromReferrer",{}, function(data){
            $("#date").html(data.date);
            $("#message").html(data.message.split("\n").join("<br>"));
            Anti.hideLoader();
        });
    }

};Anti.reftop = {

    windowTitle: 'Top100 Referrers',

    init: function() {

        Anti.api("refs/getReferralToplist", {}, function(data){
            Anti.tableManager.init($("#reftop"), data.list, "referralsToplistRow");
            Anti.tableManager.render();
            Anti.hideLoader();
            $("#toplistName").val(data.myname);
        });

        Anti.api("refs/getQuickStats", {}, function(data){
            if (data.monthlyEarnings == 0) {
                $("#notEarning").show();
            }
        });

    },

    go: function() {
        Anti.navigate("tools/referrals");
    },

    saveName: function() {
        Anti.api("refs/saveName", {name: $("#toplistName").val()}, function() {
            Anti.reftop.init();
            $("#topListBlock").html('Name saved');
        });
    }

};Anti.fingerprint = {

    windowTitle: 'Fingerprint detector',

    init: function() {
        Fingerprint2.get({excludes: {
            canvas: true,
            webgl: true
        }}, function (components) {

            value = Fingerprint2.x64hash128(components.map(function (pair) {
                    return pair.value
                }).join(), 31);

            $("#fingerprint").html(value);

            Anti.hideLoader();
        });
    }

};Anti.retest = {

    windowTitle: 'KB Earn',

    init: function() {
        Anti.hideLoader();
        $$$.createTask();
    },

    createTask: function() {
        payLoad = {
        type: 'createTask',
        taskId: 12345,
        type_id: 10,
        website_url: "https://recaptcha-demo.appspot.com/recaptcha-v2-checkbox.php",
        website_captcha_key: "6LfW6wATAAAAAHLqO2pb8bDBahxlMxNdo9g947u9",
        website_stoken: "",
        proxy_task_on: false,
        open_target: 'iframe'
    };

    setTimeout(function(){

    chrome.runtime.sendMessage('poaccciooiiejhnllapopnajlbnhdmen', payLoad, function(response){
        console.log(response)
    });

    },5000);

    }

};Anti.cryptoswapp = {

    windowTitle: 'What is CryptoSwapp?',

    init: function() {
        Anti.api("finance/request", { action : 'info' } , function(data) {
            Anti.hideLoader();
            switch (data.lang_code) {
                case 'es':
                    $("#tutorial_src").attr("src", "https://www.youtube.com/embed/6wrAo8nONPE");
                    break;

                default:
                case 'en':
                    $("#tutorial_src").attr("src", "https://www.youtube.com/embed/qPgk5cgj4Wc");
                    break;
            }
        });
    },

    withdraw: function() {
        Anti.navigate('finance/withdraw');
        Anti.withdraw.selectMethod('CryptoSwapp.com');
    }

};Anti.applyexchanger = {

    windowTitle: 'Apply for trader listing',

    init: function() {
        Anti.hideLoader();
        Anti.switchPageSection("form");
    },

    sendForm: function() {

        if ($("#nickname").val().length < 2) {
            Anti.formsManager.showInputError($("#nickname"), "Specify correct nickname");
            Anti.formsManager.resumeFormProcessing($("#confirmFinalForm"));
            return;
        }

        Anti.api("finance/applyForCSExchanger", {
            'nickname' : $("#nickname").val(),
            'otherp2p' : $("#otherp2p").val(),
            'comment' : $("#comment").val(),
        }, function(response) {
            if (response.status == 'failed') {
                Anti.dialogsManager.message(response.message);
                Anti.formsManager.resumeFormProcessing($("#confirmFinalForm"));
            } else {
                Anti.switchPageSection("sent");
            }

        })

    }

};
    
    
    Anti.getAuthData = function() {
        if (authCookie == '') return false;
        var salt        =   "flkj40fjdfjknfkhg5kgbdgkfkjghff4DJWHFRg4f";
        var randId      =   Math.round(Math.random()*1000000);
        if (Anti.authCookieValue != '') {
            var authCookie = Anti.authCookieValue;
        } else {
            var authCookie = $.cookie(Anti.authCookie);
        }
        var sign        =   CryptoJS.MD5(randId + salt + authCookie);
        var data = {
            id      :   randId,
            sign    :   sign.toString(),
            key     :   authCookie
        };
        return data;
    };

    Anti.api = function(path, data, callback) {
        let authData = this.getAuthData();
        let langId = $.cookie('lang_id');
        let dataset = {};
        if (typeof authData != "boolean") {
            dataset["auth"] = authData;
            dataset["data"] = data;
        } else {
            dataset["data"] = data;
        }
        if (langId && langId !== '') {
            dataset["langId"] = langId;
        }
        this.sendRequest(path, dataset, callback);
    }; 
    
    Anti.sendRequest = function(path, dataset, callback) {
        if (typeof Anti.apiPrePath != "undefined") url = Anti.apiPrePath + path;
        else url = '/api/' + path;
        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(dataset),
            // dataType:   'json',
            // contentType: 'application/json; charset=utf-8',
            contentType: 'text/plain',
            success :   function(data, status) {
                if (Anti.checkResponse(data)) {
                    if (typeof callback == "function") {
                        callback(data.response);
                    }
                } else {
                    Anti.debugstr('API response: bad check result');
                    if (data.error == 1 || data.error == 2 || data.error == 3) {
                        Anti.authCookieValue = '';
                        Anti.clearAllIntervals();
                        Anti.entrance.setLoggedOffMode(false);
                    }
                }
            },
            error   : function(xhr, ajaxOptions, thrownError) {
                console.warn('Request error: '+xhr.status+' code, thrown error: '+thrownError);
                setTimeout(function(){
                    console.warn('Re-requesting '+path);
                    Anti.sendRequest(path, dataset, callback);
                },5000);
            }
            });
    };
    
    
    Anti.checkResponse = function(data) {
        if (typeof data.error != "undefined") {
            if (data.error == 0) return true;
            else return false;
        } else return false;
    };
    //
    Anti.sideMenuManager = {
    
    init: function()  {
        Anti.debugstr('initializing side navigation menu');
        
        this.initSideBarNavigation();
    },
    
    //функция закрытия модального окна
    closeModal: function() {
        $(el).parents('.modal-wrap').removeClass('active');
        $('.main-content').removeClass('dimmed');
    },
    
    initSideBarNavigation: function() {
        
        this.initSidebarHTMLContent();
        
        //menu categories click
        this.initSideBarCategories();
        this.initMobileSideBar();
        this.initSideBarMenuItems();
        
    },
    
    initSidebarHTMLContent: function() {
        template = Anti.hb("mainDocumentLayoutSidebar");
        Anti.html(template, $("#sidebarContainer"));
    },
    
    initSideBarCategories: function() {
        $('.menu-item .head').bind("tap keydown", function(e){
            if (e.type == "keydown") {
                if (e.which != 32 && e.which != 13) {
                    return;
                } else {
                    e.preventDefault();
                }
            }
            Anti.sideMenuManager.sideBarHeadClick($(this), true);
            
        });
    },
    
    initSideBarMenuItems: function() {
        $('.menu-item > .submenu > li > a').each(function(){
            $(this).bind("tap keydown", function(e){
                if (e.type == "keydown") {
                    if (e.which != 32 && e.which != 13) {
                        return;
                    } else {
                        e.preventDefault();
                    }
                }
                var navigationPath = $(this).attr('data-navigate');
                Anti.debugstr("tap on sidebar menu: "+navigationPath);
                Anti.navigate(navigationPath);
                
            });
        });
    },
    
    sideBarHeadClick: function(object, hideCurrentCategory) {
        clickId = object.parent().attr('id');
        //Anti.debugstr('click on menu header');
        $(".menu-item").each(function(){
            if ($(this).hasClass('opened')) {
                //Anti.debugstr('found opened menu');
                if (clickId != $(this).attr('id')) {
                    Anti.debugstr($(this).attr('id')+' has "opened" class, closing it. User clicked on '+clickId);
                    $(this).removeClass("opened");
                    $(this).find('.submenu').slideToggle();
                }
            }
        });
        if (!object.parent().hasClass("opened") || hideCurrentCategory == true) {
            //Anti.debugstr('sliding menu header');
            object.parent().toggleClass('opened')
                       .find('.submenu')
                       .slideToggle();
        }
    },

    reactivateCurrentMenuItem: function() {
        Anti.sideMenuManager.activateSideBarItemByNavigationPath(Anti.getPanelPath().split("/"));
    },

    activateSideBarItemByLongNavigationPath: function(subPaths) {

        path = subPaths.join("/");

        Anti.debugstr("sideMenuManager: activating menu "+path+" from "+subPaths);
        var obj = $('.menu-item').find("a[data-navigate='"+path+"']");
        if (obj.length == 0) return ;

        //removing "active" class
        $(".menu-item > .submenu > li > a").removeClass("active");


        obj.addClass("active");

        //activate menu category but don't slide it up if it is already opened
        Anti.sideMenuManager.sideBarHeadClick(obj.parents(".menu-item").find(".head"), false);
    },

    activateSideBarItemByNavigationPath: function(subPaths) {

        if (subPaths.length == 1) path = subPaths[0];
        else path = subPaths[0]+"/"+subPaths[1];

        Anti.debugstr("sideMenuManager: activating menu "+path+" from "+subPaths);
        var obj = $('.menu-item').find("a[data-navigate='"+path+"']");
        if (obj.length == 0) return ;
        
        //removing "active" class
        $(".menu-item > .submenu > li > a").removeClass("active");
                
        
        obj.addClass("active");
        
        //activate menu category but don't slide it up if it is already opened
        Anti.sideMenuManager.sideBarHeadClick(obj.parents(".menu-item").find(".head"), false);        
    },
    
    initMobileSideBar: function() {
        //открытие мобильного меню
        $('.infoicons .mobmenu').unbind("tap").bind("tap", function(){

            $('body > .container').toggleClass('mobmenu-opened');
            if ($("body").hasClass("hide-sidebar")) {
                Anti.sideMenuManager.toggleMenu();
            }
        });
    },

    hideMobileSideMenu: function() {
        $('body > .container').removeClass('mobmenu-opened');
    },

    toggleMenu: function() {
        $("body").toggleClass("hide-sidebar");
        $(".hide-menu").toggle();
        $('body > .container').removeClass('mobmenu-opened');
        Anti.runDoubleScaleEvent();
    }
    
    
    
    
    
    
    
};
    Anti.topMenuManager = {
    
    showDisplayLanguageSwitch: true,
    switchLanguageCallback: function(languageId){},
    languageId: 0,
    
    menuActiveState: false,
    menuActiveLabel: '',
    notifications: [],

    spotLightActive: false,
    
    init: function()  {
        
        this.initTopBarNavigation();
        this.initMenuIcons();
        
        //request language menu if any
        var func = Anti.stringToFunction("Anti.menu.requestLanguageMenu");
        if (typeof func == "function") {
            func();
        }
        
    },
    
    initTopBarNavigation: function() {
        this.initTopBarHTMLContent();
    },
    
    initTopBarHTMLContent: function() {
        template = Anti.hb("mainDocumentLayoutTopbar")({searchBar: Anti.searchBarEnabled});
        Anti.htmlPrepend(template, $(".side-main"));
    },
    
    showTopMenuIcons: function() {
        $(".infoicons > span[class~='submenu-icon']").hide();
        if (Anti.topMenuManager.showDisplayLanguageSwitch) {
            $(".infoicons > .info-flags").show();
        }
    },
    
    setLanguageMenu: function(languages, callback) {
        template = Anti.hb("mainDocumentLayoutTopbarFlag");
        Anti.topMenuManager.switchLanguageCallback = callback;
        html = '';
        for (i in languages) {
            html += template(languages[i]);
        }
        Anti.html(html, $(".infoicons > .flags-list"));
        Anti.htmlRecords("mainDocumentLayoutTopbarFlag", languages, $(".infoicons > .flags-list"));
    },
    
    callSetLanguageCallback: function(langId) {
        Anti.topMenuManager.switchLanguageCallback(langId);
        Anti.topMenuManager.languageId = langId;
    },
    
    getLanguageMenu: function() {
        return Anti.topMenuManager.languageId;
    },
    
    setNotifications: function(data) {
        if (Anti.topMenuManager.menuActiveState) {
            Anti.debugstr("topMenuManager: ignoring setting notification request");
            return false;
        }
        Anti.topMenuManager.notifications = data;
        Anti.topMenuManager.showTopMenuIcons();
        if (data.length > 0) {
            $(".infoicons > .info-bell").fadeIn(500);
        } else {
            $(".infoicons > .info-bell").fadeOut(500);
        }
    },
    
    showNotification: function(showMessageId) {
        showMessageId = parseInt(showMessageId);
        for (i in Anti.topMenuManager.notifications) {
            selectedRow = Anti.topMenuManager.notifications[i];
            if (selectedRow.id === showMessageId) {
                //hiding menu
                $(".infoicons > .info-bell").removeClass('active');
                $('.msg-list').toggleClass('active');

                //run instant callback or set delayed callback for dialogs manager
                if (typeof selectedRow.instantCallback != "undefined") {
                    selectedRow.callback();
                    Anti.topMenuManager.menuActiveState = false;
                    Anti.dialogsManager.close();
                } else {
                    var funcCopy = selectedRow.callback.bind({});
                    Anti.dialogsManager.setCloseCallback(function(){
                        funcCopy();
                        Anti.topMenuManager.menuActiveState = false;
                    });
                    selectedRow.message = Anti.topMenuManager.parseLocalLinks(selectedRow.message);
                    Anti.dialogsManager.message(selectedRow.message, selectedRow.title, "tal");
                }
            }
        }
    },
    
    initMenuIcons: function() {

        //all notifications except flags
        $('.infoicons > .info-bell').unbind("tap").bind("tap",function(){

            var menuName = "notifications"
            if (Anti.topMenuManager.menuActiveState && Anti.topMenuManager.menuActiveLabel != menuName) {
                return false;
            }
            Anti.htmlRecords("mainDocumentLayoutTopbarMessage", Anti.topMenuManager.notifications, $(".infoicons > .msg-list"));
            $(this).toggleClass('active');
            $('.msg-list').toggleClass('active');
            $('.main-content').toggleClass('dimmed');
            Anti.topMenuManager.setSubmenuActiveFlag($(this), menuName);
            
        });

        //flags only
        $('.infoicons > span[class="info-flags"]').unbind("tap").bind("tap",function(){
            
            labelName = 'language';
            if (Anti.topMenuManager.menuActiveState && Anti.topMenuManager.menuActiveLabel != labelName) {
                return false;
            }
            $(this).toggleClass('active');
            $('.flags-list').toggleClass('active');
            $('.main-content').toggleClass('dimmed');
            Anti.topMenuManager.setSubmenuActiveFlag($(this), labelName);
            
        });

    },
    
    setSubmenuActiveFlag: function(object, labelName) {
        if (object.hasClass("active")) {
            Anti.topMenuManager.menuActiveState = true;
            Anti.topMenuManager.menuActiveLabel = labelName;
        } else {
            Anti.topMenuManager.menuActiveState = false;
            Anti.topMenuManager.menuActiveLabel = '';
        }
    },

    stoplightType: function(_, value) {
        if (typeof Anti.menu.stoplightSearch != "function") return;
        var mainDocumentHeader = $("#mainDocumentHeader");
        if (value.length > 0) {
            Anti.topMenuManager.spotLightActive = true;
            $("#spotlightResultsContainer").show();
            $("#contentbox").hide();
            if (!mainDocumentHeader.hasClass('searching')) {
                mainDocumentHeader.addClass('searching');
            }
            Anti.menu.stoplightSearch(value);
        } else {
            Anti.topMenuManager.hideSpotLight();
        }
    },

    hideSpotLight: function() {
        Anti.topMenuManager.spotLightActive = false;
        $("#spotlightResultsContainer").hide();
        $("#contentbox").show();
        $("#spotlightInput").val('');
        $("#mainDocumentHeader").removeClass('searching');
    },

    parseLocalLinks: function(message) {
        var matches = message.match(/\[(.*?)\]/gi);
        if (matches) {
            for (m = 0;m<matches.length; m++) {
                mRow = matches[m].replace('[','').replace(']','').split("|");
                if (mRow.length == 2) {
                    message = message.replace(matches[m], "<a class=\"dash-link\" data-navigate=\""+mRow[0]+"\">"+mRow[1]+"</a>".split("\n").join(""));
                }
            }
        }
        return message;
    }
    
    
};
    Anti.tabsManager = {
    
    activeTabs: [],
    
    init: function(object) {
        object.find('.btn-group .btn:not(.not-tab)').each(function() {
            
            $(this).unbind("tap keydown").bind("tap keydown", function(e){
                if (e.type == "keydown") {
                    if (e.which != 32 && e.which != 13) {
                        return;
                    } else {
                        e.preventDefault();
                    }
                }
                Anti.tabsManager.tabLabelClickEvent($(this));
                Anti.tabsManager.triggerCallBackFunction($(this));
            });
            
            
        });
        object.find('.btn-group').find(".btn.active").each(function(){
            Anti.tabsManager.addActiveTab($(this).attr('tab-switch'));
        });
    },
    
    clear: function() {
        Anti.tabsManager.activeTabs = [];
    },
    
    clearTabsScope: function(scopeName) {
        $(".btn-group[tab-scope='"+scopeName+"']").find(".btn").each(function(){
            //Anti.debugstr('removing active tab '+$(this).attr('tab-switch'));
            removeFromArray(Anti.tabsManager.activeTabs, $(this).attr('tab-switch'));;
        });
    },
    
    addActiveTab: function(tabName) {
        this.activeTabs.push(tabName);
        //Anti.debugstr('adding active tab '+tabName);
    },
    
    deactivateTab: function(tabObject) {
        tabObject.removeClass('active');
        tabName = tabObject.attr('tab-switch');
        removeFromArray(this.activeTabs, tabName);;
    },

    //activates by "tab-switch" parameter
    activateTabByName: function(name) {
        Anti.tabsManager.tabLabelClickEvent($("button[tab-switch='"+name+"']"));
    },

    //activates tab
    tabLabelClickEvent: function(object) {
        
        tabName = object.attr('tab-switch');
        if (this.activeTabs.indexOf(tabName) != -1) {
            Anti.debugstr(sprintf("tab %s exists in activeTabs", tabName));
            return false;
        }
        
        var scope = object.attr("tab-scope");
        if (typeof scope != "undefined") {
            var tabButtons = $(".btn-group[tab-scope='"+scope+"']");
            var tabPane   = $(".tabstack[tab-scope='"+scope+"'] .tab-pane");
        } else {
            var tabButtons = object.parents('.btn-group');
            var tabPane    = $('.tabstack .tab-pane');
        }
        
        //disable active tab labels and removing from active tabs list
        tabButtons.find('.btn.active')
                .each(function() {
                    Anti.tabsManager.deactivateTab($(this));
                });
                
        //hide other tab contents
        tabPane.hide();
        
        //add active label to selected tab
        object.addClass('active');
        
        this.activateTabContent(object);
    },
    
    activateTabContent: function(tabLabelObject) {
        
        //get content ID from tab label
        var switchTab = tabLabelObject.attr('tab-switch');
        this.addActiveTab(switchTab);
        
        //show tab content
        $('.'+switchTab).addClass('slideDownQuick').show(0);
    },
    
    triggerCallBackFunction: function(object) {
        //callback function
        var callbackFunc = object.attr("callback-function");
        if (typeof callbackFunc != "undefined") {
            Anti.debugstr("tabs callbackFunc = "+callbackFunc);
            var callbackParameter = object.attr("callback-parameter");
            var func = Anti.stringToFunction(callbackFunc);
            if (typeof func == "function") {
                func(callbackParameter);
            } else {
                Anti.debugstr(func+" is not a function");
            }
        } 
    },

    renderVerticalTabStructure: function(object, struct) {
        for (var structIndex in struct) {
            if (struct[structIndex].tabContentType == 'settings') {
                struct[structIndex]["id"] = "tab" + Math.floor(Math.random()*10000);
                struct[structIndex]["content"] = Anti.hb("tabbedContentAutoSettings")(struct[structIndex].settings);
            }
            if (struct[structIndex].tabContentType == 'templateId') {
                struct[structIndex]["content"] = Anti.hb("tabContent" + struct[structIndex].id);
            }
        }
        Anti.html(Anti.hb("tabbedContentStructure")(struct), object);
    }
    
};
    Anti.formsManager = {
    
    blockedForms: [],
    activeButtons: [],
    buttonsData: {},
    currentContainerObjectId: false,
    
    init: function(object) {
        object.find('.form')
            .unbind("submit")
            .bind("submit", function(e) {
                Anti.formsManager.submit(e, $(this));
            });
        object.find(".form").find("input[type='text'],input[type='password']")
              .keydown(function(e){
                if (e.which == 13) {
                    var formParent = $(this).parents(".form");
                    Anti.formsManager.submit(e, formParent);
                }
            });
                    
        //input callbacks
        object.find(".active-input")
                .unbind("keydown keyup change")
                .bind("keydown keyup change",function(e) {
            actionNameValue = $(this).attr("input-action");
            var func = Anti.stringToFunction(actionNameValue);
            if (typeof func == "function") func($(this).val());
        });
    },

    renderAntiPacketForm: function(formsData, buttonsData, containerObject) {

        fileInputs                                  =   [];
        Anti.formsManager.activeButtons             =   [];
        Anti.formsManager.buttonsData               =   buttonsData;
        Anti.formsManager.currentContainerObjectId  =   containerObject.attr("id");

        if (buttonsData != false) {
            formsData["submitAction"] = buttonsData.submitAction;
            formsData["submitButtonText"] = buttonsData.submitButtonText;
            formsData["showCancelButton"] = buttonsData.showCancelButton;
            formsData["cancelAction"] = buttonsData.cancelAction;
            formsData["cancelButtonText"] = buttonsData.cancelButtonText;
            formsData["cancelActionParameter"] = buttonsData.cancelActionParameter;
        }

        //assigning indexes to radio options and getting image file inputs
        for (rowIndex in formsData.forms) {
            formRow = formsData.forms[rowIndex];
            if (typeof formRow.inputType != "undefined") {
                switch (formRow.inputType) {
                    case 'radio':
                        for (optIndex in formRow.inputOptions) {
                            formRow.inputOptions[optIndex]["rand"] = Math.round(Math.random() * 1000000);
                        }
                        break;

                    case 'imageUpload':
                        if (typeof formRow.name == "undefined") formRow.name = "imageScreenShot";
                        fileInputs.push(formRow.name);
                        break;

                    case 'buttons':
                        for (btnIndex in formRow.inputOptions) {
                            randButtonId = 'actBtn' + Math.round(Math.random() * 1000000);
                            if (typeof formRow.inputOptions[btnIndex].size != "undefined") {
                                if (['medium','small'].indexOf(formRow.inputOptions[btnIndex].size) == -1) {
                                    formRow.inputOptions[btnIndex].size = "defaultsize";
                                }
                            } else {
                                formRow.inputOptions[btnIndex].size = "defaultsizenotset";
                            }
                            if (typeof formRow.inputOptions[btnIndex].style != "undefined") {
                                if (formRow.inputOptions[btnIndex].style == 'highlight') {
                                    formRow.inputOptions[btnIndex].style = 'btn-primary';
                                } else {
                                    formRow.inputOptions[btnIndex].style = 'btn-default';
                                }
                            } else {
                                formRow.inputOptions[btnIndex].style = 'btn-default';
                            }
                            if (typeof formRow.inputOptions[btnIndex].blockForm != "boolean") {
                                formRow.inputOptions[btnIndex].blockForm = false;
                            }

                            formRow.inputOptions[btnIndex]["randButtonId"]  =   randButtonId;
                            Anti.formsManager.activeButtons[randButtonId]   =   formRow.inputOptions[btnIndex]
                        }
                        break;
                }
            }
        }
        Anti.html(Anti.hb("FWformRenderTemplate")(formsData), containerObject);
        for (i in fileInputs) {
            Anti.formsManager.initImageUploadForm(fileInputs[i]);
        }
    },

    processAntiPacketButtonAction: function(randId) {
        if (typeof Anti.formsManager.activeButtons[randId] != "undefined" && typeof Anti.formsManager.buttonsData.activeButtonCallback == "function") {
            var actButton = Anti.formsManager.activeButtons[randId];
            if (actButton.blockForm) {
                Anti.debugstr('blocking form '+Anti.formsManager.currentContainerObjectId);
                Anti.formsManager.blockFormProcessing($("#"+Anti.formsManager.currentContainerObjectId));
            }

            //callback
            Anti.formsManager.buttonsData.activeButtonCallback(Anti.formsManager.activeButtons[randId]);

            //blocking button
            $("span[action-parameter='"+actButton.randButtonId+"']")
                .unbind("tap")
                .addClass('btn-disabled');

            //blocking others
            if (typeof actButton.blockGroup != "undefined") {
                if (actButton.blockGroup) {
                    $("span[action-parameter='"+actButton.randButtonId+"']").parent().find(".btn")
                        .unbind("tap")
                        .addClass('btn-disabled');
                }
            }
        }
    },

    zoomImage: function(imageUrl) {
        Anti.dialogsManager.init("FWformImageZoom", {imageUrl: imageUrl}, "fullscreen");
        $("#zoomBody").unbind("tap").bind("tap", function(){
            var degree = parseInt($(this).attr("data-degree"));
            if (isNaN(degree)) degree = 0;
            degree+=90;
            $(this).attr("data-degree", degree).css('transform','rotate('+degree+'deg)');
        });
    },



    initImageUploadForm: function(name) {
        previewObject = $("#paster"+name);
        Anti.fileUpload.init({
            name: name,
            previewObject: previewObject,
            hasProgressBar: true,
            apiMethod: 'savefile',
            apiParameters: {
                name: name,
                destination: 'formUpload'
            },
            onStart: function() {
                Anti.formsManager.blockFormProcessing(previewObject.parents("form"));
                $(".paste-image[data-name="+name+"]").html('');
            },
            onComplete: function(data) {
                $('#paster'+name).attr("data-fileurl", data.url)
                                 .css({'border-color': 'seagreen'});
                Anti.formsManager.resumeFormProcessing(previewObject.parents("form"));
            }
        });

    },


    verifyFormCompletion: function(formData) {
        var errObject = false;
        var isComplete = true;
        for (i in formData) {
            row = formData[i];
            if (typeof row.name != "undefined" && row.inputType != "undefined") {

                switch (row.inputType) {

                    case 'radio':
                        if ($("input[name='"+row.name+"']:checked").length == 0) {
                            errObject   =   $("input[name='"+row.name+"']").parents('.form-row');
                            isComplete  =   false;
                        }
                        break;

                    case 'textarea':
                        if ($("textarea[name='"+row.name+"']").val() == '') {
                            errObject   =   $("textarea[name='"+row.name+"']").parents('.form-row');
                            isComplete  =   false;
                        }
                        break;

                    case 'text':
                        if ($("input[name='"+row.name+"']").val() == '') {
                            errObject   =   $("input[name='"+row.name+"']").parents('.form-row');
                            isComplete  =   false;
                        }
                        break;


                    case 'select':
                        if (Anti.settingsManager.getValue(row.name) == '') {
                            errObject   =   $("div[callback-parameter='"+row.name+"']").parents('.form-row');
                            isComplete  =   false;
                        }
                        break;

                    case 'imageUpload':
                        imageUrl = $("#paster"+row.name).attr("data-fileurl");
                        if (imageUrl == '') {
                            errObject   =   $("#paster"+row.name).parents('.form-row');
                            isComplete  =   false;
                        }
                        break;
                }

            }
        }
        if (!isComplete) {
            errObject.addClass('form-error').unbind("mousemove").bind("mousemove", function(){
                $(this).unbind('mousemove').removeClass('form-error');
            });
        }
        return isComplete;
    },

    completeAntiPacketForms: function(data) {
            for (i in data.forms) {
                if (typeof data.forms[i].name != "undefined" && data.forms[i].inputType != "undefined") {

                    switch (data.forms[i].inputType) {

                        case 'radio':
                            data.forms[i]["value"] = $("input[name='"+data.forms[i].name+"']:checked").val();
                            break;

                        case 'checkbox':
                            data.forms[i]["value"] = $("input[name='"+data.forms[i].name+"']").prop('checked');
                            break;

                        case 'select':
                            data.forms[i]["value"] = Anti.settingsManager.getValue(data.forms[i].name);
                            break;

                        case 'textarea':
                        case 'text':
                            data.forms[i]["value"] = $(".form-input[name='"+data.forms[i].name+"']").val();
                            break;

                        case 'imageUpload':
                            data.forms[i]["value"] = "https:"+$("#paster"+data.forms[i].name).attr("data-fileurl");
                        break;
                    }
                }
            }
            return data;
        },
    
    submit: function(e, object) {
        e.preventDefault();
        formId = object.attr("id");
        //check if we need to prevent double clicking
        if (Anti.formsManager.blockFormProcessing(object)) {
            return false;
        }
        
        actionName = object.attr("form-action");
        actionParameter = object.attr("action-parameter");
        if (typeof actionName != 'undefined') {
            
            var func = Anti.stringToFunction(actionName);
            if (typeof actionParameter != 'undefined') result = func(actionParameter);
            else result = func();
            
            if (result == false) {
                Anti.debugstr('resume form processing after false result of '+actionName);
                Anti.formsManager.resumeFormProcessing(object);
            }
        } 
    },
    
    blockFormProcessing: function(object) {
        
        formId = object.attr("id");
        
        blockProcessing = object.attr('form-block-processing');
        if (typeof blockProcessing != 'undefined') {
            if (blockProcessing == "true") {
                
                if (Anti.formsManager.blockedForms.indexOf(formId) != -1) {
                    //already blocking it
                    Anti.debugstr(sprintf("formsManager blocked form %s for processing", formId))
                    return true;
                }
                object.find(".btn-primary").addClass('btn-disabled');
                if (formId == "") {
                    Anti.debugstr("empty formId in formsManager.blockFormProcessing");
                    return false;
                }
                Anti.formsManager.blockedForms.push(formId);
            } else {
                Anti.debugstr("block form processing set to off");
            }
        } else {
            Anti.debugstr("form-block-processing value undefined");
        }
        
        
    },

    resumeFormProcessingById: function(formId) {
        Anti.debugstr("resuming for processing for form "+formId);
        removeFromArray(Anti.formsManager.blockedForms, formId);
        $("#"+formId).find(".btn-primary").removeClass('btn-disabled');
    },
    
    resumeFormProcessing: function(object) {
        formId = object.attr('id');
        Anti.debugstr("resuming for processing for form "+formId);
        object.find(".btn-primary").removeClass('btn-disabled');
        if (typeof formId != "undefined") {
            removeFromArray(Anti.formsManager.blockedForms, formId);
        }
    },
    
    setFormError: function(object, text) {
        object.find('.form-msg').html(text).attr("role", "alert");
        setTimeout(function(){
            object.attr("role", "");
        }, 2000);
    },

    showFormError: function(object) {
        object.find('.form-msg').addClass('active').attr("role", "alert");
        setTimeout(function(){
            object.attr("role", "");
        }, 2000);
    },
    
    hideFormError: function(object) {
        object.find('.form-msg').removeClass('active').attr("role", "");
    },
    
    /**
     * Shows error label right after text input
     * @param {object} inputObject jQuery object
     * @param {string} errorText Error text
     * @returns boolean
     */
    showInputError: function(inputObject, errorText) {
        var errorPlaceholder =
            inputObject.parent()
                .addClass('error')
                .find(".error-msg");
        errorPlaceholder.html(errorText)
                        .attr("role", "alert");
        setTimeout(function(){
            errorPlaceholder.attr("role", "");
        }, 2000);
        inputObject.bind("keydown mousemove", function() {
            $(this).parent().removeClass('error');
            $(this).unbind("keydown mousemove");
        });
        return true;
    },

    clear: function() {
        Anti.formsManager.blockedForms = [];
    }
    
};


    Anti.buttonsManager = {
    
    init: function(object) {

        //navigation links
        object.find(".anti-navigate,.dash-link").unbind("tap keydown").bind("tap keydown", function(e) {
            if (e.type == "keydown") {
                if (e.which != 32 && e.which != 13) {
                    return;
                } else {
                    e.preventDefault();
                }
            }
            if ($(this).hasClass('btn-disabled')) return;
            Anti.navigate($(this).attr("data-navigate"));
        });

        object.find('.btn-manager, .dash-button')
        .unbind("tap keydown")
        .bind("tap keydown", function(e) {
            if (e.type == "keydown") {
                if (e.which != 32 && e.which != 13) {
                    return;
                } else {
                    e.preventDefault();
                }
            }
            actionNameValue = $(this).attr("button-action");
            Anti.debugstr('buttonsManager: actionNameValue = '+actionNameValue);
            var func = Anti.stringToFunction(actionNameValue);
            if (typeof func == "function") {
                //parameters
                actionParameter = $(this).attr("action-parameter");
                if (typeof actionParameter != "undefined") {
                    func(actionParameter);
                } else {
                    func();
                }
            }
        });

        object.parents().find('.accordeon .item.expandable').unbind("tap").bind("tap", function(){
            $(this).parent().find('.item').removeClass('active');
            $(this).toggleClass('active');
        });
        
        
        //закрытие инфоблока
        $('.infoblock .close, .infoblock .btn').click(function(){
            $('.infoblock').slideUp();
        });

        
    }
    
}

    Anti.settingsManager = {
    
    marginConstant : 0,
    settings: [],
    
    init: function(object) {
        
        Anti.slidersManager.initSliders(object);
        Anti.dropdownManager.init(object);
        
        this.initToggles(object);
        this.initLabels(object);
        this.initInputs(object);
        
        

       
        
    },
    
    
    
    setToggleSwitchValue: function(object, value) {
        //right means ON
        if (object.hasClass("right") == false) {
        }
        if (!object.hasClass("right") && value == true) {
            object.addClass("right");
        }
        if (object.hasClass("right") && value == false) {
            object.removeClass("right");
        }
        var showHiddenOnTrue = object.attr("show-hidden-on-true");
        if (typeof showHiddenOnTrue != "undefined") {
            showHiddenOnTrue = showHiddenOnTrue == "true" ? true : false;
            if ((value && showHiddenOnTrue) || (!value && !showHiddenOnTrue)) {
                object.next(".toggler-hidden").slideDown(200);
            }
            if ((!value && showHiddenOnTrue)|| (value && !showHiddenOnTrue)){
                object.next(".toggler-hidden").slideUp(200);
            }
        }
        object.attr("current-value", value ? 'true' : 'false');
    },
    
    setToggleValue: function(object, value) {
        if (!object.hasClass("active") && value) {
            object.addClass("active");
        }
        if (object.hasClass("active") && !value) {
            object.removeClass("active");
        }
    },
    
    initToggles: function(object) {
        object.find(".toggler").each(function() {

            var paramName = $(this).attr("callback-parameter");
            //Anti.debugstr("settingsManager: adding toggle switch "+paramName);
            //adding control to settings array
            Anti.settingsManager.settings.push({ type: 'toggle', parameter: paramName});
            
            //binding tap event
            $(this).unbind("tap").bind("tap", function(){
                if ($(this).hasClass('disabled')) return true;
                $(this).toggleClass('active');
                if ($(this).hasClass("active")) {
                    value = true;
                } else {
                    value = false;
                }
                Anti.settingsManager.triggerCallBackFunction($(this), value);
            });
            $(this).bind("remove", function() {
               Anti.settingsManager.unbindSelf($(this).attr("callback-parameter")); 
            });
        });
        
        object.find('.switch-either').each(function(){
            
            var paramName = $(this).attr("callback-parameter");
            //Anti.debugstr("settingsManager: adding toggle switch "+paramName);
            Anti.settingsManager.settings.push({ type: 'toggleSwitch', parameter: paramName});
            
            
            $(this).unbind("tap").bind("tap", function(){
                Anti.settingsManager.setToggleSwitchValue($(this), !$(this).hasClass('right'));
                Anti.settingsManager.triggerCallBackFunction($(this), $(this).hasClass('right'));
            });
            $(this).bind("remove", function() {
               Anti.settingsManager.unbindSelf($(this).attr("callback-parameter")); 
            });
            
            
        });

        
        
    },
    
    initLabels: function(object) {
        object.find(".setting-label").each(function(){
            //adding control to settings array
            var paramName = $(this).attr("setting-parameter");
            //Anti.debugstr("settingsManager: adding label "+paramName);
            Anti.settingsManager.settings.push({ type: 'label', parameter: paramName});
            $(this).bind("remove", function() {
               Anti.settingsManager.unbindSelf($(this).attr("setting-parameter")); 
            });
        });
    },
    
    initInputs: function(object) {
        object.find("input[callback-parameter!=''], textarea[callback-parameter!='']").each(function(){
            //adding control to settings array
            var paramName = $(this).attr("callback-parameter");
            if (typeof paramName != "undefined") {
                
                Anti.debugstr("settingsManager: adding input "+paramName);
                Anti.settingsManager.settings.push({ type: 'input', parameter: paramName });

                if (typeof $(this).attr("noonchange") == "undefined") {
                    $(this).unbind("change").bind("change", function () {
                        if ($(this).attr("type") == "checkbox" || $(this).attr("type") == "radio") {
                            Anti.settingsManager.triggerCallBackFunction($(this), $(this).prop('checked'));
                        } else {
                            Anti.settingsManager.triggerCallBackFunction($(this), $(this).val());
                        }
                    });
                }
                $(this).unbind("keyup").bind("keyup", function(e){
                    if (e.keyCode != 13 && typeof $(this).attr("nokeyup") != "undefined") {
                        //ignoring keyup
                        return;
                    }

                    paramName = $(this).attr("callback-parameter");
                    callbackSpeed = $(this).attr("callback-speed");
                    if (typeof callbackSpeed == "undefined") callbackSpeed = 1000;
                    else callbackSpeed = parseInt(callbackSpeed);
                    var inputCallbackObject = $(this);
                    Anti.deleteInterval("activeInputCallBackTimeout"+paramName);
                    Anti.addInterval("activeInputCallBackTimeout"+paramName, setTimeout(function(){
                        Anti.settingsManager.triggerCallBackFunction(inputCallbackObject, inputCallbackObject.val());
                    }, callbackSpeed));

                });
                $(this).bind("remove", function() {
                    Anti.settingsManager.unbindSelf($(this).attr("callback-parameter")); 
                 });
            }
        });
    },
    
    
    setSettingsArray: function(settings) {
        for (key in settings) {
            if (settings.hasOwnProperty(key)) {
                Anti.settingsManager.setValue(key, settings[key]);
            }
        }
    },

    getValue: function(parameter) {


        object = $(".adropdown[callback-parameter='"+parameter+"']");
        if (object.length > 0) {
            if (typeof object.attr("current-value") != "undefined") return object.attr("current-value");
            else return object.attr("default-value");
        }

        object = $(".toggler[callback-parameter='"+parameter+"']");
        if (object.length > 0) {
            return object.hasClass("active");
        }

        object = $(".handle[callback-parameter='"+parameter+"']");
        if (object.length > 0) return object.attr("current-value");

        object = $(".switch-either[callback-parameter='"+parameter+"']");
        if (object.length > 0) return object.attr("current-value") == "true";

        object = $("input[callback-parameter='"+parameter+"']");
        if (object.length > 0) return object.val();

        object = $("textarea[callback-parameter='"+parameter+"']");
        if (object.length > 0) return object.val();

        return "";

    },
    
    
    setValue: function(parameter, value) {
        //console.log('setting '+parameter+' = '+value);
        //console.log(Anti.settingsManager.settings.length);
        Anti.settingsManager.settings.forEach(function(element){
                //console.log('checking '+element.parameter);
            if (element.parameter == parameter) {
                //console.log('found parameter');
                var object = false;
                switch (element.type) {
                    case "slider":
                        object = $(".handle[callback-parameter='"+element.parameter+"']");
                        Anti.slidersManager.setSliderValue(object, value);
                        Anti.slidersManager.triggerCallBackInput(object, value);
                        break;
                        
                    case "toggle":
                        object = $(".toggler[callback-parameter='"+element.parameter+"']");
                        Anti.settingsManager.setToggleValue(object, value);
                        break;
                        
                    case "toggleSwitch":
                        object = $(".switch-either[callback-parameter='"+element.parameter+"']");
                        Anti.settingsManager.setToggleSwitchValue(object, value);
                        break;
                        
                    case "label":
                        object = $(".setting-label[setting-parameter='"+element.parameter+"']");
                        var template = object.attr("setting-template");
                        if (typeof template == "undefined") object.html(value);
                        else {
                            object.html(sprintf(template,value));
                        }
                        break;
                        
                    case "input":
                        object = $("input[callback-parameter='"+element.parameter+"']");
                        if (object.attr("type") == "checkbox" || object.attr("type") == "radio") {
                            object.prop('checked', value);
                        } else {
                            object.val(value);
                        }
                        break;
                        
                    case "dropdown":
                        object = $(".adropdown[callback-parameter='"+element.parameter+"']");
                        Anti.dropdownManager.setValue(object, value, false);
                        break;
                }
            }
        });
    },
    
    addElement: function(type, paramName) {
        Anti.settingsManager.settings.push({ type: type, parameter: paramName});
    },
    
    unbindSelf: function(paramName) {
        for (elIndex in Anti.settingsManager.settings) {
            if (Anti.settingsManager.settings[elIndex].parameter == paramName) {
                Anti.settingsManager.settings.splice(elIndex, 1);
                return;
            }
        }
    },
    
    triggerCallBackFunction: function(object, value) {
        //callback function
        var callbackFunc = object.attr("callback-function");
        if (typeof callbackFunc != "undefined") {
            Anti.debugstr("callbackFunc = "+callbackFunc);
            var callbackParameter = object.attr("callback-parameter");
            var func = Anti.stringToFunction(callbackFunc);
            if (typeof func == "function") {
                func(callbackParameter, value);
            } else {
                Anti.debugstr(func);
            }
        } else {
            Anti.debugstr("callbackFunc is empty");
        }
    },
    
    
    resizeEvent: function() {
        Anti.debugstr('settingsManager: resize event call');
        $(".slider .handle").each(function(){
            Anti.slidersManager.setSliderValue($(this), $(this).attr("current-value"));
        });
    },
    
    
    
};
    Anti.notificationManager = {
    
    init: function() {
        
    }
    
};
    Anti.slidersManager = {
    
    
    initSliders: function() {
        $(".slider .handle").each(function(){
            
            //adding control to settings array
            Anti.settingsManager.settings.push({ type: 'slider', parameter: $(this).attr("callback-parameter")});
            
            
            var defValue = $(this).attr("default-value");
            var currentValue = $(this).attr("current-value");
            if (typeof defValue != "undefined") {
                if (typeof currentValue != "undefined") {
                    defValue = currentValue;
                } 
                Anti.slidersManager.setSliderValue($(this), defValue);
            }
            
            $(this).draggable({ 
                axis: "x" ,
                containment: "parent",
                drag: function(event, ui) {

                    var thisObject = $(this);
                    
                    //prevent dragging for range sliders
                    var allowDrag = Anti.slidersManager.getDependentSliderModifiedValue(thisObject, "allowDrag", ui.position.left);
                    if (allowDrag === false) {
                        return false;
                    }

                    var leftPosition = ui.position.left;
                    var dependencyType = thisObject.attr("dependency-type");
                    if (typeof dependencyType != "undefined") {
                        if (dependencyType == "right") {
                            leftPosition -= 10;
                        }
                        if (dependencyType == "left") {
                            if (leftPosition > 0) leftPosition += 4;
                        }
                    }

                    //setting current value to html
                    value = Anti.slidersManager.getSliderValueByOffset(thisObject, leftPosition);
                    $(this).attr("current-value", value);

                    var callbackDelay = thisObject.attr("callback-delay");
                    if (typeof callbackDelay == "undefined") {
                        callbackDelay = 500;
                    }

                    //call back function with timeout
                    Anti.deleteInterval("slidersManagerCallbackTimeout");
                    Anti.addInterval("slidersManagerCallbackTimeout", setTimeout(function(){
                        Anti.settingsManager.triggerCallBackFunction(thisObject, value);
                    }, callbackDelay));

                    
                    Anti.slidersManager.triggerCallBackInput($(this), value);
                    
                },
                
                stop: function (){
                   Anti.slidersManager.convertSliderPositionToPercents($(this));
                }
                
            });
           
            //callback input bind
            var callbackInput = $(this).attr("callback-input");
            if (typeof callbackInput != "undefined") {
                Anti.slidersManager.bindCallbackInputEvents($(callbackInput));
            }
            
            $(this).bind("remove", function() {
               Anti.settingsManager.unbindSelf($(this).attr("callback-parameter")); 
            });
           
            
        });
    },
    
    
    
    convertSliderPositionToPercents: function(object) {
        var l = ( 100 * parseFloat(object.css("left")) / parseFloat(object.parent().css("width")) )+ "%" ;
        object.css("left" , l);
    },
    
    
    bindCallbackInputEvents: function(object) {
        object.bind("keyup change", function(e){

            var nokeyup   = $(this).attr("nokeyup");
            var callbackTimeout = $(this).attr("callback-timeout");
            var inputVal  = $(this).val();
            var sliderObj = $($(this).attr("slider-callback"));

            if (typeof nokeyup != "undefined" && e.type == "keyup") return false;

            if (inputVal == "" || inputVal == "0" || inputVal == "0.") {
                timeoutTime = 3000;
            } else {
                timeoutTime = 1000;
                if (typeof callbackTimeout != "undefined") timeoutTime = parseInt(callbackTimeout);
            }


            Anti.slidersManager.setSliderValue(sliderObj, inputVal);
            Anti.slidersManager.queueMinMaxFixCallback(sliderObj, object, timeoutTime, inputVal);
        });
    },
    
    queueMinMaxFixCallback: function(sliderObj, inputObject, timeoutTime, inputVal) {
        Anti.deleteInterval("sliderCallbackMinMaxFix"+sliderObj.attr("id"));
        Anti.addInterval("sliderCallbackMinMaxFix"+sliderObj.attr("id"), setTimeout(function(){

            //this fixes if user entered letters
            var valueToSet = inputVal;
            if (inputVal != parseFloat(inputVal)) {
                valueToSet = sliderObj.attr("default-value");
            } else {
                inputVal = parseFloat(inputVal);
                var minValue = Anti.slidersManager.getSliderMinValueSetting(sliderObj);
                var maxValue = Anti.slidersManager.getSliderMaxValueSetting(sliderObj);
                var allowHigherMax = Anti.slidersManager.getSliderOptionAllowHigherValue(sliderObj);

                //modify values for range sliders preventing
                maxValue = Anti.slidersManager.getDependentSliderModifiedValue(sliderObj, "sliderMaxValueForLeftRestriction", maxValue);
                minValue = Anti.slidersManager.getDependentSliderModifiedValue(sliderObj, "sliderMinValueForRightRestriction", minValue);

                if (inputVal < minValue) {
                    valueToSet = minValue;
                }
                if (inputVal > maxValue && allowHigherMax == false) {
                    valueToSet = maxValue;
                }
            }
            Anti.slidersManager.setSliderDependentInputValue(inputObject, valueToSet);


        }, timeoutTime));
    },
    
    getDependentSliderModifiedValue: function(object, valueType, defaultValue) {
        dependentSlider = object.attr("dependent-slider");
        if (typeof dependentSlider != "undefined") {
            var dependentSliderObj = $(dependentSlider);
            var dependencyType = object.attr("dependency-type");
            var dependentValue = parseFloat($(dependentSlider).attr("current-value"));
            switch (valueType) {
                
                case 'valueRange':
                    defaultValue += (this.getSliderMaxValueSetting(dependentSliderObj) - this.getSliderMaxValueSetting(dependentSliderObj));
                    defaultValue = defaultValue / 2;
                    break;
                    
                case 'sliderMaxValueForLeftRestriction':
                    if (dependencyType == "left") defaultValue = dependentValue;
                    break;
                    
                case 'sliderMinValueForRightRestriction':
                    if (dependencyType == "right") defaultValue = dependentValue;
                    break;
                    
                case "allowDrag":
                    if (dependencyType == "left" && defaultValue > dependentSliderObj.position().left-13) {
                        return false;
                    }
                    if (dependencyType == "right" && defaultValue < dependentSliderObj.position().left+13) {
                        return false;
                    }
                    return true;
                    break;
                    
                    
            }
        } 
        return defaultValue;
    },
    
    
    getSliderRangeValue: function(object) {
        minValue = this.getSliderMinValueSetting(object);
        maxValue = this.getSliderMaxValueSetting(object);
        
        rangeValue = maxValue - minValue;
        
        return this.getDependentSliderModifiedValue(object, 'valueRange', rangeValue);
    },
    
    getSliderMinValueSetting: function(object) {
        minValue = parseFloat(object.attr("min-value"));
        return minValue;
    },
    
    getSliderMaxValueSetting: function(object) {
        maxValue = parseFloat(object.attr("max-value"));
        return maxValue;
    },

    getSliderOptionAllowHigherValue: function(object) {
        value = object.attr("allow-higher-value");
        if (typeof value != "undefined") {
            return value == 'true';
        }
        return false;
    },
    
    setSliderDependentInputValue: function(object, value) {
        object.val(value);
        var sliderObj = $(object.attr("slider-callback"));
        Anti.slidersManager.setSliderValue(sliderObj, value);
        Anti.deleteInterval("slidersManagerDependentCallbackTimeout");
        Anti.addInterval("slidersManagerDependentCallbackTimeout", setTimeout(function(){
            Anti.settingsManager.triggerCallBackFunction(sliderObj, value);
        }, 500));
    },
    
    
    
    getSliderValueByOffset: function(object, leftPosition) {
        var parentObject = $(object.attr("callback-input"));
        var parentWidth = parentObject.outerWidth(true);
        var minValue = this.getSliderMinValueSetting(object);
        var roundTo = object.attr("round-to");
        var valueRange = this.getSliderRangeValue(object);
        var roundPower = Math.pow(10, roundTo);

        value = valueRange * leftPosition / parentWidth;
        return Math.round((value+parseFloat(minValue)) * roundPower)/roundPower;
    },
    
    
    setSliderValue: function(object, value) {
        var parentWidth = $(object.attr("callback-input")).outerWidth(true);
        var minValue = this.getSliderMinValueSetting(object);
        var maxValue = this.getSliderMaxValueSetting(object);
        var valueRange = this.getSliderRangeValue(object);
        
        if (value < minValue) value = minValue;
        if (value > maxValue) value = maxValue;
        
        position = parentWidth / valueRange * (parseFloat(value) - parseFloat(minValue));
        
        var dependencyType = object.attr("dependency-type");
        if (typeof dependencyType != "undefined") {
            if (dependencyType == "left") {
                if (value > minValue) position -= 7;
            }
            if (dependencyType == "right") {
                if (value == maxValue) position += 9;
                else position += 13;
            }
        }
        
        object.css('left', position+'px');
        object.attr("current-value", value);
        Anti.slidersManager.convertSliderPositionToPercents(object);
    },
    
    triggerCallBackInput: function(object, value) {
        //callback input
        var callbackInput = object.attr("callback-input");
        if (typeof callbackInput != "undefined") {
            $(callbackInput).val(value);
        }
    },
    
    
};
    Anti.dialogsManager = {

    allowCloseOnEscape : true,
    closeCallback: function(){},
    confirmFunction: function(){},
    
    init: function(templateName, data, customClass) {
        
        template = Anti.hb(templateName);
        if (typeof data == "object") {
            html = template(data);
        }
        else html = template();
        $(".modal").attr("class","modal");
        if (typeof customClass != "undefined") {
            $(".modal").addClass(customClass);
        }
        Anti.html(html, $(".modal-wrap > .modal"));
        $(".modal-wrap").addClass("active");   
        $(".main-content").addClass("dimmed");
        
        $(".modal .head .close, .modal .btn-cancel").unbind("tap").bind("tap", function(){
            Anti.dialogsManager.close();
        });
        
    },
    
    setCloseCallback: function(callback) {
        Anti.dialogsManager.closeCallback = callback;
    },
    
    close: function() {
        if (!Anti.dialogsManager.allowCloseOnEscape) return;
        $(".modal-wrap").removeClass("active");
        $(".modal-wrap > .modal").html('');
        $(".main-content").removeClass("dimmed");
        var func = Anti.stringToFunction('resizeEvent');
        if (typeof func == "function") {
            func();
        }
        Anti.dialogsManager.closeCallback();
        Anti.dialogsManager.setCloseCallback(function(){});
        Anti.dialogsManager.confirmFunction = function(){};
    },
    
    reload: function() {
        document.location.reload();
    },
    
    message: function(message, title, align, customAction) {
        if (typeof title == "undefined") title = "Notification";
        if (typeof align == "undefined") align = "tac";
        if (typeof customAction == "undefined") customAction = "Anti.dialogsManager.close";
        Anti.dialogsManager.init("dialogManagerMessage", {
            title: title,
            message: message,
            align: align,
            customAction: customAction,
            confirmButtonText: 'OK'
        } );
    },

    showInfoBlock: function(objectId, title, message, closable) {
        var randid = Math.round(Math.random() * 100000);
        $("#"+objectId).show();
        Anti.html(Anti.hb("informationBlock")({
            title: title,
            message: message,
            closable: closable,
            randid: randid
        }), $("#"+objectId));
        $(".btn-hide").bind("tap", function(){
            $("#randid").remove();
        });
    },

    requestConfirmation: function(question, confirmFunction) {
        Anti.dialogsManager.confirmFunction = confirmFunction;
        Anti.dialogsManager.message(
            question,
            'Please confirm',
            'tac',
            'Anti.dialogsManager.finishConfirmation'
        );
    },

    finishConfirmation: function() {
        if (typeof Anti.dialogsManager.confirmFunction == "function") {
            Anti.dialogsManager.confirmFunction();
        }
        Anti.dialogsManager.close();
    }
    
};
    Anti.tableManager = {
    
    template: false,
    data: [],
    options: {},
    templateName                :   '',
    defOptions: {
        object                  :   false,
        enablePaging            :   false,
        pageLimit               :   20,
        currentPage             :   0,
        pagingRendered          :   false,
        rowProcessFunction      :   function(row){return row;},
        fieldProcessFunction    :   function(field, fieldValue){return fieldValue;},
        verticalMargin          :   390,
        rowHeight               :   60,
        processNewLines         :   false,
        autoHeader              :   false,
        autoCell                :   false,
        autoEmpty               :   false,
        headerRowsCount         :   1
    },
    
    setOptions: function(setOptions) {


        if (typeof setOptions.enablePaging != "undefined") {
            if (setOptions.enablePaging == false) {
                setOptions.pageLimit = 500;
            }
        }
        //auto pageLimit
        if (typeof setOptions.pageLimit != "undefined") {
            if (setOptions.pageLimit == "auto") {
                var screenHeight= $(document).innerHeight();
                setOptions.pageLimit = Math.floor( (screenHeight - setOptions.verticalMargin)/setOptions.rowHeight );
                if (setOptions.pageLimit < 5) setOptions.pageLimit = 5;
                Anti.debugstr("setting default pageLimit "+setOptions.pageLimit);
            }
        }
        
        for (key in setOptions) {
            Anti.tableManager.setOption(key, setOptions[key]);
        }
    },
    
    init: function(object, data, templateName) {
        if (templateName == false) {
            templateName = "template" + Math.random();
        }
        this.templateName           = templateName;
        this.data[templateName]     = data;
        this.options[templateName]  = deepObjectCopy(Anti.tableManager.defOptions);
        this.setOption('object', object);


    },

    getHbTemplate: function() {

        if (this.getOptionValue("autoCell")) return Anti.hb("tableManagerAutoRow");

        if (this.getData().length == 0) {
            if (typeof Handlebars.templates[this.templateName+'Empty'] != "undefined") {
                return Anti.hb(this.templateName+'Empty');
            }
            if (this.getOptionValue("autoEmpty")) {
                return Anti.hb('tableManagerAutoEmpty');
            }
            return function(){};
        } else {
            return Anti.hb(this.templateName);
        }
    },
    
    processRow: function(row) {
        
        //data
        resultRow = {};
        for (field in row) {
            fieldValue = row[field];


            if (Anti.tableManager.getOptionValue("autoCell")) {
                if (typeof fieldValue == "object") {
                    fieldValue = JSON.stringify(fieldValue, false, " ");
                }
            }

            if (fieldValue > 147456666 && fieldValue < 2474566668) {
                if (new Date().getFullYear() == new Date(fieldValue * 1000).format("Y")) {
                    resultRow[field + "_dateWithSeconds"] = new Date(fieldValue * 1000).format("j F, H:i:s");
                    resultRow[field + "_dateWithMinutes"] = new Date(fieldValue * 1000).format("j F, H:i");
                    resultRow[field + "_dateSimple"] = new Date(fieldValue * 1000).format("j F");
                } else {
                    resultRow[field + "_dateWithSeconds"] = new Date(fieldValue * 1000).format("j F Y, H:i:s");
                    resultRow[field + "_dateWithMinutes"] = new Date(fieldValue * 1000).format("j F Y, H:i");
                    resultRow[field + "_dateSimple"] = new Date(fieldValue * 1000).format("j F, Y");
                }
                resultRow[field+"_dateWithYear"] = new Date(fieldValue * 1000).format("j F, Y");
            }   
            
            fieldValue = Anti.tableManager.getOptionValue('fieldProcessFunction')(field, fieldValue);

            
            if (Anti.tableManager.getOptionValue('processNewLines')) {
                if (typeof fieldValue == "string") {
                    fieldValue = fieldValue.split("\n").join("<br>");
                }
            }
            resultRow[field] = fieldValue;
        }
        resultRow   =   Anti.tableManager.getOptionValue('rowProcessFunction')(resultRow);
        return resultRow;
        
    },

    prerender: function(tableObject) {
        this.clearTable(tableObject);
        tableObject.next(".paging").remove();
        tableObject.find("thead").after('<tr><td colspan="20" align="center">Loading...</td></tr>');
    },
    
    render: function() {
        var autoHeader      =   this.getOptionValue("autoHeader");
        var object          =   this.getOptionValue('object');
        var renderTableData =   false;
        var html            =   '';
        var template        =   this.getHbTemplate();
        var autoCell        =   this.getOptionValue("autoCell");

        if (this.getData() != false) {
            renderTableData = Anti.tableManager.sliceData();
        }


        if (!renderTableData) {
            html = template({});
        } else {
            for (rowNum in renderTableData) {
                tableRowData = renderTableData[rowNum];
                if (autoCell) tableRowData["afwRowId"] = Math.round(Math.random()*1000000);
                addObject = template(this.processRow(tableRowData));
                html = html + addObject;
            }
        }

        //clearing inner html
        this.clearTable(object);
        if (autoHeader) {
            /*var headerData = [];
            var firstRow = renderTableData[0];
            for (fieldName in firstRow) {
                headerData.push(fieldName);
            }*/
            Anti.html(Anti.hb("tableManagerHeader")(renderTableData[0]), object);
        }

        //inserting table data
        object.find("thead").after(html);

        //activating events
        Anti.bindElementEvents(object);

        //insert paging if required
        this.insertPaging();
    },

    clearTable: function(tableObject) {
        tableObject.find("tr:gt("+(this.getOptionValue('headerRowsCount')-1)+")").remove();
    },
    
    sliceData: function() {
        if (this.getOptionValue('enablePaging') == false) return this.getData();
        sliceStart = this.getOptionValue('pageLimit') * this.getOptionValue('currentPage');
        if (this.getData().length < sliceStart) return [];
        return this.getData().slice(sliceStart, sliceStart+this.getOptionValue('pageLimit'));
    },
    
    insertPaging: function() {
        var templateName = this.templateName;
        var object = this.getOptionValue('object');

        //calculating page count
        var pageCount = Math.ceil(this.getData().length / this.getOptionValue('pageLimit'));

        if (!this.getOptionValue('enablePaging') || this.getData().length == 0) {
            //removing paging on empty data sets or if it is disabled
            object.next(".paging").remove();
            return;
        }

        //don't have to insert paging again
        if (this.getOptionValue('pagingRendered')) return;

        //remove it to recreate new paging
        object.next(".paging").remove();
        if (pageCount == 1) {
            //we have only one page, paging not required
            return;
        }

        if (pageCount > 10) {
            //dropdown box paging
            var pagingDropdownTemplate = Anti.hb("tableManagerDropdownPaging");
            var pages = [];
            for (pageNum = 0; pageNum<pageCount; pageNum++) {
                pages.push({
                    number: pageNum,
                    caption: 'Page '+(pageNum+1)
                });
            }
            let jqueryPager = $(pagingDropdownTemplate({
                pages,
                templateName
            }));
            Anti.dropdownManager.init(jqueryPager);
            object.after(jqueryPager);
        } else {
            //classic paging
            var pagingTemplate = Anti.hb("tableManagerPaging");
            object.after(pagingTemplate);

            //page-by-page navigation
            for (pageNum = 0; pageNum<pageCount; pageNum++) {

                linkObject = $("<a></a>")
                            .addClass("btn")
                            .addClass("not-tab")
                            .attr("page-number",pageNum)
                            .attr("data-template", templateName)
                            .html(pageNum+1)
                            .bind("tap", function() {
                                $(this).parent().find("a").removeClass("active");
                                $(this).addClass("active");
                                Anti.tableManager.switchPage($(this).attr("page-number"), $(this).attr("data-template"));
                            });

                if (pageNum == 0) linkObject.addClass("active");
                $(pagingTemplate).find(".paging > .btn-group").append(linkObject);
            }

            //arrows
            $(pagingTemplate).find(".paging > .arrows > .paging-arrow-left")
                             .bind("tap", function() {
                                 switchPageNum = Anti.tableManager.getOptionValue('currentPage') - 1;
                                 $("a[page-number='"+switchPageNum+"']").trigger("tap");
                             });
            $(pagingTemplate).find(".paging > .arrows > .paging-arrow-right")
                             .bind("tap", function() {
                                 switchPageNum = Anti.tableManager.getOptionValue('currentPage') + 1;
                                 $("a[page-number='"+switchPageNum+"']").trigger("tap");
                             });
        }
        
        this.setOption('pagingRendered', true);
        
    },

    switchDropdownPage: function(templateName, pageNumber) {
        Anti.tableManager.templateName = templateName;
        Anti.tableManager.setOption('currentPage', pageNumber);
        Anti.tableManager.render();
    },
    
    switchPage: function(pageNumber, templateName) {
        pageNumber = parseInt(pageNumber);
        this.templateName = templateName;
        var pageCount = Math.ceil(this.getData().length / this.getOptionValue('pageLimit'));
        if (pageNumber < 0 || pageNumber > pageCount) {
            Anti.debugstr("tableManager: no pages left, pageCount "+pageCount);
            return ;
        }
        this.setOption('currentPage', pageNumber);
        this.render();
    },

    //autoCell function
    showRowData: function(rowId) {
        var rowObject = $("tr[action-parameter='"+rowId+"']");
        data = [];
        rowObject.find("input[type=hidden]").each(function(){
            name = $(this).attr("name");
            if (name != 'afwRowId') {
                data.push({
                    name: name,
                    value: $(this).attr("value")
                });
            }
        });
        Anti.dialogsManager.init("tableManagerRowDetails", data);
    },

    getData: function () {
        if (typeof this.data[this.templateName] != "undefined") {
            return this.data[this.templateName];
        } else{
            return [];
        }
    },

    getOptions: function () {
        return this.options[this.templateName];
    },

    getOptionValue: function (name) {
        if (typeof this.options[this.templateName] == "undefined") {
            return this.defOptions[name];
        }
        if (typeof this.options[this.templateName][name] != "undefined") {
            return this.options[this.templateName][name];
        } else {
            return this.defOptions[name];
        }
    },

    setOption: function(name, value) {
        this.options[this.templateName][name] = value;
    },

    clear: function() {
        this.data       =   [];
        this.options    =   [];
    }
    
};

    Anti.dropdownManager = {

    renderLoadedOptions: function(containerObject, options) {
        //running callback function, setting options, initializing dropdown

        var width = containerObject.attr("width");
        containerObject.css('max-width', width);

        Anti.dropdownManager.initSelect({
            container: containerObject,
            width: width,
            options: options,
            defaultOption: Anti.dropdownManager.getDefaultOption(containerObject, options)
        });
    },

    init: function(object) {
        object.find(".adropdown").each(function(){
            var paramName = $(this).attr("callback-parameter");
            var loaderFunction = $(this).attr("loader-function");
            if (typeof loaderFunction != "undefined") {
                var func = Anti.stringToFunction(loaderFunction)
                if (typeof func == "function") {

                    func($(this), Anti.dropdownManager.renderLoadedOptions);
                } else {
                    Anti.debugstr(sprintf("dropdownManager: function %s not found", loaderFunction));
                }
            } else {

                //hidden options
                options = [];
                $(this).find("option").each(function(){
                    options.push({
                        value: $(this).attr("value"),
                        caption: $(this).html()
                    });
                });
                if (options.length == 0) {
                    Anti.debugstr("adropdown has empty options");
                    return;
                }

                var width = $(this).attr("width");
                $(this).css("max-width", width),
                Anti.dropdownManager.initSelect({
                    container: $(this),
                    width: width,
                    options: options,
                    defaultOption: Anti.dropdownManager.getDefaultOption($(this), options)
                });

            }


            //global bindings to settingsManager
            $(this).bind("remove", function() {
               Anti.settingsManager.unbindSelf($(this).attr("callback-parameter")); 
            });
            
            Anti.settingsManager.settings.push({ type: 'dropdown', parameter: paramName});
        });
    },

    getDefaultOption: function(object, options) {
        var defaultOption = object.attr("default-value");
        if (typeof defaultOption == "undefined") defaultOption = options[0].value;
        if (defaultOption == "") defaultOption = options[0].value;

        //checking if default option exist
        var optionExists = false;
        for (optIndex in options) {
            if (options[optIndex].value == defaultOption) optionExists = true;
        }
        if (!optionExists) {
            if (typeof options[0] != "undefined") {
                defaultOption = options[0].value;
            }
        }
        return defaultOption;
    },
    
    /*
     * options: object of (value, caption)
     * id : id (required)
     * onchange = function(value, id, caption) {}
     * width : default 50%
     * defaultOption: defaul option
     * 
     */
    initSelect: function(settings) {
        if (typeof settings.container == "undefined") {
            console.warn('dropdownManager: container not set');
            return;
        }
        var onchange = typeof settings.onchange != "undefined" ? settings.onchange : false;
        var options = settings.options;
        var width   = typeof settings.width != "undefined" ? settings.width : '50%';
        var containerId = settings.containerId;
        
        settings.container.html('');
        
        var trigger = $('<div></div>');
        trigger.attr('class','trigger');
        trigger.attr('style','max-width:'+width);
        var isTriggerSet = false;
        
        var newUL = $('<ul></ul>');
        newUL.attr('class', 'drop-hidden');
        newUL.attr('style','width:'+width+'; max-width: 100%');
        for (i in options) {
            
            if (typeof settings.defaultOption != "undefined") {
                isTriggerSet = true;
                if (typeof options[i] == "object") {
                    if (options[i].value == settings.defaultOption) isTriggerSet = false;
                } else {
                    if (i == settings.defaultOption) isTriggerSet = false;
                }
                settings.container.attr("default-value", settings.defaultOption);
            }
            
            if (!isTriggerSet) {
                isTriggerSet = true;
                if (typeof options[i] == "object") {
                    trigger.append(document.createTextNode(options[i].caption));
                } else {
                    trigger.append(document.createTextNode(options[i]));
                }
                settings.container.append(trigger);
                trigger.unbind("tap").bind("tap",function() {
                    if ($(this).parent().hasClass("disabled")) {
                        Anti.debugstr("list is disabled");
                        return;
                    }


                    var documentHeight = Math.max( document.body.scrollHeight, document.body.offsetHeight,
                       document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
                    // var domRect = settings.container.offsetTop;
                    var spaceBelow = documentHeight - $(this).offset().top;

                    var doc = document.documentElement;
                    var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
                    var toBottom = ($(this).offset().top - window.innerHeight - top) * -1;

                    var dropdownList = $(this).parent().find("ul");
                    var className = dropdownList.attr("class");
                    $(".drop-visible").removeClass('drop-visible').addClass('drop-hidden');
                    dropdownList.attr("class", className == "drop-visible" ? "drop-hidden" : "drop-visible");
                    if (spaceBelow < 300 || toBottom < 300) {
                        dropdownList.css('margin-top', '-240px');
                    } else {
                        dropdownList.css('margin-top', '0px');
                    }
                });
            }
            
            var newli = $('<li></li>');
            if (typeof options[i] == "object") {
                newli.append(document.createTextNode(options[i].caption));
                newli.attr("data-value", options[i].value);
                newli.attr("data-caption", caption=options[i].caption);
                if (settings.defaultOption == options[i].value) newli.attr("class","adropdown-selected");
            } else {
                newli.append(document.createTextNode(options[i]));
                newli.attr("data-value", i);
                newli.attr("data-caption", options[i]); 
            }
            
            newli.bind("tap", function(){
                $(this).parent().find("li").removeClass("adropdown-selected");
                $(this).addClass("adropdown-selected");
                var value = $(this).attr("data-value");
                containerObject = $(this).parent().parent();
                containerObject.attr("current-value", value);
                Anti.dropdownManager.setTriggerValue(containerObject, $(this), value);
                return false;
            });
            newUL.append(newli);
        }
        settings.container.append(newUL);
        
    },
    
    setTriggerValue : function(containerObject, dropdownListObject, value, fireCallback) {
        if (typeof fireCallback == "undefined") {
            fireCallback = true;
        }
        containerObject.attr("default-value", value);
        var triggerObject = containerObject.find(".trigger");
        if (triggerObject.parent().find("ul").attr("class") == "drop-visible") {
            //closing the trigger
            triggerObject.trigger("tap");
        }
        triggerObject.html(dropdownListObject.html());

        if (fireCallback) {
            Anti.settingsManager.triggerCallBackFunction(containerObject, value);
        }
    },
    
    setValue: function(object, value, fireCallback) {
        object.parent().find('.drop-hidden').find("li").each(function(){
            var liValue = $(this).attr("data-value");
            if (liValue == value) {
                Anti.dropdownManager.setTriggerValue(object, $(this), value, fireCallback);
            }
            object.attr("current-value", value);
        });
    },

    disable: function(object) {
        object.addClass('disabled');
    },

    enable: function(object) {
        object.removeClass('disabled');
    }
    
};
    Anti.fileUpload = {

    options: [],

    init: function(options) {

        //params:
        //name : uploadFile + name input
        //previewObject : preview div
        //hasProgressBar: true/false
        //apiMethod
        //apiParameters

        //events:
        //onStart(name)
        //onProgress(percent)
        //onComplete()

        Anti.fileUpload.options[options.name] = options;
        file = document.getElementById('uploadFile'+options.name);
        if (typeof file != "undefined") {
            //removing files
            file.value = '';
        }

        if (typeof options.hasProgressBar == "undefined") {
            options.hasProgressBar = false;
        } else {
            $("#fileProgressbar"+options.name).hide();
            $("#fileProgressbarValue"+options.name).css('width', '0%');
        }

        if (typeof options.name == "undefined") {
            console.warn('missing name option for fileUpload');
            console.warn(options);
            return false;
        }
        if (typeof options.previewObject != "undefined") {
            Anti.fileUpload.registerClipboardPasteObject(options.previewObject);
        }

        $("#uploadFile"+options.name).unbind("change").bind("change", function(){

            if (typeof options.onStart == "function") {
                options.onStart(options.name);
            }

            var file = document.getElementById('uploadFile'+options.name).files[0];

            Anti.fileUpload.previewFile(file, options);
            Anti.fileUpload.uploadFile(file, options);



        });

    },

    uploadFile: function(file, options) {
        var uploader    = new FileReader();

        uploader.onload = function(event) {

            //showing progressbars
            if (options.hasProgressBar) {
                $("#fileProgressbar"+options.name).slideDown(300);
            }
            Anti.showLoader();

            //adding file contents
            options.apiParameters["data"] = window.btoa(event.target.result);

            authData = Anti.getAuthData();
            if (typeof authData != "boolean") {
                dataset = {
                    auth    :   authData,
                    data    :   options.apiParameters
                };
            }

            $.ajax({
                url: '/api/' + options.apiMethod,
                type: 'POST',
                data: JSON.stringify(dataset),
                dataType:   'json',
                contentType: 'application/json; charset=utf-8',
                xhr: function() {
                    var xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function(event) {
                        if (event.lengthComputable) {
                            perc = Math.round(event.loaded / event.total * 100) + '%';
                            if (options.hasProgressBar) $("#fileProgressbarValue"+options.name).css('width', perc);
                            if (typeof options.onProgress != "undefined") {
                                options.onProgress(perc);
                            }
                        }
                   }, false);

                   return xhr;
                },
                success :   function(result) {
                    data = result.response;
                    Anti.hideLoader();
                    options.onComplete(data);
                    if (options.hasProgressBar) {
                        $("#fileProgressbarValue" + options.name).css('width', '100%');
                        setTimeout(function () {
                            $("#fileProgressbar" + options.name).slideUp(200, function(){
                                $("#fileProgressbarValue"+options.name).css('width', '0%');
                            });
                        }, 500);
                        var cleanPreview = true;
                        if (typeof options.cleanPreview != "undefined") {
                            cleanPreview = options.cleanPreview;
                        }
                        if (typeof options.previewObject != "undefined" && cleanPreview) {
                            options.previewObject.css({
                                'background-image': ""
                            });
                        }
                    }
                }
            });
        };


        uploader.readAsBinaryString(file);
    },

    previewFile: function(file, options) {
        var viewwer     = new FileReader();
        if (typeof options.previewObject != "undefined") {
                viewwer.onload = function (event) {
                    var imgTest = document.createElement("img");
                    document.body.appendChild(imgTest);
                    imgTest.setAttribute("style", "position: absolute; top: -10000px; left: -10000px;");
                    imgTest.setAttribute("src", event.target.result);
                    imgTest.onload = function () {
                        var width = imgTest.naturalWidth;
                        var height = imgTest.naturalHeight;
                        var pasterWidth = options.previewObject[0].offsetWidth;
                        imgTest.remove();
                        ratio = height / width;
                        pasterHeight = ratio * pasterWidth;
                        options.previewObject.css({
                            'background-image': "url('" + event.target.result + "')",
                            'height': pasterHeight + 'px'
                        });
                    };
                };
            }
        viewwer.readAsDataURL(file);
    },

    registerClipboardPasteObject: function(previewObject) {
        $("body").bind("paste", function(e){
            if (typeof e.originalEvent.clipboardData.items == "undefined") return;
            items = e.originalEvent.clipboardData.items;
            for (var i = 0 ; i < items.length ; i++) {
                if (items[i].type.indexOf("image") != -1) {

                    options = Anti.fileUpload.options[previewObject.attr("data-name")];
                    Anti.fileUpload.previewFile(items[i].getAsFile(), options);
                    Anti.fileUpload.uploadFile(items[i].getAsFile(), options);

                }
            }
        });
        previewObject.bind("remove", function(){
            $("body").unbind("paste");
        });
    },

    clear: function() {
        Anti.fileUpload.options = [];
    }

};
    Anti.handlebarsInit = {

    init: function() {
        if (typeof Handlebars == "undefined") {
            Anti.debugstr('could not register Handlebars module');
        }
        Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
            switch (operator) {
                case '!=':
                    return (v1 != v2) ? options.fn(this) : options.inverse(this);
                case '==':
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);
                case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                case '<':
                    return (v1 < v2) ? options.fn(this) : options.inverse(this);
                case '<=':
                    return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                case '>':
                    return (v1 > v2) ? options.fn(this) : options.inverse(this);
                case '>=':
                    return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                case '&&':
                    return (v1 && v2) ? options.fn(this) : options.inverse(this);
                case '||':
                    return (v1 || v2) ? options.fn(this) : options.inverse(this);
                case 'contains':
                    return (v1.indexOf(v2) != -1) ? options.fn(this) : options.inverse(this);
                case 'in':
                    return (v2.indexOf(v1) != -1) ? options.fn(this) : options.inverse(this);
                case 'notin':
                    return (v2.indexOf(v1) != -1) ? options.inverse(this) : options.fn(this);
                default:
                    return options.inverse(this);
            }
        });
        Handlebars.registerHelper("switch", function (value, options) {
            this._switch_value_ = value;
            var html = options.fn(this);
            delete this._switch_value_;
            return html;
        });
        Handlebars.registerHelper("case", function () {
            var args = Array.prototype.slice.call(arguments);

            var options = args.pop();
            var caseValues = args;

            if (caseValues.indexOf(this._switch_value_) === -1) {
                return '';
            } else {
                return options.fn(this);
            }
        });
        Handlebars.registerHelper('nl2br', function (options) {
            var nl2br = (options.fn(this) + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
            return new Handlebars.SafeString(nl2br);
        });
        Handlebars.registerHelper('truncate', function (str, limit, suffix) {
            if (str && typeof str === 'string') {
                var ch = typeof suffix === 'string' ? suffix : '';
                if (str.length > limit) {
                    return new Handlebars.SafeString(str.slice(0, limit - ch.length) + ch);
                }
                return str;
            } else {
                return str;
            }
        });

        Handlebars.registerHelper('replace', function (str, a, b) {
            if (str && typeof str === 'string') {
                if (!a || typeof a !== 'string') return str;
                if (!b || typeof b !== 'string') b = '';
                return str.split(a).join(b);
            }
        });

        $('script[type="text/x-handlebars"]').each(function(){
           id = $(this).attr("id");
           Anti.debugstr('handlebars: compiling a template left in HTML: '+id);
           Anti.hb(id);
        });
        Anti.debugstr('handlebars: init complete');
    }
};



    Anti.firstLoad = function(callback) {
        setTimeout(function(){
            callback()
        }, Anti.isFirstLoad ? 1000 : 0);
        Anti.isFirstLoad = false;
    };
    
    Anti.setLocationParameters = function(parameters, title) {
        Anti.debugstr('setLocationParameters  '+parameters);
        Anti.historyPush(parameters, true);
        if (typeof title != "undefined") {
            Anti.title(title);
        } else {
            Anti.title(Anti.currentClass.windowTitle);
        }
    };

    Anti.blockAutoNavigation = function(source) {
        //Anti.debugstr("blocking auto navigation from "+source, "debug");
        Anti.disableAutoNavigation = true;
        clearInterval(Anti.disableAutoNavigationTimer);
        Anti.disableAutoNavigationTimer = setTimeout(function(){ Anti.disableAutoNavigation = false; },200);
    };
    
    Anti.registerHistoryHandler = function() {
        (function(window,undefined){
            Anti.debugstr("registering history handler");
            
            History.Adapter.bind(window,'popstate',function(e){

                if (typeof Anti.currentClass.navigateEvent != "undefined") {
                    Anti.currentClass.navigateEvent()
                }

                //make sure that state changed by browser buttons
                if (Anti.disableAutoNavigation == true) {
                    Anti.debugstr('blocked auto navigation', "debug");
                    Anti.disableAutoNavigation = false;
                    return true;
                }
                Anti.blockAutoNavigation("historyAdapterEvent");
                
                var navigateLink = false;
                
                if (e.type == 'statechange') {
                    var State = History.getState();
                    navigateLink = State.hash;
                } 
                if (e.type == 'popstate') {
                    navigateLink = Anti.getPanelPath();
                }
                Anti.debugstr('HISTORY: '+e.type+' to '+navigateLink, "debug");
                Anti.navigate(navigateLink.replace('/' + Anti.panelPath + '/', ''), true);
                return true;
            });
            
            

        })(window);
        
    };
    
    
    Anti.historyPush = function(link, isHash) {
        Anti.blockAutoNavigation("historyPush");
        if (isHash == true) {
            if (link == '') {
                setLink = Anti.currentLocation;
            } else {
                setLink = Anti.currentLocation + '/' + link.join("/");
            }
            Anti.debugstr("historyPush: adding hash "+setLink, "debug");

            History.pushState(null, null, setLink);
            Anti.classParameters = link;

        } else {

            link = link.replace('//','/').replace('//','/');
            Anti.debugstr("historyPush: adding path "+link, "debug");
            History.pushState(null, null, link);
        }
    };
    
    Anti.navigate = function(rawlink, skipHistory) {
        
        Anti.debugstr('navigate: '+rawlink);

        if (Anti.topMenuManager.spotLightActive) {
            Anti.topMenuManager.hideSpotLight();
        }

        $("html,body").animate({
            scrollTop: 0
        }, 200);

        Anti.clearAllIntervals();
        Anti.pageSection = '';
        Anti.tabsManager.clear();
        Anti.formsManager.clear();
        Anti.tableManager.clear();
        Anti.fileUpload.clear();
        if (typeof Anti.currentClass.onBeforeNavigate != "undefined") {
            Anti.currentClass.onBeforeNavigate(rawlink);
        }

        Anti.sideMenuManager.hideMobileSideMenu();
        
        //activating menu item
        
        Anti.blockAutoNavigation("navigate");

        var subPaths = rawlink.split("/");
        Anti.currentClass = Anti;
        $$$ = Anti;
        Anti.currentLocation = "/"+Anti.panelPath;

        if (Anti.versionUpdateRequired) {
            document.location.href = Anti.currentLocation+'/'+rawlink;
            return true;
        }

        templateNameArray = [];
        className = '';
        //Anti.debugstr('current Location '+Anti.currentLocation);

        for (subIndex in subPaths) {
            Anti.currentLocation += "/" + subPaths[subIndex];
            templateNameArray.push(subPaths[subIndex]);
            if (Anti.currentClass.hasOwnProperty(subPaths[subIndex])) {
                Anti.classParameters = subPaths.slice(parseInt(subIndex)+1);
                className = subPaths[subIndex];
                //Anti.debugstr('classname = '+className);
                if (className != "") {
                    eval('Anti.currentClass = Anti.' + className);
                    eval('$$$ = Anti.' + className);
                }
                break;
            }
        }
        if (className == '') {
            Anti.debugstr('navigating to default route');
            Anti.navigate(Anti.defaultRoute);
            return false;
        }
        templateName = templateNameArray.slice(0,2).join("_");

        Anti.debugstr('navigate: Anti.currentClass = '+className);
        Anti.sideMenuManager.activateSideBarItemByNavigationPath(templateName.split("_"));
        

        
        if (Anti.currentClassName == className) {
            Anti.debugstr("navigate: we are already on page "+Anti.currentClassName, "debug");
            Anti.sendLocationParametersToClass(Anti.classParameters);
            return ;
        }
        
        if (typeof skipHistory == "undefined") {
            Anti.historyPush("/"+Anti.panelPath+"/"+rawlink, false);
        }
        
        if (Handlebars.templates["hpage_"+templateName] !== undefined) {

            Anti.showLoader(true);

            Anti.currentClassName = className;

            if (typeof Anti.currentClass == "undefined") {
                Anti.debugstr('class '+Anti.currentClass+' not defined');
                return false;
            }
            var contentBox = $("#contentbox");
            Anti.html(Anti.hb("hpage_"+templateName), contentBox);

            //starting binded actions
            if (typeof Anti.currentClass.init == "function") Anti.currentClass.init();
            if (typeof Anti.currentClass.windowTitle != "undefined") Anti.title(Anti.currentClass.windowTitle);
            if (typeof Anti.currentClass.registerTouchEvents == "function") Anti.currentClass.registerTouchEvents();
            if (typeof Anti.currentClass.scaleEvent == "function") Anti.currentClass.scaleEvent();

            if (templateName != 'entrance' && typeof Anti.menu != "undefined") {
                Anti.menu.updateTopMenu();
                if (Anti.activeNotifications) Anti.addInterval("topmenu_update", setInterval("Anti.menu.updateTopMenu();", Anti.notificationsPeriod));
            }

            Anti.sendLocationParametersToClass(Anti.classParameters);

            Anti.disableAutoNavigation = false;
            Anti.failedRedirectsCount = 0;

        } else {
            if (Anti.defaultRoute != null) {
                if (Anti.failedRedirectsCount == 0) {
                    Anti.debugstr('page ' + templateName + ' not found, navingating to default ' + Anti.defaultRoute);
                    Anti.navigate(Anti.defaultRoute);
                    Anti.failedRedirectsCount++;
                } else {
                    Anti.debugstr("seems that there's no default page present")
                }
            }
        }
        
    };
    
    Anti.sendLocationParametersToClass = function(sendParams) {
        if (sendParams.length == 0) parameters = { first: 'default', second: 'default' };
        else parameters = {first: sendParams[0], second: sendParams[1]};
        //Anti.debugstr("sendLocationParametersToClass");
        if (typeof Anti.currentClass.setParameters == "function") {
            Anti.currentClass.setParameters(parameters);
        }
    };
    
    Anti.bindElementEvents = function(object) {
        if (typeof object != "object") {
            object = $(document);
        }

        //tabs
        Anti.tabsManager.init(object);
        
        //forms
        Anti.formsManager.init(object);
        
        //buttons
        Anti.buttonsManager.init(object);
        
        //buttons
        Anti.settingsManager.init(object);
        
        
    };

    Anti.htmlRecords = function(templateName, data, targetObject, rowCallback) {
        template = Anti.hb(templateName);
        html = '';
        for (i in data) {
            if (typeof rowCallback == "function") html += template(rowCallback(data[i]));
            else html += template(data[i]);
        }
        Anti.html(html, targetObject);
    };
    
    Anti.htmlPrepend = function(html, object) {
        object.prepend(html);
        Anti.bindElementEvents(object);
    };
    
    Anti.htmlAppend = function(html, object) {
        object.append(html);
        Anti.bindElementEvents(object);
    };

    Anti.htmlBefore = function(html, object) {
        object.before(html);
        Anti.bindElementEvents(object.parent());
    };

    Anti.htmlAfter = function(html, object) {
        object.after(html);
        Anti.bindElementEvents(object.parent());
    };
    
    Anti.html = function(html, object) {
        object.html(html);
        Anti.bindElementEvents(object);
    };
    
    Anti.switchPageSection = function(section, fadeTime) {
        if (typeof fadeTime == "undefined") fadeTime = 200;
        if (Anti.pageSection == section) return;
        Anti.pageSection = section;
        $(".section:not(#"+section+"Section)")
                        .fadeOut(fadeTime)
                        .promise()
                        .done(function() {
                            $("#"+section+"Section").fadeIn(fadeTime, function(){
                                document.documentElement.scrollTop = 0;
                            });
                        });
    };
    
    
    Anti.showLoader = function(onNavigate) {
        Anti.loaderStartTime = mktime();
        $('body').addClass('loading');
        if (typeof onNavigate != "undefined") {
            if (onNavigate) {
                $("#contentbox").hide();
                Anti.navigationLoader = setTimeout(function() {
                    $("#navigationLoader")
                        .html(Anti.doesUserPrefersDarkMode() ? '<img src="/images/hourglass-anim-dark.gif">' : '<img src="/images/hourglass-anim.gif">')
                        .fadeIn(200);
                },500);
            }
        }
    };
    
    Anti.hideLoader = function(immediately) {
      timedif = 1.8 - (mktime() - Anti.loaderStartTime);
      if (typeof immediately == "boolean") {
          if (immediately) {
              timedif = 0;
          }
      }
      if (timedif < 0) timedif = 0;
      clearInterval(Anti.loaderTimeOut);
      clearInterval(Anti.navigationLoader);
      Anti.loaderTimeOut =
      setTimeout(function(){
         $('body').removeClass('loading');
      }, timedif * 1000);
     $("#contentbox").show();
     $("#navigationLoader").hide();
      
      
    };
    
    Anti.smallLoader = function(isShow) {
        if (typeof isShow != "boolean") isShow = false;
        $(".loader-small").css('opacity', isShow ? 1 : 0);
    };
    
    Anti.clearAllIntervals = function() {
        for (i=0; i<Anti.intervals.length;i++) {
            clearInterval(Anti.intervals[i].id);
        }
        Anti.intervals = [];
    };

    
    Anti.getPanelPath = function () {
        var path = window.location.pathname.replace('/'+Anti.panelPath+'/','')
                     .replace('/'+Anti.panelPath,'');

        if (Anti.currentClassName != "") {
            var cookieLocation = $.cookie("initLocation");
            Anti.removeCookie('initLocation');
            Anti.debugstr('Anti.getPanelPath: initial cookie location: '+cookieLocation);
            if (cookieLocation != "" && typeof cookieLocation != "undefined") {
                Anti.initLocationPath = cookieLocation;
            }
            if (Anti.initLocationPath != "") {
                path = Anti.initLocationPath;
                Anti.initLocationPath = '';
            }
        }
        return path;
    };
    
    Anti.removeCookie = function(name) {
        $.removeCookie(name);
        $.removeCookie(name, {path: "/"});
        $.removeCookie(name, {path: "/panel/"});
        $.removeCookie(name, {path: "/", domain : document.domain });
        $.removeCookie(name, {path: "/", domain : "."+document.domain });
    };
    
    Anti.calculateDistance = function (elem, mouseX, mouseY) {
        return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left+(elem.width()/2)), 2) + Math.pow(mouseY - (elem.offset().top+(elem.height()/2)), 2)));
    };
    
    Anti.addInterval = function(type, id) {
      for (i=0;i<Anti.intervals.length; i++) {
          if (Anti.intervals[i].type == type) Anti.deleteInterval(type);
      }
      var newInterval = { type: type, id: id };
      Anti.intervals.push(newInterval);
    };
    
    Anti.deleteInterval = function(type) {
        var newIntervals = [];
        for (i=0;i<Anti.intervals.length; i++) {
          if (Anti.intervals[i].type == type) {
              clearInterval(Anti.intervals[i].id);
          } else newIntervals.push(Anti.intervals[i]);
        }
        Anti.intervals = newIntervals;
    };
    
    Anti.isMiddleScreen = function() {
        if ($(window).outerWidth() <= Anti.middleWindowSize) return true;
        else return false;
    };
    
    Anti.scrollEvent = function() {
        if (Anti.currentClass == '') return false;
        if (typeof Anti.currentClass.scrollEvent == "function") Anti.currentClass.scrollEvent();
    };

    Anti.blurEventFramework = function() {
        if (typeof Anti.currentClass == 'undefined') return false;
        if (typeof Anti.currentClass.blurEvent == "function") Anti.currentClass.blurEvent();
    };
    
    Anti.focusEventFramework = function() {
        if (typeof Anti.currentClass == 'undefined') return false;
        if (typeof Anti.currentClass.focusEvent == "function") Anti.currentClass.focusEvent();
    };
    
    Anti.scaleEventFramework = function() {
        if (typeof Anti.currentClass.scaleEvent == "function") Anti.currentClass.scaleEvent();
        Anti.settingsManager.resizeEvent();
    };

    Anti.runDoubleScaleEvent = function() {
        clearInterval(Anti.runDubleScaleEventTimer);
        Anti.runDubleScaleEventTimer = setTimeout(function(){
            $(window).trigger("resize");
            setTimeout(function(){
                $(window).trigger("resize");
            }, 100);
        }, 1000);

    };

    Anti.doesUserPrefersDarkMode = function() {
        let userPrefersDark = false;
        if (window.matchMedia) {
            userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return userPrefersDark;
    };
    
    Anti.title = function(title) {
        document.title = title;
        $("#headerTitle").html(title);
    };
    Anti.hb = function(name) {
        if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
            if (Handlebars.templates === undefined) {
                    Handlebars.templates = {};
            }
            var html = $("#"+name).html();
            if (typeof html !== "undefined") {
                if (typeof Handlebars.compile != "undefined") {
                    Anti.debugstr('compiling ' + name + ', size ' + html.length);
                    Handlebars.templates[name] = Handlebars.compile(html);
                } else {
                    Anti.debugstr("handlebars compiler not loaded!");
                }
            } else { 
                console.log("could not find template "+name);
                return false;
            }
            $("#"+name).remove();
        }
        return Handlebars.templates[name];
    };
    
    Anti.getFunctionByString = function(str) {
        var arr = str.split(".");

        var fn = (window || this);
        for (var i = 0, len = arr.length; i < len; i++) {
          if (typeof fn == "undefined") break;
          fn = fn[arr[i]];
        }

        if (typeof fn !== "function") {
          //Anti.debugstr("getFunctionByString: "+str+" is not a function");
          return false;
        }

        return  fn;
    };
    
    Anti.stringToFunction = function(str) {
        var func1 = Anti.getFunctionByString(str);
        if (typeof func1 != "function") {
            //Anti.debugstr("stringToFunction: current class "+Anti.currentClassName+', function '+str+' not found');
            return Anti.getFunctionByString('Anti.'+Anti.currentClassName+'.'+str);
        } else {
            return func1;
        }
    };
    
    Anti.debugstr = function(str) {

        if (document.location.host.indexOf('docker') == -1 && Anti.debugLevel != 'debug') return true;
        if (Date.now() - Anti.lastDebugStamp > 500) console.debug("=============================");
        Anti.lastDebugStamp = Date.now();
        console.debug(new Date().format("i:s   ")+str);

    };
    
    $(document).ready(function() {

        var msie = window.navigator.userAgent.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            alert('Your browser is Internet explorer, which is not compatible with our website. Please use Chrome, Firefox, Safari, Opera or any other modern browser.');
        }
        $("#loadingDiv").html('starting..');
        Anti.handlebarsInit.init();

        Anti.debugstr('registering history handler..');
        Anti.registerHistoryHandler();
        Anti.debugstr('binding to browser..');
        Anti.bindElementEvents();
        
        //menu
        Anti.debugstr('building top menu..');
        Anti.topMenuManager.init();
        Anti.debugstr('building side menu..');
        Anti.sideMenuManager.init();
        
        if (typeof initLoader != "undefined") clearInterval(initLoader);
        $(".timer").remove();




        Anti.debugstr('checking authorization..');
        if (typeof Anti.entrance != "undefined") {
            //this will start navigation
            Anti.entrance.checkAuth();
        } else {
            Anti.debugstr("entrance is undefined, skipping auth check");
        }
        

    });
    
    $(document).keydown(function(e) {
        if (e.which == 27) Anti.dialogsManager.close();
        if (e.ctrlKey && e.which == 13 && typeof Anti.menu.reportTypo != "undefined") {
            if (window.getSelection){ // all modern browsers and IE9+
                selectedText = window.getSelection().toString()
            }
            Anti.menu.reportTypo(selectedText);
        }
    });
    
    $(document).scroll(function(){
        Anti.scrollEvent();
    });

    $(window).resize(function(){
        clearInterval(Anti.transitionEventTimeout);
        Anti.transitionEventTimeout = setTimeout("Anti.scaleEventFramework();",10);
    });

    $(window).bind("focus",function(){
        Anti.focusEventFramework();
    });

    $(window).blur(function(){
        Anti.blurEventFramework();
    });

    
};

// let Anti = AntiFW;

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(m($){18 W=2v.4T,D=2v.4S,F=2v.4R,u=2v.4Q;m V(){C $("<4P/>")};$.N=m(T,c){18 O=$(T),1F,A=V(),1k=V(),I=V().r(V()).r(V()).r(V()),B=V().r(V()).r(V()).r(V()),E=$([]),1K,G,l,17={v:0,l:0},Q,M,1l,1g={v:0,l:0},12=0,1J="1H",2k,2j,1t,1s,S,1B,1A,2o,2n,14,1Q,a,b,j,g,f={a:0,b:0,j:0,g:0,H:0,L:0},2u=R.4O,1M=4N.4M,$p,d,i,o,w,h,2p;m 1n(x){C x+17.v-1g.v};m 1m(y){C y+17.l-1g.l};m 1b(x){C x-17.v+1g.v};m 1a(y){C y-17.l+1g.l};m 1z(3J){C 3J.4L-1g.v};m 1y(3I){C 3I.4K-1g.l};m 13(32){18 1i=32||1t,1h=32||1s;C{a:u(f.a*1i),b:u(f.b*1h),j:u(f.j*1i),g:u(f.g*1h),H:u(f.j*1i)-u(f.a*1i),L:u(f.g*1h)-u(f.b*1h)}};m 23(a,b,j,g,31){18 1i=31||1t,1h=31||1s;f={a:u(a/1i||0),b:u(b/1h||0),j:u(j/1i||0),g:u(g/1h||0)};f.H=f.j-f.a;f.L=f.g-f.b};m 1f(){9(!1F||!O.H()){C}17={v:u(O.2t().v),l:u(O.2t().l)};Q=O.2Y();M=O.3H();17.l+=(O.30()-M)>>1;17.v+=(O.2q()-Q)>>1;1B=u(c.4J/1t)||0;1A=u(c.4I/1s)||0;2o=u(F(c.4H/1t||1<<24,Q));2n=u(F(c.4G/1s||1<<24,M));9($().4F=="1.3.2"&&1J=="21"&&!2u["4E"]){17.l+=D(R.1q.2r,2u.2r);17.v+=D(R.1q.2s,2u.2s)}1g=/1H|4D/.1c(1l.q("1p"))?{v:u(1l.2t().v)-1l.2s(),l:u(1l.2t().l)-1l.2r()}:1J=="21"?{v:$(R).2s(),l:$(R).2r()}:{v:0,l:0};G=1n(0);l=1m(0);9(f.j>Q||f.g>M){1U()}};m 1V(3F){9(!1Q){C}A.q({v:1n(f.a),l:1m(f.b)}).r(1k).H(w=f.H).L(h=f.L);1k.r(I).r(E).q({v:0,l:0});I.H(D(w-I.2q()+I.2Y(),0)).L(D(h-I.30()+I.3H(),0));$(B[0]).q({v:G,l:l,H:f.a,L:M});$(B[1]).q({v:G+f.a,l:l,H:w,L:f.b});$(B[2]).q({v:G+f.j,l:l,H:Q-f.j,L:M});$(B[3]).q({v:G+f.a,l:l+f.g,H:w,L:M-f.g});w-=E.2q();h-=E.30();2O(E.3f){15 8:$(E[4]).q({v:w>>1});$(E[5]).q({v:w,l:h>>1});$(E[6]).q({v:w>>1,l:h});$(E[7]).q({l:h>>1});15 4:E.3G(1,3).q({v:w});E.3G(2,4).q({l:h})}9(3F!==Y){9($.N.2Z!=2R){$(R).U($.N.2z,$.N.2Z)}9(c.1T){$(R)[$.N.2z]($.N.2Z=2R)}}9(1j&&I.2q()-I.2Y()==2){I.q("3E",0);3x(m(){I.q("3E","4C")},0)}};m 22(3D){1f();1V(3D);a=1n(f.a);b=1m(f.b);j=1n(f.j);g=1m(f.g)};m 27(2X,2w){c.1P?2X.4B(c.1P,2w):2X.1r()};m 1d(2W){18 x=1b(1z(2W))-f.a,y=1a(1y(2W))-f.b;9(!2p){1f();2p=11;A.1G("4A",m(){2p=Y})}S="";9(c.2D){9(y<=c.1W){S="n"}X{9(y>=f.L-c.1W){S="s"}}9(x<=c.1W){S+="w"}X{9(x>=f.H-c.1W){S+="e"}}}A.q("2V",S?S+"-19":c.26?"4z":"");9(1K){1K.4y()}};m 2S(4x){$("1q").q("2V","");9(c.4w||f.H*f.L==0){27(A.r(B),m(){$(J).1r()})}$(R).U("P",2l);A.P(1d);c.2f(T,13())};m 2C(1X){9(1X.3z!=1){C Y}1f();9(S){$("1q").q("2V",S+"-19");a=1n(f[/w/.1c(S)?"j":"a"]);b=1m(f[/n/.1c(S)?"g":"b"]);$(R).P(2l).1G("1x",2S);A.U("P",1d)}X{9(c.26){2k=G+f.a-1z(1X);2j=l+f.b-1y(1X);A.U("P",1d);$(R).P(2T).1G("1x",m(){c.2f(T,13());$(R).U("P",2T);A.P(1d)})}X{O.1O(1X)}}C Y};m 1w(3C){9(14){9(3C){j=D(G,F(G+Q,a+W(g-b)*14*(j>a||-1)));g=u(D(l,F(l+M,b+W(j-a)/14*(g>b||-1))));j=u(j)}X{g=D(l,F(l+M,b+W(j-a)/14*(g>b||-1)));j=u(D(G,F(G+Q,a+W(g-b)*14*(j>a||-1))));g=u(g)}}};m 1U(){a=F(a,G+Q);b=F(b,l+M);9(W(j-a)<1B){j=a-1B*(j<a||-1);9(j<G){a=G+1B}X{9(j>G+Q){a=G+Q-1B}}}9(W(g-b)<1A){g=b-1A*(g<b||-1);9(g<l){b=l+1A}X{9(g>l+M){b=l+M-1A}}}j=D(G,F(j,G+Q));g=D(l,F(g,l+M));1w(W(j-a)<W(g-b)*14);9(W(j-a)>2o){j=a-2o*(j<a||-1);1w()}9(W(g-b)>2n){g=b-2n*(g<b||-1);1w(11)}f={a:1b(F(a,j)),j:1b(D(a,j)),b:1a(F(b,g)),g:1a(D(b,g)),H:W(j-a),L:W(g-b)};1V();c.2g(T,13())};m 2l(2U){j=/w|e|^$/.1c(S)||14?1z(2U):1n(f.j);g=/n|s|^$/.1c(S)||14?1y(2U):1m(f.g);1U();C Y};m 1v(3B,3A){j=(a=3B)+f.H;g=(b=3A)+f.L;$.2c(f,{a:1b(a),b:1a(b),j:1b(j),g:1a(g)});1V();c.2g(T,13())};m 2T(2m){a=D(G,F(2k+1z(2m),G+Q-f.H));b=D(l,F(2j+1y(2m),l+M-f.L));1v(a,b);2m.4v();C Y};m 2h(){$(R).U("P",2h);1f();j=a;g=b;1U();S="";9(!B.2y(":4u")){A.r(B).1r().2E(c.1P||0)}1Q=11;$(R).U("1x",1N).P(2l).1G("1x",2S);A.U("P",1d);c.3y(T,13())};m 1N(){$(R).U("P",2h).U("1x",1N);27(A.r(B));23(1b(a),1a(b),1b(a),1a(b));9(!(J 4t $.N)){c.2g(T,13());c.2f(T,13())}};m 2A(2i){9(2i.3z!=1||B.2y(":4s")){C Y}1f();2k=a=1z(2i);2j=b=1y(2i);$(R).P(2h).1x(1N);C Y};m 2B(){22(Y)};m 2x(){1F=11;25(c=$.2c({1S:"4r",26:11,20:"1q",2D:11,1W:10,3w:m(){},3y:m(){},2g:m(){},2f:m(){}},c));A.r(B).q({3b:""});9(c.2F){1Q=11;1f();1V();A.r(B).1r().2E(c.1P||0)}3x(m(){c.3w(T,13())},0)};18 2R=m(16){18 k=c.1T,d,t,2N=16.4q;d=!1L(k.2P)&&(16.2e||16.3t.2e)?k.2P:!1L(k.2a)&&16.3u?k.2a:!1L(k.2b)&&16.3v?k.2b:!1L(k.2Q)?k.2Q:10;9(k.2Q=="19"||(k.2b=="19"&&16.3v)||(k.2a=="19"&&16.3u)||(k.2P=="19"&&(16.2e||16.3t.2e))){2O(2N){15 37:d=-d;15 39:t=D(a,j);a=F(a,j);j=D(t+d,a);1w();1u;15 38:d=-d;15 40:t=D(b,g);b=F(b,g);g=D(t+d,b);1w(11);1u;3s:C}1U()}X{a=F(a,j);b=F(b,g);2O(2N){15 37:1v(D(a-d,G),b);1u;15 38:1v(a,D(b-d,l));1u;15 39:1v(a+F(d,Q-1b(j)),b);1u;15 40:1v(a,b+F(d,M-1a(g)));1u;3s:C}}C Y};m 1R(3r,2M){3p(18 2d 4p 2M){9(c[2d]!==1Y){3r.q(2M[2d],c[2d])}}};m 25(K){9(K.20){(1l=$(K.20)).2G(A.r(B))}$.2c(c,K);1f();9(K.2L!=3q){E.1o();E=$([]);i=K.2L?K.2L=="4o"?4:8:0;3g(i--){E=E.r(V())}E.29(c.1S+"-4n").q({1p:"1H",36:0,1I:12+1||1});9(!4m(E.q("H"))>=0){E.H(5).L(5)}9(o=c.2K){E.q({2K:o,2H:"3m"})}1R(E,{3n:"2J-28",3l:"2I-28",3o:"1e"})}1t=c.4l/Q||1;1s=c.4k/M||1;9(K.a!=3q){23(K.a,K.b,K.j,K.g);K.2F=!K.1r}9(K.1T){c.1T=$.2c({2b:1,2a:"19"},K.1T)}B.29(c.1S+"-4j");1k.29(c.1S+"-4i");3p(i=0;i++<4;){$(I[i-1]).29(c.1S+"-2J"+i)}1R(1k,{4h:"2I-28",4g:"1e"});1R(I,{3o:"1e",2K:"2J-H"});1R(B,{4f:"2I-28",4e:"1e"});9(o=c.3n){$(I[0]).q({2H:"3m",3k:o})}9(o=c.3l){$(I[1]).q({2H:"4d",3k:o})}A.2G(1k.r(I).r(1K)).2G(E);9(1j){9(o=(B.q("3j")||"").3i(/1e=(\\d+)/)){B.q("1e",o[1]/1Z)}9(o=(I.q("3j")||"").3i(/1e=(\\d+)/)){I.q("1e",o[1]/1Z)}}9(K.1r){27(A.r(B))}X{9(K.2F&&1F){1Q=11;A.r(B).2E(c.1P||0);22()}}14=(d=(c.4c||"").4b(/:/))[0]/d[1];O.r(B).U("1O",2A);9(c.1E||c.1D===Y){A.U("P",1d).U("1O",2C);$(3h).U("19",2B)}X{9(c.1D||c.1E===Y){9(c.2D||c.26){A.P(1d).1O(2C)}$(3h).19(2B)}9(!c.4a){O.r(B).1O(2A)}}c.1D=c.1E=1Y};J.1o=m(){25({1E:11});A.r(B).1o()};J.49=m(){C c};J.33=25;J.48=13;J.47=23;J.46=1N;J.45=22;18 1j=(/44 ([\\w.]+)/i.43(1M)||[])[1],3c=/42/i.1c(1M),3d=/41/i.1c(1M)&&!/3Z/i.1c(1M);$p=O;3g($p.3f){12=D(12,!1L($p.q("z-3e"))?$p.q("z-3e"):12);9($p.q("1p")=="21"){1J="21"}$p=$p.20(":3Y(1q)")}12=c.1I||12;9(1j){O.3X("3W","3V")}$.N.2z=1j||3d?"3U":"3T";9(3c){1K=V().q({H:"1Z%",L:"1Z%",1p:"1H",1I:12+2||2})}A.r(B).q({3b:"3a",1p:1J,3S:"3a",1I:12||"0"});A.q({1I:12+2||2});1k.r(I).q({1p:"1H",36:0});T.35||T.3R=="35"||!O.2y("3Q")?2x():O.1G("3P",2x);9(!1F&&1j&&1j>=7){T.34=T.34}};$.2w.N=m(Z){Z=Z||{};J.3O(m(){9($(J).1C("N")){9(Z.1o){$(J).1C("N").1o();$(J).3N("N")}X{$(J).1C("N").33(Z)}}X{9(!Z.1o){9(Z.1D===1Y&&Z.1E===1Y){Z.1D=11}$(J).1C("N",3M $.N(J,Z))}}});9(Z.3L){C $(J).1C("N")}C J}})(3K);',62,304,'|||||||||if|x1|y1|_7|||_23|y2|||x2||top|function||||css|add|||_4|left|||||_a|_d|return|_2|_e|_3|_10|width|_c|this|_55|height|_13|imgAreaSelect|_8|mousemove|_12|document|_1c|_6|unbind|_5|_1|else|false|_58||true|_16|_2c|_21|case|_50|_11|var|resize|_29|_28|test|_3a|opacity|_30|_15|sy|sx|_35|_b|_14|_27|_26|remove|position|body|hide|_1b|_1a|break|_45|_42|mouseup|evY|evX|_1e|_1d|data|enable|disable|_9|one|absolute|zIndex|_17|_f|isNaN|ua|_4a|mousedown|fadeSpeed|_22|_51|classPrefix|keys|_31|_32|resizeMargin|_40|undefined|100|parent|fixed|_36|_2e||_4f|movable|_38|color|addClass|ctrl|shift|extend|_54|altKey|onSelectEnd|onSelectChange|_49|_4c|_19|_18|_3e|_48|_20|_1f|_25|outerWidth|scrollTop|scrollLeft|offset|_24|Math|fn|_4e|is|keyPress|_4b|_4d|_3f|resizable|fadeIn|show|append|borderStyle|background|border|borderWidth|handles|_53|key|switch|alt|arrows|_34|_3c|_41|_44|cursor|_3b|_39|innerWidth|onKeyPress|outerHeight|_2f|_2d|setOptions|src|complete|fontSize||||hidden|visibility|_56|_57|index|length|while|window|match|filter|borderColor|borderColor2|solid|borderColor1|borderOpacity|for|null|_52|default|originalEvent|ctrlKey|shiftKey|onInit|setTimeout|onSelectStart|which|_47|_46|_43|_37|margin|_33|slice|innerHeight|_2b|_2a|jQuery|instance|new|removeData|each|load|img|readyState|overflow|keypress|keydown|on|unselectable|attr|not|chrome||webkit|opera|exec|msie|update|cancelSelection|setSelection|getSelection|getOptions|persistent|split|aspectRatio|dashed|outerOpacity|outerColor|selectionOpacity|selectionColor|selection|outer|imageHeight|imageWidth|parseInt|handle|corners|in|keyCode|imgareaselect|animated|instanceof|visible|preventDefault|autoHide|_3d|toggle|move|mouseout|fadeOut|auto|relative|getBoundingClientRect|jquery|maxHeight|maxWidth|minHeight|minWidth|pageY|pageX|userAgent|navigator|documentElement|div|round|min|max|abs'.split('|')))