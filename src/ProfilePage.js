import React, { Component } from 'react'

import { BreadcrumbsItem } from '../../src';

import {base_path} from './constants'


const Profile = ({children}) => (
  <div>
    <BreadcrumbsItem glyph='user' to={base_path+'/profile'}>
      Profile
    </BreadcrumbsItem>

    <h1>Profile</h1>
  </div>
)

export default Profile

