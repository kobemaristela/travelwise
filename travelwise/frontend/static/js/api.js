(function() {
    function getCookie(name) {
        let cookie = decodeURIComponent(document.cookie);
        let parts = cookie.split(';');
        let prefix = name + '=';
        
        for(let i = 0; i < parts.length; i++) {
            if(parts[i].startsWith(prefix)) {
                return parts[i].substring(prefix.length);
            }
        }
        
        return null;
    }
    
    window.api = {};
    
    window.api.chat = function(message) {
        let csrftoken = getCookie('csrftoken');
        
        if(csrftoken === null) {
            throw new Error('Missing cookies with name "csrftoken"');
        }
        
        return fetch('/api/chat/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrftoken,
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
                'message': message,
            }),
        }).then(function (response) {
            return response.json();
        });
    };
})();