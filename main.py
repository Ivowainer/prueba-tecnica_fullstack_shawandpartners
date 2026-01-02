import pandas as pd
import random
from faker import Faker

fake = Faker()

rows = []
for i in range(500):
    rows.append({
        "id": i + 1,
        "first_name": fake.first_name(),
        "last_name": fake.last_name(),
        "email": fake.email(),
        "age": random.randint(18, 70),
        "country": fake.country(),
        "company": fake.company(),
    })

df = pd.DataFrame(rows)
path = "./users_challenge_data.csv"
df.to_csv(path, index=False)

path
