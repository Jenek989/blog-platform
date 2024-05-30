import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography } from 'antd';
import { useForm, Controller } from 'react-hook-form';

import { fetchLoginUser } from '../../store/usersSlice';

import classes from './SignIn.module.scss';

const { Text } = Typography;

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ email, password }) => {
    console.log({ email, password });
    dispatch(fetchLoginUser({ email, password }));
    navigate('/');
  };

  return (
    <div className={classes.signInWrapper}>
      <Text className={classes.signInTitle}>Sign in</Text>
      <Form layout="vertical" name="login" onFinish={handleSubmit(onSubmit)} className={classes.signInForm}>
        <Form.Item
          name="email"
          label="Email address"
          // rules={[{ required: true, message: 'Please input your email!' }]}
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email && errors.email.message}
          className={classes.signInFormItem}
        >
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is reqired',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }}
            render={({ field }) => <Input placeholder="Email adress" className={classes.signInInput} {...field} />}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password && errors.password.message}
          // rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Password is reqired',
            }}
            render={({ field }) => <Input.Password placeholder="Password" className={classes.signInInput} {...field} />}
          />
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
