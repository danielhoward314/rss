import React from 'react';

const AddFeed = (props) => {
  return (
    <form className="form" onSubmit={props.handleSubmit}>
      <input type="text" name="url" placeholder="Feed Url" onChange={props.handleChange} />
      <input type="text" name="name" placeholder="Feed Name" onChange={props.handleChange} />
      <button type="submit">Add Feed</button>
    </form>
  );
};

export default AddFeed;
