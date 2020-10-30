import React from "react";

const TabHeader = (props) => (
  <>
    <div className="TabHeader">
      <div>
        {props.data.map((item, i) => (
          <div
            key={i}
            onClick={() => props.setCurrent(item.key_)}
            className={
              props.current === item.key_
                ? "TabHeaderItem  TabHeaderItemActive"
                : "TabHeaderItem"
            }
          >
            <div>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
    <hr />
  </>
);

export default TabHeader;
