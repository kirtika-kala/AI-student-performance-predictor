import pandas as pd
from sklearn.linear_model import LinearRegression

def train_model():
    data = pd.read_csv("data.csv")

    X = data[['study_hours', 'attendance', 'previous_marks']]
    y = data['final_score']

    model = LinearRegression()
    model.fit(X, y)

    return model