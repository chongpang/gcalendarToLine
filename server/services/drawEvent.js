var Canvas = require('canvas')
  , Image = Canvas.Image
  , canvas = new Canvas(800, 1024)
  , ctx = canvas.getContext('2d');

module.exports = class DrawEvents{

    constructor(){
        this.rectW = 199.5;
        this.rectH = 40;
        this.canvasH = 800;
        this.canvasW = 1024;
        this.rectColor = '#f5f5f5';
        this.gridColor = 'lightgrey';
        this.gbColor = 'whitesmoke';
        this.maxEndTime = null;
    }

    drawEvents (events){
    
        if(ctx != null){

          this.drawGrid(events);
          let currentX = 0;
          let currentDayChanged = 0;
          let currentDay = null;
          let eStartPos = null;
          let overlapCnt = 0;
    
          events.forEach(event => {
    
            let tStart = new Date(event.start.dateTime);
            let tEnd = new Date(event.end.dateTime);
    
            if(currentDay == null){
              currentDay = tStart.getDay();
            }
            if(new Date(event.start.dateTime).getDay() != currentDay){
              currentDayChanged++; 
            }
            
            if(eStartPos == null){
              eStartPos = new Date(event.start.dateTime);
            }
    
            if(tStart < this.maxEndTime){
              // overlap
              overlapCnt++;
              currentX += 0 + 0.5 + this.rectW * overlapCnt;
              
            }else{
              currentX = 0 + 0.5 + this.rectW / 2;
              overlapCnt = 0;
            }
  
            if(this.maxEndTime < tEnd){
              this.maxEndTime = tEnd;
            }
          
            let sTmpEnd = (new Date(event.end.dateTime));
            let sTmpStart = (new Date(event.start.dateTime));
            sTmpStart.setSeconds(0), sTmpStart.setMilliseconds(0); 
            sTmpEnd.setSeconds(0), sTmpEnd.setMilliseconds(0);
            eStartPos.setMinutes(0), eStartPos.setSeconds(0);
            eStartPos.setMilliseconds(0);
    
            let startMinutes = Math.abs(sTmpStart.getTime() - eStartPos.getTime()) / (60 * 1000);
            let hMinutes = Math.abs(sTmpEnd.getTime()- sTmpStart.getTime()) / (60 * 1000);
            let endMinutes = Math.abs(sTmpEnd.getTime()- eStartPos.getTime()) / ( 60 * 1000);
    
            let startPos = startMinutes * (this.rectH / 60);
            let eventH = hMinutes * (this.rectH / 60);
            let endPos = endMinutes *  (this.rectH / 60);
    
            let offset = 0;
            if(new Date(event.start.dateTime).getDay() != currentDay){
              //offset = currentDayChanged * (5 * this.rectH); 
            }
    
            ctx.strokeStyle = "red";//this.gridColor;
            //ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
            //ctx.fillStyle = "rgb(255,255,255)";
            ctx.strokeRect(currentX , endPos - eventH - offset, this.rectW, eventH) ;
            let tmpH = endPos;
            if(eventH / 2  > this.rectH){
              tmpH = eventH / 2 + startPos ;
            }
            var Font = Canvas.Font;
            var myFont = new Font( 'myFont', '/app/fonts/sazanami-gothic.ttf' );
            ctx.addFont( myFont );
            ctx.font = '14px myFont';
            ctx.fillStyle = "black";
            ctx.fillText(event.summary, currentX , tmpH-offset , 200);
            currentX = 0 + 0.5 + this.rectW / 2;
          });

          var n = new Date();
          var file = "/calendars/calendar_" + n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate() + "_" + n.getHours() + ".png"; 
          var fs = require('fs')
          , out = fs.createWriteStream(file)
          , stream = canvas.pngStream();
        
            stream.on('data', function(chunk){
            out.write(chunk);
            });
            
            stream.on('end', function(){
            console.log('saved png');
            });
        }
    
    }

    drawGrid ( events){

        let len = events.length; // events.length
        if( len < 1 ){
            return;
        }
        let start = new Date(events[0].start.dateTime);
        let end = new Date(events[len -1].end.dateTime);
            
        if(ctx != null){
          // X 
          ctx.fillStyle = "rgb(255,255,255)";
          ctx.fillRect(0, 0, this.canvasW, this.canvasH);
          for (var x = 0; x <= this.canvasW; x += this.rectW) {
    
            if(x == this.rectW ){
              ctx.strokeStyle = this.gridColor;
              ctx.beginPath();
              ctx.lineTo((0.5 + x) / 2 , 0);
              ctx.lineTo((0.5 + x) / 2, this.canvasH);
              ctx.stroke();
            }else{
              if( x > 0){
                ctx.strokeStyle = this.gridColor;
                ctx.beginPath();
                ctx.lineTo(0.5 + x - this.rectW /2 , 0);
                ctx.lineTo(0.5 + x - this.rectW /2, this.canvasH);
                ctx.stroke();
              }else{
                ctx.strokeStyle = this.gridColor;
                ctx.beginPath();
                ctx.lineTo(0.5 + x , 0);
                ctx.lineTo(0.5 + x, this.canvasH );
                ctx.stroke();
              }
      
            }
          }
    
          // y
          for (var y = 0; y <= this.canvasH; y += this.rectH) {
    
            ctx.moveTo(0, 0.5 + y);
            ctx.strokeStyle = this.gridColor;
            ctx.lineTo(this.canvasW , 0.5 + y);
            ctx.stroke();
    
            // time label
            if(start <=  end){
    
              ctx.font = "italic bold 18px 'Arial'";
              ctx.textBaseline = 'bottom';
              ctx.strokeStyle = this.gridColor;
              ctx.strokeRect(0, 0.5 + y + this.rectH , this.rectW /2, this.rectH);
              ctx.fillStyle = "black";
              ctx.fillText(start.getDate() + " " + start.getHours() + ":00" , 15, 0.5 + y + this.rectH, this.rectW);
              start.setHours(start.getHours() + 1);
            }
    
          }
        }
      }
}