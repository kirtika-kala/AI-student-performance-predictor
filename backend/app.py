from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from model import train_model

app = Flask(__name__)
CORS(app)

model = train_model()


@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    name = data['name']
    hours = float(data['hours'])
    attendance = float(data['attendance'])
    previous = float(data['previous'])

    prediction = model.predict([[hours, attendance, previous]])[0]

   
    new_row = {
        "name": name,
        "study_hours": hours,
        "attendance": attendance,
        "previous_marks": previous,
        "predicted_score": round(prediction, 2)
    }

    df = pd.read_csv("history.csv")
    df = pd.concat([df, pd.DataFrame([new_row])], ignore_index=True)
    df.to_csv("history.csv", index=False)

    return jsonify({
        "prediction": round(prediction, 2)
    })


@app.route('/history', methods=['GET'])
def history():
    df = pd.read_csv("history.csv")
    return df.to_json(orient='records')


if __name__ == '__main__':
    app.run(debug=True)