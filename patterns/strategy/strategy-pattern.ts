/**
 * Интерфейс Стратегии объявляет операции, общие для всех поддерживаемых версий
 * некоторого алгоритма.
 *
 * Контекст использует этот интерфейс для вызова алгоритма, определённого
 * Конкретными Стратегиями.
 */
interface IStrategyInterface {
  doAlgorithm(data: string[]): string[];
}

/**
 * Контекст определяет интерфейс, представляющий интерес для клиентов.
 */
class Context {
  /**
   * @type {IStrategyInterface} Контекст хранит ссылку на один из объектов Стратегии.
   * Контекст не знает конкретного класса стратегии. Он должен работать со
   * всеми стратегиями через интерфейс Стратегии.
   */
  private strategy: IStrategyInterface;

  /**
   * Обычно Контекст принимает стратегию через конструктор, а также
   * предоставляет сеттер для её изменения во время выполнения.
   */
  constructor(strategy: IStrategyInterface) {
    this.strategy = strategy;
  }

  /**
   * Обычно Контекст позволяет заменить объект Стратегии во время выполнения.
   */
  public setStrategy(strategy: IStrategyInterface) {
    this.strategy = strategy;
  }

  /**
   * Вместо того, чтобы самостоятельно реализовывать множественные версии
   * алгоритма, Контекст делегирует некоторую работу объекту Стратегии.
   */
  public doSomeBusinessLogic(): void {
    // ...

    console.log('Context: Sorting data using the strategy (not sure how it\'ll do it)');
    const result = this.strategy.doAlgorithm(['a', 'b', 'c', 'd', 'e']);
    console.log(result.join(','));

    // ...
  }
}



/**
 * Конкретные Стратегии реализуют алгоритм, следуя базовому интерфейсу
 * Стратегии. Этот интерфейс делает их взаимозаменяемыми в Контексте.
 */
class ConcreteStrategyA implements IStrategyInterface {
  public doAlgorithm(data: string[]): string[] {
    return data.sort();
  }
}

class ConcreteStrategyB implements IStrategyInterface {
  public doAlgorithm(data: string[]): string[] {
    return data.reverse();
  }
}

/**
 * Клиентский код выбирает конкретную стратегию и передаёт её в контекст. Клиент
 * должен знать о различиях между стратегиями, чтобы сделать правильный выбор.
 */
const context = new Context(new ConcreteStrategyA());
console.log('Client: Strategy is set to normal sorting.');
context.doSomeBusinessLogic();

console.log('');

console.log('Client: Strategy is set to reverse sorting.');
context.setStrategy(new ConcreteStrategyB());
context.doSomeBusinessLogic();

export {}
