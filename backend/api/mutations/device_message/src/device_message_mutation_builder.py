def map_vehicle_error(error_value):
    return str(error_value).lower()

def build_device_message_mutation(message):
    query = """mutation {{
        passDeviceMessage(
            message: {{
                deviceName: "{deviceName}"
                speed: {speed}
                rpm: {rpm}
                oilTemperature: {oilTemperature}
                oilPressure: {oilPressure}
                fuelLevel: {fuelLevel}
                fuelConsumption: {fuelConsumption}
                fuelRange: {fuelRange}
                tyresPressure: {tyresPressure}
                mileage: {mileage}
                rideTime: {rideTime}
                position: {position}
                errors: {{
                    engine: {engineError}
                    battery: {batteryError}
                    oilLevel: {oilLevelError}
                    abs: {absError}
                    coolantTemperature: {coolantTemperatureError}
                    powerSteering: {powerSteeringError}
                }}
            }}
        ) {{
            deviceName
            speed
            rpm
            oilTemperature
            oilPressure
            fuelLevel
            fuelConsumption
            fuelRange
            tyresPressure
            mileage
            rideTime
            position
            errors {{
                engine
                battery
                oilLevel
                abs
                coolantTemperature
                powerSteering
            }}
        }}
    }}""".format(
        deviceName=message['deviceName'],
        speed=message['speed'],
        rpm=message['rpm'],
        oilTemperature=message['oilTemperature'],
        oilPressure=message['oilPressure'],
        fuelLevel=message['fuelLevel'],
        fuelConsumption=message['fuelConsumption'],
        fuelRange=message['fuelRange'],
        tyresPressure=message['tyresPressure'],
        mileage=message['mileage'],
        rideTime=message['rideTime'],
        position=message['position'],
        engineError=map_vehicle_error(message['errors']['engine']),
        batteryError=map_vehicle_error(message['errors']['battery']),
        oilLevelError=map_vehicle_error(message['errors']['oilLevel']),
        absError=map_vehicle_error(message['errors']['abs']),
        coolantTemperatureError=map_vehicle_error(message['errors']['coolantTemperature']),
        powerSteeringError=map_vehicle_error(message['errors']['powerSteering'])
    )

    return query
