const Chai = require('chai');
const HTMLTags = require('html-tags');
const HtmlBuilder = require('../index.js');

describe('HtmlBuilder', () => {
  describe('When call HtmlBuilder with simple tags', () => {
    let htmlBuilder;

    beforeEach(() => {
      htmlBuilder = new HtmlBuilder();
    });

    context('when call HtmlBuilder with div and p', () => {
      it('should set tags and close it', () => {
        const html = htmlBuilder.div({ class: 'test' }).p({}, 'test').build();

        Chai.expect(html).to.equal('<div class="test"><p>test</p></div>');
      });
    });

    context('when call HtmlBuilder with div and p tag', () => {
      it('should stack all tags to close it', () => {
        const html = htmlBuilder.div({ class: 'test' }).p({}, 'test');

        Chai.expect(html.openTags).to.be.eql(['div', 'p']);
      });
    });

    context('when call HtmlBuilder with not valid tag', () => {
      it('should set tags and close it', () => {
        try {
          htmlBuilder.test({ class: 'test' }).build();
        } catch (error) {
          Chai.expect(error.message).to.be.eql(
            'htmlBuilder.test is not a function'
          );
        }
      });
    });

    context(
      'when call HtmlBuilder to build a complex tr and inner tags',
      () => {
        it('should set tags and close it', () => {
          const html = htmlBuilder
            .tr()
            .td(
              { class: 'column' },
              htmlBuilder.innerp({ class: 'larger' }, 'date'),
              { close: true }
            )
            .td(
              { class: 'column' },
              htmlBuilder.innerdiv(
                { style: 'text-align: center;' },
                htmlBuilder.innerimg({
                  width: '23',
                  src: 'src',
                })
              )
            )
            .p(
              {
                style: 'margin: 5px 0; text-align: center;',
              },
              htmlBuilder.innera(
                { class: 'link', href: 'test' },
                'Adicionar ao calendário'
              ),
              { close: true }
            )
            .build();

          Chai.expect(html).to.equal(
            '<tr>' +
              '<td class="column">' +
              '<p class="larger">' +
              'date' +
              '</p>' +
              '</td>' +
              '<td class="column">' +
              '<div style="text-align: center;">' +
              '<img width="23" src="src">' +
              '</img>' +
              '</div>' +
              '<p style="margin: 5px 0; text-align: center;">' +
              '<a class="link" href="test">Adicionar ao calendário</a>' +
              '</p>' +
              '</td>' +
              '</tr>'
          );
        });
      }
    );
  });

  describe('When call HtmlBuilder constructor', () => {
    let htmlBuilder;

    beforeEach(() => {
      htmlBuilder = new HtmlBuilder();
    });

    context('check all html tags', () => {
      it('return all functions for each html tag', () => {
        const allFunctions = Object.keys(htmlBuilder.__proto__).map((e) => e);
        const expectedFunctions = HTMLTags;

        Chai.expect(allFunctions).to.include.members(expectedFunctions);
      });

      it('return all inner functions for each html tag', () => {
        const allFunctions = Object.keys(htmlBuilder.__proto__).map((e) => e);
        const expectedFunctions = HTMLTags.map((e) => 'inner' + e);

        Chai.expect(allFunctions).to.include.members(expectedFunctions);
      });
    });
  });
});
