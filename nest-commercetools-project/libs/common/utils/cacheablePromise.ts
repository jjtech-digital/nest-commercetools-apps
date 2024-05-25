import { RedisClientService } from '../clients';
const redis = new RedisClientService();

export class CacheablePromise<T> implements Promise<T> {
  readonly [Symbol.toStringTag]!: string;
  private readonly _promise: Promise<T>;
  private _resolve?: (value: T | PromiseLike<T>) => void;
  private _reject?: (reason?: unknown) => void;
  private readonly key: string;
  private readonly duration: number;

  constructor(
    key: string,
    duration: number,
    executor: (
      resolve: (value: T | PromiseLike<T>) => void,
      reject: (reason?: unknown) => void,
    ) => void,
  ) {
    this.key = key;
    this.duration = duration;
    this._promise = new Promise<T>((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
      this.readFromCacheOrExecute(executor);
    });
  }

  private readonly readFromCacheOrExecute = async (
    executor: (
      resolve: (value: T | PromiseLike<T>) => void,
      reject: (reason?: unknown) => void,
    ) => void,
  ) => {
    if (redis.isConnected) {
      const cache = await redis.redisClient.get(this.key);
      if (cache) {
        const data = JSON.parse(cache);
        this._resolve?.(data);
        return;
      }
    }
    const onResolve = (value: T | PromiseLike<T>) => {
      if (redis.isConnected) {
        redis.redisClient.set(this.key, JSON.stringify(value), {
          EX: this.duration,
        });
      }
      this._resolve?.(value);
    };
    const onReject = (reason?: unknown) => {
      this._reject?.(reason);
    };

    executor(onResolve, onReject);
  };

  public async then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | null
      | undefined,
    onrejected?:
      | ((reason: unknown) => TResult2 | PromiseLike<TResult2>)
      | null
      | undefined,
  ): Promise<TResult1 | TResult2> {
    return this._promise.then(onfulfilled, onrejected);
  }

  public catch<TResult = never>(
    onrejected?:
      | ((reason: unknown) => TResult | PromiseLike<TResult>)
      | null
      | undefined,
  ): Promise<T | TResult> {
    return this._promise.catch(onrejected);
  }

  public finally(onfinally?: (() => void) | null | undefined): Promise<T> {
    return this._promise.finally(onfinally);
  }
}
