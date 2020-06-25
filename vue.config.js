module.exports = {
  // publicPath: process.env.NODE_ENV === "production" ? "/ogrencii/" : "/",
  transpileDependencies: ["vuetify"],
  devServer: {
    host: "0.0.0.0",
    port: "8080",
    disableHostCheck: true,
  },
};
