class Config {
  /**
   * Set the config file to the current environment
   *
   * @return void
   */
  constructor() {
    this.configFile = require(`../config/${process.env.NODE_ENV}.js`);
  }

  /**
   * Gets a config value from the config dictionary
   *
   * @param string key
   * @return unkown
   */
  get(key) {
    return this.configFile[key];
  }
}

module.exports = new Config();
