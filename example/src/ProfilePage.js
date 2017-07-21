import React, { Component } from 'react'

import { BreadcrumbsItem } from '../..';

import {base_path} from './constants'


const Profile = ({children}) => (
  <div>
    <BreadcrumbsItem to={base_path+'/profile'} href={base_path+'/profile'}>
      Profile
    </BreadcrumbsItem>

    <h1>Profile</h1>
  </div>
)

export default Profile

