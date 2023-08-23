def build_response_body(status_code, response_body, error_body):
    return {
        'status_code': status_code,
        'response_body': response_body,
        'error_body': error_body
    }


def build_error_body(status_code, message):
    return {
        'status_code': status_code,
        'message': message
    }