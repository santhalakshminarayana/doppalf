import logging


def getFormatter(context=False) -> logging.Formatter:
    fs = "[%(asctime)s | %(filename)s:%(lineno)d] - %(message)s"
    if context:
        fs += " -- %(context)s" 
    return logging.Formatter(fs)


# TODO: implement context logger
def initLogger(name:str, context=False) -> logging.Logger:
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)
    s_handler = logging.StreamHandler()
    s_handler.setLevel(logging.DEBUG)
    s_handler.setFormatter(getFormatter(context))
    logger.addHandler(s_handler)
    return logger


class _LOGGER():
    _instance = None

    def __new__(cls) -> logging.Logger:
        if cls._instance is None:
            cls._instance = initLogger(name="doppalf")

        return cls._instance
    

# TODO: Get custom logger name and context
def get_logger() -> logging.Logger:
    return _LOGGER()