const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/plus.login','https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/calendar.readonly', 'https://www.googleapis.com/auth/userinfo.email'];
const TOKEN_PATH = 'token.json';

module.exports = class GCalendarService{
    constructor (calStart, calEnd) {
        this.calStart = calStart;
        this.calEnd = calEnd;
        this.events = null;
        this.email = "";
    }

    calList(){
        let self = this;
        // Load client secrets from a local file.
        require('fs').readFile('credentials.json', (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Calendar API.
            self.authorize(JSON.parse(content), self.listEvents.bind(self));
        });
    }
    /**
     * Lists the next 10 events on the user's primary calendar.
     * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
     */
    listEvents (auth) {

        let self = this;
        const calendar = google.calendar({version: 'v3', auth});
        
        calendar.events.list({
            calendarId: 'primary',
            timeMin:  self.calStart,
            timeMax: self.calEnd,
            maxResults: 100,
            singleEvents: true,
            orderBy: 'startTime',
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const events = res.data.items;
            self.events = res.data.items;
            var n = new Date();
            let events_file = "/calendars/calendar_" + n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate() + "_" + n.getHours() + ".json"
            require('fs').writeFile(events_file, JSON.stringify(events), function(err) {
                if(err) console.log(err);
            });

            const DrawEvents = require('./drawEvent');
            (new DrawEvents()).drawEvents(res.data.items);
        });
    }
    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
    getAccessToken (oAuth2Client, callback) {
        const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
            rl.close();
            oAuth2Client.getToken(code, (err, token) => {
                if (err) return console.error('Error retrieving access token', err);
                oAuth2Client.setCredentials(token);
                // Store the token to disk for later program executions
                require('fs').writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) console.error(err);
                console.log('Token stored to', TOKEN_PATH);
                });
                callback(oAuth2Client);
            });
        });
    }
    
    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
     authorize (credentials, callback) {
        var self = this;
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);
    
        // Check if we have previously stored a token.
        require('fs').readFile(TOKEN_PATH, (err, token) => {
        if (err) return self.getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        oAuth2Client.refreshAccessToken(function(err, tokens){
            if(err) {
            console.log(err);
            return;
            }
        oAuth2Client.setCredentials(tokens);

        google.people('v1').people.get({
            resourceName: 'people/me',
            personFields: 'emailAddresses,names',
            auth: oAuth2Client,
            },
            (err, resp) => {
                    self.email = resp.data.emailAddresses[0].value;
                    callback(oAuth2Client);
            }
        );
            //oAuth2Client.setCredentials(tokens);
        });
    
        //callback(oAuth2Client);
        });
    }
};
