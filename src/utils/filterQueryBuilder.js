export const filterQueryBuilder = (data) => {
  let query = ''

  if (!data.genreSelected && data.yearReleased) {
    query = query + 'page=1'
  } else {
    query = query + `page=${data.page}`
  }

  if (data.genreSelected?.length) {
    query =
      (query.length > 0 ? query + '&' : query) +
      `with_genres=${data.genreSelected.join(',')}`
  }

  if (data.yearReleased) {
    const yearQuery = data.type === 'films' ? 'year' : 'first_air_date_year'

    query =
      (query.length > 0 ? query + '&' : query) +
      `${yearQuery}=${data.yearReleased}`
  }

  if (data.sortBy?.length) {
    query = (query.length > 0 ? query + '&' : query) + `sort_by=${data.sortBy}`
  }

  return query
}
