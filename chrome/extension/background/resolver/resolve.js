import {
  resolveViaAPI,
  isNormalURL,
  parseURL,
  allURLs,
} from './common';

import cache from './cache';
/*
  Chrome Quirks
  =============

  Unlike Firefox, in Chrome:

  * If proxy settings are changed from within onBeforeRequest - they will be effective
    for this request (which has triggered onBeforeRequest).
  * onBeforeRequest doesn't support promises thus async functions (e.g. async XHR)
    cannot be used. But sync XHR causes deprecation warning in the console.
  * Returning {cancel: true} keeps the canelled URL in the tab, with the text:
    "Request blocked by extension".

  Because of the first point, others do not matter since they were used to workaround
  Firefox' limitations. Chrome's addon's code almost makes sense - with an exception of
  setting complete PAC script on every resolution.

  Other highlights:

  * If a tab's loading was cancelled or has failed due to an addon, Chrome will
    periodically refresh that tab; this can't be told apart from user doing so manually.
  * Chrome doesn't let addons handle URLs entered without scheme, i.e. "foo.lib"
    won't be handled (Google search will open instead) - "http(s)://foo.lib" has to
    be typed explicitly ("foo.lib/" will also work, as it was discovered).
  * Using https:// is useless because there is no way to obtain a valid certificate
    for unofficial TLDs; Chrome will block this request with proxy security error
    message (and no way to bypass/add exception as in Firefox).
*/

// id => timestamp (ms).
var notificationTimes = {};

// One throttled notification per this many seconds.
var notificationTimespan = 30;

function showThrottledNotification(id, title, msg) {
  var last = notificationTimes[id];

  if (!last || last < Date.now() - notificationTimespan * 1000) {
    notificationTimes[id] = Date.now();
    return showNotification(title, msg);
  }
}

function showNotification(title, msg) {
  return chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icon-64.png',
    title: title,
    message: msg || '',
  });
}

var pac = {
  _scriptStub: function () {
    var cache = CACHE_HERE;

    function FindProxyForURL(url, host) {
      // Verbatim copy of Firefox' pac.js' FindProxyForURL().
      var res = 'DIRECT';
      var ips = cache[host];

      if (ips) {
        var pos = url.indexOf(host);
        var port;

        if (pos != -1) {
          port = (url.substr(pos + host.length).match(/^:(\d+)/) || [])[1];
        }

        var https = url.match(/^https:/i);
        var directive = https ? 'HTTPS ' : 'PROXY ';
        port = ':' + (port || (https ? 443 : 80));
        res = directive + ips.join(port + '; ' + directive) + port;
      }

      return res;
    }
  },

  buildObject: function () {
    var obj = {};

    cache.each(function (domain) {
      var ips = cache.ips(domain);
      if (ips.length) { obj[domain] = ips; }
    });

    return JSON.stringify(obj);
  },

  onIpChange: function (domain, ips, existed) {
    if (!ips.length) {
      // Non-existent domains.js are handled (cancelled) by onBeforeRequest.
      // They don't reach PAC.
      return;
    }

    var script = pac._scriptStub.toString()
      .replace(/^.*|.*$/g, '')    // wrapping 'function () { ... }'.
      .replace('CACHE_HERE', pac.buildObject());

    var config = {
      mode: 'pac_script',
      pacScript: {
        data: script,
      },
    };

    chrome.proxy.settings.set({value: config}, function () {
      console.log('NHE: set new PAC script, length = ' + script.length); //-
    });
  },

  // No need to update PAC on domains.js missing (deleted) from cache since they
  // will be reprocessed by onBeforeRequest before PAC is queried.
  onDomainDelete: function (domain) { },
};

cache.onIpChange = pac.onIpChange;
cache.onDomainDelete = pac.onDomainDelete;

chrome.webRequest.onBeforeRequest.addListener(function (details) {
  var url = parseURL(details.url);
  if (!url || !url.tld || isNormalURL(url) || !localStorage.getItem('shouldResovleOnHandshake')) {
    return;
  }

  const ips = cache.ips(url.domain);

  if (ips) {
    console.log('NHE: #' + details.requestId + ' (' + url.domain + '): already resolved to ' + ips + '; cache size = ' + cache.length); //-
  } else {
    console.log('NHE: #' + details.requestId + ' (' + url.domain + '): resolving, full URL: ' + url.url); //-

    resolveViaAPI(url.domain, false, function (ips) {
      if (ips && ips.length) {
        cache.set(url.domain, ips);
      }
    });

    console.log('NHE: #' + details.requestId + ' (' + url.domain + '): resolution finished, returning ' + res); //-
  }
}, allURLs, ["blocking"]);

chrome.webRequest.onErrorOccurred.addListener(function (details) {
  var req = details.requestId;
  var url = parseURL(details.url);
  console.log('NHE: #' + req + ' (' + url.domain + '): ' + details.error); //-

  switch (details.error) {
    // Proxy error. Fired once, only if all IPs from the list of domain's IPs are down.
    case 'net::ERR_PROXY_CONNECTION_FAILED':
      if (cache.has(url.domain)) {
        showThrottledNotification(url.domain, url.domain + ' is down');
      }

      break;
  }
}, allURLs);

chrome.alarms.create({periodInMinutes: 1});

chrome.alarms.onAlarm.addListener(function () {
  var count = cache.prune();
  console.log('NHE: deleted ' + count + ' expired entries; cache size = ' + cache.length); //-
});
