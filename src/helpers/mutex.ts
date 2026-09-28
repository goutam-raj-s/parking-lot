export class Mutex {
  private current = Promise.resolve();

  async runExclusive<T>(operation: () => Promise<T> | T): Promise<T> {
    let release: () => void = () => undefined;
    const next = new Promise<void>((resolve) => {
      release = resolve;
    });

    const previous = this.current;
    this.current = this.current.then(() => next);

    await previous;

    try {
      return await operation();
    } finally {
      release();
    }
  }
}
