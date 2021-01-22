from tkinter import Tk,Text,Entry,Button,Label
from tkinter.filedialog import askopenfilename,askopenfilenames,askdirectory
from moviepy.editor import *
import webbrowser
import json
import threading
from mainClass import Functional,ConstructQuickView      
from new import CreateProjectUI 
from loader import LoadProjectUI
ProjectName = ""
NewProject = None
LoadProject = None
def PromPT():
    window = Tk()
    Ent = Entry(window)
    def Close():
        global ProjectName
        ProjectName = Ent.get()
        window.destroy()
    window.geometry("300x50")
    window.title("New Project")
    Label(window,text = "Enter project name").grid(row = 0,column = 0)
    Ent.grid(row = 0,column = 1)
    Button(window,text = "start",command = Close).grid(row = 1,column = 1)
    window.mainloop()
def CreateNewT():
    global NewProject,ProjectName
    def x():
            PromPT()
            NewProject = Functional()
            CreateProjectUI(ProjectName,NewProject)
    threading.Thread(target = x).start()
def LoadScriptT():
    def x():
        LoadProjectUI()
    threading.Thread(target = x).start()
def ConQuick():
    nWindow = Tk()
    outName = Entry(nWindow)
    filePath = Entry(nWindow)
    scriptPath = Entry(nWindow)
    def SetPathT(pth,tp):
        if pth != "":
            if tp == 0:
                filePath.delete(0,"end")
                filePath.insert(0,pth)
            else:
                scriptPath.delete(0)
                scriptPath.insert(0,pth)
    def ExtractViews(path):
        js = {}
        arr1 = []
        arr2 = []
        with open(path,'r') as j:
            js = j.read()
            js = json.loads(js)
            arr1 = js["FROM-TIME"]
            arr2 = js["TO-TIME"]
        return arr1,arr2
    def Start():
        arr1,arr2 = ExtractViews(scriptPath.get())
        print("Starting conversion..........")
        threading.Thread(target=ConstructQuickView,args=[filePath.get(),arr1[0],arr2[0],outName.get()]).start()
    nWindow.title("QuickView Constructer")
    nWindow.geometry("200x200")
    outName.pack()
    filePath.pack()
    Button(nWindow,text = "file",command=lambda:SetPathT(askopenfilename(),0)).pack()
    scriptPath.pack()
    Button(nWindow,text = "script",command = lambda:SetPathT(askopenfilename(),1)).pack()
    Button(nWindow,text = "start",command = Start).pack()
    nWindow.mainloop()
def UI():
    global NewProject,LoadProject
    window = Tk()  
    window.geometry("200x200")
    window.title("pikselEnv")
    Button(window,text = "New",command = CreateNewT).grid(row = 0,column = 0)
    Button(window,text = "Load",command = LoadScriptT).grid(row = 1,column = 0)
    Button(window,text = "Construct quick view",command = ConQuick).grid(row = 2,column = 0)
    window.mainloop()
UI()