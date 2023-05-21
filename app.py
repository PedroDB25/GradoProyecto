"""Archivo base del programa"""

from fastapi import Depends, FastAPI
from modelos.response import response
from fastapi import FastAPI, Request
from fastapi.openapi.utils import get_openapi
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from sqlalchemy.orm import Session
import uvicorn

from dal.ORM import SessionLocal, engine, Base
from dal.mxdao import *

Base.metadata.create_all(bind=engine)
# Datos de la API


# probar FastApi funcionado
app = FastAPI()


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="MxAPI",
        version="0.0.1",
        description="API donde puedes consultar datos opticos y mineralogicos de un gran grupo de minerales",
        routes=app.routes
    )
    openapi_schema["info"]["x-logo"] = {
        "url": "https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png"
    }
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi

print("fastApi Levantado")

# Montar directorio
#app.mount("/app/static", StaticFiles(directory="/app/static",html = True), name="static")
#templates = Jinja2Templates(directory="/app/static")
app.mount("/static", StaticFiles(directory="static", html=True), name="static")
templates = Jinja2Templates(directory="static")
print("Encontrada la carpeta de statics")


async def get_db():
    db = SessionLocal()
    try:
        yield db
        print("BBDD conectada corretamente" if probar_conexion()
              else "BBDD con problemas")
    finally:
        db.close()


# API
# Retorna un mineral por su sigla
@app.get("/mxtr/{sigla}", summary="Obtener todos los minerales no opacos o un mineral por su id", tags=["Obtener mx"])
async def mostrar_mx(db: Session = Depends(get_db), sigla: str = ""):
    return response(data=get_mx_by_sigla(db, sigla), estado=200, mensaje="Success")

# Retorna un grupo de minerales por su grupo


@app.get("/gr/{gr}", summary="Obtener un grupo de minerales no opacos por su id de grupo.",  tags=["Obtener lista de mx"])
async def mostrar_gr(db: Session = Depends(get_db), gr: str = ""):
    return response(data=get_mxs_by_gr(db, gr), estado=200, mensaje="Success")

# Retorna un grupo de minerales reflejado


@app.get("/grrefle/{gr}", name="Obtener minerales opacos", summary="Obtener un grupo de minerales opacos a traves de un id de grupo.",  tags=["Obtener lista de mx"])
async def mostrar_gr(db: Session = Depends(get_db), gr: str = ""):
    return response(data=get_mxs_by_grrefle(db, gr), estado=200, mensaje="Success")


@app.post("/mxs", name="Guardar minerales", summary="Guarda los minerales directamente en la base de datos",  tags=["Guardar mx"])
async def guardar_mx(mxtr: mxtr, db: Session = Depends(get_db)):
    return response("", estado=200, mensaje="En este momento no esta permitido guardar minerales en la base de datos.")
    # if get_mx(db, mxtr.id):
    #    return response("Mineral ya existente", estado=400, mensaje="Error")
    #data = create_mx(db, mxtr)
    # return response(data, estado=200, mensaje="Success")


"""Endpoints sin registro en swagger"""


@app.get("/mxs", include_in_schema=False)
async def obterner_minerales(db: Session = Depends(get_db), id: int = -1):
    """
    Obtienes todos los datos de los minerales en la BBDD si no introduces un id, de lo contrario, obtienes los datos de un mineral.
    \nparametros:
    - **id**: opcional- Es el codigo del mineral introducido en la base de datos.
    """

    return response(data=get_mxs(db), estado=200, mensaje="Success") if id == -1 else response(data=get_mx(db, id), estado=200, mensaje="Success")


# HTML
@app.get("/", response_class=HTMLResponse, include_in_schema=False)
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


# Retorna el menu del HTML
@app.get("/menu", include_in_schema=False)
async def retornar_menu(db: Session = Depends(get_db)):
    return response(get_menu(db), estado=200, mensaje="Success")

# Retorna el fragmento solicitado


@app.get("/html", include_in_schema=False)
async def retornar_fragmento(db: Session = Depends(get_db), id: str = ""):
    return response(get_html(db, id), estado=200, mensaje="Success")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=80)
