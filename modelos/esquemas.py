from pydantic import BaseModel
from typing import List

class sistema(BaseModel):
    id: int
    indice: int
    nombre: str

    class Config:
        orm_mode = True

class menuInicio(BaseModel):
    id: int
    menu: str

    class Config:
        orm_mode = True


class grupoReflejada(BaseModel):
    id: int
    indice: int
    nombre: str

    class Config:
        orm_mode = True


class grupoTransmitida(BaseModel):
    id: int
    indice: int
    nombre: str

    class Config:
        orm_mode = True

class mxtr(BaseModel):

    id: int
    sigla: str
    nombre: str
    formula: str
    sistema: str
    grupo: str
    maclas: str
    exfoliacion: str

    # opticos paralelo
    forma: str
    color: str
    pleocroismo: str
    relieve: str
    IRefraccion: str
    # opticos cruzados
    birrefringencia: str
    colorInter: str
    orientacion: str
    elongacion: str
    extincion: str
    signo: str
    # otros
    otros: str
    asociaciones: str
    alteraciones: str

    class Config:
        orm_mode = True


class pmineralogicas(BaseModel):
    id: int
    propiedad :str

    class Config:
        orm_mode = True

class popticas(BaseModel):

    id: int
    nombre :str

    class Config:
        orm_mode = True
