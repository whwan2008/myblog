/* eslint-disable prefer-const */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = ' why';
  }
  async getArticleList() {
    let sql = 'SELECT article.title as title ,' +
              'article.article_content as content ,' +
              'article.id as id ,' +
              'article.introduce as introduce ,' +
              'article.addTime as addTime ,' +
              'article.view_count as view_count ,' +
              'type.typeName as typeName ' +
              'FROM article LEFT JOIN type ON article.type_id = type.Id';
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };

  }
  async getArticleById() {

    let id = this.ctx.params.id;

    let sql = 'SELECT article.title as title ,' +
    'article.id as id ,' +
    'article.article_content as content ,' +
    'article.introduce as introduce ,' +
    'article.addTime as addTime ,' +
    'article.view_count as view_count ,' +
    'type.typeName as typeName ,' +
    'type.id as typeId ' +
    'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
    'WHERE article.id=' + id;

    const result = await this.app.mysql.query(sql);

    this.ctx.body = { data: result };

  }


  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };
  }

  async getListById() {
    let id = this.ctx.params.id;
    let sql = 'SELECT article.id as id,' +
    'article.title as title,' +
    'article.introduce as introduce,' +
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
    'article.view_count as view_count ,' +
    'type.typeName as typeName ' +
    'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
    'WHERE type_id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
}
module.exports = HomeController;

