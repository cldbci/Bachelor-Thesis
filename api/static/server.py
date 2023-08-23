import json
from fetch import fetch_parameters, fetch_request

def app(environ, start_response):
    path = environ.get('PATH_INFO')
    method_type = environ.get('REQUEST_METHOD')

    parameters = fetch_parameters(environ.get('QUERY_STRING'))
    response = fetch_request(path, method_type, parameters)

    start_response(response.get('status_code'), [
        ('Content-Type', 'application/json'),
    ])

    if (response.get('error_body') != None):
        return iter([json.dumps(response.get('error_body')).encode('utf-8')])
    else:
        return iter([json.dumps(response.get('response_body')).encode('utf-8')])