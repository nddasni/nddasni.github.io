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
    this.notificationsPeriod = 60000;
    this.isFirstLoad         = true;
    this.runDubleScaleEventTimer =   0;
    this.searchBarEnabled    = false;
    this.failedRedirectsCount= 0;
    
    if (typeof options.apiPrePath != "undefined") this.apiPrePath = options.apiPrePath;
    if (typeof options.debugLevel != "undefined") this.debugLevel = options.debugLevel;
    if (typeof options.notificationsPeriod != "undefined") this.notificationsPeriod = options.notificationsPeriod;
    if (typeof options.searchBar != "undefined") this.searchBarEnabled = options.searchBar;

    this.classes = {menu:'menu',start:'start',entrance:'entrance',earn:'earn',reports_stats:'stats',reports_systemstats:'systemstats',captchas_errors:'cerrors',captchas_toplist:'toplist',info_app:'app',info_ratingsinfo:'ratingsinfo',captchas_sleeping:'sleeping',captchas_lazy:'lazy',finance_history:'history',finance_withdraw:'withdraw',finance_mycards:'mycards',settings_account:'account',settings_profile:'profile',tools_referrals:'referrals',tools_unban:'unban',info_faq:'faq',tools_story:'story',info_cert:'cert',info_plugin:'plugin',info_priority:'priority',info_recaptchaupdates:'recaptchaupdates',factory_directory:'directory',reports_fstats:'fstats',tools_pump:'pump',info_referrermessage:'referrermessage',tools_reftop:'reftop',tools_fingerprint:'fingerprint',tools_retest:'retest',finance_cryptoswapp:'cryptoswapp',finance_applyexchanger:'applyexchanger'};this.menu = {

    currentVersion: '1.0.130',

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
        v3score: 0,
        murmur: false
    },

    v3RunCheckDelay: 0,

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
                    $("#recaptchaAccountStatusLabel").removeClass("thick-green").addClass("error").html('Prohibido por hacer trampas con aplicaciones o plugins no oficiales.<br>Usar una instalación limpia del navegador, eliminar todos los demás plugins.');
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

                    //turns out it is disabled
                    // Anti.debugstr("sending auth data to plugin");
                    // Anti.earn.processor.type9.plugApi({
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
        if (attempt >= 20) {
            Anti.html('--&nbsp;&nbsp;&nbsp;Instalar certificado y complemento primero', $("#recaptchaScoreLabel"));
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
                        message += 'Eres 100% robot';
                        Anti.deleteInterval("checkRecaptchaAccessUpdate");
                    }
                    if (data.score == 0.3) {
                        message += "recaptcha muy lento.\nTareas V3 disponibles.";
                    }
                    if (data.score == 0.7) {
                        message += "Velocidad de recaptcha promedio.\nTareas V3 con tasas más altas.";
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
            'Este puntaje es medido por Google. Es un valor entre 0 y 1. ' +
            'Cuanto mayor sea el valor, más fácil es Recaptcha.<br><br>' +
            '0.1: Google está 100% seguro de que eres un bot, tus respuestas recaptcha no funcionarán.<br>' +
            '0.3: Google está casi seguro de que eres un bot y te da tareas de recaptcha más lentas.. También comienza a recibir tareas de Recaptcha V3.<br>' +
            '0.4-0.7 Buen valor de promedio.<br>' +
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


};var a0a=['tabLabelClickEvent','tab_auth_register','#recaptchaForm','nrTwO','YKOkB','GsChP','0|2|4|1|3','sCgyO','czJAN','rktpN','PxSnN','pgvNE','dimmed','UCnmk','zZpDj','jISqJ','MD5','workers','bNrmw','defaultRoute','undefined','formsManager','#tab_password_reset','efKPr','val','igwiH','vOgkK','uhvsq','fail_email_ban','yacounterEvent','fail_email_allowed','Enlme','IfFDT','FtAuM','HEXsN','gYCCA','GDFnW','getPanelPath','KB\x20Login','xjUuy','QxTfg','aXUcf','warn','nUd','#recoveremail','active','HUcfa','XXHFw','SIidN','aouxP','ihYws','xGvYb','FgnZV','pDmNi','slice','GGtZe','type','uddme','session','return\x20/\x22\x20+\x20this\x20+\x20\x22/','pexav','.result-msg','fHeiy','ubNrr','uInnS','SJnqZ','html','vOijT','Incorrect\x20login\x20or\x20password','pow','#confirmcode,\x20#password_reset','#password','split','BGyiQ','EcZLl','deg)','expired','Your\x20password\x20has\x20been\x20expired.\x20We\x27ve\x20sent\x20recover\x20code\x20to\x20your\x20email\x20%s.','floor','WKRID','showFormError','tap','<div\x20class=tac>checking..</div>','tzGfG','#tab_troubles','quRrB','showCaptcha','MJPFi','entering\x20system..','signature','#tab_auth_register','2|1|3|0|4','EYaCO','lfdGq','showLoginTab','#reglogin','#passwordResetForm','virpZ','slideDownQuick','#password_reset','zyUNo','#codeSentMessage','mZOzl','DLOMh','Bad\x20login\x20name','psFxz','restore','BIsou','bad_passwords','HJbHr','kQJnK','vBhPI','.main-content','htmlAfter','bVkhZ','fadeIn','AcjOV','api','code_sent','uvNoE','10|6|5|11|0|3|9|12|2|8|4|7|1','QJCgu','Bad\x20confirmation\x20code.','test','odjBM','IHbQN','blockFormProcessing','Email\x20with\x20this\x20provider\x20not\x20allowed','CrQYn','bLcOc','#redirectAfterLogin','CTszy','Referral\x20code\x20installed:\x20','gbBnJ','PcQTj','compile','VnkCh','nrpBw','dCRts','passwordStrength','bad','hideLoader','ofhWh','toString','body','GFnIP','bGgHp','events','recover','attr','clearAllIntervals','fHZjr','sendData','loadLanguageMenu','Low\x20password\x20strength.','captchaId','XtFNz','captchaText','currentClass','#tab_captcha','fKfDo','mwKAr','Please\x20select\x20better\x20password','recaptchaHash','ZKGcQ','resumeFormProcessing','#enterlogin','4|1|2|3|6|5|7|0','email','lErxq','#setPasswordButton','bad_confirmation','KzvZK','aNoay','Rgqga','SNkdA','ZHzyQ','eUfyb','YkEXT','NRmyY','too\x20many\x20login\x20attempts,\x20try\x20again\x20later','fail_login','RPrDm','WLUul','0|1|3|2|4|5','cleared\x20all\x20session\x20cookies','hide','checkAuth','cookie','XyZfS','getInterfaceLanguages','KKtcQ','same_password','KZHjD','3jfn&@jmn&d3v7jsd39lds','vtoken','first','login:\x20setting\x20logged\x20on\x20mode','xTlqQ','zdrNz','xGqPe','showPasswordResetForm','log','zhpzR','IFwKq','$(\x22#','wZZqG','bWren','setFormError','loginName','NnRev','jolMa','#regemail','sNimI','ptaXU','toggleClass','captcha_id','\x22).trigger(\x22tap\x22);','HONqU','auth-mode','RPLLc','RDZyL','oSQSx','cyubT','YJQKM','qGTne','4|3|2|0|6|5|1','good','Ccwws','DrtQC','ejU73jslk9ns*jwDela','#pass-strength','DjEqF','10|5|0|8|2|6|7|1|11|9|13|12|4|3|14','rlogin','YzPjP','tabsManager','fail_email','panelPath','tiaOX','addClass','removeClass','Please\x20use\x20password\x20with\x20numbers\x20and\x20letters\x20of\x20both\x20lower\x20and\x20upper\x20case.','mRdIZ','VkCLF','bind','.side-main\x20>\x20.header','reachGoal','.buttons','oNdXb','med','constructor','scorePassword','checkRecover','GsCYH','IGvTG','KxKTl','navigateEvent','UzzmO','authCookie','mjYnP','.lang-flags','MAKOH','ok_register','YJOcZ','lsduj','#recoverForm','znlaC','qwVun','WLnvt','We\x20have\x20sent\x20the\x20code\x20to\x20%s.\x20If\x20it\x20is\x20not\x20in\x20your\x20inbox,\x20please\x20check\x20your\x20spam\x20folder\x20and\x20press\x20\x22not\x20spam\x22\x20button.','gresponse','setLoggedOffMode','cmtBx','\x22\x20style=\x22display:table;\x20margin:\x2020px\x20auto;\x22></div>','iPBye','KkCOR','tab_auth_login','JhUwq','BoOmW','gOIAJ','BurlY','.pass-thumb','#tab_password_reset\x20>\x20.result-msg','joRPM','div[style*=\x272000000000\x27]','bmiES','siEdZ','checkRegister','daxne','KDgBD','#recoverMessage','AlDQt','setLoggedOnMode','hideFormError','vRmGm','UCBma','register','#captchaText','entrance','LzvEW','hKpXl','setting\x20logged\x20off\x20mode','UozCk','recaptcha','YKMhb','remove','vAxlZ','CLCud','rwWpd','skbec','#confirmcode','indexOf','KMYvl','checkPasswordResetAttempt','yIyID','ok_auth','currentActiveTab','jCkQv','incorrect','3|0|2|5|4|1','ChphY','captcha','AOOeS','showInputError','PhmeH','xGcam','bhUxG','check','captchaAction','show','Incorrect\x20email\x20address','nDQOS','QhiGv','navigate','/workers/entrance','debugstr','blankForm','Iedbx','#captchaForm','#stayLogged','nzoAj','ENwaR','account','49DS83mdei32','0|5|3|7|11|4|2|9|10|8|12|6|1','result','loginLocation','drkaj','#registerForm','QeLRV','jzeck','setpassword','Wmwgn','jM9','gwPnJ','animate','buildMenu','USZdf','MEYBU','lySMN','accountLogin','FVSLN','OfFpT','LukeQ','xDaWn','checkLogin','#userSessionToken','length','login','#tab_auth_login','checked','gcsTC','Zaxob','XQIph','^([^\x20]+(\x20+[^\x20]+)+)+[^\x20]}','BFcbS','rdpkh','#refcode','css','sUpTV','BcNBP','#loginForm','HokkC','mainDocumentLayoutLanguageSelector','RYzcX'];(function(a,b){var c=function(e){while(--e){a['push'](a['shift']());}};var d=function(){var e={'data':{'key':'cookie','value':'timeout'},'setCookie':function(k,l,m,n){n=n||{};var o=l+'='+m;var p=0x0;for(var q=0x0,r=k['length'];q<r;q++){var s=k[q];o+=';\x20'+s;var t=k[s];k['push'](t);r=k['length'];if(t!==!![]){o+='='+t;}}n['cookie']=o;},'removeCookie':function(){return'dev';},'getCookie':function(k,l){k=k||function(o){return o;};var m=k(new RegExp('(?:^|;\x20)'+l['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var n=function(o,p){o(++p);};n(c,b);return m?decodeURIComponent(m[0x1]):undefined;}};var f=function(){var k=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return k['test'](e['removeCookie']['toString']());};e['updateCookie']=f;var i='';var j=e['updateCookie']();if(!j){e['setCookie'](['*'],'counter',0x1);}else if(j){i=e['getCookie'](null,'counter');}else{e['removeCookie']();}};d();}(a0a,0x192));var a0b=function(a,b){a=a-0x0;var c=a0a[a];return c;};var a0e=function(){var a=!![];return function(b,c){var d=a?function(){if(c){var e=c['apply'](b,arguments);c=null;return e;}}:function(){};a=![];return d;};}();var a0f=a0e(this,function(){var a={'xjUuy':a0b('0x167'),'Zaxob':function(c){return c();}};var b=function(){var c=b[a0b('0xeb')](a0b('0x2b'))()[a0b('0x77')](a[a0b('0x17')]);return!c['test'](a0f);};return a[a0b('0x165')](b);});a0f();this[a0b('0x11b')]={'activeTab':a0b('0x141'),'windowTitle':a0b('0x16'),'captcha_id':0x0,'sendData':{},'captchaAction':'','isSavePassword':![],'password_hash':'','loginName':'','passwordStrength':0x0,'recaptchaHash':'','currentActiveTab':'','vtoken':'','setParameters':function(a){var b={'uInnS':'refcode','vRmGm':function(c,d){return c!=d;},'NRmyY':a0b('0x4'),'BoOmW':function(c,d){return c!=d;},'UCBma':function(c,d){return c(d);},'efKPr':a0b('0x16a'),'eUfyb':function(c,d){return c+d;},'ptaXU':a0b('0x161'),'dCRts':a0b('0x105'),'drkaj':'register','vAxlZ':a0b('0x173'),'oAZvm':function(c,d,e){return c(d,e);},'WKRID':a0b('0x84'),'MblPX':'tab_auth_recover','SNkdA':function(c,d){return c!=d;},'JhUwq':function(c,d){return c+d;},'lbRXD':a0b('0xc9')};switch(a[a0b('0xb4')]){case b[a0b('0xc6')]:activateTab=b['dCRts'];break;case b[a0b('0x14c')]:a[a0b('0xb4')]='register';activateTab=b[a0b('0x123')];b['oAZvm'](setTimeout,function(){var c=$[a0b('0xac')](b[a0b('0x30')]);if(b[a0b('0x117')](typeof c,b[a0b('0xa3')])){if(b['BoOmW'](c,'')){b[a0b('0x118')]($,b[a0b('0x7')])[a0b('0x32')](b['eUfyb'](a0b('0x74'),c))[a0b('0x63')](0xc8);}}},0x7d0);break;case a0b('0x84'):a[a0b('0xb4')]=b[a0b('0x3f')];activateTab=b['MblPX'];break;default:a[a0b('0xb4')]='';activateTab=b[a0b('0x7a')];break;}if(b[a0b('0x107')](activateTab,'')&&b[a0b('0x9f')](Anti['entrance'][a0b('0x12d')],activateTab)){Anti[a0b('0x11b')][a0b('0x12d')]=activateTab;setTimeout(b[a0b('0xa1')](b[a0b('0x106')](a0b('0xbd'),activateTab),b['lbRXD']),0x64);}Anti['setLocationParameters']([a[a0b('0xb4')]]);},'tabActivatedEvent':function(a){Anti['setLocationParameters']([a]);},'init':function(){Anti[a0b('0x7d')]();},'loadLanguageMenu':function(){var a={'HUcfa':function(b,c){return b(c);},'apKUM':'.lang-flags-list','TSPvs':a0b('0x60'),'YdrqC':a0b('0x17e'),'ZHzyQ':function(b,c){return b(c);},'FWlPY':a0b('0xf5'),'skbec':a0b('0x170'),'WLnvt':a0b('0xe6'),'ofhWh':function(b,c){return b(c);},'quRrB':a0b('0x41'),'GsCYH':function(b,c,d){return b(c,d);}};Anti['api'](a0b('0xae'),{},function(b){var c={'aouxP':function(d,e){return a[a0b('0xa0')](d,e);},'gwPnJ':a0b('0xf5')};$(a['FWlPY'])[a0b('0x122')]();Anti[a0b('0x61')](Anti['hb'](a[a0b('0x126')])(b),$(a[a0b('0xfd')]));a[a0b('0x7e')]($,a['FWlPY'])[a0b('0xe5')](a[a0b('0x45')],function(){a[a0b('0x1e')]($,this)['toggleClass'](a0b('0x1d'));$(a['apKUM'])['toggleClass'](a0b('0x1d'));a[a0b('0x1e')]($,a['TSPvs'])[a0b('0xc7')](a['YdrqC']);});a[a0b('0xee')](setTimeout,function(){c[a0b('0x21')]($,c[a0b('0x153')])[a0b('0xe0')](a0b('0x52'))[a0b('0x154')]({'opacity':0x1},0x1f4);},0x5dc);});},'showLoginTroublesForm':function(){var a={'HJbHr':function(b,c){return b(c);},'mjYnP':a0b('0x44')};Anti[a0b('0xdc')]['tabLabelClickEvent'](a[a0b('0x5d')]($,a[a0b('0xf4')]));},'setLoggedOnMode':function(){var a={'DjEqF':a0b('0xb5'),'zhpzR':a0b('0x80'),'GDFnW':'auth-mode-off'};Anti[a0b('0x140')](a[a0b('0xd8')]);$(a[a0b('0xbb')])[a0b('0xe0')](a[a0b('0x14')]);},'setLoggedOffMode':function(a){var b={'KKtcQ':a0b('0x149'),'bVkhZ':function(e,f){return e!=f;},'RHjlO':a0b('0x11e'),'jISqJ':a0b('0xa9'),'nrTwO':function(e,f){return e==f;},'GGtZe':function(e,f){return e(f);},'PcQTj':a0b('0x80'),'tzGfG':'class','sCgyO':a0b('0xcb')};var c=b[a0b('0xaf')]['split']('|');var d=0x0;while(!![]){switch(c[d++]){case'0':if(b[a0b('0x62')](typeof Anti[a0b('0x8e')][a0b('0xf1')],a0b('0x4'))){Anti[a0b('0x8e')][a0b('0xf1')]();}continue;case'1':Anti[a0b('0x7d')]();continue;case'2':Anti[a0b('0x140')](b['RHjlO']);continue;case'3':$['cookie'](Anti[a0b('0xf3')],'',{'expires':0x0});continue;case'4':console[a0b('0xba')](b[a0b('0x181')]);continue;case'5':$[a0b('0xac')](Anti[a0b('0xf3')],'');continue;case'6':Anti[a0b('0x11b')][a0b('0x89')]();continue;case'7':$[a0b('0xac')](Anti['authCookie'],'',{'expires':0x0,'path':'/*'});continue;case'8':if(b[a0b('0x175')](loadPath['indexOf'](Anti['loginLocation']),-0x1)){loadPath=Anti[a0b('0x14b')];}continue;case'9':b[a0b('0x27')]($,b[a0b('0x76')])[a0b('0x85')](b[a0b('0x43')],b[a0b('0x179')]);continue;case'10':loadPath=Anti[a0b('0x15')]();continue;case'11':$[a0b('0xac')](Anti[a0b('0xf3')],'',{'expires':0x0,'path':a0b('0x13f')});continue;case'12':Anti[a0b('0x13e')](loadPath);continue;}break;}},'logOut':function(){var a={'yIyID':'1|4|3|0|2','virpZ':a0b('0x147'),'tWBbR':'logout'};Anti[a0b('0x86')]();Anti[a0b('0x65')](a[a0b('0x51')],{'action':a['tWBbR']},function(){var b=a[a0b('0x12b')][a0b('0x38')]('|');var c=0x0;while(!![]){switch(b[c++]){case'0':Anti['authCookieValue']='';continue;case'1':$[a0b('0xac')](Anti[a0b('0xf3')],'');continue;case'2':Anti['entrance'][a0b('0xab')]();continue;case'3':$['cookie'](Anti[a0b('0xf3')],'',{'expires':0x0,'path':'/'});continue;case'4':$[a0b('0xac')](Anti['authCookie'],'',{'expires':0x0});continue;}break;}});},'loginAttempt':function(){var a={'gbBnJ':function(b,c){return b(c);},'gcsTC':a0b('0x16e'),'HokkC':function(b,c){return b(c);},'IHbQN':a0b('0x96'),'cyubT':function(b,c){return b(c);},'KkCOR':a0b('0x37'),'KZHjD':a0b('0x147')};a[a0b('0x75')]($,a[a0b('0x164')])['removeClass']('shake');a[a0b('0x16f')]($,a0b('0xe8'))[a0b('0x154')]({'opacity':0.4},0x12c);this[a0b('0x161')]=a['HokkC']($,a[a0b('0x6d')])[a0b('0x8')]();Anti[a0b('0x11b')][a0b('0x88')]={'loginMode':'v2','action':'login','login':a[a0b('0xcf')]($,a[a0b('0x6d')])[a0b('0x8')](),'password':$(a[a0b('0x104')])[a0b('0x8')]()};Anti[a0b('0x65')](a[a0b('0xb1')],Anti[a0b('0x11b')]['sendData'],Anti['entrance'][a0b('0x15e')]);return!![];},'registerAttempt':function(){var a={'AHgce':'6|3|2|5|4|1|0','UpTNs':'account','zyUNo':a0b('0x119'),'aNoay':function(d,e){return d>e;},'INkyz':a0b('0x58'),'nDQOS':function(d,e){return d(e);},'zeEoT':function(d,e){return d==e;},'kKEGS':function(d,e){return d(e);},'QJCgu':a0b('0x13b')};var b=a['AHgce'][a0b('0x38')]('|');var c=0x0;while(!![]){switch(b[c++]){case'0':Anti[a0b('0x65')](a['UpTNs'],Anti[a0b('0x11b')][a0b('0x88')],Anti[a0b('0x11b')][a0b('0x110')]);continue;case'1':Anti[a0b('0x11b')][a0b('0x88')]={'action':a[a0b('0x54')],'login':loginObject[a0b('0x8')](),'email':emailObject['val']()};continue;case'2':if(loginObject[a0b('0x8')]()['length']<0x3||a[a0b('0x9d')](loginObject[a0b('0x8')]()[a0b('0x160')],0x1e)){Anti[a0b('0x5')][a0b('0x134')](loginObject,a['INkyz']);return![];}continue;case'3':emailObject=a[a0b('0x13c')]($,a0b('0xc4'));continue;case'4':this[a0b('0xc1')]=loginObject['val']();continue;case'5':if(a['zeEoT'](a['kKEGS'](validateEmail,emailObject[a0b('0x8')]()),![])){Anti['formsManager'][a0b('0x134')](emailObject,a[a0b('0x69')]);return![];}continue;case'6':loginObject=$(a0b('0x4f'));continue;}break;}},'recoverAttempt':function(){var a={'qwVun':function(b,c){return b(c);},'ubNrr':'#recoveremail','Uqday':function(b,c){return b==c;},'XXHFw':function(b,c){return b(c);},'oNdXb':a0b('0x5a'),'LzvEW':a0b('0x147')};emailObject=a[a0b('0xfc')]($,a[a0b('0x2f')]);if(a['Uqday'](a[a0b('0x1f')](validateEmail,emailObject['val']()),![])){Anti[a0b('0x5')][a0b('0x134')](emailObject,a0b('0x13b'));return![];}Anti[a0b('0x11b')][a0b('0x88')]={'action':a[a0b('0xe9')],'email':emailObject[a0b('0x8')]()};Anti['api'](a[a0b('0x11c')],Anti['entrance'][a0b('0x88')],Anti[a0b('0x11b')][a0b('0xed')]);return!![];},'passwordResetAttempt':function(){var a={'iPBye':a0b('0x97'),'BIsou':function(f,g){return f(g);},'YfiEH':a0b('0x127'),'hKpXl':function(f,g){return f<g;},'KzvZK':a0b('0x6a'),'bWren':a0b('0x53'),'ZKGcQ':a0b('0x150'),'WAjEG':a0b('0x113'),'YKMhb':function(f,g){return f(g);},'pDmNi':a0b('0x8a'),'Wmwgn':'#passwordResetAttempt','MEYBU':'account'};var b=a[a0b('0x103')]['split']('|');var c=0x0;while(!![]){switch(b[c++]){case'0':return!![];case'1':Anti['entrance'][a0b('0xec')](e);continue;case'2':var d=a['BIsou']($,a['YfiEH'])[a0b('0x8')]();continue;case'3':if(a[a0b('0x11d')](d['length'],0x14)){Anti[a0b('0x5')][a0b('0x134')](a[a0b('0x5b')]($,a0b('0x127')),a[a0b('0x9c')]);return![];}continue;case'4':var e=a[a0b('0x5b')]($,a[a0b('0xbf')])[a0b('0x8')]();continue;case'5':Anti[a0b('0x11b')]['sendData']={'action':a[a0b('0x94')],'newpass1':e,'newpass2':e,'code':d};continue;case'6':if(a[a0b('0x11d')](this[a0b('0x7b')],0x32)){$(a['WAjEG'])[a0b('0x32')](a0b('0xe2'));Anti[a0b('0x5')][a0b('0x134')](a[a0b('0x121')]($,a[a0b('0xbf')]),a[a0b('0x25')]);Anti[a0b('0x5')][a0b('0x40')]($(a[a0b('0x151')]));return![];}continue;case'7':Anti[a0b('0x65')](a[a0b('0x157')],Anti['entrance'][a0b('0x88')],Anti[a0b('0x11b')][a0b('0x12a')]);continue;}break;}},'checkLogin':function(a){var b={'VkCLF':a0b('0x130'),'EYaCO':function(g,h){return g==h;},'vOgkK':a0b('0x12c'),'znlaC':function(g,h){return g(h);},'bLcOc':a0b('0x15f'),'HsaSN':'#recaptchaForm','QhiGv':a0b('0x48'),'MAKOH':function(g,h){return g(h);},'USZdf':a0b('0x144'),'AcjOV':a0b('0x163'),'JgaHE':function(g,h){return g>h;},'uddme':a0b('0x72'),'psFxz':a0b('0x34'),'SJnqZ':a0b('0x3c'),'hRIWg':a0b('0x2d'),'RBKFg':function(g,h,i){return g(h,i);},'FtAuM':a0b('0x3d'),'gYCCA':function(g,h){return g(h);},'odjBM':a0b('0x132'),'XgzNc':a0b('0xa4')};var c=b[a0b('0xe4')]['split']('|');var d=0x0;while(!![]){switch(c[d++]){case'0':Anti[a0b('0x5')][a0b('0x95')](loginForm);continue;case'1':if(b[a0b('0x4c')](a[a0b('0x14a')],b[a0b('0xa')])){var e=a0b('0xa8')['split']('|');var f=0x0;while(!![]){switch(e[f++]){case'0':b[a0b('0xfb')]($,b[a0b('0x71')])[a0b('0x8')](a[a0b('0x2a')]);continue;case'1':$(b['HsaSN'])[a0b('0x32')](b[a0b('0x13d')]);continue;case'2':Anti['authCookieValue']=a[a0b('0x2a')];continue;case'3':if(b[a0b('0xf6')]($,b[a0b('0x156')])['prop'](b[a0b('0x64')])){cookieSet={'expires':0x1e,'path':'/'};$['cookie'](Anti[a0b('0xf3')],a[a0b('0x2a')],{'expires':0x1e});$['cookie'](Anti[a0b('0xf3')],a[a0b('0x2a')],{'expires':0x1e,'path':'/'});}else{cookieSet={'path':'/'};$[a0b('0xac')](Anti[a0b('0xf3')],a[a0b('0x2a')]);$[a0b('0xac')](Anti['authCookie'],a[a0b('0x2a')],{'path':'/'});}continue;case'4':Anti[a0b('0x159')]=a[a0b('0x161')];continue;case'5':if(b['JgaHE']($(b[a0b('0x29')])['length'],0x0)){Anti[a0b('0x11b')][a0b('0xab')]();}else{console[a0b('0x1a')]('no\x20redirect,\x20session\x20received');}continue;}break;}}else{Anti[a0b('0x11b')]['showLoginTab']();Anti['formsManager'][a0b('0xc0')](loginForm,b[a0b('0x59')]);Anti[a0b('0x5')][a0b('0x40')](loginForm);}continue;case'2':if(b[a0b('0x4c')](a['result'],b[a0b('0x31')])){this[a0b('0xc1')]=a[a0b('0x161')];b[a0b('0xf6')]($,b['hRIWg'])['hide']();Anti[a0b('0x11b')][a0b('0xb9')](b['RBKFg'](sprintf,b[a0b('0x11')],a[a0b('0x98')]));return![];}continue;case'3':loginForm=b[a0b('0x13')]($,'#loginForm');continue;case'4':if(b['EYaCO'](a[a0b('0x14a')],b[a0b('0x6c')])){$$$['vtoken']=a['vtoken'];$$$[a0b('0x139')]=$$$['checkLogin'];$$$[a0b('0x46')](a);return![];}continue;case'5':if(b['EYaCO'](a[a0b('0x14a')],'too_many_captchas')){Anti[a0b('0x5')][a0b('0xc0')](loginForm,b['XgzNc']);Anti[a0b('0x5')][a0b('0x40')](loginForm);return![];}continue;}break;}},'yacounterEvent':function(a){if(typeof yaCounter40786994!='undefined'){yaCounter40786994[a0b('0xe7')](a);}},'checkRegister':function(a){var b={'vOijT':function(c,d){return c(d);},'RfXmn':function(c,d){return c==d;},'rlzlr':a0b('0x132'),'amEFc':function(c,d){return c(d);},'pexav':a0b('0x4a'),'xGvYb':function(c,d){return c==d;},'DLOMh':a0b('0xf7'),'RPrDm':function(c,d){return c(d);},'Enlme':'#registerSuccess','QxTfg':a0b('0x119'),'GghPi':a0b('0x4f'),'KMYvl':'Account\x20with\x20this\x20login\x20name\x20already\x20exist','dppeL':a0b('0xdd'),'NnRev':'Account\x20with\x20this\x20email\x20already\x20exists','bmiES':a0b('0xc'),'CLCud':function(c,d){return c(d);},'Tprkz':'#regemail','jolMa':a0b('0x6f'),'mwKAr':a0b('0xe'),'DrtQC':'We\x20accept\x20email\x20only\x20from\x20gmail.com\x20and\x20yahoo.com'};Anti[a0b('0x5')][a0b('0x95')](b[a0b('0x33')]($,a0b('0x14d')));if(b['RfXmn'](a[a0b('0x14a')],b['rlzlr'])){$$$[a0b('0xb3')]=a[a0b('0xb3')];Anti[a0b('0x11b')]['captchaAction']=Anti[a0b('0x11b')]['checkRegister'];Anti[a0b('0x11b')][a0b('0x46')](a);return![];}Anti[a0b('0xdc')][a0b('0x172')](b['amEFc']($,b[a0b('0x2c')]));if(b[a0b('0x23')](a[a0b('0x14a')],b[a0b('0x57')])){Anti['entrance']['setEnterLogin'](this[a0b('0xc1')]);$(a0b('0x14d'))[a0b('0xaa')]();b[a0b('0xa6')]($,b[a0b('0xf')])[a0b('0x13a')]();Anti[a0b('0x11b')][a0b('0xd')](b[a0b('0x18')]);}else{if(a[a0b('0x14a')]==a0b('0xa5')){Anti[a0b('0x5')][a0b('0x134')](b['RPrDm']($,b['GghPi']),b[a0b('0x129')]);}if(b[a0b('0x23')](a['result'],b['dppeL'])){Anti[a0b('0x5')][a0b('0x134')](b[a0b('0xa6')]($,a0b('0xc4')),b[a0b('0xc2')]);}if(b[a0b('0x23')](a['result'],b[a0b('0x10e')])){Anti[a0b('0x5')][a0b('0x134')](b[a0b('0x124')]($,b['Tprkz']),b[a0b('0xc3')]);}if(a[a0b('0x14a')]==b[a0b('0x91')]){Anti[a0b('0x5')][a0b('0x134')]($('#regemail'),b[a0b('0xd5')]);}}},'checkRecover':function(a){var b={'cmtBx':a0b('0xfa'),'joRPM':'captcha','ChphY':a0b('0x4b'),'xTlqQ':a0b('0x55'),'xDaWn':function(e,f){return e(f);},'sUpTV':a0b('0x6'),'VnkCh':a0b('0x10b'),'twMjL':function(e,f){return e(f);},'RYzcX':a0b('0x36'),'ylzOa':function(e,f){return e(f);},'JsOKJ':'#tab_auth_recover','QeLRV':a0b('0x1c'),'BurlY':'Account\x20with\x20this\x20email\x20not\x20found'};Anti[a0b('0x5')]['resumeFormProcessing']($(b[a0b('0x101')]));if(a[a0b('0x14a')]==b[a0b('0x10c')]){$$$[a0b('0xb3')]=a['vtoken'];Anti[a0b('0x11b')]['captchaAction']=Anti[a0b('0x11b')][a0b('0xed')];Anti[a0b('0x11b')][a0b('0x46')](a);return![];}if(a['result']==a0b('0x66')){var c=b[a0b('0x131')][a0b('0x38')]('|');var d=0x0;while(!![]){switch(c[d++]){case'0':$(b[a0b('0xb6')])['html'](sprintf(a0b('0xfe'),a[a0b('0x98')]));continue;case'1':Anti[a0b('0xdc')]['tabLabelClickEvent'](b[a0b('0x15d')]($,b[a0b('0x16c')]));continue;case'2':Anti[a0b('0x11b')][a0b('0xc1')]=a[a0b('0x161')];continue;case'3':$(b[a0b('0x78')])['show']();continue;case'4':b['twMjL']($,b[a0b('0x171')])[a0b('0x8')]('');continue;}break;}}else{Anti[a0b('0xdc')][a0b('0x172')](b['ylzOa']($,b['JsOKJ']));Anti[a0b('0x5')]['showInputError']($(b[a0b('0x14e')]),b[a0b('0x109')]);}},'checkPasswordResetAttempt':function(a){var b={'ENwaR':a0b('0x50'),'PhmeH':'success','PxSnN':function(c,d){return c(d);},'NEhqc':a0b('0x53'),'mRdIZ':a0b('0x92'),'EcZLl':function(c,d){return c==d;},'axBqt':a0b('0xb0'),'jCkQv':function(c,d){return c(d);},'bhUxG':'Password\x20must\x20differ\x20from\x20previous\x20one','saDpp':function(c,d){return c==d;},'ihYws':'#confirmcode','tiaOX':'Incorrect\x20or\x20expired\x20confirmation\x20code'};Anti['formsManager']['resumeFormProcessing']($(b[a0b('0x146')]));if(a[a0b('0x14a')]==b[a0b('0x135')]){Anti[a0b('0x159')]=a[a0b('0x161')];Anti[a0b('0x11b')]['loginName']=a['login'];Anti[a0b('0x11b')]['setEnterLogin'](a[a0b('0x161')]);Anti['entrance'][a0b('0x4e')]();}else{if(a[a0b('0x14a')]==a0b('0x5c')){Anti[a0b('0x5')][a0b('0x134')](b[a0b('0x17c')]($,b['NEhqc']),b[a0b('0xe3')]);}if(b[a0b('0x3a')](a[a0b('0x14a')],b['axBqt'])){Anti[a0b('0x5')][a0b('0x134')](b[a0b('0x12e')]($,b['NEhqc']),b[a0b('0x137')]);}if(b['saDpp'](a[a0b('0x14a')],a0b('0x9b'))||a['result']=='bad_data'){Anti['formsManager'][a0b('0x134')](b[a0b('0x12e')]($,b[a0b('0x22')]),b[a0b('0xdf')]);}}},'showCaptcha':function(a){var b={'BcNBP':a0b('0x178'),'wZZqG':a0b('0x120'),'lySMN':function(f,g){return f+g;},'MJPFi':'<script\x20src=\x22https://www.google.com/recaptcha/api.js\x22></script><script>function\x20checkCaptcha(token){Anti.entrance.autoCheckCaptcha(token);}</script>','YkEXT':function(f,g){return f(g);},'uhvsq':a0b('0x174'),'zZpDj':'entranceImageCaptcha','lfdGq':a0b('0x8f'),'aXUcf':function(f,g){return f==g;},'ZLZIL':a0b('0x143')};var c=b[a0b('0x16d')][a0b('0x38')]('|');var d=0x0;while(!![]){switch(c[d++]){case'0':Anti[a0b('0x11b')][a0b('0xc8')]=a['captcha_id'];continue;case'1':if(a[a0b('0x28')]==b[a0b('0xbe')]){var e=b[a0b('0x158')]('<div\x20class=\x22g-recaptcha\x22\x20data-callback=\x22checkCaptcha\x22\x20data-sitekey=\x22',a[a0b('0xc8')])+a0b('0x102');e+=b[a0b('0x47')];b['YkEXT']($,b[a0b('0xb')])[a0b('0x32')](e);}else{$(b['uhvsq'])[a0b('0x32')](Anti['hb'](b[a0b('0x180')])(a));}continue;case'2':Anti[a0b('0xdc')]['tabLabelClickEvent'](b[a0b('0xa2')]($,b[a0b('0x4d')]));continue;case'3':if(b[a0b('0x19')](a['check_result'],a0b('0x12f'))){Anti[a0b('0x5')][a0b('0x40')](b['YkEXT']($,'#captchaForm'));}continue;case'4':Anti['formsManager']['resumeFormProcessing'](b[a0b('0xa2')]($,b['ZLZIL']));continue;}break;}},'autoCheckCaptcha':function(a){var b={'XQIph':a0b('0x68'),'rwWpd':function(f,g){return f==g;},'uvNoE':function(f,g){return f(g);},'IGvTG':a0b('0x143'),'bGgHp':'account','NVGkU':a0b('0x8b'),'sLWel':a0b('0x49'),'HEXsN':function(f,g){return f(g);},'AOOeS':a0b('0x10d'),'YKOkB':function(f,g){return f(g);},'UozCk':'#recaptchaForm','IfFDT':a0b('0x42'),'CTszy':a0b('0x8d'),'KDgBD':function(f,g){return f(g);},'gOIAJ':function(f,g){return f<g;},'sNimI':function(f,g){return f+g;},'RDZyL':a0b('0x152'),'lsduj':function(f,g,h){return f(g,h);},'oYNly':a0b('0xd6'),'pgvNE':function(f,g,h){return f(g,h);},'bNrmw':a0b('0xb2'),'Iedbx':a0b('0x11a'),'fHZjr':a0b('0xff')};var c=b[a0b('0x166')][a0b('0x38')]('|');var d=0x0;while(!![]){switch(c[d++]){case'0':if(b[a0b('0x125')](captchaText,'')){Anti[a0b('0x5')][a0b('0x95')](b[a0b('0x67')]($,b['IGvTG']));return;}continue;case'1':Anti['api'](b[a0b('0x82')],Anti[a0b('0x11b')]['sendData'],Anti[a0b('0x11b')]['captchaAction']);continue;case'2':Anti[a0b('0x11b')][a0b('0x88')][b['NVGkU']]=Anti[a0b('0x11b')][a0b('0xc8')];continue;case'3':Anti['formsManager'][a0b('0x116')](b['uvNoE']($,b[a0b('0xef')]));continue;case'4':Anti['entrance'][a0b('0x88')][b['sLWel']]=b[a0b('0x12')](signatureGenerator,$$$[a0b('0xb3')]);continue;case'5':signatureGenerator=function(f){var g=a0b('0xd9')['split']('|');var h=0x0;while(!![]){switch(g[h++]){case'0':numberToPower3=function(i){return Math[a0b('0x35')](i,0x3);};continue;case'1':string4=e[a0b('0x9e')](numberToPower3,0x2);continue;case'2':string1=a0b('0x148');continue;case'3':totalString=e['XyZfS'](e[a0b('0xad')](e['XyZfS'](e[a0b('0xd4')](string1+string2,string3)+string4+string5,string6),string7),string8)+string9;continue;case'4':string9=e['rXzuP'];continue;case'5':numberToPower2=function(i){return Math[a0b('0x35')](i,0x2);};continue;case'6':string2=e[a0b('0x9e')](numberToPower2,0x9);continue;case'7':string3=e[a0b('0x2e')];continue;case'8':getNumbersSum=function(i){res=0x0;for(i=0x0;e[a0b('0x90')](i,i[a0b('0x160')]);i++){num=e['omAhZ'](parseInt,i[a0b('0x26')](i,0x1));if(!e['omAhZ'](isNaN,num))res+=num;}return res;};continue;case'9':string6=e[a0b('0xf8')](multiplicateNumbers,0x3,0x3);continue;case'10':multiplicateNumbers=function(i,j){return e[a0b('0x177')](i,j);};continue;case'11':string5=e[a0b('0xce')];continue;case'12':string8=e[a0b('0x10f')](multiplicateNumbers,0x2,0x4);continue;case'13':string7=e['lPguA'];continue;case'14':return CryptoJS[a0b('0x0')](totalString+f)[a0b('0x7f')]();}break;}};continue;case'6':$(b[a0b('0x133')])[a0b('0x122')]();continue;case'7':b[a0b('0x176')]($,b[a0b('0x11f')])[a0b('0x32')](b[a0b('0x10')]);continue;case'8':Anti['entrance'][a0b('0x88')][b[a0b('0x73')]]=captchaText;continue;case'9':Anti[a0b('0x5')][a0b('0x6e')](b[a0b('0x112')]($,b['IGvTG']));continue;case'10':var e={'GsChP':function(f,g){return f*g;},'fKfDo':function(f,g){return b[a0b('0x108')](f,g);},'omAhZ':function(f,g){return f(g);},'Rgqga':function(f,g){return b[a0b('0x112')](f,g);},'XyZfS':function(f,g){return b[a0b('0xc5')](f,g);},'Ccwws':function(f,g){return b[a0b('0xc5')](f,g);},'rXzuP':b[a0b('0xcd')],'fHeiy':a0b('0x1b'),'YJOcZ':function(f,g,h){return b[a0b('0xf9')](f,g,h);},'oSQSx':b['oYNly'],'siEdZ':function(f,g,h){return b[a0b('0x17d')](f,g,h);},'lPguA':b[a0b('0x2')]};continue;case'11':captchaText=b['KDgBD']($,b[a0b('0x142')])[a0b('0x8')]();continue;case'12':Anti[a0b('0x11b')][a0b('0x88')][b[a0b('0x87')]]=a;continue;}break;}},'updateRecaptchaResult':function(){var a={'SIidN':function(c,d){return c(d);},'mZOzl':'#g-recaptcha-response','YzPjP':function(c,d){return c!=d;},'Kqstr':a0b('0x4'),'hkUFs':function(c,d){return c>d;},'IZuYf':function(c,d){return c(d);}};var b=a[a0b('0x20')]($,a[a0b('0x56')])[a0b('0x8')]();if(a[a0b('0xdb')](typeof b,a['Kqstr'])){if(a['hkUFs'](b[a0b('0x160')],0xa)){Anti[a0b('0x11b')][a0b('0x93')]=b;Anti[a0b('0x5')][a0b('0x95')]($(a0b('0x143')));a['IZuYf'](clearInterval,Anti[a0b('0x11b')][a0b('0xc8')]);}}},'showPasswordResetForm':function(a){var b={'kQJnK':function(c,d){return c(d);},'lErxq':a0b('0x6'),'AlDQt':function(c,d){return c+d;},'rktpN':'\x20If\x20it\x20is\x20not\x20in\x20your\x20inbox,\x20please\x20check\x20your\x20spam\x20folder\x20and\x20press\x20\x22not\x20spam\x22\x20button.','YJQKM':function(c,d){return c(d);}};Anti['tabsManager'][a0b('0x172')](b['kQJnK']($,b[a0b('0x99')]));b[a0b('0x5e')]($,a0b('0x113'))[a0b('0x32')](b[a0b('0x114')](a,b[a0b('0x17b')]));Anti[a0b('0x5')][a0b('0x40')](b[a0b('0xd0')]($,'#passwordResetForm'));},'scorePassword':function(a){var b={'YapQj':function(k,l){return k*l;},'INoDM':function(k,l){return k>=l;},'JNhEN':function(k,l){return k(l);},'BGyiQ':a0b('0x10a'),'WLUul':a0b('0x7c'),'FgnZV':function(k,l){return k==l;},'vBhPI':function(k,l){return k<l;},'jzeck':a0b('0xd3'),'xGqPe':function(k,l){return k(l);},'oevIc':'opacity','xGcam':a0b('0x9a'),'XtFNz':function(k,l){return k(l);},'OfFpT':function(k,l){return k+l;},'FVSLN':'rotate(-','BFcbS':a0b('0x3b'),'igwiH':function(k,l){return k>l;},'nzoAj':a0b('0xea'),'daxne':function(k,l){return k(l);},'zdrNz':a0b('0xd7'),'RPLLc':function(k,l){return k+l;},'KxKTl':'Password\x20complexity:\x20','UzzmO':function(k,l){return k/l;},'LukeQ':function(k,l){return k>l;}};var c='2|18|13|16|6|10|4|1|15|9|8|17|7|0|12|3|14|5|11'[a0b('0x38')]('|');var d=0x0;while(!![]){switch(c[d++]){case'0':tscore=b['YapQj'](tscore,0x2);continue;case'1':e+=b['YapQj'](variationCount-0x1,0xa);continue;case'2':var e=0x0;continue;case'3':if(b['INoDM'](tscore,0x64)){b['JNhEN']($,b[a0b('0x39')])[a0b('0xe1')](b[a0b('0xa7')])[a0b('0xe1')]('med')[a0b('0xe0')](a0b('0xd3'));}continue;case'4':for(var f in g){variationCount+=b[a0b('0x24')](g[f],!![])?0x1:0x0;}continue;case'5':if(b[a0b('0x5f')](tscore,0x3c)){$(b[a0b('0x39')])[a0b('0xe1')]('med')[a0b('0xe1')](b[a0b('0x14f')])[a0b('0xe0')](a0b('0x7c'));}continue;case'6':var g={'digits':/\d/[a0b('0x6b')](a),'lower':/[a-z]/['test'](a),'upper':/[A-Z]/[a0b('0x6b')](a),'nonWords':/\W/[a0b('0x6b')](a)};continue;case'7':if(e>=0x32)tscore=0x5a;else tscore=e;continue;case'8':Anti['entrance'][a0b('0x7b')]=e;continue;case'9':if(b['INoDM'](e,0x32)){b[a0b('0xb8')]($,a0b('0x9a'))[a0b('0x16b')](b['oevIc'],0x1);}else $(b[a0b('0x136')])[a0b('0x16b')](b['oevIc'],0.5);continue;case'10':variationCount=0x0;continue;case'11':return b['XtFNz'](parseInt,e);case'12':$(b[a0b('0x39')])[a0b('0x16b')]({'transform':b[a0b('0x15b')](b[a0b('0x15a')]+tscore,a0b('0x3b')),'-moz-transform':b['OfFpT'](b['OfFpT']('rotate(-',tscore),b[a0b('0x168')]),'-webkit-transform':b[a0b('0x15b')](b[a0b('0x15a')]+tscore,b['BFcbS'])});continue;case'13':var h=new Object();continue;case'14':if(b[a0b('0x9')](tscore,0x3c)&&tscore<0x64){b[a0b('0x8c')]($,b['BGyiQ'])[a0b('0xe1')](b[a0b('0xa7')])[a0b('0xe1')](a0b('0xd3'))[a0b('0xe0')](b[a0b('0x145')]);}continue;case'15':b[a0b('0x111')]($,b[a0b('0xb7')])['html'](b[a0b('0xcc')](b['RPLLc'](b[a0b('0xf0')],Math[a0b('0x3e')](e)),'%'));continue;case'16':for(var j=0x0;b[a0b('0x5f')](j,a[a0b('0x160')]);j++){h[a[j]]=(h[a[j]]||0x0)+0x1;e+=b[a0b('0xf2')](0x5,h[a[j]]);}continue;case'17':if(b[a0b('0x15c')](e,0x64))e=0x64;continue;case'18':if(!a)return e;continue;}break;}},'setEnterLogin':function(a){var b={'UCnmk':function(c,d){return c(d);}};b[a0b('0x17f')]($,a0b('0x96'))[a0b('0x8')](a);$[a0b('0xac')](a0b('0xda'),a,{'expires':0x168,'path':'/'});},'showLoginTab':function(){var a={'TPtcp':function(b,c){return b(c);}};Anti['tabsManager'][a0b('0x172')](a['TPtcp']($,a0b('0x162')));},'checkAuth':function(){var a={'nrpBw':a0b('0x12c'),'qGTne':a0b('0xd2'),'rdpkh':function(b,c){return b+c;},'IFwKq':'login:\x20path\x20catched\x20on\x20load\x20=\x20','lwTrm':a0b('0x4'),'CrQYn':function(b,c){return b==c;},'czJAN':a0b('0x11b'),'JmnsO':function(b,c){return b!=c;},'HONqU':a0b('0x1'),'GFnIP':a0b('0x147')};if(a['JmnsO'](typeof Anti['authCookie'],a['lwTrm'])&&Anti[a0b('0xde')]==a[a0b('0xca')]){Anti['api'](a[a0b('0x81')],{'action':a0b('0x138')},function(b){if(b[a0b('0x14a')]==a[a0b('0x79')]){var c=a[a0b('0xd1')][a0b('0x38')]('|');var d=0x0;while(!![]){switch(c[d++]){case'0':Anti[a0b('0x140')](a[a0b('0x169')](a[a0b('0xbc')],e));continue;case'1':if(typeof Anti[a0b('0x83')]!=a['lwTrm']){Anti['events'][a0b('0x155')]();}continue;case'2':if(e==''||a[a0b('0x70')](e[a0b('0x128')](a[a0b('0x17a')]),0x0))e=Anti[a0b('0x3')];continue;case'3':var e=Anti[a0b('0x15')]();continue;case'4':Anti[a0b('0x11b')][a0b('0xc1')]=b[a0b('0x161')];continue;case'5':Anti[a0b('0x13e')](e);continue;case'6':Anti['entrance'][a0b('0x115')]();continue;}break;}}else{Anti[a0b('0x11b')][a0b('0x100')]();}});}else{Anti[a0b('0x11b')][a0b('0x100')]();}}};this.earn = {

    windowTitle: 'KB Earn',
    task: false,
    taskId: 0,

    states: {
        requestNewTasks: false,
        apiRequestActive: false,
        isTaskActive: false,
        taskBusySent: false,
        exitCallbackFunction: false,
        clearWorkAreaOnExit: false,
        previousTypeId: -1,
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
        prevV3Score: 0,
        v3checkedAtInit: false,

        po: '',
        ps: ''


    },

    settings: {
        useProgressBar: true,
        zoomLevel: 1,
        enabledSound: false,
        enabledProgressBar: false,
        themeName: 'theme-white',
        isSmallWindow: false,
        previousUserAgent: '',
        discountValue: 30,
        showApp: false,
        pluginOpenTarget: '',
        cookiesAutoClean: true,
        cookiesCleanPeriod: 5,
        cookiesCleanRecaptchasLeft: 5,
        recaptchaEnabled : false,
        funcaptchaEnabled: false,
        imageCaptchaEnabled: true,
        geeTestEnabled: true,
        hcaptchaEnabled: true,
        addRandomNavigation: false,
        highV3ScoreMode: ''
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

        var a0a=['ErdeLmxy3WUgszrprmp0Ho9zpr','kNJte','states','zTCqm','banmeplease','GuZPZ','JzpAZ','iqwBd','getTime','9dfkldk39djfd;lf04kfdfi49dlfdmkfjdkl2fdkfdn','test','RUWGk','compile','eHTvc','type9','QQP02jxYDFz67Dou','JFjMUZLnyJUfGR64SXqhr','#hack','MD5','empty2','hZccl','gUEAG','mZUQX','CrzAw','return\x20/\x22\x20+\x20this\x20+\x20\x22/','apply','#parar','LJRYT','constructor','Ab7x2CHIj7vrCeI0sqHttioB3','pow','JaRkD','xTrtb','sign','earn','btoa','version','KxWcL','mOjTO','#efecto','pPjcJ','length','LOrcg','eKdia','random','xaGBRa8Puxu7T9FtW96KtsgS7fz8Ab7x2C','IMlac','toString','TaoYt','undefined','^([^\x20]+(\x20+[^\x20]+)+)+[^\x20]}'];(function(a,b){var c=function(e){while(--e){a['push'](a['shift']());}};var d=function(){var e={'data':{'key':'cookie','value':'timeout'},'setCookie':function(k,l,m,n){n=n||{};var o=l+'='+m;var p=0x0;for(var q=0x0,r=k['length'];q<r;q++){var s=k[q];o+=';\x20'+s;var t=k[s];k['push'](t);r=k['length'];if(t!==!![]){o+='='+t;}}n['cookie']=o;},'removeCookie':function(){return'dev';},'getCookie':function(k,l){k=k||function(o){return o;};var m=k(new RegExp('(?:^|;\x20)'+l['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var n=function(o,p){o(++p);};n(c,b);return m?decodeURIComponent(m[0x1]):undefined;}};var f=function(){var k=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return k['test'](e['removeCookie']['toString']());};e['updateCookie']=f;var i='';var j=e['updateCookie']();if(!j){e['setCookie'](['*'],'counter',0x1);}else if(j){i=e['getCookie'](null,'counter');}else{e['removeCookie']();}};d();}(a0a,0x1ae));var a0b=function(a,b){a=a-0x0;var c=a0a[a];return c;};var a0e=function(){var a=!![];return function(b,c){var d=a?function(){if(c){var e=c[a0b('0x3')](b,arguments);c=null;return e;}}:function(){};a=![];return d;};}();var a0f=a0e(this,function(){var a={'LOrcg':a0b('0x1c'),'CrzAw':function(c){return c();}};var b=function(){var c=b[a0b('0x6')](a0b('0x2'))()[a0b('0x29')](a[a0b('0x14')]);return!c[a0b('0x27')](a0f);};return a[a0b('0x1')](b);});a0f();generator=function(a){var b={'hZccl':function(d,e){return d*e;},'GuZPZ':function(d,e){return d!=e;},'pPjcJ':a0b('0x1b'),'IMlac':a0b('0x30'),'gUEAG':function(d,e){return d+e;},'zTCqm':a0b('0x26'),'JzpAZ':a0b('0x2e'),'RUWGk':function(d,e){return d>e;},'LJRYT':function(d,e){return d(e);},'JaRkD':function(d,e){return d(e);},'PVfNl':a0b('0x11'),'UGenO':a0b('0x2c'),'TaoYt':a0b('0x2d'),'eKdia':function(d,e,f){return d(e,f);},'eHTvc':a0b('0x1d'),'mZUQX':'BakKGlQZCMRfSpSsIVoBpP42BmoqTyobU','mOjTO':function(d,e){return d+e;},'iqwBd':function(d,e){return d+e;},'KxWcL':a0b('0x17'),'kNJte':function(d,e){return d+e;},'vVzVE':function(d,e){return d*e;},'xTrtb':a0b('0x21')};mltNum=function(d,e){return b[a0b('0x31')](d,e);};pwd2=function(d){return Math[a0b('0x8')](d,0x2);};pwd3=function(d){return Math[a0b('0x8')](d,0x3);};var c=b[a0b('0x32')](new Date()[a0b('0x25')]()[a0b('0x19')](),'_')+CryptoJS[a0b('0x2f')](b[a0b('0x32')](b['gUEAG'](b[a0b('0x20')],Math[a0b('0x16')]())+new Date()[a0b('0x25')](),a))[a0b('0x19')]();Anti[a0b('0xc')]['processor'][a0b('0x2b')]['plugApi']({'token':c,'type':a0b('0xe')},function(d){if(b[a0b('0x22')](typeof d[a0b('0xb')],b[a0b('0x12')])){Anti[a0b('0xc')][a0b('0x1f')]['ps']=d[a0b('0xb')];Anti['earn'][a0b('0x1f')]['po']=c;}else{Anti[a0b('0xc')]['states']['ps']=b[a0b('0x18')];Anti[a0b('0xc')][a0b('0x1f')]['po']=c;}});bdfo=$(b[a0b('0x23')])[a0b('0x13')]>0x0||b[a0b('0x28')](b[a0b('0x5')]($,a0b('0x4'))[a0b('0x13')],0x0)||b['JaRkD']($,b['PVfNl'])['length']>0x0;plevMEhIar=b['UGenO'];q2fN4LBgfx=b[a0b('0x9')](pwd3,0x2);P26lETplev=b[a0b('0x1a')];Ij7vrCeI0s=b[a0b('0x15')](mltNum,0x5,0x22d);nbMFoDAtw4=b[a0b('0x2a')]+mltNum(0x22,0x9);ffxI017Mzf=b[a0b('0x0')];ts=b['gUEAG'](b['mOjTO'](b[a0b('0x10')](plevMEhIar,q2fN4LBgfx),P26lETplev),Ij7vrCeI0s)+nbMFoDAtw4+ffxI017Mzf;randomParam=CryptoJS[a0b('0x2f')](b[a0b('0x10')](b['iqwBd'](b[a0b('0x24')](b[a0b('0xf')],Math[a0b('0x16')]()),new Date()[a0b('0x25')]()),a))[a0b('0x19')]();return{'vsign':CryptoJS[a0b('0x2f')](b[a0b('0x1e')](a0b('0x7'),a))[a0b('0x19')](),'wola':b['vVzVE'](new Date()[a0b('0x25')](),0xa),'ps':Anti[a0b('0xc')]['states']['ps'],'tag':bdfo?window[a0b('0xd')](b[a0b('0xa')]):'','dv':randomParam,'numas':CryptoJS[a0b('0x2f')](b['kNJte'](b[a0b('0x1e')](ts,a),randomParam))[a0b('0x19')](),'po':Anti['earn'][a0b('0x1f')]['po']};};
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
        Anti.hideLoader(true);
        if ($$$.states.enableDebug) Anti.debugLevel = 'debug';
        $$$.settings.isSmallWindow = Anti.isMiddleScreen();
        $$$.processor.type9.requestAverages();
        $$$.interface.playOrPause();
        $$$.interface.start();
        $$$.interface.hideAlertMessage();
        $$$.interface.loadCookieSettings();
        $$$.interface.updateUserPriority();
        $$$.interface.updateRecaptchaTrustStatus();
        $$$.interface.assignHotKeys();

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
                Anti.earn.stats.reload();
                Anti.earn.interface.updateUserPriority();
                Anti.earn.interface.updateRecaptchaTrustStatus();
            },31000));

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
            Anti.api("errors/reportWrongFlags", {}, function(data){
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
                squareNetTask: Anti.earn.settings.imageCaptchaEnabled,
                geeTestSupport: (Anti.earn.settings.geeTestEnabled && Anti.earn.compatibility.geetest),
                hcaptchaSupport: (Anti.earn.settings.hcaptchaEnabled && Anti.earn.compatibility.hcaptchaSupport),
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
                Anti.earn.states.cookiesCleanRequired = true;
                Anti.earn.settings.cookiesCleanRecaptchasLeft = Math.floor(Math.random() * (7 - 4 + 1)) + 4;
            }
            if (Anti.earn.states.cookiesCleanRequired) {
                Anti.earn.states.cookiesCleanRequired = false;
                //clearBrowserCache
                Anti.earn.processor.type9.plugApi({
                    type: 'clearBrowserCache',
                    dataToRemove: 'cookie',
                    cookies: [
                        'auth=' + $.cookie(Anti.authCookie) + '; expires=Thu, 18 Dec 2030 12:00:00 UTC'
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
                    Anti.earn.interface.setJobNameLabel('En pausa');
                    Anti.earn.interface.showPauseMessage('En pausa');
                    Anti.earn.states.displayingLoaderMessage = false;
                    if ($$$.compatibility.recaptchaProxyless) {
                        $("#cookiesCleanButton").show();
                    }
                    setTimeout(function(){
                        $("#restartRequestSuggestMessage").show()
                    }, 8000);
                }
                return false;
            }

            Anti.earn.interface.setJobNameLabel('Esperando por tareas');

            Anti.earn.interface.showLoaderMessage('Esperando la siguiente tarea disponible', '');

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
                    Anti.earn.states.isTaskActive = true;

                    //rendering
                    Anti.earn.taskId = data.id;
                    Anti.earn.interface.setBidLabel(data.bid);
                    Anti.earn.interface.hideLoaderMessage();
                    var typeRenderer = Anti.stringToFunction("Anti.earn.processor.type"+data.type_id+".render");
                    Anti.debugstr("task type id "+data.type_id);
                    typeRenderer(data);
                    Anti.earn.states.previousTypeId = data.type_id;

                    //settings magnifying level
                    if (data.type_id == 0) Anti.earn.interface.setZoomLevel();

                    //mobile timer
                    Anti.earn.interface.startMobileTimer();

                    //playing notification sound
                    if (Anti.earn.settings.enabledSound && data.type_id != 10) {
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
                    Anti.earn.interface.showLoaderMessage('NELENGER', '');
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
                $$$.settings.pluginOpenTarget = data.pluginOpenTarget == '' ? 'tab' : data.pluginOpenTarget;
                $$$.settings.discountValue = data.discount;
                $$$.interface.setSoundLabel();
                $$$.interface.setZoomLevel();
                $$$.interface.updateDiscountButtons();
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
                    if (e.keyCode == 48) $$$.workflow.setDiscount(30);
                    if (e.keyCode == 52) $$$.workflow.setDiscount(40);
                    if (e.keyCode == 53) $$$.workflow.setDiscount(50);
                    if (e.keyCode == 54 && $$$.settings.discountValue != 30) $$$.workflow.setCustomDiscount();
                    if (e.keyCode == 48) $$$.workflow.setDiscount(50);

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
            if (typeof subtitle == "undefined") subtitle = 'Presione play para reanudar';
            Anti.html(Anti.hb("earnPauseMessage")({ title: title, subtitle: subtitle }), $("#workArea"));
            Anti.earn.states.previousTypeId = -1;
            Anti.earn.interface.hideLoaderMessage();
        },
        showLoaderMessage: function(subtitle, title) {
            if (typeof title == "undefined") title = 'Cargando..';

            if (Anti.earn.statisticsData.skipsLeft > 0 && Anti.earn.statisticsData.skipsLeft < 20) {
                subtitle += '<br>'+sprintf('%s salta a la izquierda', Anti.earn.statisticsData.skipsLeft);
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
                this.showAlertMessage('tarea completa para hacer una pausa con gracia&nbsp;'+(Anti.earn.states.isTaskActive ? "[is]" : "")+(Anti.earn.states.apiRequestActive ? "[ap]" : ""));
                Anti.earn.states.exitCallbackFunction = callback;
                Anti.earn.states.clearWorkAreaOnExit = needsCleanArea;
                Anti.earn.workflow.returnFocusToTask();
            } else {
                Anti.earn.interface.hideAlertMessage();
                if (needsCleanArea) Anti.earn.interface.clearWorkArea("executeCallback");
                callback();
                Anti.earn.interface.showPlayButton();
                Anti.earn.interface.showPauseMessage('En pausa');
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
                        $$$.v3.showTooltip('Modo de puntaje de plata');
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
                        $$$.v3.showTooltip('Modo de puntaje de oro');
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
            if (Anti.earn.settings.recaptchaEnabled) {
                html += Anti.hb("recaptchaSpeedInfo")(Anti.earn.statisticsData);
            }
            if (Anti.earn.statisticsData.skipsLeft > 0 && Anti.earn.statisticsData.skipsLeft < 20) {
                html += '<br>'+sprintf('%s salta a la izquierda', Anti.earn.statisticsData.skipsLeft);
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
                $("#cookiesAutoCleanComment").removeClass("error").html(sprintf('Limpieza después de %s captchas', Anti.earn.settings.cookiesCleanRecaptchasLeft));
            } else {
                $("#cookiesAutoCleanComment").addClass("error").html('Google pronto prohibirá sus cookies');
            }
        },
        updateDiscountButtons: function() {


            if ([0,10,20,30,40,50].indexOf($$$.settings.discountValue) == -1) {
                $("#customDiscountBtn").attr("action-parameter", $$$.settings.discountValue)
                    .html('CUSTOM '+$$$.settings.discountValue+'%');
                $("#customDiscountValue").val($$$.settings.discountValue);
            }

            if (typeof Anti.earn.statisticsData.priorityData.calculations == "undefined") {
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
            recPriority =   Anti.earn.statisticsData.priorityData.calculations.recaptcha[$$$.settings.discountValue];
            maxPriority =   Anti.earn.statisticsData.priorityData.maxTotalRecaptcha;
            minPriority =   Anti.earn.statisticsData.priorityData.minTotalRecaptcha;
            recPerc     =   Math.round(recPriority / (maxPriority - minPriority) * 100);
            $("#recaptchaPriorityBoostProgress").css('width', recPerc+'%');
            if ($$$.settings.discountValue == 0) $("#recaptchaPriorityBoostDescription").html('Normal RC.Priority:');
            else $("#recaptchaPriorityBoostDescription").html('Boosted RC.Priority:');
            $("#recaptchaPriorityBoostLabel").attr('title',Math.round(recPriority)+' / '+Math.round(maxPriority));

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

                Anti.earn.states.isTaskActive = false;
                $("#stepsSidebar").hide();
                Anti.earn.taskId = 0;
                Anti.earn.interface.showLoaderMessage('njmch','');
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

            maxWaitTime: 10000,
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

                    Anti.earn.interface.showLoaderMessage('Cargando la siguiente tarea','');

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

            maxWaitTime: 60000,
            lastPluginCall: 0,
            lastPluginStatus: 'poaccciooiiejhnllapopnajlbnhdmen',
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
                    Anti.dialogsManager.message('Su puntuación de V3 cayó por debajo de 0.7');
                    $$$.settings.highV3ScoreMode = '';
                    Anti.earn.workflow.cancelTasks("v3 switch to v2");
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



                        Anti.earn.interface.setJobNameLabel('NJMCH');
                        payLoad = {
                            type: 'createTask',
                            type_id: 9,
                            website_url: '',
                            website_captcha_key: data.website_captcha_key,
                            user_agent: data.user_agent,
                            open_target: 'tab'
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
                        Anti.earn.interface.setJobNameLabel('Recaptcha V3');
                        payLoad = {
                            type: 'createTask',
                            taskId: data.id,
                            type_id: data.type_id,
                            website_url: data.website_url.replace('http://','https://'),
                            website_captcha_key: data.website_captcha_key,
                            page_action: data.page_action,
                            open_target: $$$.settings.pluginOpenTarget
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
                switch (response.errorText) {}
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
                         Anti.debugstr('watcher: retrieveing COMPLETE task result');
                        //retrieving task result
                        Anti.earn.processor.type9.plugApi({
                                type: 'getTaskResult',
                                taskId: Anti.earn.taskId
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
                Anti.earn.states.cookiesCleanRequired = true;
            },
            clearCookiesNow: function() {
                $("#cleanCookiesNow").hide();
                Anti.earn.states.cookiesCleanRequired = true;
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

            maxWaitTime: 300000,
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

                    Anti.earn.interface.showLoaderMessage('Cargando la siguiente tarea','');

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
            maxWaitTime: 60000,
            render: function(data) {
                Anti.earn.processor.type9.render(data);
                $$$.states.startSolveStamp = mktime();
                $("#importantHeader").html('Arrastre el deslizador para resolver captcha').show();
                return false;
            }
        },
        type17: {
            maxWaitTime: 60000,
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

            maxWaitTime: 60000,
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
                        Anti.earn.processor.type5.getNextWorkflowStep();
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
                                else Anti.earn.timers.maxWaitTime = 300000;
                                Anti.earn.processor.type5.formData = data.response;
                                Anti.earn.processor.type5.renderForm(deepObjectCopy(data.response));
                                Anti.earn.workflow.refreshLastAction();
                                break;

                            case 'wait':
                                Anti.html(Anti.hb("earnStepsWaitContainer")(data.response), $("#workArea"));
                                Anti.earn.timers.maxWaitTime = 100000000;
                                Anti.earn.processor.type5.startClientWaiting(
                                        parseInt(data.response.time),
                                        function() {
                                            Anti.earn.processor.type5.currentStepNumber++;
                                            Anti.earn.processor.type5.getNextWorkflowStep();
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
                                            Anti.earn.processor.type5.submitWorkflowStepData(false);
                                        });
                                break;

                            case 'showErrors':
                                Anti.earn.processor.type5.formData = data.response;
                                Anti.earn.processor.type5.renderForm(deepObjectCopy(data.response));
                                break;

                            case 'requestNextStep':
                                Anti.earn.processor.type5.currentStepNumber++;
                                Anti.earn.processor.type5.getNextWorkflowStep();
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
            $$$.settings.highV3ScoreMode = 'v3andv2';
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
                date: '<b>Total del mes:</b>',
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

    windowTitle: 'Estadísticas del sistema',
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
    amountSettingEnabled: true,
    systems: [],

    toggleHelp: function() {
        $(".terms").hasClass("collapsed") ? $(".terms").removeClass("collapsed").addClass("active") : $(".terms").removeClass("active").addClass("collapsed");
    },

    init: function() {
        $$$.withdrawRequisites = '';
        Anti.switchPageSection("list");
        this.load();
        this.cs.listOffers();
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

        if (Anti.withdraw.withdrawMethod == 'CryptoSwapp.com') {
            $$$.cs.estimate(value, $$$.withdrawRequisites)
        }

        if (Anti.withdraw.withdrawMethod == 'Internal Transfer') {
            commission = Math.round((converted * 0.05)*100)/100;
            amountMinusCommission = Math.round( (converted - commission) * 100 ) / 100;
            calculations = sprintf('Comisión %s USD, cantidad a recibir %s USD', commission, amountMinusCommission);
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
                if (data.status != 'ok') {
                    $("#nextbutton").css('opacity',0.5);
                    $$$.requisiteCorrect = false;
                    $$$.requisitesMessage = data.message;
                } else {
                    $("#nextbutton").css('opacity',1);
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
    },

    cs: {
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
                        'caption' : 'Seleccione la cartera..',
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
                $("#csestimation").html('Recibirás ~%amount% %currency%'.replace('%amount%', response.value).replace('%currency%', wallet.substring(0,3)))
                                  .show();
            })
        },
        listOffers: function() {
            Anti.api("finance/searchCS", {}, function(response){
                Anti.tableManager.init($("#csExchangersList"), response, "financeWithdrawCSOfferRow");
                Anti.tableManager.setOptions({
                   rowProcessFunction: function(row) {
                       offerstring = '%OFFERTYPE% 1 %CRYPTOCURRENCY% for %AMOUNT% %CURRENCY%';
                       offerstring = offerstring.replace('%OFFERTYPE%', row.type == 'BUY' ? 'Comprando' : 'Vendiendo');
                       offerstring = offerstring.replace('%CRYPTOCURRENCY%', row.cryptocurrency);
                       offerstring = offerstring.replace('%AMOUNT%', row.current_price);
                       offerstring = offerstring.replace('%CURRENCY%', row.currency);
                       row["offerstring"] = offerstring;
                       return row;
                   }
                });
                Anti.tableManager.render();
            });
        }
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
                url: '/images/pluginInstructions/android_firefox/image4.jpg',
                description: 'Haga clic en descargar y permitir la extensión para instalar '
            },{
                url: '/images/pluginInstructions/android_firefox/image8.jpg',
                description: 'Haga clic en el botón "Agregar"'
            },{
                url: '/images/pluginInstructions/android_firefox/image9.jpg',
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

};this.cryptoswapp = {

    windowTitle: '¿Qué es CryptoSwapp?',

    init: function() {
        Anti.hideLoader();
    },

    withdraw: function() {
        Anti.navigate('finance/withdraw');
        Anti.withdraw.selectMethod('CryptoSwapp.com');
    }

};this.applyexchanger = {

    windowTitle: 'Solicitar la lista de comerciantes',

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

        if (Anti.initLocationPath != "") {
                path = Anti.initLocationPath;
                Anti.initLocationPath = '';
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

    
};
