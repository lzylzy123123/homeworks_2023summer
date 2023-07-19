class Fetch {
  private requestInterceptors: Array<(url: string, options: RequestInit) => void> = [];
  private responseInterceptors: Array<(response: Response) => void> = [];

  async get<T>(url: string): Promise<T> {
    return this._request('GET', url);
  }

  async post<T>(url: string, body: any): Promise<T> {
    return this._request('POST', url, body);
  }

  async put<T>(url: string, body: any): Promise<T> {
    return this._request('PUT', url, body);
  }

  async delete<T>(url: string): Promise<T> {
    return this._request('DELETE', url);
  }

  addRequestInterceptor(interceptor: (url: string, options: RequestInit) => void) {
    this.requestInterceptors.push(interceptor);
  }

  addResponseInterceptor(interceptor: (response: Response) => void) {
    this.responseInterceptors.push(interceptor);
  }

  private async _request<T>(method: string, url: string, body?: any): Promise<T> {
    let options: RequestInit = {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    this.runRequestInterceptors(url, options);
    const response = await fetch(url, options);
    this.runResponseInterceptors(response);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data: T = await response.json();
    return data;
  }

  private runRequestInterceptors(url: string, options: RequestInit) {
    this.requestInterceptors.forEach(interceptor => interceptor(url, options));
  }

  private runResponseInterceptors(response: Response) {
    this.responseInterceptors.forEach(interceptor => interceptor(response));
  }
}

const newfetch = new Fetch();
newfetch.get("https://geoapi.qweather.com/v2/city/lookup?location=重庆&key=7324c73a88424435b675e688becae95c").then(res => {
  console.log(res);
})

type X = {
  x: {
    a: 1
    b: 'hi'
  }
  y: 'hey'
}

type Expected = {
  readonly x: {
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: 'hey'
}

type DeepReadonly<T> = keyof T extends never ? T : { readonly [k in keyof T]: DeepReadonly<T[k]> };

type Todo = DeepReadonly<X>;



