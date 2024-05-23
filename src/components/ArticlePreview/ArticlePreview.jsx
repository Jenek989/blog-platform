import { Link } from 'react-router-dom';
import { Image, Tag, Typography } from 'antd';

import classes from './ArticlePreview.module.scss';

const { Text, Paragraph } = Typography;

const ArticlePreview = () => {
  return (
    <article className={classes.article}>
      <div className={classes.articleWrapper}>
        <div className={classes.articleMain}>
          <Link className={classes.articleLink}>
            <Text className={classes.articleTitle}>Some article title</Text>
          </Link>
          <Tag className={classes.articleTag}> Tag1</Tag>
          <Paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis beatae suscipit fugiat, rem debitis
            nihil nostrum, magnam numquam harum laborum accusamus inventore consequuntur commodi magni quo?
          </Paragraph>
        </div>
        <div className={classes.articleWrapperInfo}>
          <div className={classes.articlePersonal}>
            <Text className={classes.articleName}>John Doe</Text>
            <Text className={classes.articleDate}>March 5, 2020</Text>
          </div>
          <Image
            width={40}
            height={40}
            src="https://www.kindpng.com/picc/m/22-224091_avatar-computer-icons-blog-clip-art-avatar-png.png"
          ></Image>
        </div>
      </div>
    </article>
  );
};

export default ArticlePreview;
