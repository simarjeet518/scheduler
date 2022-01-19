import React  from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames(
    'day-list__item',{
    'day-list__item--selected':props.selected,
    'day-list__item--full':!props.spots
  });

  const formatSpots = (spots) => {
    let text = spots? spots : "no";
    text += spots === 1? " spot remaining": " spots remaining";
    return text;
  }

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} >
      <h2 className="text--regular">{props.name}</h2>
      <h2 className="text--light">{formatSpots(props.spots)}</h2>
    </li>
  )
}