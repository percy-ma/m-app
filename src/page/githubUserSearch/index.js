import axios from 'axios';
import { useState } from 'react';
import dayjs from 'dayjs';
import { LinkThree, LocalTwo, City, Twitter } from '@icon-park/react';
import './index.scss';

export default function GithubUserSearch() {
  const [username, setUsername] = useState('');
  const [userProfile, setUserProfile] = useState({});
  const [hasProfile, setHasProfile] = useState(false);
  const [notfound, setNotfound] = useState(false);

  const usernameChange = (e) => {
    let value = e.target.value;
    setUsername(value);
  };

  const searchUser = () => {
    setNotfound(false);
    if (username !== '') {
      axios
        .get(`https://api.github.com/users/${username}`)
        .then((res) => {
          console.log(res.data);
          setUserProfile(res.data);
          setHasProfile(true);
        })
        .catch((err) => {
          console.error(err);
          setHasProfile(false);
          setNotfound(true);
        });
    }
  };

  return (
    <div>
      <div className="input-box">
        <input
          type="text"
          value={username}
          onChange={usernameChange}
          placeholder="Search Github username"
        />
        <button onClick={searchUser}>Search</button>
      </div>
      <div className={notfound ? 'notfound-box' : 'notfound-box d-none'}>
        User Not Found!
      </div>
      <div className={hasProfile ? 'userinfo-box' : 'userinfo-box d-none'}>
        <div id="user-url">{userProfile.html_url}</div>
        <img
          id="user-avatar"
          src={userProfile.avatar_url}
          alt={userProfile.login}
        />
        <div id="user-username">{userProfile.login}</div>
        <div id="user-name">{userProfile.name}</div>
        <div id="user-joindate">
          Joined {dayjs(userProfile.created_at).format('DD MMM YYYY')}
        </div>
        <div id="user-repos">
          <span>Repos</span>
          <span>{userProfile.public_repos}</span>
        </div>
        <div id="user-followers">
          <span>Followers</span>
          <span>{userProfile.followers}</span>
        </div>
        <div id="user-following">
          <span>Following</span>
          <span>{userProfile.following}</span>
        </div>
        <div id="user-location">
          <LocalTwo theme="outline" size="14" fill="#333" />
          {userProfile.location ? userProfile.location : 'Not Available'}
        </div>
        <div id="user-company">
          <City theme="outline" size="14" fill="#333" />
          {userProfile.company ? userProfile.company : 'Not Available'}
        </div>
        <div id="user-blog">
          <LinkThree theme="outline" size="14" fill="#333" />
          {userProfile.blog ? userProfile.blog : 'Not Available'}
        </div>
        <div id="user-twitter">
          <Twitter theme="outline" size="14" fill="#333" />
          {userProfile.twitter_username
            ? userProfile.twitter_username
            : 'Not Available'}
        </div>
      </div>
    </div>
  );
}
