import { useEffect, useRef, useState } from "react";
import { usePopper } from "react-popper";
import "./popover.scss";


const PopoverElement = ({referenceElement, isVisible}: any) => {
  const popperElement = useRef<HTMLDivElement>(null);
  const arrowElement = useRef<HTMLDivElement>(null);

  let popperOffsetWidth = 0;

  if (popperElement.current && referenceElement.current) {
    popperOffsetWidth = popperElement.current!.offsetWidth / 2;
  }
  const { styles, attributes } = usePopper(
    referenceElement.current,
    popperElement.current,
    {
      modifiers: [
        { name: "arrow", options: { element: arrowElement.current } },
        { name: "offset", options: { offset: [popperOffsetWidth, 10] } },
      ],
    }
  );

  return (
    <>
      <div
        ref={popperElement}
        className="popper"
        style={styles.popper}
        data-show={isVisible}
        {...attributes.popper}
      >
        МРОТ &mdash; минимальный размер оплаты труда. Разный для разных
        регионов.
        <div ref={arrowElement} style={styles.arrow} className="arrow" />
      </div>
    </>
  );
};


const Popover = () => {
  const [isVisible, setVisibility] = useState(false);
  const [fixThePopover, setFixThePopover] = useState(false);
  const [attributesIcon, setAttributesIcon] = useState({});
  const referenceElement = useRef<HTMLElement>(null);
  useEffect(() => {
    if (fixThePopover) {
      setAttributesIcon({ className: "bi bi-x-circle icon" });
    } else {
      setAttributesIcon({
        className: "bi bi-info-circle icon",
        onMouseEnter: () => setVisibility(true),
        onMouseLeave: () => setVisibility(false),
      });
    }
  }, [fixThePopover]);
  return (
    <>
    <i
      ref={referenceElement}
      onClick={() => setFixThePopover(!fixThePopover)}
      {...attributesIcon}
    ></i>
    <PopoverElement referenceElement={referenceElement} isVisible={isVisible} />
  </>
  )
}

export default Popover;
