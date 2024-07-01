const DeviceModel = require("../models/device_model");
const NodeModel = require("../models/node_model");
const DeviceLogsModel = require("../models/device_logs");

const dataLogger = async (data) => {
  try {
    const {
      client_id,
      relay1_state,
      relay2_state,
      relay3_state,
      relay4_state,
    } = JSON.parse(data);

    const device = await DeviceModel.find({ device_id: client_id }, { _id: 1 });

    if (device.length) {
      const deviceId = device[0]._id?.toString();
      console.log(deviceId);
      const nodes = await NodeModel.find(
        { device_id: deviceId },
        { state: 1, relay_id: 1 }
      );

      return new Promise((resolve, reject) => {
        nodes.forEach(async ({ state, relay_id }, index) => {
          switch (relay_id) {
              case 1:
                  
              if (state !== relay1_state) {
                console.log(state, relay1_state);
                await DeviceLogsModel({
                  device_id: deviceId,
                  relay_id,
                  relay_status: relay1_state,
                }).save();
                console.log("saved");
                resolve();
              }

              break;
            case 2:
              if (state !== relay2_state) {
                await DeviceLogsModel({
                  device_id: deviceId,
                  relay_id,
                  relay_status: relay2_state,
                }).save();
              }
              break;
            case 3:
              if (state !== relay3_state) {
                await DeviceLogsModel({
                  device_id: deviceId,
                  relay_id,
                  relay_status: relay3_state,
                }).save();
              }
              break;
            case 4:
              if (state !== relay4_state) {
                await DeviceLogsModel({
                  device_id: deviceId,
                  relay_id,
                  relay_status: relay4_state,
                }).save();
              }
          }
          if (index == nodes.length - 1) {
            //resolve();
          }
        });
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = dataLogger;
