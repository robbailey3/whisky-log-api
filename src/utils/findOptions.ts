import { FindOptions } from 'mongodb';

export const findOptionsFromQuery = (query: any): FindOptions => {
  const opts: FindOptions = {};

  if (query.limit) {
    opts.limit = query.limit;
  }

  if (query.skip) {
    opts.skip = query.skip;
  }

  if (query.sort) {
    opts.sort = { [query.sort]: query.sortDirection };
  }

  return opts;
};
