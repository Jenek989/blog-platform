import { Spin } from 'antd';

import classes from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={classes.spinWrapper}>
      <div className={classes.spinCard}>
        <Spin className={classes.spinCircle} />
      </div>
      <div className={classes.spinCard}>
        <Spin className={classes.spinCircle} />
      </div>
      <div className={classes.spinCard}>
        <Spin className={classes.spinCircle} />
      </div>
    </div>
  );
};

export default Spinner;
