import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Checkbox, Form, Input, Space, Typography, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';

import { fetchCreateUser } from '../../store/usersSlice';

import classes from './SignUp.module.scss';

const { Text } = Typography;

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [messageApi, contextHolder] = message.useMessage();

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Registration error',
    });
  };

  const onSubmit = ({ username, email, password }) => {
    dispatch(fetchCreateUser({ username, email, password }))
      .then(() => navigate('/'))
      .catch(error);
  };

  const password = watch('password');

  return (
    <div className={classes.signUpWrapper}>
      <Text className={classes.signUpTitle}>Create new account</Text>
      {contextHolder}
      <Space>
        <Form layout="vertical" name="login" onFinish={handleSubmit(onSubmit)} className={classes.signUpForm}>
          <Form.Item
            name="username"
            label="Username"
            validateStatus={errors.username ? 'error' : ''}
            help={errors.username && errors.username.message}
            className={classes.signUnUsername}
          >
            <Controller
              name="username"
              control={control}
              rules={{
                required: 'Username is reqired',
                pattern: {
                  value: /^.{3,20}$/,
                  message: 'Username must be between 3 and 20 characters',
                },
              }}
              render={({ field }) => <Input placeholder="Username" className={classes.signUpInput} {...field} />}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email address"
            // rules={[{ required: true, message: 'Please input your email!' }]}
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email && errors.email.message}
            className={classes.signUpFormItem}
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
              render={({ field }) => <Input placeholder="Email adress" className={classes.signUpInput} {...field} />}
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
                pattern: {
                  value: /^.{6,40}$/,
                  message: 'Your password needs to be at least 6 characters',
                },
              }}
              render={({ field }) => (
                <Input.Password placeholder="Password" className={classes.signUpInput} {...field} />
              )}
            />
          </Form.Item>
          <Form.Item
            name="repeatPassword"
            label="Repeat Password"
            validateStatus={errors.repeatPassword ? 'error' : ''}
            help={errors.repeatPassword && errors.repeatPassword.message}
          >
            <Controller
              name="repeatPassword"
              control={control}
              rules={{
                required: 'Repeat Password is reqired',
                validate: (value) => {
                  return value === password || 'Password must match';
                },
              }}
              render={({ field }) => (
                <Input.Password placeholder="Password" className={classes.signUpInput} {...field} />
              )}
            />
          </Form.Item>
          <Form.Item
            name="agree"
            valuePropName="checked"
            className={classes.signUpCheckbox}
            validateStatus={errors.agree ? 'error' : ''}
            help={errors.agree && errors.agree.message}
          >
            <Controller
              name="agree"
              control={control}
              rules={{
                required: 'You should be agree',
              }}
              defaultValue={false}
              render={({ field }) => (
                <Checkbox {...field}>I agree to the processing of my personal information</Checkbox>
              )}
            />
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
      </Space>
    </div>
  );
};

export default SignUp;
