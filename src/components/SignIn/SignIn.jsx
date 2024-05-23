import { Link } from 'react-router-dom';
import { Button, Form, Input, Typography } from 'antd';

import classes from './SignIn.module.scss';

const { Text } = Typography;

const SignIn = () => {
  return (
    <div className={classes.signInWrapper}>
      <Text className={classes.signInTitle}>Sign in</Text>
      <Form layout="vertical" name="login" className={classes.signInForm}>
        <Form.Item
          name="email"
          label="Email address"
          rules={[{ required: true, message: 'Please input your email!' }]}
          className={classes.signInFormItem}
        >
          <Input placeholder="Email address" className={classes.signInInput} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" className={classes.signInInput} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={classes.signInBtn}>
            Login
          </Button>
        </Form.Item>
        <Form.Item>
          <div className={classes.signInInfo}>
            Don’t have an account? <Link to="/sign-up">Sign Up</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
