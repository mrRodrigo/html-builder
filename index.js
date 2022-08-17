const HTMLTags = require("html-tags");

module.exports = class HtmlBuilder {
  constructor() {
    this.html = "";
    this.openTags = [];

    HTMLTags.forEach((tag) => {
      HtmlBuilder.prototype[tag] = function (
        attributes = {},
        innerContent = "",
        options = {}
      ) {
        this.html += `<${tag}${this._buildAttributes(attributes)}>`;
        this.html += `${innerContent}`;

        if (options.close) {
          this.close(tag);
          return this;
        }

        this.openTags.push(tag);
        return this;
      };

      HtmlBuilder.prototype[`inner${tag}`] = function (
        attributes = {},
        innerContent = ""
      ) {
        return new HtmlBuilder()[tag](attributes, innerContent).build();
      };
    });
  }

  close(tag) {
    this.html += `</${tag}>`;
    return this;
  }

  _buildAttributes(attributes) {
    return Object.keys(attributes)
      .map((key) => ` ${key}="${attributes[key]}"`)
      .join("");
  }

  build() {
    this.openTags.reverse().forEach((tag) => this.close(tag));
    return this.html;
  }
};
