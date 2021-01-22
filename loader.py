from tkinter import Tk,Button,Text,Label
from tkinter.filedialog import askopenfilename
import webbrowser
from mainClass import Functional
class LoadProjectUI:
    WindowSize = "260x150"
    WindowName = "load-project"
    def __init__(self):
        lh = Functional()
        def SetFilePath():
            l = askopenfilename()
            if l != "":
                self.project_locaion_field.delete(1.0,"end")
                self.project_locaion_field.insert(1.0,l)
        def load():
            t = self.project_locaion_field.get(1.0,"end")
            t = t.replace('\n','')
            lh.load_functional_script(t)
            webbrowser.open("EDITOR.html")
        self.window = Tk()
        self.project_locaion_field = Text(self.window,width = 15,height = 3)
        self.window.title(self.WindowName)
        self.window.geometry(self.WindowSize)
        Label(self.window,text = "project path").grid(row = 0,column = 0)
        self.project_locaion_field.grid(row = 1,column = 1)
        Button(self.window,text = "locate",width = 7,height = 2,command = SetFilePath).place(x = 70,y = 75)
        Button(self.window,text = "load",width = 7,height = 2,command = load).place(x = 135,y = 75)
        self.window.mainloop()