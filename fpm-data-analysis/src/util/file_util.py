import csv
import json

def save_csv(file_name, col, data_list: list):
    with open(f'{file_name}.csv', 'w', encoding='utf-8') as csv_file:
        write = csv.writer(csv_file)
        write.writerow(col)
        for data in data_list:
            write.writerow(data.values())


def save_json(file_name, data: list):
    with open(f"{file_name}.json", "w", encoding="utf-8") as json_file:
        json.dump(data, json_file)
