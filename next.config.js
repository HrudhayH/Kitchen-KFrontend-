// next.config.js
const nextConfig = {
  webpack: (config) => {
    config.ignoreWarnings = config.ignoreWarnings || [];
    config.ignoreWarnings.push((warn) =>
      /Critical dependency: the request of a dependency is an expression/.test(warn.message || '')
    );
    return config;
  }
};
module.exports = nextConfig;

// next.config.js
module.exports = {
  webpack: (config) => {
    config.ignoreWarnings = [
      {
        message: /the request of a dependency is an expression/,
      },
    ];
    return config;
  },
};
