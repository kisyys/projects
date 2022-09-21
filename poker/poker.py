import random
from random import randrange
import time

class Korttipakka:    
    def __init__(self):
        self.pakka2 = []
  
    def pakka(self):
        self.pakka2.clear()
        arvo=range(2,15)
        maa=['pata', 'risti', 'hertta', 'ruutu']
        for i in maa:
            for x in arvo:
              yksi_kortti = [x,i]
              self.pakka2.append(yksi_kortti)

    def get_pakka(self):
        return self.pakka2
    
    def get_koko(self):
        return len(self.pakka2)
        
    def get_kortti(self):
        kortti=random.choice(self.pakka2)
        self.pakka2.remove(kortti)
        return(kortti)
    
class Pelaaja:
    def __init__(self,nimi,stack):
        self.nimi = nimi
        self.kortit = []
        self.stack = stack
        self.arvo = []
        
    def add_stack(self,maara):
        self.stack = self.stack + maara
        
    def add_kortti(self,kortti):
        self.kortit.append(kortti)
    
    def add_arvo(self,arvo1, arvo2, arvo3):
        self.arvo.append(arvo1)
        self.arvo.append(arvo2)
        self.arvo.append(arvo3)
    
    
    def nollaa_kortit(self):
        self.kortit.clear()
        
    def nollaa_arvo(self):
        self.arvo.clear()
        
    def get_nimi(self):
        return self.nimi
    
    def get_stack(self):
        return self.stack
      
    def get_kortit(self):
        self.kortit.sort()
        return self.kortit
    
    def get_arvo(self):
        return self.arvo
        

class Holdem:
    def __init__(self):
        self.k = Korttipakka()
        self.maara = 0
        self.pelaajat = []
        self.potti = 0
        self.fold = 0
        self.kierros = 1
        
        

    def get_pakkakoko(self):
        return self.k.get_koko()
    
    def game(self):
        self.pelaajat.append(Pelaaja('Tietokone',1000))
        self.maara = int(input('Montako pelaajaa? '))
        for i in range(0,self.maara):
            nimi = input('Pelaajan'+str(i+1)+ ' nimi? ')
            buyin = int(input('Buy in: ' ))
            self.pelaajat.append(Pelaaja(nimi,buyin))
        
        while True:
            print('')
            print('Kierros: ' + str(self.kierros))
            print('')
            lopeta2=0
            self.k.pakka()
            self.potti=0
            self.fold = 0
            #print(self.k.get_koko())
            for obj in self.pelaajat:
                obj.add_kortti(self.k.get_kortti())
                obj.add_kortti(self.k.get_kortti()) 
                print('Pelaajan ' + obj.get_nimi() + ' stack on ' + str(obj.get_stack()))
                print('')
                if(obj.get_nimi()!='Tietokone'):
                    print('Pelaajan ' + obj.get_nimi() + ' kortit:')
                    print(obj.get_kortit())
                


            #Preflop
            print('')
            print('Preflop panostus')
            panos1=randrange(200)
            for obj in self.pelaajat:   

                if(obj.get_nimi()=='Tietokone'):   
                    if(obj.get_stack()<=panos1):
                        print('All in')
                        self.potti = self.potti + obj.get_stack()
                        obj.add_stack(-obj.get_stack())
                    else:
                        print('Tietokone panosti ' + str(panos1))
                        self.potti = self.potti + panos1
                        obj.add_stack(-panos1)


                else:
                    kysy = input('Pelaaja ' + obj.get_nimi() + ' foldaatko =0, maksatko/sökötätkö =1 vai korotatko =2?')
                    if(kysy =='0'):
                            self.fold =1
                            print('Tietokone voitti potin ' + str(self.potti))
                            for obj in self.pelaajat:
                                if(obj.get_nimi()=='Tietokone'):
                                    obj.add_stack(self.potti)
                    if(kysy=='1'):                        
                        if(obj.get_stack()<=panos1):
                            print('All in')
                            self.potti = self.potti + obj.get_stack()
                            obj.add_stack(-obj.get_stack())
                        else:
                            self.potti = self.potti + panos1
                            obj.add_stack(-panos1)

                
            #Flop
            if(self.fold==0):
                
                flop1 = self.k.get_kortti()
                flop2 = self.k.get_kortti()
                flop3 = self.k.get_kortti()
                for obj in self.pelaajat:
                    #print(obj.get_nimi())
                    obj.add_kortti(flop1)
                    obj.add_kortti(flop2)
                    obj.add_kortti(flop3)
        
                print('')
                print('Flop:')
                print(str(flop1) + ' ' +str(flop2) + ' ' +str(flop3))
                panos1=randrange(200)
                for obj in self.pelaajat:  
                    if(obj.get_nimi()=='Tietokone'):   
                        if(obj.get_stack()<=panos1):
                            print('All in')
                            self.potti = self.potti + obj.get_stack()
                            obj.add_stack(-obj.get_stack())
                        else:
                            print('Tietokone panosti ' + str(panos1))
                            self.potti = self.potti + panos1
                            obj.add_stack(-panos1)

    
                    else:
                        kysy = input('Pelaaja ' + obj.get_nimi() + ' foldaatko =0, maksatko/sökötätkö =1 vai korotatko =2?')
                        if(kysy =='0'):
                            self.fold =1
                            print('Tietokone voitti potin ' + str(self.potti))
                            for obj in self.pelaajat:
                                if(obj.get_nimi()=='Tietokone'):
                                    obj.add_stack(self.potti)
                        if(kysy=='1'):
                            if(obj.get_stack()<=panos1):
                                print('All in')
                                self.potti = self.potti + obj.get_stack()
                                obj.add_stack(-obj.get_stack())
                            else:
                                self.potti = self.potti + panos1
                                obj.add_stack(-panos1)

            
            if(self.fold==0):
                #Turn
                turn = self.k.get_kortti()
                for obj in self.pelaajat:
                    #print(obj.get_nimi())
                    obj.add_kortti(turn)
                
                print('')
                print('Turn:')
                print(str(flop1) + ' ' +str(flop2) + ' ' +str(flop3) + ' ' + str(turn))
                
                
                #River
                river = self.k.get_kortti()
                for obj in self.pelaajat:
                    #print(obj.get_nimi())
                    obj.add_kortti(river)
                    
                print('')
                print('River')
                print(str(flop1) + ' ' +str(flop2) + ' ' +str(flop3) + ' ' + str(turn) + ' ' + str(river))
                
                
                for obj in self.pelaajat:
                    a = Arvojarjestys(obj.get_kortit())
                    #print(obj.get_nimi())
                    #print(obj.get_stack())
                    obj.add_arvo(a.lapi()[0],a.lapi()[1],a.lapi()[2])
                
                voittaja=''
                paras_kasi=0
                kasi_kuvaus=''
                tasapeli=0
                for obj in self.pelaajat:
                    if(paras_kasi==obj.get_arvo()[1]):
                        tasapeli+=1
                    elif(paras_kasi<obj.get_arvo()[1]):
                        paras_kasi= obj.get_arvo()[1]
                        voittaja= obj.get_nimi()
                        kasi_kuvaus=obj.get_arvo()[0]
    
                for obj in self.pelaajat:
                    if(voittaja==obj.get_nimi() and tasapeli<1):
                        obj.add_stack(self.potti)
                        print('Kasi voitti:')
                        print(obj.get_kortit())
                    elif(tasapeli>0):
                        obj.add_stack(self.potti/2)
                        print(self.potti/2)
                
                print('') 
                
                if(tasapeli<1):
                    print('Potin ' +str(self.potti) + ' voitti: ' + voittaja + ' kadella ' + kasi_kuvaus)
                else:
                    print('Tasapeli' + ' kadella ' + kasi_kuvaus + ' potti ' +str(self.potti) + ' jakoon')
     
                
                for obj in self.pelaajat:
                    if(obj.get_stack()<=0):
                        print('')
                        print('Pelaajalta ' + obj.get_nimi() + ' loppui rahat ja peli päättyy')
                        lopeta2=1
            
            if(lopeta2==1):
                break
            
            #lopeta = input('lopetetaanko?')
            #if(lopeta == 'joo'):
            #    break
            
            for obj in self.pelaajat:
                obj.nollaa_kortit()
                obj.nollaa_arvo()
            
            self.kierros +=1
                

class Arvojarjestys:
    def __init__(self,list1):
        self.list1 = list1
        self.kuvaus = ''
        self.summa = 0
           
    def lapi(self):
        self.list1.sort()
        monta = 1
        isoin_kortti=0
        pata=0
        risti=0
        hertta=0
        ruutu=0
        vari_isoin_pata=0
        vari_isoin_risti=0
        vari_isoin_hertta=0
        vari_isoin_ruutu=0
        suora=0
        suora_isoin1=0
        pari=0
        pari_isoin1=0
        pari_isoin2=1
        kolmoset=0
        kolmoset_isoin1=0
        neloset=0
        neloset_isoin1=0
        edellinen = self.list1[0][0]-1
        
        for i in self.list1:
            #print(i[0])  
            
            if(i[1]=='pata'):
                pata = pata+1
                vari_isoin_pata=i[0]
            if(i[1]=='risti'):
                risti = risti+1
                vari_isoin_risti=i[0]
            if(i[1]=='hertta'):
                hertta = hertta+1
                vari_isoin_hertta=i[0]
            if(i[1]=='ruutu'):
                ruutu = ruutu+1
                vari_isoin_ruutu=i[0]
            
            
            if(i[0]==edellinen+1):
                suora=suora+1
                if(suora>=5):
                    suora_isoin1=i[0]
            elif(i[0]!=edellinen+1 and suora<5):
                suora=1


            if(i[0]==edellinen):
                monta = monta+1            
            if(i[0]!=edellinen):
                monta = 1
            
            if(monta==4):
                neloset = neloset+1
                kolmoset = kolmoset-1
                if(neloset_isoin1<i[0]):
                    neloset_isoin1 = i[0]
            elif(monta==3):
                kolmoset = kolmoset+1
                pari=pari-1
                if(kolmoset_isoin1<i[0]):
                    kolmoset_isoin1 = i[0]
            elif(monta==2):
                pari = pari+1
                if(pari_isoin1<pari_isoin2):
                    pari_isoin1=i[0]
                elif(pari_isoin2<i[0]):
                    pari_isoin2=i[0]
            
            if(isoin_kortti<i[0]):
                isoin_kortti=i[0]
                        
            edellinen = i[0]
            

        if(neloset>=1):
            return ['neloset', 8, neloset_isoin1]
        elif(kolmoset>=1 and pari>=1):
            if(pari_isoin1>pari_isoin2):
                luku = (str(kolmoset_isoin1)+str(pari_isoin1))
                return ['tayskasi', 7, int(luku)]
            else:
                luku = (str(kolmoset_isoin1)+str(pari_isoin1))
                return ['tayskasi', 7, int(luku)]
        elif(pata>=5):
            return ['vari', 6, vari_isoin_pata]
        elif(risti>=5):
            return ['vari', 6, vari_isoin_risti]
        elif(hertta>=5):
            return ['vari', 6, vari_isoin_hertta]
        elif(ruutu>=5):
            return ['vari', 6, vari_isoin_ruutu]
        elif(suora>=5):
            return ['suora', 5, suora_isoin1]

        elif(kolmoset>=1):
            return ['kolmoset', 4, kolmoset_isoin1]
        elif(pari>=2):
            if(pari_isoin1>pari_isoin2):
                luku = (str(pari_isoin1+pari_isoin2))
                return ['kaksi paria', 3, int(luku)]
            else:
                luku = (str(pari_isoin2+pari_isoin1))
                return ['kaksi paria', 3, int(luku)]
        elif(pari>=1):
            return ['pari', 2, pari_isoin1]
        else:
            #luku = (str(self.list1[6][0])+str(self.list1[5][0])+str(self.list1[4][0])+str(self.list1[3][0])+str(self.list1[2][0]))
            luku = str(self.list1[6][0])
            return ['isoin kortti', 1, int(luku)]

from PyQt5.QtWidgets import QLabel, QDialog, QWidget, QVBoxLayout
from PyQt5.QtGui import QPixmap, QImage, QMovie
from PyQt5 import QtCore, QtWidgets
import sys 


class GUI(object):    
    def __init__(self):       
        self.poyta2 = 0
        self.k = Korttipakka()
        self.maara = 0
        self.pelaajat = []
        self.potti = 0
        #self.fold = 0
        self.kierros = 1
        self.blind = 1
        #self.k.pakka()
        self.jarjestys=1
        self.panos1 = 0
        self.panos2 = 0
        self.kuvaus =''
        #self.rivit = []

    
    def setupUi(self, MainWindow):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(1200, 1200)
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setObjectName("centralwidget")
        
        self.label_tapahtuma = QtWidgets.QLabel(self.centralwidget)
        self.label_tapahtuma.setGeometry(QtCore.QRect(50, 750, 300, 300))
        self.label_tapahtuma.setObjectName("label_tapahtuma")
        
        self.label_potti = QtWidgets.QLabel(self.centralwidget)
        self.label_potti.setGeometry(QtCore.QRect(575, 375, 100, 100))
        self.label_potti.setObjectName("label_potti")
        
        self.label_p1_stack = QtWidgets.QLabel(self.centralwidget)
        self.label_p1_stack.setGeometry(QtCore.QRect(1000, 825, 100, 100))
        self.label_p1_stack.setObjectName("label_p2_stack")
        
        self.label_p2_stack = QtWidgets.QLabel(self.centralwidget)
        self.label_p2_stack.setGeometry(QtCore.QRect(1000, 150, 100, 100))
        self.label_p2_stack.setObjectName("label_p1_stack")
        
        self.text_panos = QtWidgets.QTextEdit(self.centralwidget)
        self.text_panos.setGeometry(QtCore.QRect(1000, 750, 75, 23))
        self.text_panos.setObjectName("slider_panos")
        
        self.slider_panos = QtWidgets.QSlider(self.centralwidget)
        self.slider_panos.setGeometry(QtCore.QRect(1000, 780, 150, 23))
        self.slider_panos.setOrientation(QtCore.Qt.Horizontal)
        self.slider_panos.setObjectName("slider_panos")
        
        self.button_korotus = QtWidgets.QPushButton(self.centralwidget)
        self.button_korotus.setGeometry(QtCore.QRect(800, 750, 100, 23))
        self.button_korotus.setObjectName("button_korotus")
        
        self.button_maksu = QtWidgets.QPushButton(self.centralwidget)
        self.button_maksu.setGeometry(QtCore.QRect(800, 825, 100, 23))
        self.button_maksu.setObjectName("button_maksu")
        
        self.button_fold = QtWidgets.QPushButton(self.centralwidget)
        self.button_fold.setGeometry(QtCore.QRect(800, 900, 100, 23))
        self.button_fold.setObjectName("button_fold")
        
        #Tietokone_voitti
        self.horizontalLayoutWidget_3 = QtWidgets.QWidget(self.centralwidget)
        self.horizontalLayoutWidget_3.setGeometry(QtCore.QRect(50, 50, 300, 200))
        self.horizontalLayoutWidget_3.setObjectName("horizontalLayoutWidget_3")
        self.Tietokone_voitti = QtWidgets.QHBoxLayout(self.horizontalLayoutWidget_3)
        self.Tietokone_voitti.setContentsMargins(0, 0, 0, 0)
        self.Tietokone_voitti.setObjectName("Tietokone_voitti")
        
        self.Tietokone_voitti2 = QLabel()
        self.movie = QMovie(r'C:\Users\Kimmo\Python 3\spyder\Tietokone.gif') 
        self.Tietokone_voitti2.setMovie(self.movie) 
 
        #self.p1_kortti1.setPixmap(QPixmap(self.kortti1()))
        #self.p1_kortti2.setPixmap(QPixmap(self.kortti1()))
        self.Tietokone_voitti.addWidget(self.Tietokone_voitti2)  
        
        #Pelaaja1
        self.horizontalLayoutWidget = QtWidgets.QWidget(self.centralwidget)
        self.horizontalLayoutWidget.setGeometry(QtCore.QRect(400, 700, 360, 270))
        self.horizontalLayoutWidget.setObjectName("horizontalLayoutWidget")
        self.p1_kasi = QtWidgets.QHBoxLayout(self.horizontalLayoutWidget)
        self.p1_kasi.setContentsMargins(0, 0, 0, 0)
        self.p1_kasi.setObjectName("p1_kasi")
        
        self.p1_kortti1 = QLabel('kortti1')
        self.p1_kortti2 = QLabel('kortti2') 
        #self.p1_kortti1.setPixmap(QPixmap(self.kortti1()))
        self.p1_kasi.addWidget(self.p1_kortti1)  
        self.p1_kasi.addWidget(self.p1_kortti2) 
        
         #Pelaaja2
        self.horizontalLayoutWidget_2 = QtWidgets.QWidget(self.centralwidget)
        self.horizontalLayoutWidget_2.setGeometry(QtCore.QRect(400, 50, 360, 270))
        self.horizontalLayoutWidget_2.setObjectName("horizontalLayoutWidget_2")
        self.p2_kasi = QtWidgets.QHBoxLayout(self.horizontalLayoutWidget_2)
        self.p2_kasi.setContentsMargins(0, 0, 0, 0)
        self.p2_kasi.setObjectName("p2_kasi")
        
        self.p2_kortti1 = QLabel('kortti1')
        self.p2_kortti2 = QLabel('kortti2') 
        #self.p2_kortti1.setPixmap(QPixmap(self.kortti1()))
        #self.p2_kortti2.setPixmap(QPixmap(self.kortti1()))
        self.p2_kasi.addWidget(self.p2_kortti1)  
        self.p2_kasi.addWidget(self.p2_kortti2) 
        
        #Poyta
        self.horizontalLayoutWidget_3 = QtWidgets.QWidget(self.centralwidget)
        self.horizontalLayoutWidget_3.setGeometry(QtCore.QRect(100, 400, 1000, 270))
        self.horizontalLayoutWidget_3.setObjectName("horizontalLayoutWidget_3")
        self.poyta = QtWidgets.QHBoxLayout(self.horizontalLayoutWidget_3)
        self.poyta.setContentsMargins(0, 0, 0, 0)
        self.poyta.setObjectName("pyota")
        
        self.poyta_kortti1 = QLabel('kortti1')
        self.poyta_kortti2 = QLabel('kortti2')
        self.poyta_kortti3 = QLabel('kortti3')
        self.poyta_kortti4 = QLabel('kortti4')
        self.poyta_kortti5 = QLabel('kortti5')
        
        #self.poyta_kortti1.setPixmap(QPixmap(self.kortti1()))
        #self.poyta_kortti2.setPixmap(QPixmap(self.kortti1()))
        #self.poyta_kortti3.setPixmap(QPixmap(self.kortti1()))
        #self.poyta_kortti4.setPixmap(QPixmap(self.kortti1()))
        #self.poyta_kortti5.setPixmap(QPixmap(self.kortti1()))
        
        
        self.poyta.addWidget(self.poyta_kortti1)  
        self.poyta.addWidget(self.poyta_kortti2)
        self.poyta.addWidget(self.poyta_kortti3)
        self.poyta.addWidget(self.poyta_kortti4) 
        self.poyta.addWidget(self.poyta_kortti5)
        
        self.label_tapahtuma.setText(self.kuvaus)
        self.label_tapahtuma.adjustSize()
        
        self.button_korotus.clicked.connect(self.korotus) 
        self.button_maksu.clicked.connect(self.maksu)
        self.button_fold.clicked.connect(self.fold)  
        
        self.slider_panos.valueChanged[int].connect(self.changeValue)
        
        self.pelaajat.append(Pelaaja('Tietokone',500))
        self.pelaajat.append(Pelaaja('Kimmo',500))
        
        
        self.peli()
        
        
        MainWindow.setCentralWidget(self.centralwidget)
        self.menubar = QtWidgets.QMenuBar(MainWindow)
        self.menubar.setGeometry(QtCore.QRect(0, 0, 800, 21))
        self.menubar.setObjectName("menubar")
        MainWindow.setMenuBar(self.menubar)
        self.statusbar = QtWidgets.QStatusBar(MainWindow)
        self.statusbar.setObjectName("statusbar")
        MainWindow.setStatusBar(self.statusbar)

        self.retranslateUi(MainWindow)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "MainWindow"))
        self.button_korotus.setText(_translate("MainWindow", "Korotus"))
        self.button_maksu.setText(_translate("MainWindow", "Maksa / Sökötys"))
        self.button_fold.setText(_translate("MainWindow", "Fold"))
    
    def peli(self):       
        self.nollaus()  
        self.kasikortit()
        if(self.blind==1):
            self.panostus()
            self.blind=2
        else:
            self.panos1=0
            self.blind=1


    
    def nollaus(self):
        self.k.pakka()
        self.potti = 0
        #self.kuvaus =''
        for obj in self.pelaajat:
            obj.nollaa_kortit()
            obj.nollaa_arvo()
        self.poyta_kortti1.setPixmap(QPixmap(QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\pakka.png')))
        self.poyta_kortti2.setPixmap(QPixmap(QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\pakka.png')))
        self.poyta_kortti3.setPixmap(QPixmap(QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\pakka.png')))
        self.poyta_kortti4.setPixmap(QPixmap(QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\pakka.png')))
        self.poyta_kortti5.setPixmap(QPixmap(QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\pakka.png')))
        

    
    def kasikortit(self):        
        #time.sleep(5)
        
        print('kasikortit')
        for obj in self.pelaajat:
            obj.add_kortti(self.k.get_kortti())
            obj.add_kortti(self.k.get_kortti())
            print(obj.get_nimi())
            if(obj.get_nimi()!='Tietokone'):
                self.p1_kortti1.setPixmap(QPixmap(self.kortti1(obj.get_kortit()[0])))
                self.p1_kortti2.setPixmap(QPixmap(self.kortti1(obj.get_kortit()[1])))
                self.label_p1_stack.setText('Stack: ' + str(obj.get_stack()))
                self.label_p1_stack.adjustSize()
            else:
                self.p2_kortti1.setPixmap(QPixmap(self.kortti1(obj.get_kortit()[0])))
                self.p2_kortti2.setPixmap(QPixmap(self.kortti1(obj.get_kortit()[1])))
                self.label_p2_stack.setText('Stack: ' + str(obj.get_stack()))
                self.label_p2_stack.adjustSize()
        
    
    
    def panostus(self):
        self.panos1=randrange(200)
        for obj in self.pelaajat:   
            if(obj.get_nimi()=='Tietokone'):   
                if(obj.get_stack()<=self.panos1):
                    #print('All in')
                    self.potti = self.potti + obj.get_stack()
                    obj.add_stack(-obj.get_stack())
                    self.label_p2_stack.setText('Stack: ' + str(obj.get_stack()))
                    self.label_p2_stack.adjustSize()
                else:
                    print('Tietokone panosti ' + str(self.panos1))
                    self.potti = self.potti + self.panos1
                    obj.add_stack(-self.panos1)
                    self.label_p2_stack.setText('Stack: ' + str(obj.get_stack()))
                    self.label_p2_stack.adjustSize()
        
        
        self.rivit = self.kuvaus.split('\n')
        if(len(self.rivit)>=6):
            self.kuvaus = self.rivit[1] +'\n' + self.rivit[2] +'\n' + self.rivit[3] +'\n' + self.rivit[4] +'\n' + self.rivit[5] +'\n'  + 'Tietokone panosti ' + str(self.panos1) +'\n'
        else:
            self.kuvaus = self.kuvaus + 'Tietokone panosti ' + str(self.panos1) +'\n'
        
        
        self.label_potti.setText('Potti: ' + str(self.potti))
        self.label_potti.adjustSize() 
        
        self.label_tapahtuma.setText(self.kuvaus)
        self.label_tapahtuma.adjustSize()        
    
    def fold(self):
        self.kuvaus = self.kuvaus + 'Tietokone voitti potin ' + str(self.potti) +'\n'
        self.label_tapahtuma.setText(self.kuvaus)
        self.label_tapahtuma.adjustSize()
        
        for obj in self.pelaajat:
            if(obj.get_nimi()=='Tietokone'):
                obj.add_stack(self.potti)
        #time.sleep(5)
        self.poyta_kortti1.setPixmap(QPixmap(QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\pakka.png')))
        self.poyta_kortti2.setPixmap(QPixmap(QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\pakka.png')))
        self.poyta_kortti3.setPixmap(QPixmap(QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\pakka.png')))
        self.poyta_kortti4.setPixmap(QPixmap(QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\pakka.png')))
        self.poyta_kortti5.setPixmap(QPixmap(QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\pakka.png')))
        self.peli()
        self.jarjestys=1
    
    def maksu(self):   
        if(self.jarjestys==1):
            for obj in self.pelaajat:   
                if(obj.get_nimi()!='Tietokone'):   
                    if(obj.get_stack()<=self.panos1):
                        #print('All in')
                        self.potti = self.potti + obj.get_stack()
                        obj.add_stack(-obj.get_stack())
                        self.label_p1_stack.setText('Stack: ' + str(obj.get_stack()))
                        self.label_p1_stack.adjustSize()
                    else:
                        self.potti = self.potti + self.panos1
                        obj.add_stack(-self.panos1)
                        self.label_p1_stack.setText('Stack: ' + str(obj.get_stack()))
                        self.label_p1_stack.adjustSize()
            
            print('floppi')
            flop1 = self.k.get_kortti()
            flop2 = self.k.get_kortti()
            flop3 = self.k.get_kortti()
            for obj in self.pelaajat:
                obj.add_kortti(flop1)
                obj.add_kortti(flop2)
                obj.add_kortti(flop3)
            print(str(flop1) + ' ' +str(flop2) + ' ' +str(flop3))      
            self.poyta_kortti1.setPixmap(QPixmap(self.kortti1(flop1)))
            self.poyta_kortti2.setPixmap(QPixmap(self.kortti1(flop2)))
            self.poyta_kortti3.setPixmap(QPixmap(self.kortti1(flop3)))
            
            self.rivit = self.kuvaus.split('\n')
            if(len(self.rivit)>=6):
                self.kuvaus = self.rivit[1] +'\n' + self.rivit[2] +'\n' + self.rivit[3] +'\n' + self.rivit[4] +'\n' + self.rivit[5] +'\n' + 'Maksu / Sökötys' +'\n'
            else:
                self.kuvaus = self.kuvaus + 'Maksu / Sökötys' +'\n'
                
            
            self.label_tapahtuma.setText(self.kuvaus)
            self.label_tapahtuma.adjustSize()
            
            self.label_potti.setText('Potti: ' + str(self.potti))
            self.label_potti.adjustSize() 
             
            self.jarjestys=2
        
        
        elif(self.jarjestys==2):
  
            print('turn')
            turn = self.k.get_kortti()
            for obj in self.pelaajat:
                obj.add_kortti(turn)
            print(str(turn))
            self.poyta_kortti4.setPixmap(QPixmap(self.kortti1(turn)))
            
            
            self.rivit = self.kuvaus.split('\n')
            if(len(self.rivit)>=6):
                self.kuvaus = self.rivit[1] +'\n' + self.rivit[2] +'\n' + self.rivit[3] +'\n' + self.rivit[4] +'\n' + self.rivit[5] +'\n' + 'Maksu / Sökötys' +'\n'
            else:
                self.kuvaus = self.kuvaus + 'Maksu / Sökötys' +'\n'
            
            self.label_tapahtuma.setText(self.kuvaus)
            self.label_tapahtuma.adjustSize()
            
            self.label_potti.setText('Potti: ' + str(self.potti))
            self.label_potti.adjustSize() 
            
            self.jarjestys=3
            
            
            
        elif(self.jarjestys==3):
            print('river')
            river = self.k.get_kortti()
            for obj in self.pelaajat:
                obj.add_kortti(river)
            print(str(river))
            self.poyta_kortti5.setPixmap(QPixmap(self.kortti1(river)))
            
            self.rivit = self.kuvaus.split('\n')
            if(len(self.rivit)>=6):
                self.kuvaus = self.rivit[1] +'\n' + self.rivit[2] +'\n' + self.rivit[3] +'\n' + self.rivit[4] +'\n' + self.rivit[5] +'\n' + 'Maksu / Sökötys' +'\n'
            else:
                self.kuvaus = self.kuvaus + 'Maksu / Sökötys' +'\n'
            
            self.label_tapahtuma.setText(self.kuvaus)
            self.label_tapahtuma.adjustSize()
            
            self.label_potti.setText('Potti: ' + str(self.potti))
            self.label_potti.adjustSize() 

            self.jarjestys=0
            #self.mylog()
            #self.kasikortit()
            #time.sleep(4)
            #t1 = threading.Timer(500.0,print('helo'))
            #t1.start()
            
        elif(self.jarjestys==0):
            #time.sleep(5)
            self.kuvaus = self.kuvaus + 'Maksu / Sökötys' +'\n'
            
            for obj in self.pelaajat:
                    a = Arvojarjestys(obj.get_kortit())
                    #print(obj.get_nimi())
                    #print(obj.get_stack())
                    obj.add_arvo(a.lapi()[0],a.lapi()[1],a.lapi()[2])
                
            voittaja=''
            paras_kasi=0
            korkein_kortti=0
            kasi_kuvaus=''
            tasapeli=0
            for obj in self.pelaajat:
                if(paras_kasi==obj.get_arvo()[1]):
                    if(korkein_kortti==obj.get_arvo()[2]):
                        tasapeli+=1
                    if(korkein_kortti<obj.get_arvo()[2]):
                        paras_kasi= obj.get_arvo()[1]
                        voittaja= obj.get_nimi()
                        kasi_kuvaus=obj.get_arvo()[0]
                        korkein_kortti=obj.get_arvo()[2]

                elif(paras_kasi<obj.get_arvo()[1]):
                    paras_kasi= obj.get_arvo()[1]
                    voittaja= obj.get_nimi()
                    kasi_kuvaus=obj.get_arvo()[0]
                    korkein_kortti=obj.get_arvo()[2]
    
            for obj in self.pelaajat:
                if(voittaja==obj.get_nimi() and tasapeli<1):
                    obj.add_stack(self.potti)
                    print('Kasi voitti:')
                    print(obj.get_kortit())
                elif(tasapeli>0):
                    obj.add_stack(self.potti/2)
                    print(self.potti/2)
                
            print('')
            
            self.rivit = self.kuvaus.split('\n')
            if(len(self.rivit)>=6):
                if(tasapeli<1):
                    self.kuvaus = self.rivit[1] +'\n' + self.rivit[2] +'\n' + self.rivit[3] +'\n' + self.rivit[4] +'\n' + self.rivit[5] +'\n' + 'Potin ' +str(self.potti) + ' voitti: ' + voittaja + ' kadella ' + kasi_kuvaus + ' korkein kortti ' + str(korkein_kortti) + '\n'
                else:
                    self.kuvaus = self.rivit[1] +'\n' + self.rivit[2] +'\n' + self.rivit[3] +'\n' + self.rivit[4] +'\n' + self.rivit[5] +'\n' + 'Tasapeli' + ' kadella ' + kasi_kuvaus + ' potti ' +str(self.potti) + ' jakoon' +'\n'
                
            else:
                if(tasapeli<1):
                    self.kuvaus = self.kuvaus + 'Potin ' +str(self.potti) + ' voitti: ' + voittaja + ' kadella ' + kasi_kuvaus + ' korkein kortti ' + str(korkein_kortti) + '\n'
                else:
                    self.kuvaus = self.kuvaus +  'Tasapeli' + ' kadella ' + kasi_kuvaus + ' potti ' +str(self.potti) + ' jakoon' +'\n'
                    
            self.label_tapahtuma.setText(self.kuvaus)
            self.label_tapahtuma.adjustSize()
            
            self.label_potti.setText('Potti: ' + str(self.potti))
            self.label_potti.adjustSize() 
               
            for obj in self.pelaajat:
                if(obj.get_stack()<=0):
                    self.rivit = self.kuvaus.split('\n')
                    if(len(self.rivit)>=6):
                        self.kuvaus = self.rivit[1] +'\n' + self.rivit[2] +'\n' + self.rivit[3] +'\n' + self.rivit[4] +'\n' + self.rivit[5] +'\n' + 'Pelaajalta ' + obj.get_nimi() + ' loppui rahat ja peli päättyy' + '\n'
                    else:
                        self.kuvaus = self.kuvaus + 'Pelaajalta ' + obj.get_nimi() + ' loppui rahat ja peli päättyy' + '\n'
                    
                    self.jarjestys=99
                    
                    self.label_tapahtuma.setText(self.kuvaus)
                    self.label_tapahtuma.adjustSize()
                    
                    #if(obj.get_nimi()!='Tietokone'):
                    #    self.Tietokone_voitti2.setPixmap(QPixmap(QImage(r'C:\Users\Kimmo\Python 3\spyder\Tietokone.gif')))
                        
                     
                    if(obj.get_nimi()!='Tietokone'):
                        self.movie.start()
              
                    
                    print('')
                    print('Pelaajalta ' + obj.get_nimi() + ' loppui rahat ja peli päättyy')
                    
                    self.label_potti.setText('Potti: ' + str(0))
                    self.label_potti.adjustSize() 
                    for obj in self.pelaajat:   
                        if(obj.get_nimi()!='Tietokone'):   
                            self.label_p1_stack.setText('Stack paatos: ' + str(obj.get_stack()))
                            self.label_p1_stack.adjustSize()
                        else:
                            self.label_p2_stack.setText('Stack paatos: ' + str(obj.get_stack()))
                            self.label_p2_stack.adjustSize()
                            
                    
        
          
            if(self.jarjestys!=99):
                self.poyta_kortti1.setPixmap(QPixmap(QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\pakka.png')))
                self.poyta_kortti2.setPixmap(QPixmap(QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\pakka.png')))
                self.poyta_kortti3.setPixmap(QPixmap(QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\pakka.png')))
                self.poyta_kortti4.setPixmap(QPixmap(QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\pakka.png')))
                self.poyta_kortti5.setPixmap(QPixmap(QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\pakka.png')))
                self.peli()
                self.jarjestys=1

    def korotus(self):   
        
        self.panos2 = int(self.text_panos.toPlainText())
        print(self.panos2)
        
        if(self.jarjestys==2):
            
            for obj in self.pelaajat:
                if(obj.get_nimi()!='Tietokone'):
                    if(obj.get_stack()<=self.panos2):
                        #print('All in')
                        self.potti = self.potti + obj.get_stack()
                        obj.add_stack(-obj.get_stack())
                        self.label_p1_stack.setText('Stack1: ' + str(obj.get_stack()))
                        self.label_p1_stack.adjustSize()
                    else:
                        self.potti = self.potti + self.panos2
                        obj.add_stack(-self.panos2)
                        self.label_p1_stack.setText('Stack2: ' + str(obj.get_stack()))
                        self.label_p1_stack.adjustSize()
                else:
                    if(obj.get_stack()<=self.panos2):
                        #print('All in')
                        self.potti = self.potti + obj.get_stack()
                        obj.add_stack(-obj.get_stack())
                        self.label_p2_stack.setText('Stack3: ' + str(obj.get_stack()))
                        self.label_p2_stack.adjustSize()
                    else:
                        self.potti = self.potti + self.panos2
                        obj.add_stack(-self.panos2)
                        self.label_p2_stack.setText('Stack4: ' + str(obj.get_stack()))
                        self.label_p2_stack.adjustSize()
        
  
            print('turn')
            turn = self.k.get_kortti()
            for obj in self.pelaajat:
                obj.add_kortti(turn)
            print(str(turn))
            self.poyta_kortti4.setPixmap(QPixmap(self.kortti1(turn)))
            
            
            self.rivit = self.kuvaus.split('\n')
            if(len(self.rivit)>=6):
                self.kuvaus = self.rivit[1] +'\n' + self.rivit[2] +'\n' + self.rivit[3] +'\n' + self.rivit[4] +'\n' + self.rivit[5] +'\n' + 'Korotus ' + str(self.panos2) + ' Tietokone maksoi' + '\n'
            else:
                self.kuvaus = self.kuvaus + 'Korotus ' + str(self.panos2) + ' Tietokone maksoi' + '\n'
            
            self.label_tapahtuma.setText(self.kuvaus)
            self.label_tapahtuma.adjustSize()
            
            self.label_potti.setText('Potti: ' + str(self.potti))
            self.label_potti.adjustSize() 
            
            self.jarjestys=3
            
            
        elif(self.jarjestys==3):
            
            for obj in self.pelaajat:
                if(obj.get_nimi()!='Tietokone'):
                    if(obj.get_stack()<=self.panos2):
                        #print('All in')
                        self.potti = self.potti + obj.get_stack()
                        obj.add_stack(-obj.get_stack())
                        self.label_p1_stack.setText('Stack5: ' + str(obj.get_stack()))
                        self.label_p1_stack.adjustSize()
                    else:
                        self.potti = self.potti + self.panos2
                        obj.add_stack(-self.panos2)
                        self.label_p1_stack.setText('Stack6: ' + str(obj.get_stack()))
                        self.label_p1_stack.adjustSize()
                else:
                    if(obj.get_stack()<=self.panos2):
                        #print('All in')
                        self.potti = self.potti + obj.get_stack()
                        obj.add_stack(-obj.get_stack())
                        self.label_p2_stack.setText('Stack7: ' + str(obj.get_stack()))
                        self.label_p2_stack.adjustSize()
                    else:
                        self.potti = self.potti + self.panos2
                        obj.add_stack(-self.panos2)
                        self.label_p2_stack.setText('Stack8: ' + str(obj.get_stack()))
                        self.label_p2_stack.adjustSize()
        
  
            print('river')
            river = self.k.get_kortti()
            for obj in self.pelaajat:
                obj.add_kortti(river)
            print(str(river))
            self.poyta_kortti5.setPixmap(QPixmap(self.kortti1(river)))
            
            self.rivit = self.kuvaus.split('\n')
            if(len(self.rivit)>=6):
                self.kuvaus = self.rivit[1] +'\n' + self.rivit[2] +'\n' + self.rivit[3] +'\n' + self.rivit[4] +'\n' + self.rivit[5] +'\n' + 'Korotus ' + str(self.panos2) + ' Tietokone maksoi' +'\n'
            else:
                self.kuvaus = self.kuvaus + 'Korotus ' + str(self.panos2) + ' Tietokone maksoi' +'\n'
            
            self.label_tapahtuma.setText(self.kuvaus)
            self.label_tapahtuma.adjustSize()
            
            self.label_potti.setText('Potti: ' + str(self.potti))
            self.label_potti.adjustSize() 

            self.jarjestys=0
            
            
        elif(self.jarjestys==0):
            #time.sleep(5)
            self.kuvaus = self.kuvaus + 'Maksu / Sökötys' +'\n'
            
            for obj in self.pelaajat:
                    a = Arvojarjestys(obj.get_kortit())
                    #print(obj.get_nimi())
                    #print(obj.get_stack())
                    obj.add_arvo(a.lapi()[0],a.lapi()[1],a.lapi()[2])
                
            voittaja=''
            paras_kasi=0
            korkein_kortti=0
            kasi_kuvaus=''
            tasapeli=0
            for obj in self.pelaajat:
                if(paras_kasi==obj.get_arvo()[1]):
                    if(korkein_kortti==obj.get_arvo()[2]):
                        tasapeli+=1
                    if(korkein_kortti<obj.get_arvo()[2]):
                        paras_kasi= obj.get_arvo()[1]
                        voittaja= obj.get_nimi()
                        kasi_kuvaus=obj.get_arvo()[0]
                        korkein_kortti=obj.get_arvo()[2]

                elif(paras_kasi<obj.get_arvo()[1]):
                    paras_kasi= obj.get_arvo()[1]
                    voittaja= obj.get_nimi()
                    kasi_kuvaus=obj.get_arvo()[0]
                    korkein_kortti=obj.get_arvo()[2]
    
            for obj in self.pelaajat:
                if(voittaja==obj.get_nimi() and tasapeli<1):
                    obj.add_stack(self.potti)
                    print('Kasi voitti:')
                    print(obj.get_kortit())
                elif(tasapeli>0):
                    obj.add_stack(self.potti/2)
                    print(self.potti/2)
                
            print('')
            
            self.rivit = self.kuvaus.split('\n')
            if(len(self.rivit)>=6):
                if(tasapeli<1):
                    self.kuvaus = self.rivit[1] +'\n' + self.rivit[2] +'\n' + self.rivit[3] +'\n' + self.rivit[4] +'\n' + self.rivit[5] +'\n' + 'Potin ' +str(self.potti) + ' voitti: ' + voittaja + ' kadella ' + kasi_kuvaus + ' korkein kortti ' + str(korkein_kortti) + '\n'
                else:
                    self.kuvaus = self.rivit[1] +'\n' + self.rivit[2] +'\n' + self.rivit[3] +'\n' + self.rivit[4] +'\n' + self.rivit[5] +'\n' + 'Tasapeli' + ' kadella ' + kasi_kuvaus + ' potti ' +str(self.potti) + ' jakoon' +'\n'
                
            else:
                if(tasapeli<1):
                    self.kuvaus = self.kuvaus + 'Potin ' +str(self.potti) + ' voitti: ' + voittaja + ' kadella ' + kasi_kuvaus + ' korkein kortti ' + str(korkein_kortti) + '\n'
                else:
                    self.kuvaus = self.kuvaus +  'Tasapeli' + ' kadella ' + kasi_kuvaus + ' potti ' +str(self.potti) + ' jakoon' +'\n'
                    
            self.label_tapahtuma.setText(self.kuvaus)
            self.label_tapahtuma.adjustSize()
            
            self.label_potti.setText('Potti: ' + str(self.potti))
            self.label_potti.adjustSize() 
               
            for obj in self.pelaajat:
                if(obj.get_stack()<=0):
                    self.rivit = self.kuvaus.split('\n')
                    if(len(self.rivit)>=6):
                        self.kuvaus = self.rivit[1] +'\n' + self.rivit[2] +'\n' + self.rivit[3] +'\n' + self.rivit[4] +'\n' + self.rivit[5] +'\n' + 'Pelaajalta ' + obj.get_nimi() + ' loppui rahat ja peli päättyy' + '\n'
                    else:
                        self.kuvaus = self.kuvaus + 'Pelaajalta ' + obj.get_nimi() + ' loppui rahat ja peli päättyy' + '\n'
                    
                    self.jarjestys=99
                    
                    self.label_tapahtuma.setText(self.kuvaus)
                    self.label_tapahtuma.adjustSize()
                    
                    if(obj.get_nimi()!='Tietokone'):
                        self.Tietokone_voitti2.setPixmap(QPixmap(QImage(r'C:\Users\Kimmo\Python 3\spyder\Tietokone.png')))
                    
                    print('')
                    print('Pelaajalta ' + obj.get_nimi() + ' loppui rahat ja peli päättyy')
                    
                    self.label_potti.setText('Potti: ' + str(0))
                    self.label_potti.adjustSize() 
                    for obj in self.pelaajat:   
                        if(obj.get_nimi()!='Tietokone'):   
                            self.label_p1_stack.setText('Stack paatos: ' + str(obj.get_stack()))
                            self.label_p1_stack.adjustSize()
                        else:
                            self.label_p2_stack.setText('Stack paatos: ' + str(obj.get_stack()))
                            self.label_p2_stack.adjustSize()
                            
                    
        
          
            if(self.jarjestys!=99):
                self.poyta_kortti1.setPixmap(QPixmap(QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\pakka.png')))
                self.poyta_kortti2.setPixmap(QPixmap(QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\pakka.png')))
                self.poyta_kortti3.setPixmap(QPixmap(QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\pakka.png')))
                self.poyta_kortti4.setPixmap(QPixmap(QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\pakka.png')))
                self.poyta_kortti5.setPixmap(QPixmap(QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\pakka.png')))
                self.peli()
                self.jarjestys=1
            
            
            
        

    def popup(self):
        #self.dialog = MyPopupDialog()

        # For Modal dialogs
        self.app2 = QtWidgets.QApplication(sys.argv)
        self.MainWindow2 = QtWidgets.QMainWindow()
        self.my = MyPopup()
        self.my.setupUi2(self.MainWindow2)
        self.MainWindow2.show()
        sys.exit(self.app2.exec_())


        # Or for modeless dialogs
        # self.dialog.show()
    
    def changeValue(self, value):      
        for obj in self.pelaajat:
                if(obj.get_nimi()!='Tietokone'):
                    x = obj.get_stack() + 5

        self.text_panos.setText(str(round(x*(value/100))))
        print(x*(value/100))
        
    
    def kortti1(self,k1):
        
        #k1 = self.k.get_kortti()
        print(k1)
        
        #risti
        if(k1[0]==2 and k1[1]=='risti'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\2r.png')  
        if(k1[0]==3 and k1[1]=='risti'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\3r.png')
        if(k1[0]==4 and k1[1]=='risti'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\4r.png')            
        if(k1[0]==5 and k1[1]=='risti'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\5r.png')        
        if(k1[0]==6 and k1[1]=='risti'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\6r.png')        
        if(k1[0]==7 and k1[1]=='risti'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\7r.png')        
        if(k1[0]==8 and k1[1]=='risti'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\8r.png')         
        if(k1[0]==9 and k1[1]=='risti'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\9r.png')       
        if(k1[0]==10 and k1[1]=='risti'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\10r.png')      
        if(k1[0]==11 and k1[1]=='risti'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\11r.png')       
        if(k1[0]==12 and k1[1]=='risti'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\12r.png')    
        if(k1[0]==13 and k1[1]=='risti'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\13r.png')
        if(k1[0]==14 and k1[1]=='risti'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\14r.png')
            
            
        #ruutu
        if(k1[0]==2 and k1[1]=='ruutu'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\2ru.png')  
        if(k1[0]==3 and k1[1]=='ruutu'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\3ru.png')
        if(k1[0]==4 and k1[1]=='ruutu'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\4ru.png')            
        if(k1[0]==5 and k1[1]=='ruutu'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\5ru.png')        
        if(k1[0]==6 and k1[1]=='ruutu'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\6ru.png')        
        if(k1[0]==7 and k1[1]=='ruutu'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\7ru.png')        
        if(k1[0]==8 and k1[1]=='ruutu'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\8ru.png')         
        if(k1[0]==9 and k1[1]=='ruutu'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\9ru.png')       
        if(k1[0]==10 and k1[1]=='ruutu'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\10ru.png')      
        if(k1[0]==11 and k1[1]=='ruutu'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\11ru.png')       
        if(k1[0]==12 and k1[1]=='ruutu'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\12ru.png')    
        if(k1[0]==13 and k1[1]=='ruutu'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\13ru.png')
        if(k1[0]==14 and k1[1]=='ruutu'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\14ru.png')



        #pata
        if(k1[0]==2 and k1[1]=='pata'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\2p.png')  
        if(k1[0]==3 and k1[1]=='pata'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\3p.png')
        if(k1[0]==4 and k1[1]=='pata'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\4p.png')            
        if(k1[0]==5 and k1[1]=='pata'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\5p.png')        
        if(k1[0]==6 and k1[1]=='pata'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\6p.png')        
        if(k1[0]==7 and k1[1]=='pata'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\7p.png')        
        if(k1[0]==8 and k1[1]=='pata'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\8p.png')         
        if(k1[0]==9 and k1[1]=='pata'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\9p.png')       
        if(k1[0]==10 and k1[1]=='pata'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\10p.png')      
        if(k1[0]==11 and k1[1]=='pata'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\11p.png')       
        if(k1[0]==12 and k1[1]=='pata'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\12p.png')    
        if(k1[0]==13 and k1[1]=='pata'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\13p.png')
        if(k1[0]==14 and k1[1]=='pata'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\14p.png')


        #hertta
        if(k1[0]==2 and k1[1]=='hertta'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\2h.png')  
        if(k1[0]==3 and k1[1]=='hertta'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\3h.png')
        if(k1[0]==4 and k1[1]=='hertta'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\4h.png')            
        if(k1[0]==5 and k1[1]=='hertta'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\5h.png')        
        if(k1[0]==6 and k1[1]=='hertta'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\6h.png')        
        if(k1[0]==7 and k1[1]=='hertta'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\7h.png')        
        if(k1[0]==8 and k1[1]=='hertta'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\8h.png')         
        if(k1[0]==9 and k1[1]=='hertta'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\9h.png')       
        if(k1[0]==10 and k1[1]=='hertta'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\10h.png')      
        if(k1[0]==11 and k1[1]=='hertta'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\11h.png')       
        if(k1[0]==12 and k1[1]=='hertta'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\12h.png')    
        if(k1[0]==13 and k1[1]=='hertta'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\13h.png')
        if(k1[0]==14 and k1[1]=='hertta'):
            r = QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\14h.png')

        return r
    
class MyPopup(object):
    
    def setupUi2(self, MainWindow):
    
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(1200, 1200)
        
        centralwidget = QtWidgets.QWidget(MainWindow)
        centralwidget.setObjectName("centralwidget")
    
        horizontalLayoutWidget_3 = QtWidgets.QWidget(centralwidget)
        horizontalLayoutWidget_3.setGeometry(QtCore.QRect(400, 50, 360, 270))
        horizontalLayoutWidget_3.setObjectName("horizontalLayoutWidget_3")
        p3_kasi = QtWidgets.QHBoxLayout(horizontalLayoutWidget_3)
        p3_kasi.setContentsMargins(0, 0, 0, 0)
        p3_kasi.setObjectName("p3_kasi")       
        p3_kortti1 = QLabel('kortti1')
        p3_kortti1.setPixmap(QPixmap(QImage(r'C:\Users\Kimmo\Python 3\spyder\pakka\pakka.png')))
        p3_kasi.addWidget(p3_kortti1)  
            
        MainWindow.setCentralWidget(centralwidget)
        
    

        MainWindow.show()
        time.sleep(5)
        # Regular init stuff...
        # and other things you might want
        
        
class LoadingGif(object): 
  
    def mainUI(self, FrontWindow): 
        FrontWindow.setObjectName("FTwindow") 
        FrontWindow.resize(320, 300) 
        self.centralwidget = QtWidgets.QWidget(FrontWindow) 
        self.centralwidget.setObjectName("main-widget") 
  
        # Label Create 
        self.label33 = QtWidgets.QLabel(self.centralwidget) 
        self.label33.setGeometry(QtCore.QRect(25, 25, 200, 200)) 
        self.label33.setMinimumSize(QtCore.QSize(250, 250)) 
        self.label33.setMaximumSize(QtCore.QSize(250, 250)) 
        self.label33.setObjectName("lb1") 
        FrontWindow.setCentralWidget(self.centralwidget) 
  
        # Loading the GIF 
        self.movie = QMovie(r'C:\Users\Kimmo\Python 3\spyder\Tietokone.gif') 
        self.label33.setMovie(self.movie) 
  
        self.startAnimation() 
  
    # Start Animation 
  
    def startAnimation(self): 
        self.movie.start() 
  
    # Stop Animation(According to need) 
    def stopAnimation(self): 
        self.movie.stop() 

class start(object):
    
    def start1():
        app22 = QtWidgets.QApplication(sys.argv) 
        window22 = QtWidgets.QMainWindow() 
        demo22 = LoadingGif() 
        demo22.mainUI(window22) 
        window22.show() 
        sys.exit(app22.exec_()) 
    
    
if __name__ == "__main__":
    import sys 
    app = QtWidgets.QApplication(sys.argv)
    MainWindow = QtWidgets.QMainWindow()
    ui = GUI()
    ui.setupUi(MainWindow)
    MainWindow.show()
    sys.exit(app.exec_())


#h = Holdem()
#h.game()
