const Chai = require("chai");
const HtmlBuilder = require("../index.js");

describe("infrastructure :: tools :: HtmlBuilder", () => {
  describe("When call HtmlBuilder", () => {
    let htmlBuilder;

    beforeEach(() => {
      htmlBuilder = new HtmlBuilder();
    });

    context("when call HtmlBuilder", () => {
      it("should set tags and close it", () => {
        const html = htmlBuilder.div({ class: "test" }).p({}, "test").build();

        Chai.expect(html).to.equal('<div class="test"><p>test</p></div>');
      });
    });

    context("when call HtmlBuilder", () => {
      it("should set tags and close it", () => {
        const html = htmlBuilder
          .tr()
          .td(
            { class: "column" },
            htmlBuilder.innerp({ class: "larger" }, "date"),
            { close: true }
          )
          .td(
            { class: "column" },
            htmlBuilder.innerdiv(
              { style: "text-align: center;" },
              htmlBuilder.innerimg({
                width: "23",
                src: "src",
              })
            )
          )
          .p(
            {
              style: "margin: 5px 0; text-align: center;",
            },
            htmlBuilder.innera(
              { class: "link", href: "test" },
              "Adicionar ao calendário"
            ),
            { close: true }
          )
          .build();

        Chai.expect(html).to.equal(
          "<tr>" +
            '<td class="column">' +
            '<p class="larger">' +
            "date" +
            "</p>" +
            "</td>" +
            '<td class="column">' +
            '<div style="text-align: center;">' +
            '<img width="23" src="src">' +
            "</img>" +
            "</div>" +
            '<p style="margin: 5px 0; text-align: center;">' +
            '<a class="link" href="test">Adicionar ao calendário</a>' +
            "</p>" +
            "</td>" +
            "</tr>"
        );
      });
    });
  });
});
