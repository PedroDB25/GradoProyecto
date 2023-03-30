
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from dal.ORM import Base


class Mx(Base):
    __tablename__ = "mx"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String)
    sigla = Column(String)
    formula = Column(String)

    sistema = Column(Integer)
    grupo = Column(Integer)

    maclas = Column(String)
    exfoliacion = Column(String)
    forma = Column(String)
    color = Column(String)
    pleocroismo = Column(String)
    relieve = Column(String)
    IRefraccion = Column(String)
    birrefringencia = Column(String)
    colorInter = Column(String)
    orientacion = Column(String)
    elongacion = Column(String)
    extincion = Column(String)
    signo = Column(String)
    otros = Column(String)
    asociaciones = Column(String)
    alteraciones = Column(String)


class Sistema(Base):
    __tablename__ = "sistema"

    id = Column(Integer, primary_key=True, index=True)
    indice = Column(Integer, index=True)
    nombre = Column(String, index=True)


class Grupo(Base):
    __tablename__ = "grupo"

    id = Column(Integer, primary_key=True, index=True)
    indice = Column(Integer, index=True)
    nombre = Column(String)

class Menu(Base):
    __tablename__ = "MenuInicio"

    id = Column(Integer, primary_key=True, index=True)
    menu = Column(String)
