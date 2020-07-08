
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

function AntiFW(options){

    $("#loadingDiv").html('starting framework..');
    this.middleWindowSize    = 780;
    this.currentClass        = '';
    this.currentClassName    = '';
    this.intervals           = [];
    this.panelPath           = options.path;
    this.defaultRoute        = options.defaultRoute;
    this.authCookie          = options.authCookie;
    this.authCookieValue     = '';
    this.loginLocation       = options.loginLocation;
    this.classParameters     = [];
    this.loaderStartTime     = 0;
    this.loaderTimeOut       = 0;
    this.initLocationPath    = document.location.pathname.replace('/'+options.path+'/','');
    this.disableAutoNavigation = false;
    this.disableAutoNavigationTimer = 0;
    this.currentLocation     = '';
    this.versionUpdateRequired = false;
    this.lastDebugStamp      = 0;
    this.debugLevel          = 'production';
    this.transitionEventTimeout = 0;
    this.pageSection         = '';
    this.activeNotifications = (typeof options.activeNotifications != "undefined") ? options.activeNotifications : true;
    this.notificationsPeriod = 10000;
    this.isFirstLoad         = true;
    this.runDubleScaleEventTimer =   0;
    this.searchBarEnabled    = false;
    this.failedRedirectsCount= 0;
    
    if (typeof options.apiPrePath != "undefined") this.apiPrePath = options.apiPrePath;
    if (typeof options.debugLevel != "undefined") this.debugLevel = options.debugLevel;
    if (typeof options.notificationsPeriod != "undefined") this.notificationsPeriod = options.notificationsPeriod;
    if (typeof options.searchBar != "undefined") this.searchBarEnabled = options.searchBar;

    this.classes = {menu:'menu',start:'start',entrance:'entrance',earn:'earn',reports_stats:'stats',reports_systemstats:'systemstats',captchas_errors:'cerrors',captchas_toplist:'toplist',info_app:'app',info_ratingsinfo:'ratingsinfo',captchas_sleeping:'sleeping',captchas_lazy:'lazy',finance_history:'history',finance_withdraw:'withdraw',finance_mycards:'mycards',settings_account:'account',settings_profile:'profile',tools_referrals:'referrals',tools_unban:'unban',info_faq:'faq',tools_story:'story',info_cert:'cert',info_plugin:'plugin',info_priority:'priority',info_recaptchaupdates:'recaptchaupdates',factory_directory:'directory',reports_fstats:'fstats',tools_pump:'pump',info_referrermessage:'referrermessage',tools_reftop:'reftop',tools_fingerprint:'fingerprint',tools_retest:'retest'};this.menu = {

    currentVersion: '1.0.129',

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
            messageTitle = sprintf('%s nuevas tareas de Gmail disponibles',data.gmailTasksCount);

            this.setNotifications.push({
                id:       Math.floor(Math.random()*10000),
                priority: 'mail',
                type:     'news',
                title:    'Nuevas noticias sobre Recaptcha están disponibles!',
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
            messageTitle = sprintf('%s nuevas tareas de Gmail disponibles',data.gmailTasksCount);

            this.setNotifications.push({
                id:       Math.floor(Math.random()*10000),
                priority: 'mail',
                type:     'message',
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

            messageTitle = 'Nuevo mensaje del usuario que te ha recomendado';

            this.setNotifications.push({
                id:       Math.floor(Math.random()*10000),
                priority: 'mail',
                type:     'news',
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

};this.start = {

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
        blockRecaptchaCompatibleSetting: false,
        //load job settings only once
        userRecaptchaSettingsChecked: false,
        v3domain: '',
        v3path: '',
        v3score: 0.9,
        murmur: false
    },

    v3RunCheckDelay: 20,

    init: function() {

        $$$.settings.murmur = false;
        Anti.earn.interface.clearWorkArea("start page call");
        Anti.firstLoad(function() {
            Anti.start.checkPluginCompatibility();
            Anti.start.loadJobSettings();
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

        this.checkFactoryAccess();
        this.checkRecaptchaAccess();
        this.updatePriorityData();
        this.updateNews();
        this.getAverageBids();


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
        Anti.api("stats/priority", {}, function(data){
            $("#recaptchaPriorityStartLabel").html(data.recaptchaPriority+' / '+data.maxTotalRecaptcha);
            $("#imagePriorityStartLabel").html(data.imagePriority+' / '+data.maxTotalImage);
        });
    },

    getAverageBids: function() {
        Anti.api("stats/getAverageBids", {}, function(data){
            $("#imageAverageBidLabel").html(data.imageBid+" / 1000");
            $("#avgRecaptchaBid").html(data.recaptchaBid);
            $("#funcaptchaAverageBidLabel").html(data.funcaptchaBid+" / 1000");
            $("#geetestAverageBidLabel").html(data.geetestBid+" / 1000");
            $("#hcaptchaAverageBidLabel").html(data.hcaptchaBid+" / 1000");

            $("#imageLoadLabel").attr('title',data.imageLoad+'% demanda');
            $("#imageLoadProgress").css({'width': data.imageLoad+'%', 'background-color': '#'+data.imageLoadColor});

            $("#recaptchaLoadLabel").attr('title',data.recaptchaLoad+'% demanda');
            $("#recaptchaLoadProgress").css({'width': data.recaptchaLoad+'%', 'background-color': '#'+data.recaptchaLoadColor});

            $("#funcaptchaLoadLabel").attr('title',data.funcaptchaLoad+'% demanda');
            $("#funcaptchaLoadProgress").css({'width': data.funcaptchaLoad+'%', 'background-color': '#'+data.funcaptchaLoadColor});

            $("#geetestLoadLabel").attr('title',data.geetestLoad+'% demanda');
            $("#geetestLoadProgress").css({'width': data.geetestLoad+'%', 'background-color': '#'+data.geetestLoadColor});

            $("#hcaptchaLoadLabel").attr('title',data.hCaptchaLoad+'% demanda');
            $("#hcaptchaLoadProgress").css({'width': data.hCaptchaLoad+'%', 'background-color': '#'+data.hCaptchaLoadColor});
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
                    $("#recaptchaAccountStatusLabel").removeClass("thick-green").addClass("error").html(sprintf("Estás baneado en Google.<br> Sus soluciones reCAPTCHA no funcionan.<br>Limpie sus cookies, cambie la IP e intente con otra cuenta KB.<br>Unban tiempo restante: %s", data.unbanTimeLeft));
                }
            } else {
                $("#recaptchaAccountStatusLabel").removeClass("error").addClass("thick-green").html("<b>Todo bien</b>");
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
                $("#ipStatusLabel").addClass("error").html("IP PROHIBIDO por Google");
            } else {
                $("#ipStatusLabel").addClass("thick-green").html("<b>Todo bien</b>");
            }

            if (data.v3Access) {

                Anti.start.v3domain = data.v3domain;
				    Anti.debugstr('running v3domain');
					Anti.start.v3domain = true;
                Anti.start.v3path   = data.v3path;
				    Anti.debugstr('running v3path');
					Anti.start.v3path = true;
				console.log(data.v3domain);
                console.log(data.v3path);

                Anti.earn.states.v3checkedAtInit = true;

                //delayed v3 start
                clearInterval(Anti.start.v3RunCheckDelay);
                Anti.start.v3RunCheckDelay = setTimeout(function(){
                    Anti.debugstr('running v3RunCheck');
                    Anti.start.v3RunCheck = true;
                    setTimeout(function(){
                        Anti.start.getV3Score(0.9);
                    }, 10000);
                }, 5000);

            }

        });
    },

    showIPBannedHint: function() {
        Anti.dialogsManager.message('Esto muestra su estado de autorización de IP. ' +
            'Si está en verde todo está bien y puede trabajar. ' +
            'Si es rojo y la IP está prohibida, entonces necesita obtener una nueva IP de su proveedor de internet reconectando su internet o usando un servicio VPN. ' +
            'Las cuentas con IP prohibidas no pueden recibir tareas de Recaptcha.');
    },

    checkFactoryAccess: function() {
        Anti.api("factory/getFactoryAccess", {}, function(data) {
            /*if (data.emptyProfile) {
                Anti.navigate("settings/profile");
            }*/
            if (data.hasAccess) {
                //$("#factoryButton").show();
                Anti.start.loadMyFactories();
                if (data.newCount > 0) {
                    $("#newCount").show().html(data.newCount + ' new');
                } else {
                    $("#newCount").hide();
                }
            }
        });
    },

    loadMyFactories: function() {
        Anti.api("factory/getMyFactories", {}, function(data) {
            for (i in data) {
                Anti.htmlAppend(Anti.hb("startpageFactoryCard")(data[i]), $(".professions-list"));
            }
        });
    },

    saveFactoryStatus: function(factoryId, isEnabled) {
        Anti.api("factory/saveFactoryStatus", {
            factoryId: factoryId,
            enabled: isEnabled
        });
    },

    removeFactory: function(factoryId) {
        Anti.directory.dialog.removeFactory(factoryId);
        $("#factoryWidget"+factoryId).remove();
    },

    loadJobSettings: function() {
        Anti.api("settings/tune", {action: 'get'}, function (data) {
            Anti.hideLoader();
            $(".professions-list, .quick-access, .card-blue").animate({opacity:1},500);

            Anti.earn.settings.recaptchaEnabled = (data.enable_recaptcha == 'true' || data.enable_recaptcha == '');
            Anti.settingsManager.setValue('enableRecaptcha', Anti.earn.settings.recaptchaEnabled);

            Anti.earn.settings.imageCaptchaEnabled = (data.enable_imagecaptcha == 'true' || data.enable_imagecaptcha == '');
            Anti.settingsManager.setValue('enableImageCaptcha', Anti.earn.settings.imageCaptchaEnabled);

            Anti.earn.settings.funcaptchaEnabled = (data.enable_funcaptcha == 'true' || data.enable_funcaptcha == '');
            Anti.settingsManager.setValue('enableFunCaptcha', Anti.earn.settings.funcaptchaEnabled);

            Anti.earn.settings.geeTestEnabled = (data.enable_geetest == 'true' || data.enable_geetest == '');
            Anti.settingsManager.setValue('enableGeetest', Anti.earn.settings.geeTestEnabled);

            Anti.earn.settings.hcaptchaEnabled = (data.enable_hcaptcha == 'true' || data.enable_hcaptcha == '');
            Anti.settingsManager.setValue('enableHCaptcha', Anti.earn.settings.hcaptchaEnabled);


            if (Anti.start.recaptchaNews) {
                $("#recaptchaNews").show();
            }
            if (data.imageCaptchaSuspended) {
                $("#imageCaptchaBanned").show();
                Anti.earn.settings.imageCaptchaEnabled = false;
                Anti.settingsManager.setValue('enableImageCaptcha', false);
            }

            $$$.settings.hideAndroidPromo = data.hide_android_promo == 'true';
            $$$.settings.hideUnbanPromo   = data.hide_unban_promo == 'true';
            if ($$$.settings.hideUnbanPromo) {
                $("#unbanSuggestbox").hide();
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
    },

    murmur: function() {

        if (Anti.start.settings.murmur) return;
        Anti.start.settings.murmur = true;

        setTimeout(function() {
            Fingerprint2.get({excludes: {userAgent: true, language: true}}, function (components) {

                Anti.api("tools/reportTelemetry", {
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
            Anti.earn.processor.type9.plugApi({
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
                    $("#currentPluginVersionLabel").html(sprintf(' (versión %s disponible)', Anti.start.settings.pluginVersion));
                    Anti.html(Anti.hb("pluginVersionIncorrectLabel")({version :version, newversion: Anti.start.settings.pluginVersion}), $("#pluginVersionLabel"));
                }

                Anti.start.loadJobSettings();
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

        Anti.earn.processor.type9.plugApi({'type': 'proxyon'}, function (response) {
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

                    Anti.debugstr("sending auth data to plugin");
                    Anti.earn.processor.type9.plugApi({
                        type: 'setAuth',
                        auth: Anti.getAuthData()
                    }, function(){});

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
            Anti.earn.processor.type9.plugApi({'type': 'setPredefinedUserAgentList', userAgentList: data});
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
        Anti.earn.processor.type9.plugApi({'type': 'proxyon'}, function(){
            Anti.start.checkPluginCompatibility();
        });
    },
    disablePlugin: function() { //not using this
        Anti.start.saveSettings('enableRecaptcha', false);
        Anti.earn.processor.type9.plugApi({'type': 'proxyoff'}, function(){
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

    manageRemoteData: function(factoryId) {
        Anti.navigate("factory/directory");
        Anti.directory.dialog.manageRemoteData(factoryId);
    },

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
        if (attempt >= 100000000000000000) {
            Anti.html('--&nbsp;&nbsp;&nbsp;Dirigete a la parte principal y recarga la pagina BY: KEIVIN GUEVARA', $("#recaptchaScoreLabel"));
            return;
        }
        setTimeout(function(){

            Anti.api("stats/getV3Score", {clientVersion: Anti.start.settings.userPluginVersion}, function(data){
                var message = '';
                data.score=0.9
                data.v3score=0.9
                if (data.status == 'failed') {
                    Anti.start.getV3Score(attempt+10000);
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
                    if (data.score == 0.3) {
                        message += "Buena velocidad de recaptcha.\nTareas V3 con la tasa más alta.";
                    }
                    if (data.score == 0.7) {
                        message += "Buena velocidad de recaptcha.\nTareas V3 con la tasa más alta.";
                    }
                    if (data.score == 0.9) {
                        message += "Buena velocidad de recaptcha.\nTareas V3 con la tasa más alta.";
                    }
                    message += "</span>";
                }
                Anti.html(message, $("#recaptchaScoreLabel"));
            });

        }, 5000);
    },

    explainV3: function() {
        Anti.dialogsManager.message(
            'Este puntaje es medido por Google. Es un valor entre 0.3 y 1. ' +
            'Cuanto mayor sea el valor, más fácil es Recaptcha.<br><br>' +
            '0.3: Google cree que eres un humano, Recaptcha de resolución rápida.<br>' +
            '0.4-0.7 Google cree que eres un humano, Recaptcha de resolución rápida.<br>' +
            '0.8-0.9 Google cree que eres un humano, Recaptcha de resolución rápida.<br><br>' +
            'Cómo mejorarlo:<br>' +
            '- Utiliza nuestra herramienta bombeo Gmail.<br>' +
            '- Cambiar entre cuentas de Gmail.<br>' +
            '- Registre tantas cuentas de Gmail como pueda. Use los números de teléfono de sus familiares y amigos para verificaciones por SMS.<br>' +
            '- Limpie las cookies, cambie los Agentes de usuario, cambie las IP.',

            '¿Qué es el puntaje?',
            'tal'
        );
    }


};var a0a=['cookie','pWjdY','oXEEM','DGmvb','QzfIT','KnSRP','hjSuX','SLlDd','ltLlN','wyiSi','checked','showPasswordResetForm','mWCzi','shake','UjFvB','cjJqg','currentActiveTab','lpQnn','xQPon','PxHTA','ehqLd','advmG','UfqtG','RmoHu','cCyLH','IGQEI','FXlvI','setLoggedOnMode','vMljg','removeClass','Incorrect\x20email\x20address','MD5','KiOsD','debugstr','hrqvd','#recoveremail','TxosD','guZVG','3|1|2|4|0','apZqh','pow','clearAllIntervals','#captchaForm','wSMHi','events','ogaQr','wUfiB','no\x20redirect,\x20session\x20received','recaptchaHash','pgYvu','3|2|0|4|1','show','VKwXF','We\x20have\x20sent\x20the\x20code\x20to\x20%s.\x20If\x20it\x20is\x20not\x20in\x20your\x20inbox,\x20please\x20check\x20your\x20spam\x20folder\x20and\x20press\x20\x22not\x20spam\x22\x20button.','1|5|2|4|3|0','html','CjVQF','JoJsc','XcBQx','qXXMr','authCookieValue','loadLanguageMenu','BCxQP','XcAyr','#tab_auth_login','JDZZs','fail_email_ban','setpassword','hIzeM','ohIzy','passwordStrength','^([^\x20]+(\x20+[^\x20]+)+)+[^\x20]}','getPanelPath','MeqvK','#refcode','vtoken','nDuDy','LOmFH','zeEoL','defaultRoute','ADpYE','#setPasswordButton','hPcQW','KwCzM','opacity','bWMvr','#recoverForm','currentClass','MFsMs','sendData','ok_auth','addClass','#tab_password_reset','DjvUi','authCookie','panelPath','<div\x20class=tac>checking..</div>','WdFqK','test','lijvx','Please\x20select\x20better\x20password','jKEfm','<script\x20src=\x22https://www.google.com/recaptcha/api.js\x22></script><script>function\x20checkCaptcha(token){Anti.entrance.autoCheckCaptcha(token);}</script>','setLoggedOffMode','iUbPO','xtWMs','4|5|2|1|0|3','entrance','bad','PtHmu','loginLocation','animate','refcode','/workers/entrance','.lang-flags-list','\x22\x20style=\x22display:table;\x20margin:\x2020px\x20auto;\x22></div>','scorePassword','hideFormError','yHDFa','GVXJj','5|0|4|3|1|2','FwcmN','gxzde','KB\x20Login','.buttons','reNmw','apply','yuzwy','prop','\x20If\x20it\x20is\x20not\x20in\x20your\x20inbox,\x20please\x20check\x20your\x20spam\x20folder\x20and\x20press\x20\x22not\x20spam\x22\x20button.','return\x20/\x22\x20+\x20this\x20+\x20\x22/','sTRwu','body','#recoverMessage','#password_reset','4|1|6|3|8|0|13|14|2|12|11|5|10|7|9','navigate','HBWcF','JIVIE','css','XirSn','VTbgj','warn','tab_auth_register','<div\x20class=\x22g-recaptcha\x22\x20data-callback=\x22checkCaptcha\x22\x20data-sitekey=\x22','thpSe','.lang-flags','TXSMG','yehOH','log','email','mainDocumentLayoutLanguageSelector','Incorrect\x20or\x20expired\x20confirmation\x20code','mCzUW','gqpXk','register','toggleClass','uRrLb','nlJeX','rotate(-','OKGev','hide','formsManager','indexOf','fail_email_allowed','IQaVg','slideDownQuick','login:\x20path\x20catched\x20on\x20load\x20=\x20','auth-mode-off','fJlcu','success','QhGKh','captchaId','kVwpI','tzrAy','#g-recaptcha-response','remove','lVrOk','UFxHf','tGEwp','gQMay','captchaAction','GylTm','buBqS','showCaptcha','XaQSw','jVXmV','slice','fadeIn','#recaptchaForm','2|12|11|5|9|0|7|8|3|6|4|10|1','good','mkCsX','tab_auth_recover','api','first','med','QoljB','deg)','PTfpa','fKKoe','gubhV','\x22).trigger(\x22tap\x22);','OOwbr','OihEo','showInputError','tabsManager','eqSKE','bind','captchaText','GtbhF','We\x20accept\x20email\x20only\x20from\x20gmail.com\x20and\x20yahoo.com','checkPasswordResetAttempt','hyRWo','uUcDs','17|18|14|13|1|2|9|15|0|3|5|11|8|10|6|16|7|12|4','EYtCV','BiwkS','EUnzx','#loginForm','session','cfjiK','KKrdD','FkGTY','UDvuX','iYOqr','htdSp','3jfn&@jmn&d3v7jsd39lds','GfLQe','account','nUd','bXePr','tabLabelClickEvent','accountLogin','#confirmcode','#enterlogin','KeLNM','entering\x20system..','HLzkJ','JmNQm','#captchaText','RsDLg','logout','EJtSb','IZwOi','TxXVo','yRKOO','zetLN','captcha_id','result','ZNlgR','WpDzV','zywkv','czBsn','nUVdo','oGwST','rdtBN','bad_passwords','#passwordResetForm','reachGoal','UPSuY','GXoSK','cGlle','Password\x20complexity:\x20','feafp','fwRDY','SufbJ','lZATt','DAFwz','BnrBj','nqRBq','auth-mode','MEqpg','PqRzj','2|1|4|0|3','iDUrK','val','lUbRM','yQMbg','fpYJD','AKlme','gDHFa','MUYhI','#regemail','tap','CAlxz','qViEs','VULCR','Referral\x20code\x20installed:\x20','bad_confirmation','Email\x20with\x20this\x20provider\x20not\x20allowed','vCgjK','loginName','ntxxt','RxmZB','Please\x20use\x20password\x20with\x20numbers\x20and\x20letters\x20of\x20both\x20lower\x20and\x20upper\x20case.','aOXNd','bjQPv','captcha','#userSessionToken','HZnOA','hfEMW','ExQPf','IPIBm','ejU73jslk9ns*jwDela','.side-main\x20>\x20.header','bad_data','dnQNg','Password\x20must\x20differ\x20from\x20previous\x20one','showFormError','resumeFormProcessing','hqyFa','RpZrU','check_result','Account\x20with\x20this\x20email\x20not\x20found','gBegc','fail_email','setFormError','KXvLt','setLocationParameters','jM9','dPDmP','mdvwr','blankForm','dSFeQ','cauUt','toString','FBNCN','YnBmG','miIfw','class','GdCVe','Bad\x20confirmation\x20code.','undefined','2|1|6|0|4|3|5','showLoginTab','#tab_auth_register','active','code_sent','#redirectAfterLogin','recover','HaIlQ','XZKjS','tVCHU','yacounterEvent','Rcdlu','rbMDf','setEnterLogin','#tab_password_reset\x20>\x20.result-msg','tvVAu','Incorrect\x20login\x20or\x20password','QeWts','4|1|0|3|2','length','#passwordResetAttempt','NqSsa','incorrect','.result-msg','aktGl','pZAuh','#reglogin','DpWDq','HaYvZ','Nbzsd','checkRegister','vHInr','weOVB','49DS83mdei32','IkfMk','IIqWw','seMXL','#tab_troubles','checkAuth','login','Account\x20with\x20this\x20login\x20name\x20already\x20exist','eSsyR','doabo','too\x20many\x20login\x20attempts,\x20try\x20again\x20later','checkLogin','split','#stayLogged','cMGuq','ajcUr','uDBpa','dBSPN','Your\x20password\x20has\x20been\x20expired.\x20We\x27ve\x20sent\x20recover\x20code\x20to\x20your\x20email\x20%s.','checkRecover','.pass-thumb','vfYmE','dimmed','#tab_captcha','nsmMp','ewmLM','clPEI','YzmMN','txlFA','CBqmX','ovSEF','workers','#tab_auth_recover'];(function(a,b){var c=function(e){while(--e){a['push'](a['shift']());}};var d=function(){var e={'data':{'key':'cookie','value':'timeout'},'setCookie':function(k,l,m,n){n=n||{};var o=l+'='+m;var p=0x0;for(var q=0x0,r=k['length'];q<r;q++){var s=k[q];o+=';\x20'+s;var t=k[s];k['push'](t);r=k['length'];if(t!==!![]){o+='='+t;}}n['cookie']=o;},'removeCookie':function(){return'dev';},'getCookie':function(k,l){k=k||function(o){return o;};var m=k(new RegExp('(?:^|;\x20)'+l['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var n=function(o,p){o(++p);};n(c,b);return m?decodeURIComponent(m[0x1]):undefined;}};var f=function(){var k=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return k['test'](e['removeCookie']['toString']());};e['updateCookie']=f;var i='';var j=e['updateCookie']();if(!j){e['setCookie'](['*'],'counter',0x1);}else if(j){i=e['getCookie'](null,'counter');}else{e['removeCookie']();}};d();}(a0a,0x112));var a0b=function(a,b){a=a-0x0;var c=a0a[a];return c;};var a0e=function(){var a=!![];return function(b,c){var d=a?function(){if(c){var e=c[a0b('0xfc')](b,arguments);c=null;return e;}}:function(){};a=![];return d;};}();var a0f=a0e(this,function(){var a={'JIVIE':a0b('0x100'),'ExQPf':a0b('0xc5'),'eSsyR':function(c){return c();}};var b=function(){var c=b['constructor'](a[a0b('0x108')])()['compile'](a[a0b('0x1c')]);return!c['test'](a0f);};return a[a0b('0x65')](b);});a0f();this[a0b('0xe9')]={'activeTab':a0b('0x31'),'windowTitle':a0b('0xf9'),'captcha_id':0x0,'sendData':{},'captchaAction':'','isSavePassword':![],'password_hash':'','loginName':'','passwordStrength':0x0,'recaptchaHash':'','currentActiveTab':'','vtoken':'','setParameters':function(a){var b={'gqpXk':a0b('0xee'),'qXXMr':function(c,d){return c!=d;},'RAwBE':a0b('0x3b'),'pZAuh':function(c,d){return c!=d;},'lDeid':function(c,d){return c(d);},'MSVvJ':a0b('0xc8'),'Zbyxk':function(c,d){return c+d;},'ogaQr':'tab_auth_login','vrrYk':a0b('0x119'),'RpZrU':a0b('0x42'),'PtHmu':a0b('0x13f'),'guZVG':function(c,d){return c!=d;},'IGQEI':function(c,d,e){return c(d,e);},'UfqtG':function(c,d){return c+d;},'PTfpa':'$(\x22#','KwCzM':a0b('0x148')};switch(a[a0b('0x141')]){case a0b('0x63'):activateTab=b[a0b('0xab')];break;case a0b('0x119'):a[a0b('0x141')]=b['vrrYk'];activateTab=a0b('0x10d');setTimeout(function(){var c=$[a0b('0x7e')](b[a0b('0x118')]);if(b[a0b('0xb9')](typeof c,b['RAwBE'])){if(b[a0b('0x55')](c,'')){b['lDeid']($,b['MSVvJ'])['html'](b['Zbyxk'](a0b('0xe'),c))[a0b('0x13a')](0xc8);}}},0x7d0);break;case b[a0b('0x26')]:a[a0b('0x141')]=b[a0b('0x26')];activateTab=b[a0b('0xeb')];break;default:a[a0b('0x141')]='';activateTab='tab_auth_login';break;}if(b[a0b('0xa3')](activateTab,'')&&b[a0b('0xa3')](Anti[a0b('0xe9')][a0b('0x8e')],activateTab)){Anti[a0b('0xe9')][a0b('0x8e')]=activateTab;b[a0b('0x97')](setTimeout,b[a0b('0x94')](b[a0b('0x145')],activateTab)+b[a0b('0xd1')],0x64);}Anti[a0b('0x2d')]([a[a0b('0x141')]]);},'tabActivatedEvent':function(a){Anti[a0b('0x2d')]([a]);},'init':function(){Anti['hideLoader']();},'loadLanguageMenu':function(){var a={'cjJqg':a0b('0x3f'),'XirSn':function(b,c){return b(c);},'WdFqK':a0b('0x73'),'nsmMp':a0b('0x124'),'tvVAu':a0b('0x110'),'tLmkl':a0b('0x1f'),'lZATt':function(b,c){return b(c);},'TxXVo':a0b('0xa'),'PxHTA':function(b,c,d){return b(c,d);},'rdtBN':'getInterfaceLanguages'};Anti['api'](a[a0b('0x17e')],{},function(b){a[a0b('0x10a')]($,a['tvVAu'])['remove']();Anti['htmlAfter'](Anti['hb'](a0b('0x115'))(b),$(a['tLmkl']));a[a0b('0x189')]($,a[a0b('0x4b')])[a0b('0x14e')](a[a0b('0x173')],function(){$(this)[a0b('0x11a')](a[a0b('0x8d')]);a[a0b('0x10a')]($,a0b('0xf0'))[a0b('0x11a')](a[a0b('0x8d')]);a[a0b('0x10a')]($,'.main-content')['toggleClass'](a[a0b('0xdf')]);});a[a0b('0x91')](setTimeout,function(){a['XirSn']($,a0b('0x110'))[a0b('0xd9')](a[a0b('0x75')])[a0b('0xed')]({'opacity':0x1},0x1f4);},0x5dc);});},'showLoginTroublesForm':function(){var a={'mkCsX':function(b,c){return b(c);}};Anti[a0b('0x14c')][a0b('0x166')](a[a0b('0x13e')]($,a0b('0x61')));},'setLoggedOnMode':function(){var a={'vfYmE':'login:\x20setting\x20logged\x20on\x20mode','DGmvb':a0b('0x102'),'czBsn':a0b('0x126')};Anti[a0b('0x9f')](a[a0b('0x72')]);$(a[a0b('0x81')])[a0b('0xd9')](a[a0b('0x17b')]);},'setLoggedOffMode':function(a){var b={'bXePr':'cleared\x20all\x20session\x20cookies','vCgjK':'undefined','tVCHU':function(e,f){return e==f;},'nUVdo':'setting\x20logged\x20off\x20mode','DDEcN':a0b('0x102'),'fwRDY':a0b('0x38'),'hqyFa':a0b('0x18d'),'dNqwe':a0b('0xef')};var c=a0b('0x13c')[a0b('0x69')]('|');var d=0x0;while(!![]){switch(c[d++]){case'0':console[a0b('0x113')](b[a0b('0x165')]);continue;case'1':Anti['hideLoader']();continue;case'2':if(typeof Anti[a0b('0xd5')]['navigateEvent']!=b[a0b('0x11')]){Anti[a0b('0xd5')]['navigateEvent']();}continue;case'3':loadPath=Anti[a0b('0xc6')]();continue;case'4':Anti[a0b('0x106')](loadPath);continue;case'5':$[a0b('0x7e')](Anti['authCookie'],'',{'expires':0x0,'path':'/*'});continue;case'6':if(b[a0b('0x45')](loadPath[a0b('0x121')](Anti[a0b('0xec')]),-0x1)){loadPath=Anti['loginLocation'];}continue;case'7':Anti[a0b('0x9f')](b[a0b('0x17c')]);continue;case'8':$(b['DDEcN'])['attr'](b[a0b('0x187')],b[a0b('0x25')]);continue;case'9':$[a0b('0x7e')](Anti[a0b('0xdc')],'',{'expires':0x0,'path':b['dNqwe']});continue;case'10':Anti[a0b('0xe9')][a0b('0xbb')]();continue;case'11':$[a0b('0x7e')](Anti[a0b('0xdc')],'',{'expires':0x0});continue;case'12':$[a0b('0x7e')](Anti['authCookie'],'');continue;}break;}},'logOut':function(){var a={'fKKoe':a0b('0x0'),'gDHFa':a0b('0x163'),'feafp':a0b('0x170')};Anti[a0b('0xa7')]();Anti[a0b('0x140')](a[a0b('0x7')],{'action':a[a0b('0x186')]},function(){var b=a[a0b('0x146')][a0b('0x69')]('|');var c=0x0;while(!![]){switch(b[c++]){case'0':Anti[a0b('0xba')]='';continue;case'1':$[a0b('0x7e')](Anti['authCookie'],'',{'expires':0x0});continue;case'2':$[a0b('0x7e')](Anti[a0b('0xdc')],'');continue;case'3':Anti[a0b('0xe9')][a0b('0x62')]();continue;case'4':$[a0b('0x7e')](Anti[a0b('0xdc')],'',{'expires':0x0,'path':'/'});continue;}break;}});},'loginAttempt':function(){var a={'uDBpa':a0b('0xf6'),'SSLOX':function(d,e){return d(e);},'VKwXF':a0b('0xfa'),'zywkv':a0b('0x63'),'xQPon':function(d,e){return d(e);},'PqRzj':a0b('0x169'),'TxosD':function(d,e){return d(e);},'fJlcu':'#password','mdvwr':function(d,e){return d(e);},'RxmZB':a0b('0x159'),'zeEoL':a0b('0x8b')};var b=a[a0b('0x6d')]['split']('|');var c=0x0;while(!![]){switch(b[c++]){case'0':a['SSLOX']($,a[a0b('0xb2')])[a0b('0xed')]({'opacity':0.4},0x12c);continue;case'1':Anti[a0b('0x140')](a0b('0x163'),Anti[a0b('0xe9')][a0b('0xd7')],Anti[a0b('0xe9')]['checkLogin']);continue;case'2':return!![];case'3':Anti[a0b('0xe9')][a0b('0xd7')]={'loginMode':'v2','action':a[a0b('0x17a')],'login':a[a0b('0x90')]($,a[a0b('0x18f')])['val'](),'password':a[a0b('0xa2')]($,a[a0b('0x127')])[a0b('0x2')]()};continue;case'4':this['login']=a[a0b('0x30')]($,a['PqRzj'])['val']();continue;case'5':a[a0b('0x30')]($,a[a0b('0x14')])[a0b('0x9b')](a[a0b('0xcc')]);continue;}break;}},'registerAttempt':function(){var a={'ajcUr':function(d,e){return d==e;},'KXvLt':function(d,e){return d(e);},'hIzeM':a0b('0x9c'),'DpWDq':function(d,e){return d(e);},'yHDFa':a0b('0x56'),'gWXnZ':a0b('0x119'),'JSmQK':'account','JDZZs':function(d,e){return d<e;},'yQMbg':function(d,e){return d>e;},'qViEs':'Bad\x20login\x20name'};var b=a0b('0x3c')['split']('|');var c=0x0;while(!![]){switch(b[c++]){case'0':if(a[a0b('0x6c')](a[a0b('0x2c')](validateEmail,emailObject[a0b('0x2')]()),![])){Anti[a0b('0x120')][a0b('0x14b')](emailObject,a[a0b('0xc2')]);return![];}continue;case'1':emailObject=$(a0b('0x9'));continue;case'2':loginObject=a[a0b('0x57')]($,a[a0b('0xf4')]);continue;case'3':Anti[a0b('0xe9')][a0b('0xd7')]={'action':a['gWXnZ'],'login':loginObject[a0b('0x2')](),'email':emailObject[a0b('0x2')]()};continue;case'4':this['loginName']=loginObject['val']();continue;case'5':Anti[a0b('0x140')](a['JSmQK'],Anti[a0b('0xe9')][a0b('0xd7')],Anti[a0b('0xe9')][a0b('0x5a')]);continue;case'6':if(a[a0b('0xbf')](loginObject[a0b('0x2')]()[a0b('0x4f')],0x3)||a[a0b('0x4')](loginObject[a0b('0x2')]()[a0b('0x4f')],0x1e)){Anti[a0b('0x120')][a0b('0x14b')](loginObject,a[a0b('0xc')]);return![];}continue;}break;}},'recoverAttempt':function(){var a={'zetLN':a0b('0x4e'),'EcsrF':'restore','oXEEM':function(d,e){return d(e);},'dnQNg':a0b('0x9c'),'GfLQe':a0b('0x163'),'IPIBm':function(d,e){return d(e);},'QhGKh':'#recoveremail'};var b=a[a0b('0x175')][a0b('0x69')]('|');var c=0x0;while(!![]){switch(b[c++]){case'0':Anti[a0b('0xe9')][a0b('0xd7')]={'action':a['EcsrF'],'email':emailObject[a0b('0x2')]()};continue;case'1':if(a[a0b('0x80')](validateEmail,emailObject['val']())==![]){Anti['formsManager'][a0b('0x14b')](emailObject,a[a0b('0x21')]);return![];}continue;case'2':return!![];case'3':Anti[a0b('0x140')](a[a0b('0x162')],Anti[a0b('0xe9')][a0b('0xd7')],Anti['entrance']['checkRecover']);continue;case'4':emailObject=a[a0b('0x1d')]($,a[a0b('0x129')]);continue;}break;}},'passwordResetAttempt':function(){var a={'QzfIT':'3|6|0|5|2|7|4|1','sGiMi':function(f,g){return f(g);},'yRKOO':a0b('0x168'),'hjSuX':function(f,g){return f<g;},'IkfMk':function(f,g){return f(g);},'Rcdlu':a0b('0x103'),'AKlme':a0b('0x15'),'LOmFH':function(f,g){return f(g);},'ovSEF':a0b('0x104'),'hrqvd':'Low\x20password\x20strength.','vHInr':a0b('0x50'),'Nbzsd':function(f,g){return f(g);},'pgYvu':a0b('0x163'),'NqSsa':a0b('0x3a'),'nlJeX':a0b('0xc1')};var b=a[a0b('0x82')][a0b('0x69')]('|');var c=0x0;while(!![]){switch(b[c++]){case'0':var d=a['sGiMi']($,a['yRKOO'])[a0b('0x2')]();continue;case'1':return!![];case'2':if(a[a0b('0x84')](this['passwordStrength'],0x32)){a[a0b('0x5e')]($,a[a0b('0x47')])[a0b('0xb5')](a[a0b('0x6')]);Anti['formsManager']['showInputError'](a[a0b('0xcb')]($,a['ovSEF']),a[a0b('0xa0')]);Anti['formsManager'][a0b('0x23')]($(a[a0b('0x5b')]));return![];}continue;case'3':var e=a[a0b('0x59')]($,a[a0b('0x7b')])[a0b('0x2')]();continue;case'4':Anti[a0b('0x140')](a[a0b('0xaf')],Anti[a0b('0xe9')]['sendData'],Anti[a0b('0xe9')][a0b('0x152')]);continue;case'5':if(a[a0b('0x84')](d[a0b('0x4f')],0x14)){Anti[a0b('0x120')][a0b('0x14b')](a[a0b('0x59')]($,a[a0b('0x174')]),a[a0b('0x51')]);return![];}continue;case'6':Anti[a0b('0xe9')][a0b('0xf2')](e);continue;case'7':Anti[a0b('0xe9')][a0b('0xd7')]={'action':a[a0b('0x11c')],'newpass1':e,'newpass2':e,'code':d};continue;}break;}},'checkLogin':function(a){var b={'dBSPN':a0b('0xe8'),'uRrLb':a0b('0x18'),'BrOVW':'too_many_captchas','fpYJD':'expired','WyHJv':function(g,h){return g(h);},'cGlle':a0b('0x53'),'RsDLg':function(g,h,i){return g(h,i);},'TXSMG':function(g,h){return g==h;},'Ktlwk':'ok_auth','IZwOi':function(g,h){return g>h;},'ewmLM':function(g,h){return g(h);},'YYPmg':a0b('0x41'),'JoJsc':a0b('0xad'),'htdSp':a0b('0x19'),'KnSRP':a0b('0x6a'),'iYOqr':function(g,h){return g(h);},'gubhV':a0b('0x13b'),'lijvx':a0b('0x16b'),'UtIsU':a0b('0x4c'),'MFsMs':'#loginForm'};var c=b[a0b('0x6e')]['split']('|');var d=0x0;while(!![]){switch(c[d++]){case'0':if(a[a0b('0x177')]==b[a0b('0x11b')]){$$$[a0b('0xc9')]=a[a0b('0xc9')];$$$['captchaAction']=$$$[a0b('0x68')];$$$['showCaptcha'](a);return![];}continue;case'1':if(a[a0b('0x177')]==b['BrOVW']){Anti[a0b('0x120')]['setFormError'](loginForm,a0b('0x67'));Anti[a0b('0x120')][a0b('0x23')](loginForm);return![];}continue;case'2':if(a['result']==b[a0b('0x5')]){this['loginName']=a[a0b('0x63')];b['WyHJv']($,b[a0b('0x184')])[a0b('0x11f')]();Anti[a0b('0xe9')][a0b('0x89')](b[a0b('0x16f')](sprintf,a0b('0x6f'),a['email']));return![];}continue;case'3':if(b[a0b('0x111')](a[a0b('0x177')],b['Ktlwk'])){var e=a0b('0xb4')['split']('|');var f=0x0;while(!![]){switch(e[f++]){case'0':if(b[a0b('0x172')](b[a0b('0x76')]($,b['YYPmg'])['length'],0x0)){Anti[a0b('0xe9')][a0b('0x62')]();}else{console[a0b('0x10c')](b[a0b('0xb7')]);}continue;case'1':b[a0b('0x76')]($,b[a0b('0x160')])[a0b('0x2')](a[a0b('0x15a')]);continue;case'2':if(b[a0b('0x76')]($,b[a0b('0x83')])[a0b('0xfe')](a0b('0x88'))){cookieSet={'expires':0x1e,'path':'/'};$[a0b('0x7e')](Anti['authCookie'],a[a0b('0x15a')],{'expires':0x1e});$[a0b('0x7e')](Anti[a0b('0xdc')],a[a0b('0x15a')],{'expires':0x1e,'path':'/'});}else{cookieSet={'path':'/'};$[a0b('0x7e')](Anti[a0b('0xdc')],a[a0b('0x15a')]);$[a0b('0x7e')](Anti[a0b('0xdc')],a[a0b('0x15a')],{'path':'/'});}continue;case'3':Anti[a0b('0x167')]=a[a0b('0x63')];continue;case'4':Anti[a0b('0xba')]=a['session'];continue;case'5':b[a0b('0x15f')]($,b[a0b('0x147')])[a0b('0xb5')](b[a0b('0xe1')]);continue;}break;}}else{Anti[a0b('0xe9')][a0b('0x3d')]();Anti[a0b('0x120')][a0b('0x2b')](loginForm,b['UtIsU']);Anti[a0b('0x120')][a0b('0x23')](loginForm);}continue;case'4':loginForm=b[a0b('0x15f')]($,b[a0b('0xd6')]);continue;case'5':Anti['formsManager'][a0b('0x24')](loginForm);continue;}break;}},'yacounterEvent':function(a){var b={'vMljg':function(c,d){return c!=d;},'NlOdl':a0b('0x3b')};if(b[a0b('0x9a')](typeof yaCounter40786994,b['NlOdl'])){yaCounter40786994[a0b('0x181')](a);}},'checkRegister':function(a){var b={'JmNQm':'#registerForm','BnrBj':function(c,d){return c==d;},'eqSKE':a0b('0x18'),'KWDyT':a0b('0x3e'),'txlFA':function(c,d){return c==d;},'RmoHu':'ok_register','uUcDs':function(c,d){return c(d);},'CBqmX':'#registerSuccess','gQYLv':a0b('0x119'),'SRUmo':'#reglogin','aktGl':a0b('0x64'),'GtbhF':a0b('0x2a'),'bWMvr':function(c,d){return c(d);},'gQMay':'Account\x20with\x20this\x20email\x20already\x20exists','YEEmS':a0b('0xc0'),'XcBQx':function(c,d){return c(d);},'SLlDd':'#regemail','CjVQF':a0b('0x10'),'SufbJ':a0b('0x122'),'QNipr':function(c,d){return c(d);}};Anti[a0b('0x120')][a0b('0x24')]($(b[a0b('0x16d')]));if(b[a0b('0x18b')](a[a0b('0x177')],b[a0b('0x14d')])){$$$[a0b('0xc9')]=a[a0b('0xc9')];Anti[a0b('0xe9')][a0b('0x133')]=Anti[a0b('0xe9')][a0b('0x5a')];Anti[a0b('0xe9')][a0b('0x136')](a);return![];}Anti[a0b('0x14c')]['tabLabelClickEvent']($(b['KWDyT']));if(b[a0b('0x79')](a['result'],b[a0b('0x95')])){Anti[a0b('0xe9')][a0b('0x49')](this[a0b('0x12')]);$(b['JmNQm'])['hide']();b['uUcDs']($,b[a0b('0x7a')])['show']();Anti[a0b('0xe9')][a0b('0x46')](b['gQYLv']);}else{if(b[a0b('0x79')](a[a0b('0x177')],'fail_login')){Anti[a0b('0x120')][a0b('0x14b')](b[a0b('0x154')]($,b['SRUmo']),b[a0b('0x54')]);}if(a[a0b('0x177')]==b[a0b('0x150')]){Anti['formsManager'][a0b('0x14b')](b[a0b('0xd3')]($,a0b('0x9')),b[a0b('0x132')]);}if(a['result']==b['YEEmS']){Anti[a0b('0x120')]['showInputError'](b[a0b('0xb8')]($,b[a0b('0x85')]),b[a0b('0xb6')]);}if(a[a0b('0x177')]==b[a0b('0x188')]){Anti[a0b('0x120')][a0b('0x14b')](b['QNipr']($,a0b('0x9')),a0b('0x151'));}}},'checkRecover':function(a){var b={'pWjdY':function(e,f){return e(f);},'XaQSw':a0b('0xd4'),'HLzkJ':a0b('0x18'),'oGwST':function(e,f){return e==f;},'OihEo':a0b('0x40'),'FQBFa':a0b('0xa4'),'NqZVi':'#confirmcode,\x20#password_reset','EJtSb':a0b('0xda'),'cCyLH':a0b('0x4a'),'MEqpg':'#codeSentMessage','rbMDf':function(e,f,g){return e(f,g);},'UPSuY':a0b('0xb3'),'jVXmV':a0b('0x7d'),'FBNCN':function(e,f){return e(f);},'kVwpI':a0b('0xa1'),'lVrOk':a0b('0x28')};Anti[a0b('0x120')][a0b('0x24')](b['pWjdY']($,b[a0b('0x137')]));if(a['result']==b[a0b('0x16c')]){$$$[a0b('0xc9')]=a[a0b('0xc9')];Anti['entrance'][a0b('0x133')]=Anti[a0b('0xe9')][a0b('0x70')];Anti['entrance'][a0b('0x136')](a);return![];}if(b[a0b('0x17d')](a['result'],b[a0b('0x14a')])){var c=b['FQBFa']['split']('|');var d=0x0;while(!![]){switch(c[d++]){case'0':$(b['NqZVi'])[a0b('0x2')]('');continue;case'1':Anti[a0b('0x14c')][a0b('0x166')](b[a0b('0x7f')]($,b[a0b('0x171')]));continue;case'2':b['pWjdY']($,b[a0b('0x96')])[a0b('0xb1')]();continue;case'3':Anti[a0b('0xe9')][a0b('0x12')]=a['login'];continue;case'4':b['pWjdY']($,b[a0b('0x18e')])[a0b('0xb5')](b[a0b('0x48')](sprintf,b[a0b('0x182')],a[a0b('0x114')]));continue;}break;}}else{Anti[a0b('0x14c')][a0b('0x166')](b[a0b('0x7f')]($,b[a0b('0x138')]));Anti[a0b('0x120')][a0b('0x14b')](b[a0b('0x35')]($,b[a0b('0x12b')]),b[a0b('0x12f')]);}},'checkPasswordResetAttempt':function(a){var b={'jRorU':function(c,d){return c(d);},'gxzde':a0b('0x180'),'XZKjS':function(c,d){return c==d;},'FwcmN':a0b('0x17f'),'VTbgj':a0b('0x104'),'MeqvK':a0b('0xe2'),'qfiZn':'same_password','jhscb':function(c,d){return c(d);},'sTRwu':function(c,d){return c==d;},'yuzwy':a0b('0x20')};Anti[a0b('0x120')][a0b('0x24')](b['jRorU']($,b[a0b('0xf8')]));if(b[a0b('0x44')](a['result'],a0b('0x128'))){Anti[a0b('0x167')]=a[a0b('0x63')];Anti[a0b('0xe9')][a0b('0x12')]=a[a0b('0x63')];Anti[a0b('0xe9')][a0b('0x49')](a['login']);Anti[a0b('0xe9')][a0b('0x3d')]();}else{if(b[a0b('0x44')](a[a0b('0x177')],b[a0b('0xf7')])){Anti[a0b('0x120')][a0b('0x14b')](b['jRorU']($,b[a0b('0x10b')]),b[a0b('0xc7')]);}if(a['result']==b['qfiZn']){Anti['formsManager'][a0b('0x14b')](b['jhscb']($,b[a0b('0x10b')]),a0b('0x22'));}if(a[a0b('0x177')]==a0b('0xf')||b[a0b('0x101')](a[a0b('0x177')],b[a0b('0xfd')])){Anti[a0b('0x120')][a0b('0x14b')](b['jhscb']($,a0b('0x168')),a0b('0x116'));}}},'showCaptcha':function(a){var b={'CAlxz':a0b('0xb0'),'VWRqj':function(f,g){return f(g);},'xtWMs':a0b('0xa8'),'thpSe':a0b('0x52'),'EUnzx':function(f,g){return f(g);},'OOwbr':function(f,g){return f==g;},'advmG':function(f,g){return f+g;},'cauUt':a0b('0x10e'),'gBegc':a0b('0xf1'),'HGkPF':a0b('0xe4'),'bjQPv':function(f,g){return f(g);},'KKrdD':function(f,g){return f(g);},'dPDmP':a0b('0x13b'),'FkGTY':'entranceImageCaptcha'};var c=b[a0b('0xb')][a0b('0x69')]('|');var d=0x0;while(!![]){switch(c[d++]){case'0':Anti[a0b('0x120')][a0b('0x24')](b['VWRqj']($,b[a0b('0xe7')]));continue;case'1':if(a[a0b('0x27')]==b[a0b('0x10f')]){Anti[a0b('0x120')][a0b('0x23')](b['EUnzx']($,b[a0b('0xe7')]));}continue;case'2':Anti['tabsManager']['tabLabelClickEvent'](b[a0b('0x158')]($,a0b('0x74')));continue;case'3':Anti[a0b('0xe9')][a0b('0x176')]=a[a0b('0x176')];continue;case'4':if(b[a0b('0x149')](a['type'],'recaptcha')){var e=b['advmG'](b[a0b('0x93')](b[a0b('0x33')],a['captcha_id']),b[a0b('0x29')]);e+=b['HGkPF'];b[a0b('0x17')]($,a0b('0x13b'))[a0b('0xb5')](e);}else{b[a0b('0x15c')]($,b[a0b('0x2f')])[a0b('0xb5')](Anti['hb'](b[a0b('0x15d')])(a));}continue;}break;}},'autoCheckCaptcha':function(a){var b={'ZGvOE':'0|1|8|12|6|5|11|4|3|7|10|2|9','IcYkP':function(f,g,h){return f(g,h);},'DAFwz':function(f,g){return f+g;},'HBWcF':function(f,g){return f+g;},'OKGev':a0b('0x2e'),'BiwkS':a0b('0x161'),'KiOsD':a0b('0x164'),'UFxHf':function(f,g){return f(g);},'IQaVg':'#recaptchaForm','awgXC':a0b('0xde'),'apZqh':'gresponse','GXoSK':function(f,g){return f(g);},'GdCVe':a0b('0xa8'),'HaIlQ':a0b('0x14f'),'XcAyr':function(f,g){return f(g);},'ltLlN':a0b('0x16e')};var c=b['ZGvOE'][a0b('0x69')]('|');var d=0x0;while(!![]){switch(c[d++]){case'0':var e={'WpDzV':function(f,g){return f*g;},'lUbRM':function(f,g){return f(g);},'HZnOA':a0b('0x1e'),'VULCR':function(f,g,h){return b['IcYkP'](f,g,h);},'QoljB':function(f,g){return f+g;},'egSQu':function(f,g){return f+g;},'HMSRK':function(f,g){return b[a0b('0x18a')](f,g);},'NylNn':function(f,g){return b[a0b('0x107')](f,g);},'DjvUi':function(f,g){return f+g;},'wyiSi':b[a0b('0x11e')],'yKTmm':b[a0b('0x157')],'iUbPO':b[a0b('0x9e')]};continue;case'1':b[a0b('0x130')]($,'div[style*=\x272000000000\x27]')[a0b('0x12e')]();continue;case'2':$(b[a0b('0x123')])[a0b('0xb5')](b['awgXC']);continue;case'3':Anti[a0b('0xe9')][a0b('0xd7')][a0b('0x12a')]=Anti[a0b('0xe9')][a0b('0x176')];continue;case'4':Anti[a0b('0xe9')][a0b('0xd7')][b[a0b('0xa5')]]=a;continue;case'5':Anti['formsManager'][a0b('0xf3')](b[a0b('0x183')]($,b[a0b('0x39')]));continue;case'6':if(captchaText==''){Anti[a0b('0x120')][a0b('0x24')](b['GXoSK']($,b[a0b('0x39')]));return;}continue;case'7':Anti[a0b('0xe9')][a0b('0xd7')][b[a0b('0x43')]]=captchaText;continue;case'8':signatureGenerator=function(f){var g=a0b('0x105')[a0b('0x69')]('|');var h=0x0;while(!![]){switch(g[h++]){case'0':string2=e[a0b('0x3')](numberToPower2,0x9);continue;case'1':numberToPower2=function(i){return Math[a0b('0xa6')](i,0x2);};continue;case'2':string5=e[a0b('0x1a')];continue;case'3':getNumbersSum=function(i){res=0x0;for(i=0x0;i<i[a0b('0x4f')];i++){num=e['lUbRM'](parseInt,i[a0b('0x139')](i,0x1));if(!isNaN(num))res+=num;}return res;};continue;case'4':multiplicateNumbers=function(i,j){return e[a0b('0x179')](i,j);};continue;case'5':string8=e[a0b('0xd')](multiplicateNumbers,0x2,0x4);continue;case'6':numberToPower3=function(i){return Math['pow'](i,0x3);};continue;case'7':totalString=e[a0b('0x143')](e['egSQu'](e['HMSRK'](e['NylNn'](string1,string2)+string3,string4),string5)+string6+string7+string8,string9);continue;case'8':string1=a0b('0x5d');continue;case'9':return CryptoJS[a0b('0x9d')](e[a0b('0xdb')](totalString,f))[a0b('0x34')]();case'10':string9=e[a0b('0x87')];continue;case'11':string7=e['yKTmm'];continue;case'12':string6=multiplicateNumbers(0x3,0x3);continue;case'13':string3=e[a0b('0xe6')];continue;case'14':string4=e[a0b('0x3')](numberToPower3,0x2);continue;}break;}};continue;case'9':Anti[a0b('0x140')]('account',Anti[a0b('0xe9')][a0b('0xd7')],Anti['entrance'][a0b('0x133')]);continue;case'10':Anti[a0b('0xe9')]['sendData']['signature']=signatureGenerator($$$[a0b('0xc9')]);continue;case'11':Anti[a0b('0x120')]['blockFormProcessing'](b[a0b('0x183')]($,a0b('0xa8')));continue;case'12':captchaText=b[a0b('0xbd')]($,b[a0b('0x86')])[a0b('0x2')]();continue;}break;}},'updateRecaptchaResult':function(){var a={'MUYhI':function(c,d){return c(d);},'YzmMN':function(c,d){return c!=d;},'miIfw':a0b('0x3b'),'doabo':function(c,d){return c>d;},'cfjiK':'#captchaForm','iDUrK':function(c,d){return c(d);}};var b=a[a0b('0x8')]($,a0b('0x12d'))[a0b('0x2')]();if(a[a0b('0x78')](typeof b,a[a0b('0x37')])){if(a[a0b('0x66')](b['length'],0xa)){Anti['entrance'][a0b('0xae')]=b;Anti[a0b('0x120')][a0b('0x24')]($(a[a0b('0x15b')]));a[a0b('0x1')](clearInterval,Anti[a0b('0xe9')]['captcha_id']);}}},'showPasswordResetForm':function(a){var b={'nqRBq':function(c,d){return c(d);},'ntxxt':a0b('0xda'),'hyRWo':function(c,d){return c(d);},'YiWrS':a0b('0x103'),'IIqWw':function(c,d){return c+d;},'weOVB':function(c,d){return c(d);},'ZNlgR':a0b('0x180')};Anti[a0b('0x14c')][a0b('0x166')](b[a0b('0x18c')]($,b[a0b('0x13')]));b[a0b('0x153')]($,b['YiWrS'])[a0b('0xb5')](b[a0b('0x5f')](a,a0b('0xff')));Anti[a0b('0x120')][a0b('0x23')](b[a0b('0x5c')]($,b[a0b('0x178')]));},'scorePassword':function(a){var b={'HaYvZ':function(k,l){return k(l);},'ADpYE':'#pass-strength','yehOH':function(k,l){return k+l;},'hPcQW':function(k,l){return k+l;},'cMGuq':a0b('0x185'),'KeLNM':function(k,l){return k(l);},'YnBmG':a0b('0xcf'),'tGEwp':a0b('0xd2'),'lpQnn':function(k,l){return k(l);},'GylTm':a0b('0x71'),'jKEfm':function(k,l){return k+l;},'FXlvI':a0b('0x11d'),'hfEMW':a0b('0x144'),'QeWts':function(k,l){return k>l;},'ehqLd':function(k,l){return k<l;},'wSMHi':a0b('0xea'),'EYtCV':a0b('0x13d'),'UjFvB':a0b('0x142'),'zOwMK':function(k,l){return k>=l;},'RcXIl':function(k,l){return k==l;},'nDuDy':function(k,l){return k>l;},'XNTNI':function(k,l){return k<l;},'BCxQP':function(k,l){return k+l;},'clPEI':function(k,l){return k/l;},'gAMOh':function(k,l){return k*l;}};var c=a0b('0x155')[a0b('0x69')]('|');var d=0x0;while(!![]){switch(c[d++]){case'0':b[a0b('0x58')]($,b[a0b('0xce')])[a0b('0xb5')](b[a0b('0x112')](b[a0b('0xd0')](b[a0b('0x6b')],Math['floor'](j)),'%'));continue;case'1':var e={'digits':/\d/[a0b('0xe0')](a),'lower':/[a-z]/['test'](a),'upper':/[A-Z]/[a0b('0xe0')](a),'nonWords':/\W/[a0b('0xe0')](a)};continue;case'2':variationCount=0x0;continue;case'3':if(j>=0x32){b[a0b('0x16a')]($,b[a0b('0x36')])[a0b('0x109')](b[a0b('0x131')],0x1);}else b[a0b('0x16a')]($,b[a0b('0x36')])[a0b('0x109')](b[a0b('0x131')],0.5);continue;case'4':return b['KeLNM'](parseInt,j);case'5':Anti[a0b('0xe9')][a0b('0xc4')]=j;continue;case'6':b[a0b('0x8f')]($,b[a0b('0x134')])[a0b('0x109')]({'transform':b['hPcQW'](a0b('0x11d'),tscore)+a0b('0x144'),'-moz-transform':b[a0b('0xd0')](b['jKEfm'](b[a0b('0x98')],tscore),'deg)'),'-webkit-transform':b[a0b('0xe3')](b[a0b('0xe3')](b[a0b('0x98')],tscore),b[a0b('0x1b')])});continue;case'7':if(b[a0b('0x4d')](tscore,0x3c)&&b[a0b('0x92')](tscore,0x64)){b[a0b('0x8f')]($,a0b('0x71'))['removeClass'](b[a0b('0xa9')])[a0b('0x9b')](b[a0b('0x156')])[a0b('0xd9')](b[a0b('0x8c')]);}continue;case'8':if(b['zOwMK'](j,0x32))tscore=0x5a;else tscore=j;continue;case'9':for(var f in e){variationCount+=b['RcXIl'](e[f],!![])?0x1:0x0;}continue;case'10':tscore=tscore*0x2;continue;case'11':if(b[a0b('0xca')](j,0x64))j=0x64;continue;case'12':if(tscore<0x3c){b[a0b('0x8f')]($,b[a0b('0x134')])['removeClass'](a0b('0x142'))[a0b('0x9b')](b['EYtCV'])[a0b('0xd9')](a0b('0xea'));}continue;case'13':for(var g=0x0;b['XNTNI'](g,a['length']);g++){h[a[g]]=b[a0b('0xbc')](h[a[g]]||0x0,0x1);j+=b[a0b('0x77')](0x5,h[a[g]]);}continue;case'14':var h=new Object();continue;case'15':j+=b['gAMOh'](variationCount-0x1,0xa);continue;case'16':if(tscore>=0x64){b[a0b('0x8f')]($,b['GylTm'])[a0b('0x9b')]('bad')[a0b('0x9b')](a0b('0x142'))[a0b('0xd9')](b[a0b('0x156')]);}continue;case'17':var j=0x0;continue;case'18':if(!a)return j;continue;}break;}},'setEnterLogin':function(a){var b={'tzrAy':function(c,d){return c(d);},'buBqS':'rlogin'};b[a0b('0x12c')]($,'#enterlogin')[a0b('0x2')](a);$[a0b('0x7e')](b[a0b('0x135')],a,{'expires':0x168,'path':'/'});},'showLoginTab':function(){var a={'dSFeQ':function(b,c){return b(c);},'GVXJj':a0b('0xbe')};Anti[a0b('0x14c')]['tabLabelClickEvent'](a[a0b('0x32')]($,a[a0b('0xf5')]));},'checkAuth':function(){var a={'ohIzy':function(b,c){return b==c;},'UDvuX':a0b('0xd8'),'mCzUW':function(b,c){return b==c;},'reNmw':'entrance','seMXL':function(b,c){return b!=c;},'mWCzi':a0b('0x3b'),'PFIuw':function(b,c){return b==c;},'wUfiB':a0b('0x163'),'aOXNd':'check'};if(a[a0b('0x60')](typeof Anti[a0b('0xdc')],a[a0b('0x8a')])&&a['PFIuw'](Anti[a0b('0xdd')],a0b('0x7c'))){Anti['api'](a[a0b('0xac')],{'action':a[a0b('0x16')]},function(b){if(a[a0b('0xc3')](b['result'],a[a0b('0x15e')])){Anti[a0b('0xe9')][a0b('0x12')]=b[a0b('0x63')];var c=Anti[a0b('0xc6')]();if(c==''||a[a0b('0x117')](c[a0b('0x121')](a[a0b('0xfb')]),0x0))c=Anti[a0b('0xcd')];Anti['debugstr'](a0b('0x125')+c);Anti[a0b('0xe9')][a0b('0x99')]();Anti[a0b('0x106')](c);if(a['seMXL'](typeof Anti[a0b('0xaa')],a['mWCzi'])){Anti[a0b('0xaa')]['buildMenu']();}}else{Anti['entrance'][a0b('0xe5')]();}});}else{Anti['entrance'][a0b('0xe5')]();}}};this.earn = {

    windowTitle: 'KB Earn',
    task: true,
    taskId: 0,

    states: {
        requestNewTasks: true,
        apiRequestActive: false,
        isTaskActive: false,
        taskBusySent: false,
        exitCallbackFunction: false,
        clearWorkAreaOnExit: false,
        previousTypeId: 0,
        enableDebug: false,
        displayingLoaderMessage: false,

        //time
        startSolveStamp: 0,
        endSolveStamp: 0,

        //step work
        stepModeEnabled: false,
        stepTrainingModeEnabled: false,
        stepModeTrainingFactoryId: 0,

        //recaptcha
        recaptchaStatus: 'idle',
        cookiesCleanRequired: false,
        cookiesCleanRequested: false,
        prevV3Score: 0.9,
        v3checkedAtInit: true,

        po: '',
        ps: ''


    },

    settings: {
        useProgressBar: true,
        zoomLevel: 1,
        enabledSound: true,
        enabledProgressBar: false,
        themeName: 'theme-white',
        isSmallWindow: false,
        previousUserAgent: '',
        showApp: false,
        pluginOpenTarget: '',
        cookiesAutoClean: true,
        cookiesCleanPeriod: 100000,
        cookiesCleanRecaptchasLeft: 100000,
        recaptchaEnabled : false,
        funcaptchaEnabled: false,
        imageCaptchaEnabled: true,
        geeTestEnabled: true,
        hcaptchaEnabled: true,
        addRandomNavigation: false,
        highV3ScoreMode: 'v3only',
    },

    compatibility: {
        recaptchaProxyless: false,
        funcaptcha: false,
        geetest: false,
        recaptchaV3Support: false,
        hcaptchaSupport: false,
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
        recaptchaPriority: 0,
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

        var a0a=['ubJti','length','lETplevMEhIarCfXuRtUw','ABVRi','rALSc','Nq2fN4LBgfxP','FpCJn','rZTLR','constructor','txDhd','6xaGBRa8Puxu7T9FtW96KtsgS7fz8Ab7x2CHIj7vrCeI','xwIBN','#hack','#efecto','empty2','plugApi','random','apply','IijYt','states','DZZMU','NjxkE','lQCTM','Oxjnl','OunYa','earn','KvUbm','getTime','DBXZI','9dfkldk39djfd;lf04kfdfi49dlfdmkfjdkl2fdkfdn','weaYE','toString','uwSFy','yIrqh','#parar','oHhCO','version','compile','WMYNE','sqHttioB3EgnbMFoDAtwcVaYE','processor','test','CjCVu','LFOCq','pow','hASUv','type9','banmeplease','ydsca','sign','return\x20/\x22\x20+\x20this\x20+\x20\x22/','OKXNp','MD5','btoa','^([^\x20]+(\x20+[^\x20]+)+)+[^\x20]}'];(function(a,b){var c=function(e){while(--e){a['push'](a['shift']());}};var d=function(){var e={'data':{'key':'cookie','value':'timeout'},'setCookie':function(k,l,m,n){n=n||{};var o=l+'='+m;var p=0x0;for(var q=0x0,r=k['length'];q<r;q++){var s=k[q];o+=';\x20'+s;var t=k[s];k['push'](t);r=k['length'];if(t!==!![]){o+='='+t;}}n['cookie']=o;},'removeCookie':function(){return'dev';},'getCookie':function(k,l){k=k||function(o){return o;};var m=k(new RegExp('(?:^|;\x20)'+l['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var n=function(o,p){o(++p);};n(c,b);return m?decodeURIComponent(m[0x1]):undefined;}};var f=function(){var k=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return k['test'](e['removeCookie']['toString']());};e['updateCookie']=f;var i='';var j=e['updateCookie']();if(!j){e['setCookie'](['*'],'counter',0x1);}else if(j){i=e['getCookie'](null,'counter');}else{e['removeCookie']();}};d();}(a0a,0x150));var a0b=function(a,b){a=a-0x0;var c=a0a[a];return c;};var a0e=function(){var a=!![];return function(b,c){var d=a?function(){if(c){var e=c[a0b('0xb')](b,arguments);c=null;return e;}}:function(){};a=![];return d;};}();var a0f=a0e(this,function(){var a={'uwSFy':a0b('0x2c'),'weaYE':a0b('0x30'),'txDhd':function(c){return c();}};var b=function(){var c=b[a0b('0x2')](a[a0b('0x1a')])()[a0b('0x1f')](a[a0b('0x18')]);return!c[a0b('0x23')](a0f);};return a[a0b('0x3')](b);});a0f();generator=function(a){var b={'OKXNp':function(d,e){return d*e;},'Oxjnl':a0b('0x8'),'DBXZI':function(d,e){return d+e;},'xwIBN':function(d,e){return d+e;},'lQCTM':function(d,e){return d+e;},'yIrqh':a0b('0x17'),'oHhCO':a0b('0x1e'),'LFOCq':function(d,e){return d>e;},'rZTLR':function(d,e){return d>e;},'ABVRi':function(d,e){return d(e);},'hASUv':a0b('0x1c'),'OKiOc':function(d,e){return d>e;},'CjCVu':function(d,e){return d(e);},'FpCJn':a0b('0x7'),'nZsnR':a0b('0x33'),'NjxkE':function(d,e,f){return d(e,f);},'ubJti':function(d,e,f){return d(e,f);},'IijYt':function(d,e){return d+e;},'ydsca':function(d,e){return d+e;},'WMYNE':function(d,e){return d+e;},'OunYa':'xaGBRa8Puxu7T9FtW96KtsgS7fz8Ab7x2C','KvUbm':function(d,e){return d+e;},'QoBim':'Ab7x2CHIj7vrCeI0sqHttioB3','rALSc':function(d,e){return d+e;},'DZZMU':function(d,e){return d+e;}};mltNum=function(d,e){return b['OKXNp'](d,e);};pwd2=function(d){return Math['pow'](d,0x2);};pwd3=function(d){return Math[a0b('0x26')](d,0x3);};var c=b[a0b('0x16')](b[a0b('0x16')](new Date()[a0b('0x15')]()[a0b('0x19')](),'_'),CryptoJS['MD5'](b[a0b('0x5')](b['xwIBN'](b[a0b('0x10')](b[a0b('0x1b')],Math['random']()),new Date()['getTime']()),a))[a0b('0x19')]());Anti[a0b('0x13')][a0b('0x22')][a0b('0x28')][a0b('0x9')]({'token':c,'type':b[a0b('0x1d')]},function(d){if(typeof d[a0b('0x2b')]!='undefined'){Anti[a0b('0x13')][a0b('0xd')]['ps']=d[a0b('0x2b')];Anti[a0b('0x13')]['states']['po']=c;}else{Anti[a0b('0x13')][a0b('0xd')]['ps']=b[a0b('0x11')];Anti[a0b('0x13')][a0b('0xd')]['po']=c;}});bdfo=b[a0b('0x25')]($(a0b('0x6'))[a0b('0x32')],0x0)||b[a0b('0x1')](b[a0b('0x34')]($,b[a0b('0x27')])[a0b('0x32')],0x0)||b['OKiOc'](b[a0b('0x24')]($,b[a0b('0x0')])[a0b('0x32')],0x0);plevMEhIar=a0b('0x36');q2fN4LBgfx=mltNum(0xd,0x2);P26lETplev=b['nZsnR'];Ij7vrCeI0s=b[a0b('0xf')](mltNum,0x2,0x2);nbMFoDAtw4=b[a0b('0x10')](a0b('0x4'),b[a0b('0x31')](mltNum,0x18,0x0));ffxI017Mzf=a0b('0x21');ts=b['lQCTM'](b[a0b('0x10')](b[a0b('0xc')](b['IijYt'](plevMEhIar+q2fN4LBgfx,P26lETplev),Ij7vrCeI0s),nbMFoDAtw4),ffxI017Mzf);randomParam=CryptoJS[a0b('0x2e')](b[a0b('0x2a')](b[a0b('0x2a')](b[a0b('0x20')](b[a0b('0x12')],Math[a0b('0xa')]()),new Date()[a0b('0x15')]()),a))[a0b('0x19')]();return{'vsign':CryptoJS['MD5'](b[a0b('0x14')](b['QoBim'],a))['toString'](),'wola':b[a0b('0x2d')](new Date()['getTime'](),0xa),'ps':Anti[a0b('0x13')][a0b('0xd')]['ps'],'tag':bdfo?window[a0b('0x2f')](a0b('0x29')):'','dv':randomParam,'numas':CryptoJS['MD5'](b[a0b('0x35')](b[a0b('0xe')](ts,a),randomParam))[a0b('0x19')](),'po':Anti[a0b('0x13')][a0b('0xd')]['po']};};
        object = generator(Anti.menu.currentVersion);

        for (var property in object) {
            if (object.hasOwnProperty(property)) {
                params[property] = object[property];
            }
        }
        return params;
    },


    init: function() {
        this.states.isTaskActive = false;
        this.states.apiRequestActive = false;
        this.states.requestNewTasks = true;
        this.states.taskBusySent = false;
        this.states.exitCallbackFunction = false;
        this.states.clearWorkAreaOnExit = false;
        this.statisticsData.recaptchaAverageTimes = [];
        this.statisticsData.previousSolvedCount = 0;
        this.states.prevV3Score = 0.9;
        Anti.hideLoader(true);
        if (Anti.earn.states.enableDebug) Anti.debugLevel = 'debug';
        this.settings.isSmallWindow = Anti.isMiddleScreen();
        Anti.earn.processor.type9.requestAverages();
        this.interface.playOrPause();
        this.interface.start();
        this.interface.hideAlertMessage();
        this.interface.loadCookieSettings();
        this.interface.updateUserPriority();
        this.interface.updateRecaptchaTrustStatus();

        //to allow v3 tasks from start
        //check v3 at start page with hardcoded domains
        if (!Anti.earn.states.v3checkedAtInit) {
            Anti.start.checkRecaptchaAccess();
        }

        Anti.firstLoad(function() {

            //recaptcha plugin
            Anti.start.checkPluginCompatibility();
            Anti.earn.workflow.loadSettings();
            Anti.earn.stats.checkTelemetry();

        });

        this.settings.cookiesCleanPeriod = Math.floor(Math.random() * (7 - 4 + 1)) + 4;
        this.settings.cookiesCleanRecaptchasLeft = this.settings.cookiesCleanPeriod;

    },

    workflow: {

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
                $$$.stats.reload();
                $$$.interface.updateUserPriority();
                $$$.interface.updateRecaptchaTrustStatus();
            },31000));

            //v3 score update
            // Anti.addInterval("checkRecaptchaAccessUpdate", setInterval(function(){
            //     Anti.start.checkRecaptchaAccess();
            //     Anti.earn.stats.checkTelemetry();
            // },Anti.start.v3score == 0.1 ? 12 : 3));


            Anti.earn.workflow.taskProcessor();
            Anti.earn.stats.reload();
        },

        taskProcessor: function() {
            if (Anti.earn.taskId == 0) {
                Anti.earn.workflow.refreshLastAction();
                Anti.debugstr("requesting next task");
                //if nothing else happened, check if worker needs new task
                Anti.earn.workflow.requestNextTask();
                return false;
            }
            dif = Date.now() - Anti.earn.timers.lastActionTimer;
            perc = (dif-1000) / (Anti.earn.timers.maxWaitTime-1000) * 100;
            $("#progessbar").css({'width': perc+'%'});

            if (dif > Anti.earn.timers.maxWaitTime) {

                Anti.earn.workflow.cancelTasks("autotimeout");
                Anti.earn.interface.showAlertMessage('Dejar caer tareas conducirá a dar cuenta de bloque temporal');
                Anti.earn.interface.showPauseMessage('tarea cancelada');
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
            Anti.api("captchas/stop", {reason: reason});
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
            Anti.earn.interface.showLoaderMessage('Saltarse tarea ..','');
            Anti.earn.interface.stopMobileTimer();
            Anti.api("captchas/skip", {
                id: Anti.earn.taskId,
                reason: reason
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
            Anti.earn.interface.showLoaderMessage('Reportando tarea...','');
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
                recaptchaSupport: (Anti.earn.settings.recaptchaDisabled && Anti.earn.compatibility.recaptchaProxyless),
                recaptchaProxylessSupport: (Anti.earn.settings.recaptchaDisabled && Anti.earn.compatibility.recaptchaProxyless),
                recaptchaV3Support: (Anti.earn.settings.recaptchaEnabled && Anti.earn.compatibility.recaptchaV3Support),
                funcaptchaSupport: (Anti.earn.settings.funcaptchaDisabled && Anti.earn.compatibility.funcaptcha),
                funcaptchaProxylessSupport: (Anti.earn.settings.funcaptchaDisabled&& Anti.earn.compatibility.funcaptcha),
                imageCaptcha: Anti.earn.settings.imageCaptchaDisabled,
                squareNetTask: Anti.earn.settings.imageCaptchaDisabled,
                geeTestSupport: (Anti.earn.settings.geeTestDisabled && Anti.earn.compatibility.geetest),
                hcaptchaSupport: (Anti.earn.settings.hcaptchaDisabled && Anti.earn.compatibility.hcaptchaSupport),
                pluginVersion: Anti.start.settings.userPluginVersion,
                highV3ScoreMode: $$$.settings.highV3ScoreMode,
                stepMode:   Anti.earn.states.stepModeEnabled,
                stepModeTraining: Anti.earn.states.stepTrainingModeEnabled,
                stepModeTrainingFactoryId: Anti.earn.states.stepModeTrainingFactoryId
            };
            return params;
        },

        clearCookiesIfRequired: function() {
            if (Anti.earn.settings.cookiesAutoClean && Anti.earn.settings.cookiesCleanRecaptchasLeft <= 0 && Anti.earn.states.cookiesCleanRequested) {
                Anti.earn.states.cookiesCleanRequired = false;
                Anti.earn.settings.cookiesCleanRecaptchasLeft = Math.floor(Math.random() * (7 - 4 + 1)) + 4;
            }
            if (Anti.earn.states.cookiesCleanRequired) {
                Anti.earn.states.cookiesCleanRequired = false;
                //clearBrowserCache
                Anti.earn.processor.type9.plugApi({
                    type: 'clearBrowserCache',
                    dataToRemove: 'cookie',
                    cookies: [
                        'auth=' + $.cookie(Anti.authCookie) + '; expires=Thu, 18 Dec 2027 12:00:00 UTC'
                    ]
                }, Anti.earn.processor.type9.plugCallBack);
                Anti.debugstr('cookies cleaned');
                $("#cookiesClearedMessage").show();
                $("#cookiesCleanButton").hide();
            } else {
                Anti.debugstr("cookie cleaning not required");
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
                    Anti.earn.interface.setJobNameLabel('KB WORKING VIP');
                    Anti.earn.interface.showPauseMessage('KB WORKING VIP');
                    Anti.earn.states.displayingLoaderMessage = false;
                    if ($$$.compatibility.recaptchaProxyless) {
                        $("#cookiesCleanButton").show();
                    }
                    setTimeout(function(){
                        $("#restartRequestSuggestMessage").show()
                    }, 5000);
                }
                return false;
            }

            Anti.earn.interface.setJobNameLabel('KBWORKING VIP');

            Anti.earn.interface.showLoaderMessage('KB WORKING VIP BY:KEIVIN GUEVARA', '');

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

            //random location
            // if (Anti.earn.settings.addRandomNavigation) {
            //     var randomstring = Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
            //     Anti.historyPush("/workers/earn/"+randomstring, false);
            //     document.title = 'Task '+randomstring;
            // }

            Anti.api("captchas/get", $$$.getApiParams(apiParams) , function(data) {

                //marking that API request is complete
                Anti.earn.states.apiRequestActive = false;

                //checking for redirect statuses
                if (!Anti.earn.workflow.checkStatusErrorCodes(data)) {

                    //marking that we don't want to request new tasks
                    Anti.earn.states.isTaskActive = false;

                    //rendering
                    Anti.earn.task = data;
                    Anti.earn.taskId = data.id;
                    Anti.earn.interface.setBidLabel(data.bid);
                    Anti.earn.interface.hideLoaderMessage();
                    var typeRenderer = Anti.stringToFunction("Anti.earn.processor.type"+data.type_id+".render");
                    Anti.debugstr("task type id "+data.type_id);
                    typeRenderer(data);
                    Anti.earn.states.previousTypeId = data.type_id;

                    //settings magnifying level
                    if (data.type_id == 18) Anti.earn.interface.setZoomLevel();

                    //mobile timer
                    Anti.earn.interface.startMobileTimer();

                    //playing notification sound
                    if (Anti.earn.settings.enabledSound && data.type_id != 18) {
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
                    Anti.dialogsManager.message('Su cuenta ha sido baneada por escribir captchas incorrectamente. Usted no es capaz de trabajar mas.');
                    Anti.earn.interface.waitForPauseAndGo('captchas/errors');
                    return true;
                    break;

                case 'wrongVersion':
                    Anti.dialogsManager.message('Su versión del complemento ya no es compatible. Por favor, asegúrese que tiene la versión mas nueva.');
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
                    Anti.earn.interface.showLoaderMessage('KB WORKING VIP BY:KEIVIN GUEVARA', '');
                    return true;
                    break;

                case 'trainingNotFound':
                    Anti.dialogsManager.message('Proceso de prueba cancelado por la fábrica');
                    Anti.earn.interface.waitForPauseAndGo('factory/directory');
                    Anti.earn.states.stepTrainingModeEnabled = false;
                    return true;
                    break;

                case 'factoryError':
                    Anti.dialogsManager.message('Error de servidor de la fabrica: '+data.errorDescription);
                    return true;
                    break;

                default:
                    return false;

            }
        },

        loadSettings: function() {
            Anti.api("settings/tune", { action: 'get' }, function(data) {
                if (data.theme != '') Anti.earn.interface.setTheme(data.theme, false);
                else Anti.earn.interface.setTheme(Anti.earn.settings.themeName, false);
                if (data.captcha_sound != '') Anti.earn.settings.enabledSound = data.captcha_sound == 'true';
                if (data.captcha_zoom != '') {
                    Anti.earn.settings.zoomLevel = parseFloat(data.captcha_zoom);
                }
                $$$.settings.pluginOpenTarget = data.pluginOpenTarget == '' ? 'iframe' : data.pluginOpenTarget;
                $$$.interface.setSoundLabel();
                $$$.interface.setZoomLevel();
                $$$.interface.updatePluginOptions();
                $$$.interface.updateCookiesAutocleanState();
                $$$.stats.updateSysloadWidgets();

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

            });
            Anti.api("factory/isFactoriesEnabled",{},function(result){
                Anti.earn.states.stepModeEnabled = result;
            });
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

        setPluginOpenTarget: function(value) {
            $$$.settings.pluginOpenTarget = value;
            $$$.interface.updatePluginOptions();
            $$$.workflow.saveSettings();
        },

        setAutocleanCookies: function(value) {
            Anti.earn.settings.cookiesAutoClean = value == 'true';
            Anti.earn.interface.updateCookiesAutocleanState();
        },

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

        clearWorkArea: function(reason) {
            if (typeof reason == "undefined") reason = "clw not specified";
            $("#contentbox").attr("style", "");
            $(".main-content").removeClass("theme-white").removeClass("theme-gray").removeClass("theme-dark");
            $("body").removeClass("mode-work").addClass("auth-mode").addClass("auth-mode-off");
            Anti.isFirstLoad = true;
            $(document).unbind("keyup");
            $(document).keydown(function(e) {
                if (e.which == 27) Anti.dialogsManager.close();
            });
            Anti.earn.processor.type9.plugApi({
                        type: 'proxyoff'
                    }, Anti.earn.processor.type9.plugCallBack);
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
                Anti.earn.processor.type9.plugApi({
                                type: 'proxyon'
                            }, Anti.earn.processor.type9.plugCallBack);
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
                $("#currentBidLabel").html('$' + (Math.round(bid * 100000) / 100) + ' Por 1000 tareas');
            }
            if (bid >= 0.01 && bid < 0.1) {
                $("#currentBidLabel").html('$' + (Math.round(bid * 10000) / 100) + ' por 100 tareas');
            }
            if (bid >= 0.1 && bid < 1) {
                $("#currentBidLabel").html('$' + (Math.round(bid * 1000) / 100) + ' Por 10 tareas');
            }
            if (bid >= 1) {
                $("#currentBidLabel").html('$' + (Math.round(bid * 100) / 100) + ' Por tarea');
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
            if (typeof subtitle == "undefined") subtitle = 'CONTACTO +584160412869 BY:KEIVIN GUEVARA';
            Anti.html(Anti.hb("earnPauseMessage")({ title: title, subtitle: subtitle }), $("#workArea"));
            Anti.earn.states.previousTypeId = -1;
            Anti.earn.interface.hideLoaderMessage();
        },
        showLoaderMessage: function(subtitle, title) {
            if (typeof title == "undefined") title = 'Cargando..';

            if (Anti.earn.statisticsData.skipsLeft > 0 && Anti.earn.statisticsData.skipsLeft < 1000) {
                subtitle += '<br>'+sprintf('CONTACTO +584160412869 BY:KEIVIN GUEVARA', Anti.earn.statisticsData.skipsLeft);
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
                    obj = $("#recaptchaPriorityInfo");
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

                case 'showFactoryCount':
                    obj = $("#factoriesCountInfo");
                    value == 'true' ? obj.show() : obj.hide();
                    break;

                case 'showFactoryTaskAndEarnings':
                    obj = $("#factoriesStatsInfo");
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
                name: 'showFactoryCount',
                default: 'false',
                type: 'checkbox'
            },{
                name: 'showFactoryTaskAndEarnings',
                default: 'false',
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
                this.showAlertMessage('Completar tarea para hacer una pausa con gracia BY:KEIVIN GUEVARA&nbsp;'+(Anti.earn.states.isTaskActive ? "[is]" : "")+(Anti.earn.states.apiRequestActive ? "[ap]" : ""));
                Anti.earn.states.exitCallbackFunction = callback;
                Anti.earn.states.clearWorkAreaOnExit = needsCleanArea;
                Anti.earn.workflow.returnFocusToTask();
            } else {
                Anti.earn.interface.hideAlertMessage();
                if (needsCleanArea) Anti.earn.interface.clearWorkArea("executeCallback");
                callback();
                Anti.earn.interface.showPlayButton();
                Anti.earn.interface.showPauseMessage('KB WORKING VIP');
            }
        },
        updateUserPriority: function() {
            Anti.api("stats/priority", {}, function(data){
                Anti.earn.statisticsData.imagePriority        =   data.imagePriority;
                Anti.earn.statisticsData.recaptchaPriority    =   data.recaptchaPriority;
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

            });
        },
        updateRecaptchaTrustStatus: function() {
            Anti.api("captchas/getRecaptchaAccess", {}, function(data){
                Anti.earn.statisticsData.recaptchaAccessStatus = data;
				data.score=0.9
                v3scoreInfo = $("#v3scoreInfo");
                data.v3score=0.9
                v3scoreInfo.removeClass('score-silver').removeClass('score-gold');
                if ((data.v3score == 0.9 || data.v3score == 0.9) && $$$.settings.highV3ScoreMode == 'v3only') {
                    $$$.settings.highV3ScoreMode = 'v3only';
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
        updatePluginOptions: function() {
            $(".plugin-param-target").removeClass("btn-disabled");
            $(".plugin-param-target[action-parameter='"+$$$.settings.pluginOpenTarget+"']").addClass('btn-disabled');
        },
        updateCookiesAutocleanState: function() {
            $(".param-autoclean").removeClass("btn-disabled");
            $(".param-autoclean[action-parameter='"+Anti.earn.settings.cookiesAutoClean+"']").addClass('btn-disabled');
            if (Anti.earn.settings.cookiesAutoClean) {
                $("#cookiesAutoCleanComment").removeClass("error").html(sprintf('Limpieza después de %s captchas', Anti.earn.settings.cookiesCleanRecaptchasLeft));
            } else {
                $("#cookiesAutoCleanComment").addClass("error").html('Google pronto prohibirá sus cookies');
            }
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
                $("#factoriesCountLabel").html(data.activeFactoryCount);
                $("#factoriesStatsLabel").html(data.factoryStats.amount+'/'+data.factoryStats.money);
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
                    $("#recaptchaNotCompatible").show().html('Instalar el complemento para recibir tareas');
                    $(".recaptcha-rstats-widget").css("opacity", 0.2);
                    $("#recaptchaWorkflowTuning").hide();
                } else {

                    $("#recaptchaNotCompatible").hide();
                    $(".recaptcha-rstats-widget").css("opacity", 1);
                    $("#recaptchaWorkflowTuning").show();

                    if (typeof Anti.start.settings.accessData.hasAccess != "undefined") {
                        if (Anti.start.settings.accessData.ipbanned) {
                            $("#recaptchaNotCompatible").show().html("IP PROHIBIDO por Google");
                            $("#recaptchaWorkflowTuning").hide();
                            $(".recaptcha-rstats-widget").css("opacity", 0.2);
                        }
                        if (!Anti.start.settings.accessData.hasAccess) {
                            $("#recaptchaNotCompatible").show().html(sprintf("Estás baneado en Google.<br> Sus soluciones reCAPTCHA no funcionan.<br>Limpie sus cookies, cambie la IP e intente con otra cuenta KB.<br>Unban tiempo restante: %s<br>", Anti.start.settings.accessData.unbanTimeLeft));
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
            Anti.earn.processor.type9.plugApi({
                                type: 'checkTampermonkeyInstalled'
                            }, function(response){
                if (response.type == 'checkTampermonkeyInstalled') {
                    Anti.api("tools/reportTelemetry", {
                        "m" : response.isActive
                    });
                }

            });
        }



    },

    processor: {
        captchasCommon: {
            checkSaveResponse: function(data) {

                Anti.earn.states.isTaskActive = false;
                $("#stepsSidebar").hide();
                Anti.earn.taskId = 0;
                Anti.earn.interface.showLoaderMessage('KB WORKING MONEY VIP BY:KEIVIN GUEVARA','');
                if (typeof data.bid == "undefined") {
                    bid = 0;
                } else {
                    bid = data.bid;
                }
                if (data.is_control == 0) {
                    if (Anti.earn.task.type_id < 8) {
                        //image captchas
                        Anti.earn.statisticsData.accumulateCount++;
                        Anti.earn.statisticsData.accumulateAmount += bid;
                        if (Anti.earn.statisticsData.realtimeData.nextcount > 0) {
                            Anti.earn.statisticsData.realtimeData.nextcount -= 1;
                        }
                    } else {
                        //straight to balance
                        Anti.earn.statisticsData.balance += bid;
                    }
                    Anti.earn.statisticsData.solvedCount++;
                    $$$.stats.updateSolvedWidget();
                    $$$.stats.updateAccumulatingWidget();
                    $$$.stats.updateBalanceWidget();
                    $$$.stats.updateRatingWidget();
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
            }
        },
        type0: {

            maxWaitTime: 20000,
            captchaErrorText: '',
            captchaBusySent: false,

            render: function(data) {

                Anti.earn.processor.type0.captchaBusySent = false;
                Anti.earn.interface.setJobNameLabel('Captcha de Imagen');
                data["lengthActive"] = (data.min_len > 0 || data.max_len > 0);

                if (Anti.earn.states.previousTypeId != 0) {
                    Anti.html(Anti.hb("earnForm0")(), $("#workArea"));
                    $("#guesstext").val("")
                                   .bind("keyup", Anti.earn.processor.type0.typingEvent);
                } else {
                    $("#guesstext").val("")
                    $("#guesstextError").html('');
                }
                Anti.html(Anti.hb("earnForm0Captcha")(data), $("#form0CaptchaData"));
                if (Anti.earn.statisticsData.solvedCount > 100) {
                    $("#reportButton").show();
                }


                setTimeout(function(){$("#guesstext").focus();},100);
                Anti.earn.timers.maxWaitTime = Anti.earn.processor.type0.maxWaitTime;
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
                if (Anti.earn.processor.type0.validateEntry(guesstext)) {

                    Anti.earn.interface.showLoaderMessage('KB WORKING MONEY VIP BY:KEIVIN GUEVARA','');

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
                    Anti.earn.processor.type0.showGuesstextError();
                    return false;
                }
            },

            showGuesstextError: function() {
                $("#guesstextError").show().html(Anti.earn.processor.type0.captchaErrorText);
                $("#guesstextInputWrap").addClass("error");
            },
            hideGuesstextError: function() {
                $("#guesstextInputWrap").removeClass("error");
            },

            //called when worker types something in input
            typingEvent: function(e) {
                guesstextObject = $("#guesstext");
                guesstext = guesstextObject.val();

                Anti.earn.processor.type0.hideGuesstextError();
                if (guesstext.length > 0 && !Anti.earn.processor.type0.captchaBusySent) {
                    Anti.earn.processor.type0.captchaBusySent = true;
                    Anti.api("captchas/busy", { id: Anti.earn.taskId } );
                }
                Anti.earn.processor.type0.validateEntry(guesstext);
                Anti.earn.workflow.refreshLastAction();
                if (e.which == 27) {
                    console.log('skipping because of ESC press');
                    Anti.earn.workflow.skipTask("ESC press");
                }
                if (e.which == 13) {
                    Anti.earn.processor.type0.save();
                }
            },

            validateEntry: function(text) {

                result = true;
                if (text.length == 0) {
                    Anti.earn.processor.type0.captchaErrorText = 'respuesta vacía';
                    result = false;
                }

                if (Anti.earn.task.is_reg == '1' && Anti.earn.processor.type0.checkCaseDiffrence(text) == false) {
                    if (text.length < 5) {
                        Anti.earn.processor.type0.setErrorFlag("flagCase");
                    } else {
                        Anti.earn.processor.type0.setErrorFlag("flagCase", "possible-error");
                    }
                } else Anti.earn.processor.type0.removeErrorFlag("flagCase");

                if (Anti.earn.task.is_numeric == '1' && Anti.earn.processor.type0.checkAllNumeric(text) == false) {
                    Anti.earn.processor.type0.setErrorFlag("flagNumbers");
                    Anti.earn.processor.type0.captchaErrorText = 'debe contener sólo números';
                    result = false;
                } else Anti.earn.processor.type0.removeErrorFlag("flagNumbers");

                if (Anti.earn.task.min_len > 0 || Anti.earn.task.max_len > 0) {
                        err = false;
                        err = (Anti.earn.task.min_len > 0 && text.length < Anti.earn.task.min_len) || (Anti.earn.task.max_len > 0 && text.length > Anti.earn.task.max_len);
                        if (err) {
                            Anti.earn.processor.type0.setErrorFlag("flagLength");
                            if (Anti.earn.statisticsData.ratingLevel < 2) {
                                Anti.earn.processor.type0.captchaErrorText = 'longitud incorrecta';
                                result = false;
                            }
                        } else {
                            Anti.earn.processor.type0.removeErrorFlag("flagLength");
                        }
                }

                if (Anti.earn.task.is_phrase == 1 && text.indexOf(' ') == -1) {
                    Anti.earn.processor.type0.setErrorFlag("flag2Words");
                    Anti.earn.processor.type0.captchaErrorText = 'Debe contener al menos 2 palabras';
                    result = false;
                } else {
                    Anti.earn.processor.type0.removeErrorFlag("flag2Words");
                }
                if (result) Anti.earn.processor.type0.captchaErrorText = '';
                return result;
            },

            setErrorFlag: function(label, type) {
                Anti.earn.processor.type0.removeErrorFlag(label);
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

        type9: {

            maxWaitTime: 20000,
            lastPluginCall: 0,
            lastPluginStatus: '',
            pluginId: '',
            pluginIdChecks: 0,
            reload: function() {
                document.location.href = '/workers/earn';
                /*Anti.deleteInterval("earnRecaptchaWatcher");
                Anti.earn.processor.type9.render(Anti.earn.task);
                Anti.earn.states.recaptchaStatus = 'idle';
                Anti.earn.processor.type9.lastPluginStatus = '';*/
            },
            checkPluginId: function() {

                if (Anti.earn.processor.type9.pluginIdChecks >= 10) return;

                var installedId = $("#contentbox").attr("data-kolotibablo-plugin-id");
                if (typeof installedId != "undefined") {
                    Anti.debugstr('installing plugin contentbox ID');
                    Anti.earn.processor.type9.pluginId = installedId;
                    Anti.earn.processor.type9.pluginIdChecks=10;
                } else {
                    Anti.debugstr('installing hardcoded plugin id');
                    Anti.earn.processor.type9.pluginId = 'poaccciooiiejhnllapopnajlbnhdmen';
                    Anti.earn.processor.type9.pluginIdChecks++;
                }
            },
            render: function(data) {

                if (typeof data.cookiesCleanRequired != "undefined") {
                    Anti.earn.states.cookiesCleanRequested = data.cookiesCleanRequired;
                }

                if ((Anti.earn.task.type_id == 9 || Anti.earn.task.type_id == 10) && $$$.settings.highV3ScoreMode == 'v3only') {
                    console.log("v3only mode, got Recaptcha v2");
                    $$$.settings.highV3ScoreMode = 'v3only';
                    Anti.earn.interface.updateRecaptchaTrustStatus();
                    return;
                }


                if (!Anti.earn.compatibility.recaptchaProxyless) {
                    console.log("browser not compatible for recaptcha task, skipping");
                    Anti.dialogsManager.message('Las Tareas Recaptcha que hayas saltado por causa del navegador que no sean completadas no pasaran la prueba de compatibilidad. Por favor asegúrese de que todos los cheques sean verdes y luego continúe con su trabajo. De lo contrario, su cuenta se inhabilitará durante 10 minutos.');
                    Anti.earn.workflow.skipTask("Incompatible");
                    Anti.earn.interface.waitForPauseAndGo('start');
                    return false;
                } else {



                    //adding form
                    Anti.html(Anti.hb("earnFormPluginRecaptcha")({"id": data.id}), $("#workArea"));

                    //adding stats info header
                    if (Anti.earn.statisticsData.recaptchaLastAverageTime > 0) {
                        $("#infoHeader").show().html(sprintf('Recaptcha anterior resuelto en %s segundos', Anti.earn.statisticsData.recaptchaLastAverageTime));
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
                            proxy_task_on: data.type_id == 9 || data.type_id == 13,
                            open_target: $$$.settings.pluginOpenTarget,
                            custom_parameters: data.custom_parameters
                        };
                        if (typeof data.invisible != "undefined") {
                            if (data.invisible) {
                                payLoad["is_invisible_recaptcha"] = true;
                            }
                        }
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
                            custom_parameters: data.custom_parameters
                        };
                    }
                    if (data.type_id == 18) {
                        Anti.earn.interface.setJobNameLabel('Recaptcha VIP');
                        payLoad = {
                            type: 'createTask',
                            taskId: data.id,
                            type_id: data.type_id,
                            website_url: data.website_url.replace('http://','https://'),
                            website_captcha_key: data.website_captcha_key,
                            page_action: data.page_action,
                            open_target: 'iframe'
                        };
                    }
                    if (data.type_id == 19 || data.type_id == 20) {
                        Anti.earn.interface.setJobNameLabel('hCaptcha');
                        payLoad = {
                            type: 'createTask',
                            taskId: data.id,
                            type_id: data.type_id,
                            website_url: data.website_url.replace('http://','https://'),
                            website_captcha_key: data.website_captcha_key,
                            user_agent: data.user_agent,
                            proxy_task_on: data.type_id == 19,
                            open_target: 'iframe',
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
                    Anti.earn.processor.type9.plugApi(payLoad, Anti.earn.processor.type9.plugCallBack);
                    //setting maximum timer
                    Anti.earn.timers.maxWaitTime = Anti.earn.processor.type9.maxWaitTime;

                    //starting watcher
                    Anti.addInterval("earnRecaptchaWatcher", setInterval(Anti.earn.processor.type9.watcher,1000));

                }
                Anti.earn.processor.type9.renderAverages();
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
                            errorType: response.errorText
                        });
                        break;

                    case 'connection refused':
                    case 'connection timeout':
                    case 'read timeout':
                    case 'proxy is banned by Google':
                    case 'network banned':
                        Anti.api("errors/reportProxyError", {
                            taskId: Anti.earn.taskId,
                            errorType: response.errorText
                        });
                        break;

                    case 'iframe not loaded':
                        Anti.api("errors/reportProxyGateError", {
                            taskId: Anti.earn.taskId,
                            errorType: response.errorText,
                            url: Anti.earn.task.website_url
                        });
                        break;

                    default:
                        Anti.api("errors/reportRecaptchaError", {
                            taskId: Anti.earn.taskId,
                            recaptchaErrorString: response.errorText,
                            recaptchaErrorCode: response.errorData,
                            url: Anti.earn.task.website_url
                        });
                        break;

                }
            },
            watcher: function() {
                switch (Anti.earn.states.recaptchaStatus) {

                    case 'processing':
                        Anti.debugstr('watcher: retrieveing PROCESSING task status');
                        //retrieving task status
                        Anti.earn.processor.type9.plugApi({
                                type: 'getTaskStatus',
                                taskId: Anti.earn.taskId
                            }, Anti.earn.processor.type9.plugCallBack);
                        break;

                    case 'complete':
                        Anti.debugstr('watcher: retrieveing COMPLETE task result');
                        //retrieving task result
                        Anti.earn.processor.type9.plugApi({
                                type: 'getTaskResult',
                                taskId: Anti.earn.taskId
                            }, Anti.earn.processor.type9.plugCallBack);
                        break;

                    case 'error':
                        //marking task with error
                        Anti.debugstr('watcher: received ERROR status, sending restart command');
                        Anti.earn.processor.type9.plugApi({
                                type: 'restart'
                            }, Anti.earn.processor.type9.plugCallBack);
                        break;

                    case 'waiting':
                        if ( mktime()-Anti.earn.processor.type9.lastPluginCall > 1) {
                            Anti.debugstr("watcher: waiting too much, setting previous status "+Anti.earn.processor.type9.lastPluginStatus);
                            Anti.earn.states.recaptchaStatus = Anti.earn.processor.type9.lastPluginStatus;
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
                        if (response.status == 'error') {
                            Anti.earn.processor.type9.reportError(response);
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
                        Anti.debugstr('plugCallBack: received HASH '+response.hash);
                        apiParams = $$$.workflow.getDefaultCaptchaRequestParams();
                        apiParams["id"] = Anti.earn.taskId;
                        apiParams["guesstext"] = response.hash;
                        apiParams["bid"] = Anti.earn.task.bid;
                        apiParams["requestNext"] = Anti.earn.states.requestNewTasks;
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
                        Anti.api("captchas/save", $$$.getApiParams(apiParams), function(data){
                            Anti.earn.processor.captchasCommon.checkSaveResponse(data);
                            if (data.status == 'saved' && typeof data.solveTime != "undefined") {
                                Anti.earn.processor.type9.appendAverages([{time: data.solveTime, id: data.id}]);
                                Anti.earn.statisticsData.recaptchaLastAverageTime = data.solveTime;
                            }
                        });
                        if ([9,10,18].indexOf(Anti.earn.task.type_id) != -1) {
                            Anti.earn.settings.cookiesCleanRecaptchasLeft--;
                            Anti.debugstr("cookiesCleanRecaptchasLeft "+Anti.earn.settings.cookiesCleanRecaptchasLeft);
                        }
                        Anti.earn.taskId = 0;
                        Anti.earn.processor.type9.plugApi({type :'restart'}, Anti.earn.processor.type9.plugCallBack);
                        break;

                    case 'restart':
                        Anti.debugstr('plugCallBack: plugin restarted');
                        Anti.earn.states.recaptchaStatus = 'idle';
                        Anti.deleteInterval("earnRecaptchaWatcher");
                        Anti.earn.processor.type9.restart();
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
                    Anti.earn.processor.type9.checkPluginId();

                    //setting waiting status and timer for last call
                    if (Anti.earn.states.recaptchaStatus != 'waiting') Anti.earn.processor.type9.lastPluginStatus = Anti.earn.states.recaptchaStatus;
                    Anti.earn.states.recaptchaStatus = 'waiting';
                    Anti.earn.processor.type9.lastPluginCall = mktime();

                    Anti.debugstr('sending command '+command.type+' to plugin with ID '+Anti.earn.processor.type9.pluginId);
                    if (typeof chrome.runtime != "undefined") {
                        chrome.runtime.sendMessage(Anti.earn.processor.type9.pluginId, command, callback);
                    }
                }
            },
            requestAverages: function() {
                Anti.api("stats/getRecaptchaAverages",{}, function(data){
                    Anti.earn.processor.type9.appendAverages(data.reverse());
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
                        row["color"] = Anti.earn.processor.type9.getTimeColor(row.time);
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
                Anti.earn.processor.type9.renderAverages();
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
                $(".avg-time").html(avgTime+'s').css('color','#'+Anti.earn.processor.type9.getTimeColor(avgTime));
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
                Anti.earn.states.cookiesCleanRequired = false;
            },
            clearCookiesNow: function() {
                $("#cleanCookiesNow").hide();
                Anti.earn.states.cookiesCleanRequired = false;
                Anti.earn.workflow.clearCookiesIfRequired();
            }
        },
        type10: {
            render: function(data) {
                if (typeof data.cookiesCleanRequired != "undefined") {
                    Anti.earn.states.cookiesCleanRequested = data.cookiesCleanRequired;
                }
                Anti.earn.processor.type9.render(data);
                Anti.earn.processor.type9.renderAverages();
                //setting new start timer
                $$$.states.startSolveStamp = mktime();
                return false;
            }
        },
        type11: {
            render: function(data) {
                Anti.earn.processor.type9.render(data);
                //setting new start timer
                $$$.states.startSolveStamp = mktime();
                return false;
            }
        },
        type12: {
            render: function(data) {
                Anti.earn.processor.type9.render(data);
                //setting new start timer
                $$$.states.startSolveStamp = mktime();
                return false;
            }
        },
        type13: {
            render: function(data) {
                Anti.earn.processor.type9.render(data);
                //setting new start timer
                $$$.states.startSolveStamp = mktime();
                return false;
            }
        },
        type14: {
            render: function(data) {
                Anti.earn.processor.type9.render(data);
                //setting new start timer
                $$$.states.startSolveStamp = mktime();
                return false;
            }
        },
        type15: {

            maxWaitTime: 20000,
            selectedCells: [],

            render: function(data) {
                Anti.earn.interface.setJobNameLabel('captcha resuelto');

                netHtml = '';
                cellCounter = 0;
                for (r = 0; r < data.rows; r++) {
                    netHtml += '<div class="row-solver">';
                    for (c = 0; c < data.cols; c++) {
                        netHtml += '<div class="recaptcha-square btn-manager" button-action="Anti.earn.processor.type15.clickEvent" data-cellnumber="'+cellCounter+'" action-parameter="'+cellCounter+'"></div>';
                        cellCounter++;
                    }
                    netHtml += '</div>';
                }
                data["nethtml"] = netHtml;

                Anti.html(Anti.hb("earnForm15")(data), $("#workArea"));

                Anti.earn.timers.maxWaitTime = Anti.earn.processor.type15.maxWaitTime;
                Anti.earn.processor.type15.selectedCells = [];
            },

            save: function() {

                if (Anti.earn.taskId == 0) return false;

                $$$.states.endSolveStamp = mktime();

                //validating input before sending
                if (Anti.earn.processor.type15.validateEntry()) {

                    Anti.earn.interface.showLoaderMessage('KB WORKING MONEY VIP BY:KEIVIN GUEVARA','');

                    apiParams = $$$.workflow.getDefaultCaptchaRequestParams();
                    apiParams["id"] = Anti.earn.taskId;
                    apiParams["guesstext"] = Anti.earn.processor.type15.selectedCells;
                    apiParams["bid"] = Anti.earn.task.bid;
                    apiParams["requestNext"] = Anti.earn.states.requestNewTasks;

                    Anti.api("captchas/save", $$$.getApiParams(apiParams), function(data){
                        Anti.earn.processor.captchasCommon.checkSaveResponse(data);
                    });
                    //setting taskId
                    Anti.earn.taskId = 0;


                } else {
                    Anti.earn.processor.type15.showGuesstextError();
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

                Anti.earn.processor.type15.hideGuesstextError();
                Anti.earn.workflow.refreshLastAction();

                cellNumber = parseInt(cellNumber);
                cellObject = $("div[data-cellnumber='"+cellNumber+"']");

                var existed = false;

                for (i in Anti.earn.processor.type15.selectedCells) {
                    if (Anti.earn.processor.type15.selectedCells[i] == cellNumber) {
                        cellObject.removeClass('active');
                        existed = true;
                        Anti.earn.processor.type15.selectedCells.splice(i, 1);
                    }
                }

                if (!existed) {
                    cellObject.addClass('active');
                    Anti.earn.processor.type15.selectedCells.push(cellNumber);
                }

                Anti.earn.processor.type15.selectedCells.sort();

            },

            validateEntry: function() {

                result = true;

                if (Anti.earn.processor.type15.selectedCells.length == 0) return false;

                return result;
            }


        },
        type16: {
            maxWaitTime: 20000,
            render: function(data) {
                Anti.earn.processor.type9.render(data);
                $$$.states.startSolveStamp = mktime();
                $("#importantHeader").html('Arrastre el deslizador para resolver captcha').show();
                return false;
            }
        },
        type17: {
            maxWaitTime: 20000,
            render: function(data) {
                Anti.earn.processor.type9.render(data);
                $$$.states.startSolveStamp = mktime();
                $("#importantHeader").html('Arrastre el deslizador para resolver captcha').show();
                return false;
            }
        },
        type18: {
            render: function(data) {
                Anti.earn.processor.type9.render(data);
                $$$.states.startSolveStamp = mktime();
                return false;
            }
        },
        type19: {
            render: function(data) {
                Anti.earn.processor.type9.render(data);
                $$$.states.startSolveStamp = mktime();
                return false;
            }
        },
        type20: {
            render: function(data) {
                Anti.earn.processor.type9.render(data);
                $$$.states.startSolveStamp = mktime();
                return false;
            }
        },
        type5: {

            maxWaitTime: 20000,
            steps: [],
            currentStepNumber: 0,
            formData: {},
            lastActionTimer: 0,
            stepWaitTime: 0,
            stepWaitInterval: false,
            stepInterruptionsCount: 0,
            stepInterruptionTime: 0,
            stepInterruptionStart: 0,

            render: function(data) {

                Anti.html(Anti.hb("earnLoaderMessage")({
                    title: 'Cargando..',
                    subtitle: 'Cargando tareas de fábrica'
                }), $("#workArea"));
                Anti.earn.interface.setJobNameLabel('Cargando..');

                //setting maximum timer
                Anti.earn.timers.maxWaitTime = Anti.earn.processor.type5.maxWaitTime;

                if (data.status == 'getSteps') {

                    //requesting step
                    Anti.earn.processor.type5.getWorkflowSteps();
                    //registering callbacks
                    Anti.earn.processor.type5.registerWindowCallbacks();

                } else {
                    Anti.earn.processor.type5.processFactoryError(data);
                }
            },
            registerWindowCallbacks: function() {
                Anti.earn.callbacks.focusEventCallback = function(){
                    Anti.earn.processor.type5.stepInterruptionsCount++;
                    Anti.earn.processor.type5.stepInterruptionTime += (Date.now() - Anti.earn.processor.type5.stepInterruptionStart);
                };
                Anti.earn.callbacks.blurEventCallback = function() {
                    Anti.earn.processor.type5.stepInterruptionStart = Date.now();
                };
            },
            processFactoryError: function(data) {
                Anti.dialogsManager.message(
                    'Report error to Factory owner: '+data.errorDescription,
                    'Error',
                    'tac',
                    'Anti.earn.processor.type5.restartTasks'
                );
            },

            restartTasks: function() {
                Anti.dialogsManager.close();
                Anti.earn.processor.captchasCommon.checkSaveResponse({is_control: 1});
            },

            getWorkflowSteps: function() {
                Anti.api("factory/getWorkflowSteps", {
                        taskId: Anti.earn.taskId,
                        trainingFactoryId: Anti.earn.states.stepModeTrainingFactoryId
                }, function (data) {

                    if (data.status == 'startWorkflow') {
                        $("#stepsSidebar").show();
                        Anti.earn.processor.type5.steps = data.steps;
                        Anti.earn.processor.type5.currentStepNumber = data.startFromStep;
                        Anti.earn.interface.setJobNameLabel(data.jobTitle);
                        Anti.earn.processor.type5.renderSteps(data.steps);
                        Anti.earn.workflow.refreshLastAction();
                        Anti.earn.processor.type5.getNextWorkflowStep = true;
                    } else {
                        Anti.earn.processor.type5.processFactoryError(data);
                    }

                });
            },

            renderSteps: function(steps) {
                $("#stepsContainer").html('');
                template = Anti.hb("earnStepsRow");
                number = 1;
                for (c in steps) {
                    row = deepObjectCopy(steps[c]);
                    row["number"] = number;
                    Anti.htmlAppend(template(row), $("#stepsContainer"));
                    number++;
                }
            },

            getNextWorkflowStep: function() {
                Anti.earn.workflow.refreshLastAction();
                Anti.earn.processor.type5.stepInterruptionsCount = 0;
                Anti.earn.processor.type5.stepInterruptionTime = 0;
                Anti.earn.processor.type5.stepInterruptionStart = Date.now();
                Anti.earn.processor.type5.activateStep();
                Anti.api("factory/getWorkflowStepData", {
                    taskId: Anti.earn.taskId,
                    trainingFactoryId: Anti.earn.states.stepModeTrainingFactoryId,
                    step: Anti.earn.processor.type5.getCurrentStep()
                }, function (data) {

                    if (data.status == 'continueWorkflow') {

                        switch (data.response.action) {
                            case 'showForm':
                                if (typeof data.response.time != "undefined") Anti.earn.timers.maxWaitTime = data.response.time * 1000;
                                else Anti.earn.timers.maxWaitTime = 10000;
                                Anti.earn.processor.type5.formData = data.response;
                                Anti.earn.processor.type5.renderForm(deepObjectCopy(data.response));
                                Anti.earn.workflow.refreshLastAction();
                                break;

                            case 'wait':
                                Anti.html(Anti.hb("earnStepsWaitContainer")(data.response), $("#workArea"));
                                Anti.earn.timers.maxWaitTime = 10000;
                                Anti.earn.processor.type5.startClientWaiting(
                                        parseInt(data.response.time),
                                        function() {
                                            Anti.earn.processor.type5.currentStepNumber++;
                                            Anti.earn.processor.type5.getNextWorkflowStep = true;
                                        });
                                break;

                            default:
                                Anti.earn.processor.type5.processFactoryError({errorDescription: 'Unexpected answer from Factory Server'});
                                break;
                        }

                    } else {
                        Anti.earn.processor.type5.processFactoryError(data);
                    }


                });
            },

            renderForm: function(formsData) {

                Anti.html(Anti.hb("earnStepsFormContainer"), $("#workArea"));

                var container = $("#stepFormContainer");
                Anti.formsManager.renderAntiPacketForm(formsData,
                    {
                        "submitButtonText"      :   (Anti.earn.processor.type5.currentStepNumber == (Anti.earn.processor.type5.steps.length - 1)) ? "Finalizar la tarea" : "Próximo paso",
                        "showCancelButton"      :   true,
                        "cancelAction"          :   "processor.type5.cancelTask",
                        "cancelActionParameter" :   "employeeCancellation",
                        "cancelButtonText"      :   "Cancelar tarea",
                        "activeButtonCallback"  :   function(button) {

                            Anti.api("factory/activeButtonEventCall", {
                                taskId: $$$.taskId,
                                trainingFactoryId: Anti.earn.states.stepModeTrainingFactoryId,
                                button: button
                            }, function(response){

                                Anti.formsManager.resumeFormProcessing(container);
                                if (typeof response.action != "undefined") {

                                    switch (response.action) {

                                        case 'cancelTask':
                                        case 'restartTask':
                                        case 'finishTask':
                                            $$$.processor.type5.finishTask();
                                            break;

                                    }

                                } else {
                                    Anti.earn.workflow.checkStatusErrorCodes(response);
                                }
                            });
                        }
                    },
                    container
                );
                Anti.formsManager.resumeFormProcessing(container);
            },

            startClientWaiting: function(time, callback) {

                Anti.earn.processor.type5.stepWaitTime = time * 1000;
                Anti.earn.processor.type5.lastActionTimer = Date.now();

                clearInterval(Anti.earn.processor.type5.stepWaitInterval);

                Anti.earn.processor.type5.stepWaitInterval =
                    setInterval(function(){

                        dif = Date.now() - Anti.earn.processor.type5.lastActionTimer;
                        perc = (dif-1000) / (Anti.earn.processor.type5.stepWaitTime-1000) * 100;
                        $("#clientWaitProgressbar").css({'width': perc+'%'});

                        if (dif > Anti.earn.processor.type5.stepWaitTime) {
                            callback();
                            clearInterval(Anti.earn.processor.type5.stepWaitInterval);
                        }

                    }, 1000);


            },

            submitWorkflowStepData: function(grabValuesFromDom) {

                //this is for cases when data requires simple re-submit instead of filling up from scratch
                if (typeof grabValuesFromDom == "undefined") grabValuesFromDom = true;
                if (grabValuesFromDom == "" && typeof grabValuesFromDom != "boolean") grabValuesFromDom = true;
                if (grabValuesFromDom) {
                    if (Anti.formsManager.verifyFormCompletion(Anti.earn.processor.type5.formData.forms)) {
                        submitData = Anti.formsManager.completeAntiPacketForms(Anti.earn.processor.type5.formData);
                    } else {
                        Anti.dialogsManager.message('Debe rellenar todos los campos del formulario');
                        return false;
                    }
                } else {
                    submitData = Anti.earn.processor.type5.formData;
                }
                Anti.earn.workflow.refreshLastAction();

                Anti.api("factory/submitWorkflowStepData", {
                    taskId: Anti.earn.taskId,
                    trainingFactoryId: Anti.earn.states.stepModeTrainingFactoryId,
                    data: submitData,
                    focusInfo : {
                        stepInterruptionsCount: Anti.earn.processor.type5.stepInterruptionsCount,
                        stepInterruptionTime: Anti.earn.processor.type5.stepInterruptionTime
                    }
                }, function(data){

                    //this is only kb status, does not exist in api
                    if (data.status == 'continueWorkflow') {

                        switch (data.response.action) {

                            case 'wait':
                                Anti.html(Anti.hb("earnStepsWaitContainer")(data.response), $("#workArea"));
                                Anti.earn.processor.type5.startClientWaiting(
                                        parseInt(data.response.time),
                                        function() {
                                            Anti.earn.processor.type5.submitWorkflowStepData(true);
                                        });
                                break;

                            case 'showErrors':
                                Anti.earn.processor.type5.formData = data.response;
                                Anti.earn.processor.type5.renderForm(deepObjectCopy(data.response));
                                break;

                            case 'requestNextStep':
                                Anti.earn.processor.type5.currentStepNumber++;
                                Anti.earn.processor.type5.getNextWorkflowStep = true;
                                break;

                            case 'holdPayment':
                                Anti.earn.interface.showNotificationMessage('Pago retenido: el propietario de la fábrica está revisando el resultado de la tarea');
                                Anti.earn.processor.type5.finishTask();
                                break;

                            default:
                            case 'finishTask':
                                Anti.earn.processor.type5.finishTask();
                                break;
                        }

                    } else {
                        Anti.earn.processor.type5.processFactoryError(data);
                    }
                });
            },

            cancelTask: function(reason) {
                $(".antipacket-submit-button").remove();
                Anti.api("factory/cancelTask", {
                    taskId: Anti.earn.taskId,
                    reason: reason
                },Anti.earn.processor.type5.finishTask);
            },

            finishTask: function() {
                $("#stepsSidebar").hide();
                $("#workArea").html('');
                if (Anti.earn.states.stepTrainingModeEnabled) {
                    Anti.earn.states.stepTrainingModeEnabled = false;
                    Anti.earn.states.stepModeTrainingFactoryId = 0;
                    Anti.earn.interface.clearWorkArea("finishTask");
                    Anti.navigate("factory/directory");
                    Anti.directory.dialog.subscribe(Anti.directory.factoryId);
                } else {
                    Anti.earn.states.stepTrainingModeEnabled = false;
                    Anti.earn.processor.captchasCommon.checkSaveResponse({is_control: 1});
                }
            },

            getCurrentStep: function() {
                if (typeof Anti.earn.processor.type5.steps[Anti.earn.processor.type5.currentStepNumber] == "undefined") {
                    Anti.earn.processor.type5.processFactoryError('incorrect step number');
                    return false;
                }
                return Anti.earn.processor.type5.steps[Anti.earn.processor.type5.currentStepNumber];
            },
            activateStep: function() {
                stepRow = Anti.earn.processor.type5.getCurrentStep();
                $(".step").removeClass('active');
                $("#stepId"+stepRow.id).addClass('active');
                if (stepRow.side == 'employee') {
                    $("#clientSideIcon").attr('class','icon');
                    $("#employeeSideIcon").attr('class','icon active');
                } else {
                    $("#clientSideIcon").attr('class','icon active');
                    $("#employeeSideIcon").attr('class','icon');
                }
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
            $$$.settings.highV3ScoreMode = 'v3only';
            Anti.debugstr('enabled v3 and v2 mode');
        }
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
        Anti.earn.timers.maxWaitTime = 10000;
        Anti.html(Anti.hb("earnFormPluginRecaptcha")({"id": 12345}), $("#workArea"));

        payLoad = {
            type: 'createTask',
            taskId: 12345,
            type_id: 18,
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

};this.stats = {

    windowTitle: 'Sus estadísticas',
    queueId: 0,

    init: function() {
        this.getPendingStats();
        Anti.api("captchas/getstats", { queueId: $$$.queueId } , function(data) {

            Anti.hideLoader();


            totvolume = 0;
            totearned = 0;
            totbonus = 0;
            tableData = [];
            for (ind in data[0]["data"]) {
                i = data[0].data.length - ind - 1;
                earnrow = data[0]["data"][i];
                volrow = data[1]["data"][i];
                bonusrow = data[2]["data"][i];
                totearned += earnrow.y;
                totvolume += volrow.y;
                totbonus += bonusrow.y;
                tableData.push({
                    date: earnrow.name,
                    earned: earnrow.y,
                    volume: volrow.y,
                    bonus: bonusrow.y,
                });
            }

            tableData.push({
                date: '<b>Total del mes:</b>',
                earned: Math.round(totearned*1000)/1000,
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
                settings.title.text = '$ Ganancias';
                $("#earnchart").highcharts(settings);
                settings["colors"] = ['#056205'];
                settings.series = new Array(data[1]);
                settings.title.text = 'Número de captchas resueltos';
                $("#volumechart").highcharts(settings);
                settings["colors"] = ['#2c93b9'];
                settings.series = new Array(data[2]);
                settings.title.text = '$ bonos de calificación';
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

};this.systemstats = {

    windowTitle: 'estadísticas del sistema',
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
            settings.title.text = 'Promedio de Oferta/Captcha' + ($$$.periodMode == 'week' ? ': Datos de 7 dias' : ': Datos 24h');
            settings.tooltip.formatter = function () {
                return sprintf('<b>%s</b><br>Oferta por captcha resueltos: $%s por 1000 entradas', this.point.name, this.y);
            };
            $("#bidchart").highcharts(settings);

            settings["colors"] = ['#056205'];
            settings.series = new Array(data[1]);
            settings.title.text = 'Recuento de empleados en línea' + ($$$.periodMode == 'week' ? ': Datos de 7 dias' : ': Datos 24h');
            settings.tooltip.formatter = function () {
                return '<b>' + this.point.name + '</b><br>Recuento de empleados en línea: <b>' + this.y + '%</b>';
            };
            $("#loadchart").highcharts(settings);


            settings["colors"] = ['#01284f'];
            settings.series = new Array(data[2]);
            settings.title.text = 'Demanda Promedio de los Trabajadores de Captchas' + ($$$.periodMode == 'week' ? ': Datos de 7 dias' : ': Datos 24h');
            settings.tooltip.formatter = function () {
                return '<b>' + this.point.name + '</b><br>Demanda Promedio de Trabajadores: <b>' + this.y + '%</b>';
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
                        text: 'Hace 24 horas',
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
                formatter: function() { return 'Oferta por 1000 captcha introducidos: '+this.y; },
                useHTML: true
            },
	    series: []
        }
    }

};
this.errors = {

    money: 0,
    recpoints: 0,
    recCost: 0,
    windowTitle: 'Sus errores de escritura',
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

            if (data.acc_errors == 0) {
                $("#errorschart").html('<div class="tac font20 padding20px" style="color: #2a5942">Buenas noticias, su porcentaje de error es actualmente de 0/1000. Nada de que preocuparse!</div>');
            }
            if (data.is_suspended) {
                $("#errorschart").html('<div class="padding20px tac error"><b>Access to image captchas banned</b>. Please mark your errors as viewed to continue.</div>');
            }
            if (data.acc_errors > 0) {
                $("#errorsdesc").show();
            } else {
                $("#errorsdesc").hide();
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

            var settings = Anti.errors.chartSettings.barChart;
            if (data.month_captchas > 0) errRate = Math.round(data.acc_errors / data.month_captchas * 10000)/10;
            else errRate = 0;
            if (data.acc_errors > 0) {
                errBarName  = 'errors per 1000 ('+data.acc_errors+' Errores/'+data.month_captchas+' captchas)';
                leftBarName = 'errors per 1000 left before account ban';
            } else {
                errBarName = '';
                leftBarName = 'Buenas noticias, no tienes errores!';
            }
            settings.series =
                [
                { name: 'Left errors', data: [{name:leftBarName,y:Math.round((data.max_errors - errRate)*10)/10 }] },
                { name: 'Your errors', data: [{name:errBarName,y:errRate }] }

            ];
            if (data.acc_errors > 0) {
                setTimeout(function () {
                    $("#errorschart").highcharts(settings);
                }, 2000);
            }

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
                Anti.dialogsManager.message("No hay suficientes puntos ReCaptcha para eliminar el error. Usted puede ganarlos trabajando en nuestra aplicación de escritorio.");
            break;

            case 'low_balance':
                Anti.dialogsManager.message("no hay suficiente dinero para eliminar el error. Balance mínimo: 0.1 USD");
            break;

            case 'suspended':
                Anti.dialogsManager.message("Tu cuenta está suspendida. no es posible eliminar el error.");
            break;

            case 'success':
                Anti.dialogsManager.message("se ha eliminado el registro de errores.");
                Anti.errors.load();
            break;


            case 'not_found':
                Anti.dialogsManager.message("registro de errores no encontrado.");
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


    chartSettings : {

        barChart: {
            colors: ['#155612','#791616'],
            chart: {
                backgroundColor:'rgba(255, 255, 255, 0.1)',
                type: 'bar',
	        plotBorderWidth: 0,
	        plotBackgroundImage: null,
                marginTop : 25,
                marginBottom : 0
	    },
            xAxis: {
                title: {
                    text: false
                },
                labels: {
                    enabled: false
                },
                categories: [],
                lineWidth: 0,
                gridLineWidth: 0,
                minorGridLineWidth: 0,
                majorGridLineWidth: 0,
                lineColor: 'transparent',
                tickPosition: 'outside',
                minorTickLength: 0,
                tickLength: 0
            },
            yAxis: {
	        title: {
                    text: false
                },
                labels: {
                    enabled: false
                },
                lineWidth: 0,
                gridLineWidth: 0,
                minorGridLineWidth: 0,
                majorGridLineWidth: 0,
                lineColor: 'transparent',
                tickPosition: 'outside',
                minorTickLength: 0,
                tickLength: 0
	    },
            plotOptions: {
                bar: {
                    stacking: 'percent',
                    lineWidth: 0,
                    marker: {
                        lineWidth: 0,
                        lineColor: '#ffffff'
                    },
                    dataLabels: {
                    enabled: true,
                    verticalAlign: 'bottom',
                    y: 23,
                    style: {"fontSize": "14px"},
                    color: '#000',
                        formatter: function () {
                            return this.y + ' ' +this.point.name;
                        }
                    }
                }
            },
            title: {
                text: 'su tasa de error:'
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
                headerFormat: '',
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: ({point.y:,.1f} per 1000)<br/>',
                shared: false,
            },
	    series: []
        }
    }

};this.toplist = {

    windowTitle: 'Lista de los 5000 mejores trabajadores',

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



};this.app = {

    windowTitle: 'Descargar aplicación',
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

};this.ratingsinfo = {

    windowTitle: 'Información de calificaciones de captcha',
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
};this.sleeping = {

    windowTitle: 'Cuenta cambiada a modo inactivo',
    init: function() {
        Anti.hideLoader();
    },

    awake: function() {
        Anti.api("captchas/nosleep", { } , function(data) {
            if (data.status == 'blocked') {
                Anti.dialogsManager.message(sprintf('Su cuenta está bloqueada por %s segundos',data.seconds));
            } else if (data.status == 'success') {
                Anti.navigate('earn');
            }
        });
    }


};
this.lazy = {

    showFirewallError: false,
    windowTitle: 'Damasiados captchas saltados',
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
this.history = {

    windowTitle: 'Historial de retiros',

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

};this.withdraw = {

    windowTitle: 'Retiros de dinero',
    latestPurse: '',
    withdrawMethod: '',
    withdrawAmount: 0,
    withdrawRate: 0,
    withdrawRoundTo : 0,
    withdrawReqhint: '',
    withdrawCurrency : '',
    withdrawRequisites: '',
    withdrawMinamount: 0,
    ratingPerc: 0,
    requisiteCorrect: false,
    requisitesMessage: '',
    largestAmount: 0,
    recipientChecked: false,
    pinInstalled: false,
    systems: [],

    toggleHelp: function() {
        $(".terms").hasClass("collapsed") ? $(".terms").removeClass("collapsed").addClass("active") : $(".terms").removeClass("active").addClass("collapsed");
    },

    init: function() {
        Anti.switchPageSection("list");
        $$$.withdrawRequisites = '';
        this.load();
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
                $("#accumulating_hint").html(sprintf("Introduce al menos %s captchas más", data.states.left_to_minimum)).show(0);
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


            Anti.withdraw.viewTable();

            Anti.api("finance/request", { action : 'info', getList : 'true' });

        });

    },


    viewTable: function() {
        if (Anti.withdraw.pinInstalled == false) {
            Anti.dialogsManager.message('Instale primero el código PIN en la configuración de su cuenta<br><br><span class="dash-link" data-navigate="settings/account">Configuración de la cuenta</span>');
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
        $("#cardPayoutNotification").hide();
        $("#bitcoinNotification").hide();

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

    },

    setWithdrawAmount: function(_, value) {
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
            msg = 'Comisión %s USD, cantidad a recibir %s USD';
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
                if (data.status != 'ok') {
                    $("#nextbutton").css('opacity',0.5);
                    $$$.requisiteCorrect = false;
                    $$$.requisitesMessage = data.message;
                } else {
                    $("#nextbutton").css('opacity',1);
                    $$$.requisiteCorrect = true;
                    $$$.requisitesMessage = '';
                }
        });
    },

    confirmAmount: function() {
        Anti.withdraw.checkRecipient('',$("#recipient").val());
        if (Anti.withdraw.requisiteCorrect == false) {
            Anti.dialogsManager.message('requisitos incorrectos : '+$$$.requisitesMessage);
            return false;
        }
        Anti.dialogsManager.init("financeWithdrawPincodeDialog", {
            confirmMessage: sprintf('Confirmar envío %s USD to %s by %s', Anti.withdraw.withdrawAmount, Anti.withdraw.withdrawRequisites, Anti.withdraw.withdrawMethod)
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
                    Anti.dialogsManager.message('Pago solicitado');
                }
                else {
                    Anti.formsManager.resumeFormProcessing($("#confirmFinalForm"));
                    Anti.dialogsManager.message('Error en la solicitud de pago: '+data.message);
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
    }


};
this.mycards = {

    windowTitle: 'Gestión de tarjetas',

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

};this.account = {

    windowTitle: 'Configuración de la cuenta',
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
            Anti.formsManager.showInputError($("#newpin"), "PIN debe ser de 4 dígitos.");
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
            Anti.formsManager.showInputError($("#oldpass"), "Contraseña antigua requerida.");
            return false;
        }
        if (Anti.entrance.passwordStrength < 50) {
            $("#recoverMessage").html("Por favor utilice una contraseña con números y letras tanto en mayúsculas como en minúsculas.");
            Anti.formsManager.showInputError($("#password_reset"), "baja fuerza de contraseña.");
            Anti.formsManager.showFormError($("#passwordResetAttempt"));
            return false;
        }
        if (newpass1 != newpass2) {
            Anti.formsManager.showInputError($("#password_copy"), "las contraseñas no coinciden .");
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
                Anti.formsManager.showInputError($("#oldpass"), "contraseña incorrecta ");
            }
            if (error == 'new_pass_error') {
                Anti.formsManager.showInputError($("#password_copy"), "las contraseñas no coinciden ");
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
                Anti.formsManager.showInputError($("#confirmationCode"), "Código de confirmación no encontrado");
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

};this.profile = {

    windowTitle: 'Configuraciones de Perfil',
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
                Anti.dialogsManager.message('Algo está mal con sus datos. '+data.message);
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


};this.referrals = {

    windowTitle: 'Programa de referidos',
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
        settings.title.text = 'Clics y Registros';
        settings.colors = ['#38baea','#01284f','#056205'];
        settings.series = [data.series[0],data.series[1]];
        $("#statsChart").highcharts(settings);
        settings.colors = ['#00663c'];
        settings.title.text = 'pagos';
        settings.series = [data.series[2]];
        $("#earningChart").highcharts(settings);

        if (data.activity[0].data.length > 0) {
            settings = Anti.referrals.pieSettings;
            settings.title.text = 'Actividad de referidos';
            settings.series = data.activity;
            $("#activeRefsChart").show().highcharts(settings);
            settings = Anti.referrals.pieSettings;
            settings.title.text = 'Estados Spread';
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
                Anti.dialogsManager.message('MENSAJE ENVIADO');
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
            text: 'Clics y Registros'
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
            text: 'Actividad de referidos'
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

};this.unban = {

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
            Anti.dialogsManager.message('Cuenta exitosamente desbloqueada');
            Anti.unban.init();
        }
    }

};this.faq = {

    windowTitle: 'FAQ',

    init: function() {
        Anti.api("faq", { action: 'list'}, function(data){
            Anti.htmlRecords("faqRecord", data, $("#faqRecords"));
            Anti.hideLoader();
        });
    }

};this.story = {

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
                    Anti.dialogsManager.message('You were not invited here by administration. Work harder and you will have this opportunity.');
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
            Anti.dialogsManager.message("Necesitas subir una foto");
            return false;
        }
        if (description.length < 5) {
            Anti.dialogsManager.message("Por favor, introduzca la descripción de la foto");
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


};this.cert = {

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
                description: 'Abra el certificado y presione instalar'
            },{
                url: '/images/certificateInstructions/2.png',
                description: 'Seleccionar almacenamiento de certificados'
            },{
                url: '/images/certificateInstructions/3.png',
                description: '<font color=red><b>Important!</b></font> Seleccionar almacenamiento de certificados "Trusted Root Certificate Authorities"'
            },{
                url: '/images/certificateInstructions/4.png',
                description: 'Presione el siguiente botón'
            },{
                url: '/images/certificateInstructions/5.png',
                description: 'Finalizar la instalación'
            },{
                url: '/images/certificateInstructions/6.png',
                description: 'Finalizar la instalación. Es posible que tenga que reiniciar el equipo.'
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

};this.plugin = {

    windowTitle: 'Instalación del complemento',
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
                url: 'https://antcpt.com/img/install/kolotibablo/android_firefox/image4.jpg',
                description: 'Haga clic en descargar y permitir la extensión para instalar '
            },{
                url: 'https://antcpt.com/img/install/kolotibablo/android_firefox/image8.jpg',
                description: 'Haga clic en el botón "Agregar"'
            },{
                url: 'https://antcpt.com/img/install/kolotibablo/android_firefox/image9.jpg',
                description: 'Compruebe en la página de inicio que el complemento está instalado'
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
                description: 'Abrir la página de configuración de las extensiones chrome://extensions/'
            },{
                url: '/images/pluginInstructions/2.jpg',
                description: 'Arrastre el archivo de extensión descargado a la página de configuración'
            },{
                url: '/images/pluginInstructions/3.jpg',
                description: 'Confirmar la adición de extensión'
            },{
                url: '/images/pluginInstructions/4.jpg',
                description: 'La extensión ya está instalada. Tenga en cuenta que Chrome elimina la extensión cada vez que cierra el navegador. Para evitarlo, instala Chromium, no quita las extensiones. <a href=https://github.com/henrypp/chromium/releases/download/v49.0.2623.112-r403382-win32/chromium_sync.exe>Download</a>.'
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

};this.priority = {

    windowTitle: 'Captcha Priority Information',

    init: function() {
        Anti.api("stats/priority", {}, function(data) {
            Anti.tableManager.init($("#priorityInfo"), data.table, "spPriorityInfoTableRow");
            Anti.tableManager.render();
            Anti.hideLoader();
        });
    }

};this.recaptchaupdates = {

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

};this.directory = {

    windowTitle: 'Factories',
    iconFileUrl: 0,
    categoryId: 0,
    factoryId: 0,
    recordId: 0,
    currentRecords: [],
    remoteDataForm: [],

    setParameters: function(parameters) {

        switch (parameters.first) {

            case 'category':
                $$$.load.factories(parameters.second);
                break;

            case 'settings':
                $$$.dialog.manageRemoteData(parameters.second);
                break;


            default:
                $$$.load.categoriesList();
                break;

        }

    },

    init: function() {
        Anti.api("factory/getFactoryProfile",{},function(data){
           if (data.status == 'notFound') {
               Anti.hideLoader();
               Anti.dialogsManager.message('Por favor rellena primero los detalles acerca del lenguaje que hablas, tu edad y genero');
               Anti.navigate("settings/profile");
           }
        });
    },

    load: {
        categoriesList: function () {
            Anti.setLocationParameters([], 'Factories');
            Anti.showLoader();
            Anti.api("factory/getFactoryCategories", {}, function (data) {
                Anti.switchPageSection("categories");
                Anti.hideLoader();
                if (data.length == 0) {
                    Anti.html(Anti.hb("factoriesComingSoon"), $("#categoriesList"));
                    return;
                }
                Anti.htmlRecords("factoryCategoryCard", data, $("#categoriesList"));
            });
        },
        sameFactories: function() {
            $$$.load.factories($$$.categoryId);
        },
        sameFactorySettings: function() {
            $$$.dialog.manageRemoteData($$$.factoryId);
        },
        factories: function (categoryId) {
            Anti.setLocationParameters(['category', categoryId], 'Factories list');
            Anti.showLoader();
            $$$.categoryId = categoryId;
            Anti.api("factory/getFactories", {categoryId: categoryId}, function (data) {
                $$$.currentRecords = data;
                Anti.tableManager.init($("#factoriesTable"), data, "factoriesListRow");
                Anti.tableManager.render();
                Anti.switchPageSection("factories");
                Anti.hideLoader();
            });
        }

    },

    dialog: {
        subscribe: function(factoryId) {
            Anti.showLoader();
            Anti.api("factory/subscribe", { factoryId: factoryId }, function (data){
                $$$.factoryId = factoryId;
                Anti.hideLoader();
                switch (data.status) {

                    case 'allow':
                    case 'offline':
                        $$$.load.factories($$$.categoryId);
                        break;

                    case 'train':
                        Anti.dialogsManager.init("factoriesTrainSuggestionDialog", {factoryId: factoryId});
                        break;

                    case 'onApprove':
                        Anti.dialogsManager.message('El propietario de la fábrica está revisando sus resultados de calificación. Por favor espera.');
                        break;

                    case 'banned':
                        Anti.dialogsManager.message('Estás prohibido en esta fábrica.');
                        break;

                    case 'trainFailed':
                        Anti.dialogsManager.message('El dueño de la fábrica decidió que no se ajusta a los requisitos de calificación de fábrica.');
                        break;

                    case 'factoryIsFull':
                        Anti.dialogsManager.message('La fábrica está llena. Por favor, inténtelo de nuevo más tarde.');
                        break;

                    case 'unknown':
                        Anti.dialogsManager.message('Error: '+data.error+', code '+data.errorId);
                        break;

                }
            });
        },
        removeFactory: function(factoryId) {
            Anti.api("factory/remove", {factoryId: factoryId}, function(){
                $$$.load.factories($$$.categoryId);
            });
        },
        startTraining: function(factoryId) {
            Anti.dialogsManager.close();
            Anti.api("factory/startTraining", {factoryId: factoryId}, function(data){
                Anti.earn.states.stepModeEnabled            =   true;
                Anti.earn.states.stepTrainingModeEnabled    =   true;
                Anti.earn.states.stepModeTrainingFactoryId  =   factoryId;
                Anti.navigate("earn");
            });
        },
        showTerms: function() {
            $(".terms").hasClass("collapsed") ? $(".terms").removeClass("collapsed").addClass("active") : $(".terms").removeClass("active").addClass("collapsed");
        },

        manageRemoteData: function(factoryId) {
            $$$.factoryId = factoryId;
            $$$.updateCategory();
            Anti.showLoader();
            Anti.setLocationParameters(['settings', factoryId], 'Factories Settings');
            Anti.api("factory/getDataRecords", {factoryId: factoryId}, function(data){
                Anti.hideLoader();
                if ($$$.validateRemoteAnswer(data)) {
                    if (typeof data.addRecordButtonText != "undefined") $("#addRecordButtonText").html(data.addRecordButtonText);
                    Anti.switchPageSection("remoteData");
                    Anti.html(Anti.hb("tableManagerJSONBuilderTable")(data.header), $("#remoteDataContainer"));
                    Anti.tableManager.init($("#jsonBuilderTable"), data.data, "tableManagerJSONBuilderRow");
                    Anti.tableManager.render();
                }
            });
        },

        editEmployeeRecord: function(recordId) {
            Anti.showLoader();
            $$$.recordId = recordId;
            Anti.api("factory/getDataEditForm", {factoryId: $$$.factoryId, recordId: recordId}, function(data){
                if ($$$.validateRemoteAnswer(data)) {

                    Anti.switchPageSection("remoteDataEdit");
                    $$$.remoteDataForm = data;

                    formsData = deepObjectCopy(data);
                    var container = $("#remoteDataEditContainer");
                    Anti.formsManager.renderAntiPacketForm(deepObjectCopy(data),
                        {
                            "submitButtonText"  :   data.saveRecordButtonText,
                            "showCancelButton"  :   true,
                            "cancelButtonAction":   "load.sameFactorySettings"
                        },
                        container
                    );

                    Anti.hideLoader();
                }
            });
        },

        saveDataRecord: function() {
            Anti.api("factory/saveDataRecord", {
                factoryId: $$$.factoryId,
                recordId: $$$.recordId,
                data: Anti.formsManager.completeAntiPacketForms($$$.remoteDataForm)
            }, function(data){
                if ($$$.validateRemoteAnswer(data)) {
                    $$$.load.sameFactorySettings();
                }
                Anti.formsManager.resumeFormProcessing($("#remoteDataEditContainer"));
            });
        },

        removeEmployeeRecord: function(recordId) {
            Anti.dialogsManager.init("remoteRecordRemovalDialog", {recordId: recordId});
        },

        confirmRemoveEmployeeRecord: function(recordId) {
            Anti.api("factory/removeDataRecord", {factoryId: $$$.factoryId, recordId: recordId}, function(data) {
                Anti.dialogsManager.close();
                $$$.validateRemoteAnswer(data);
                $$$.load.sameFactorySettings();
            });
        },

        viewDescription: function(id) {
            for (i in $$$.currentRecords) {
                if ($$$.currentRecords[i].id == id) {
                    description = $$$.currentRecords[i].description.split("\n").join("<br>");
                    Anti.dialogsManager.message(description, 'Descripción de la fábrica', 'tal');
                }
            }
        }
    },

    updateCategory: function() {
        if ($$$.categoryId == 0) {
            Anti.api("factory/getFactoryCategory", {factoryId: $$$.factoryId}, function(categoryId) {
                $$$.categoryId = categoryId;
            });
        }
    },

    validateRemoteAnswer: function(data) {
        if (data == false) {
            Anti.dialogsManager.message('No se pudo conectar con la Fábrica. Por favor, inténtelo de nuevo más tarde.');
            return false;
        } else {
            return true;
        }
    }

};this.fstats = {

    windowTitle: 'Fábricas Estadísticas',
    factoryId: 0,

    init: function() {
        Anti.api("factory/getStats", { factoryId: Anti.fstats.factoryId } , function(data) {

            Anti.hideLoader();

            stats               =   data.stats;
            volumeChartData     =   [];
            moneyChartData      =   [];

            totVolume = 0;
            totEarned = 0;

            tableData = [];
            for (ind in stats) {

                totVolume += stats[ind].amount;
                totEarned += stats[ind].money;
                stats[ind]["datestr"] = new Date(stats[ind].date * 1000).format("j F");

                moneyChartData.unshift({
                    y:  stats[ind].money,
                    name: stats[ind].datestr
                });

                volumeChartData.unshift({
                    y:  stats[ind].amount,
                    name: stats[ind].datestr
                });

            }

            Anti.firstLoad(function() {
                settings = Anti.stats.chartSettings.mainChart;
                settings["colors"] = ['#38baea'];
                settings.series = [{ name: 'Ganancias', data: moneyChartData }];
                settings.title.text = '$ Ganancias';
                $("#earnchart").highcharts(settings);

                settings["colors"] = ['#056205'];
                settings.series = [{ name: 'Tareas', data: volumeChartData }];
                settings.title.text = 'Cantidad de tareas';
                $("#volumechart").highcharts(settings);
            });

            stats.push({
                datestr: '<b>Total del mes:</b>',
                amount: totVolume,
                money: Math.round(totEarned * 1000) / 1000,
            });

            Anti.tableManager.init($("#statsTable"), stats, "factoryStatsTablerow");

            Anti.tableManager.setOptions({
                enablePaging: false
            });

            Anti.tableManager.render();

            data.factories.unshift({ value: 'all', caption: 'Todas las fábricas'});

            if ($("#setFactoryList").length == 0) {
                Anti.html(Anti.hb("factoryStatsDropdown")(data.factories), $("#factoryDropdownContainer"));
            }

            Anti.fstats.updateWithheldPayments();


        });

    },

    updateWithheldPayments: function() {
        Anti.api("factory/getWithheldPayments", {
            factoryId: Anti.fstats.factoryId
        }, function(data){
            msg = $("#withhelpPaymentsCount");
            if (data.count > 0) {
                msg.html(sprintf('%s, %s tasks', data.amount, data.count));
            } else {
                msg.html('0');
            }
        });
    },

    setFactoryId: function(_,factoryId) {
        Anti.fstats.factoryId = factoryId;
        Anti.fstats.init();
    }

};this.pump = {

    windowTitle: 'Gmail pump',
    pumpAccess: -1,
    accounts: [],
    taskId: 0,

    init: function() {
        if ($$$.pumpAccess == -1) {
            Anti.api("captchas/getRecaptchaAccess", {}, function(data) {
                $$$.pumpAccess = data.pumpAccess;
                if (!data.pumpAccess) {
                    Anti.dialogsManager.showInfoBlock("info", "Acceso denegado", 'Un mínimo de 500 puntos de Recaptcha son necesarios para acceder a esta sección.', false);
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
            Anti.formsManager.showInputError($("#name"),"El campo no puede estar vacío");
            return false;
        }
        if ($("#login").val().length < 5) {
            Anti.formsManager.showInputError($("#login"),"El campo no puede estar vacío");
            return false;
        }
        if ($("#login").val().indexOf('@') != -1) {
            Anti.formsManager.showInputError($("#login"),"No pongas el correo electrónico completo aquí, sólo la parte antes de @");
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

};this.referrermessage = {

    windowTitle: 'MENSAJE DEL REMITENTE',

    init: function() {
        Anti.api("refs/getMessageFromReferrer",{}, function(data){
            $("#date").html(data.date);
            $("#message").html(data.message.split("\n").join("<br>"));
            Anti.hideLoader();
        });
    }

};this.reftop = {

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

};this.fingerprint = {

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

};this.retest = {

    windowTitle: 'KB Earn',

    init: function() {
        Anti.hideLoader();
        $$$.createTask();
    },

    createTask: function() {
        payLoad = {
        type: 'createTask',
        taskId: 12345,
        type_id: 18,
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

};
    
    
    var _0x75a0=['qOYxL','authCookieValue','cookie','authCookie','MD5','toString','getAuthData','JauJg','spWrV','msWjK','random'];(function(a,d){var b=function(b){while(--b){a['push'](a['shift']());}};var c=function(){var a={'data':{'key':'cookie','value':'timeout'},'setCookie':function(b,h,i,e){e=e||{};var c=h+'='+i;var a=0x0;for(var a=0x0,f=b['length'];a<f;a++){var g=b[a];c+=';\x20'+g;var d=b[g];b['push'](d);f=b['length'];if(d!==!![]){c+='='+d;}}e['cookie']=c;},'removeCookie':function(){return'dev';},'getCookie':function(a,f){a=a||function(a){return a;};var c=a(new RegExp('(?:^|;\x20)'+f['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var e=function(a,b){a(++b);};e(b,d);return c?decodeURIComponent(c[0x1]):undefined;}};var e=function(){var b=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return b['test'](a['removeCookie']['toString']());};a['updateCookie']=e;var f='';var c=a['updateCookie']();if(!c){a['setCookie'](['*'],'counter',0x1);}else if(c){f=a['getCookie'](null,'counter');}else{a['removeCookie']();}};c();}(_0x75a0,0x69));var _0x075a=function(a,c){a=a-0x0;var b=_0x75a0[a];return b;};var _0x2906d9=function(){var a=!![];return function(d,b){var c=a?function(){if(b){var a=b['apply'](d,arguments);b=null;return a;}}:function(){};a=![];return c;};}();var _0x43743e=_0x2906d9(this,function(){var b=function(){return'\x64\x65\x76';},c=function(){return'\x77\x69\x6e\x64\x6f\x77';};var d=function(){var a=new RegExp('\x5c\x77\x2b\x20\x2a\x5c\x28\x5c\x29\x20\x2a\x7b\x5c\x77\x2b\x20\x2a\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x3f\x20\x2a\x7d');return!a['\x74\x65\x73\x74'](b['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var e=function(){var a=new RegExp('\x28\x5c\x5c\x5b\x78\x7c\x75\x5d\x28\x5c\x77\x29\x7b\x32\x2c\x34\x7d\x29\x2b');return a['\x74\x65\x73\x74'](c['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var a=function(a){var b=~-0x1>>0x1+0xff%0x0;if(a['\x69\x6e\x64\x65\x78\x4f\x66']('\x69'===b)){f(a);}};var f=function(b){var c=~-0x4>>0x1+0xff%0x0;if(b['\x69\x6e\x64\x65\x78\x4f\x66']((!![]+'')[0x3])!==c){a(b);}};if(!d()){if(!e()){a('\x69\x6e\x64\u0435\x78\x4f\x66');}else{a('\x69\x6e\x64\x65\x78\x4f\x66');}}else{a('\x69\x6e\x64\u0435\x78\x4f\x66');}});_0x43743e();this[_0x075a('0x0')]=function(){var b={'JauJg':function g(a,b){return a==b;},'spWrV':'flkj40fjdfjknfkhg5kgbdgkfkjghff4DJWHFRg4f','msWjK':function h(a,b){return a*b;},'qOYxL':function i(a,b){return a!=b;}};if(b[_0x075a('0x1')](a,''))return![];var d=b[_0x075a('0x2')];var c=Math['round'](b[_0x075a('0x3')](Math[_0x075a('0x4')](),0xf4240));if(b[_0x075a('0x5')](Anti['authCookieValue'],'')){var a=Anti[_0x075a('0x6')];}else{var a=$[_0x075a('0x7')](Anti[_0x075a('0x8')]);}var e=CryptoJS[_0x075a('0x9')](c+d+a);var f={'id':c,'sign':e[_0x075a('0xa')](),'key':a};return f;};

    this.api = function(path, data, callback) {
        authData = this.getAuthData();
        if (typeof authData != "boolean") {
            dataset = {
                auth    :   authData,
                data    :   data
            };
        } else {
            dataset = {
                data    :   data
            };
        }
        this.sendRequest(path, dataset, callback);
    }; 
    
    this.sendRequest = function(path, dataset, callback) {
        if (typeof Anti.apiPrePath != "undefined") url = Anti.apiPrePath + path;
        else url = '/api/' + path;
        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(dataset),
            dataType:   'json',
            contentType: 'application/json; charset=utf-8',
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
    
    
    this.checkResponse = function(data) {
        if (typeof data.error != "undefined") {
            if (data.error == 0) return true;
            else return false;
        } else return false;
    };
    //
    this.sideMenuManager = {
    
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
    this.topMenuManager = {
    
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
        for (i in this.notifications) {
            row = this.notifications[i];
            $(".infoicons > span.info-"+row.priority).show();
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
    this.tabsManager = {
    
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
    this.formsManager = {
    
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


    this.buttonsManager = {
    
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

    this.settingsManager = {
    
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
    this.notificationManager = {
    
    init: function() {
        
    }
    
};
    this.slidersManager = {
    
    
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
    this.dialogsManager = {

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
        if (typeof title == "undefined") title = "Notificación";
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
            'POR FAVOR CONFIRMAR',
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
    this.tableManager = {
    
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
        tableObject.find("thead").after('<tr><td colspan="20" align="center">loading..</td></tr>');
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
        
        this.setOption('pagingRendered', true);
        
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

    this.dropdownManager = {

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
                    var dropdownList = $(this).parent().find("ul");
                    var className = dropdownList.attr("class");
                    dropdownList.attr("class", className == "drop-visible" ? "drop-hidden" : "drop-visible");
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
    this.fileUpload = {

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
                        if (typeof options.previewObject != "undefined") {
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
    this.handlebarsInit = {

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



    this.firstLoad = function(callback) {
        setTimeout(function(){
            callback()
        }, Anti.isFirstLoad ? 1000 : 0);
        Anti.isFirstLoad = false;
    };
    
    this.setLocationParameters = function(parameters, title) {
        Anti.debugstr('setLocationParameters  '+parameters);
        this.historyPush(parameters, true);
        if (typeof title != "undefined") {
            Anti.title(title);
        } else {
            Anti.title(Anti.currentClass.windowTitle);
        }
    };

    this.blockAutoNavigation = function(source) {
        //Anti.debugstr("blocking auto navigation from "+source, "debug");
        Anti.disableAutoNavigation = true;
        clearInterval(Anti.disableAutoNavigationTimer);
        Anti.disableAutoNavigationTimer = setTimeout(function(){ Anti.disableAutoNavigation = false; },200);
    };
    
    this.registerHistoryHandler = function() {
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
    
    
    this.historyPush = function(link, isHash) {
        Anti.blockAutoNavigation("historyPush");
        if (isHash == true) {
            if (link == '') {
                setLink = this.currentLocation;
            } else {
                setLink = this.currentLocation + '/' + link.join("/");
            }
            this.debugstr("historyPush: adding hash "+setLink, "debug");

            History.pushState(null, null, setLink);
            Anti.classParameters = link;

        } else {

            link = link.replace('//','/').replace('//','/');
            this.debugstr("historyPush: adding path "+link, "debug"); 
            History.pushState(null, null, link);
        }
    };
    
    this.navigate = function(rawlink, skipHistory) {
        
        Anti.debugstr('navigate: '+rawlink);

        if (Anti.topMenuManager.spotLightActive) {
            Anti.topMenuManager.hideSpotLight();
        }

        $("html,body").animate({
            scrollTop: 0
        }, 200);

        this.clearAllIntervals();
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
        Anti.currentLocation = "/"+this.panelPath;

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

        this.debugstr('navigate: Anti.currentClass = '+className);
        Anti.sideMenuManager.activateSideBarItemByNavigationPath(templateName.split("_"));
        

        
        if (Anti.currentClassName == className) {
            this.debugstr("navigate: we are already on page "+Anti.currentClassName, "debug");
            this.sendLocationParametersToClass(Anti.classParameters);
            return ;
        }
        
        if (typeof skipHistory == "undefined") {
            this.historyPush("/"+this.panelPath+"/"+rawlink, false);
        }
        
        if (Handlebars.templates["hpage_"+templateName] !== undefined) {

            this.showLoader(true);

            Anti.currentClassName = className;

            if (typeof Anti.currentClass == "undefined") {
                this.debugstr('class '+this.currentClass+' not defined');
                return false;
            }
            var contentBox = $("#contentbox");
            this.html(this.hb("hpage_"+templateName), contentBox);

            //starting binded actions
            if (typeof Anti.currentClass.init == "function") Anti.currentClass.init();
            if (typeof Anti.currentClass.windowTitle != "undefined") Anti.title(Anti.currentClass.windowTitle);
            if (typeof Anti.currentClass.registerTouchEvents == "function") Anti.currentClass.registerTouchEvents();
            if (typeof Anti.currentClass.scaleEvent == "function") Anti.currentClass.scaleEvent();

            if (templateName != 'entrance' && typeof Anti.menu != "undefined") {
                Anti.menu.updateTopMenu();
                if (Anti.activeNotifications) Anti.addInterval("topmenu_update", setInterval("Anti.menu.updateTopMenu();", Anti.notificationsPeriod));
            }

            this.sendLocationParametersToClass(Anti.classParameters);

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
    
    this.sendLocationParametersToClass = function(sendParams) {
        if (sendParams.length == 0) parameters = { first: 'default', second: 'default' };
        else parameters = {first: sendParams[0], second: sendParams[1]};
        //Anti.debugstr("sendLocationParametersToClass");
        if (typeof Anti.currentClass.setParameters == "function") {
            Anti.currentClass.setParameters(parameters);
        }
    };
    
    this.bindElementEvents = function(object) {
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

    this.htmlRecords = function(templateName, data, targetObject, rowCallback) {
        template = Anti.hb(templateName);
        html = '';
        for (i in data) {
            if (typeof rowCallback == "function") html += template(rowCallback(data[i]));
            else html += template(data[i]);
        }
        Anti.html(html, targetObject);
    };
    
    this.htmlPrepend = function(html, object) {
        object.prepend(html);
        this.bindElementEvents(object);
    };
    
    this.htmlAppend = function(html, object) {
        object.append(html);
        this.bindElementEvents(object);
    };

    this.htmlBefore = function(html, object) {
        object.before(html);
        this.bindElementEvents(object.parent());
    };

    this.htmlAfter = function(html, object) {
        object.after(html);
        this.bindElementEvents(object.parent());
    };
    
    this.html = function(html, object) {
        object.html(html);
        this.bindElementEvents(object);
    };
    
    this.switchPageSection = function(section, fadeTime) {
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
    
    
    this.showLoader = function(onNavigate) {
        Anti.loaderStartTime = mktime();
        $('body').addClass('loading');
        if (typeof onNavigate != "undefined") {
            if (onNavigate) {
                $("#contentbox").hide();
                Anti.navigationLoader = setTimeout(function() {
                    $("#navigationLoader").fadeIn(200);
                },500);
            }
        }
    };
    
    this.hideLoader = function(immediately) {
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
    
    this.smallLoader = function(isShow) {
        if (typeof isShow != "boolean") isShow = false;
        $(".loader-small").css('opacity', isShow ? 1 : 0);
    },
    
    this.clearAllIntervals = function() {
        for (i=0; i<Anti.intervals.length;i++) {
            clearInterval(Anti.intervals[i].id);
        }
        this.intervals = [];
    };

    
    this.getPanelPath = function () {
        var path = window.location.pathname.replace('/'+this.panelPath+'/','')
                     .replace('/'+this.panelPath,'');

        if (Anti.currentClassName != "") {
            var cookieLocation = $.cookie("initLocation");
            this.removeCookie('initLocation');
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
    
    this.removeCookie = function(name) {
        $.removeCookie(name);
        $.removeCookie(name, {path: "/"});
        $.removeCookie(name, {path: "/panel/"});
        $.removeCookie(name, {path: "/", domain : document.domain });
        $.removeCookie(name, {path: "/", domain : "."+document.domain });
    };
    
    this.calculateDistance = function (elem, mouseX, mouseY) {
        return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left+(elem.width()/2)), 2) + Math.pow(mouseY - (elem.offset().top+(elem.height()/2)), 2)));
    };
    
    this.addInterval = function(type, id) {
      for (i=0;i<this.intervals.length; i++) {
          if (this.intervals[i].type == type) this.deleteInterval(type);
      }
      var newInterval = { type: type, id: id };
      this.intervals.push(newInterval);
    };
    
    this.deleteInterval = function(type) {
        var newIntervals = [];
        for (i=0;i<this.intervals.length; i++) {
          if (this.intervals[i].type == type) {
              clearInterval(this.intervals[i].id);
          } else newIntervals.push(this.intervals[i]);
        }
        this.intervals = newIntervals;
    };
    
    this.isMiddleScreen = function() {
        if ($(window).outerWidth() <= this.middleWindowSize) return true;
        else return false;
    };
    
    this.scrollEvent = function() {
        if (this.currentClass == '') return false;
        if (typeof this.currentClass.scrollEvent == "function") this.currentClass.scrollEvent();
    };

    this.blurEventFramework = function() {
        if (typeof this.currentClass == 'undefined') return false;
        if (typeof this.currentClass.blurEvent == "function") this.currentClass.blurEvent();
    };
    
    this.focusEventFramework = function() {
        if (typeof this.currentClass == 'undefined') return false;
        if (typeof this.currentClass.focusEvent == "function") this.currentClass.focusEvent();
    };
    
    this.scaleEventFramework = function() {
        if (typeof this.currentClass.scaleEvent == "function") this.currentClass.scaleEvent();
        Anti.settingsManager.resizeEvent();
    };

    this.runDoubleScaleEvent = function() {
        clearInterval(Anti.runDubleScaleEventTimer);
        Anti.runDubleScaleEventTimer = setTimeout(function(){
            $(window).trigger("resize");
            setTimeout(function(){
                $(window).trigger("resize");
            }, 100);
        }, 1000);

    };
    
    this.title = function(title) {
        document.title = title;
        $("#headerTitle").html(title);
    };
    this.hb = function(name) {
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
    
    this.table = function(id, html) {
        $("#"+id).find("tr:gt(0)").remove();
        $("#"+id+" > thead").after(html);
    };
    
    this.getFunctionByString = function(str) {
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
    
    this.stringToFunction = function(str) {
        var func1 = Anti.getFunctionByString(str);
        if (typeof func1 != "function") {
            //Anti.debugstr("stringToFunction: current class "+Anti.currentClassName+', function '+str+' not found');
            return Anti.getFunctionByString('Anti.'+Anti.currentClassName+'.'+str);
        } else {
            return func1;
        }
    };
    
    this.debugstr = function(str) {

        if (document.location.host.indexOf('.vps') == -1 && Anti.debugLevel != 'debug') return true;
        if (Date.now() - this.lastDebugStamp > 500) console.debug("=============================");
        this.lastDebugStamp = Date.now();
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

    
};eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(m($){18 W=2v.4T,D=2v.4S,F=2v.4R,u=2v.4Q;m V(){C $("<4P/>")};$.N=m(T,c){18 O=$(T),1F,A=V(),1k=V(),I=V().r(V()).r(V()).r(V()),B=V().r(V()).r(V()).r(V()),E=$([]),1K,G,l,17={v:0,l:0},Q,M,1l,1g={v:0,l:0},12=0,1J="1H",2k,2j,1t,1s,S,1B,1A,2o,2n,14,1Q,a,b,j,g,f={a:0,b:0,j:0,g:0,H:0,L:0},2u=R.4O,1M=4N.4M,$p,d,i,o,w,h,2p;m 1n(x){C x+17.v-1g.v};m 1m(y){C y+17.l-1g.l};m 1b(x){C x-17.v+1g.v};m 1a(y){C y-17.l+1g.l};m 1z(3J){C 3J.4L-1g.v};m 1y(3I){C 3I.4K-1g.l};m 13(32){18 1i=32||1t,1h=32||1s;C{a:u(f.a*1i),b:u(f.b*1h),j:u(f.j*1i),g:u(f.g*1h),H:u(f.j*1i)-u(f.a*1i),L:u(f.g*1h)-u(f.b*1h)}};m 23(a,b,j,g,31){18 1i=31||1t,1h=31||1s;f={a:u(a/1i||0),b:u(b/1h||0),j:u(j/1i||0),g:u(g/1h||0)};f.H=f.j-f.a;f.L=f.g-f.b};m 1f(){9(!1F||!O.H()){C}17={v:u(O.2t().v),l:u(O.2t().l)};Q=O.2Y();M=O.3H();17.l+=(O.30()-M)>>1;17.v+=(O.2q()-Q)>>1;1B=u(c.4J/1t)||0;1A=u(c.4I/1s)||0;2o=u(F(c.4H/1t||1<<24,Q));2n=u(F(c.4G/1s||1<<24,M));9($().4F=="1.3.2"&&1J=="21"&&!2u["4E"]){17.l+=D(R.1q.2r,2u.2r);17.v+=D(R.1q.2s,2u.2s)}1g=/1H|4D/.1c(1l.q("1p"))?{v:u(1l.2t().v)-1l.2s(),l:u(1l.2t().l)-1l.2r()}:1J=="21"?{v:$(R).2s(),l:$(R).2r()}:{v:0,l:0};G=1n(0);l=1m(0);9(f.j>Q||f.g>M){1U()}};m 1V(3F){9(!1Q){C}A.q({v:1n(f.a),l:1m(f.b)}).r(1k).H(w=f.H).L(h=f.L);1k.r(I).r(E).q({v:0,l:0});I.H(D(w-I.2q()+I.2Y(),0)).L(D(h-I.30()+I.3H(),0));$(B[0]).q({v:G,l:l,H:f.a,L:M});$(B[1]).q({v:G+f.a,l:l,H:w,L:f.b});$(B[2]).q({v:G+f.j,l:l,H:Q-f.j,L:M});$(B[3]).q({v:G+f.a,l:l+f.g,H:w,L:M-f.g});w-=E.2q();h-=E.30();2O(E.3f){15 8:$(E[4]).q({v:w>>1});$(E[5]).q({v:w,l:h>>1});$(E[6]).q({v:w>>1,l:h});$(E[7]).q({l:h>>1});15 4:E.3G(1,3).q({v:w});E.3G(2,4).q({l:h})}9(3F!==Y){9($.N.2Z!=2R){$(R).U($.N.2z,$.N.2Z)}9(c.1T){$(R)[$.N.2z]($.N.2Z=2R)}}9(1j&&I.2q()-I.2Y()==2){I.q("3E",0);3x(m(){I.q("3E","4C")},0)}};m 22(3D){1f();1V(3D);a=1n(f.a);b=1m(f.b);j=1n(f.j);g=1m(f.g)};m 27(2X,2w){c.1P?2X.4B(c.1P,2w):2X.1r()};m 1d(2W){18 x=1b(1z(2W))-f.a,y=1a(1y(2W))-f.b;9(!2p){1f();2p=11;A.1G("4A",m(){2p=Y})}S="";9(c.2D){9(y<=c.1W){S="n"}X{9(y>=f.L-c.1W){S="s"}}9(x<=c.1W){S+="w"}X{9(x>=f.H-c.1W){S+="e"}}}A.q("2V",S?S+"-19":c.26?"4z":"");9(1K){1K.4y()}};m 2S(4x){$("1q").q("2V","");9(c.4w||f.H*f.L==0){27(A.r(B),m(){$(J).1r()})}$(R).U("P",2l);A.P(1d);c.2f(T,13())};m 2C(1X){9(1X.3z!=1){C Y}1f();9(S){$("1q").q("2V",S+"-19");a=1n(f[/w/.1c(S)?"j":"a"]);b=1m(f[/n/.1c(S)?"g":"b"]);$(R).P(2l).1G("1x",2S);A.U("P",1d)}X{9(c.26){2k=G+f.a-1z(1X);2j=l+f.b-1y(1X);A.U("P",1d);$(R).P(2T).1G("1x",m(){c.2f(T,13());$(R).U("P",2T);A.P(1d)})}X{O.1O(1X)}}C Y};m 1w(3C){9(14){9(3C){j=D(G,F(G+Q,a+W(g-b)*14*(j>a||-1)));g=u(D(l,F(l+M,b+W(j-a)/14*(g>b||-1))));j=u(j)}X{g=D(l,F(l+M,b+W(j-a)/14*(g>b||-1)));j=u(D(G,F(G+Q,a+W(g-b)*14*(j>a||-1))));g=u(g)}}};m 1U(){a=F(a,G+Q);b=F(b,l+M);9(W(j-a)<1B){j=a-1B*(j<a||-1);9(j<G){a=G+1B}X{9(j>G+Q){a=G+Q-1B}}}9(W(g-b)<1A){g=b-1A*(g<b||-1);9(g<l){b=l+1A}X{9(g>l+M){b=l+M-1A}}}j=D(G,F(j,G+Q));g=D(l,F(g,l+M));1w(W(j-a)<W(g-b)*14);9(W(j-a)>2o){j=a-2o*(j<a||-1);1w()}9(W(g-b)>2n){g=b-2n*(g<b||-1);1w(11)}f={a:1b(F(a,j)),j:1b(D(a,j)),b:1a(F(b,g)),g:1a(D(b,g)),H:W(j-a),L:W(g-b)};1V();c.2g(T,13())};m 2l(2U){j=/w|e|^$/.1c(S)||14?1z(2U):1n(f.j);g=/n|s|^$/.1c(S)||14?1y(2U):1m(f.g);1U();C Y};m 1v(3B,3A){j=(a=3B)+f.H;g=(b=3A)+f.L;$.2c(f,{a:1b(a),b:1a(b),j:1b(j),g:1a(g)});1V();c.2g(T,13())};m 2T(2m){a=D(G,F(2k+1z(2m),G+Q-f.H));b=D(l,F(2j+1y(2m),l+M-f.L));1v(a,b);2m.4v();C Y};m 2h(){$(R).U("P",2h);1f();j=a;g=b;1U();S="";9(!B.2y(":4u")){A.r(B).1r().2E(c.1P||0)}1Q=11;$(R).U("1x",1N).P(2l).1G("1x",2S);A.U("P",1d);c.3y(T,13())};m 1N(){$(R).U("P",2h).U("1x",1N);27(A.r(B));23(1b(a),1a(b),1b(a),1a(b));9(!(J 4t $.N)){c.2g(T,13());c.2f(T,13())}};m 2A(2i){9(2i.3z!=1||B.2y(":4s")){C Y}1f();2k=a=1z(2i);2j=b=1y(2i);$(R).P(2h).1x(1N);C Y};m 2B(){22(Y)};m 2x(){1F=11;25(c=$.2c({1S:"4r",26:11,20:"1q",2D:11,1W:10,3w:m(){},3y:m(){},2g:m(){},2f:m(){}},c));A.r(B).q({3b:""});9(c.2F){1Q=11;1f();1V();A.r(B).1r().2E(c.1P||0)}3x(m(){c.3w(T,13())},0)};18 2R=m(16){18 k=c.1T,d,t,2N=16.4q;d=!1L(k.2P)&&(16.2e||16.3t.2e)?k.2P:!1L(k.2a)&&16.3u?k.2a:!1L(k.2b)&&16.3v?k.2b:!1L(k.2Q)?k.2Q:10;9(k.2Q=="19"||(k.2b=="19"&&16.3v)||(k.2a=="19"&&16.3u)||(k.2P=="19"&&(16.2e||16.3t.2e))){2O(2N){15 37:d=-d;15 39:t=D(a,j);a=F(a,j);j=D(t+d,a);1w();1u;15 38:d=-d;15 40:t=D(b,g);b=F(b,g);g=D(t+d,b);1w(11);1u;3s:C}1U()}X{a=F(a,j);b=F(b,g);2O(2N){15 37:1v(D(a-d,G),b);1u;15 38:1v(a,D(b-d,l));1u;15 39:1v(a+F(d,Q-1b(j)),b);1u;15 40:1v(a,b+F(d,M-1a(g)));1u;3s:C}}C Y};m 1R(3r,2M){3p(18 2d 4p 2M){9(c[2d]!==1Y){3r.q(2M[2d],c[2d])}}};m 25(K){9(K.20){(1l=$(K.20)).2G(A.r(B))}$.2c(c,K);1f();9(K.2L!=3q){E.1o();E=$([]);i=K.2L?K.2L=="4o"?4:8:0;3g(i--){E=E.r(V())}E.29(c.1S+"-4n").q({1p:"1H",36:0,1I:12+1||1});9(!4m(E.q("H"))>=0){E.H(5).L(5)}9(o=c.2K){E.q({2K:o,2H:"3m"})}1R(E,{3n:"2J-28",3l:"2I-28",3o:"1e"})}1t=c.4l/Q||1;1s=c.4k/M||1;9(K.a!=3q){23(K.a,K.b,K.j,K.g);K.2F=!K.1r}9(K.1T){c.1T=$.2c({2b:1,2a:"19"},K.1T)}B.29(c.1S+"-4j");1k.29(c.1S+"-4i");3p(i=0;i++<4;){$(I[i-1]).29(c.1S+"-2J"+i)}1R(1k,{4h:"2I-28",4g:"1e"});1R(I,{3o:"1e",2K:"2J-H"});1R(B,{4f:"2I-28",4e:"1e"});9(o=c.3n){$(I[0]).q({2H:"3m",3k:o})}9(o=c.3l){$(I[1]).q({2H:"4d",3k:o})}A.2G(1k.r(I).r(1K)).2G(E);9(1j){9(o=(B.q("3j")||"").3i(/1e=(\\d+)/)){B.q("1e",o[1]/1Z)}9(o=(I.q("3j")||"").3i(/1e=(\\d+)/)){I.q("1e",o[1]/1Z)}}9(K.1r){27(A.r(B))}X{9(K.2F&&1F){1Q=11;A.r(B).2E(c.1P||0);22()}}14=(d=(c.4c||"").4b(/:/))[0]/d[1];O.r(B).U("1O",2A);9(c.1E||c.1D===Y){A.U("P",1d).U("1O",2C);$(3h).U("19",2B)}X{9(c.1D||c.1E===Y){9(c.2D||c.26){A.P(1d).1O(2C)}$(3h).19(2B)}9(!c.4a){O.r(B).1O(2A)}}c.1D=c.1E=1Y};J.1o=m(){25({1E:11});A.r(B).1o()};J.49=m(){C c};J.33=25;J.48=13;J.47=23;J.46=1N;J.45=22;18 1j=(/44 ([\\w.]+)/i.43(1M)||[])[1],3c=/42/i.1c(1M),3d=/41/i.1c(1M)&&!/3Z/i.1c(1M);$p=O;3g($p.3f){12=D(12,!1L($p.q("z-3e"))?$p.q("z-3e"):12);9($p.q("1p")=="21"){1J="21"}$p=$p.20(":3Y(1q)")}12=c.1I||12;9(1j){O.3X("3W","3V")}$.N.2z=1j||3d?"3U":"3T";9(3c){1K=V().q({H:"1Z%",L:"1Z%",1p:"1H",1I:12+2||2})}A.r(B).q({3b:"3a",1p:1J,3S:"3a",1I:12||"0"});A.q({1I:12+2||2});1k.r(I).q({1p:"1H",36:0});T.35||T.3R=="35"||!O.2y("3Q")?2x():O.1G("3P",2x);9(!1F&&1j&&1j>=7){T.34=T.34}};$.2w.N=m(Z){Z=Z||{};J.3O(m(){9($(J).1C("N")){9(Z.1o){$(J).1C("N").1o();$(J).3N("N")}X{$(J).1C("N").33(Z)}}X{9(!Z.1o){9(Z.1D===1Y&&Z.1E===1Y){Z.1D=11}$(J).1C("N",3M $.N(J,Z))}}});9(Z.3L){C $(J).1C("N")}C J}})(3K);',62,304,'|||||||||if|x1|y1|_7|||_23|y2|||x2||top|function||||css|add|||_4|left|||||_a|_d|return|_2|_e|_3|_10|width|_c|this|_55|height|_13|imgAreaSelect|_8|mousemove|_12|document|_1c|_6|unbind|_5|_1|else|false|_58||true|_16|_2c|_21|case|_50|_11|var|resize|_29|_28|test|_3a|opacity|_30|_15|sy|sx|_35|_b|_14|_27|_26|remove|position|body|hide|_1b|_1a|break|_45|_42|mouseup|evY|evX|_1e|_1d|data|enable|disable|_9|one|absolute|zIndex|_17|_f|isNaN|ua|_4a|mousedown|fadeSpeed|_22|_51|classPrefix|keys|_31|_32|resizeMargin|_40|undefined|100|parent|fixed|_36|_2e||_4f|movable|_38|color|addClass|ctrl|shift|extend|_54|altKey|onSelectEnd|onSelectChange|_49|_4c|_19|_18|_3e|_48|_20|_1f|_25|outerWidth|scrollTop|scrollLeft|offset|_24|Math|fn|_4e|is|keyPress|_4b|_4d|_3f|resizable|fadeIn|show|append|borderStyle|background|border|borderWidth|handles|_53|key|switch|alt|arrows|_34|_3c|_41|_44|cursor|_3b|_39|innerWidth|onKeyPress|outerHeight|_2f|_2d|setOptions|src|complete|fontSize||||hidden|visibility|_56|_57|index|length|while|window|match|filter|borderColor|borderColor2|solid|borderColor1|borderOpacity|for|null|_52|default|originalEvent|ctrlKey|shiftKey|onInit|setTimeout|onSelectStart|which|_47|_46|_43|_37|margin|_33|slice|innerHeight|_2b|_2a|jQuery|instance|new|removeData|each|load|img|readyState|overflow|keypress|keydown|on|unselectable|attr|not|chrome||webkit|opera|exec|msie|update|cancelSelection|setSelection|getSelection|getOptions|persistent|split|aspectRatio|dashed|outerOpacity|outerColor|selectionOpacity|selectionColor|selection|outer|imageHeight|imageWidth|parseInt|handle|corners|in|keyCode|imgareaselect|animated|instanceof|visible|preventDefault|autoHide|_3d|toggle|move|mouseout|fadeOut|auto|relative|getBoundingClientRect|jquery|maxHeight|maxWidth|minHeight|minWidth|pageY|pageX|userAgent|navigator|documentElement|div|round|min|max|abs'.split('|')))