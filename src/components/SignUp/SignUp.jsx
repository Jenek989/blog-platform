import { Link } from 'react-router-dom';
import { Button, Form, Input, Typography } from 'antd';

import classes from './SignUp.module.scss';

const { Text } = Typography;

const SignUp = () => {
  return (
    <div className={classes.signUpWrapper}>
      <Text className={classes.signUpTitle}>Create new account</Text>
      <Form layout="vertical" name="login" className={classes.signUpForm}>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please input your username!' }]}
          className={classes.signUnUsername}
        >
          <Input placeholder="Username" className={classes.signUpUpput} />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email address"
          rules={[{ required: true, message: 'Please input your email!' }]}
          className={classes.signUpFormItem}
        >
          <Input type="email" placeholder="Email address" className={classes.signUpInput} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" className={classes.signUpInput} />
        </Form.Item>
        <Form.Item
          name="repeatPassword"
          label="Repeat Password"
          rules={[{ required: true, message: 'Please repeaat your password!' }]}
        >
          <Input.Password placeholder="Repeat Password" className={classes.signUpInput} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={classes.signUpBtn}>
            Create
          </Button>
        </Form.Item>
        <Form.Item>
          <div className={classes.signUpInfo}>
            Already have an account? <Link to="/sign-in">Sign In</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
