from flask import *
import mysql.connector
import json

app = Flask(__name__)

credentials = json.load(open("credentials.json", "r"))

@app.route('/temp', methods=['GET'])
def temp():
    database = mysql.connector.connect(
        host=credentials["host"],
        user=credentials["user"],
        passwd=credentials["password"],
        database=credentials["database"]
    )
    cursor = database.cursor()

    # Your query to return records with ID 20 through 30 [inclusive]
    # from the test_data table
    query = "SELECT * FROM temperature_data;"

    cursor.execute(query)
    data = cursor.fetchall()

    cursor.close()
    database.close()
    return render_template("temp_chart.html", data = data, name = 'Tim Harrold')

@app.route('/', methods=['GET'])
def default():
    return redirect(url_for('temp'))
