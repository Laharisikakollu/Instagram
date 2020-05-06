import React, { Component,useEffect } from "react";

import {useSelector, useDispatch} from 'react-redux';
import { Checkbox } from "antd";
import { Table } from "reactstrap";
import {onGetRequests} from '../../services/admin';
import {accept} from '../../services/admin';
import {decline} from '../../services/admin';
import {accepts} from '../../actions/admin';
import {declines} from '../../actions/admin';
import { getRequests} from '../../actions/admin';
const UserRequest =(props)=> {


  const requests = useSelector(state => state.admin.requests)

  const dispatch = useDispatch()

  const getRequest = async ()=>{
    let requests = await onGetRequests()
    dispatch(getRequests(requests))
    return requests
   }
   
    useEffect(() => {
      getRequest()
    },[]);
  


  const Accept = async (e) => {
    let obj = {
      userName: e.target.id,
      value: e.target.checked,
    };

      await accept(obj);
    // await dispatch(accepts(acceptRequest));
    let getrequests=await onGetRequests()
    await dispatch(getRequests(getrequests));
  
  };

  const Reject = async (e) => {
    let obj = {
      userName: e.target.id,
      value: e.target.checked,
    };

      await decline(obj);
    // await dispatch(declines(declineRequest));
    let getrequests=await onGetRequests()
    await dispatch(getRequests(getrequests));
  };

    return (
      <div>
        <h1>USER REQUESTS</h1>

        <Table dark>
          <thead>
            <tr>
              <th>USERNAME</th>
              <th>ACCEPT USER</th>
              <th>REJECT USER</th>
            </tr>
          </thead>
          <tbody>
            {requests
              ? requests.map((el, key) => {
                  return (
                    <tr>
                      <td>{el}</td>
                      <td>
                        <Checkbox onChange={Accept} id={el}></Checkbox>
                      </td>
                      <td>
                        <Checkbox onChange={Reject} id={el}></Checkbox>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
      </div>
    );
  }

export default UserRequest;
