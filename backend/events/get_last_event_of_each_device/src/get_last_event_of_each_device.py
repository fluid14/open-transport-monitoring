import logging

# Logger setup
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def get_last_event_of_each_device(device, time, data_source):
    devices_list = device.list_all()
    logger.info('## DEVICES LIST RECEIVED')
    logger.info(devices_list)

    five_minutes_ago = time.get_timestamp_from_past_by_minutes(5)
    logger.info('## TIMESTAMP GENERATED')
    logger.info(five_minutes_ago)

    devices_last_message = []

    for device_item in devices_list:
        device_name = device_item["name"]

        messages = data_source.get_device_messages(
            device_name=device_name,
            timestamp=five_minutes_ago,
            messages_limit=1
        )

        logger.info("## MESSAGE FOR DEVICE")
        logger.info(device_name)
        logger.info(messages)

        message = None if not messages else messages[0]
        devices_last_message.append({"deviceName": device_name, "message": message})

    return devices_last_message