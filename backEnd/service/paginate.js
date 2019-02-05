const defaultSortingValues = ['1', 1, 'true', true]
const intergerFields = []
const dateFields = ['created_at', 'updated_at', 'created', 'updated']

/**
 * Paginate data for given Model with QueryString
 * @param data
 * @param query
 * @return Object {data: [{}], pagination: {page: 1, rowCount: 1234, pageSize: 15, pageCount: 83}} || [{}]
 */
exports.paginate = (data, query) => {
  data = data.map(data => data.toJSON())
  let page = parseInt(query.page) - 1 || 0
  page = page < 0 ? 0 : page
  const pageSize = parseInt(query.max) || 15
  const order = (defaultSortingValues.indexOf(query.asc) !== -1) ? 'ASC' : 'DESC'
  const sort = query.sort || 'created_at'
  let totalData

  if (query.hasOwnProperty('search') && query.search !== '') {
    let search = query.search.split('+').join(' ')
    data = data.filter(Elem => _containsValue(Elem, search)) || []
  }

  data.sort((a, b) => order === 'DESC' ? _getSort(b, a, sort) : _getSort(a, b, sort))


  if (!query.hasOwnProperty('all')) {
    totalData = data.length
    data = _pageSizing(data, pageSize)
    const toReturn = {
      data: [],
      pagination: {page: page + 1, pageSize: pageSize, rowCount: totalData, pageCount: data.length}
    }
    if (page > data.length - 1 && data.length > 0) {
      toReturn.data = data[data.length - 1]
    } else if (data.hasOwnProperty(page)) {
      toReturn.data = data[page]
    }

    return toReturn
  }

  return data.hasOwnProperty('data') ? data : {data: data}
}

/**
 * Create pages by given size
 * @param data
 * @param size
 * @returns {Array}
 * @private
 */
const _pageSizing = (data, size) => {
  const pages = []
  if (size > 0) {
    while (data.length > 0) {
      pages.push(data.splice(0, size))
    }
  }
  return pages
}

/**
 * Get array of statuses
 * @param query
 * @param statuses
 * @returns {*}
 * @private
 */
const _getAllStatuses = (query, statuses) => {
  if (query.hasOwnProperty('status')) {
    if (statuses.indexOf(query.status) === -1) {
      statuses.push(query.status)
    }
  }
  if (query.hasOwnProperty('!status')) {
    if (statuses.indexOf(query['!status']) === -1) {
      statuses.push(`!${query['!status']}`)
    }
  }
  return statuses
}

/**
 * Get value from dotNotation String (key.key2.key3)
 * @param object
 * @param string
 * @returns {*}
 * @private
 */
const _getValue = (object, string) => string.split('.').reduce((o, i) => o[i], object)

/**
 * Deep Sorting Array of Object
 * @param first
 * @param second
 * @param sort
 * @returns {number}
 * @private
 */
const _getSort = (first, second, sort) => {
  const lastKey = sort.split('.').pop()

  if (intergerFields.indexOf(lastKey) !== -1) {
    return _getValue(first, sort) - _getValue(second, sort)
  } else if (dateFields.indexOf(lastKey) !== -1) {
    return new Date(_getValue(first, sort)) - new Date(_getValue(second, sort))
  }
  return _getValue(first, sort).toLowerCase().localeCompare(_getValue(second, sort).toLowerCase())
}

const _containsValue = (obj, research) => {
  for (const prop of Object.keys(obj)) {
    if (obj.hasOwnProperty(prop) && obj[prop] !== null) {
      if (obj[prop].toString().toLowerCase().indexOf(research.toLowerCase()) !== -1) {
        return true
      }
      if (typeof obj[prop] === 'object' && ['created_at', '_id'].indexOf(prop) === -1) {
        return _containsValue(obj[prop], research)
      }
    }
  }

  return false
}