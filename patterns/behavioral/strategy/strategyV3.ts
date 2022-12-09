// The Strategy Pattern Concept
// https://sbcode.net/typescript/strategy/

namespace StrategyV3 {
  interface IStrategy {
    doWork(): string;
  }

  interface IStrategyConstructor {
    new(): IStrategy;
  }

  export class Context {
    request(strategy: IStrategyConstructor) {
      return new strategy();
    }
  }

  export class ConcreteStrategyA implements IStrategy {
    // A Concrete Strategy Subclass

    doWork() {
      return 'I am ConcreteStrategyA';
    }
  }

  export class ConcreteStrategyB implements IStrategy {
    doWork() {
      return 'I am ConcreteStrategyB';
    }
  }
}

/**
 * Main code
 */

const context = new StrategyV3.Context();

console.log(context.request(StrategyV3.ConcreteStrategyA).doWork());
console.log(context.request(StrategyV3.ConcreteStrategyB).doWork());

export {};
