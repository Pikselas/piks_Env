import json
from os import mkdir
from tkinter import Tk,Text,Entry,Button,Label
from tkinter.filedialog import askopenfilename,askopenfilenames
import webbrowser
from mainClass import Functional
class CreateProjectUI:
    WindowSize = "260x200"
    WindowName = "Project"
    def __init__(self,name,FunctionalRefer):
        self.window = Tk()
        self.script_name = name
        self.top_banner =  Entry(self.window)
        self.bottom_banner = Entry(self.window)
        self.video_poster = Entry(self.window)
        self.video_source = Entry(self.window)
        self.image_id = name+"_frame_"
        self.image_sources = Text(self.window)
        self.image_sources.configure(width = 15,height = 3)
        self.WindowName = name
        self.window.title(self.WindowName)
        self.window.geometry(self.WindowSize)
        Label(self.window,text = "Top Banner").grid(row = 0,column = 0,sticky = "w")
        Label(self.window,text = "Bottom Banner").grid(row = 1,column = 0,sticky = "w")
        Label(self.window,text = "Video Poster").grid(row = 2,column = 0,sticky = "w")
        Label(self.window,text = "Video path").grid(row = 3,column = 0,sticky = "w")
        Label(self.window,text = "Image path_s").grid(row = 4,column = 0,sticky = "w")
        self.top_banner.grid(row = 0,column = 1,sticky = "w")
        self.bottom_banner.grid(row = 1,column = 1,sticky = "w")
        self.video_poster.grid(row = 2,column = 1,sticky = "w")
        self.video_source.grid(row = 3,column = 1,sticky = "w")
        self.image_sources.grid(row = 4,column = 1,sticky = "w")
        Button(self.window,text = "select",command = lambda:self.SetPathEntry(self.top_banner)).grid(row = 0,column = 2,sticky = "w")
        Button(self.window,text = "select",command = lambda:self.SetPathEntry(self.bottom_banner)).grid(row = 1,column = 2,sticky = "w")
        Button(self.window,text = "select",command = lambda:self.SetPathEntry(self.video_poster)).grid(row = 2,column = 2,sticky = "w")
        Button(self.window,text = "select",command = lambda:self.SetPathEntry(self.video_source)).grid(row = 3,column = 2,sticky = "w")
        Button(self.window,text = "select",command = lambda:self.SetPathEntry(self.image_sources,"TEXT")).grid(row = 4,column = 2,sticky = "w")
        Button(self.window,text = "create",command = lambda:self.GetSetGo(FunctionalRefer)).place(x = 20,y = 160)
        self.window.mainloop()
    def SetPathEntry(self,refer,refererEntry = "ENTRY",Type = 0,):
        if Type == 0 and refererEntry == "ENTRY":
            path = askopenfilename()
            if(path != ""):
                refer.delete(0,"end")
                refer.insert(0,"///"+path)
        elif Type == 0 and refererEntry == "TEXT":
            modifiedPath = askopenfilenames()
            if len(modifiedPath) != 0:
                TempMod = ["///"+d for d in modifiedPath]
                refer.delete(1.0,"end")
                refer.insert("end",';'.join(TempMod))
    def GetSetGo(self,Refer):
        ImageList = self.image_sources.get(1.0,"end")
        ImageList = ImageList.replace('\n','')
        ImageList = ImageList.split(';')
        Refer.set_Json_script(
                self.script_name,
                self.top_banner.get(),
                self.bottom_banner.get(),
                self.video_poster.get(),
                self.video_source.get(),
                self.image_id,
                ImageList
            )
        Refer.write_functional_script()
        if(webbrowser.open("EDITOR.html")):
            self.window.destroy()