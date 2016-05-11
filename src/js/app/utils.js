var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};

function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}

function shortener(longUrl, next) {
    try {
        gapi.client.setApiKey(window.googleApiKey);
        gapi.client.load('urlshortener', 'v1', function (r) {
            gapi.client.urlshortener.url.insert({
                'resource': {
                    'longUrl': longUrl
                }
            }).execute(function (response) {
                if (response.id != null)
                    next(null, response.id);
                else
                    next(response, null)
            });
        })
    } catch (e) {
        console.debug(e);
        next(e, null)
    }
}