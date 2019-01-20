from flask import Flask, render_template, url_for, redirect, request
import pprint
import json
import requests


places = {
	"Chitrakala Parishath": (12.9794, 77.5910),
	"Jawaharlal Nehru Planetarium": (12.984731000000099, 77.589573000000001),
	"Cafe Coffee Day": (12.926442000000099, 77.680487000000099),
	"Chai Point": (12.87615, 77.59551),
	"Truffles": (12.97187, 77.600900),
	"Shanti Sagar": (12.9537, 77.56732),
	"Pothy's": (12.8084, 77.509169),
	"Gnana Bharathi": (12.94374, 77.50707)
}
times = {
	"Chitrakala Parishath": 60,
	"Jawaharlal Nehru Planetarium": 90,
	"Cafe Coffee Day": 20,
	"Chai Point": 15,
	"Truffles": 60,
	"Shanti Sagar": 40,
	"Pothy's": 60,
	"Gnana Bharathi": 50
}
maps = {
	 'tea': 'Chai Point',
	 'coffee': 'Cafe Coffee Day',
	'North Indian': 'Shanti Sagar',
	'Continental': 'Truffles',
	'Art': 'Chitrakala Parishath',
	'Dance': "Gnana Bharathi",
	'Clothing': "Pothy's",
	'Science': "Jawaharlal Nehru Planetarium"
}

app = Flask("__app__")
app.config['SECRET_KEY'] = 'a551d32359baf371b9095f28d45347c8b8621830'

@app.route('/', methods=['GET', 'POST'])
def home():
	return render_template('index.html', title='Home')

@app.route('/trip', methods=['GET', 'POST'])
def trips():
	return render_template('trips.html', title='Trips')

@app.route('/POIs', methods=['GET', 'POST'])
def pois():
	if 'location' not in request.args.keys():
		return render_template('pois.html', title='POIs', location='Vidhana Soudha')
	else:
		return render_template('pois.html', title='POIs', location=request.args['location'])

@app.route('/References', methods=['GET', 'POST'])
def refer():
	return render_template('references.html', title='References')

@app.route('/userinput', methods=['GET', 'POST'])
def user_input():
	if request.args is None or len(request.args) == 0:
		return render_template('userInput.html')
	else:
		mapval = maps[request.args['touring']]
		timeval = times[mapval]
		placeval = places[mapval]
		j = json.dumps({'mapval':mapval, 'timeval':timeval, 'placeval':placeval})
		pprint.pprint(j)
		return j

@app.route('/jsonParse', methods=['GET', 'POST'])
def printJson():
	js = json.dumps(request.json)
	pprint.pprint(js)
	return '', 200

@app.route('/timeinput', methods=['GET', 'POST'])
def user_time_input():
	return render_template("userTimeInput.html")


@app.route('/oauth', methods=['GET', 'POST'])
def oauth():
	r = requests.post(url="https://outpost.mapmyindia.com/api/security/oauth/token", params={
		'grant_type': 'client_credentials',
		'client_id': '5DAD84w4c-D9yPWId0GNzmW-RRJdm0awDtySdkT-NdBZkq1AdBiNsw==',
		'client_secret': '7I5-OsHoU1hf8uyUl049idx1-L7sLzdAoPrapP8cfvjQVK3vTTb1hY16mIcO8ATR'
	}, headers={'content-type': 'application/x-www-form-urlencoded'})

	r2 = requests.get(url="https://atlas.mapmyindia.com/api/places/nearby/json", headers={
		'Authorization': r.json()['token_type'] + ' ' + r.json()['access_token'],
		'content-type': 'text/plain',
		'dataType': 'json'
	}, data={
		'keywords': 'coffee;beer',
		'refLocation': '28.631460,77.217423'
	})
	return str(r2.status_code), 200

@app.route('/chat')
def chat():
	return render_template('chatbot.html')

app.run(debug=True)