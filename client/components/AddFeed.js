// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import {
//   addFeed, getFeeds, getFeedDetails, getUpdatedTuple, emitLoadStatus, LOAD_CONSTS
// } from '../store/feed';

// import styled from 'styled-components';

// const Nav = styled.div`
//   width: 100%;
//   background-color: #fff;
//   border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
// `;

// const NavHeader = styled.div`
//   max-width: 1010px;
//   padding: 26px 20px;
//   width: 100%;
//   margin: 0 auto;
// `;

// const Input = styled.input`
//   font-size: 16px;
//   border: solid 1px #dbdbdb;
//   border-radius: 3px;
//   color: #262626;
//   padding: 7px 33px;
//   border-radius: 3px;
//   color: #999;
//   cursor: text;
//   font-size: 14px;
//   font-weight: 300;
//   text-align: center;
//   background: #fafafa;

//   &:active,
//   &:focus {
//     text-align: left;
//   }
// `;

// const Button = styled.button`
//   cursor: pointer;
//   background: transparent;
//   font-size: 16px;
//   border-radius: 3px;
//   color: palevioletred;
//   border: 2px solid palevioletred;
//   margin: 0 1em;
//   padding: 0.25em 1em;
//   transition: 0.5s all ease-out;

//   &:hover {
//     background-color: palevioletred;
//     color: white;
//   }
// `;

// const Form = styled.form`
//   display: flex;
//   justify-content: space-around;
// `;

// class AddFeed extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       url: '',
//       name: ''
//     };
//   }

//   handleChange = (evt) => {
//     this.setState({
//       [evt.target.name]: evt.target.value
//     });
//   }

//   handleSubmit = async (evt) => {
//     evt.preventDefault();
//     try {
//       await this.props.onAddFeed(this.props.userUuid, this.state.name, this.state.url, this.props.rangeTuple);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   render() {
//     return (
//       <Nav>
//         <NavHeader>
//           <Form className="form" onSubmit={this.handleSubmit} >
//             <Input type="text" name="url" value={this.state.url} placeholder="Feed Url" onChange={this.handleChange} />
//             <Input type="text" name="name" value={this.state.name} placeholder="Feed Name" onChange={this.handleChange}  />
//             <Button type="submit">Add Feed</Button>
//           </Form>
//         </NavHeader>
//       </Nav>
//     );
//   }
// }

// const mapState = ({ feedReducer }) => ({
//   loadStatus: feedReducer.loadStatus,
//   rangeTuple: feedReducer.rangeTuple,
//   feeds: feedReducer.feeds,
//   feedDetails: feedReducer.feedDetails
// });

// const mapDispatch = (dispatch) => ({
//   onAddFeed: (uuid, name, url, rangeTuple) => {
//     dispatch(addFeed(uuid, name, url));
//     dispatch(emitLoadStatus(LOAD_CONSTS.ADDING));
//     setTimeout(() => {
//       dispatch(getFeeds(uuid)).then(async action => {
//         try {
//           await dispatch(getFeedDetails(action.feeds, rangeTuple));
//           dispatch(emitLoadStatus(LOAD_CONSTS.SUCCEEDED));
//         } catch (err) {
//             console.error(err);
//             dispatch(emitLoadStatus(LOAD_CONSTS.FAILED));
//         }
//       });
//     }, 5000);
//   }
// });

// export default connect(mapState, mapDispatch)(AddFeed);
