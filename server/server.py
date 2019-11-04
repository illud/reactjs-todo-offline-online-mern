from flask import Flask, request
import json
import pymongo
from bson.json_util import dumps
from flask_cors import CORS
import datetime

mycliente = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = mycliente["reactodo"]
mycol = mydb["reactodos"]
x = mycol.find({})


app = Flask(__name__)
CORS(app)

@app.route("/save", methods=["POST"])
def save():
    content = request.get_json()
    insert_json = {
        "title": content["title"],
        "todo": content["todo"],
        "date": datetime.datetime.now()
    }
    mycol.insert_one(insert_json)
    return dumps({"message": "inserted"})

@app.route("/todos", methods=["GET"])
def todos():
    asd = mycol.find({})
    return dumps(asd)

@app.route("/delete/<id>", methods=["DELETE"])
def delete(id):
    print(id)
    mycol = mydb["reactodos"]
    mycol.delete_one({"_id": id})
    return dumps({"message": "Eliminado!"})


if __name__ == "__main__":
    app.run(debug=True)
