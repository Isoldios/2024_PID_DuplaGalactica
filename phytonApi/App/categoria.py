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


class Users(db.Model):
    Id = db.Column(db.Integer, primary_key=True)
    Mail = db.Column(db.String(100))
    Username = db.Column(db.String(100))
    Name = db.Column(db.String(100))
    Lastname = db.Column(db.String(100))
    Password = db.Column(db.String(100))
    Birthday = db.Column(db.Date)
    Gym = db.Column(db.String(100))
    
    def __init__(self,Mail,Username,Name,Lastname,Password,Birthday,Gym):
        self.Mail=Mail
        self.Username = Username
        self.Name = Name
        self.Lastname = Lastname
        self.Password = Password
        self.Birthday = Birthday
        self.Gym = Gym


#Forma de definir tablas para que las conozca SQLAlchemy
class Classes(db.Model):
    Id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(100))
    Date = db.Column(db.Date())
    Hour = db.Column(db.String(20))
    Day = db.Column(db.String(50))
    Permanent = db.Column(db.Boolean())

    def __init__(self, Name, Date,Hour,Day,Permanent):
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

class UsersSchema(ma.Schema):
    class Meta:
        fields = ('Id','Mail','Username','Name','Lastname','Password','Birthday','Gym')


#Unica respuesta
class_schema = ClassSchema()
#Varias respuestas
classes_schema = ClassSchema(many=True)
users_schema = UsersSchema(many=True)

#Clases
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
    if class_permanent=='Si':
        class_permanent = True
    else:
        class_permanent = False
    new_class = Classes(Name=class_name,Date=class_date,Hour=class_hour,Day=class_day,Permanent=class_permanent)
    
    db.session.add(new_class)
    db.session.commit()
    return class_schema.jsonify(new_class), 201

#Users
@app.route('/login', methods=['GET'])
def get_user():
    password_got = request.args.get('Password')
    mail_got = request.args.get('Mail')

    user = Users.query.filter_by(Password=password_got, Mail=mail_got).first()

    if user:
        result = UsersSchema().dump(user)  
        return jsonify(result)
    else:
        return jsonify({'message': 'Usuario no encontrado'}), 404


@app.route('/sign_in', methods=['POST'])
def create_user():
    mail = request.json.get('Mail')
    user_name = request.json.get('Username') 
    name = request.json.get('Name')
    lastname = request.json.get('Lastname')
    password = request.json.get('Password')
    birthday = request.json.get('Birthday')
    gym = request.json.get('Gym')

    new_user = Users(Mail=mail,Username=user_name, Name=name, Lastname=lastname, Password=password, Birthday=birthday, Gym=gym)

    db.session.add(new_user)
    db.session.commit()

    return UsersSchema().jsonify(new_user), 201 



#########################################################
#########################################################
#########################################################



@app.route('/',methods=['GET'])
def index():
    return jsonify({'Mensaje':'Bienvenido'})

if __name__ == "__main__":
    app.run(debug=True)
