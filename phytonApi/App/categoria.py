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
    Day = db.Column(db.String(50))
    Permanent = db.Column(db.Boolean())

    def __init__(self, Name, Date,Hour):
        self.Name = Name
        self.Date = Date
        self.Hour = Hour
        self.Day = Day
        self.Permanent = Permanent

def create_tables():
    with app.app_context():
        db.create_all()

#########################################################
#########################################################
#########################################################

#Esquema para interactuar con servicios
class ClassSchema(ma.Schema):
    class Meta:
        fields = ('Id','Name','Date','Hour','Day','Permanent')

#Unica respuesta
class_schema = ClassSchema()
#Varias respuestas
classes_schema = ClassSchema(many=True)

#GET
@app.route('/classes',methods=['GET'])
def get_classes():
    all_categorias = Classes.query.all()
    result = classes_schema.dump(all_categorias)
    return jsonify(result)


@app.route('/create_class', methods=['POST'])
def create_class():
    class_name = request.json.get('Name')
    class_date = request.json.get('Date')
    class_hour = request.json.get('Hour')
    class_day = request.json.get('Day')
    class_permanent = request.json.get('Permanent')

    new_class = Classes(Name=class_name,Date=class_date,Hour=class_hour,Day=class_day,Permanent=class_permanent)
    
    db.session.add(new_class)
    db.session.commit()
    return classes_schema.jsonify(new_class), 201

#########################################################
#########################################################
#########################################################



@app.route('/',methods=['GET'])
def index():
    return jsonify({'Mensaje':'Bienvenido'})

if __name__ == "__main__":
    app.run(debug=True)
