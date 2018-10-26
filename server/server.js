const express = require("express");
const mongoose = require('./config/mongoose');
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const bodyParser = require("body-parser");
const mergeSchemas = require("graphql-tools").mergeSchemas;
const {graphql} = require('graphql');

var schedule = require('node-schedule');
const app = express();
// connect db
mongoose();

const userSchema = require('./graphql/index').userSchema;
const settingSchema = require('./graphql/index').settingSchema;
const messageSchema = require('./graphql/index').messageSchema;
const preMessageSchema = require('./graphql/index').preMessageSchema;

const schema = mergeSchemas({
  schemas: [
    userSchema,
    settingSchema,
    messageSchema,
    preMessageSchema
  ],
});

var gclendar = null;
const hostName = "demo.xueduoduo.io";

loginGoogle();

//pullCalendarScheduler();

//pushScheduler();

app.use('*', cors());

app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  rootValue: global,
  graphiql: true
}));

app.get('/calendar',(req, res) => {

  var n = new Date();

  var file = "/calendars/calendar_" + n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate() + "_" + n.getHours() + ".png"; 
  var filename = require('path').basename(file);
  var mimetype = require('mime').lookup(file);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);
  var filestream = require('fs').createReadStream(file);
  filestream.pipe(res);
});

app.use('/calendars', express.static('/calendars'));

app.use(bodyParser.json());

app.post('/upload', 
	 (req, res) => {
    var base64Data = req.body.data;//.replace(/^data:image\/png;base64,/, "");
    var n = new Date();
    var filename = "/calendars/calendar_" + n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate() + "_" + n.getHours() + ".png"; 
    require('fs').writeFile(filename, base64Data, 'base64', function(err) {
      if(err) console.log(err);
    });
		res.send({succes: true});
});

app.post('/webhook', (req, res) => {
 
  console.log(req.body);
  res.send({succes: true});
});

app.post('/push', (req, res) => {
 
  push(req.body.lineChannelToken, req.body.lineUserId, req.body.messages);

});

app.get('update', (reg, res) => {

  require('child_process')
    .exec('cd /app/calendar-to-line/tools && bash update.sh',
          (error, stdout, stderr) => {
              console.log(`${stdout}`);
              console.log(`${stderr}`);
              if (error !== null) {
                  console.log(`exec error: ${error}`);
              }
        });
});

// Up and Running at Port 4000
app.listen(process.env.PORT || 4000, () => {
  console.log('A GraphQL API running at port 4000');
});

function push( lineChannelToken, lineUserId, messages){

  const line = require('@line/bot-sdk');

  const client = new line.Client({
    channelAccessToken: lineChannelToken
  });
  console.log(messages); 
  client.pushMessage(lineUserId, messages)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

function loginGoogle(){
  // login to google first
  var GCalendarService = require('./services/gcalendar');
  gclendar = new GCalendarService("", "");
  require('fs').readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Calendar API.
    gclendar.authorize(JSON.parse(content), function(res){

      pullCalendarScheduler();

      pushScheduler();
    });
  });
}

function pullCalendarScheduler(){
   var email = gclendar.email;
   var j = schedule.scheduleJob('*/2 * * * *', function(){
    console.log("pulling calendar data ...")
    query(`
      {
        setting(email: "${email}") {
          schStart
          schEnd
          schPostTime
          lineChannelToken
          lineUserId
        }
      }
    `).then(doc => {
      const GCalendarService = require('./services/gcalendar');
      //var gclendar = new GCalendarService(doc.data.setting.schStart, doc.data.setting.schEnd);
      gclendar.calStart = doc.data.setting.schStart;
      gclendar.calEnd = doc.data.setting.schEnd;
      gclendar.calList();
    })
  });

}

function pushScheduler(){

  var n = new Date();
  var filename = "/calendar/calendar_" + n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate() + "_" + n.getHours();
  var eventJson = "/calendars/calendar_" + n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate() + "_" + n.getHours() + ".json"; 
  var imageUrl  = "https://" + hostName + filename + ".png"; 
  var email = gclendar.email;
  //var events = JSON.parse(require('fs').readFileSync(eventJson, 'utf8'));
  query(`{
	 setting(email: "${email}") {
		schStart
		schEnd
		schPostTime
		lineChannelToken
		lineUserId
	   }
 	}`).then(doc => {
    var j = schedule.scheduleJob('*/50 ' + '*'/*doc.data.setting.schPostTime*/ + ' * * *', function(){
    console.log("Push to line ...");
    var events = JSON.parse(require('fs').readFileSync(eventJson, 'utf8'));
    var comments = getCalComment(events);
    if(!comments){
      comments = "コメントがありません！";
    }
    push(doc.data.setting.lineChannelToken, doc.data.setting.lineUserId, [
          {
              type: "image",
              originalContentUrl: imageUrl,
              previewImageUrl: imageUrl
          },
          {
              type: "text",
              text: comments
          }
      ]);
    });
})
}

function query (str) {
  return graphql(settingSchema, str);
}

function getCalComment(items) {

  let commentAll = "";
  items.forEach(item => {
      let comment = "";
      let summay = item.summary;
      if(item.attendees){
          item.attendees.forEach(attendee => {
              if(attendee.comment){
                  comment = `
                      ${comment}
  
                      ${attendee.email}:
                      ${attendee.comment}

                  `;
              }
          });
      }
      if(comment){

          commentAll = `
          ${commentAll}
          ${summay}
          ${comment}

      `;
      }

  });

  return commentAll;

}

