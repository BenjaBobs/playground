import {
  RandomGenerator,
  unsafeUniformIntDistribution,
  xoroshiro128plus,
} from "pure-rand";

export class Rng {
  private readonly seed: number;
  private readonly rng: RandomGenerator;

  constructor(seed = 0) {
    this.seed = seed;
    this.rng = xoroshiro128plus(this.seed);
  }

  public nextInt(inclusiveMinimum: number, inclusiveMaximum: number): number {
    return unsafeUniformIntDistribution(
      inclusiveMinimum,
      inclusiveMaximum,
      this.rng
    );
  }

  public nextSignedInt(): number {
    return this.rng.unsafeNext();
  }

  public roll(ratioChance: number): boolean {
    return this.nextInt(0, 100) < ratioChance * 100;
  }

  public pickOne<TOption>(options: TOption[]): TOption {
    return options[this.nextInt(0, options.length - 1)];
  }

  public pickSome<TOption>(count: number, options: TOption[]): TOption[] {
    return [...Array(count)].map(() => this.pickOne(options));
  }

  public pickSomeUnique<TOption>(count: number, options: TOption[]): TOption[] {
    const remainingOptions = [...options];
    const pickedOptions: TOption[] = [];

    for (let i = 0; i < count; i++) {
      const pickedOption = this.pickOne(remainingOptions);
      pickedOptions.push(pickedOption);
      remainingOptions.splice(remainingOptions.indexOf(pickedOption), 1);
    }

    return pickedOptions;
  }
}

type Simulation<T, TParams> = (rng: Rng, params: TParams) => T;

export class Simulator<T, TParams = never> {
  private readonly simulation: Simulation<T, TParams>;

  constructor(simulation: Simulation<T, TParams>) {
    this.simulation = simulation;
  }

  public run(args: TParams, seed?: number): T {
    return this.simulation(new Rng(seed ?? 0), args);
  }
}
