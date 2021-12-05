from flask import *
import RPi.GPIO as GPIO
import os
import glob
import time


app = Flask(__name__)

# set gpio mode
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

# define pins to use
RING_PIN = 23

# set up pins
#   TEMP_PIN takes IN temperature sensor data
#   RING_PIN sends OUT information to the LED progress ring
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


os.system('modprobe w1-gpio')
os.system('modprobe w1-therm')

# get temperature data file
base_dir = '/sys/bus/w1/devices/'
device_folder = glob.glob(base_dir + '28*')[0]
device_file = device_folder + '/w1_slave'


def read_temp_raw():
    f = open(device_file, 'r')
    lines = f.readlines()
    f.close()
    return lines


@app.route('/temp', methods=['GET'])
def temp():
    lines = read_temp_raw()
    while lines[0].strip()[-3:] != 'YES':
        time.sleep(0.2)
        lines = read_temp_raw()
    equals_pos = lines[1].find('t=')
    if equals_pos != -1:
        temp_string = lines[1][equals_pos+2:]
        temp_c = float(temp_string) / 1000.0
        temp_f = temp_c * 9.0 / 5.0 + 32.0
        print(temp_f)
        return str(temp_f)


@app.route('/', methods=['GET'])
def default():
    # TODO Uncomment and send data to webpage if route fails
    # temp = GPIO.input(/////)
    # tmpData = {
    #    'temp': temp
    # }
    # return render_template("index.html", **tmpData)
    return render_template("index.html", **{'temp': 48})
