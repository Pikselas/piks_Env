function loadImage()
{
    let NewImage = document.createElement("img");
    NewImage.id = Json["IMAGE_id"] + counter;
    NewImage.title = Json["IMAGE_id"] + counter;
    NewImage.src = Json["IMAGE"][counter];
    NewImage.setAttribute("onclick","SetVideoPos(event)");
    NewImage.setAttribute("oncontextmenu","FrameQuickViewAdder(event)")
    Images.appendChild(NewImage);
    counter += 1;
    if(counter < Json["IMAGE"].length)
    {
        setTimeout(loadImage(),1);
        //console.log(counter,Json["IMAGE"].length);
    }
}
function load()
{
    document.getElementById("BannerTop").children[0].src = Json["BANNER-TOP"];
    document.getElementById("BannerBottom").children[0].src = Json["BANNER-BOTTOM"];
    Video.src = Json["VIDEO"]; 
    Video.poster = Json["VIDEO-POSTER"];
    document.getElementById("tl").innerHTML = Json["DATASCRIPT-NAME"];
    document.getElementById("focus").value = EditorOptions["FOCUS"]["SELECT-INDEX"];
}
function changeSize(Incrementer)
{
    let w = ViewPortSection.offsetWidth;
    let h = ViewPortSection.offsetHeight;
    Video.height = Number(h);
    Video.width = Number(w) * (Incrementer)/100;
    Images.style.width = (100 - Incrementer)+'%';
    EditorOptions["VIEW-PERCENT"] = Incrementer;
}
function setSize()
{
    changeSize(Number(document.getElementById("SetSizer").value));
}
function ChangeScreen(type)
{
    if(!EditorMode)
    {
    if(type == 0)
    {
        ViewPortSection.style.height = "100%";
        ViewPortSection.style.top = "0%";
        ViewPortSection.style.cursor = "none";
        changedScreen = true;
        setSize();
    }
    else
    {
        ViewPortSection.style.height = "87%";
        ViewPortSection.style.top = "6.5%";
        ViewPortSection.style.cursor = "default";
        changedScreen = false;
        setSize();
    }
    }
}
function PushToTime()
{
    let TotalImage = Json["IMAGE"].length;
    if(SyncImV["IMAGE_ID"].length == 0)
    {
        let VideoLength = Video.duration;
        let TimePerImage = VideoLength / TotalImage;
        let j = TimePerImage;
        //console.log(VideoLength+" "+TotalImage);
        for(let i = 0;i<TotalImage;i+=1)
        {
            SyncImV["IMAGE_ID"].push(Json["IMAGE_id"]+i);
            SyncImV["VIDEO_TIME"].push(j);
            j += TimePerImage;
        }
    }
}
function Pushfunction()
{
setTimeout(()=>{
    if(Video.duration > 0 )
    {
        PushToTime();
    }
    else
    {
        Pushfunction();
    }
},1)
}
function SetFocus(stl,opacityLevel)
{
    switch(stl)
    {
        case 0:
            Video.style.opacity = opacityLevel;
            Images.style.opacity = 1;
            break;
        case 1:
            Images.style.opacity = opacityLevel;
            Video.style.opacity = 1;
            break;
        case 2:
            Images.style.opacity = 1;
            Video.style.opacity = 1;
            break;
        default:
            Video.style.opacity = opacityLevel;
            Images.style.opacity = opacityLevel;
            break;
    }
    TopSection.style.opacity = opacityLevel;
    BottomSection.style.opacity = opacityLevel;
    document.getElementById("focus").style.opacity = 1;
    EditorOptions["FOCUS"]["MODE"] = stl;
    EditorOptions["FOCUS"]["LEVEL"] = opacityLevel;
    EditorOptions["FOCUS"]["SELECT-INDEX"] = FocusSelector.value;  
}
function setscreen() {
    let el = document.fullscreenElement;
    let elem = document.getElementById("MainSection");
    if(el ==null)
    {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
    }
else
{
    if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }
}
}


QuickViewSelector.children[1].innerHTML = QuickView["FROM-TIME"].length;
Video.style = "background-image:url('"+Json["VIDEO-POSTER"]+"')";
load();
loadImage();
Pushfunction();
document.getElementById("SetSizer").value = EditorOptions["VIEW-PERCENT"];
setSize();
SetFocus(EditorOptions["FOCUS"]["MODE"],EditorOptions["FOCUS"]["LEVEL"]);
document.onmousemove = function()
{
    if(!EditorMode)
    {
    clearTimeout(timed);
    if(changedScreen)
    {
        ChangeScreen(1);
    }
    timed = setTimeout(ChangeScreen,10000,0);
    }
}
window.onresize = function()
{
    setSize();
}