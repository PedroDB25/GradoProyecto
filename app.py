from fastapi import Depends, FastAPI

from fastapi.middleware.cors import CORSMiddleware
from dal.mxdao import *
from modelos.response import response

from fastapi import FastAPI, Request

from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from sqlalchemy.orm import Session
import uvicorn

from dal.ORM import SessionLocal, engine, Base

Base.metadata.create_all(bind=engine)

# probar FastApi funcionado
app = FastAPI()
print("fastApi Levantado")

# Montar directorio
app.mount("/static", StaticFiles(directory="static",html = True), name="static")
templates = Jinja2Templates(directory="static")
print("Encontrada la carpeta de statics")

# Dependency


async def get_db():
    db = SessionLocal()
    try:
        yield db
        print("BBDD conectada corretamente" if probarConexion()
              else "BBDD con problemas")
    finally:
        db.close()


@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/mxs")
async def mostrar_mx(db: Session = Depends(get_db), id: int = -1):
    if id == -1:
        return response(data=get_mxs(db), estado=200, mensaje="Success")
    return response(data=get_mx(db, id), estado=200, mensaje="Success")


@app.get("/menu")
async def mostrar_mx(db: Session = Depends(get_db)):
    return response(get_menu(db), estado=200, mensaje="Success")


@app.get("/mx/{sigla}")
async def mostrar_mx(db: Session = Depends(get_db), sigla: str = ""):

    return response(data=get_mx_by_sigla(db, sigla), estado=200, mensaje="Success")


@app.post("/mxs")
async def mostrar_mx(mx: mx, db: Session = Depends(get_db)):

    if get_mx(db, mx.id):
        return response("Mineral ya existente", estado=400, mensaje="Error")
    data = create_mx(db, mx)
    return response(data, estado=200, mensaje="Success")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

"""
sistemas
cubico 0
tetragonal 1
hexagonal 2
trigonal 3
rombico 4
monoclinico 5
triclinico 6

grupos
neso 0
soro 1
ciclo 2
inoS 3
inoD 4 
filo 5
tecto 6
haluros7
carbonato 8
fosfatos 9
oxidos e hidroxidos 10

NOMBRE: ([^\n]*)\n\nFÓRMULA: ([^\n]*)\n\nSISTEMA: ([^\n]*)\n\nGRUPO: ([^\n]*)\n\n\n\nFORMA: ([^\n]*)\n\nCOLOR: ([^\n]*)\n\nPLEOCROÍSMO: ([^\n]*)\n\nMACLAS: ([^\n]*)\n\nEXFOLIACIÓN: ([^\n]*)\n\nÍNDICES DE REFRACCIÓN\n\n([^\n]*)\n\n([^\n]*)\n\n([^\n]*)\n\nRELIEVE:([^\n]*)\n\nBIRREFRINGENCIA:([^\n]*)\n\nCOLOR DE INTERFERENCIA:([^\n]*)\n\nORIENTACIÓN: ([^\n]*)\n\nELONGACIÓN: ([^\n]*)\n\nÁNGULO DE EXTINCIÓN([^\n]*)\n\nSIGNO ÓPTICO: ([^\n]*)\n\n\n\nOTROS DATOS: ([^\n]*)\n\nASOCIACIÓN:([^\n]*)

{\n"id": ,\n"nombre": "$1",\n"sigla":"",\n"formula":"$2",\n"sistema":"[$3]",\n"grupo":"[$4]",\n"forma": "$5",\n"color": "[$6]", \n"pleocroismo": "$7",\n "fractura": "",\n"maclas": "$8",\n"exfoliacion": "$9",\n "IRefraccion": "[ $10 , $11 , $12]",\n "relieve": "[$13]",\n "birrefringencia": "$14",\n "colorInter": "[$15]",\n "orientacion": "$16",\n "elongacion": "[$17]",\n    "extincion": "[$18]",\n    "signo": "[$19]",\n    "otros": "$20",\n     "asociaciones": "$21",\n     "alteraciones": ""\n}

"""
