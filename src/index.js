import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import moment from 'moment';
import PropTypes from 'prop-types';

const Tweet = ({ tweet }) => {
  return (
    <div className='tweet'>
      <Avatar hash={tweet.gravatar} />
      <div className='content'>
        <NameWithHandle author={tweet.author} />
        <Time time={tweet.timestamp} />
        <Message text={tweet.message} />
        <div className='buttons'>
          <ReplyButton />
          <RetweetButton count={tweet.retweets} />
          <LikeButton count={tweet.likes} />
          <MoreOptionsButton />
        </div>
      </div>
    </div>
  );
};

Tweet.propTypes = {
  tweet: PropTypes.shape({
    message: PropTypes.string,
    gravatar: PropTypes.string,
    author: PropTypes.objectOf(PropTypes.string),
    likes: PropTypes.number,
    retweets: PropTypes.number,
    timestamp: PropTypes.string,
  }),
};

const Avatar = ({ hash }) => {
  const url = `https://www.gravatar.com/avatar/${hash}`;
  return <img src={url} className='avatar' alt='avatar' />;
};

Avatar.propTypes = {
  hash: PropTypes.string,
};

const Message = ({ text }) => {
  return <div className='message'>{text}</div>;
};

Message.propTypes = {
  text: PropTypes.string,
};

const NameWithHandle = ({ author }) => {
  const { name, handle } = author;
  return (
    <span className='name-with-handle'>
      <span className='name'>{name}</span>
      <span className='handle'>{handle}</span>
    </span>
  );
};

NameWithHandle.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    handle: PropTypes.string.isRequired,
  }).isRequired,
};

const Time = ({ time }) => {
  const timeString = moment(time).fromNow();
  return <span className='time'>{timeString}</span>;
};

Time.propTypes = {
  time: PropTypes.string,
};

const ReplyButton = () => <i className='fa fa-reply reply-button' />;

const getRetweetCount = (count) => {
  if (count > 0) {
    return <span className='retweet-count'>{count}</span>;
  } else {
    return null;
  }
};

const RetweetButton = ({ count }) => (
  <span className='retweet-button'>
    <i className='fa fa-retweet' />
    {getRetweetCount(count)}
  </span>
);

RetweetButton.propTypes = {
  count: PropTypes.number,
};

const LikeButton = ({ count }) => (
  <span className='like-button'>
    <i className='fa fa-heart' />
    {count > 0 && <span className='like-count'>{count}</span>}
  </span>
);

LikeButton.propTypes = {
  count: PropTypes.number,
};

const MoreOptionsButton = () => (
  <i className='fa fa-ellipsis-h more-options-button' />
);

const testTweet = {
  message: 'Something about Physics',
  gravatar: 'xyz',
  author: {
    handle: 'physicist',
    name: 'IAMA physicist',
  },
  likes: 3,
  retweets: 0,
  timestamp: '2021-07-07 21:24:35',
};

ReactDOM.render(<Tweet tweet={testTweet} />, document.querySelector('#root'));
