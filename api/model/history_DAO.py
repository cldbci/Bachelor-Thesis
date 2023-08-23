from static.builder import build_error_body
from database.db_singleton import Database
from static.months import get_month


def query_db_for_history(county_id, month, year):
    db = Database()
    cursor = db.cursor()
    
    sql_query = f'SELECT total FROM total_unemployment WHERE county=%s AND month LIKE %s AND year=%s'
    parameters = (county_id, get_month(month), year)
    cursor.execute(sql_query, parameters)
    result = cursor.fetchone()

    return {
        'month': get_month(month),
        'year': year,
        'unemployed': result[0]
    }


def get_history_data(county_id, from_month, from_year, to_month, to_year):
    results = []
    current_month = from_month
    current_year = from_year

    while not(current_month == to_month and current_year == to_year):
        results.append(query_db_for_history(county_id, current_month, current_year))

        if current_month < 12:
            current_month += 1
        else:
            current_month = 1
            current_year += 1

    results.append(query_db_for_history(county_id, current_month, current_year))
    return results


def get_history(parameters):
    try: 
        county_id = int(parameters.get('county-id')[0])
        from_month = int(parameters.get('from-month')[0])
        from_year = int(parameters.get('from-year')[0])
        to_month = int(parameters.get('to-month')[0])
        to_year = int(parameters.get('to-year')[0])
    except:
        return build_error_body('Bad query parameters', '400'), '400'

    if from_year > to_year:
        return build_error_body('400', 'Eroare. Parametrul from-year trebuie sa fie mai mic decat to-year'), '400'

    if not(county_id >= 1 and county_id <= 42):
        return build_error_body('400', 'Id-ul judetului trebuie sa fie in intervalul 1-42'), '400'
    
    if not(from_month >= 1 and from_month <= 12) or not(to_month >= 1 and to_month <= 12):
        return build_error_body('400', 'Id-ul lunii trebuie sa fie un numar in intervalul 1-12'), '400'

    try:
        data = get_history_data(county_id, from_month, from_year, to_month, to_year)
        return data, '200'
    except:
        return build_error_body('400', 'Nu exista date disponibile'), '400'