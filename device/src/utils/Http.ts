import fetch from 'node-fetch';

class Http {

  public static getAsStream(url: string): Promise<NodeJS.ReadableStream> {
    return fetch(url)
      .then(response => response.body);
  }

}

export default Http;
