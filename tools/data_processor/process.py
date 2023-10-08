import csv
import json
import datetime

moonquakes = []

catalog = 'gagnepian_2006_catalog'
with open(f'data/{catalog}.csv', newline='') as file_handler:
    spamreader = csv.reader(file_handler, delimiter=',')
    n = 0
    for row in spamreader:
        if n != 0:
            info = ''
            if row[0] == 'M': info = 'Natural impact'
            elif row[0] == 'SH': info = 'Shallow moonquake'
            elif row[0].startswith('A'): info = 'Deep moonquake'
            else: info = row[0]
            year = '19' + row[4][0:2]
            month = row[4][2:4]
            day = row[4][4:6]
            new_moonquake = {
                'code': f'{catalog}_{n}',
                'name': row[0],
                'mission': 'Apollo',
                'lat': row[1],
                'lng': row[2],
                'Info': info,
                'date': f'{year}-{month}-{day}'
            }
            moonquakes.append(new_moonquake)
        n += 1


catalog = 'lognonne_2003_catalog'
with open(f'data/{catalog}.csv', newline='') as file_handler:
    spamreader = csv.reader(file_handler, delimiter=',')
    n = 0
    for row in spamreader:
        if n != 0:
            info = ''
            if row[0] == 'M': info = 'Natural impact'
            elif row[0] == 'SH': info = 'Shallow moonquake'
            elif row[0].startswith('A'): info = 'Deep moonquake'
            else: info = row[0]
            year = '19' + row[8][0:2]
            month = row[8][2:4]
            day = row[8][4:6]
            new_moonquake = {
                'code': f'{catalog}_{n}',
                'name': row[0],
                'mission': 'Apollo',
                'lat': row[1],
                'lng': row[2],
                'Info': info,
                'date': f'{year}-{month}-{day}'
            }
            moonquakes.append(new_moonquake)
        n += 1


catalog = 'nakamura_1979_sm_locations'
with open(f'data/{catalog}.csv', newline='') as file_handler:
    spamreader = csv.reader(file_handler, delimiter=',')
    n = 0
    for row in spamreader:
        if n != 0:
            date = datetime.datetime.strptime(f'{row[0]}{row[1]}', '%Y%j').date().strftime('%Y-%m-%d')
            new_moonquake = {
                'code': f'{catalog}_{n}',
                'name': f'{row[0]}_{row[1]}',
                'mission': 'Apollo',
                'lat': row[5],
                'lng': row[6],
                'Info': f'Magnitude: {row[7]}',
                'date': date
            }
            moonquakes.append(new_moonquake)
        n += 1


catalog = 'nakamura_1983_ai_locations'
with open(f'data/{catalog}.csv', newline='') as file_handler:
    spamreader = csv.reader(file_handler, delimiter=',')
    n = 0
    for row in spamreader:
        if n != 0:
            date = datetime.datetime.strptime(f'{row[3]}{row[4]}', '%y%j').date().strftime('%Y-%m-%d')
            new_moonquake = {
                'code': f'{catalog}_{n}',
                'name': f'AI {row[0]}',
                'mission': 'Apollo',
                'lat': row[1],
                'lng': row[2],
                'Info': f'Artificial impact {row[0]}',
                'date': date
            }
            moonquakes.append(new_moonquake)
        n += 1


catalog = 'nakamura_2005_dm_locations'
with open(f'data/{catalog}.csv', newline='') as file_handler:
    spamreader = csv.reader(file_handler, delimiter=',')
    n = 0
    for row in spamreader:
        if n != 0:
            new_moonquake = {
                'code': f'{catalog}_{n}',
                'name': f'A {row[0]}',
                'mission': 'Apollo',
                'lat': row[2],
                'lng': row[4],
                'Info': f'Deep moonquake cluster A{row[0]}',
                'date': ''
            }
            moonquakes.append(new_moonquake)
        n += 1


json_object = json.dumps(moonquakes, indent=4)
with open("../../moonquakes.json", "w") as outfile:
    outfile.write(json_object)
