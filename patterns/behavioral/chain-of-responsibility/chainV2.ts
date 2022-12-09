interface Handler {
  use(h: Handler): Handler;

  get(url: string, callback: (data: any) => void): void;
}

abstract class AbstractHandler implements Handler {
  next: Handler;

  use(h: Handler) {
    this.next = h;
    return this.next;
  }

  get(url: string, callback: (data: any) => void) {
    if (this.next) {
      return this.next.get(url, callback);
    }
  }
}

class AuthMiddleware extends AbstractHandler {
  isAuthenticated: boolean;

  constructor(username: string, password: string) {
    super();

    this.isAuthenticated = username === 'bytefer' && password === '666';
  }

  get(url: string, callback: (data: any) => void) {
    if (this.isAuthenticated) {
      return super.get(url, callback);
    } else {
      throw new Error('Not Authorized');
    }
  }
}

class LoggerMiddleware extends AbstractHandler {
  get(url: string, callback: (data: any) => void) {
    console.log(`Request url is: ${url}`);
    return super.get(url, callback);
  }
}

class Route extends AbstractHandler {
  urlDataMap: { [key: string]: any };

  constructor() {
    super();
    this.urlDataMap = {
      '/api/todos': [
        { title: 'Learn Design Pattern' },
      ],
      '/api/random': () => Math.random(),
    };
  }

  get(url: string, callback: (data: any) => void) {
    super.get(url, callback);
    if (this.urlDataMap.hasOwnProperty(url)) {
      const value = this.urlDataMap[url];
      const result = typeof value === 'function' ? value() : value;
      callback(result);
    }
  }
}

const route = new Route();

route
  .use(new AuthMiddleware('bytefer', '666'))
  .use(new LoggerMiddleware());

route.get('/api/todos', (data) => {
  console.log(JSON.stringify({ data }, null, 2));
});

route.get('/api/random', (data) => {
  console.log(data);
});

export {};
