import createGuts from "../../helpers/model-guts";
const name = "users";
const tableName = 'users';
const selectableProps = [

    'id',
    'username',
    'email',
    'password',
    'created_at',
    'updated_at',

];
export default  knex => {
    const guts = createGuts({
      knex,
      name,
      tableName,
      selectableProps
    })
  
    return {
      ...guts
    }
  }