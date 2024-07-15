import { useState, useEffect } from "react";
import queryString from "query-string";

const generateFilterQuery = (filters) => {

  // if ('containerAge' in filters) {
  //   const containerAge = "containerAge=" + filters["containerAge"]
  //   const cloneFilters = {
  //     ...filters
  //   };
  //   delete cloneFilters['containerAge'];
  //   return containerAge + '&' + queryString.stringify(cloneFilters);
  // } else {
  return queryString.stringify(filters);
  // }

};

const useQueryBuilder = (filters = {}) => {
  const [value, setValue] = useState(generateFilterQuery(filters));

  const generateQuery = (param) => {
    setValue(generateFilterQuery(param));
  };

  useEffect(() => {
    if (value === generateFilterQuery(filters)) return;
    generateQuery(filters);
  });
  
  return {
    filterQuery: value,
    generateQuery
  };
};

export default useQueryBuilder;
