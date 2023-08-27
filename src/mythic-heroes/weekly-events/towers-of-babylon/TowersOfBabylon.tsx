import "@src/mythic-heroes/weekly-events/towers-of-babylon/towers-of-babylon.css";

import { MythicHeroesItem } from "@src/mythic-heroes/data/items";
import { Simulator } from "@src/shared/simulation";
import {
  WeeklyEventExchangeTreePicker,
  WeeklyExchangeTree,
  WeeklyExchangeTreeSelection,
} from "@src/mythic-heroes/weekly-events/WeeklyEventExchangeTreePicker";
import { useState } from "react";

const logger: typeof console = {
  log: () => {},
  group: () => {},
  groupEnd: () => {},
} satisfies Partial<typeof console> as typeof console;

const towerPacks: {
  stock: number;
  items: { [key in MythicHeroesItem]: number };
}[] = [
  {
    stock: 7,
    items: {
      ascentionHammer: 1,
      firmamentCoin: 2,
    },
  },
  {
    stock: 3,
    items: {
      ascentionHammer: 2,
      firmamentCoin: 4,
    },
  },
  {
    stock: 3,
    items: {
      ascentionHammer: 4,
      firmamentCoin: 8,
    },
  },
  {
    stock: 3,
    items: {
      ascentionHammer: 12,
      firmamentCoin: 24,
    },
  },
  {
    stock: 3,
    items: {
      ascentionHammer: 18,
      firmamentCoin: 36,
    },
  },
  {
    stock: 3,
    items: {
      ascentionHammer: 30,
      firmamentCoin: 60,
    },
  },
  {
    stock: 5,
    items: {
      ascentionHammer: 40,
      firmamentCoin: 80,
    },
  },
  {
    stock: 5,
    items: {
      ascentionHammer: 60,
      firmamentCoin: 120,
    },
  },
  {
    stock: 10,
    items: {
      ascentionHammer: 100,
      firmamentCoin: 200,
    },
  },
];

type TowerPackSelection = { [key: number]: number };

export type WeeklyEventQuestReward = {
  required: number;
  rewards: Partial<{ [key in MythicHeroesItem]: number }>;
};

const towersOfBabylonEventQuestRewards: WeeklyEventQuestReward[] = [
  { required: 5, rewards: { firmamentCoin: 5, ascentionHammer: 2 } },
  { required: 10, rewards: { firmamentCoin: 5, ascentionHammer: 2 } },
  { required: 20, rewards: { firmamentCoin: 5, ascentionHammer: 3 } },
  { required: 30, rewards: { firmamentCoin: 10, ascentionHammer: 3 } },
  { required: 50, rewards: { firmamentCoin: 10, ascentionHammer: 4 } },
  { required: 80, rewards: { firmamentCoin: 15, ascentionHammer: 4 } },
  { required: 80, rewards: { firmamentCoin: 40 } }, // section clear
  { required: 90, rewards: { firmamentCoin: 10, ascentionHammer: 4 } },
  { required: 110, rewards: { firmamentCoin: 10, ascentionHammer: 4 } },
  { required: 130, rewards: { firmamentCoin: 15, ascentionHammer: 6 } },
  { required: 160, rewards: { firmamentCoin: 15, ascentionHammer: 6 } },
  { required: 190, rewards: { firmamentCoin: 20, ascentionHammer: 8 } },
  { required: 240, rewards: { firmamentCoin: 20, ascentionHammer: 8 } },
  { required: 240, rewards: { firmamentCoin: 60 } }, // section clear
  { required: 270, rewards: { firmamentCoin: 20 } },
  { required: 310, rewards: { firmamentCoin: 20 } },
  { required: 350, rewards: { firmamentCoin: 25 } },
  { required: 400, rewards: { firmamentCoin: 25 } },
  { required: 450, rewards: { firmamentCoin: 25 } },
  { required: 520, rewards: { firmamentCoin: 25 } },
  { required: 520, rewards: { firmamentCoin: 80 } }, // section clear
  { required: 570, rewards: { firmamentCoin: 30 } },
  { required: 630, rewards: { firmamentCoin: 30 } },
  { required: 690, rewards: { firmamentCoin: 30 } },
  { required: 760, rewards: { firmamentCoin: 30 } },
  { required: 830, rewards: { firmamentCoin: 35 } },
  { required: 920, rewards: { firmamentCoin: 35 } },
  { required: 920, rewards: { firmamentCoin: 100 } }, // section clear
  { required: 990, rewards: { firmamentCoin: 35 } },
  { required: 1070, rewards: { firmamentCoin: 35 } },
  { required: 1150, rewards: { firmamentCoin: 40 } },
  { required: 1240, rewards: { firmamentCoin: 40 } },
  { required: 1330, rewards: { firmamentCoin: 40 } },
  { required: 1440, rewards: { firmamentCoin: 40 } },
  { required: 1440, rewards: { firmamentCoin: 120 } }, // section clear
];

const towersOfBabylonExchangeTree: WeeklyExchangeTree = [
  [
    { name: "AppraiserTreasureFragments", max: 2, price: 50 },
    { name: "FaithCustomChest", max: 2, price: 50 },
    { name: "Coins1500", max: 2, price: 50 },
  ],
  [
    { name: "HeroicTreasureFragments", max: 2, price: 80 },
    { name: "CubeFragment", max: 1, price: 80 },
    { name: "CrescentKeys300", max: 3, price: 80 },
  ],
  [
    { name: "NobleTreasureFragments", max: 1, price: 180 },
    { name: "NikeOfSamothrace", max: 1, price: 150 },
    { name: "TombMap15", max: 2, price: 180 },
  ],
  [
    { name: "RoyalTreasureFragments", max: 1, price: 360 },
    { name: "VenusDeMilo", max: 1, price: 300 },
    { name: "FateCrystal15", max: 2, price: 360 },
  ],
  [
    { name: "CelestialTreasureFragment", max: 3, price: 480 },
    { name: "UrCustomVoucher", max: 2, price: 720 },
    { name: "HeavenlyOrb10", max: 3, price: 480 },
  ],
];

const sim = new Simulator(
  (
    rng,
    args: {
      exchangeTreeSelection: WeeklyExchangeTreeSelection;
      towerPackSelection: TowerPackSelection;
    }
  ) => {
    const goldenTowerProbability = 0.1;
    let towerSympathyCounter = 0;
    let usedHammers = 0;
    let questProgress = 0;
    const exchangeProgress = JSON.parse(
      JSON.stringify(args.exchangeTreeSelection)
    ) as WeeklyExchangeTreeSelection;

    const exchangeHammersPerTier = [3, 4, 6, 9, 12];

    const requiredCoins = args.exchangeTreeSelection.reduce(
      (acc, tierSelection, tierIndex) =>
        acc +
        tierSelection.reduce(
          (acc, amountToBuy, rewardIndex) =>
            acc +
            towersOfBabylonExchangeTree[tierIndex][rewardIndex].price *
              amountToBuy,
          0
        ),
      0
    );

    const inventory: { [key in MythicHeroesItem]: number } = {
      ascentionHammer: 0,
      firmamentCoin: 0,
    };

    // buy tower packs
    for (const [towerPackIndex, amountToBuy] of Object.entries(
      args.towerPackSelection
    )) {
      const towerPack = towerPacks[parseInt(towerPackIndex)];
      inventory["ascentionHammer"] +=
        towerPack.items["ascentionHammer"] * amountToBuy;
      inventory["firmamentCoin"] +=
        towerPack.items["firmamentCoin"] * amountToBuy;
    }

    let gainedCoins = inventory["firmamentCoin"];

    while (gainedCoins < requiredCoins) {
      logger.group({
        Hammer: questProgress,
        coins: gainedCoins,
      });

      // use a hammer
      if (inventory["ascentionHammer"]) {
        logger.log("used hammer from inventory");
        inventory["ascentionHammer"] -= 1;
      } else {
        logger.log("used purchased hammer");
        usedHammers++;
      }

      // check for golden tower
      if (towerSympathyCounter >= 9 || rng.roll(goldenTowerProbability)) {
        logger.log("golden tower");
        inventory["firmamentCoin"] += 5;
        gainedCoins += 5;
        towerSympathyCounter = 0;
      } else {
        towerSympathyCounter++;
      }

      // check for quest progress
      questProgress++;
      const questRewards = towersOfBabylonEventQuestRewards.filter(
        (quest) => quest.required === questProgress
      );
      if (questRewards.length) {
        for (const questReward of questRewards) {
          logger.log("quest reward", questReward.rewards);
          for (const [item, amount] of Object.entries(questReward.rewards)) {
            inventory[item as MythicHeroesItem] += amount;
            if (item === "firmamentCoin") {
              gainedCoins += amount;
            }
          }
        }
      }

      // purchase from exchange
      for (const [tierIndex, tierSelection] of exchangeProgress.entries()) {
        for (const [rewardIndex, amountToBuy] of tierSelection.entries()) {
          const reward = towersOfBabylonExchangeTree[tierIndex][rewardIndex];

          for (let i = 0; i < amountToBuy; i++) {
            if (reward.price > inventory["firmamentCoin"]) break;

            exchangeProgress[tierIndex][rewardIndex] -= 1;
            const hammersGained = exchangeHammersPerTier[tierIndex];

            logger.log(
              `bought from exchange ${reward.name}, gained hammers ${hammersGained}`
            );
            inventory["firmamentCoin"] -= reward.price;
            inventory.ascentionHammer += hammersGained;
            inventory[reward.name as MythicHeroesItem] += amountToBuy;
          }
        }
      }

      logger.groupEnd();
    }

    return {
      usedHammers,
      gainedCoins,
      inventory,
    };
  }
);

export function TowersOfBabylon() {
  const [exchangeTreeSelection, setExchangeTreeSelection] =
    useState<WeeklyExchangeTreeSelection>([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);

  const [towerPackSelection, setTowerPackSelection] =
    useState<TowerPackSelection>({
      0: 7,
      1: 3,
    });

  const [seed, setSeed] = useState(0);

  const { usedHammers, gainedCoins } = sim.run(
    {
      exchangeTreeSelection,
      towerPackSelection,
    },
    seed
  );

  return (
    <div>
      Seed:{" "}
      <input
        className="seed-input"
        type="number"
        onChange={(evt) => {
          setSeed(parseInt(evt.target.value) || 0);
        }}
      />
      <p>
        You used {usedHammers} hammers to gain {gainedCoins} coins.
      </p>
      <WeeklyEventExchangeTreePicker
        onNewSelection={setExchangeTreeSelection}
        exchangeTree={towersOfBabylonExchangeTree}
      />
    </div>
  );
}
