import axios from 'axios';
import { useState } from 'react';
import dayjs from 'dayjs';
import { LinkThree, LocalTwo, City, Twitter } from '@icon-park/react';
import './index.scss';
import { Input, Button } from '../../components';

export default function GithubUserSearch() {
  const [username, setUsername] = useState('');
  const [userProfile, setUserProfile] = useState({});
  const [hasProfile, setHasProfile] = useState(false);
  const [notfound, setNotfound] = useState(false);

  const usernameHandler = (e) => {
    setUsername(e.target.value)
  }

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
    <div className="github-user-search">
      <h3 className="title">Github User Search</h3>
      <div className="input-box">
        <Input
          placeholder="Github Username"
          value={username}
          onChange={usernameHandler}
        />
        <Button type='primary' id="search-btn" onClick={searchUser}>
          Search
        </Button>
      </div>
      <div className={notfound ? 'notfound-box' : 'notfound-box d-none'}>
        User Not Found!
      </div>
      <div className={hasProfile ? 'userinfo-box card' : 'userinfo-box card d-none'}>
        <div id="user-url" className="d-none">
          {userProfile.html_url}
        </div>
        <img
          id="user-avatar"
          src={userProfile.avatar_url}
          alt={userProfile.login}
          title={userProfile.login}
        />
        <div className="user-content">
          <div id="user-name">
            <a href={userProfile.html_url}>{userProfile.name}</a>
          </div>
          <div id="user-username">{userProfile.login}</div>
          <div id="user-joindate">
            Joined {dayjs(userProfile.created_at).format('DD MMM YYYY')}
          </div>
          <div className="user-data">
            <div id="user-repos" className="user-data-item">
              <span>Repos</span>
              <span>{userProfile.public_repos}</span>
            </div>
            <div id="user-followers" className="user-data-item">
              <span>Followers</span>
              <span>{userProfile.followers}</span>
            </div>
            <div id="user-following" className="user-data-item">
              <span>Following</span>
              <span>{userProfile.following}</span>
            </div>
          </div>
          <table>
            <tbody>
              <tr>
                <td>
                  <div id="user-location" className="user-else-item">
                    <LocalTwo theme="outline" size="14" fill="#333" />
                    {userProfile.location ? (
                      <div className="user-else-text">
                        {userProfile.location}
                      </div>
                    ) : (
                      <div className="not-available-data">Not Available</div>
                    )}
                  </div>
                </td>
                <td>
                  <div id="user-company" className="user-else-item">
                    <City theme="outline" size="14" fill="#333" />
                    {userProfile.company ? (
                      <div className="user-else-text">
                        {userProfile.company}
                      </div>
                    ) : (
                      <div className="not-available-data">Not Available</div>
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div id="user-blog" className="user-else-item">
                    <LinkThree theme="outline" size="14" fill="#333" />
                    {userProfile.blog ? (
                      <div className="user-else-text">{userProfile.blog}</div>
                    ) : (
                      <div className="not-available-data">Not Available</div>
                    )}
                  </div>
                </td>
                <td>
                  <div id="user-twitter" className="user-else-item">
                    <Twitter theme="outline" size="14" fill="#333" />
                    {userProfile.twitter_username ? (
                      <div className="user-else-text">
                        {userProfile.twitter_username}
                      </div>
                    ) : (
                      <div className="not-available-data">Not Available</div>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
