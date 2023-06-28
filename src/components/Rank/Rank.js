import React from "react";

const Rank = ({name, entries}) => {
  return (
    <div>
        <div className="white fa3" style={{fontSize: '20px'}}>
            {`${name}, Your Current Rank is...`}
        </div>
        <div className="white " style={{fontSize: '40px'}}>
            {entries}
        </div>
    </div>
  );
};

export default Rank;
