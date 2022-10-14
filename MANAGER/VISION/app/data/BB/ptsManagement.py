from pickle import load, dump
from cv2 import imread, imshow, waitKey, destroyAllWindows, rectangle
from threading import Timer
from time import sleep

##################################  BB POINTS  #############################################
def bbPoints():
    boxes = ["PDC-D", "PDC-P", "PDC-R", "PDC-RMID", "PDC-S", "TBLU"]
    BB = {}
    for box in boxes:
        BB[box] = {}
        with open(box, "rb") as f:
            fuses = load(f)
            for fuse in fuses:
                name = fuse[2][0] + "-" + str(fuse[2][1])
                BB[box][name] = [tuple(fuse[0]), tuple(fuse[1])]

    with open("BB", "wb") as f:
        dump(BB, f, protocol=3)

##################################  PARSER  ################################################
def parser():
    fuse_to_cavity = {}  # {"box": {"fuse": "cavity"}}

    box = "PDC-P"
    temp = list(BB[box])
    fuse_to_cavity[box] = {}
    for fuse in temp:
        if "A1" in fuse:
            offset = 299
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "S1" in fuse:
            name = "MF1"
            fuse_to_cavity[box][fuse] = name
        if "S2" in fuse:
            name = "MF2"
            fuse_to_cavity[box][fuse] = name
        if "A2" in fuse:
            offset = 317
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "A3" in fuse:
            offset = 325
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "E2" in fuse:
            name = "E2" + fuse[fuse.index("-") + 1:]
            fuse_to_cavity[box][fuse] = name

    box = "PDC-D"
    temp = list(BB[box])
    fuse_to_cavity[box] = {}
    for fuse in temp:
        if "A1" in fuse:
            offset = 199
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "A2" in fuse:
            offset = 208
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "S1" in fuse:
            offset = 216
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "S2" in fuse:
            offset = 226
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name

    box = "PDC-R"
    temp = list(BB[box])
    fuse_to_cavity[box] = {}
    for fuse in temp:
        if "S1" in fuse:
            offset = 399
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "S2" in fuse:
            offset = 412
            name = "F" + str(offset - int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "S3" in fuse:
            offset = 411
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "S4" in fuse:
            offset = 421
            name = "F" + str(offset - int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "S5" in fuse:
            offset = 420
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "S6" in fuse:
            if int(fuse[fuse.index("-") + 1:]) < 6:
                offset = 426
            elif int(fuse[fuse.index("-") + 1:]) > 5:
                offset = 431
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "S7" in fuse:
            if int(fuse[fuse.index("-") + 1:]) < 6:
                offset = 431
            elif int(fuse[fuse.index("-") + 1:]) > 5:
                offset = 436
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "S8" in fuse:
            offset = 450
            name = "F" + str(offset - int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "S9" in fuse:
            offset = 449
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "S10" in fuse:
            offset = 455
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "S11" in fuse:
            offset = 461
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "A1" in fuse:
            offset = 464
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "A2" in fuse:
            offset = 470
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "A3" in fuse:
            offset = 476
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "R-1" in fuse:
            fuse_to_cavity[box][fuse] = "RELX"
        if "R-2" in fuse:
            fuse_to_cavity[box][fuse] = "RELU"
        if "R-3" in fuse:
            fuse_to_cavity[box][fuse] = "RELT"


    box = "PDC-RMID"
    temp = list(BB[box])
    fuse_to_cavity[box] = {}
    for fuse in temp:
        if "S1" in fuse:
            offset = 399
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "S2" in fuse:
            offset = 412
            name = "F" + str(offset - int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "S3" in fuse:
            offset = 411
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "S4" in fuse:
            offset = 421
            name = "F" + str(offset - int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "S5" in fuse:
            offset = 420
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "S6" in fuse:
            if int(fuse[fuse.index("-") + 1:]) < 6:
                offset = 426
            elif int(fuse[fuse.index("-") + 1:]) > 5:
                offset = 431
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "S7" in fuse:
            if int(fuse[fuse.index("-") + 1:]) < 6:
                offset = 431
            elif int(fuse[fuse.index("-") + 1:]) > 5:
                offset = 436
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "S8" in fuse:
            offset = 450
            name = "F" + str(offset - int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "S9" in fuse:
            offset = 449
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "S10" in fuse:
            offset = 455
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "S11" in fuse:
            offset = 461
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "A1" in fuse:
            offset = 464
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "A2" in fuse:
            offset = 470
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "A3" in fuse:
            offset = 476
            name = "F" + str(offset + int(fuse[fuse.index("-") + 1:]))
            fuse_to_cavity[box][fuse] = name
        if "R-1" in fuse:
            fuse_to_cavity[box][fuse] = "RELX"
        if "R-2" in fuse:
            fuse_to_cavity[box][fuse] = "RELU"
        if "R-3" in fuse:
            fuse_to_cavity[box][fuse] = "RELT"


    box = "PDC-S"
    temp = list(BB[box])
    fuse_to_cavity[box] = {}
    for fuse in temp:
        if "A1" in fuse:
            name = fuse[fuse.index("-") + 1:]
            fuse_to_cavity[box][fuse] = name

    box = "TBLU"
    temp = list(BB[box])
    fuse_to_cavity[box] = {}
    for fuse in temp:
        name = "A1-" + str(10 - int(fuse[fuse.index("-") + 1:]))
        fuse_to_cavity[box][fuse] = name


    #print ("FUSE TO CAVITY: ",fuse_to_cavity)



    def fusesParser2(fuses, box = None):
        cavity = {}
        if box == None:
            box = "PDC-P"
        for item in fuses:
            temp = fuse_to_cavity[box][item]
            cavity[temp] = fuses[item]
        return cavity

    test = {}
    for i in fuse_to_cavity:
        test[i] = {}
        for j in fuse_to_cavity[i]:
            test[i][j] = True

    cavities = {}
    for i in test:
        cavities[i] = fusesParser2(test[i], i)


    # for i in cavities:
    #     print(f"\n{i}: ", cavities[i])



    cavity_to_fuses = {}
    for i in fuse_to_cavity:
        cavity_to_fuses[i] = {}
        for j in fuse_to_cavity[i]:
            cavity_to_fuses[i][fuse_to_cavity[i][j]] = j

    #print("CAVITY TO FUSE: ",cavity_to_fuses)

    def fusesParser(cavity, box = None):
        fuses = {}
        if box == None:
            box = "PDC-P"

        if box in cavity_to_fuses:
            for item in cavity:
                if item in cavity_to_fuses[box]:
                    temp = cavity_to_fuses[box][item]
                    fuses[temp] = cavity[item]
                else:
                    fuses[item] = cavity[item]
        else:
            fuses = cavity
        return fuses

    test = {}
    for i in cavity_to_fuses:
        test[i] = {}
        for j in cavity_to_fuses[i]:
            test[i][j] = True

    fuses = {}
    for i in test:
        fuses[i] = fusesParser(test[i], i)

    # for i in fuses:
    #     print(f"\n{i}", fuses[i])

    # with open("cavity_to_fuses", "wb") as f:
    #     dump(cavity_to_fuses, f, protocol=3)

    with open("cavity_to_fuses", "rb") as f:
        cavity_to_fuses_loaded = load(f)

    print("\n\tcavity_to_fuses_loaded\n", cavity_to_fuses_loaded)

###################################  MAIN  #################################################
if __name__ == "__main__":
    #bbPoints()
    with open("BB", "rb") as f:
        BB = load(f)
    path = "../imgs/boxes/"
    for i in list(BB):
        temp = path + i + ".jpg"
        img = imread(temp)
        for j in BB[i]:
            rectangle(img, BB[i][j][0], BB[i][j][1], (31,186,226), 2)
        imshow(i, img)
        k = waitKey(0)   
    destroyAllWindows()
    parser()