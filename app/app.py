from flask import *
import RPi.GPIO as GPIO


app = Flask(__name__)

# set gpio mode
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

# define pins to use
TEMP_PIN = 18
RING_PIN = 23

# set up pins
#   TEMP_PIN takes IN temperature sensor data
#   RING_PIN sends OUT information to the LED progress ring
GPIO.setup(TEMP_PIN, GPIO.IN)
GPIO.setup(RING_PIN, GPIO.OUT)

# run when start button is pressed
@app.route('/stBtn', methods=['POST'])
def cook():
    # let us know we started cooking
    print("Start Button Pressed")

    # start timer
    #GPIO.output(RING_PIN, HIGH)

    # let us know the process is complete
    return "cook process complete"

@app.route('/temp', methods=['GET'])
def temp():
    return "4";

@app.route('/', methods=['GET'])
def default():
    ### TODO Uncomment and send data to webpage if route fails
    #temp = GPIO.input(/////)
    #tmpData = {
    #    'temp': temp
    #}
    #return render_template("index.html", **tmpData)
    return render_template("index.html", **{'temp': 48})
