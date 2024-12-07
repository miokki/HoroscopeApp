from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime
import swisseph as swe
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut
import pytz
import os

app = Flask(__name__)
CORS(app)

EPHE_PATH = os.path.join(os.path.dirname(__file__), 'ephe')

# Stałe ciał niebieskich
NODE_NORTH = swe.MEAN_NODE
NODE_SOUTH = -1  # Obliczany jako przeciwny do północnego
CHIRON = swe.CHIRON
CERES = swe.CERES
PARS_FORTUNA = -2  # Obliczany ze wzoru: ASC + Księżyc - Słońce

ASPECTS = {
    'koniunkcja': {'angle': 0, 'orb': 8},
    'sekstyl': {'angle': 60, 'orb': 6},
    'kwadratura': {'angle': 90, 'orb': 8},
    'trygon': {'angle': 120, 'orb': 8},
    'opozycja': {'angle': 180, 'orb': 8}
}

STELLIUM_ORB = 10

PLANETS = {
    'Słońce': {'id': swe.SUN, 'orb': 10, 'ruler_of': 'Lew'},
    'Księżyc': {'id': swe.MOON, 'orb': 10, 'ruler_of': 'Rak'},
    'Merkury': {'id': swe.MERCURY, 'orb': 8, 'ruler_of': ['Bliźnięta', 'Panna']},
    'Wenus': {'id': swe.VENUS, 'orb': 8, 'ruler_of': ['Byk', 'Waga']},
    'Mars': {'id': swe.MARS, 'orb': 8, 'ruler_of': ['Baran', 'Skorpion']},
    'Jowisz': {'id': swe.JUPITER, 'orb': 8, 'ruler_of': ['Strzelec', 'Ryby']},
    'Saturn': {'id': swe.SATURN, 'orb': 6, 'ruler_of': ['Koziorożec', 'Wodnik']},
    'Uran': {'id': swe.URANUS, 'orb': 5, 'ruler_of': 'Wodnik'},
    'Neptun': {'id': swe.NEPTUNE, 'orb': 5, 'ruler_of': 'Ryby'},
    'Pluton': {'id': swe.PLUTO, 'orb': 5, 'ruler_of': 'Skorpion'},
    'Węzeł Północny': {'id': NODE_NORTH, 'orb': 5},
    'Węzeł Południowy': {'id': NODE_SOUTH, 'orb': 5},
    'Chiron': {'id': CHIRON, 'orb': 5},
    'Ceres': {'id': CERES, 'orb': 5}
}

def get_coordinates(location):
    try:
        geolocator = Nominatim(user_agent="horoscope_app")
        location_data = geolocator.geocode(location)
        if location_data:
            return location_data.latitude, location_data.longitude
        return None
    except GeocoderTimedOut:
        return None

def get_zodiac_sign(degrees):
    signs = ['Baran', 'Byk', 'Bliźnięta', 'Rak', 'Lew', 'Panna', 
             'Waga', 'Skorpion', 'Strzelec', 'Koziorożec', 'Wodnik', 'Ryby']
    sign_index = int(degrees / 30)
    degrees_in_sign = degrees % 30
    minutes = int((degrees_in_sign % 1) * 60)
    return {
        'sign': signs[sign_index % 12],
        'degrees': int(degrees_in_sign),
        'minutes': minutes
    }

def calculate_lunar_phase(sun_pos, moon_pos):
    diff = moon_pos - sun_pos
    if diff < 0:
        diff += 360
    
    phases = {
        'Nów': (0, 45),
        'Przybywający sierp': (45, 90),
        'Pierwsza kwadra': (90, 135),
        'Przybywający garb': (135, 180),
        'Pełnia': (180, 225),
        'Ubywający garb': (225, 270),
        'Ostatnia kwadra': (270, 315),
        'Ubywający sierp': (315, 360)
    }
    
    for phase, (start, end) in phases.items():
        if start <= diff < end:
            return {'phase': phase, 'degrees': diff}
    return {'phase': 'Nów', 'degrees': diff}

def is_retrograde(planet_speed):
    return planet_speed < 0

def calculate_pars_fortuna(asc, moon, sun):
    return (asc + moon - sun) % 360

def find_dispositor(planet_sign, rulers):
    for planet, data in PLANETS.items():
        if 'ruler_of' in data:
            if isinstance(data['ruler_of'], list):
                if planet_sign in data['ruler_of']:
                    return planet
            elif planet_sign == data['ruler_of']:
                return planet
    return None

def find_stelliums(positions, orb=STELLIUM_ORB):
    stelliums = []
    planets = list(positions.keys())
    
    for i, planet1 in enumerate(planets):
        cluster = [planet1]
        for planet2 in planets[i+1:]:
            pos1 = positions[planet1]['długość ekliptyczna']
            pos2 = positions[planet2]['długość ekliptyczna']
            
            diff = abs(pos1 - pos2)
            if diff > 180:
                diff = 360 - diff
                
            if diff <= orb:
                cluster.append(planet2)
        
        if len(cluster) >= 3 and cluster not in stelliums:
            stelliums.append(cluster)
            
    return stelliums

def calculate_houses(jd, lat, lon):
    try:
        houses = swe.houses(jd, lat, lon, b'P')  # 'P' oznacza system Placidus
        house_positions = {}
        
        for i in range(1, 13):
            position = houses[0][i-1]
            zodiac_data = get_zodiac_sign(position)
            house_positions[i] = {
                'pozycja': round(position, 2),
                'znak_zodiaku': zodiac_data['sign'],
                'stopnie': zodiac_data['degrees'],
                'minuty': zodiac_data['minutes']
            }
            
        return house_positions, houses[0][0]  # Zwraca też ASC
    except Exception as e:
        print(f"Błąd podczas obliczania domów: {e}")
        raise

def determine_house_placement(planet_deg, house_positions):
    for house in range(1, 13):
        next_house = house + 1 if house < 12 else 1
        start = house_positions[house]['pozycja']
        end = house_positions[next_house]['pozycja']
        
        if end < start:
            if planet_deg >= start or planet_deg < end:
                return house
        else:
            if start <= planet_deg < end:
                return house
                
    return 1

def calculate_planet_positions(date, time, lat, lon):
    dt = datetime.datetime.strptime(f"{date} {time}", "%Y-%m-%d %H:%M")
    jd = swe.julday(dt.year, dt.month, dt.day, dt.hour + dt.minute/60.0)
    
    try:
        swe.set_ephe_path(EPHE_PATH)
    except Exception as e:
        print(f"Błąd podczas ustawiania ścieżki efemeryd: {e}")
        raise
    
    flags = swe.FLG_SPEED | swe.FLG_SWIEPH
    
    house_positions, asc = calculate_houses(jd, lat, lon)
    
    positions = {}
    for name, planet_data in PLANETS.items():
        try:
            if planet_data['id'] == NODE_SOUTH:
                # Oblicz pozycję południowego węzła jako przeciwną do północnego
                north_node = positions['Węzeł Północny']
                position = (north_node['długość ekliptyczna'] + 180) % 360
                zodiac_data = get_zodiac_sign(position)
                house = determine_house_placement(position, house_positions)
                positions[name] = {
                    'długość ekliptyczna': position,
                    'znak_zodiaku': zodiac_data['sign'],
                    'stopnie': zodiac_data['degrees'],
                    'minuty': zodiac_data['minutes'],
                    'dom': house,
                    'retrogradacja': False
                }
                continue
                
            if planet_data['id'] == PARS_FORTUNA:
                # Oblicz Pars Fortuna
                sun_pos = positions['Słońce']['długość ekliptyczna']
                moon_pos = positions['Księżyc']['długość ekliptyczna']
                position = calculate_pars_fortuna(asc, moon_pos, sun_pos)
                zodiac_data = get_zodiac_sign(position)
                house = determine_house_placement(position, house_positions)
                positions[name] = {
                    'długość ekliptyczna': position,
                    'znak_zodiaku': zodiac_data['sign'],
                    'stopnie': zodiac_data['degrees'],
                    'minuty': zodiac_data['minutes'],
                    'dom': house
                }
                continue
                
            result = swe.calc_ut(jd, planet_data['id'], flags)
            position = result[0][0]
            speed = result[0][3]
            zodiac_data = get_zodiac_sign(position)
            house = determine_house_placement(position, house_positions)
            
            positions[name] = {
                'długość ekliptyczna': position,
                'znak_zodiaku': zodiac_data['sign'],
                'stopnie': zodiac_data['degrees'],
                'minuty': zodiac_data['minutes'],
                'szerokość ekliptyczna': round(result[0][1], 2),
                'szybkość': round(speed, 4),
                'dom': house,
                'retrogradacja': is_retrograde(speed)
            }

            # Dodaj dyspozytora dla planet
            if 'ruler_of' in planet_data:
                dispositor = find_dispositor(zodiac_data['sign'], PLANETS)
                if dispositor:
                    positions[name]['dyspozytor'] = dispositor

        except Exception as e:
            print(f"Błąd podczas obliczania pozycji {name}: {e}")
            continue

    # Oblicz fazę Księżyca
    if 'Księżyc' in positions and 'Słońce' in positions:
        moon_phase = calculate_lunar_phase(
            positions['Słońce']['długość ekliptyczna'],
            positions['Księżyc']['długość ekliptyczna']
        )
        positions['Księżyc']['faza'] = moon_phase

    # Znajdź stellia
    stelliums = find_stelliums(positions)

    return positions, house_positions, stelliums

def calculate_aspects(positions):
    aspects = []
    planet_names = list(positions.keys())
    
    for i, planet1 in enumerate(planet_names):
        for planet2 in planet_names[i+1:]:
            pos1 = positions[planet1]['długość ekliptyczna']
            pos2 = positions[planet2]['długość ekliptyczna']
            
            diff = abs(pos1 - pos2)
            if diff > 180:
                diff = 360 - diff
            
            for aspect_name, aspect_data in ASPECTS.items():
                max_orb = min(PLANETS[planet1]['orb'], PLANETS[planet2]['orb'])
                max_orb = min(max_orb, aspect_data['orb'])
                
                if abs(diff - aspect_data['angle']) <= max_orb:
                    speed1 = positions[planet1].get('szybkość', 0)
                    speed2 = positions[planet2].get('szybkość', 0)
                    relative_speed = speed1 - speed2
                    
                    aspects.append({
                        'planet1': planet1,
                        'planet2': planet2,
                        'aspekt': aspect_name,
                        'dokładny_kąt': round(diff, 2),
                        'orb': round(abs(diff - aspect_data['angle']), 2),
                        'typ': 'aplikacyjny' if relative_speed < 0 else 'separacyjny'
                    })
    
    return aspects

def find_aspect_configurations(aspects):
    configurations = []
    
    def has_aspect(planet1, planet2, aspect_type, aspects_list):
        return any(
            (a['planet1'] == planet1 and a['planet2'] == planet2 and a['aspekt'] == aspect_type) or
            (a['planet1'] == planet2 and a['planet2'] == planet1 and a['aspekt'] == aspect_type)
            for a in aspects_list
        )

    planet_list = list(set([a['planet1'] for a in aspects] + [a['planet2'] for a in aspects]))
    
    # Znajdź Wielkie Trygony
    find_grand_trines(planet_list, aspects, configurations, has_aspect)
    
    # Znajdź Kwadraty T
    find_t_squares(planet_list, aspects, configurations, has_aspect)
    
    # Znajdź Latawce
    find_kites(planet_list, aspects, configurations, has_aspect)

    return configurations

def find_grand_trines(planet_list, aspects, configurations, has_aspect):
    for i, p1 in enumerate(planet_list):
        for j, p2 in enumerate(planet_list[i+1:], i+1):
            for k, p3 in enumerate(planet_list[j+1:], j+1):
                if (has_aspect(p1, p2, 'trygon', aspects) and
                    has_aspect(p2, p3, 'trygon', aspects) and
                    has_aspect(p3, p1, 'trygon', aspects)):
                    configurations.append({
                        'typ': 'Wielki Trygon',
                        'planety': [p1, p2, p3]
                    })

def find_t_squares(planet_list, aspects, configurations, has_aspect):
    for p1 in planet_list:
        for p2 in planet_list:
            if p1 == p2:
                continue
            for p3 in planet_list:
                if p3 in [p1, p2]:
                    continue
                if (has_aspect(p1, p2, 'opozycja', aspects) and
                    has_aspect(p2, p3, 'kwadratura', aspects) and
                    has_aspect(p3, p1, 'kwadratura', aspects)):
                    configurations.append({
                        'typ': 'Kwadrat T',
                        'planety': [p1, p2, p3],
                        'planeta_szczytowa': p3
                    })

def find_kites(planet_list, aspects, configurations, has_aspect):
    for p1 in planet_list:
        for p2 in planet_list:
            if p1 == p2:
                continue
            for p3 in planet_list:
                if p3 in [p1, p2]:
                    continue
                for p4 in planet_list:
                    if p4 in [p1, p2, p3]:
                        continue
                    if (has_aspect(p1, p2, 'trygon', aspects) and
                        has_aspect(p2, p3, 'trygon', aspects) and
                        has_aspect(p1, p3, 'sekstyl', aspects) and
                        has_aspect(p4, p1, 'opozycja', aspects)):
                        configurations.append({
                            'typ': 'Latawiec',
                            'planety': [p1, p2, p3, p4],
                            'planeta_szczytowa': p1
                        })

@app.route('/api/calculate', methods=['POST'])
def calculate_horoscope():
    try:
        data = request.json
        date = data.get('date')
        time = data.get('time')
        location = data.get('location')

        coords = get_coordinates(location)
        if not coords:
            return jsonify({
                "error": "Nie udało się znaleźć lokalizacji. Sprawdź wprowadzoną nazwę."
            }), 400

        lat, lon = coords
        
        positions, house_positions, stelliums = calculate_planet_positions(date, time, lat, lon)
        aspects = calculate_aspects(positions)
        configurations = find_aspect_configurations(aspects)

        return jsonify({
            "data": {
                "date": date,
                "time": time,
                "location": location,
                "coordinates": {
                    "latitude": lat,
                    "longitude": lon
                }
            },
            "planet_positions": positions,
            "house_positions": house_positions,
            "aspects": aspects,
            "configurations": configurations,
            "stelliums": stelliums,
            "timestamp": datetime.datetime.now().isoformat()
        })

    except Exception as e:
        return jsonify({
            "error": f"Wystąpił błąd podczas obliczeń: {str(e)}"
        }), 500

if __name__ == '__main__':
    app.run(debug=True)