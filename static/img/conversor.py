import cv2
import os

for file in os.listdir('static/img'):
    if "png" not in file: continue
    imagen = cv2.imread('static/img/' +file)
    grayscale = cv2.cvtColor(imagen, cv2.COLOR_BGR2GRAY)
    cv2.imwrite('static/img/' + file,grayscale)