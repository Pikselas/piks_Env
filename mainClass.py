import json
from moviepy.editor import *
from os import mkdir
class Functional:
    JsonVariable = "var Json"
    EditorOptionsVariable = "var EditorOptions"
    QuickViewVariable = "var QuickView"
    SyncImVVariable = "var SyncImV"
    JsonPath = "JSON/Json.json"
    EditorOptionsPath = "JSON/EditorOptions.json"
    QuickViewPath = "JSON/QuickView.json"
    SyncImVPath = "JSON/SyncImV.json"
    Json =  {}
    EditorOptions = {}
    QuickView = {}
    SyncImV = {}
    JsonKeys = []
    EditorOptionsKeys = [] 
    QuickViewKeys = []     
    SyncImVKeys = []       
    ScriptLocation = "page-contents/mediadatascript/mediadata.js"
    def __init__(self):
        with open(self.JsonPath,'r') as J:
            self.Json = json.loads(J.read())
        with open(self.EditorOptionsPath,'r') as J:
            self.EditorOptions = json.loads(J.read())
        with open(self.QuickViewPath,'r') as J:
            self.QuickView = json.loads(J.read())
        with open(self.SyncImVPath,'r') as J:
            self.SyncImV = json.loads(J.read())
        for key in self.Json:
            self.JsonKeys.append(key)
        for key in self.EditorOptions:
            self.EditorOptionsKeys.append(key)
        for key in self.QuickView:
            self.QuickViewKeys.append(key)
        for key in self.SyncImV:
            self.SyncImVKeys.append(key)
    
    def set_Json_script(self,*data):
        for i in range(len(data)):
            self.Json[self.JsonKeys[i]] = data[i]
    
    def set_EditorOptions_script(self,*data):
        for i in range(len(data)):
            self.EditorOptions[self.EditorOptionsKeys[i]] = data[i]
    
    def set_QuickView_script(self,*data):
        for i in range(len(data)):
            self.QuickView[self.QuickViewKeys[i]] = data[i]
    
    def set_SyncImV_script(self,*data):
        for i in range(len(data)):
            self.SyncImV[self.SyncImVKeys[i]] = data[i]
    
    def Write_project_files(self,NAME):
        mkdir(NAME)
        mkdir(NAME+'/'+"JSON")
        with open(NAME+'/'+self.JsonPath,'w') as J:
            J.write(json.dumps(self.Json))
        with open(NAME+'/'+self.EditorOptionsPath,'w') as J:
            J.write(json.dumps(self.EditorOptions))
        with open(NAME+'/'+self.QuickViewPath,'w') as J:
            J.write(json.dumps(self.QuickView))
        with open(NAME+'/'+self.SyncImVPath,'w') as J:
            J.write(json.dumps(self.SyncImV))
    
    def write_functional_script(self):
        with open(self.ScriptLocation,'w') as J:
            J.write(
                    self.JsonVariable + " = "+json.dumps(self.Json) + "\n"+
                    self.EditorOptionsVariable + " = "+json.dumps(self.EditorOptions)+"\n"+
                    self.SyncImVVariable + " = "+json.dumps(self.SyncImV)+"\n" +
                    self.QuickViewVariable + " = " + json.dumps(self.QuickView)
                )
    def load_functional_script(self,path):
        with open(path,'rb') as j:
            with open(self.ScriptLocation,'wb') as k:
                k.write(j.read())

def ConstructQuickView(file,StartTimes,EndTimes,name,UseAudio = True):
    if len(StartTimes) == len(EndTimes):
        try:
            VideoElements = [VideoFileClip(file,audio=UseAudio).subclip(StartTimes[i],EndTimes[i]) for i in range(len(StartTimes))]
            concatenate_videoclips(VideoElements).write_videofile(name)
            return True
        except Exception as e:
            print(e)
            return False
    else:
        return False