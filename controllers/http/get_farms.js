const FarmModel = require("../../models/farm_model");
const getFarms = async (req, res) => {
  try {
    let farms = await FarmModel.find({});
    farms = farms.map((farm, index) => ({
      farm_id: farm._id.toString(),
      farm_name: farm.farm_name,
      farm_device_count: farm.farm_device_count,
      farm_power_consumption: farm.farm_power_consumption,
      farm_water_consumption: farm.farm_water_consumption,
    }));
    res.status(200).json({ farms });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};
module.exports = getFarms;
