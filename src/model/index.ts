import Knex from 'knex'
import KnexTinyLogger from 'knex-tiny-logger'
import * as dotenv from "dotenv";
dotenv.config();

import config from '../../knexfile';
const knexConfig = KnexTinyLogger(Knex(config[process.env.NODE_ENV]))

import users from './user/users.model';

// const modelArray = [users];

// const allModelsData = modelArray.reduce((allModels:any, modelsObj:any) => {
//    const model = modelsObj(knexConfig);
//    if (model) allModels[model.name] = model
//   return allModels
// },{})

// export default async function allModelsData (){
//   await modelArray.map((allModels:any, modelsObj:any) => {
//     const model = modelsObj(knexConfig);
//     if (model) allModels[model.name] = model
//    return allModels
//  },{})
// } 

//  export default {
//   user
//  };
export const user = users(knexConfig);

// console.log("allModels: ------------- ", user)




