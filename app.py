from fastapi import Depends, FastAPI

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
#app.mount("/app/static", StaticFiles(directory="/app/static",html = True), name="static")
#templates = Jinja2Templates(directory="/app/static")
app.mount("/static", StaticFiles(directory="static",html = True), name="static")
templates = Jinja2Templates(directory="static")
print("Encontrada la carpeta de statics")

# Dependency


async def get_db():
    db = SessionLocal()
    try:
        yield db
        print("BBDD conectada corretamente" if probar_conexion()
              else "BBDD con problemas")
    finally:
        db.close()

#HTML
@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


#API
#Retorna todos los minerales o uno en especifico
@app.get("/mxs")
async def mostrar_mx(db: Session = Depends(get_db), id: int = -1):
    if id == -1:
        return response(data=get_mxs(db), estado=200, mensaje="Success")
    return response(data=get_mx(db, id), estado=200, mensaje="Success")

#Retorna el menu del HTML
@app.get("/menu")
async def mostrar_mx(db: Session = Depends(get_db)):
    return response(get_menu(db), estado=200, mensaje="Success")
#Retorna el menu del HTML
@app.get("/html")
async def mostrar_mx(db: Session = Depends(get_db), id: str = ""):
    return response(get_html(db,id), estado=200, mensaje="Success")

#Retorna un mineral por su sigla
@app.get("/mxtr/{sigla}")
async def mostrar_mx(db: Session = Depends(get_db), sigla: str = ""):
    return response(data=get_mx_by_sigla(db, sigla), estado=200, mensaje="Success")

#Retorna un grupo de minerales por su grupo
@app.get("/gr/{gr}")
async def mostrar_gr(db: Session = Depends(get_db), gr: str = ""):
    return response(data=get_mxs_by_gr(db, gr), estado=200, mensaje="Success")

#Retorna un grupo de minerales reflejado
@app.get("/grrefle/{gr}")
async def mostrar_gr(db: Session = Depends(get_db), gr: str = ""):
    return response(data=get_mxs_by_grrefle(db, gr), estado=200, mensaje="Success")

@app.post("/mxs")
async def mostrar_mx(mxtr: mxtr, db: Session = Depends(get_db)):

    if get_mx(db, mxtr.id):
        return response("Mineral ya existente", estado=400, mensaje="Error")
    data = create_mx(db, mxtr)
    return response(data, estado=200, mensaje="Success")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=80)
