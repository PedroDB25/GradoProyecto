"""
Clase con las llamadas a la base de datos
"""
import sqlite3
from sqlite3 import Error
from sqlalchemy.orm import Session

from modelos.tablas import *
from modelos.esquemas import mxtr

#RUTA_BASE_DATOS = r"\app\files\ddbb\mx.sqlite"
RUTA_BASE_DATOS = r"\files\ddbb\mx.sqlite"


def probar_conexion():
    """ Metodo para probar si se realiza bien la conexion con la base de datos """
    conn = None
    try:
        conn = sqlite3.connect(RUTA_BASE_DATOS)
        return True
    except Error:
        return False
    finally:
        if conn:
            conn.close()

def get_menu(db: Session):
    """ Metodo para obtener el menu de la aplicacion """
    salida= {}
    aux=[]
    aux2=[]
    aux3=[]
    aux4=[]
    aux5=[]

    for lis in db.query(Menu).all():
        aux.append(lis.menu)
    for lis in db.query(Sistema).all():
        aux2.append(lis.nombre)
    for lis in db.query(GrupoRefle).all():
        aux3.append(lis.nombre)
    for lis in db.query(PMineralogicas).all():
        aux4.append(lis.propiedad)
    for lis in db.query(POpticas).all():
        aux5.append(lis.nombre)

    salida["menu"] = aux
    salida["grupoSilicatos"] = aux2
    salida["reflejado"] = aux3
    salida["mineralogicas"] = aux4
    salida["opticas"] = aux5

    return salida

#minerales
def get_mxs(db: Session):
    """ Metodo para obtener todos los minerales """
    return db.query(MxTr).all()

def get_mx(db: Session, id):
    """ Metodo para obtener el primer mineral con este id """
    return db.query(MxTr).filter(MxTr.id == id).first()

def get_mx_by_sigla(db: Session, sigla):
    """ Metodo para obtener el primer mineral con esta sigla """
    return db.query(MxTr).filter(MxTr.sigla == sigla).first()

def get_mxs_by_gr(db: Session, gr):
    """ Metodo para obtener todos minerales de este grupo (transmitidos)"""
    search = f"%{gr}%"
    return db.query(MxTr).filter(MxTr.grupo.like(search)).all()

def get_mxs_by_grrefle(db: Session, gr):
    """ Metodo para obtener todos minerales de este grupo (reflejados)"""
    search = f"%{gr}%"
    return db.query(MxRef).filter(MxRef.grupo.like(search)).all()

def create_mx(db: Session, mxtr: mxtr):
    """ Metodo para crear minerales """
    db_item = MxTr(**mxtr.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return True
