const BaseAction = require('../BaseAction')
const UserDAO = require('../../dao/UserDAO')

/**
 * @description return users list
 */
class ListAction extends BaseAction {
  static get accessTag () {
    return 'users:list'
  }

  static get validationRules () {
    return {
      ...this.baseValidationRules
    }
  }

  static get queryConfig () {
    return {
      limit: 20,
      orderBy: 'name:asc',
      filter: {
        // todo
      }
    }
  }

  static run (req, res, next) {
    this.validate(req, this.validationRules)
      .then(() => this.checkAccessByTag(this.accessTag))
      .then(() => UserDAO.GET_LIST())
      .then(list => res.json({ data: list, success: true }))
      .catch(error => next(error))
  }
}

module.exports = ListAction
