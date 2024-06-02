import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { Button, Form, Input, Typography } from 'antd';

import { fetchUpdateUser } from '../../store/usersSlice';

import classes from './Profile.module.scss';

const { Text } = Typography;
const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ email, username, bio = '', avatar: image = '' }) => {
    dispatch(fetchUpdateUser({ email, username, bio, image }));
    navigate('/');
  };

  return (
    <div className={classes.profileWrapper}>
      <Text className={classes.profileTitle}>Edit Profile</Text>
      <Form layout="vertical" name="login" onFinish={handleSubmit(onSubmit)} className={classes.profileForm}>
        <Form.Item
          name="username"
          label="Username"
          validateStatus={errors.username ? 'error' : ''}
          help={errors.username && errors.username.message}
          className={classes.profileUsername}
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
            render={({ field }) => <Input placeholder="Username" className={classes.profileInput} {...field} />}
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email address"
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email && errors.email.message}
          className={classes.profileFormItem}
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
            render={({ field }) => <Input placeholder="Email adress" className={classes.profileInput} {...field} />}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="New password"
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password && errors.password.message}
        >
          <Controller
            name="password"
            control={control}
            rules={{
              pattern: {
                value: /^.{6,40}$/,
                message: 'Your password needs to be at least 6 characters',
              },
            }}
            render={({ field }) => (
              <Input.Password placeholder="New password" className={classes.profileInput} {...field} />
            )}
          />
        </Form.Item>
        <Form.Item
          name="avatar"
          label="Avatar image (URL)"
          validateStatus={errors.avatar ? 'error' : ''}
          help={errors.avatar && errors.avatar.message}
          className={classes.profileavatar}
        >
          <Controller
            name="avatar"
            control={control}
            rules={{
              pattern: {
                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                message: 'URL is not correct',
              },
            }}
            render={({ field }) => <Input placeholder="Avatar image" className={classes.profileInput} {...field} />}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={classes.profileBtn}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;
