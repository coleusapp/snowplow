import os
import pandas as pd
import json
from pathlib import Path

files = Path("content").glob("**/*.json")

for file in files:
    if os.path.basename(file) == 'output.json':
        df = pd.read_json(file)
        simple_array = []
        rewrite = True
        for index, row in df.sort_index().iterrows():
            simple_json = {}
            simple_json["order"] = index
            if "text" in row:
                for any_key in row["text"]:
                    simple_json[any_key] = row["text"][any_key]
                simple_array.append(simple_json)
            else:
                rewrite = False
        if rewrite:
            with open(file, "w") as new_json:
                json.dump(simple_array, new_json)
