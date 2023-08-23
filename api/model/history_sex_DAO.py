from static.builder import build_error_body
from database.db_singleton import Database
from static.months import get_month


def query_db_for_history_by_sex(county_id, month, year):
    db = Database()
    cursor = db.cursor()
    
    sql_query = f'SELECT men, women FROM total_unemployment WHERE county=%s AND month LIKE %s AND year=%s'
    parameters = (county_id, get_month(month), year)
    cursor.execute(sql_query, parameters)
    result = cursor.fetchone()

    return {
        'month': get_month(month),
        'year': year,
        'unemployed_women': result[0],
        'unemployed_men': result[1]
    }


def get_history_by_sex(parameters):
    try: 
        county_id = int(parameters.get('county-id')[0])
        month = int(parameters.get('month')[0])
        year = int(parameters.get('year')[0])
    except:
        return build_error_body('Bad query parameters', '400'), '400'

    if not(county_id >= 1 and county_id <= 42):
        return build_error_body('400', 'Id-ul judetului trebuie sa fie in intervalul 1-42'), '400'
    
    if not(month >= 1 and month <= 12):
        return build_error_body('400', 'Id-ul lunii trebuie sa fie un numar in intervalul 1-12'), '400'

    try:
        data = query_db_for_history_by_sex(county_id, month, year)
        return data, '200'
    except:
        return build_error_body('400', 'Nu exista date disponibile'), '400'
