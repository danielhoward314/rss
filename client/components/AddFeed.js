import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { addFeed } from '../store/feed';

const Nav = styled.div`
  width: 100%;
  background-color: #fff;
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
  flex: 4;
  font-size: 16px;
  width: 100%;
  border: solid 1px #dbdbdb;
  border-radius: 3px;
  color: #262626;
  margin: 0 1em;
  padding: 7px 33px;
  border-radius: 3px;
  color: #999;
  cursor: text;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  background: #fafafa;
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
  flex: 2;
  font-size: 16px;
  width: 100%;
  border: solid 1px #dbdbdb;
  border-radius: 3px;
  color: #262626;
  margin: 0 1em;
  padding: 7px 33px;
  border-radius: 3px;
  color: #999;
  cursor: text;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  background: #fafafa;
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
  flex: 1;
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: palevioletred;
  border: 2px solid palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
  &:hover {
    background-color: palevioletred;
    color: white;
  }
`;

function AddFeed(props) {
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
      await props.onAddFeed(props.userUuid, name, url);
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
  onAddFeed: async (uuid, name, url) => {
    await dispatch(addFeed(uuid, name, url));
  }
});

export default connect(null, mapDispatch)(AddFeed);
