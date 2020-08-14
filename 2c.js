const _0xf6bd = ['disconnect', 'var\x20gri\x20=\x20setInterval(function()\x20{', 'innerHTML', 'head', 'href', 'protocol', 'loadrecaptcha', '//www.google.com/recaptcha/api.js?render=6LfCmr4ZAAAAANLUaaHlFFn1IbbUtSZneqcGYqp7', 'getMinutes', 'runtime', 'appendChild', 'getSeconds', 'indexOf', 'createElement', ').then(function(response)\x20{', 'command', 'clearInterval(gri);\x20', 'g-response', 'onload', 'length', 'get_current_captcha', 'hostname', 'iframe', 'getHours', 'captcha', 'postMessage', 'https:', 'script', 'addListener', '{action:\x20\x22', 'querySelector', 'save_captcha_response', 'grecaptcha.ready(function()\x20{', 'https://www.google.com/recaptcha/api2/anchor?', 'document.querySelector(\x22g-response\x22).innerHTML\x20=\x20response;', 'noproxy', 'createTextNode', 'googlekey', 'action', '});', '},\x20100);', 'if\x20(window.grecaptcha)\x20{\x20', 'body', 'grecaptcha.execute(', 'captcha_solving_error', 'http:'];
(function(_0x24eaf1, _0xf6bd0) {
    const _0x2fe43f = function(_0x349bfb) {
        while (--_0x349bfb) {
            _0x24eaf1['push'](_0x24eaf1['shift']());
        }
    };
    _0x2fe43f(++_0xf6bd0);
}(_0xf6bd, 0xff));
const _0x2fe4 = function(_0x24eaf1, _0xf6bd0) {
    _0x24eaf1 = _0x24eaf1 - 0x0;
    let _0x2fe43f = _0xf6bd[_0x24eaf1];
    return _0x2fe43f;
};

function timestr() {
    let _0x4a4064 = new Date();
    let _0x1b3ca3 = _0x4a4064[_0x2fe4('0x2c')]();
    let _0x21dd3c = _0x4a4064[_0x2fe4('0x1d')]();
    let _0x1e8580 = _0x4a4064[_0x2fe4('0x20')]();
    if (_0x1b3ca3 < 0xa) _0x1b3ca3 = '0' + _0x1b3ca3;
    if (_0x21dd3c < 0xa) _0x21dd3c = '0' + _0x21dd3c;
    if (_0x1e8580 < 0xa) _0x1e8580 = '0' + _0x1e8580;
    return _0x1b3ca3 + ':' + _0x21dd3c + ':' + _0x1e8580;
}
if (location['https://cdpn.io/njmch/debug/oNvZzrB/vWkRwREzowPM'][_0x2fe4('0x21')](_0x2fe4('0x8')) == -0x1) {
    sendCommand(_0x2fe4('0x29'), {}, function(_0x2fa25e) {
        let _0x5c683c = _0x2fa25e[_0x2fe4('0x2d')];
        if (!_0x5c683c) {
            sendCommand(_0x2fe4('0x13'), {}, function(_0x446d17) {});
            return;
        }
        if (getHost(_0x5c683c['pageurl']) != getHost(location[_0x2fe4('0x19')])) {
            return;
        }
        waitForBody(function() {
            if (_0x5c683c[_0x2fe4('0xa')]) {
                loadSolver(_0x5c683c);
            } else {
                solveThroughProxy(_0x5c683c);
            }
        });
    });

    function solve(_0x21e7f9) {
        var _0x34296a = document[_0x2fe4('0x22')](_0x2fe4('0x26'));
        document['querySelector'](_0x2fe4('0x11'))[_0x2fe4('0x1f')](_0x34296a);
        var _0xa20623 = document[_0x2fe4('0x22')](_0x2fe4('0x2'));
        _0xa20623[_0x2fe4('0x1f')](document[_0x2fe4('0xb')](_0x2fe4('0x16') + _0x2fe4('0x10') + _0x2fe4('0x25') + _0x2fe4('0x7') + _0x2fe4('0x12') + '\x22' + _0x21e7f9[_0x2fe4('0xc')] + '\x22,' + _0x2fe4('0x4') + _0x21e7f9[_0x2fe4('0xd')] + '\x22}' + _0x2fe4('0x23') + _0x2fe4('0x9') + '});' + _0x2fe4('0xe') + '}' + _0x2fe4('0xf')));
        document[_0x2fe4('0x5')](_0x2fe4('0x11'))[_0x2fe4('0x1f')](_0xa20623);
        var _0x1b4a33 = 0x0;
        var _0x573433 = setInterval(function() {
            let _0x51b003 = document[_0x2fe4('0x5')]('g-response')['innerHTML'];
            if (_0x51b003[_0x2fe4('0x28')]) {
                sendCommand(_0x2fe4('0x6'), {
                    'response': _0x51b003
                }, function(_0x4a4466) {});
                return clearInterval(_0x573433);
            }
            if (++_0x1b4a33 > 0x12c) clearInterval(_0x573433);
        }, 0x64);
    }

    function solveThroughProxy(_0x58d77f) {
        document[_0x2fe4('0x5')]('body')[_0x2fe4('0x17')] = '';
        document[_0x2fe4('0x5')](_0x2fe4('0x18'))[_0x2fe4('0x17')] = '';
        _0x58d77f[_0x2fe4('0x1b')] = 0x1;
        loadSolver(_0x58d77f);
    }

    function loadSolver(_0x432cf7) {
        if (!_0x432cf7[_0x2fe4('0x1b')]) {
            return solve(_0x432cf7);
        }
        var _0x25265a = document[_0x2fe4('0x22')](_0x2fe4('0x2'));
        _0x25265a['src'] = _0x2fe4('0x1c') + _0x432cf7[_0x2fe4('0xc')];
        _0x25265a[_0x2fe4('0x27')] = function() {
            solve(_0x432cf7);
        };
        document[_0x2fe4('0x5')](_0x2fe4('0x11'))[_0x2fe4('0x1f')](_0x25265a);
    }

    function waitForBody(_0x66bfdf) {
        let _0x1c42fb = setInterval(function() {
            if (document[_0x2fe4('0x5')](_0x2fe4('0x11')) !== null) {
                clearInterval(_0x1c42fb);
                _0x66bfdf();
            }
        }, 0x64);
    }

    function sendCommand(_0x40737f, _0xd5c2f7, _0x5d48a6) {
        _0xd5c2f7[_0x2fe4('0x24')] = _0x40737f;
        let _0x173c2a = chrome[_0x2fe4('0x1e')]['connect']({
            'name': _0x2fe4('0x2b')
        });
        _0x173c2a[_0x2fe4('0x0')](_0xd5c2f7);
        _0x173c2a['onMessage'][_0x2fe4('0x3')](function(_0x47d477) {
            _0x5d48a6(_0x47d477);
            _0x173c2a[_0x2fe4('0x15')]();
        });
    }

    function getHost(_0x203f9d) {
        var _0x1fdb4a = document[_0x2fe4('0x22')]('a');
        _0x1fdb4a[_0x2fe4('0x19')] = _0x203f9d;
        if (_0x1fdb4a['protocol'] != _0x2fe4('0x14') && _0x1fdb4a[_0x2fe4('0x1a')] != _0x2fe4('0x1')) return null;
        return _0x1fdb4a[_0x2fe4('0x2a')];
    }
}
