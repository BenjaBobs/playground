import { Flex } from "@src/common/flex/flex";
import "@src/mythic-heroes/weekly-events/WeeklyEventExchangeTreePicker.css";
import { useEffect, useState } from "react";

export type WeeklyExchangeReward = {
  name: string;
  max: number;
  price: number;
};
export type WeeklyExchangeRewardTier = [
  WeeklyExchangeReward,
  WeeklyExchangeReward,
  WeeklyExchangeReward
];
export type WeeklyExchangeTree = [
  WeeklyExchangeRewardTier,
  WeeklyExchangeRewardTier,
  WeeklyExchangeRewardTier,
  WeeklyExchangeRewardTier,
  WeeklyExchangeRewardTier
];
export type WeeklyExchangeTreeSelection = [
  [number, number, number],
  [number, number, number],
  [number, number, number],
  [number, number, number],
  [number, number, number]
];

export function WeeklyEventExchangeTreePicker(props: {
  exchangeTree: WeeklyExchangeTree;
  onNewSelection?: (selection: WeeklyExchangeTreeSelection) => void;
}) {
  const [selection, setSelection] = useState<WeeklyExchangeTreeSelection>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  useEffect(() => {
    if (props.onNewSelection) {
      props.onNewSelection(selection);
    }
  }, [selection, props.onNewSelection]);

  function selectReward(tierIndex: number, rewardIndex: number) {
    const newSelection = [...selection] as typeof selection;
    newSelection[tierIndex][rewardIndex] = Math.min(
      props.exchangeTree[tierIndex][rewardIndex].max,
      newSelection[tierIndex][rewardIndex] + 1
    );
    setSelection(newSelection);
  }

  function deselectReward(tierIndex: number, rewardIndex: number) {
    const newSelection = [...selection] as typeof selection;
    newSelection[tierIndex][rewardIndex] = Math.max(
      0,
      newSelection[tierIndex][rewardIndex] - 1
    );

    // If deselecting the reward also deselects the entire tier, deselect all tiers below it
    if (newSelection[tierIndex].every((x) => !x)) {
      for (let i = tierIndex; i < newSelection.length; i++) {
        newSelection[i] = [0, 0, 0];
      }
    }

    setSelection(newSelection);
  }

  function isActive(tierIndex: number) {
    return tierIndex === 0 || selection[tierIndex - 1].some((x) => x > 0);
  }

  return (
    <Flex dir="down" gap={12}>
      {props.exchangeTree.map((tier, tierIndex) => (
        <Flex
          key={tierIndex}
          dir="right"
          justify="space-around"
          itemsPlacement="center"
        >
          {tier.map((reward, rewardIndex) => (
            <ExchangeReward
              reward={reward}
              active={isActive(tierIndex)}
              amount={selection[tierIndex][rewardIndex]}
              onLeftClick={() => selectReward(tierIndex, rewardIndex)}
              onRightClick={() => deselectReward(tierIndex, rewardIndex)}
            />
          ))}
        </Flex>
      ))}
    </Flex>
  );
}

function ExchangeReward(props: {
  reward: WeeklyExchangeReward;
  amount: number;
  active: boolean;
  onLeftClick: () => void;
  onRightClick: () => void;
}) {
  return (
    <Flex
      dir="down"
      itemsPlacement="center"
      className={`weekly-event-exchange-item ${
        props.active ? "active" : "inactive"
      }`}
      onClick={props.onLeftClick}
      onContextMenu={(evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        props.onRightClick();
      }}
    >
      <img style={{ height: 40, width: 40 }}></img>
      <span>
        Stock {props.reward.max - props.amount} (selected: {props.amount})
      </span>
      <Flex dir="right">
        <span>star icon</span>
        <span>{props.reward.price}</span>
      </Flex>
    </Flex>
  );
}
