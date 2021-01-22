Video.onplay = editorControl;
//start VideoPositionChecker if not in editor mode 
// starts Quick view if Quick view is true 
// when video is start playing
function editorControl()
{
    if(!EditorMode)
    {
        CheckerInterVal = setInterval(VideoPosChecker,timeCheck)
        if(isQuickView)
        {
            Video.removeAttribute("controls");
            StartQuickView();
        }
    }
}
//in inspection mode set the corresponding video timestamp when a image is clicked
//in editor mode calls setImV
//can't be used when quick view is activated
function SetVideoPos(evnt)
{
    if(!EditorMode && !isQuickView)
    {
    for(i = 0;i<SyncImV["IMAGE_ID"].length;i+=1)
    {
        if(SyncImV["IMAGE_ID"][i] == evnt.target.id)
        {
            Video.currentTime = SyncImV["VIDEO_TIME"][i];
            break;
        }
    }
    }
    else
    {
        SetImV(evnt);
    }
}
//Activates - Deactivates Quick view mode
function RunQuickView()
{
    if(isQuickView)
    {
        isQuickView = false;
        Video.setAttribute("controls","");
        document.getElementById("BannerTop").children[1].children[7].children[0].innerHTML = "FALSE";
        Video.pause();
    }
    else
    {
        isQuickView = true;
        document.getElementById("BannerTop").children[1].children[7].children[0].innerHTML = "TRUE";
        Video.pause()
    }
}
//Starts quick view
function StartQuickView()
{
    let Paused = Video.paused;
    let QuickViewNo = Number(QuickViewSelector.children[1].innerHTML) - 1;
    if((!EditorMode) && isQuickView && !Paused)
   {
    if(QuickViewCounter < QuickView["FROM-TIME"][QuickViewNo].length)
    {
        Video.currentTime = QuickView["FROM-TIME"][QuickViewNo][QuickViewCounter];
        let time = QuickView["TO-TIME"][QuickViewNo][QuickViewCounter]-QuickView["FROM-TIME"][QuickViewNo][QuickViewCounter];
        time = time * 1000;
        QuickViewCounter += 1;
        setTimeout(StartQuickView,time);
    }
    else
    {
        let time = QuickView["TO-TIME"][QuickViewNo][QuickViewCounter]-QuickView["FROM-TIME"][QuickViewNo][QuickViewCounter];
        QuickViewCounter = 0;
        setTimeout(StartQuickView,time);
    }
   }
}
//checks if position is last or not and returns values
//i.e if last position returns position value + 10s
//    else returns current position value + next position value 
function posI(v1,v2)
{
    if(v1 != v2 -1)
    {
        return SyncImV["VIDEO_TIME"][v1+1];
    }
    else
    {
        return Video.duration;
    }
}
//Checks the current video timestamp 
// recursive -> uses timeCheck for time gap between two checking
function VideoPosChecker()
{
    if(!Video.paused && !EditorMode)
    {
        let len = SyncImV["IMAGE_ID"].length;
        let CurnT = Video.currentTime;
        for(let i =0;i<len;i+=1)
        {
            if((CurnT) >= SyncImV["VIDEO_TIME"][i] && (CurnT) < posI(i,len))
            {
                if(CurrentViewingID != "")
                {
                    document.getElementById(CurrentViewingID).style = "filter:blur(10px),hover{filter:none}";
                }
                CurrentViewingID = SyncImV["IMAGE_ID"][i];
                document.getElementById(CurrentViewingID).scrollIntoView({behavior:'smooth',block:'center'});
                document.getElementById(SyncImV["IMAGE_ID"][i]).style = "filter:none";
                break;
            }
        }  
    }
    else
    {
        clearInterval(CheckerInterVal);
    }
}
//sets video timestamp and image in editor mode
function SetImV(evnt)
{
    if(EditorMode)
    {
    let isThere = false;
    let ID = evnt.target.id;
    let len = SyncImV["IMAGE_ID"].length;
    let timeStamp = (Video.currentTime);
    let Index = SyncImV["IMAGE_ID"].indexOf(ID);
    SyncImV["IMAGE_ID"].splice(Index,1);
    SyncImV["VIDEO_TIME"].splice(Index,1);
    for(let i = 0;i<len;i+=1)
    {
        if(timeStamp < SyncImV["VIDEO_TIME"][i])
        {
            SyncImV["IMAGE_ID"].splice(i,0,ID);
            SyncImV["VIDEO_TIME"].splice(i,0,timeStamp);
            isThere = true;
            break;
        }
    }
    if(!isThere)
    {
        SyncImV["IMAGE_ID"].push(ID);
        SyncImV["VIDEO_TIME"].push(timeStamp);
    }
    document.getElementById("BannerBottom").children[2].value = ID + '->' +timeStamp;
    }
}
// set s the video time stamp by clicking in the start and end time field
function SetQuickViewTime(evnt)
{ 
    document.getElementById(evnt.target.id).children[0].value = (Video.currentTime);
}
//sets the quick view times only in editor mode
function SetQuickView()
{
    if(EditorMode)
    {
    let QuickViewNo = Number(QuickViewSelector.children[1].innerHTML) - 1;
    let start = document.getElementById("BannerTop").children[1].children[3].children[0].value;
    let end = document.getElementById("BannerTop").children[1].children[4].children[0].value;
    QuickView["FROM-TIME"][QuickViewNo].push(Number(start));
    QuickView["TO-TIME"][QuickViewNo].push(Number(end));
    document.getElementById("BannerTop").children[1].children[3].children[0].value = 0;
    document.getElementById("BannerTop").children[1].children[4].children[0].value = 0;
    }
}
function InDqVc(V)
{
    let c = Number(QuickViewSelector.children[1].innerHTML)
    if(V > 0)
    {
        QuickViewCounter = 0;
        c += 1;
        if(c >= QuickView["FROM-TIME"].length && EditorMode)
        {
         QuickView["FROM-TIME"].push([]);
         QuickView["TO-TIME"].push([]);
        }
        else
        {
            if(c > QuickView["FROM-TIME"].length)
            {
                c = QuickView["FROM-TIME"].length;
            }
        }
    }
    else
    {
        c -= 1;
        if(c < 0)
        {
            c = 0;
        }
    }
    QuickViewSelector.children[1].innerHTML = c;
}
function FrameQuickViewAdder(ImageEvent)
{
    let imgID = ImageEvent.target.id;
    if(EditorMode)
    {
        let Index = SyncImV["IMAGE_ID"].indexOf(imgID);
        let StartTime = SyncImV["VIDEO_TIME"][Index];
        let EndTime = null;
        if(Index != (SyncImV["IMAGE_ID"].length - 1))
        {
          EndTime = SyncImV["VIDEO_TIME"][Index + 1];
        }
        else
        {
            EndTime = Video.duration;
        }
        document.getElementById("BannerTop").children[1].children[3].children[0].value = StartTime;
        document.getElementById("BannerTop").children[1].children[4].children[0].value = EndTime;
    }
}
//creates the download link  od the generated script
//removes old link if only a script is generated
function DownloadScript(Type)
{
    let DataValue,DT;
    if(Type == 0)
    {
     DT = 'Json = '+JSON.stringify(Json)+
              '\nSyncImV = '+JSON.stringify(SyncImV)+
              '\nQuickView = '+JSON.stringify(QuickView)+
              '\nEditorOptions = '+JSON.stringify(EditorOptions);
    DataValue = new Blob([DT],{type:'application/javascript'});
    }
    else
    {
     DT = JSON.stringify(QuickView);
     DataValue = new Blob([DT],{type:'application/json'});
    }
    if(DownloadValue != null)
    {
        window.URL.revokeObjectURL(DownloadValue);
    }
    DownloadValue = window.URL.createObjectURL(DataValue);
    document.getElementById("BannerTop").children[1].children[2].download = Json["DATASCRIPT-NAME"]+".js";
    document.getElementById("BannerTop").children[1].children[2].href = DownloadValue;
    document.getElementById("BannerTop").children[1].children[2].style = "display:inline;";
}
function startEdit()
{
    if(EditorMode)
    {
        document.getElementById("BannerTop").children[1].children[0].innerHTML = "Editor Mode:off";
        EditorMode = false;
        document.getElementById("BannerTop").children[1].children[1].style = "display:none";
        document.getElementById("BannerTop").children[1].children[2].style = "display:none";
        document.getElementById("BannerTop").children[1].children[3].style = "display:none";
        document.getElementById("BannerTop").children[1].children[4].style = "display:none";
        //document.getElementById("BannerTop").children[1].children[5].style = "display:none";
        document.getElementById("BannerTop").children[1].children[7].style = "display:inline";
        document.getElementById("BannerTop").children[1].children[6].style = "display:none";
        document.getElementById("BannerBottom").children[2].style = "display:none";
    }
    else
    {
        document.getElementById("BannerTop").children[1].children[0].innerHTML = "Editor Mode:on";
        EditorMode = true;
        document.getElementById("BannerTop").children[1].children[1].style = "display:inline";
        document.getElementById("BannerTop").children[1].children[3].style = "display:inline";
        document.getElementById("BannerTop").children[1].children[4].style = "display:inline";
       // document.getElementById("BannerTop").children[1].children[5].style = "display:inline";
        document.getElementById("BannerTop").children[1].children[7].style = "display:none";
        document.getElementById("BannerTop").children[1].children[6].style = "display:inline";
        document.getElementById("BannerBottom").children[2].style = "display:inline";
    }
    Video.pause();
}