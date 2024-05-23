import { Link, NavLink } from 'react-router-dom';
import { Button, Typography } from 'antd';

import classes from './Header.module.scss';

const { Title } = Typography;

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.headerWrapper}>
        <Link className={classes.headerlink} to="/">
          <Title level={5} className={classes.headerTitle}>
            Realworld Blog
          </Title>
        </Link>
        <div className={classes.headerButtons}>
          <NavLink to="/sign-in">
            <Button size="large" type="link" className={classes.headerBtn}>
              Sign In
            </Button>
          </NavLink>
          <Link to="/sign-up">
            <Button size="large" type="link" className={classes.headerBtn}>
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
