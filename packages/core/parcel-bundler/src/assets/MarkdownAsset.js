const localRequire = require('../utils/localRequire');
const Asset = require('../Asset');

class MarkdownAsset extends Asset {
  constructor(name, options) {
    super(name, options);
    this.type = 'html';
    this.hmrPageReload = true;
  }
  async generate() {
    let marked = await localRequire('marked', this.name);
    const contents = marked(this.contents);

    return [
      {
        type: 'html',
        value: contents
      },
      {
        type: 'js',
        value: `module.exports=${JSON.stringify(contents)}`
      }
    ];
  }
}
module.exports = MarkdownAsset;
