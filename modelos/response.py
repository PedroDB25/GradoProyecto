import datetime

class response:
    def __init__(self, data, estado,mensaje):
        self.data=data
        self.estado=estado
        self.mensaje=mensaje
        self.date = datetime.datetime.now()
        