import React, { useState } from 'react';
import { useSelector, connect } from 'react-redux';
import styled from 'styled-components';

import { addFeed } from '../store/feed';

const Nav = styled.div`
  background: ${props => props.theme.primaryBackground};
  z-index: -5;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
  display: flex;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 1em;
`;

const Form = styled.form`
  display: flex;
  justify-content: space-around;
  width: 100%;
  @media screen and (max-width: 27em) {
    flex-direction: column;
  }
`;

const UrlInput = styled.input`
  background-color: ${props => props.theme.secondaryBackground};
  border: solid 1px ${props => props.theme.secondaryBackground};
  ::placeholder {
    color: silver;
  }
  &:hover {
    background: ${props => props.theme.secondaryHover};
    border: solid 1px ${props => props.theme.secondaryBackground};
    color: white;
    ::placeholder {
      color: white;
    }
  }
  z-index: 10;
  flex: 4;
  font-size: 16px;
  width: 100%;
  border-radius: 3px;
  margin: 0 1em;
  padding: 7px 33px;
  border-radius: 3px;
  cursor: text;
  font-size: 14px;
  font-weight: 300;
  text-align: left;
  @media screen and (max-width: 27em) {
    margin-bottom: 1em;
    width: 93%;
  }
  &:active,
  &:focus {
    text-align: left;
  }
`;

const NameInput = styled.input`
  background-color: ${props => props.theme.secondaryBackground};
  border: solid 1px ${props => props.theme.secondaryBackground};
  ::placeholder {
    color: silver;
  }
  &:hover {
    background: ${props => props.theme.secondaryHover};
    border: solid 1px ${props => props.theme.secondaryBackground};
    color: white;
    ::placeholder {
      color: white;
    }
  }
  flex: 2;
  font-size: 16px;
  width: 100%;
  border-radius: 3px;
  margin: 0 1em;
  padding: 7px 33px;
  border-radius: 3px;
  cursor: text;
  font-size: 14px;
  font-weight: 300;
  text-align: left;
  @media screen and (max-width: 27em) {
    margin-bottom: 1em;
    width: 93%;
  }
  &:active,
  &:focus {
    text-align: left;
  }
`;

const Button = styled.button`
  background-color: ${props => props.theme.secondaryBackground};
  border: solid 1px ${props => props.theme.secondaryHover};
  color: silver;
  &:hover {
    background: ${props => props.theme.secondaryHover};
    border: solid 1px ${props => props.theme.secondaryBackground};
    color: white;
  }
  flex: 1;
  cursor: pointer;
  font-size: 16px;
  border-radius: 3px;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
`;

function AddFeed({userUuid, onAddFeed}) {
  const feedReducer = useSelector(state => state.feedReducer);
  const feeds = feedReducer.feeds;
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  function handleUrlChange(evt) {
    setUrl(evt.target.value);
  }
  function handleNameChange(evt) {
    setName(evt.target.value);
  }
  let handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await onAddFeed(userUuid, name, url, feeds);
      setUrl('');
      setName('');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Nav>
      <FormContainer>
        <Form className="form" onSubmit={handleSubmit} >
          <UrlInput type="text" name="url" value={url} placeholder="Add Feed Url" onChange={handleUrlChange} />
          <NameInput type="text" name="name" value={name} placeholder="Add Feed Name" onChange={handleNameChange}  />
          <Button type="submit">Add Feed</Button>
        </Form>
      </FormContainer>
    </Nav>
  );
}

const mapDispatch = (dispatch) => ({
  onAddFeed: async (uuid, name, url, feeds) => {
    await dispatch(addFeed(uuid, name, url, feeds));
  }
});

export default connect(null, mapDispatch)(AddFeed);
