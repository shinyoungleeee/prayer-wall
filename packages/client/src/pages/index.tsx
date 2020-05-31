/** @jsx jsx */
import { jsx } from '@emotion/core';
import {
  ChangeEventHandler,
  FormEventHandler,
  Fragment,
  useState,
} from 'react';
import { Helmet } from 'react-helmet';
import { Layout } from '../components/Layout';
import { PrayerRequest } from '../entities/PrayerRequest';
import { useAuth } from '../hooks/useAuth';
import { useSiteMetadata } from '../hooks/useSiteMetadata';

const HomePage = () => {
  const { title } = useSiteMetadata();
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [newRequest, setNewRequest] = useState(PrayerRequest.empty());
  const { authenticated, logIn, logOut } = useAuth();

  const handleNewPrayerBodyChange: ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    const { value } = e.currentTarget;
    setNewRequest((prevState) => {
      const newState = { ...prevState };
      newState.body = value;
      return newState;
    });
  };

  const handleNewPrayerAnonymousChange: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { checked } = e.currentTarget;
    setNewRequest((prevState) => {
      const newState = { ...prevState };
      newState.anonymous = checked;
      return newState;
    });
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const { body, anonymous } = newRequest;
    const prayerRequest = new PrayerRequest(body, anonymous);
    setPrayers((prevState) => [...prevState, prayerRequest]);
    setNewRequest(PrayerRequest.empty());
  };

  return (
    <Layout>
      <Helmet title={title} />
      {authenticated ? (
        <Fragment>
          <div>
            <button type="button" onClick={logOut}>
              Log out
            </button>
            Prayer requests
            <ul>
              {prayers.map((prayer) => (
                <li key={prayer.body}>
                  {prayer.body} {prayer.anonymous && '(Anonymous)'}
                </li>
              ))}
            </ul>
          </div>
          <form
            name="prayer-request-queue"
            method="post"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            <textarea
              id="body"
              name="body"
              value={newRequest.body}
              onChange={handleNewPrayerBodyChange}
            />
            <label htmlFor="anonymous">Keep anonymous?</label>
            <input
              id="anonymous"
              name="anonymous"
              type="checkbox"
              checked={newRequest.anonymous}
              onChange={handleNewPrayerAnonymousChange}
            />
            <button type="submit">Submit</button>
          </form>
        </Fragment>
      ) : (
        <button type="button" onClick={logIn}>
          Log in
        </button>
      )}
    </Layout>
  );
};

export default HomePage;
