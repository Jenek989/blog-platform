import { Spin } from 'antd';

import classes from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={classes.spinCard}>
      <Spin className={classes.spinCircle} />
    </div>
  );
};

export default Spinner;
