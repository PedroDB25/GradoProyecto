import sqlite3
from sqlite3 import Error
from sqlalchemy.orm import Session

from modelos.tablas import *
from modelos.esquemas import *


def probarConexion():
    """ create a database connection to a SQLite database """
    conn = None
    try:
        conn = sqlite3.connect(r"C:\Users\yg-\Desktop\Proy_progra\GradoProyecto\files\ddbb\mx.sqlite")
        return True
    except Error as e:
        return False
    finally:
        if conn:
            conn.close()


#Obtener todos los grupos de minerales en la base de datos y el menu

def get_menu(db: Session):
    salida= {}
    aux=[]
    aux2=[]
    aux3=[]

    
    for lis in db.query(Menu).all():
        aux.append(lis.menu)
    for lis in db.query(GrupoTransmi).all():
        aux2.append(lis.nombre)
    for lis in db.query(GrupoRefle).all():
        aux3.append(lis.nombre)

    
    salida["menu"] = aux
    salida["transmitado"] = aux2
    salida["reflejado"] = aux3

    return salida


#minerales
def get_mxs(db: Session):
    return db.query(Mx).all()

def get_mx(db: Session, id):
    return db.query(Mx).filter(Mx.id == id).first()

    
def get_mx_by_sigla(db: Session, sigla):
    return db.query(Mx).filter(Mx.sigla == sigla).first()

def get_mxs_by_gr(db: Session, gr):
    print(gr)
    return db.query(Mx).filter(Mx.grupo == gr).all()

def create_mx(db: Session, mx: mx):
    db_item = Mx(**mx.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return True