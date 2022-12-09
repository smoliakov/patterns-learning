namespace StrategyV1 {
  interface IStrategy {
    doWork(data: string[]): string[];
  }

  export class Context {
    private strategy: IStrategy;

    constructor(strategy: IStrategy) {
      this.strategy = strategy;
    }

    public setStrategy(strategy: IStrategy) {
      this.strategy = strategy;
    }

    public doSomeBusinessLogic(): void {
      console.log('Context: Sorting data using the strategy (not sure how it\'ll do it)');
      const result = this.strategy.doWork(['a', 'b', 'c', 'd', 'e']);
      console.log(result.join(','));
    }
  }

  export class ConcreteStrategyA implements IStrategy {
    public doWork(data: string[]): string[] {
      return data.sort();
    }
  }

  export class ConcreteStrategyB implements IStrategy {
    public doWork(data: string[]): string[] {
      return data.reverse();
    }
  }

}

/**
 * Main code
 */

const context = new StrategyV1.Context(new StrategyV1.ConcreteStrategyA());
console.log('Client: Strategy is set to normal sorting.');
context.doSomeBusinessLogic();

context.setStrategy(new StrategyV1.ConcreteStrategyB());
console.log('Client: Strategy is set to reverse sorting.');
context.doSomeBusinessLogic();

export {};
