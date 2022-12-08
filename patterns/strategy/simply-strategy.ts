// https://medium.com/design-patterns-in-typescript/strategy-pattern-in-typescript-25e8df6b184e

interface Strategy {
  authenticate(args: any[]): boolean;
}

class Authenticator {
  strategies: Record<string, Strategy> = {};

  use(name: string, strategy: Strategy) {
    this.strategies[name] = strategy;
  }

  authenticate(name: string, ...args: any) {
    if (!this.strategies[name]) {
      console.error('No auth strategy!');
      return false;
    }

    return this.strategies[name].authenticate.apply(null, args);
  }
}

class LocalStrategy implements Strategy {
  authenticate(args: any[]) {
    const [username, password] = args;

    if (username !== 'bytefer' && password !== '666') {
      console.log('Wrong password');
      return false;
    }

    console.log('Successful auth');
    return true;
  }
}

class TwitterStrategy implements Strategy {
  authenticate(args: any[]) {
    const [token] = args;

    if (token !== 'tw123') {
      console.error('Twitter auth failed');
      return false;
    }

    console.log('Twitter auth succeeded');

    return true;
  }
}

const auth = new Authenticator();

auth.use('local', new LocalStrategy());
auth.use('twitter', new TwitterStrategy());

function login(mode: string, ...args: any) {
  return auth.authenticate(mode, args);
}

login('twitter', '123');
login('local', 'bytefer', '666');
