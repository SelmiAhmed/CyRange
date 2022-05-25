

const express = require('express');
const dbops = require('./DBOps')
dbops.getUsers().then(res=>{
    console.log(res);
})