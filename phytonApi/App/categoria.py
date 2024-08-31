from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS 


#configuraciones basicas, cuidado el nombre de la bdd que se conecta
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost:3306/pid'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app) 

db = SQLAlchemy(app)
ma = Marshmallow(app)




#Forma de definir tablas para que las conozca SQLAlchemy
class Classes(db.Model):
    Id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(100))
    Date = db.Column(db.Date())
    Hour = db.Column(db.String(20))

    def __init__(self, Name, Date,Hour):
        self.Name = Name
        self.Date = Date
        self.Hour = Hour

def create_tables():
    with app.app_context():
        db.create_all()

#########################################################
#########################################################
#########################################################

#Esquema para interactuar con servicios
class ClassSchema(ma.Schema):
    class Meta:
        fields = ('Id','Name','Date','Hour')

#Unica respuesta
class_schema = ClassSchema()
#Varias respuestas
classes_schema = ClassSchema(many=True)

#GET
@app.route('/categoria',methods=['GET'])
def get_classes():
    all_categorias = Classes.query.all()
    result = classes_schema.dump(all_categorias)
    return jsonify(result)

#########################################################
#########################################################
#########################################################



@app.route('/',methods=['GET'])
def index():
    return jsonify({'Mensaje':'Bienvenido'})

if __name__ == "__main__":
    app.run(debug=True)
