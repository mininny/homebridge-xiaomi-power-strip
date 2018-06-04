# homebridge-xiaomi-power-strip

This is a Xiaomi Power Strip plugin for homebridge. 

It has functionality to turn on/off Xiaomi Mi Smart Power Strip from Apple Homekit.

**Dependency**

*miio with version <0.15.0

**Installation**

1.Install required dependencies and program
    
    'npm install -g homebridge-xiaomi-power-strip miio@0.14.1'

2.Get token and IP address for your Xiaomi Mi Power Strip by using:
    
    'miio discover'

3.Modify config.json in your homebridge setup and add following:

    '"accessories": [

        {

            "accessory": "XiaoMiPowerStrip",
            
            "name": "Power Strip",
            
            "address": **"IP address from step 2"**
            
            "token": **"token from step 2"**
            
            "model": "zimi.powerstrip.v2"
        
        }

    ]'