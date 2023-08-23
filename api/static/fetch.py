import json
import sys
sys.path.append("..")
from urllib.parse import urlparse, parse_qs
from model.history_DAO import get_history
from model.history_sex_DAO import get_history_by_sex
from model.history_age_DAO import get_history_by_age
from static.builder import build_response_body, build_error_body


def fetch_parameters(parameters_query_string):
    parameters = parse_qs(parameters_query_string)
    return parameters


def fetch_request(path, method_type, parameters):

    if method_type != 'GET':
        error_body = build_error_body('400', 'Bad request type. Serverul accepta doar requesturi de tip GET')
        return build_response_body('400', None, error_body)


    if path == '/history/':
        data, response_code = get_history(parameters)
        if response_code == '200': 
            return build_response_body(response_code, data, None)
        else:
            return build_response_body(response_code, None, data)

    elif path == '/history/sex/':
        data, response_code = get_history_by_sex(parameters)
        if response_code == '200': 
            return build_response_body(response_code, data, None)
        else:
            return build_response_body(response_code, None, data)

    elif path == '/history/age/':
        data, response_code = get_history_by_age(parameters)
        if response_code == '200': 
            return build_response_body(response_code, data, None)
        else:
            return build_response_body(response_code, None, data)

    else:
        error_body = build_error_body('404', 'Pagina nu exista')
        return build_response_body('404', None, error_body)
    