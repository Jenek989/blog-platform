import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Space, Typography, message } from 'antd';
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

  const [messageApi, contextHolder] = message.useMessage();

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Incorrect email or password',
    });
  };

  const onSubmit = ({ email, password }) => {
    dispatch(fetchLoginUser({ email, password }))
      .then(() => navigate('/'))
      .catch(error);
  };

  return (
    <div className={classes.signInWrapper}>
      <Text className={classes.signInTitle}>Sign in</Text>
      {contextHolder}
      <Space>
        <Form layout="vertical" name="login" onFinish={handleSubmit(onSubmit)} className={classes.signInForm}>
          <Form.Item
            name="email"
            label="Email address"
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
          >
            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Password is reqired',
              }}
              render={({ field }) => (
                <Input.Password placeholder="Password" className={classes.signInInput} {...field} />
              )}
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
      </Space>
    </div>
  );
};

export default SignIn;
