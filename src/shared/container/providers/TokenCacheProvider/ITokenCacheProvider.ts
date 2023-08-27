interface ICacheSet {
  key: string;
  value: string;
  expireTime: number;
}

interface ITokenCacheProvider {
  set({ key, value, expireTime }: ICacheSet): Promise<void>;
  get(key: string): Promise<string | null>;
  del(key: string): Promise<void>;
  flushAll(): Promise<void>;
  multipleSet(refreshTokens: ICacheSet[]): Promise<void>;
}

export { ITokenCacheProvider, ICacheSet };
