const knexBuilder = ({
  knex,
  name = "name",
  tableName = 'tablename',
  selectableProps = [],
  timeout = 1000,
}) => {
  const create = (props) => {
    delete props.id; // not allowed to set `id`

    return knex.insert(props).returning(selectableProps).into(tableName).timeout(timeout);
  };

  const findCount = (filters) =>
    knex(tableName).count("id", { as: "count" }).where(filters);

  const findAll = () =>
    knex.select(selectableProps).from(tableName).timeout(timeout);

  const find = (filters) =>
    knex
      .select(selectableProps)
      .from(tableName)
      .where(filters)
      .timeout(timeout);

  const findByJoin = (filters, options: any = false) => {
    let query = knex;
    let selectablePropsNew = selectableProps;
    let newFilter = {};
    for (const property in filters) {
      newFilter[`${tableName}.${property}`] = filters[property];
    }

    if (options && options.include && options.include.length) {
      selectablePropsNew = selectableProps.map(
        (selectableProp) => `${tableName}.${selectableProp}`
      );

      for (const ele in options.include) {
        let subSelectProps = options.include[ele].model.selectableProps.map(
          (selectProp) =>
            `${options.include[ele].model.tableName}.${selectProp} as ${options.include[ele].model.tableName}_${selectProp} `
        );
        selectablePropsNew = selectablePropsNew.concat(subSelectProps);
        query = query.innerJoin(
          `${options.include[ele].model.tableName}`,
          `${tableName}.${options.include[ele].on}`,
          `${options.include[ele].model.tableName}.id`
        );
      }
    }

    query = query.select(selectablePropsNew).from(tableName);
    if (options && options.limit) {
      query = query.limit(options.limit);
    }
    if (options && options.offset) {
      query = query.offset(options.offset);
    }
    if (options && options.orderByCol) {
      query = query.orderBy(
        options.orderByCol,
        options.orderBy ? options.orderBy : "desc"
      );
    } else {
      query = query.orderBy("created_at", "desc");
    }

    return query
      .where(newFilter)
      .timeout(timeout)
      .then((result) => {
        result = result.map((resObj) => {
          for (const ele in options.include) {
            resObj[options.include[ele].model.tableName] = {};
            for (let res in resObj) {
              if (res.includes(options.include[ele].model.tableName)) {
                resObj[options.include[ele].model.tableName][
                  res.replace(`${options.include[ele].model.tableName}_`, "")
                ] = resObj[res];
              }
            }
            delete resObj[options.include[ele].model.tableName][
              options.include[ele].model.tableName
            ];
          }
          return resObj;
        });
        return result;
      });
    // console.log(query.toSQL())
  };

  // Same as `find` but only returns the first match if >1 are found.
  const findOne = (filters) =>
    find(filters).then((results) => {
      if (!Array.isArray(results)) return results;

      return results[0];
    });

  const findById = (id) =>
    knex.select(selectableProps).from(tableName).where({ id }).timeout(timeout);

  const update = (where, props) => {
    delete props.id; // not allowed to set `id`

    return knex.update(props).from(tableName).where(where).returning(selectableProps).timeout(timeout);
  };

  const updateMultiple = (where, props) => {
    delete props.id; // not allowed to set `id`
    return knex
      .update(props)
      .from(tableName)
      .whereIn("id", where)
      .returning(selectableProps)
      .timeout(timeout);
  };

  const destroy = (id) =>
    knex.del().from(tableName).where({ id }).timeout(timeout);

  return {
    name,
    tableName,
    selectableProps,
    timeout,
    create,
    findCount,
    findAll,
    find,
    findOne,
    findById,
    update,
    destroy,
    findByJoin,
    updateMultiple,
  };
};
export default knexBuilder;