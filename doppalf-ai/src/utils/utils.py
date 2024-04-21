def check_all_dict_keys_not_none(o: dict) -> bool:
    for v in o.values():
        if v is None:
            return False
    
    return True