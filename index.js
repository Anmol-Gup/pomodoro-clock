let sessionMinus=document.querySelector('.session-minus');
let sessionPlus=document.querySelector('.session-plus');
let breakMinus=document.querySelector('.break-minus');
let breakPlus=document.querySelector('.break-plus'); 
let pauseStart=document.querySelector('.pause');
let reset=document.querySelector('.reset');
let h2=document.querySelector('h2');
let span1=document.querySelectorAll('span')[0];  // minutes
let span2=document.querySelectorAll('span')[2];  // seconds
let colon=document.querySelectorAll('span')[1];  // colon
let sessionTime=document.querySelectorAll('span')[3].innerText // print session time
let minutes1=parseInt(sessionTime); 
let breakTime=document.querySelectorAll('span')[5].innerText; // print break time
let minutes2=parseInt(breakTime); 
let seconds=59;
let counter=1,flag=true,toggle=false;
var clearSession;

function showAlert(){
  alert("Clock has already started!");
}

// toggle pause & start
pauseStart.addEventListener('click',function(){
  // pause the clock
  if(toggle===true)
  {
    pauseStart.innerHTML='Start';
    clearInterval(clearSession);
    // to set initial session & break time
    sessionTime=sessionTime+1;
    breakTime=breakTime+1;
    toggle=false;
  }
  else{
    if(sessionTime<=0 || breakTime<=0)
      alert('Choose time');
    else{
      pauseStart.innerHTML='Pause';
      sessionTime=sessionTime-1;
      breakTime-=1;
      clearSession=setInterval(sessionStart,1000);
      toggle=true;
    }  
  }
});

// reset 
reset.addEventListener('click',function(){
  // initial value of session & break time
  span1.innerHTML='00';
  span2.innerHTML='00';
  span1.setAttribute('style','color:rgb(47, 175, 218)');
  span2.setAttribute('style','color:rgb(47, 175, 218)');
  sessionTime=0;
  breakTime=0;
  colon.innerHTML=':';
  seconds=59;
  document.querySelectorAll('span')[3].innerHTML='00';
  document.querySelectorAll('span')[5].innerHTML='00';
  colon.setAttribute('style','color:rgb(47, 175, 218)');
  pauseStart.innerHTML='Start';
  clearInterval(clearSession);
  toggle=false;  
  counter=1;
});

// sesssion time increase
sessionPlus.addEventListener('click',function(){
  var s=document.querySelectorAll('span')[3];
  // clock started
  if(toggle===false){
    sessionTime=parseInt(sessionTime)+1;
    s.innerHTML=sessionTime;
    minutes1=sessionTime;
  }
  else
    showAlert();
});

// session time decrease
sessionMinus.addEventListener('click',function(){
  var s=document.querySelectorAll('span')[3];
  // clock started
  if(toggle===false){
    sessionTime=(parseInt(sessionTime)-1<0)?minutes1:parseInt(sessionTime)-1;
    s.innerHTML=sessionTime;
    minutes1=sessionTime;
  }
  else
    showAlert();
});

// break time increase
breakPlus.addEventListener('click',function(){
  var s=document.querySelectorAll('span')[5];
  // clock started
  if(toggle===false){
    breakTime=parseInt(breakTime)+1;
    minutes2=breakTime;
    s.innerHTML=breakTime;
  }
  else
    showAlert();
});

// break time decrease
breakMinus.addEventListener('click',function(){
  var s=document.querySelectorAll('span')[5];
  if(toggle===false){
    breakTime=(breakTime-1<0)?minutes2:parseInt(breakTime)-1;
    minutes2=breakTime;
    s.innerHTML=breakTime;
  }
  else
    showAlert();
});

function sessionStart(){
  span2.innerHTML=(seconds<10)?'0'+seconds:seconds;
  span1.innerHTML=(sessionTime<10)?'0'+sessionTime:sessionTime;

  // reduce minutes by 1
  if(seconds===0){
    
    span2.innerHTML='00';
    sessionTime--;
    if(sessionTime<0)
    {
      // break time started
      if(flag===true){
        h2.innerHTML='Break !';
        h2.setAttribute('style','color:orange');
        span2.setAttribute('style','color:red');
        span1.setAttribute('style','color:red');
        colon.setAttribute('style','color:red');
        sessionTime=minutes2-1;  
        flag=false;
      }
      else{
        counter++;
        h2.innerHTML='Session '+counter;
        h2.setAttribute('style','color:white');
        span2.setAttribute('style','color:blue');
        span1.setAttribute('style','color:blue');
        colon.setAttribute('style','color:blue');
        sessionTime=minutes1-1;
        flag=true;
      }
    }
    seconds=59;
  }
  else
    seconds--;
}