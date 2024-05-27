const { simpleFetch } = require("../../simple-fetch");

class Client {
  accessToken = null;
  apiKey = null;

  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async getAccessToken() {
    try {
      const accessTokenResponse = await simpleFetch("/api/auth", {
        method: "POST",
        body: { apiKey: this.apiKey },
      });

      if (accessTokenResponse.status === 200) {
        this.accessToken = accessTokenResponse.response.token;
      }
    } catch (error) {
      console.error("unable to fetch access token");
    }
  }

  async getLatestBlog() {
    try {
      if(!this.accessToken) {
        await this.getAccessToken();
      }

      const response = await simpleFetch("/api/blog/latest", {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      return response;
    } catch (error) {
      throw new Error(`Error while fetching blogs: ${error.errorMessage}`);
    }
  }
}

module.exports = Client;
