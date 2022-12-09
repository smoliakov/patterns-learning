// https://medium.com/design-patterns-in-typescript/strategy-pattern-in-typescript-25e8df6b184e

namespace StrategyV2 {
  interface IStrategy {
    authenticate(args: any[]): boolean;
  }

  export class Authenticator {
    strategies: Record<string, IStrategy> = {};

    use(name: string, strategy: IStrategy) {
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

  export class LocalStrategy implements IStrategy {
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

  export class TwitterStrategy implements IStrategy {
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
}

const context = new StrategyV2.Authenticator();

context.use('local', new StrategyV2.LocalStrategy());
context.use('twitter', new StrategyV2.TwitterStrategy());

function login(mode: string, ...args: any) {
  return context.authenticate(mode, args);
}

login('twitter', '123');
login('local', 'bytefer', '666');

export {};
