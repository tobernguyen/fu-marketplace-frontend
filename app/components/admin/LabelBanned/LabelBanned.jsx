import React from 'react';
import './LabelBanned.scss';

const LabelBanned = ({banned}) => {
  const output = banned ? <i className="fa fa-ban"></i> : <i className="fa fa-check"></i>;
  return (
    <span className="label-banned">
      {output}
    </span>
  );
}

export default LabelBanned;
