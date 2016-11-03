#file : build.py
#author : cdqwertz
#license : see LICENSE.txt

import os

def read_file(path):
    f = open(path, "r")
    s = f.read()
    f.close()
    return s

def write_file(path, text):
    f = open(path, "w")
    f.write(text)
    f.close()
    
def get_files(path):
    s = read_file(path)
    files = []
    f = ""
    for i in s.split("\n"):
        if i.startswith("//"):
            f = i[2:]
            print("[folder] " + f)
        elif i != "" and not(i.startswith("#")):
            files.append(f + "/" + i)
            print("[file] " + f + "/" + i)
    return files

def build(files):
    print("[build] ")
    code = ""
    for i in files:
        code += read_file(i) + "\n"
    write_file("build/cdqwertz_engine.js", code)
        

build(get_files("build.txt"))
print("[info] Done")

