/*    FOR setter,functional,mediadata    */
var Json = {
                "BANNER-TOP"        :   "",
                "BANNER-BOTTOM"     :   "",
                "VIDEO"             :   "",
                "IMAGE"             :   [],
                "IMAGE_id"          :   "",
                "DATASCRIPT-NAME"   :   "",
                "VIDEO-POSTER"      :   ""
            }
;
var SyncImV = {
                "IMAGE_ID"          :   [],
                "VIDEO_TIME"        :   []
              }
;
var QuickView = {
                "FROM-TIME"         :   [[1]],
                "TO-TIME"           :   [[1]]
                }
;
var EditorOptions = {
                "VIEW-PERCENT"      :   50,
                "FOCUS"             : {
                "MODE"              :   3,
                "LEVEL"             :   1,
                "SELECT-INDEX"      :   1
                                      }
                    }
;
/*                          FOR setter,functional                               */
var QuickViewSelector      =        document.getElementById("QuickViewSelector");
var FocusSelector          =        document.getElementById("focus");
var TopSection             =        document.getElementById("BannerTop");
var BottomSection          =        document.getElementById("BannerBottom");
var ViewPortSection        =        document.getElementById("middle");
var Video                  =        document.getElementById("VideoSection");
var Images                 =        document.getElementById("ImageSection");
//var ChangeHistory          =        document.getElementById("ChangeHistory");
/*           FOR functional           */
var timeCheck              =        500;
var CheckerInterVal        =        null; 
var EditorMode             =        false;
var DownloadValue          =        null;
var isQuickView            =        false;
var QuickViewCounter       =        0;
var CurrentViewingID       =        "";
/*          FOR setter               */
var counter                =        0;
var timed                  =        0;
var changedScreen          =        false;
var FullScreen             =        false;

var tmp = true;
