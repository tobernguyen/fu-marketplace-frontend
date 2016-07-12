export function toFilterParams(queryState) {
  let params = {};
  if (queryState.hasOwnProperty('ship_to')) {
    params.shipPlaceId = parseInt(queryState['ship_to']);
  }

  if (queryState.hasOwnProperty('category')) {
    params.categoryIds = [parseInt(queryState['category'])]
  }

  if (queryState.hasOwnProperty('keyword')) {
    params.keyword = queryState['keyword']
  }

  return params;
}
