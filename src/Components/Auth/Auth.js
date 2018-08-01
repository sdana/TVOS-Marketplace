import auth0 from 'auth0-js';

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: 'tvos-marketplace.auth0.com',
        clientID: 'pi7YnBw5717Z5bKiJYzE6EnA3NLkWi3q',
        redirectUri: 'http://localhost:3000/callback',
        audience: 'https://tvos-marketplace.auth0.com/userinfo',
        responseType: 'token id_token',
        scope: 'openid'
    });

    login() {
        this.auth0.authorize();
    }
}
