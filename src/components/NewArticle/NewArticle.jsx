import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Form, Input, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import classes from './NewArticle.module.scss';

const { Text } = Typography;

const NewArticle = ({ title, singleArticle, onSubmit }) => {
  const [tagList, setTagList] = useState(singleArticle?.tagList || []);
  const [tagValue, setTagValue] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: singleArticle?.title || '',
      description: singleArticle?.description || '',
      text: singleArticle?.body || '',
    },
  });

  const onClickAddTag = () => {
    if (!tagValue) return;

    setTagList([...tagList, tagValue]);
    setTagValue('');
  };

  const onClickDeleteTag = (id) => {
    setTagList(tagList.filter((_, index) => index !== id));
  };

  const onSubmitForm = (formData) => {
    onSubmit(formData, tagList);
  };

  return (
    <div className={classes.newArticleWrapper}>
      <Text className={classes.newArticleTitle}>{title}</Text>
      <Form layout="vertical" name="login" onFinish={handleSubmit(onSubmitForm)} className={classes.newArticleForm}>
        <Form.Item
          name="title"
          label="Title"
          validateStatus={errors.title ? 'error' : ''}
          help={errors.title && errors.title.message}
          className={classes.newArticleTitle}
        >
          <Controller
            name="title"
            control={control}
            rules={{
              required: 'Title is reqired',
            }}
            render={({ field }) => <Input placeholder="Title" className={classes.newArticleInput} {...field} />}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Short description"
          validateStatus={errors.description ? 'error' : ''}
          help={errors.description && errors.description.message}
          className={classes.newArticleTitle}
        >
          <Controller
            name="description"
            control={control}
            rules={{
              required: 'Title is reqired',
            }}
            render={({ field }) => <Input placeholder="Description" className={classes.newArticleInput} {...field} />}
          />
        </Form.Item>
        <Form.Item
          name="text"
          label="Text"
          validateStatus={errors.text ? 'error' : ''}
          help={errors.text && errors.text.message}
          className={classes.newArticleTitle}
        >
          <Controller
            name="text"
            control={control}
            rules={{
              required: 'Title is reqired',
            }}
            render={({ field }) => (
              <TextArea autoSize={{ minRows: 6 }} placeholder="Text" className={classes.newArticleInput} {...field} />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Tags"
          validateStatus={errors.text ? 'error' : ''}
          help={errors.text && errors.text.message}
          className={classes.newArticleTags}
        >
          {tagList.map((tag, id) => {
            return (
              <div className={classes.newArticletag} key={id}>
                <Input className={classes.newArticleinputTag} value={tag} />
                <Button
                  className={classes.newArticlebuttonTag}
                  type="primary"
                  danger
                  ghost
                  onClick={() => onClickDeleteTag(id)}
                >
                  Delete
                </Button>
              </div>
            );
          })}
          <div className={classes.newArticletag}>
            <Input
              className={classes.newArticleinputTag}
              placeholder="Tag"
              onChange={(e) => setTagValue(e.target.value)}
            />
            <Button className={classes.newArticlebuttonTag} type="primary" ghost onClick={onClickAddTag}>
              Add tag
            </Button>
          </div>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={classes.newArticleBtn}>
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewArticle;
