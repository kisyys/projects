import pygame
import pandas as pd
from sklearn.neighbors import KNeighborsRegressor


WIDTHG = 1200
HEIGHTG = 600
BORDER = 20
bgColor = pygame.Color("black")
fgColor = pygame.Color("white")
VELOCITY = 5
FRAMERATE = 120
END = 0;
CLOSE =0;
SCORE1 = 0;
SCORE2 = 0;

class Ball:
    RADIUS = 10
    
    def __init__(self,x,y,vx,vy,e1,e2):
        self.x = x
        self.y = y
        self.vx = vx
        self.vy = vy
        self.e1 = e1
        self.e2 = e2
        
    def show(self, colour):
        global screen
        pygame.draw.circle(screen, colour, (self.x, self.y), self.RADIUS)
        
    def update(self):
        global bgColor, fgColor, WIDTHG, HEIGHTG, BORDER
        
        newx = self.x + self.vx
        newy = self.y + self.vy
        
       
        if newy+self.RADIUS > HEIGHTG-BORDER or newy-self.RADIUS < BORDER:
            self.vy = -self.vy
        
        elif newx + self.RADIUS <= Paddle1.WIDTH+Paddle1.WIDTH and abs(newy-paddle1.y) <= Paddle1.HEIGHT:
            self.vx = -self.vx
                
        elif newx + self.RADIUS > WIDTHG:
            self.e1 = 1
                
        elif newx + self.RADIUS < Paddle1.WIDTH:
            self.e2 = 1

        elif newx + self.RADIUS >= WIDTHG-Paddle2.WIDTH and abs(newy-paddle2.y) <= Paddle2.HEIGHT:
            self.vx = -self.vx
                        
        else:
            self.show(bgColor)
            self.x = newx
            self.y = newy
            self.show(fgColor)
            
class Paddle1:
    WIDTH = 20
    HEIGHT = 100
    
    def __init__(self,y):
        self.y = y
        
    def show(self, colour):
        global screen
        pygame.draw.rect(screen, colour, pygame.Rect((0,self.y-self.HEIGHT//2),(self.WIDTH,self.HEIGHT)))
        
        
    def update(self,prediction):
        global bgColor, fgColor
        #newY=pygame.mouse.get_pos()[1]
        newY=prediction    
        if newY-self.HEIGHT//2 > BORDER and newY+self.HEIGHT//2<HEIGHTG-BORDER:
            self.show(bgColor)
            #self.y = pygame.mouse.get_pos()[1]
            self.y = prediction
            self.show(fgColor)

class Paddle2:
    WIDTH = 20
    HEIGHT = 100
    
    def __init__(self,y):
        self.y = y

    def show(self, colour):
        global screen
        pygame.draw.rect(screen, colour, pygame.Rect((WIDTHG-self.WIDTH,self.y-self.HEIGHT//2),(self.WIDTH,self.HEIGHT)))

    def update(self):
        global bgColor, fgColor
        newY=pygame.mouse.get_pos()[1]
       #newY=prediction
        
        if newY-self.HEIGHT//2 > BORDER and newY+self.HEIGHT//2<HEIGHTG-BORDER:
            self.show(bgColor)
            self.y = pygame.mouse.get_pos()[1]
           # self.y = prediction
            self.show(fgColor)

while CLOSE ==0:
    
    pygame.draw
    
    pygame.init()
    
    screen = pygame.display.set_mode((WIDTHG, HEIGHTG))
                               
    pygame.draw.rect(screen, fgColor, pygame.Rect((0,0),(WIDTHG,BORDER)))
    # pygame.draw.rect(screen, fgColor, pygame.Rect((0,0),(BORDER,HEIGHT)))
    pygame.draw.rect(screen, fgColor, pygame.Rect((0,HEIGHTG-BORDER),(WIDTHG,BORDER)))

   

    if SCORE1 == 5:
        SCORE = "SCORE: " + str(SCORE1) + " - " + str(SCORE2) + " - Player1 won!!!"
        SCORE1 = 0
        SCORE2 = 0
        VELOCITY = 5

    elif SCORE2 == 5: 
        SCORE = "SCORE: " + str(SCORE1) + " - " + str(SCORE2) + " - Player2 won!!!"
        SCORE1 = 0
        SCORE2 = 0
        VELOCITY = 5
        
    else:
        SCORE = "SCORE: " + str(SCORE1) + " - " + str(SCORE2)

    myfont = pygame.font.SysFont("Arial", 20)
    letter = myfont.render(SCORE,0,bgColor)
    screen.blit(letter,(WIDTHG//4,0))

    ball = Ball(200, HEIGHTG//2, -VELOCITY,-VELOCITY, END,END)                           
    ball.show(fgColor)
    
    paddle1 = Paddle1(HEIGHTG//2)
    paddle1.show(fgColor)
    
    paddle2 = Paddle2(HEIGHTG//2)
    paddle2.show(fgColor)
    
    clock = pygame.time.Clock()
    
    #sample = open("game.csv", "w")
    
    #print("x,y,vx,vy,Paddle.y", file=sample)
    
    pong = pd.read_csv("game.csv")
    pong = pong.drop_duplicates()
    
    X = pong.drop(columns="Paddle.y")
    y = pong['Paddle.y']
    
    clf = KNeighborsRegressor(n_neighbors=3)
    clf = clf.fit(X,y)
    
    df = pd.DataFrame(columns=['x', 'y', 'vx', 'vy'])
    
    jep = 1
    
    while True:
        e= pygame.event.poll()
        if e.type == pygame.QUIT:
            CLOSE = 1
            break
        
        if ball.e1 == 1:
            SCORE1=SCORE1+1
            break
        
        if ball.e2 == 1:
            SCORE2=SCORE2+1
            break
        
        if pygame.mouse.get_pressed()[2]:
            break
        
        clock.tick(FRAMERATE)
        
        toPredict = df.append({'x':ball.x, 'y':ball.y, 'vx':ball.vx, 'vy':ball.vy}, ignore_index=True)
        
        shouldMove=clf.predict(toPredict)
        
        pygame.display.flip()    
        paddle2.update()
        paddle1.update(shouldMove)
        if pygame.mouse.get_pressed()[0]:
            jep =0
          
        if jep ==0:
            ball.update()
    
    VELOCITY=VELOCITY+2
        
    #    print("{},{},{},{},{}".format(ball.x, ball.y, ball.vx, ball.vy, paddle.y), file=sample)
        
pygame.quit()
